$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $repoRoot "public"

Push-Location $repoRoot
try {
    & hugo --gc --minify
    if ($LASTEXITCODE -ne 0) {
        throw "Hugo build failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}

function Read-Output([string]$relativePath) {
    $path = Join-Path $publicDir $relativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "Missing generated output: $relativePath"
    }
    return Get-Content -LiteralPath $path -Raw -Encoding UTF8
}

function Assert-Match([string]$content, [string]$pattern, [string]$message) {
    if ($content -notmatch $pattern) {
        throw "Output assertion failed: $message"
    }
}

function Assert-NotMatch([string]$content, [string]$pattern, [string]$message) {
    if ($content -match $pattern) {
        throw "Output assertion failed: $message"
    }
}

$homeOutput = Read-Output "index.html"
$address = Read-Output "posts/address/index.html"
$guide = Read-Output "posts/guide/index.html"
$notFound = Read-Output "404.html"
$search = Read-Output "search/index.html"
$searchIndex = Read-Output "index.json" | ConvertFrom-Json

Assert-Match $homeOutput '<link rel=canonical href=https://maxcraft\.iruanp\.com/>' "production HTTPS baseURL must remain canonical"
Assert-NotMatch $homeOutput 'github\.io|[" ]serverStatus[" ]*:?[" ]*Online|aria-label=["'']?在线' "home must not claim a hard-coded online status or use a Pages base URL"
Assert-Match $homeOutput 'href=#main-content' "home must include a skip link"
Assert-Match $homeOutput 'href=https://maxcraft\.iruanp\.com/[^>]*aria-current=page' "home navigation must identify the current page"
Assert-Match $homeOutput 'data-mc-copy-address=mcje\.iruanp\.com' "home must include a Java address copy control"
Assert-Match $homeOutput 'aria-label="复制 Java 版服务器地址"' "home copy controls must have an unambiguous accessible name"
Assert-Match $homeOutput '<noscript>' "home copy controls must include a no-JavaScript fallback"

Assert-Match $address 'aria-current=page' "address navigation must identify the current page"
Assert-Match $address 'data-mc-copy-address=mcbe\.iruanp\.com' "address page must include a Bedrock copy control"
Assert-Match $address 'JavaScript 未启用' "address page must explain manual copying without JavaScript"

Assert-Match $notFound '这片区块还没有生成' "404 output must use the MaxCraftMC branded message"
Assert-Match $notFound 'href=/search/' "404 output must offer site search"
Assert-Match $search 'data-mc-search' "search page must include the accessible search form"
Assert-Match $search '<noscript>' "search page must include a no-JavaScript browsing fallback"
if (@($searchIndex).Count -lt 1) {
    throw "Output assertion failed: search index must contain public pages"
}

Assert-NotMatch $guide '114514|非对称加密|需联系管理员手动注册' "guide must not contain the weak password, inaccurate storage, or contradictory registration text"
Assert-Match $guide '密码哈希' "guide must accurately describe password storage"

"Hugo output assertions passed ($(@($searchIndex).Count) indexed pages)."
