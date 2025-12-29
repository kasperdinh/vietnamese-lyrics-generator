// src/types/index.ts

// Kiểu dữ liệu cho cấu hình bài hát (State)
export interface SongConfig {
  genre: string[];
}

// Kiểu dữ liệu phản hồi từ API
export interface LyricsResponse {
  lyrics: string;
}

// Kiểu dữ liệu gửi đi API
export type GenerateRequest = SongConfig;