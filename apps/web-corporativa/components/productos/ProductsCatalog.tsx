"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import type { Product, Category } from "@/types/database"
import { Filter, X } from "lucide-react"
import ProductCard from "./ProductCard"

interface ProductsCatalogProps {
  products: Product[]
  categories: Category[]
}

function getInitialCategoryFromUrl(searchParams: URLSearchParams | null, categories: Category[]): Set<string> {
  if (!searchParams) return new Set()
  const slug = searchParams.get("categoria")
  if (!slug) return new Set()
  const cat = categories.find((c) => c.slug === slug)
  return cat ? new Set([cat.id]) : new Set()
}

export default function ProductsCatalog({ products, categories }: ProductsCatalogProps) {
  const searchParams = useSearchParams()
  const initialCategory = useMemo(
    () => getInitialCategoryFromUrl(searchParams, categories),
    [searchParams, categories]
  )
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(initialCategory)

  useEffect(() => {
    const next = getInitialCategoryFromUrl(searchParams, categories)
    setSelectedCategories(next)
  }, [searchParams, categories])

  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set())
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set())
  const [priceMin, setPriceMin] = useState<string>("")
  const [priceMax, setPriceMax] = useState<string>("")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const brands = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    for (const p of products) {
      const b = p.brand
      if (b != null && b !== "" && !seen.has(b)) {
        seen.add(b)
        result.push(b)
      }
    }
    return result
  }, [products])
  const units = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    for (const p of products) {
      const u = p.unit_measure
      if (u != null && u !== "" && !seen.has(u)) {
        seen.add(u)
        result.push(u)
      }
    }
    return result
  }, [products])

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => {
      const next = new Set(prev)
      if (next.has(brand)) next.delete(brand)
      else next.add(brand)
      return next
    })
  }
  const toggleUnit = (unit: string) => {
    setSelectedUnits((prev) => {
      const next = new Set(prev)
      if (next.has(unit)) next.delete(unit)
      else next.add(unit)
      return next
    })
  }

  const clearFilters = () => {
    setSelectedCategories(new Set())
    setSelectedBrands(new Set())
    setSelectedUnits(new Set())
    setPriceMin("")
    setPriceMax("")
    setInStockOnly(false)
    setSearchTerm("")
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        const matchName = p.name.toLowerCase().includes(term)
        const matchSku = p.sku?.toLowerCase().includes(term)
        const matchDesc = p.description?.toLowerCase().includes(term)
        const matchBrand = p.brand?.toLowerCase().includes(term)
        if (!matchName && !matchSku && !matchDesc && !matchBrand) return false
      }
      if (selectedCategories.size && p.category_id && !selectedCategories.has(p.category_id))
        return false
      if (selectedBrands.size && p.brand && !selectedBrands.has(p.brand)) return false
      if (selectedUnits.size && p.unit_measure && !selectedUnits.has(p.unit_measure)) return false
      if (priceMin) {
        const min = parseFloat(priceMin)
        if (!isNaN(min) && p.price < min) return false
      }
      if (priceMax) {
        const max = parseFloat(priceMax)
        if (!isNaN(max) && p.price > max) return false
      }
      if (inStockOnly && p.stock <= 0) return false
      return true
    })
  }, [
    products,
    searchTerm,
    selectedCategories,
    selectedBrands,
    selectedUnits,
    priceMin,
    priceMax,
    inStockOnly,
  ])

  const hasActiveFilters =
    selectedCategories.size ||
    selectedBrands.size ||
    selectedUnits.size ||
    priceMin ||
    priceMax ||
    inStockOnly ||
    searchTerm

  return (
    <div className="max-w-7xl mx-auto mt-25 md:mt-50 mb-30 px-2 md:px-4 flex flex-col gap-4 md:gap-8">
      <div className="mb-4 w-full flex flex-col items-center justify-center">
        <h2 className="text-center text-xl md:text-3xl font-semibold uppercase text-primary">
          Catálogo de Productos
        </h2>
        <hr className="w-50 border-t-2 border-secondary mx-auto" />
        <p className="text-center text-base md:text-lg text-primary mt-5">
          Explora todo nuestro catálogo de productos. Filtra por categoría, marca y más.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
        <aside className="w-full md:w-64 shrink-0 space-y-6 mb-8 md:mb-0 mx-1 md:mx-0" data-aos="fade-right" data-aos-delay="100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-primary uppercase flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-secondary hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Limpiar
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 uppercase">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre, SKU, marca..."
              className="w-full px-3 py-2 border border-secondary text-primary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 uppercase">
              Categorías
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(c.id)}
                    onChange={() => toggleCategory(c.id)}
                    className="rounded border-secondary text-secondary"
                  />
                  <span className="text-sm text-primary">{c.name}</span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-gray-500">Sin categorías</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 uppercase">
              Marcas
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.has(b)}
                    onChange={() => toggleBrand(b)}
                    className="rounded border-secondary text-secondary"
                  />
                  <span className="text-sm text-primary">{b}</span>
                </label>
              ))}
              {brands.length === 0 && (
                <p className="text-sm text-gray-500">Sin marcas</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 uppercase">
              Unidad de medida
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {units.map((u) => (
                <label key={u} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedUnits.has(u)}
                    onChange={() => toggleUnit(u)}
                    className="rounded border-secondary text-secondary"
                  />
                  <span className="text-sm text-primary">{u}</span>
                </label>
              ))}
              {units.length === 0 && (
                <p className="text-sm text-gray-500">Sin unidades</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 uppercase">Producto en Stock</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-secondary text-secondary"
              />
              <span className="text-sm font-medium text-primary">Stock</span>
            </label>
          </div>
        </aside>

        <main className="flex-1 min-w-0" data-aos="fade-up" data-aos-delay="200">
          <p className="text-sm text-primary mb-4 ml-2 md:ml-4 uppercase">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-primary py-8 md:py-12 uppercase">
              No se encontraron productos con los filtros seleccionados.
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
