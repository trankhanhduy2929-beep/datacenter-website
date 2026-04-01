import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export default async function AdminDashboard() {
  const token = localStorage.getItem('token');
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🎯 Dashboard Admin</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Tổng người dùng</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Tổng file</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Dung lượng</h3>
            <p className="text-3xl font-bold text-purple-600">0 MB</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
          <p className="text-gray-600">Tính năng đang được phát triển...</p>
        </div>
      </div>
    </div>
  );
}
