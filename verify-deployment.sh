#!/bin/bash
# Deployment Verification Checklist
# Run this before pushing to GitHub

echo "🔍 Maruti Nandan Website - Pre-Deployment Checklist"
echo "=================================================="
echo ""

# 1. Check file structure
echo "✓ File Structure:"
echo "  - index.html: $([ -f index.html ] && echo '✅' || echo '❌')"
echo "  - style.css: $([ -f style.css ] && echo '✅' || echo '❌')"
echo "  - script.js: $([ -f script.js ] && echo '✅' || echo '❌')"
echo "  - favicon.ico: $([ -f favicon.ico ] && echo '✅' || echo '❌')"
echo "  - vercel.json: $([ -f vercel.json ] && echo '✅' || echo '❌')"
echo ""

# 2. Check folders
echo "✓ Tile Folders:"
echo "  - granite/: $([ -d granite ] && echo '✅ (31 tiles)' || echo '❌')"
echo "  - indian marble/: $([ -d 'indian marble' ] && echo '✅ (9 tiles)' || echo '❌')"
echo "  - imported marble/: $([ -d 'imported marble' ] && echo '✅ (11 tiles)' || echo '❌')"
echo ""

# 3. Check manifests
echo "✓ JSON Manifests:"
echo "  - granite/index.json: $([ -f granite/index.json ] && echo '✅' || echo '❌')"
echo "  - indian marble/index.json: $([ -f 'indian marble/index.json' ] && echo '✅' || echo '❌')"
echo "  - imported marble/index.json: $([ -f 'imported marble/index.json' ] && echo '✅' || echo '❌')"
echo ""

# 4. Calculate sizes
echo "📊 Storage Breakdown:"
TOTAL=$(du -sh . | cut -f1)
CODE=$(du -sh index.html style.css script.js | tail -1 | awk '{print $1}')
TILES=$(du -sh granite 'indian marble' 'imported marble' | tail -1 | awk '{print $1}')
echo "  - Codebase (HTML/CSS/JS): $CODE"
echo "  - Tile Images: $TILES"
echo "  - Total: $TOTAL"
echo ""

# 5. Check for errors
echo "🔐 Code Quality:"
if grep -r "console.error\|debugger\|TODO\|FIXME" *.js *.html *.css 2>/dev/null | grep -v node_modules; then
  echo "  ⚠️  Warning: Found debug code or TODOs"
else
  echo "  ✅ No debug code found"
fi
echo ""

# 6. Git status
echo "📦 Git Status:"
if [ -d .git ]; then
  if [ -z "$(git status --porcelain)" ]; then
    echo "  ✅ Working directory clean"
  else
    echo "  ⚠️  Uncommitted changes:"
    git status --short
  fi
else
  echo "  ❌ Not a git repository"
fi
echo ""

echo "=================================================="
echo "✨ Pre-deployment check complete!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Deploy to production'"
echo "3. git push origin main"
echo "4. Go to https://vercel.com/new and import repo"
echo ""
