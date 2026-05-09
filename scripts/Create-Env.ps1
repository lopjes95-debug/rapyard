# Create-Env.ps1
# Interactive creation of .env for Expo (EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY)

$envPath = ".env"

Write-Host "== Create .env for RapYard ==" -ForegroundColor Cyan

$supabaseUrl = Read-Host "Enter EXPO_PUBLIC_SUPABASE_URL (https://yourproject.supabase.co)"
$supabaseKey = Read-Host "Enter EXPO_PUBLIC_SUPABASE_ANON_KEY (anon key)"

$content = @"
EXPO_PUBLIC_SUPABASE_URL=$supabaseUrl
EXPO_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey
"@

Set-Content -Path $envPath -Value $content -Encoding UTF8

Write-Host ".env created at $envPath" -ForegroundColor Green
Write-Host "Do NOT commit this file to git." -ForegroundColor Yellow
