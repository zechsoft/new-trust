import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroVideo from '@/components/features/HeroVideo';
import DonationCounter from '@/components/features/DonationCounter';

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroTextY: any;
  heroOpacity: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroRef, heroTextY, heroOpacity }) => {
  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      <HeroVideo />
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20"
        style={{ y: heroTextY, opacity: heroOpacity }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Change Lives Together
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join our mission to create a better world through compassion and action
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/donate" 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Donate Now
          </Link>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <DonationCounter totalAmount={1250000} donorsCount={8457} />
      </div>
    </div>
  );
};

export default HeroSection;