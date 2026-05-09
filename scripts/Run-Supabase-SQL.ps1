# Run-Supabase-SQL.ps1
# Requires supabase CLI installed and logged in (supabase login)
# This script will run the SQL file against your Supabase project.

$sqlFile = "db/profiles.sql"

if (!(Test-Path $sqlFile)) {
    Write-Host "SQL file not found: $sqlFile" -ForegroundColor Red
    exit 1
}

# Check for supabase CLI
if (!(Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "Supabase CLI not found. Installing globally via npm..." -ForegroundColor Yellow
    npm install -g supabase
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install supabase CLI. Install manually and re-run." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Make sure you are logged in to supabase CLI (supabase login)." -ForegroundColor Cyan
$projectRef = Read-Host "Enter your Supabase project ref (leave blank to use current project)"
if ([string]::IsNullOrWhiteSpace($projectRef)) {
    Write-Host "Running SQL using current supabase project context..."
    supabase db query --file $sqlFile
} else {
    Write-Host "Running SQL against project $projectRef..."
    supabase db query --project-ref $projectRef --file $sqlFile
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "SQL executed successfully." -ForegroundColor Green
} else {
    Write-Host "SQL execution failed. Check output above." -ForegroundColor Red
}
