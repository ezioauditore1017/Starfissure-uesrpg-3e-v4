@echo off
setlocal enabledelayedexpansion

echo =============================================
echo 🔄 Syncing Obsidian Vault -> Quartz Content
echo =============================================

set "VAULT=C:\Users\aceti\Obsidian Vaults\TTRPGs\Rules Systems\UESRPG"
set "CONTENT_DIR=C:\Github\Starfissure-uesrpg-3e-v4\content"
set "REPO_DIR=C:\Github\Starfissure-uesrpg-3e-v4"

:: STEP 1 — Delete and recreate content
echo 🗑 Removing old content folder...
if exist "%CONTENT_DIR%" rmdir /s /q "%CONTENT_DIR%"
mkdir "%CONTENT_DIR%"

:: STEP 2 — Copy from Obsidian vault
echo 📂 Copying markdown files...
"C:\Windows\System32\robocopy.exe" "%VAULT%" "%CONTENT_DIR%" /E /XF *.obsidian* /R:0 /W:0
echo Robocopy exit code: %errorlevel%

if %errorlevel% GEQ 8 (
  echo ⚠️  Robocopy failed! Please check paths or permissions.
  pause
  exit /b %errorlevel%
)

:: STEP 3 — Clear cache and rebuild
echo =============================================
echo 🧹 Clearing Quartz cache
echo =============================================
if exist "%REPO_DIR%\quartz\.quartz-cache" rmdir /s /q "%REPO_DIR%\quartz\.quartz-cache"
if exist "%REPO_DIR%\public" rmdir /s /q "%REPO_DIR%\public"

echo =============================================
echo ⚙️ Building Quartz
echo =============================================
cd /d "%REPO_DIR%"
call npx quartz build --verbose
echo Quartz exit code: %errorlevel%

if %errorlevel% NEQ 0 (
  echo ❌ Quartz build failed!
  pause
  exit /b %errorlevel%
)

:: STEP 4 — Push to GitHub
echo =============================================
echo 🚀 Pushing to GitHub
echo =============================================
git add -A
git commit -m "Automated build & deploy %date% %time%"
git push origin main
echo Git exit code: %errorlevel%

if %errorlevel% NEQ 0 (
  echo ⚠️  Git push failed! Check your credentials or branch name.
  pause
  exit /b %errorlevel%
)

:: STEP 5 — Confirmation
echo =============================================
echo ✅ Build & Deploy Complete!
echo Site URL: https://ezioauditore1017.github.io/Starfissure-uesrpg-3e-v4/
echo =============================================
pause
