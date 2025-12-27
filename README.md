## 🚀 Installation & Run Guide

To run the system, you need to open **2 separate Terminal windows** running in parallel:

### Start Backend (Python API)
```bash
# 1. Create virtual environment (only need to do once)
python3 -m venv venv

# 2. Activate virtual environment
source venv/bin/activate

# 3. Install libraries
pip install -r requirements.txt

# 4. Run Server
uvicorn main:app --reload
```

### Start Frontend
```bash
# 1. Go to frontend directory
cd frontend

# 2. Install libraries (only need to do once)
npm install

# 3. Run project
npm run dev
```
