#!/bin/bash

PORT=8000

# Find and kill any process holding the port
PID=$(lsof -t -i:$PORT)
if [ -n "$PID" ]; then
  echo "Stopping existing server running on port $PORT (PID: $PID)..."
  kill -9 $PID
  sleep 0.5
fi

echo "Starting local server..."
echo "👉 Open: http://localhost:$PORT"
python3 -m http.server $PORT
