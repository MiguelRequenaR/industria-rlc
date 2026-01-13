import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient();
  // se verifica la sesion
  const { data: {user} } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  // se verifica el rol del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  const role = profile?.role || 'estudiante';
  // se redirige al usuario segun su rol
  if (role === 'admin') redirect('/admin');
  if (role === 'docente') redirect('/docente');

  redirect('/estudiante');
}
