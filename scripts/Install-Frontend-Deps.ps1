# Install-Frontend-Deps.ps1
# Installs node modules and recommended global tools (optional)

Write-Host "== Installing project dependencies ==" -ForegroundColor Cyan

if (!(Test-Path "package.json")) {
    Write-Host "No package.json found. Run this from your project root." -ForegroundColor Red
    exit 1
}

npm install

Write-Host "Installing supabase JS client and nativewind if missing..." -ForegroundColor Cyan
npm install @supabase/supabase-js nativewind tailwindcss

Write-Host "Done. You can use 'npx expo start' to run the app." -ForegroundColor Green
