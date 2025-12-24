from transformers import GPT2LMHeadModel, GPT2Tokenizer
import sys
import os

# Use fine-tuned model if available
MODEL_PATH = "models/vietnamese-lyrics-generator-model-finetuned"

if os.path.exists(MODEL_PATH):
    tokenizer = GPT2Tokenizer.from_pretrained(MODEL_PATH)
    model = GPT2LMHeadModel.from_pretrained(MODEL_PATH)
else:
    # Fallback to pre-trained
    MODEL_NAME = "NlpHUST/gpt2-vietnamese"
    tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
    model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)

tokenizer.pad_token = tokenizer.eos_token

def generate_lyrics(prompt, max_length=200):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs["input_ids"],
        max_length=max_length,
        do_sample=True,
        temperature=0.8,
        top_k=50,
        top_p=0.95,
        pad_token_id=tokenizer.eos_token_id,
        num_return_sequences=1
    )
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

if __name__ == "__main__":
    if len(sys.argv) > 1:
        prompt = sys.argv[1]
    else:
        prompt = "Viết lời bài hát Nhạc Trẻ"
    
    lyrics = generate_lyrics(prompt)
    print(lyrics)
