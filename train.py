from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from datasets import Dataset
import os
import json

MODEL_NAME = "models/vietnamese-lyrics-generator-model-pretrained"
OUTPUT_DIR = "models/vietnamese-lyrics-generator-model-finetuned"

# Download pre-trained model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)

tokenizer.pad_token = tokenizer.eos_token

# Prepare dataset
def load_dataset(file_path, tokenizer):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Assume data is list of {"prompt": "...", "completion": "..."}
    lines = [item['prompt'] + item['completion'] for item in data]
    
    dataset = Dataset.from_dict({"text": lines})
    def tokenize_function(examples):
        return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=512)
    tokenized_dataset = dataset.map(tokenize_function, batched=True)
    return tokenized_dataset

train_dataset = load_dataset("data/train.json", tokenizer)

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)

training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=4,
    save_steps=500,
    save_total_limit=2,
    logging_steps=100,
    learning_rate=5e-5,
    warmup_steps=100,
    weight_decay=0.01,
    prediction_loss_only=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=train_dataset,
)

trainer.train()

# Save the fine-tuned model
trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print("✅ Training completed and model saved!")
