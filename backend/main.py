# Cài đặt thư viện cần thiết:
# pip install fastapi uvicorn pydantic transformers torch

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time

# Khởi tạo App
app = FastAPI()

# Cấu hình CORS để Frontend (Next.js) có thể gọi API này
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Định nghĩa cấu trúc dữ liệu gửi lên (Dựa theo tài liệu )
class LyricsRequest(BaseModel):
    genre: str      # Ví dụ: Ballad, Pop, Rap
    emotion: str    # Ví dụ: Buồn, Vui, Lãng mạn
    topic: str      # Ví dụ: Tình yêu, Cuộc sống

# --- PHẦN TÍCH HỢP MODEL AI ---
# Lưu ý: Bạn cần load model GPT-2 đã fine-tune của nhóm vào đây
# from transformers import GPT2LMHeadModel, GPT2Tokenizer
# model_path = "./path_to_your_finetuned_model"
# tokenizer = GPT2Tokenizer.from_pretrained(model_path)
# model = GPT2LMHeadModel.from_pretrained(model_path)

@app.post("/generate")
async def generate_lyrics(request: LyricsRequest):
    try:
        # 1. Tạo prompt input cho model (Dựa theo phần 3.5 và 7 trong tài liệu [cite: 70, 117])
        prompt_text = f"Viết lời bài hát {request.genre}, cảm xúc {request.emotion}, chủ đề {request.topic}:\n"
        
        # --- GIẢ LẬP KẾT QUẢ (Thay thế đoạn này bằng code chạy model thực tế) ---
        # Khi tích hợp thật, dùng: input_ids = tokenizer.encode(prompt_text, return_tensors='pt')
        # output = model.generate(input_ids, max_length=200, ...)
        
        # Giả lập độ trễ xử lý của AI
        time.sleep(2) 
        
        # Kết quả demo (Hardcode để test giao diện trước)
        generated_text = (
            f"(Demo cho {request.genre} - {request.emotion})\n\n"
            "Wandering alone in the cold night rain,\n"
            "Memories of you still bring me pain.\n"
            "Your shadow lingers, I can't move on,\n"
            "Crying out your name when you're gone.\n\n"
            "The echoes of our love now fade away,\n"
            "Left with the emptiness, day after day..."
        )
        # -----------------------------------------------------------------------

        return {"lyrics": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chạy server bằng lệnh: uvicorn main:app --reload