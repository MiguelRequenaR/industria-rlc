import {
  Users,
  GraduationCap,
  UserCheck,
  FileText,
  Activity,
  Plus,
  ArrowRight,
  LayoutDashboard,
  Eye,
  Clock
} from 'lucide-react';
import { getDashboardStats, getMostViewedCourses, getLatestCertificates } from '@/actions/admin-actions';
import { LatestCertificates } from '@/components/admin/latest-certificates';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const [stats, mostViewedCourses, latestCertificates] = await Promise.all([
    getDashboardStats(),
    getMostViewedCourses(3),
    getLatestCertificates(3)
  ]);
  
  const detailedStats = [
    { label: 'Usuarios Totales', value: stats.totalUsers, icon: Users },
    { label: 'Docentes Activos', value: stats.totalTeachers, icon: UserCheck },
  ];

  const quickActions = [
    { title: 'Crear Curso', icon: Plus, href: '/admin/cursos', colorIcon: 'text-blue-500', bgAction: 'bg-blue-50' },
    { title: 'Añadir Usuario', icon: Users, href: '/admin/invitaciones', colorIcon: 'text-green-500', bgAction: 'bg-green-50' },
    { title: 'Crear Blog', icon: FileText, href: '/admin/blog', colorIcon: 'text-yellow-500', bgAction: 'bg-yellow-50' },
    { title: 'Ver Usuarios', icon: Users, href: '/admin/usuarios', colorIcon: 'text-red-500', bgAction: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8 py-10 min-h-screen mx-5">
      {/* Header mejorado */}
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-8 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-5 h-5 md:w-10 md:h-10 text-gray-700" />
            <h1 className="text-xl md:text-4xl font-bold text-gray-700 tracking-tight uppercase">
              Panel de Administración
            </h1>
          </div>
          <p className="text-gray-700 text-sm md:text-lg uppercase">
            Bienvenido de nuevo, aquí está un resumen de tu plataforma.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-20 w-40 h-40 bg-white/5 rounded-full"></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className="col-span-2 bg-secondary/20 p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute right-6 bottom-6 opacity-30 pointer-events-none">
            <Clock className="w-24 h-24 text-secondary/50" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-blue-200 rounded-full w-16 h-16 shadow-lg">
              <Clock className="w-10 h-10 text-blue-500" />
            </div>
            <div>
              <h2 className="uppercase text-xl text-blue-500 font-semibold mb-1">
                Horas Totales de Capacitación Impartidas
              </h2>
              <p className="text-4xl font-bold text-gray-700">
                {stats.totalTrainingHoursDelivered}
                <span className="text-lg ml-1 font-normal uppercase text-blue-600">
                  {stats.totalTrainingHoursDelivered === 1 ? "hora" : "horas"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='p-6 bg-secondary/20 rounded-3xl'>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg uppercase text-gray-700">Estado del Sistema</h2>
              <Activity className="h-5 w-5 text-secondary" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {detailedStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 p-4 rounded-3xl bg-blue-50 transition-colors"
                  >
                    <div className="shrink-0">
                      <Icon className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[16px] uppercase text-blue-500">
                        {stat.label}: {stat.value} {stat.value === 1 ? 'usuario' : 'usuarios'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='col-span-2 p-6 bg-secondary/20 rounded-3xl'>
          <div>
            <h2 className='uppercase text-lg mb-4 text-gray-700'>
              Cursos más vistos
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {mostViewedCourses.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">No hay cursos con inscripciones aún.</p>
              ) : (
                mostViewedCourses.map((course) => (
                  <div key={course.id} className='bg-blue-50 p-4 rounded-3xl space-y-2'>
                    <h3 className='text-sm uppercase'>{course.title}</h3>
                    <div className='flex items-center gap-2'>
                      <div className='bg-blue-100 rounded-sm p-1 border border-blue-500'>
                        <Eye className='w-4 h-4 text-blue-500' />
                      </div>
                      <p className='text-xs text-blue-500'>
                        {course.enrollmentsCount} {course.enrollmentsCount === 1 ? 'alumno inscrito' : 'alumnos inscritos'}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='bg-green-100 rounded-sm p-1 border border-green-500'>
                        <Clock className='w-4 h-4 text-green-500' />
                      </div>
                      <p className='text-xs text-green-500'>
                        {course.duration_hours} {course.duration_hours === 1 ? 'hora' : 'horas'} de contenido
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='bg-yellow-100 rounded-sm p-1 border border-yellow-500'>
                        <GraduationCap className='w-4 h-4 text-yellow-500' />
                      </div>
                      <p className='text-xs text-yellow-500'>
                        {course.certificatesCount} {course.certificatesCount === 1 ? 'certificado emitido' : 'certificados emitidos'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className='row-span-2 p-6 bg-secondary/20 rounded-3xl'>
          <div>
            <h2 className='uppercase text-lg mb-4 text-gray-700'>
              Últimos Certificados Emitidos
            </h2>
            <LatestCertificates certificates={latestCertificates} />
          </div>
        </div>
        <div className='col-span-2 p-6 bg-secondary/20 rounded-3xl'>
          <div className="rounded-2xl">
            <h2 className="text-lg uppercase mb-4 text-gray-700">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    href={action.href}
                    className={`flex items-center gap-3 p-4 rounded-3xl ${action.bgAction} transition-all group border border-transparent hover:border-secondary/20`}
                  >
                    <div className={`shrink-0 w-10 h-10 ${action.bgAction} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${action.colorIcon}`} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 uppercase ">
                      {action.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-700 ml-auto group-hover:translate-x-1 transition-transform" />
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
