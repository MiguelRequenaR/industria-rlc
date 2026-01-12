import { AppSidebar } from "@/components/app-sidebar"
import { Menu } from "lucide-react"
import "../globals.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-6">
          <h1 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
            Aula Virtual Industrial RLC
          </h1>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
