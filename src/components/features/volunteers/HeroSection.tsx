'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP animations for hero section
  useEffect(() => {
    // Page load animation
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: "power3.out"
      });
    }

    // Typewriter effect for quote
    if (textRef.current) {
      const text = "Volunteering is not about giving your time; it's about changing lives – including your own.";
      const textElement = textRef.current;
      textElement.innerHTML = '';

      let i = 0;
      const typeEffect = setInterval(() => {
        if (i < text.length) {
          textElement.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(typeEffect);
        }
      }, 45); // Speed of typing
    }

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/volunteers-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Become a Volunteer
        </motion.h1>

        <div className="max-w-3xl mx-auto">
          <div 
            ref={textRef}
            className="text-xl md:text-2xl text-white italic mb-12 min-h-[6rem]"
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.a
            href="#volunteer-signup"
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full text-xl hover:bg-purple-700 transition-all duration-300 shadow-lg inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(124, 58, 237, 0.5)", "0px 0px 20px rgba(124, 58, 237, 0.5)", "0px 0px 0px rgba(124, 58, 237, 0.5)"],
            }}
            transition={{
              boxShadow: {
                repeat: Infinity,
                duration: 2,
              }
            }}
          >
            Join Now
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2, duration: 1 },
            y: { delay: 2, duration: 1.5, repeat: Infinity }
          }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center items-start p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;