#!/bin/bash

echo "🧪 Running Painel Tests..."
echo "========================="

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Install Vitest if not present
if ! npm list vitest > /dev/null 2>&1; then
    echo "Installing Vitest..."
    npm install --save-dev vitest @vitest/ui
fi

# Run tests
npx vitest run

echo ""
echo "✅ Painel tests completed!"