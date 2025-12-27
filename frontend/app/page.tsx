"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// Import Types
import { SongConfig, LyricsResponse } from '@/types';

// Import Components
import Header from '@/components/Header';
import LyricsForm from '@/components/LyricsForm';
import LyricsDisplay from '@/components/LyricsDisplay';

export default function Home() {
  // Gom nhóm state cấu hình vào một object cho gọn
  const [config, setConfig] = useState<SongConfig>({
    genre: 'Ballad',
    emotion: 'Buồn',
    topic: 'Tình yêu thất bại'
  });
  
  const [lyrics, setLyrics] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setLyrics("");
    
    try {
      const response = await fetch('http://127.0.0.1:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config), // Gửi trực tiếp object config
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()) as LyricsResponse;
      setLyrics(data.lyrics);
    } catch (error) {
      console.error("Lỗi:", error);
      setLyrics("Lỗi kết nối đến server AI hoặc server đang bận...");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center font-sans overflow-hidden">
    
    {/* 2. Lớp nền hiệu ứng (Grid + Orb) - Nằm dưới cùng (z-0) */}
    <div
      className="absolute inset-0 z-0 pointer-events-none" // pointer-events-none để không chặn click chuột
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}
    />

    {/* 3. Lớp nội dung chính - Nằm đè lên trên nền (z-10) */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-4xl p-8 mx-4"
    >
      <Header />

      <LyricsForm 
        config={config} 
        setConfig={setConfig} 
        loading={loading} 
        onSubmit={handleGenerate} 
      />

      <LyricsDisplay 
        lyrics={lyrics} 
        loading={loading} 
      />

    </motion.div>
  </div>
    
    
  );
}