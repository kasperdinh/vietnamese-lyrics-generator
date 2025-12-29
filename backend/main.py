from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import time
from typing import List
import re

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
    genre: List[str]      # Ví dụ: ['Ballad', 'Pop']

# --- PHẦN TÍCH HỢP MODEL AI ---

model_path = "../model"
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

@app.post("/generate")
async def generate_lyrics(request: LyricsRequest):
    try:
        # 1. Tạo prompt input cho model (Dựa theo phần 3.5 và 7 trong tài liệu [cite: 70, 117])
        prompt_text = f"Viết lời bài hát {', '.join(request.genre)}"
        
        input_ids = tokenizer.encode(prompt_text, return_tensors='pt')
        output = model.generate(
            input_ids,
            max_length=512,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id,
            eos_token_id=tokenizer.eos_token_id
        )
        
        # Giả lập độ trễ xử lý của AI
        time.sleep(2) 
        
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
        
        # Cắt text tại câu hoàn chỉnh để tránh đứt quãng
        # Tìm vị trí cuối cùng của dấu chấm, chấm than, hoặc chấm hỏi
        sentences = re.split(r'([.!?])', generated_text)
        if len(sentences) > 1:
            # Ghép lại câu cuối cùng hoàn chỉnh
            last_punct_index = -1
            for i in range(len(sentences) - 1, -1, -1):
                if sentences[i] in '.!?':
                    last_punct_index = i
                    break
            if last_punct_index > 0:
                # Cắt tại câu hoàn chỉnh
                generated_text = ''.join(sentences[:last_punct_index + 1])
        
        return {"lyrics": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chạy server bằng lệnh: uvicorn main:app --reload