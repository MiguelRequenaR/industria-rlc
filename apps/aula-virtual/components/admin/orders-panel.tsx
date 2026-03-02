"use client"

import { useState, useTransition } from "react"
import {
  ShoppingCart,
  Filter,
  ChevronLeft,
  ChevronRight,
  Printer,
  User,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { OrderWithItemDetails } from "@/actions/admin-actions"
import { getOrders, updateOrderStatus } from "@/actions/admin-actions"
import { toast } from "react-toastify"

interface OrdersPanelProps {
  initialOrders: OrderWithItemDetails[]
  initialTotal: number
}

const pageSize = 10

const statusStyles: Record<string, string> = {
  pendiente: "bg-orange-500 text-white",
  completado: "bg-blue-500 text-white",
  cancelado: "bg-gray-200 text-gray-700",
}

const statusLabels: Record<string, string> = {
  pendiente: "Pendiente",
  completado: "Completado",
  cancelado: "Cancelado",
}

function formatOrderId(id: string): string {
  return `#ORD-${id.slice(-4).toUpperCase()}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-PE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr)
  const date = d.toLocaleDateString("es-PE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const time = d.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  })
  return `${date} • ${time}`
}

export function OrdersPanel({
  initialOrders,
  initialTotal,
}: OrdersPanelProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItemDetails | null>(
    initialOrders[0] ?? null
  )
  const [adminNotes, setAdminNotes] = useState("")
  const [isPending, startTransition] = useTransition()

  const loadPage = (newPage: number) => {
    startTransition(async () => {
      const { orders: data, total: count } = await getOrders(newPage, pageSize)
      setOrders(data)
      setTotal(count)
      setPage(newPage)
      setSelectedOrder(data[0] ?? null)
    })
  }

  const handleMarkCompleted = async () => {
    if (!selectedOrder) return
    const result = await updateOrderStatus(selectedOrder.id, "completado")
    if (result.success) {
      toast.success("Orden marcada como completada")
      loadPage(page)
    } else {
      toast.error(result.error ?? "Error al actualizar")
    }
  }

  const handleCancel = async () => {
    if (!selectedOrder) return
    const result = await updateOrderStatus(selectedOrder.id, "cancelado")
    if (result.success) {
      toast.success("Orden cancelada")
      loadPage(page)
    } else {
      toast.error(result.error ?? "Error al cancelar")
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = total === 0 ? 0 : Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col gap-4 min-h-0" style={{ height: "calc(100vh - 12rem)" }}>
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg shrink-0">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Gestión de Pedidos
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Administra las órdenes de la web corporativa
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Panel izquierdo: Órdenes recientes */}
        <div className="flex-1 lg:min-w-0 lg:flex-3 flex flex-col bg-secondary/20 rounded-3xl overflow-hidden min-h-0">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-bold text-gray-800 uppercase">
              Órdenes Recientes
            </h2>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              aria-label="Filtrar"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full">
              <thead className="bg-secondary/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id
                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`font-medium ${
                            isSelected ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {formatOrderId(order.id)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customer_name}
                          </p>
                          <p className="text-sm text-gray-500 truncate max-w-[180px]">
                            {order.customer_address ?? "—"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        S/. {order.total_amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold uppercase ${
                            statusStyles[order.status] ?? "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {statusLabels[order.status] ?? order.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center justify-between shrink-0">
            <p className="text-sm text-gray-600">
              Mostrando {from}–{to} de {total} órdenes
            </p>
          </div>
        </div>

        {/* Panel derecho: Detalles de la orden */}
        <div className="lg:w-[400px] bg-secondary/20 rounded-3xl overflow-hidden flex flex-col">
          {selectedOrder ? (
            <>
              <div className="p-6 border-b border-gray-700/50">
                <p className="text-xs font-semibold text-gray-700 uppercase mb-1">
                  Detalles de la orden
                </p>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {formatOrderId(selectedOrder.id)}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mt-1 uppercase">
                  Realizado el {formatDateTime(selectedOrder.created_at)}
                </p>
              </div>

              <div className="p-6 border-b border-gray-700/50">
                <p className="text-xs font-semibold text-gray-700 uppercase mb-3">
                  Información del cliente
                </p>
                <div className="flex gap-3">
                  <User className="w-5 h-5 text-gray-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">
                      {selectedOrder.customer_name}
                    </p>
                    <p className="text-sm text-blue-600">
                      {selectedOrder.customer_phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.customer_address ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1">
                <p className="text-xs font-semibold text-gray-700 uppercase mb-3">
                  Resumen del pedido
                </p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-2"
                    >
                      <div>
                        <p className="font-medium text-gray-700">{item.name}</p>
                        <p className="text-sm text-gray-700 uppercase">
                          Cant: {item.qty} x S/. {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-700 shrink-0">
                        S/. {(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-3 space-y-1 border-t border-gray-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 uppercase">Subtotal</span>
                      <span>S/. {selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span className="text-gray-700 uppercase">Envío</span>
                      <span className="uppercase">Consultar</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-1">
                      <span className="text-gray-700 uppercase">Total</span>
                      <span>S/. {selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.status === "pendiente" && (
                <div className="p-6 border-b border-gray-200 flex flex-col gap-2">
                  <Button
                    onClick={handleMarkCompleted}
                    className="w-full cursor-pointer gap-2 uppercase border border-transparent hover:bg-white hover:text-secondary hover:border-secondary transition-all duration-300"
                  >
                    <Check className="w-4 h-4" />
                    Marcar como completado
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full cursor-pointer gap-2 border-red-500 text-red-600 hover:bg-red-50 uppercase"
                  >
                    <X className="w-4 h-4" />
                    Cancelar orden
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No hay órdenes</p>
              <p className="text-sm">Selecciona una orden de la lista</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
