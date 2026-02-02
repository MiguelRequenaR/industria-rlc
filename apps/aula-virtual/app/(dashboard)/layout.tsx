import { AppSidebar } from "@/components/layouts/app-sidebar"
import "../globals.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      
      <main className="pt-16 md:pt-0 md:ml-64">
        {children}
      </main>
    </div>
  )
}
