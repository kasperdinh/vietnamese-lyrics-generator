// src/components/LyricsForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Info } from 'lucide-react';
import { SongConfig } from '@/types';
import { GENRES } from '@/constants/option';
import { MultiSelect } from '@/components/ui/multi-select';

interface LyricsFormProps {
  config: SongConfig;
  setConfig: React.Dispatch<React.SetStateAction<SongConfig>>;
  loading: boolean;
  onSubmit: () => void;
}

export default function LyricsForm({ config, setConfig, loading, onSubmit }: LyricsFormProps) {
  
  // Hàm helper để cập nhật state
  const handleChange = (value: string[]) => {
    setConfig(prev => ({ ...prev, genre: value }));
  };

  const isValid = config.genre.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-md shadow-2xl mb-8"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-4"
        >
          <Sparkles className="text-blue-300" size={20} />
          <span className="text-blue-100 font-medium">AI Sáng Tác Lời Bài Hát</span>
        </motion.div>
        <p className="text-gray-300 text-sm max-w-md mx-auto">
          Chọn một hoặc nhiều thể loại nhạc để AI tạo ra lời bài hát tiếng Việt phù hợp với phong cách của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Select Genre and Submit Button in one row */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="flex-1 space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-blue-100">
              <Music size={18} className="text-blue-300" />
              Chọn thể loại nhạc
              <Info size={14} className="text-gray-400" />
            </label>
            <MultiSelect 
              value={config.genre}
              onChange={handleChange}
              options={GENRES}
              placeholder="Nhấp để chọn thể loại..."
            />
            {!isValid && (
              <p className="text-red-400 text-xs mt-1">Vui lòng chọn ít nhất một thể loại</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={isValid ? { scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
            whileTap={isValid ? { scale: 0.95 } : {}}
            onClick={onSubmit}
            disabled={loading || !isValid}
            className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 flex-shrink-0 ${
              loading || !isValid
              ? "bg-gray-600 cursor-not-allowed text-gray-400"
              : "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white shadow-blue-500/50"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Đang sáng tác...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                Tạo bài hát
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}