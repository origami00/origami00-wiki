#!/bin/bash
# 一键部署脚本 - 在本地执行
# 用法: bash deploy/deploy.sh root@你的服务器IP /www/wwwroot/example.com

set -e

SERVER=$1
REMOTE_DIR=$2

if [ -z "$SERVER" ] || [ -z "$REMOTE_DIR" ]; then
    echo "用法: bash deploy/deploy.sh root@服务器IP /www/wwwroot/你的站点目录"
    exit 1
fi

echo "=== 1. 本地打包 ==="
npm run build

echo "=== 2. 上传文件到服务器 ==="
scp -r dist/* "$SERVER:$REMOTE_DIR/"

echo "=== 3. 重启 Nginx ==="
ssh "$SERVER" "nginx -t && systemctl reload nginx"

echo "=== 部署完成! ==="
