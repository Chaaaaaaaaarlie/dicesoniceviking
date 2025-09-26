param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string]$Version
)

# 1) Git vorhanden?
git --version *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Git is not in PATH."
  exit 1
}

# 2) Working tree clean?
$changes = git status --porcelain
if ($changes) {
  Write-Error "Working tree is not clean. Commit or stash your changes first."
  exit 1
}

# 3) Tag existiert schon?
$tag = "v$Version"
git rev-parse -q --verify "refs/tags/$tag" *> $null
if ($LASTEXITCODE -eq 0) {
  Write-Error "Tag $tag already exists."
  exit 1
}

# 4) Push aktueller Stand
git push
if ($LASTEXITCODE -ne 0) {
  Write-Error "git push failed."
  exit 1
}

# 5) Tag erstellen und pushen (triggert GitHub Action)
git tag $tag
if ($LASTEXITCODE -ne 0) {
  Write-Error "Could not create tag $tag."
  exit 1
}

git push origin $tag
if ($LASTEXITCODE -ne 0) {
  Write-Error "git push origin $tag failed."
  exit 1
}

Write-Host ("Tag {0} pushed. The build-and-release workflow is running on GitHub now." -f $tag)
