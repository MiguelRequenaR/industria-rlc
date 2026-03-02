"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { updateProduct } from "@/actions/admin-actions"
import type { Product, Category } from "@/types/database"
import { toast } from "react-toastify"
import { ProductImageUpload } from "./ProductImageUpload"

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  categories: Category[]
  onSuccess: () => void
}

export function EditProductModal({ isOpen, onClose, product, categories, onSuccess }: EditProductModalProps) {
  const [name, setName] = useState(product.name)
  const [slug, setSlug] = useState(product.slug || "")
  const [sku, setSku] = useState(product.sku || "")
  const [description, setDescription] = useState(product.description || "")
  const [categoryId, setCategoryId] = useState(product.category_id || "")
  const [brand, setBrand] = useState(product.brand || "")
  const [unitMeasure, setUnitMeasure] = useState(product.unit_measure || "")
  const [location, setLocation] = useState(product.location || "")
  const [stock, setStock] = useState(String(product.stock))
  const [minStock, setMinStock] = useState(String(product.min_stock))
  const [price, setPrice] = useState(String(product.price))
  const [imageUrls, setImageUrls] = useState<string[]>(product.image_urls ?? [])
  const [isActive, setIsActive] = useState(product.is_active)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const handleNameChange = (value: string) => {
    setName(value)
    setSlug(generateSlug(value))
  }

  useEffect(() => {
    setName(product.name)
    setSlug(product.slug || "")
    setSku(product.sku || "")
    setDescription(product.description || "")
    setCategoryId(product.category_id || "")
    setBrand(product.brand || "")
    setUnitMeasure(product.unit_measure || "")
    setLocation(product.location || "")
    setStock(String(product.stock))
    setMinStock(String(product.min_stock))
    setPrice(String(product.price))
    setImageUrls(product.image_urls ?? [])
    setIsActive(product.is_active)
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const priceNum = parseFloat(price)
    const cleanName = name.trim()
    const cleanSlug = (slug || generateSlug(name)).trim()
    if (!cleanName || !cleanSlug) return
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("El precio debe ser un número válido mayor o igual a 0")
      return
    }

    setIsSubmitting(true)
    const result = await updateProduct(product.id, {
      name: cleanName,
      slug: cleanSlug,
      sku: sku.trim() || null,
      description: description.trim() || null,
      category_id: categoryId || null,
      brand: brand.trim() || null,
      unit_measure: unitMeasure.trim() || null,
      location: location.trim() || null,
      stock: parseInt(stock, 10) || 0,
      min_stock: parseInt(minStock, 10) || 0,
      price: priceNum,
      image_urls: imageUrls,
      is_active: isActive,
    })
    setIsSubmitting(false)

    if (result.success) {
      toast.success("Producto actualizado")
      onSuccess()
    } else {
      toast.error(result.error || "Error al actualizar el producto")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader onClose={handleClose}>
            <DialogTitle>Editar producto</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">Slug</label>
                <Input
                  type="text"
                  value={slug}
                  placeholder="cable-thw-25mm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  rows={3}
                  className="flex w-full rounded-md border border-secondary bg-white px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">SKU</label>
                  <Input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Categoría</label>
                  <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="">Sin categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Marca</label>
                  <Input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Unidad medida</label>
                  <Input
                    type="text"
                    value={unitMeasure}
                    onChange={(e) => setUnitMeasure(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">Ubicación</label>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Stock</label>
                  <Input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Stock mín</label>
                  <Input
                    type="number"
                    min={0}
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">
                    Precio (S/) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <ProductImageUpload
                productId={product.id}
                currentUrls={imageUrls}
                onUrlsChange={setImageUrls}
                disabled={isSubmitting}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={isSubmitting}
                  className="rounded border-secondary"
                />
                <label htmlFor="editIsActive" className="text-sm font-medium text-secondary uppercase">
                  Producto activo
                </label>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="cursor-pointer uppercase"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}