#!/bin/sh
# Ricostruisce e riavvia il server di produzione sulla porta 3123.
cd "$(dirname "$0")/.."
[ -f .server.pid ] && kill "$(cat .server.pid)" 2>/dev/null
npx next build >/tmp/claude-0/build.log 2>&1 || { tail -30 /tmp/claude-0/build.log; exit 1; }
nohup npx next start -p 3123 >/tmp/claude-0/next.log 2>&1 &
echo $! > .server.pid
sleep 3
