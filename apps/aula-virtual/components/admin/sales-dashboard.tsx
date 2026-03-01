"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import {
  CreditCard,
  BarChart3,
  Cable,
  Lightbulb,
  Gauge,
  Info,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { SalesDataPoint, TopProduct } from "@/actions/admin-actions"
import { getSalesTrends, getSalesByMonth } from "@/actions/admin-actions"

interface SalesDashboardProps {
  initialTrends: SalesDataPoint[]
  initialTopProducts: TopProduct[]
  initialLowStockCount: number
}

const productIcons = [BarChart3, Cable, Lightbulb, Gauge]

function formatPrice(price: number) {
  return `S/. ${price.toFixed(2)}`
}

export function SalesDashboard({
  initialTrends,
  initialTopProducts,
  initialLowStockCount,
}: SalesDashboardProps) {
  const [trends, setTrends] = useState(initialTrends)
  const [topProducts, setTopProducts] = useState(initialTopProducts)
  const [lowStockCount, setLowStockCount] = useState(initialLowStockCount)
  const [range, setRange] = useState<"7" | "30" | "month">("30")
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  })
  const [isPending, startTransition] = useTransition()

  const monthOptions = (() => {
    const opts: { value: string; label: string }[] = []
    const now = new Date()
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      opts.push({ value, label: `${monthNames[d.getMonth()]} ${d.getFullYear()}` })
    }
    return opts
  })()

  const handleRangeChange = (r: "7" | "30" | "month") => {
    setRange(r)
    startTransition(async () => {
      if (r === "month") {
        const [y, m] = selectedMonth.split("-").map(Number)
        const data = await getSalesByMonth(y, m)
        setTrends(data)
      } else {
        const data = await getSalesTrends(r === "7" ? 7 : 30)
        setTrends(data)
      }
    })
  }

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value)
    const [y, m] = value.split("-").map(Number)
    startTransition(async () => {
      const data = await getSalesByMonth(y, m)
      setTrends(data)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Ventas
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Tendencias de ventas y productos más vendidos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Card izquierda: Tendencias de ventas */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Tendencias de ventas en el tiempo
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Distribución de ingresos por período
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleRangeChange("7")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  range === "7"
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                7 días
              </button>
              <button
                type="button"
                onClick={() => handleRangeChange("30")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  range === "30"
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                30 días
              </button>
              <button
                type="button"
                onClick={() => handleRangeChange("month")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  range === "month"
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Por mes
              </button>
              {range === "month" && (
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="h-[320px]">
            {trends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `S/. ${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [formatPrice(value), "Ingresos"]}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                    dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#2563eb" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl">
                <p className="text-sm">No hay datos de ventas en este período</p>
              </div>
            )}
          </div>
        </div>

        {/* Card derecha: Productos más vendidos */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Productos más vendidos
            </h2>
            <Link
              href="/admin/productos"
              className="text-sm font-medium text-secondary hover:underline"
            >
              Ver todos
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {topProducts.length > 0 ? (
              topProducts.map((product, i) => {
                const Icon = productIcons[i % productIcons.length]
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sales} venta{product.sales !== 1 ? "s" : ""} · {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {product.trend === "up" && product.sampleTrendPercent != null && (
                        <span className="text-sm font-medium text-green-600">
                          +{product.sampleTrendPercent}%
                        </span>
                      )}
                      {product.trend === "stable" && (
                        <span className="text-sm text-gray-600">Estable</span>
                      )}
                      {product.trend === "down" && product.sampleTrendPercent != null && (
                        <span className="text-sm font-medium text-red-600">
                          {product.sampleTrendPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p className="text-sm">No hay ventas registradas aún</p>
              </div>
            )}
          </div>

          {lowStockCount > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {lowStockCount} producto{lowStockCount !== 1 ? "s" : ""} de los más vendidos
                    {" "}tiene{lowStockCount === 1 ? "" : "n"} bajo stock. Considera reponer.
                  </p>
                  <Link href="/admin/productos">
                    <Button className="mt-3 gap-2 cursor-pointer">
                      Gestionar stock
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
