import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  UserCheck, 
  CheckCircle2, 
  FolderOpen, 
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Activity,
  Plus,
  ArrowRight,
  Sparkles,
  Award,
  Target
} from 'lucide-react';
import { getDashboardStats } from '@/actions/admin-actions';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const mainStats = [
    {
      title: 'Total Usuarios',
      value: stats.totalUsers,
    },
    {
      title: 'Cursos Activos',
      value: stats.publishedCourses,
    },
    {
      title: 'Inscripciones',
      value: stats.totalEnrollments,
    },
  ];

  const detailedStats = [
    { label: 'Estudiantes', value: stats.totalStudents, icon: GraduationCap },
    { label: 'Docentes', value: stats.totalTeachers, icon: UserCheck },
    { label: 'Administradores', value: stats.totalAdmins, icon: Users },
    { label: 'Total Cursos', value: stats.totalCourses, icon: BookOpen },
    { label: 'Módulos', value: stats.totalModules, icon: FolderOpen },
    { label: 'Lecciones', value: stats.totalLessons, icon: FileText },
  ];

  const recentActivity = [
    { action: 'Nuevo estudiante registrado', user: 'Juan Pérez', time: 'Hace 5 minutos', icon: Users },
    { action: 'Curso publicado', user: 'María García', time: 'Hace 15 minutos', icon: BookOpen },
    { action: 'Módulo completado', user: 'Carlos López', time: 'Hace 1 hora', icon: CheckCircle2 },
    { action: 'Nueva inscripción', user: 'Ana Martínez', time: 'Hace 2 horas', icon: Award },
    { action: 'Lección añadida', user: 'Pedro Sánchez', time: 'Hace 3 horas', icon: FileText },
  ];

  const quickActions = [
    { title: 'Crear Curso', icon: Plus, href: '/admin/cursos' },
    { title: 'Añadir Usuario', icon: Users, href: '/admin/usuarios' },
  ];

  return (
    <div className="space-y-8 p-8 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header mejorado */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Panel de Administración
            </h1>
          </div>
          <p className="text-white text-lg">
            Bienvenido de nuevo, aquí está un resumen de tu plataforma
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      {/* Estadísticas principales con diseño mejorado */}
      <div className="grid gap-6 md:grid-cols-3">
        {mainStats.map((card) => {
          return (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-secondary/20"
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-secondary uppercase tracking-wider">
                      {card.title}
                    </p>
                    <p className="text-4xl font-semibold text-primary">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Estadísticas detalladas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Estadísticas Detalladas</h2>
              <Activity className="h-5 w-5 text-secondary" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {detailedStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-secondary/5 transition-colors border border-transparent hover:border-secondary/20"
                  >
                    <div className="shrink-0">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-secondary">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Actividad Reciente</h2>
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/5 transition-colors"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shadow-md">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary">{activity.action}</p>
                      <p className="text-xs text-secondary">{activity.user}</p>
                    </div>
                    <div className="shrink-0">
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-secondary/10 rounded-lg transition-colors">
              Ver toda la actividad
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sidebar con acciones rápidas y calendario */}
        <div className="space-y-6">
          {/* Acciones rápidas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <h2 className="text-xl font-bold text-primary mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-secondary/10 transition-all group border border-transparent hover:border-secondary/20"
                  >
                    <div className="shrink-0 w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary group-hover:text-secondary">
                      {action.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-secondary ml-auto group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Resumen del mes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-secondary">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-secondary" />
              <h2 className="text-xl font-bold text-secondary">Resumen del Mes</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg backdrop-blur-sm border border-primary/10">
                <span className="text-sm font-medium text-secondary">Nuevos usuarios</span>
                <span className="text-2xl font-bold text-secondary">+{Math.floor(stats.totalUsers * 0.12)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg backdrop-blur-sm border border-primary/10">
                <span className="text-sm font-medium text-secondary">Cursos creados</span>
                <span className="text-2xl font-bold text-secondary">+{Math.floor(stats.totalCourses * 0.08)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg backdrop-blur-sm border border-primary/10">
                <span className="text-sm font-medium text-secondary">Inscripciones</span>
                <span className="text-2xl font-bold text-secondary">+{Math.floor(stats.totalEnrollments * 0.23)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary/20">
              <p className="text-xs text-primary/80">
                ¡Excelente progreso! El sistema está creciendo cada día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
