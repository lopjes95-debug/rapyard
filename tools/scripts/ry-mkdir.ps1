Write-Host "=== ry-mkdir ===" -ForegroundColor Cyan

$dirs = @(
  "apps","apps/web","apps/admin",
  "edge","edge/api",
  "packages","packages/ui","packages/core","packages/config",
  "tools","tools/scripts",
  "brain","brain/docs",
  ".github",".github/workflows"
)

foreach ($dir in $dirs) {
  if (-not (Test-Path $dir)) {
    Write-Host "Creating: $dir" -ForegroundColor Green
    New-Item -ItemType Directory -Path $dir | Out-Null
  }
}
