# Trung Tâm Dữ Liệu - Khánh Duy

Hệ thống quản lý dữ liệu tập trung với Next.js + React + SQLite

## 🚀 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Khởi tạo database
npm run db:init

# Chạy development server
npm run dev
```

## 🔐 Cấu hình

Tạo file `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=./datacenter.db
JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── (auth)/           # Login, Register
│   ├── (dashboard)/      # Admin & User dashboards
│   ├── api/              # API routes
│   └── layout.tsx
├── components/           # React components
├── lib/                  # Utilities (db, auth)
└── types/                # TypeScript types
```

## 🌐 Deploy lên Vercel

### Bước 1: Push lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://trankhanhduy2929-beep:${GITHUB_TOKEN}@github.com/trankhanhduy2929-beep/datacenter-website.git
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Truy cập https://vercel.com/new
2. Import repository `trankhanhduy2929-beep/datacenter-website`
3. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`
4. Click **Deploy**

## 🛠️ Tính năng hiện tại

- ✅ Authentication (Login/Register)
- ✅ Admin Dashboard
- ✅ User Profile
- ✅ SQLite Database
- ✅ JWT Token Authentication

## 🚧 Tính năng đang phát triển

- 🔄 File upload & management
- 🔄 Data analytics
- 🔄 User management (admin)
- 🔄 API endpoints cho CRUD operations

## 👨‍💻 Author

Khánh Duy - Backend Developer

## 📄 License

MIT

---

## 🚀 Tự động Push Code lên GitHub

### **Cách 1: Sử dụng Script Tự động**

```bash
# 1. Cấu hình token GitHub
export GITHUB_TOKEN=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

# 2. Chạy script
chmod +x push-to-github.sh
./push-to-github.sh
```

✅ **Kết quả**: Code tự động được commit và push lên GitHub

---

### **Cách 2: Push thủ công (nếu cần)**

```bash
# Cấu hình token
export GITHUB_TOKEN=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

# Push từng bước
git add .
git commit -m "Initial commit"
git push -u origin main
```

---

## 📋 Checklist Deploy

1. ✅ Push code lên GitHub
2. ✅ Import vào Vercel
3. ✅ Cấu hình Environment Variables
4. ✅ Deploy và test

---
