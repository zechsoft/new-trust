'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function GalleryHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate overlay on component mount
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.7, duration: 1.5 }
    );
    
    // Animate text elements
    gsap.fromTo(
      '.hero-content h1',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.5 }
    );
    
    gsap.fromTo(
      '.hero-content p',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.8 }
    );
  }, []);
  
  return (
    <>
      {/* Video Background */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/gallery-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-50 z-10"
      />
      
      {/* Content */}
      <div className="hero-content relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Our Journey in Pictures
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Witness the impact of your contributions through our visual storytelling
        </motion.p>
      </div>
    </>
  );
}