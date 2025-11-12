@echo off
REM =========================================
REM  UESRPG Quartz Auto-Deploy Script (safe)
REM  Builds from /content → /public → /docs
REM =========================================
cd /d "C:\Github\Starfissure-uesrpg-3e-v4"

echo 🔄 Building Quartz site from /content...
npx quartz build

echo 🧹 Cleaning old /docs output...
rmdir /S /Q docs
timeout /t 2 >nul
mkdir docs

echo 🔎 Checking for build files...
if not exist public\index.html (
    echo ❌ Quartz build failed — no files found in /public!
    pause
    exit /b
)

echo 📦 Copying /public build into /docs...
xcopy public docs /E /H /Y >nul

echo 🪶 Creating .nojekyll file...
echo.> docs\.nojekyll

echo 💾 Committing and pushing to GitHub...
git add docs
git commit -m "Auto-deploy Quartz site"
git push origin main

echo ✅ Deployment complete! Site will update in a few minutes.
pause
