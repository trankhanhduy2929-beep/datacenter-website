'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserData();
    fetchFiles();
  }, [router]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error('Failed to fetch user data', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/files', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (err) {
      console.error('Failed to fetch files', err);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !filename) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('filename', filename);

      const token = localStorage.getItem('token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        alert('Upload thành công!');
        setSelectedFile(null);
        setFilename('');
        fetchFiles();
      } else {
        const data = await res.json();
        alert(data.error || 'Upload thất bại!');
      }
    } catch (err) {
      alert('Lỗi khi upload!');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">👤 Thông tin cá nhân</h1>
          <button
            onClick={handleLogout}
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

        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Upload File</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên file</label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên file..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn file</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              disabled={uploading || !selectedFile || !filename}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Đang upload...' : 'Upload'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Danh sách file</h2>
          {files.length === 0 ? (
            <p className="text-gray-600">Chưa có file nào</p>
          ) : (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{file.filename}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {new Date(file.uploaded_at).toLocaleString()}
                    </p>
                  </div>
                  <a
                    href={`/api/files/${file.id}`}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    download
                  >
                    Tải về
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
