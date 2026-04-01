'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Mock user data (in real app, fetch from API)
    setUser({ username: 'Khánh Duy', email: 'duy@example.com', role: 'member' });
    setLoading(false);
  }, [router]);

  if (loading) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">👤 Thông tin cá nhân</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Đăng xuất
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Hồ sơ</h2>
          <div className="space-y-2">
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Vai trò:</strong> {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Quản lý dữ liệu</h2>
          <p className="text-gray-600 mb-4">Tính năng upload file và quản lý dữ liệu đang được phát triển...</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}
