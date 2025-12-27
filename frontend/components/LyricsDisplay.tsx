import React from 'react';
import { motion } from 'framer-motion';

interface LyricsDisplayProps {
  lyrics: string;
  loading: boolean;
}

export default function LyricsDisplay({ lyrics, loading }: LyricsDisplayProps) {
  return (
    <div className="relative min-h-[200px]">
      <h2 className="text-xl font-semibold mb-3 text-blue-200">Generated Lyrics</h2>
      <div className="bg-black/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-inner min-h-[250px] relative overflow-hidden">
        {/* Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
        
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
            {!loading && "Lyrics will appear here like magic..."}
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
    </div>
  );
}