## 🚀 Hướng dẫn Cài đặt & Chạy

Để chạy hệ thống, bạn cần mở **2 cửa sổ Terminal** riêng biệt chạy song song:

### Khởi chạy Backend (Python API)
```bash
# 1. Tạo môi trường ảo (chỉ cần làm lần đầu)
python3 -m venv venv

# 2. Kích hoạt môi trường ảo
source venv/bin/activate


# 3. Cài đặt các thư viện
pip install -r requirements.txt

# 4. Chạy Server
uvicorn main:app --reload
```
### Khởi chạy Frontend 
```bash
# 1. Đi vào thư mục frontend
cd frontend

# 2. Cài đặt thư viện (chỉ cần làm lần đầu)
npm install

# 3. Chạy dự án
npm run dev
```
