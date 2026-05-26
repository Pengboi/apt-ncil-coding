#!/bin/bash
# switch-to-remote.sh
# Switches environment back to remote Supabase

echo "🔄 Switching to REMOTE Supabase..."
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$PROJECT_DIR/.env.local"
BACKUP_FILE="$PROJECT_DIR/.env.local.remote"

# Check if we have a remote backup
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ No remote backup found at .env.local.remote"
    echo ""
    echo "Creating from known remote config..."
    
    cat > "$ENV_FILE" << EOF
# Remote Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jevltyioavvjxvjwmiwy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_eUtuJUSlwy0hn7NzukJYjA_tvL1Wohk
EOF
    
    echo "✅ Restored remote configuration"
else
    # Restore from backup
    cp "$BACKUP_FILE" "$ENV_FILE"
    rm "$BACKUP_FILE"
    echo "✅ Restored .env.local from backup"
fi

echo ""
echo "🌐 Now using REMOTE Supabase:"
echo "   URL: https://jevltyioavvjxvjwmiwy.supabase.co"
echo ""
echo "🚀 Start dev server:"
echo "   npm run dev"
echo ""
