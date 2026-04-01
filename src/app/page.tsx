export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🏢 Trung Tâm Dữ Liệu
          </h1>
          <p className="text-2xl text-gray-600 mb-2">Khánh Duy</p>
          <p className="text-lg text-gray-500">
            Hệ thống quản lý dữ liệu tập trung, an toàn và hiệu quả
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">An Toàn</h3>
            <p className="text-gray-600">
              Dữ liệu được mã hóa và bảo vệ bằng công nghệ tiên tiến
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Nhanh Chóng</h3>
            <p className="text-gray-600">
              Truy cập dữ liệu nhanh chóng, mọi lúc mọi nơi
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Quản Lý Hiệu Quả</h3>
            <p className="text-gray-600">
              Giao diện trực quan, dễ dàng quản lý và theo dõi
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-6">
          <a
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Đăng Nhập
          </a>
          <a
            href="/register"
            className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Đăng Ký Ngay
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Trung Tâm Dữ Liệu - Khánh Duy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
