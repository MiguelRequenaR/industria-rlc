"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { createProduct } from "@/actions/admin-actions"
import type { Category } from "@/types/database"
import { toast } from "react-toastify"
import { ProductImageUpload } from "./ProductImageUpload"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  categories: Category[]
}

export function AddProductModal({ isOpen, onClose, onSuccess, categories }: AddProductModalProps) {
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [brand, setBrand] = useState("")
  const [unitMeasure, setUnitMeasure] = useState("")
  const [location, setLocation] = useState("")
  const [stock, setStock] = useState("0")
  const [minStock, setMinStock] = useState("0")
  const [price, setPrice] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const priceNum = parseFloat(price)
    if (!name.trim()) return
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("El precio debe ser un número válido mayor o igual a 0")
      return
    }

    setIsSubmitting(true)
    const result = await createProduct({
      name: name.trim(),
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
      toast.success("Producto creado")
      setName("")
      setSku("")
      setDescription("")
      setCategoryId("")
      setBrand("")
      setUnitMeasure("")
      setLocation("")
      setStock("0")
      setMinStock("0")
      setPrice("")
      setImageUrls([])
      setIsActive(true)
      onSuccess()
      onClose()
    } else {
      toast.error(result.error || "Error al crear el producto")
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
            <DialogTitle>Crear nuevo producto</DialogTitle>
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
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Cable THW 2.5mm"
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 uppercase">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción del producto"
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
                    placeholder="ABC-001"
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
                    placeholder="Ej: Schneider"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1 uppercase">Unidad medida</label>
                  <Input
                    type="text"
                    value={unitMeasure}
                    onChange={(e) => setUnitMeasure(e.target.value)}
                    placeholder="Ej: Metro, Unidad"
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
                  placeholder="Ej: Estante A1"
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
                    placeholder="0.00"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <ProductImageUpload
                productId={null}
                currentUrls={imageUrls}
                onUrlsChange={setImageUrls}
                disabled={isSubmitting}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={isSubmitting}
                  className="rounded border-secondary"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-secondary uppercase">
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
              {isSubmitting ? "Creando..." : "Crear producto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}