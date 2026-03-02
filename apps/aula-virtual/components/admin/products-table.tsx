"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Box } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { type Product, type Category } from "@/types/database"
import { deleteProduct } from "@/actions/admin-actions"
import Image from "next/image"
import { useProducts, useInvalidateProducts } from "@/hooks/use-products"
import { AddProductModal } from "./add-product-modal"
import { EditProductModal } from "./edit-product-modal"
import { toast } from "react-toastify"

interface ProductsTableProps {
  initialProducts: Product[]
  categories: Category[]
}

export function ProductsTable({ initialProducts, categories }: ProductsTableProps) {
  const { data: products = initialProducts } = useProducts(initialProducts)
  const invalidate = useInvalidateProducts()

  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  )

  const handleDeleted = async () => {
    if (!deletingProduct) return

    setIsDeleting(true)
    const result = await deleteProduct(deletingProduct.id)
    setIsDeleting(false)

    if (result.success) {
      toast.success("Producto eliminado")
      setDeletingProduct(null)
      invalidate()
    } else {
      toast.error(result.error || "Error al eliminar el producto")
    }
  }

  const handleInvalidate = () => invalidate()

  return (
    <div className="space-y-4 mx-5 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Box className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Productos
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Administra tu catálogo de productos
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-3 pt-5 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre, SKU, categoría o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 cursor-pointer uppercase"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="border-2 border-secondary rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Stock mín
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-8 text-center text-secondary uppercase"
                  >
                    {products.length === 0
                      ? "No hay productos registrados. Crea el primero."
                      : "No se encontraron productos con ese criterio."}
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.image_urls?.length ? (
                        <Image
                          src={p.image_urls[0]}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                          <Box className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 uppercase">
                      {p.name}
                    </td>
                    <td className="px-6 py-4 max-w-[200px] text-sm text-gray-700" title={p.description || undefined}>
                      {p.description ? (
                        p.description.length > 80 ? `${p.description.slice(0, 80)}...` : p.description
                      ) : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.sku || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.category?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {p.stock}
                      {p.stock <= p.min_stock && (
                        <span className="text-red-600 text-xs ml-1">(bajo)</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {p.min_stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      S/ {Number(p.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap uppercase">
                      <Badge variant={p.is_active ? "estudiante" : "super_admin"}>
                        {p.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-100 cursor-pointer"
                          title="Editar producto"
                          onClick={() => setEditingProduct(p)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-100 cursor-pointer"
                          title="Eliminar producto"
                          onClick={() => setDeletingProduct(p)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 uppercase">
        <div>
          Mostrando{" "}
          <span className="font-medium text-gray-900">{filtered.length}</span> de{" "}
          <span className="font-medium text-gray-900">{products.length}</span> productos
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleInvalidate}
        categories={categories}
      />

      {editingProduct && (
        <EditProductModal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
          categories={categories}
          onSuccess={() => {
            setEditingProduct(null)
            handleInvalidate()
          }}
        />
      )}

      <Dialog open={!!deletingProduct} onOpenChange={(open) => !open && setDeletingProduct(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader onClose={() => setDeletingProduct(null)}>
            <DialogTitle>Eliminar Producto</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {deletingProduct && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 uppercase">
                  ¿Estás seguro de que quieres eliminar el producto{" "}
                  <span className="font-semibold">{deletingProduct.name}</span>?
                </p>
                <p className="text-xs text-red-600 uppercase">
                  Esta acción es permanente.
                </p>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingProduct(null)}
              disabled={isDeleting}
              className="cursor-pointer uppercase"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleted}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer uppercase"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}