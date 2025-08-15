@echo off
REM Build React app
npm run build

REM Switch to gh-pages branch, or create it if it doesn’t exist
git checkout gh-pages 2>NUL || git checkout --orphan gh-pages

REM Remove all tracked files on gh-pages branch
git rm -rf .

REM Copy build output to the repo root
xcopy build\* .\ /E /H /C /Y

REM Add and commit changes
git add .
git commit -m "Deploy to gh-pages"

REM Push to origin/gh-pages (force)
git push origin gh-pages --force

REM Switch back to main branch
git checkout main

echo ---------------------------------------
echo Deployment finished!
echo Your site should be live at:
echo https://Durgaprasadgalla.github.io/Student-Exam-Portal/
echo ---------------------------------------
pause
