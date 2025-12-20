# 🔧 Environment Setup Guide

## Required Python Version
**Python 3.11** (3.11.0 or higher recommended)

### Why Python 3.11?
- ✅ Excellent `tkinter` support (required for turtle graphics)
- ✅ 10-60% faster than Python 3.10
- ✅ Better error messages for debugging
- ✅ Industry-standard version used by many companies
- ⚠️ **Avoid Python 3.13+** - tkinter support is inconsistent

---

## 📥 Installation Steps

### Windows
1. Download Python 3.11 from [python.org](https://www.python.org/downloads/)
2. **IMPORTANT:** During installation:
   - ✅ Check "Add Python to PATH"
   - ✅ Check "Install tcl/tk and IDLE"
3. Verify installation:
   ```cmd
   python --version
   python -m tkinter
   ```

### macOS
1. Using Homebrew (recommended):
   ```bash
   brew install python@3.11
   ```
2. Or download from [python.org](https://www.python.org/downloads/)
3. Verify installation:
   ```bash
   python3.11 --version
   python3.11 -m tkinter
   ```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3.11 python3.11-tk
python3.11 --version
python3.11 -m tkinter
```

---

## 🖥️ Visual Studio Code Setup

### 1. Install VS Code
Download from [code.visualstudio.com](https://code.visualstudio.com/)

### 2. Install Python Extension
1. Open VS Code
2. Click Extensions icon (or press `Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Python"
4. Install the official Microsoft Python extension

### 3. Create Virtual Environment
1. Open this project folder in VS Code
2. Open Command Palette:
   - Windows/Linux: `Ctrl+Shift+P`
   - Mac: `Cmd+Shift+P`
3. Type: **Python: Create Environment**
4. Select **Venv**
5. Choose **Python 3.11** interpreter
6. Wait for environment creation

### 4. Select Interpreter
1. Open Command Palette again
2. Type: **Python: Select Interpreter**
3. Choose the interpreter with `.venv` in the path

---

## 🎮 Running the Snake Game

### From VS Code
1. Open `Session 1/The Explorers/snake_template.py`
2. Press `F5` or click the ▶️ Run button
3. Or right-click and select "Run Python File"

### From Terminal
```bash
cd "Session 1/The Explorers"
python snake_template.py
```

---

## 🐛 Troubleshooting

### "No module named '_tkinter'"
**Solution:** Reinstall Python 3.11 with tkinter support enabled.

### "Python was not found"
**Solution:** Add Python to your system PATH or use the full path:
- Windows: `C:\Python311\python.exe`
- Mac/Linux: `/usr/local/bin/python3.11`

### Game window appears but freezes
**Solution:** Check your Python version. Python 3.13+ may have issues. Use 3.11.

### "Permission denied" errors
**Solution:** On Mac/Linux, you may need to run:
```bash
chmod +x snake_template.py
```

---

## ✅ Verification Checklist

Before the first session, ensure:
- [ ] Python 3.11 is installed (`python --version` or `python3.11 --version`)
- [ ] tkinter works (`python -m tkinter` shows a window)
- [ ] VS Code is installed with Python extension
- [ ] You can clone and open this repository
- [ ] Snake game runs without errors

---

## 📞 Need Help?

If you're stuck, bring your laptop to the session 15 minutes early, and we'll help you get set up!

**Remember:** Every professional developer has fought with environment setup. You're learning a critical real-world skill! 💪
