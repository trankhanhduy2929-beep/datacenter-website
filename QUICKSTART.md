# 🚀 Quick Start - Datacenter Website

## 1. Cài đặt nhanh

```bash
cd /root/.picoclaw/workspace/datacenter-website
./setup.sh
```

## 2. Chạy server

```bash
npm run dev
```

## 3. Truy cập

- Trang chủ: http://localhost:3000
- Đăng nhập: http://localhost:3000/login
- Đăng ký: http://localhost:3000/register

## 4. Tài khoản mặc định

```
Email: admin@datacenter.com
Password: admin123
```

⚠️ **Nhớ thay đổi password sau khi đăng nhập lần đầu!**

## 5. Các tính năng chính

### ✅ User (Member)
- Đăng ký/Đăng nhập
- Upload file
- Download file
- Quản lý hồ sơ

### ✅ Admin
- Xem thống kê (số user, số file, dung lượng)
- Quản lý người dùng (xem/xóa)
- Tất cả tính năng của member

## 6. Troubleshooting

### "Lỗi kết nối" khi đăng ký
```bash
mkdir -p data
touch data/datacenter.db
chmod 666 data/datacenter.db
```

### Permission denied
```bash
chmod 666 data/datacenter.db
chmod -R 777 uploads/
```

## 7. Deploy lên Vercel

```bash
# Cài Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
./deploy-vercel.sh
```

## 8. Cấu trúc project

```
src/
├── app/
│   ├── (auth)/         # Login, Register
│   ├── (dashboard)/    # Protected pages
│   │   ├── admin/      # Admin dashboard
│   │   └── user/       # User profile
│   ├── api/            # API endpoints
│   └── page.tsx        # Home page
├── lib/
│   ├── db.ts           # SQLite connection
│   └── auth.ts         # Auth utilities
└── data/
    └── datacenter.db   # Database file
```

## 9. API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user

### Files
- `POST /api/upload` - Upload file
- `GET /api/files` - List files
- `GET /api/files/[id]` - Download file

### Admin
- `GET /api/admin/stats` - Thống kê
- `GET /api/admin/users` - List users
- `DELETE /api/admin/users/[id]` - Xóa user

---

**Hỗ trợ**: Nếu có vấn đề, check console log và database permissions.
