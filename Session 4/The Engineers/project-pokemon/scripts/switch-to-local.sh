#!/bin/bash
# switch-to-local.sh
# Switches environment to use local Supabase

echo "🔄 Switching to LOCAL Supabase..."
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$PROJECT_DIR/.env.local"
BACKUP_FILE="$PROJECT_DIR/.env.local.remote"

# Check if already on local
if [ -f "$ENV_FILE" ]; then
    if grep -q "localhost:54321" "$ENV_FILE"; then
        echo "⚠️  Already using local Supabase!"
        echo ""
        npx supabase status
        exit 0
    fi
fi

# Backup current env
if [ -f "$ENV_FILE" ]; then
    echo "💾 Backing up current .env.local to .env.local.remote"
    cp "$ENV_FILE" "$BACKUP_FILE"
fi

# Get local Supabase credentials
echo "🔧 Getting local Supabase credentials..."
echo ""

# Check if Supabase is running
if ! npx supabase status > /dev/null 2>&1; then
    echo "❌ Local Supabase is not running!"
    echo ""
    echo "Start it with:"
    echo "  npx supabase start"
    echo ""
    exit 1
fi

# Get the anon key from supabase status
ANON_KEY=$(npx supabase status | grep "anon key" | sed 's/.*anon key: //' | tr -d ' ')

if [ -z "$ANON_KEY" ]; then
    echo "❌ Could not get anon key from supabase status"
    exit 1
fi

echo "✅ Got local credentials"
echo ""

# Write new env file
cat > "$ENV_FILE" << EOF
# Local Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY

# Remote Supabase (backup reference)
# REMOTE_SUPABASE_URL=https://jevltyioavvjxvjwmiwy.supabase.co
# REMOTE_SUPABASE_ANON_KEY=sb_publishable_eUtuJUSlwy0hn7NzukJYjA_tvL1Wohk
EOF

echo "✅ Updated .env.local"
echo ""
echo "🌐 Now using:"
echo "   API:      http://localhost:54321"
echo "   Database: postgresql://postgres:postgres@localhost:54322/postgres"
echo "   Studio:   http://localhost:54323"
echo ""
echo "🚀 Start dev server:"
echo "   npm run dev"
echo ""
