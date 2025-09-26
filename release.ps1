param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string]$Version,
  [switch]$AutoCommit  # setzt uncommitted Changes automatisch, wenn gewünscht
)

function Fail($msg) { Write-Error $msg; exit 1 }

# Git vorhanden?
git --version *> $null
if ($LASTEXITCODE -ne 0) { Fail "Git not in PATH." }

# ZIPs ignorieren (einmalig)
$gi = ".gitignore"
$pat = "svik4s-*.zip"
if (Test-Path $gi) {
  if (-not (Select-String -Path $gi -Pattern [regex]::Escape($pat) -Quiet)) {
    Add-Content -Path $gi -Value $pat
  }
} else {
  Set-Content -Path $gi -Value $pat
}

# Working tree clean? Sonst optional auto-commit
$changes = git status --porcelain
if ($changes) {
  if ($AutoCommit) {
    git add -A
    if ($LASTEXITCODE -ne 0) { Fail "git add failed." }
    git commit -m ("chore: prep {0}" -f $Version)
    if ($LASTEXITCODE -ne 0) { Fail "git commit failed." }
  } else {
    Fail "Working tree is not clean. Use -AutoCommit or commit/stash first."
  }
}

# Push aktueller Stand
git push
if ($LASTEXITCODE -ne 0) { Fail "git push failed." }

# Tag prüfen
$tag = "v$Version"
git rev-parse -q --verify "refs/tags/$tag" *> $null
if ($LASTEXITCODE -eq 0) { Fail "Tag $tag already exists." }

# Tag erstellen & pushen (triggert die Action)
git tag $tag; if ($LASTEXITCODE -ne 0) { Fail "create tag failed." }
git push origin $tag; if ($LASTEXITCODE -ne 0) { Fail "push tag failed." }

Write-Host ("Tag {0} pushed. Build-and-release workflow running on GitHub." -f $tag)
