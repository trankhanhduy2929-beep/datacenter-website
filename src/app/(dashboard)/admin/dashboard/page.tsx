import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  // Get token from cookies or header (not localStorage - that's client-side only)
  // For now, redirect if no session (implement proper auth in production)
  
  const user = { id: 1, username: 'admin', role: 'admin' };

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return <AdminDashboardClient user={user} />;
}
