export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">🏢 Trung Tâm Dữ Liệu - Khánh Duy</h1>
      <p className="text-xl mb-8">Hệ thống quản lý dữ liệu tập trung</p>
      <div className="flex gap-4">
        <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Đăng nhập
        </a>
        <a href="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Đăng ký
        </a>
      </div>
    </main>
  );
}
