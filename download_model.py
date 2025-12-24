from transformers import GPT2LMHeadModel, GPT2Tokenizer

MODEL_NAME = "NlpHUST/gpt2-vietnamese"
LOCAL_PATH = "models/vietnamese-lyrics-generator-model-pretrained"

# Download pre-trained model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)

tokenizer.save_pretrained(LOCAL_PATH)
model.save_pretrained(LOCAL_PATH)

print(f"Model has been downloaded and saved to {LOCAL_PATH}")