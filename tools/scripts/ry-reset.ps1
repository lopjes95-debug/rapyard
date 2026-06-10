Write-Host "=== ry-reset ===" -ForegroundColor Cyan
.\tools\scripts\ry-clean.ps1
.\tools\scripts\ry-mkdir.ps1
pnpm install
