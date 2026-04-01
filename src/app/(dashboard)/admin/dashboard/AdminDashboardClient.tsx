'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardClient({ user }: { user: any }) {
  const [stats, setStats] = useState({ users: 0, files: 0, storage: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('Xóa người dùng này?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Xóa người dùng thất bại!');
    }
  };

  if (loading) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🎯 Dashboard Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Tổng người dùng</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Tổng file</h3>
            <p className="text-3xl font-bold text-green-600">{stats.files}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Dung lượng</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.storage} MB</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">ID</th>
                  <th className="text-left py-2">Username</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.id}</td>
                    <td className="py-2">{u.username}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role === 'admin' ? 'Admin' : 'Member'}</td>
                    <td className="py-2">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
