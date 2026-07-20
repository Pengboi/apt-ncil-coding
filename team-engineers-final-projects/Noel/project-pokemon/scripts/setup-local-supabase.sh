#!/bin/bash
# setup-local-supabase.sh
# Sets up local Supabase and mirrors the remote database schema

set -e

echo "🚀 Setting up Local Supabase for Pokemon Price Tracker"
echo "======================================================="
echo ""

# Check if Docker is running
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo ""
    echo "Please start Docker Desktop first:"
    echo "  open /Applications/Docker.app"
    echo ""
    echo "Then wait for Docker to fully start and re-run this script."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Navigate to project
cd "$(dirname "$0")/.."
PROJECT_DIR=$(pwd)
echo "📁 Project directory: $PROJECT_DIR"
echo ""

# Check if supabase is already initialized
if [ ! -f "supabase/config.toml" ]; then
    echo "🔧 Initializing Supabase..."
    npx supabase init
else
    echo "✅ Supabase already initialized"
fi

echo ""
echo "🐳 Starting Supabase local services..."
echo "   (This will download Docker images on first run - takes ~2-3 minutes)"
echo ""
npx supabase start

echo ""
echo "📊 Local Supabase is running!"
echo ""
echo "Services:"
echo "  🌐 API:         http://localhost:54321"
echo "  🗄️  Database:    postgresql://postgres:postgres@localhost:54322/postgres"
echo "  📧 Studio (UI): http://localhost:54323"
echo ""

# Apply migrations
echo "🔄 Applying database migrations..."
echo ""

# Combine all migrations
MIGRATIONS_DIR="$PROJECT_DIR/supabase/migrations"
COMBINED_SQL="$PROJECT_DIR/supabase/temp_combined.sql"

# Create combined SQL file (excluding sample data for now)
cat $(ls -v "$MIGRATIONS_DIR"/*.sql | grep -v sample_data) > "$COMBINED_SQL"

echo "📄 Created combined migration file"
echo ""

# Reset the database and apply migrations
echo "🔄 Resetting database and applying migrations..."
npx supabase db reset < "$COMBINED_SQL"

# Clean up
rm -f "$COMBINED_SQL"

echo ""
echo "✅ Database migrations applied!"
echo ""

# Link to remote (optional)
echo "🔗 Linking to remote Supabase for reference..."
npx supabase link --project-ref jevltyioavvjxvjwmiwy || echo "⚠️  Could not link to remote (you may need to login first)"

echo ""
echo "🎉 Local Supabase setup complete!"
echo ""
echo "Next steps:"
echo "  1. Copy .env.local to .env.local.backup"
echo "  2. Update .env.local to use local Supabase:"
echo ""
echo "     NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321"
echo "     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs... (see below)"
echo ""
echo "  3. Get your local anon key by running:"
echo "     npx supabase status"
echo ""
echo "  4. Start dev server:"
echo "     npm run dev"
echo ""
echo "  5. Open http://localhost:3000/price-tracker"
echo ""
echo "💡 To switch back to remote Supabase, restore the backup .env.local"
echo ""

# Show status
npx supabase status
