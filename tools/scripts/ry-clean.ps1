Write-Host "=== ry-clean (root only) ===" -ForegroundColor Cyan

$allowedDirs = @("apps","packages","modules","edge","tools","brain",".github")
$allowedFiles = @("package.json","pnpm-workspace.yaml","tsconfig.base.json","turbo.json","README.md",".gitignore",".env.example")

Get-ChildItem -Directory | ForEach-Object {
  if ($allowedDirs -notcontains $_.Name) {
    Write-Host "Deleting unexpected directory: $($_.Name)" -ForegroundColor Red
    Remove-Item -Recurse -Force $_.FullName
  }
}

Get-ChildItem -File | ForEach-Object {
  if ($allowedFiles -notcontains $_.Name) {
    Write-Host "Deleting unexpected file: $($_.Name)" -ForegroundColor Red
    Remove-Item -Force $_.FullName
  }
}
