'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

export default function EventHeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const parallaxValue = scrollPosition * 0.3;
        
        // Apply parallax to video background
        gsap.to(videoRef.current, {
          y: parallaxValue,
          ease: 'none',
          duration: 0.1
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.2, ease: "easeOut" }
    })
  };

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/events-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-20 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Join Our <span className="text-purple-300">Events</span>
        </motion.h1>
        
        <motion.div
          className="text-xl md:text-3xl font-light mb-8 h-12"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <TypeAnimation
            sequence={[
              'Be part of something bigger.',
              2000,
              'Join our mission to create change.',
              2000,
              'Transform lives together.',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>
        
        <motion.div
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {/* Next Event Countdown */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 inline-block mb-8">
            <p className="text-purple-200 mb-2">Next Event: Charity Marathon</p>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-bold flip-number">23</div>
                <div className="text-xs md:text-sm text-purple-200">Days</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-bold flip-number">14</div>
                <div className="text-xs md:text-sm text-purple-200">Hours</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-bold flip-number">55</div>
                <div className="text-xs md:text-sm text-purple-200">Minutes</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl md:text-4xl font-bold flip-number">32</div>
                <div className="text-xs md:text-sm text-purple-200">Seconds</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="join-button"
          >
            <Link 
              href="#events"
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full text-xl shadow-lg inline-block hover:bg-purple-700 transition-all duration-300"
            >
              Browse Events
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/host-event"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all duration-300 inline-block"
            >
              Host an Event
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <motion.div 
            className="w-8 h-12 border-2 border-white rounded-full flex justify-center"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-white rounded-full mt-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 1], y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}