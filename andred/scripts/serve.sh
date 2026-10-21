#!/bin/sh
# Ricostruisce e riavvia il server di produzione sulla porta 3123.
cd "$(dirname "$0")/.."
for p in $(ps -eo pid,args | grep -E "next-server|next start" | grep -v grep | awk '{print $1}'); do kill "$p" 2>/dev/null; done
npx next build >/tmp/claude-0/build.log 2>&1 || { tail -30 /tmp/claude-0/build.log; exit 1; }
nohup npx next start -p 3123 >/tmp/claude-0/next.log 2>&1 &
sleep 3
