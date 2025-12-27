from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import GPT2LMHeadModel, GPT2Tokenizer
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

model_path = "../model"
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

@app.post("/generate")
async def generate_lyrics(request: LyricsRequest):
    try:
        # 1. Tạo prompt input cho model (Dựa theo phần 3.5 và 7 trong tài liệu [cite: 70, 117])
        prompt_text = f"Viết lời bài hát {request.genre}, cảm xúc {request.emotion}, chủ đề {request.topic}:\n"
        
        input_ids = tokenizer.encode(prompt_text, return_tensors='pt')
        output = model.generate(
            input_ids,
            max_length=200,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
        
        # Giả lập độ trễ xử lý của AI
        time.sleep(2) 
        
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        
        return {"lyrics": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chạy server bằng lệnh: uvicorn main:app --reload