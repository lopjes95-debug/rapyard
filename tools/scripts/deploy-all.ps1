Write-Host "=== deploy-all ===" -ForegroundColor Cyan
pnpm --filter rapyard-web build
pnpm --filter rapyard-api deploy
