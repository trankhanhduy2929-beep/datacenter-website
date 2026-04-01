#!/bin/bash
#
# Script tự động deploy Next.js lên Vercel
# Yêu cầu: Đã cài Vercel CLI (npm i -g vercel)
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Starting Vercel deployment..."

# 1. Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not installed. Installing...${NC}"
    npm i -g vercel
fi

# 2. Login to Vercel (if not already)
echo -e "${YELLOW}🔐 Checking Vercel login...${NC}"
if ! vercel ls &> /dev/null; then
    echo -e "${YELLOW}👤 Not logged in. Running 'vercel login'...${NC}"
    vercel login
fi

# 3. Check project name
PROJECT_NAME="datacenter-website"
echo -e "${GREEN}✅ Project name: $PROJECT_NAME${NC}"

# 4. Deploy with environment variables
echo -e "${YELLOW}📦 Building and deploying to Vercel...${NC}"

# Deploy to production
vercel --prod \
    --confirm \
    --name "$PROJECT_NAME" \
    --secret DATABASE_URL="$DATABASE_URL" \
    --secret JWT_SECRET="$JWT_SECRET" \
    --secret NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
    --git-ignore

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo "📍 Project URL: https://$PROJECT_NAME.vercel.app"
