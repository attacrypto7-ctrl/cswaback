#!/bin/bash
BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting all backend services..."
echo "Backend dir: $BACKEND_DIR"

# API
cd "$BACKEND_DIR/apps/api" && npx ts-node --transpile-only src/main.ts > /tmp/backend-api.log 2>&1 &
echo "API PID: $!"
sleep 1

# Worker
cd "$BACKEND_DIR/apps/worker" && npx tsx --tsconfig tsconfig.json src/main.ts > /tmp/backend-worker.log 2>&1 &
echo "Worker PID: $!"
sleep 1

# WA Gateway
cd "$BACKEND_DIR/apps/wa-gateway" && PORT=3002 node -r dotenv/config dist/main.js > /tmp/backend-wa.log 2>&1 &
echo "WA Gateway PID: $!"

echo "All started!"
echo "  API:  http://localhost:3000"
echo "  WA:   http://localhost:3002"
echo "  Redis: localhost:6379"
