@echo off
cd /d "%~dp0"
start /B python server.py 8765
timeout /t 1 /nobreak >nul
start http://localhost:8765
