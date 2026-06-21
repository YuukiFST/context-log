#!/bin/bash
# Prototype: context.log IDE Layout
# Run: bash prototypes/run.sh
# Then open http://localhost:3030/ide-layout.html
cd "$(dirname "$0")"
echo "=== context.log — IDE Layout Prototype ==="
echo "Server: http://localhost:3030/ide-layout.html"
echo ""
echo "Variants:"
echo "  A — VSCode Classic (activity bar + sidebar + terminal bottom)"
echo "  B — Zed Minimal (sidebar overlay, floating terminal drawer)"
echo "  C — Terminal-Centric (terminal always visible, sidebar right)"
echo ""
echo "Usage: ?variant=A&theme=dark"
echo "Keys: ← → cycle variants"
echo ""
python3 -m http.server 3030
