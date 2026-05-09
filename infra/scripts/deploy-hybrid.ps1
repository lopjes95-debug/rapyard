$ErrorActionPreference = "Stop"

Write-Host "Building web app..." -ForegroundColor Cyan
pnpm --filter ./apps/web build

Write-Host "Deploying to Firebase Hosting..." -ForegroundColor Cyan
firebase deploy --only hosting

Write-Host "Deploying Supabase Edge functions..." -ForegroundColor Cyan
supabase functions deploy --project-ref $env:SUPABASE_PROJECT_REF

Write-Host "Hybrid deploy complete." -ForegroundColor Green
