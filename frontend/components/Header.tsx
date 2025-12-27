import React from 'react';

export default function Header() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 drop-shadow-lg font-mono">
        AI Song Lyrics Generator
      </h1>
      <p className="text-blue-200 text-lg">
        Create a song based on your selected genre, emotion, and topic.
      </p>
    </div>
  );
}