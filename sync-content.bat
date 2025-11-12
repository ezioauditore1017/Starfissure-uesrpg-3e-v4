@echo off
echo Syncing content folders into Quartz public structure...

REM Copy entire folder structure recursively
robocopy "C:\Users\aceti\Obsidian Vaults\TTRPGs\Rules Systems\UESRPG" "content" /E /XO /XD ".obsidian" /R:0 /W:0

echo Done syncing content.
