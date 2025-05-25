import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroVideo from '@/components/features/HeroVideo';
import DonationCounter from '@/components/features/DonationCounter';

// Types based on your backend structure
interface HeroData {
  _id?: string;
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton: {
    text: string;
    link: string;
  };
  backgroundVideo: {
    url: string;
    poster: string;
  };
  overlayOpacity: number;
  textAlignment: 'left' | 'center' | 'right';
  isActive: boolean;
  donationCounter: {
    totalAmount: number;
    donorsCount: number;
    showCounter: boolean;
  };
  gradient: {
    from: string;
    to: string;
  };
  animations: {
    enableParallax: boolean;
    textDelay: number;
    buttonDelay: number;
  };
}

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroTextY: any;
  heroOpacity: any;
}

// API service functions
const heroAPI = {
  getActiveHero: async (): Promise<HeroData | null> => {
    try {
      const response = await fetch('/api/hero/active');
      if (response.ok) {
        const data = await response.json();
        return data.heroSection || null;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch active hero:', error);
      return null;
    }
  }
};

const HeroSection: React.FC<HeroSectionProps> = ({ heroRef, heroTextY, heroOpacity }) => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  // Default fallback data
  const defaultHeroData: HeroData = {
    title: 'Change Lives Together',
    subtitle: 'Join our mission to create a better world through compassion and action',
    primaryButton: {
      text: 'Donate Now',
      link: '/donate'
    },
    secondaryButton: {
      text: 'Learn More',
      link: '/about'
    },
    backgroundVideo: {
      url: '/videos/hero-background.mp4',
      poster: '/images/hero-poster.jpg'
    },
    overlayOpacity: 40,
    textAlignment: 'center',
    isActive: true,
    donationCounter: {
      totalAmount: 1250000,
      donorsCount: 8457,
      showCounter: true
    },
    gradient: {
      from: 'purple-600',
      to: 'blue-500'
    },
    animations: {
      enableParallax: true,
      textDelay: 0.2,
      buttonDelay: 0.6
    }
  };

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const data = await heroAPI.getActiveHero();
        setHeroData(data || defaultHeroData);
      } catch (error) {
        console.error('Error loading hero data:', error);
        setHeroData(defaultHeroData);
      } finally {
        setLoading(false);
      }
    };

    loadHeroData();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!heroData) {
    return null;
  }

  const getAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      default:
        return 'items-center text-center';
    }
  };

  const getGradientClasses = (from: string, to: string) => {
    return `bg-gradient-to-r from-${from} to-${to}`;
  };

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      <HeroVideo 
        videoUrl={heroData.backgroundVideo.url}
        posterUrl={heroData.backgroundVideo.poster}
      />
      <div 
        className="absolute inset-0 bg-black z-10" 
        style={{ opacity: heroData.overlayOpacity / 100 }}
      />
      
      <motion.div 
        className={`absolute inset-0 flex flex-col justify-center px-4 z-20 ${getAlignmentClasses(heroData.textAlignment)}`}
        style={{ 
          y: heroData.animations.enableParallax ? heroTextY : 0, 
          opacity: heroOpacity 
        }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: heroData.animations.textDelay }}
        >
          {heroData.title}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: heroData.animations.textDelay + 0.2 }}
        >
          {heroData.subtitle}
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: heroData.animations.buttonDelay }}
        >
          <Link 
            href={heroData.primaryButton.link}
            className={`px-8 py-4 ${getGradientClasses(heroData.gradient.from, heroData.gradient.to)} text-white font-bold rounded-full text-xl hover:scale-105 transition-all duration-300 shadow-lg inline-block`}
          >
            {heroData.primaryButton.text}
          </Link>
          
          <Link 
            href={heroData.secondaryButton.link}
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block"
          >
            {heroData.secondaryButton.text}
          </Link>
        </motion.div>
      </motion.div>
      
      {heroData.donationCounter.showCounter && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <DonationCounter 
            totalAmount={heroData.donationCounter.totalAmount} 
            donorsCount={heroData.donationCounter.donorsCount} 
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;