from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from datasets import Dataset
import os

MODEL_NAME = "NlpHUST/gpt2-vietnamese"
OUTPUT_DIR = "models/gpt2-finetuned"

# Tải tokenizer và model
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)

tokenizer.pad_token = tokenizer.eos_token

# Chuẩn bị dataset
def load_dataset(file_path, tokenizer):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    # Chia thành các mẫu nhỏ
    lines = text.split('\n')
    dataset = Dataset.from_dict({"text": lines})
    def tokenize_function(examples):
        return tokenizer(examples["text"], truncation=True, padding="max_length", max_length=128)
    tokenized_dataset = dataset.map(tokenize_function, batched=True)
    return tokenized_dataset

train_dataset = load_dataset("data/train.txt", tokenizer)

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)

# Thiết lập training arguments
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    overwrite_output_dir=True,
    num_train_epochs=1,  # Giảm epochs cho test
    per_device_train_batch_size=2,
    save_steps=10_000,
    save_total_limit=2,
    logging_steps=1,
    learning_rate=5e-5,
    warmup_steps=0,
    prediction_loss_only=True,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=train_dataset,
)

# Train
trainer.train()

# Lưu model
trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)