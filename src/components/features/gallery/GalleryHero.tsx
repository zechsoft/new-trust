'use client'

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Functions
const galleryHeroAPI = {
  // Fetch gallery hero settings
  getSettings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery-hero`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery hero settings:', error);
      throw error;
    }
  },

  // Save gallery hero settings
  saveSettings: async (settings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery-hero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving gallery hero settings:', error);
      throw error;
    }
  },

  // Upload media
  uploadMedia: async (file, mediaType) => {
    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('mediaType', mediaType);

      const response = await fetch(`${API_BASE_URL}/gallery-hero/upload-media`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }
};

// Default settings fallback
const defaultSettings = {
  videoUrl: '/videos/gallery-hero.mp4',
  imageUrl: '/images/gallery-hero-fallback.jpg',
  title: 'Our Journey in Pictures',
  subtitle: 'Witness the impact of your contributions through our visual storytelling',
  overlayOpacity: 0.5,
  enableAutoplay: true,
  enableMute: true,
  enableLoop: true
};

export default function GalleryHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(false);

  // Load settings from backend
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const response = await galleryHeroAPI.getSettings();
        if (response.success && response.data) {
          setSettings(prevSettings => ({
            ...defaultSettings,
            ...response.data
          }));
          console.log('✅ Gallery hero settings loaded:', response.data);
        }
      } catch (error) {
        console.error('❌ Error loading settings:', error);
        setError('Failed to load gallery settings');
        // Keep default settings if API fails
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Animation effects
  useEffect(() => {
    if (isLoading) return;

    // Animate overlay on component mount
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: settings.overlayOpacity || 0.5, duration: 1.5 }
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
  }, [isLoading, settings.overlayOpacity]);

  // Handle video load error
  const handleVideoError = () => {
    console.warn('Video failed to load, falling back to image');
    setVideoError(true);
  };

  // Handle video load success
  const handleVideoLoad = () => {
    setVideoError(false);
  };

  if (isLoading) {
    return (
      <div className="relative h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      {!videoError && settings.videoUrl && (
        <video 
          ref={videoRef}
          autoPlay={settings.enableAutoplay}
          muted={settings.enableMute}
          loop={settings.enableLoop}
          className="absolute w-full h-full object-cover"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          playsInline
        >
          <source src={settings.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Fallback Image Background */}
      {(videoError || !settings.videoUrl) && settings.imageUrl && (
        <div 
          className="absolute w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${settings.imageUrl})` }}
        />
      )}
      
      {/* Fallback for no media */}
      {!settings.videoUrl && !settings.imageUrl && (
        <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 to-black" />
      )}
      
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10"
        style={{ opacity: settings.overlayOpacity || 0.5 }}
      />
      
      {/* Content */}
      <div className="hero-content relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {settings.title || 'Our Journey in Pictures'}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {settings.subtitle || 'Witness the impact of your contributions through our visual storytelling'}
        </motion.p>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="absolute top-4 right-4 z-30 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}