'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

export default function HeroBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    
    // Animate the text with typewriter effect
    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 3,
        text: "Every donation brings hope to someone in need.",
        ease: "none",
        delay: 0.5
      });
    }
    
    // Subtle zoom animation for the video background
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        scale: 1.05,
        duration: 10,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }
    
    return () => {
      // Clean up
      gsap.killTweensOf(textRef.current);
      gsap.killTweensOf(bannerRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Video Background */}
      <div ref={bannerRef} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/donation-impact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Make an Impact
        </motion.h1>
        
        <div 
          ref={textRef} 
          className="text-xl md:text-2xl lg:text-3xl text-white font-light mb-10 h-16"
        ></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button 
            className="px-8 py-4 bg-white text-purple-700 font-bold rounded-full text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0 5px 15px rgba(0, 0, 0, 0.1)", "0 15px 25px rgba(0, 0, 0, 0.2)", "0 5px 15px rgba(0, 0, 0, 0.1)"],
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity } 
            }}
            onClick={() => {
              // Scroll to donation form
              document.querySelector('.donate-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Donate Now
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <svg 
          className="w-10 h-10 text-white" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}