import {
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Tarjetas de resumen */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
            <GraduationCap className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>5</p>
          <p className="text-xs text-gray-500 mt-2">
            Cursos en progreso este semestre
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Tareas Pendientes</p>
            <CheckSquare className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--secondary)' }}>8</p>
          <p className="text-xs text-gray-500 mt-2">
            Tareas por entregar esta semana
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Promedio General</p>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>16.8</p>
          <p className="text-xs text-gray-500 mt-2">
            +0.5 respecto al mes anterior
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600">Próximos Eventos</p>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>3</p>
          <p className="text-xs text-gray-500 mt-2">
            Eventos esta semana
          </p>
        </div>
      </div>

      {/* Sección de contenido principal */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Tareas recientes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>Tareas Recientes</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tus tareas más recientes y sus estados
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                title: "Trabajo de Investigación",
                course: "Metodología de la Investigación",
                date: "Vence en 2 días",
                status: "pending",
              },
              {
                title: "Práctica Calificada",
                course: "Matemática Aplicada",
                date: "Vence en 5 días",
                status: "pending",
              },
              {
                title: "Proyecto Final",
                course: "Programación Web",
                date: "Entregado",
                status: "completed",
              },
              {
                title: "Ensayo Académico",
                course: "Comunicación Efectiva",
                date: "Vence mañana",
                status: "urgent",
              },
            ].map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{task.course}</p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    task.status === "completed"
                      ? "text-green-600"
                      : task.status === "urgent"
                        ? "text-red-600"
                        : "text-orange-600"
                  }`}
                >
                  {task.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cursos */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>Mis Cursos</h2>
            <p className="text-sm text-gray-600 mt-1">
              Progreso de tus cursos actuales
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              { name: "Programación Web", progress: 75, icon: BookOpen },
              { name: "Matemática Aplicada", progress: 60, icon: FileText },
              { name: "Metodología", progress: 85, icon: GraduationCap },
            ].map((course, index) => {
              const Icon = course.icon
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                      <span className="font-medium text-gray-900">{course.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${course.progress}%`,
                        backgroundColor: 'var(--secondary)'
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Anuncios */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>Anuncios Recientes</h2>
          <p className="text-sm text-gray-600 mt-1">
            Últimas noticias y actualizaciones de tus cursos
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "Nueva fecha de examen",
              course: "Matemática Aplicada",
              date: "Hace 2 horas",
              message: "El examen se ha reprogramado para el próximo viernes.",
            },
            {
              title: "Material de estudio disponible",
              course: "Programación Web",
              date: "Hace 1 día",
              message: "Nuevos recursos sobre React y Next.js han sido publicados.",
            },
          ].map((announcement, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 border-l-4 rounded-lg"
              style={{ borderLeftColor: 'var(--secondary)' }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{announcement.title}</p>
                  <p className="text-sm text-gray-600">{announcement.course}</p>
                  <p className="text-sm text-gray-700 mt-2">{announcement.message}</p>
                </div>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
