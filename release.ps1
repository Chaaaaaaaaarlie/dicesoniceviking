param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string]$Version,
  [switch]$AutoCommit
)

function Fail($msg) { Write-Error $msg; exit 1 }

# 0) Git vorhanden?
git --version *> $null
if ($LASTEXITCODE -ne 0) { Fail "Git not in PATH." }

# 1) .gitignore: ZIPs ignorieren
$gi = ".gitignore"
$pat = "svik4s-*.zip"
try {
  $giContent = if (Test-Path -LiteralPath $gi) { Get-Content -LiteralPath $gi -ErrorAction Stop } else { @() }
  if ($giContent -notcontains $pat) {
    Add-Content -LiteralPath $gi -Value $pat
  }
} catch {
  Fail "Failed to update .gitignore: $($_.Exception.Message)"
}

# 2) Working tree clean? Falls nicht und -AutoCommit: auto-commit
$changes = git status --porcelain
if ($changes) {
  if ($AutoCommit) {
    git add -A; if ($LASTEXITCODE -ne 0) { Fail "git add failed." }
    git commit -m ("chore: prep {0}" -f $Version); if ($LASTEXITCODE -ne 0) { Fail "git commit failed." }
  } else {
    Fail "Working tree is not clean. Use -AutoCommit or commit/stash first."
  }
}

# 3) Remote-Stand einziehen (rebase), um Push-Rejects zu vermeiden
git fetch origin
if ($LASTEXITCODE -ne 0) { Fail "git fetch failed." }

git pull --rebase origin main
if ($LASTEXITCODE -ne 0) { Fail "git pull --rebase failed (resolve conflicts)." }

# 4) Push aktuellen Stand
git push
if ($LASTEXITCODE -ne 0) {
  Fail "git push failed."
}

# 5) Tag prüfen/erstellen
$tag = "v$Version"
git rev-parse -q --verify "refs/tags/$tag" *> $null
if ($LASTEXITCODE -eq 0) { Fail "Tag $tag already exists." }

git tag $tag; if ($LASTEXITCODE -ne 0) { Fail "create tag failed." }
git push origin $tag; if ($LASTEXITCODE -ne 0) { Fail "push tag failed." }

Write-Host ("Tag {0} pushed. Build-and-release workflow running on GitHub." -f $tag)
