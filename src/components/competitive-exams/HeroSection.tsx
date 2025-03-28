'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [floatingShapes, setFloatingShapes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate random values only on client side to avoid hydration mismatch
    const shapes = Array.from({ length: 5 }).map((_, index) => ({
      id: index + 1,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      yMove: Math.random() * 100 - 50,
      xMove: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 10,
    }));
    
    setFloatingShapes(shapes);
    setIsMounted(true);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] bg-repeat"></div>
      </div>
      
      {/* Floating shapes animation - only rendered after client-side mounting */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted && floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
            }}
            animate={{
              y: [0, shape.yMove],
              x: [0, shape.xMove],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            📚 Competitive Exams Hub
          </h1>
          <div className="bg-white/20 backdrop-blur-md py-2 px-4 rounded-full inline-block mb-6">
            <h2 className="text-xl md:text-2xl text-white">Your Ultimate Guide to Success 🎯</h2>
          </div>
        </motion.div>
        
        <motion.p
          className="text-xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A one-stop destination for aspirants preparing for UPSC, SSC, Banking, Railways, 
          State PSC, and other government exams with comprehensive study materials and 
          preparation strategies.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="#study-plan"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Learning
          </Link>
          <Link 
            href="#discuss"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Join Community
          </Link>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </div>
  );
}