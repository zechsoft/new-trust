'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

export default function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  // Use state to store emoji positions - initialized only on client-side
  const [emojiPositions, setEmojiPositions] = useState<Array<{top: string, left: string}> | null>(null);
  
  // Register TextPlugin for typing effect and initialize emoji positions
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    
    // Typing effect for the tagline
    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 2,
        text: "Be the Change. Support a Cause Today.",
        ease: "none",
        delay: 1
      });
    }
    
    // Optional: Control video playback
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // Slow motion effect
    }

    // Generate emoji positions only on client-side to avoid hydration mismatch
    const positions = ['🥖', '📚', '🏥', '👩‍🦰', '🌿'].map(() => ({
      top: `${20 + Math.random() * 60}%`,
      left: `${10 + Math.random() * 80}%`
    }));
    setEmojiPositions(positions);
  }, []);

  const emojis = ['🥖', '📚', '🏥', '👩‍🦰', '🌿'];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/causes-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-purple-900/40 z-10" />
      
      {/* Floating 3D Text Effect */}
      <div className="absolute top-1/4 left-0 right-0 mx-auto z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Causes
          </h1>
        </motion.div>
        
        {/* Text with typing effect (controlled by GSAP) */}
        <h2
          ref={textRef}
          className="text-xl md:text-3xl text-white/90 italic mt-6"
        ></h2>
      </div>
      
      {/* Floating 3D icons - only rendered client-side after positions are set */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {emojiPositions && emojis.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl md:text-6xl"
            style={{
              top: emojiPositions[index].top,
              left: emojiPositions[index].left,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              y: [0, -10, 0],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 5 + index * 0.6,
              delay: index * 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}