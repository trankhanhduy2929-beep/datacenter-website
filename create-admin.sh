#!/bin/bash
#
# Script tạo admin user mặc định
#

cd /root/.picoclaw/workspace/datacenter-website

# Check if database exists
if [ ! -f "data/datacenter.db" ]; then
    echo "❌ Database không tồn tại. Tạo database trước!"
    exit 1
fi

# Create admin user using Node.js
node -e "
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = new Database('./data/datacenter.db');

// Create tables if not exists
db.exec(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS data_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    size INTEGER DEFAULT 0,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
\`);

const adminEmail = 'admin@datacenter.com';
const adminUsername = 'admin';
const adminPassword = 'admin123';

// Check if admin exists
const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);

if (existing) {
    console.log('✅ Admin user đã tồn tại');
    process.exit(0);
}

// Create admin
bcrypt.hash(adminPassword, 10, async (err, hash) => {
    if (err) {
        console.error('❌ Lỗi khi hash password:', err);
        process.exit(1);
    }

    const stmt = db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)');
    stmt.run(adminUsername, adminEmail, hash, 'admin');
    
    console.log('✅ Đã tạo admin user!');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('');
    console.log('📝 Hãy thay đổi password sau khi đăng nhập lần đầu!');
});
"
