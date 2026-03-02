"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Plus, Edit, Trash2, Tags } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { type Category } from "@/types/database"
import { deleteCategory } from "@/actions/admin-actions"
import { useCategories, useInvalidateCategories } from "@/hooks/use-categories"
import { AddCategoryModal } from "./add-category-modal"
import { EditCategoryModal } from "./edit-category-modal"
import { toast } from "react-toastify"

interface CategoriesTableProps {
  initialCategories: Category[]
}

export function CategoriesTable({ initialCategories }: CategoriesTableProps) {
  const { data: categories = initialCategories } = useCategories(initialCategories)
  const invalidate = useInvalidateCategories()

  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleted = async () => {
    if (!deletingCategory) return

    setIsDeleting(true)
    const result = await deleteCategory(deletingCategory.id)
    setIsDeleting(false)

    if (result.success) {
      toast.success("Categoría eliminada")
      setDeletingCategory(null)
      invalidate()
    } else {
      toast.error(result.error || "Error al eliminar la categoría")
    }
  }

  const handleInvalidate = () => {
    invalidate()
  }

  return (
    <div className="space-y-4 mx-5 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Tags className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Categorías
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Administra las categorías para tus productos
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
            placeholder="Buscar por nombre o slug..."
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
          Nueva Categoría
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                  Fecha de creación
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
                    colSpan={5}
                    className="px-6 py-8 text-center text-secondary uppercase"
                  >
                    {categories.length === 0
                      ? "No hay categorías registradas. Crea la primera."
                      : "No se encontraron categorías con ese criterio."}
                  </td>
                </tr>
              ) : (
                filtered.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cat.image_url ? (
                        <div className="relative h-12 w-12 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                          <Image
                            src={cat.image_url}
                            alt={cat.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                          <Tags className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 uppercase">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(cat.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-100 cursor-pointer"
                          title="Editar categoría"
                          onClick={() => setEditingCategory(cat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-100 cursor-pointer"
                          title="Eliminar categoría"
                          onClick={() => setDeletingCategory(cat)}
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
          <span className="font-medium text-gray-900">
            {filtered.length}
          </span>{" "}
          de{" "}
          <span className="font-medium text-gray-900">
            {categories.length}
          </span>{" "}
          categorías
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

      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleInvalidate}
      />

      {editingCategory && (
        <EditCategoryModal
          isOpen={true}
          onClose={() => setEditingCategory(null)}
          category={editingCategory}
          onSuccess={() => {
            setEditingCategory(null)
            handleInvalidate()
          }}
        />
      )}

      <Dialog open={!!deletingCategory} onOpenChange={(open) => !open && setDeletingCategory(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader onClose={() => setDeletingCategory(null)}>
            <DialogTitle>Eliminar Categoría</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {deletingCategory && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 uppercase">
                  ¿Estás seguro de que quieres eliminar la categoría{" "}
                  <span className="font-semibold">{deletingCategory.name}</span>?
                </p>
                <p className="text-xs text-red-600 uppercase bg-red-100 p-2 rounded-lg">
                  Esta acción es permanente. Asegúrate de que no existan productos usando esta categoría.
                </p>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingCategory(null)}
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

