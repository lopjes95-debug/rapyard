# Start-RapYardFrontend.ps1
# WRCH control panel with Expo and Supabase actions

function Show-Menu {
    Clear-Host
    Write-Host "== RAPYARD DEV CONTROL PANEL ==" -ForegroundColor Cyan
    Write-Host "1) Start Expo Dev Server (npx expo start)"
    Write-Host "2) Run Supabase SQL (create profiles table)"
    Write-Host "3) Create .env interactively"
    Write-Host "4) Install frontend dependencies"
    Write-Host "5) Open project in VS Code"
    Write-Host "6) Exit"
    Write-Host "================================="
}

function Start-Expo {
    Write-Host "Starting Expo (use Ctrl+C to stop)..." -ForegroundColor Yellow
    npx expo start
}

function Run-SQL {
    Write-Host "Running Supabase SQL..." -ForegroundColor Yellow
    & pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\Run-Supabase-SQL.ps1"
}

function Create-Env {
    & pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\Create-Env.ps1"
}

function Install-Deps {
    & pwsh -NoProfile -ExecutionPolicy Bypass -File ".\scripts\Install-Frontend-Deps.ps1"
}

function Open-VSCode {
    if (Get-Command code -ErrorAction SilentlyContinue) {
        code .
    } else {
        Write-Host "VS Code CLI 'code' not found. Open VS Code manually." -ForegroundColor Yellow
    }
}

do {
    Show-Menu
    $choice = Read-Host "Pick a number"

    switch ($choice) {
        "1" { Start-Expo }
        "2" { Run-SQL }
        "3" { Create-Env }
        "4" { Install-Deps }
        "5" { Open-VSCode }
        "6" { Write-Host "Exiting." -ForegroundColor Cyan }
        default { Write-Host "Invalid choice." -ForegroundColor Red }
    }

    if ($choice -ne "6") { Read-Host "Press ENTER to return to menu" }
} while ($choice -ne "6")
