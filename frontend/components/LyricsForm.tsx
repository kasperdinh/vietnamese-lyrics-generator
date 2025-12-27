// src/components/LyricsForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Mic2 } from 'lucide-react';
import { SongConfig } from '@/types';
import { GENRES, EMOTIONS, TOPICS } from '@/constants/option'; // Lưu ý: đường dẫn file options của bạn là 'option' hay 'options' thì sửa lại cho đúng nhé
import { CustomCombobox } from '@/components/DropDownButton';

interface LyricsFormProps {
  config: SongConfig;
  setConfig: React.Dispatch<React.SetStateAction<SongConfig>>;
  loading: boolean;
  onSubmit: () => void;
}

export default function LyricsForm({ config, setConfig, loading, onSubmit }: LyricsFormProps) {
  
  // Hàm helper để cập nhật state
  const handleChange = (field: keyof SongConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-md shadow-2xl mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Select Genre */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-blue-100">
            <Music size={16}/> Chọn thể loại
          </label>
          <CustomCombobox 
            value={config.genre}
            onChange={(val) => handleChange('genre', val)}
            options={GENRES}
            placeholder="Chọn thể loại"
          />
        </div>

        {/* Select Emotion */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-blue-100">
            <Sparkles size={16}/> Chọn cảm xúc
          </label>
          <CustomCombobox 
            value={config.emotion}
            onChange={(val) => handleChange('emotion', val)}
            options={EMOTIONS}
            placeholder="Chọn cảm xúc"
          />
        </div>

        {/* Select Topic */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-blue-100">
            <Mic2 size={16}/> Chọn chủ đề
          </label>
          <CustomCombobox 
            value={config.topic}
            onChange={(val) => handleChange('topic', val)}
            options={TOPICS}
            placeholder="Chọn chủ đề"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSubmit}
          disabled={loading}
          className={`px-10 py-3 rounded-full font-bold text-lg shadow-lg transition-all ${
            loading 
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-blue-500/50"
          }`}
        >
          {loading ? "Đang sáng tác..." : "Tạo bài hát"}
        </motion.button>
      </div>
    </div>
  );
}