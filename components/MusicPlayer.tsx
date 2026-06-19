"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/enchanted.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="
    fixed bottom-6 right-6 z-[100]
    w-16 h-16 rounded-full
    bg-gradient-to-br from-[#d4b06a] to-[#b8862d]
    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
    border border-[#f3d99b]/40
    flex items-center justify-center
    hover:scale-110 transition-all duration-300
  "
      >
        <motion.div
          animate={playing ? { rotate: 360 } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
      w-10 h-10 rounded-full
      border-2 border-white/40
      flex items-center justify-center
      text-xl
    "
        >
          {playing ? "♫" : "♪"}
        </motion.div>
      </button>
    </>
  );
}
