#!/bin/bash
cd /root/.picoclaw/workspace/datacenter-website
mkdir -p data
touch data/datacenter.db
chmod 666 data/datacenter.db
echo "✅ Database đã được tạo!"
