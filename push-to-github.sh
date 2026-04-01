#!/bin/bash

# ============================================
# Script: push-to-github.sh
# Mô tả: Tự động push code lên GitHub repository
# Tác giả: PicoClaw 🦞
# ============================================

set -e  # Exit on error

# 🔐 Configuration
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
GITHUB_USERNAME="${GITHUB_USERNAME:-trankhanhduy2929-beep}"
REPO_NAME="datacenter-website"
REMOTE_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# 🎯 Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 📍 Check if running from project directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}[ERROR] No package.json found. Please run this script from the project root.${NC}"
    exit 1
fi

# 🔐 Check GitHub Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}[WARNING] GITHUB_TOKEN environment variable is not set.${NC}"
    echo -e "${YELLOW}[INFO] Please set it before running: export GITHUB_TOKEN=ghp_your_token_here${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] Starting automated push process...${NC}"

# 1. Check git status
echo -e "${YELLOW}[1/5] Checking git status...${NC}"
if [ -d ".git" ]; then
    git status --short
else
    echo -e "${YELLOW}[INFO] Initializing git repository...${NC}"
    git init
    git config user.email "trankhanhduy2929@gmail.com"
    git config user.name "trankhanhduy2929-beep"
fi

# 2. Add all changes
echo -e "${YELLOW}[2/5] Adding all changes to staging...${NC}"
git add .

# 3. Check if there are changes to commit
CHANGED_FILES=$(git diff --cached --name-only)
if [ -z "$CHANGED_FILES" ]; then
    echo -e "${GREEN}[✓] No changes to commit.${NC}"
else
    echo -e "${YELLOW}[3/5] Committing changes...${NC}"
    git commit -m "chore: automated commit - $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 4. Set up remote if not exists
    echo -e "${YELLOW}[4/5] Configuring remote repository...${NC}"
    if ! git remote get-url origin > /dev/null 2>&1; then
        git remote add origin "$REMOTE_URL"
    else
        git remote set-url origin "$REMOTE_URL"
    fi
    
    # 5. Push to GitHub
    echo -e "${YELLOW}[5/5] Pushing to GitHub...${NC}"
    git push -u origin main 2>&1 || git push -u origin master 2>&1
    
    echo -e "${GREEN}[✓] Successfully pushed to GitHub!${NC}"
fi

echo -e "${GREEN}[✓] Automated push completed!${NC}"
