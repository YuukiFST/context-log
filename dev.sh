#!/bin/bash
# Start Next.js dev server and open browser

npm run dev &
DEV_PID=$!

# Wait for server to be ready
sleep 3

# Open browser (Linux)
xdg-open http://localhost:3000 2>/dev/null || open http://localhost:3000 2>/dev/null

# Keep script running, forward Ctrl+C to dev server
trap "kill $DEV_PID" EXIT
wait $DEV_PID