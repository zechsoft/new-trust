import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gray-900">
          {/* Placeholder for video - in production, replace with actual video */}
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Charity work in action" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-blue-900/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Our Mission
        </motion.h1>
        
        <motion.div
          className="backdrop-blur-sm bg-white/10 p-6 rounded-xl max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-white font-light">
            One Act of Kindness, Infinite Impact
          </p>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="animate-bounce w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}