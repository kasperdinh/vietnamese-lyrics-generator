import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface LyricsDisplayProps {
  lyrics: string;
  loading: boolean;
  onRegenerate?: () => void;
}

export default function LyricsDisplay({ lyrics, loading, onRegenerate }: LyricsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (lyrics) {
      await navigator.clipboard.writeText(lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative min-h-50"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-blue-200">Lời bài hát đã tạo</h2>
        {lyrics && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-200 text-sm transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </motion.button>
            {onRegenerate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRegenerate}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-200 text-sm transition-colors disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Tạo lại
              </motion.button>
            )}
          </div>
        )}
      </div>
      <div className="bg-black/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-inner min-h-62.5 relative overflow-hidden">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
        
        {lyrics ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="whitespace-pre-wrap text-lg leading-relaxed text-blue-50 font-medium font-serif"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
          >
            {lyrics}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/30 italic">
            {!loading && "Lời bài hát sẽ xuất hiện ở đây như phép màu..."}
            {loading && (
               <div className="animate-pulse flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
               </div>
            )}
          </div>
        )}
       
      </div>
    </motion.div>
  );
}