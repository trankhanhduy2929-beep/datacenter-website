#!/bin/bash
#
# Script setup toàn bộ cho Datacenter Website
#

set -e

cd /root/.picoclaw/workspace/datacenter-website

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🚀 Setup Datacenter Website..."

# 1. Check dependencies
echo -e "${YELLOW}📦 Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# 2. Create database
echo -e "${YELLOW}🗄️  Creating database...${NC}"
mkdir -p data
touch data/datacenter.db
chmod 666 data/datacenter.db
echo -e "${GREEN}✅ Database created at data/datacenter.db${NC}"

# 3. Create uploads directory
echo -e "${YELLOW}📁 Creating uploads directory...${NC}"
mkdir -p uploads
chmod -R 777 uploads
echo -e "${GREEN}✅ Uploads directory created${NC}"

# 4. Create admin user
echo -e "${YELLOW}👤 Creating admin user...${NC}"
./create-admin.sh

echo ""
echo "🎉 Setup hoàn tất!"
echo ""
echo "📝 Thông tin đăng nhập:"
echo "   Email: admin@datacenter.com"
echo "   Password: admin123"
echo ""
echo "🚀 Để chạy server:"
echo "   npm run dev"
echo ""
echo "🌐 Truy cập: http://localhost:3000"
