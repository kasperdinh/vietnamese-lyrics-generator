import React from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-10"
    >
      <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-purple-300 to-pink-300 drop-shadow-lg font-mono">
        Vietnamese Lyrics Generator
      </h1>
      <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
        Khám phá sức sáng tạo của AI trong việc viết lời bài hát tiếng Việt. 
        Chọn thể loại nhạc yêu thích và để trí tuệ nhân tạo tạo ra những câu hát độc đáo cho bạn.
      </p>
    </motion.div>
  );
}