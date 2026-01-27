import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  UserCheck, 
  CheckCircle2, 
  FolderOpen, 
  FileText,
  Activity,
  Plus,
  ArrowRight,
  Award,
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
    <div className="space-y-8 pt-10 min-h-screen max-w-7xl mx-auto">
      {/* Header mejorado */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-2xl mx-4 md:mx-0">
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
      <div className="grid gap-6 md:grid-cols-3 mx-4 md:mx-0">
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

      <div className="grid lg:grid-cols-3 gap-6 mx-4 md:mx-0">
        {/* Estadísticas detalladas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">Estadísticas Detalladas</h2>
              <Activity className="h-5 w-5 text-secondary" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
}
