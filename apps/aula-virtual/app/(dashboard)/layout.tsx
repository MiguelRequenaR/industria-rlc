import { AppSidebar } from "@/components/layouts/app-sidebar"
import { ToastContainer } from "react-toastify"
import "../globals.css"
import "react-toastify/dist/ReactToastify.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      
      <main className="pt-16">
        {children}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
