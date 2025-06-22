'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

export default function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // State for database content
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emojiPositions, setEmojiPositions] = useState<Array<{top: string, left: string}> | null>(null);
  
  // Fetch banner data from database
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/causeHero');
        if (!response.ok) {
          throw new Error('Failed to fetch banner data');
        }
        const data = await response.json();
        setBannerData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        // Fallback to default data
        setBannerData({
          mainTitle: "Our Causes",
          tagline: "Be the Change. Support a Cause Today.",
          mediaType: "video",
          videoUrl: "/videos/causes-hero.mp4",
          videoPlaybackRate: 0.7,
          gradientOverlay: {
            from: "black/60",
            to: "purple-900/40",
            opacity: "z-10"
          },
          animations: {
            titleDelay: 0.3,
            taglineDelay: 1,
            typingDuration: 2
          },
          floatingEmojis: {
            enabled: true,
            icons: ['🥖', '📚', '🏥', '👩‍🦰', '🌿'],
            animationDuration: 5,
            opacity: { min: 0.4, max: 0.8 }
          },
          scrollIndicator: {
            enabled: true,
            animationDuration: 1.5
          }
        });
      }
    };

    fetchBannerData();
  }, []);

  // Initialize animations and emoji positions when data is loaded
  useEffect(() => {
    if (!bannerData) return;

    gsap.registerPlugin(TextPlugin);
    
    // Typing effect for the tagline
    if (textRef.current && bannerData.tagline) {
      gsap.to(textRef.current, {
        duration: bannerData.animations?.typingDuration || 2,
        text: bannerData.tagline,
        ease: "none",
        delay: bannerData.animations?.taglineDelay || 1
      });
    }
    
    // Control video playback if it's a video
    if (videoRef.current && bannerData.mediaType === 'video') {
      videoRef.current.playbackRate = bannerData.videoPlaybackRate || 0.7;
    }

    // Generate emoji positions only on client-side
    if (bannerData.floatingEmojis?.enabled && bannerData.floatingEmojis?.icons) {
      const positions = bannerData.floatingEmojis.icons.map(() => ({
        top: `${20 + Math.random() * 60}%`,
        left: `${10 + Math.random() * 80}%`
      }));
      setEmojiPositions(positions);
    }
  }, [bannerData]);

  // Loading state
  if (loading) {
    return (
      <div className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Error state with fallback
  if (error) {
    console.error('Hero Banner Error:', error);
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Media Background - Video or Image */}
      {bannerData?.mediaType === 'video' && bannerData?.videoUrl ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bannerData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : bannerData?.mediaType === 'image' && bannerData?.imageUrl ? (
        <img
          ref={imageRef}
          src={bannerData.imageUrl}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Fallback gradient background
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900" />
      )}
      
      {/* Overlay Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-${bannerData?.gradientOverlay?.from || 'black/60'} to-${bannerData?.gradientOverlay?.to || 'purple-900/40'} ${bannerData?.gradientOverlay?.opacity || 'z-10'}`} 
      />
      
      {/* Main Content */}
      <div className="absolute top-1/4 left-0 right-0 mx-auto z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: bannerData?.animations?.titleDelay || 0.3 
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {bannerData?.mainTitle || "Our Causes"}
          </h1>
        </motion.div>
        
        {/* Tagline with typing effect */}
        <h2
          ref={textRef}
          className="text-xl md:text-3xl text-white/90 italic mt-6"
        ></h2>
      </div>
      
      {/* Floating Emojis */}
      {bannerData?.floatingEmojis?.enabled && emojiPositions && bannerData?.floatingEmojis?.icons && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {bannerData.floatingEmojis.icons.map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl md:text-6xl"
              style={{
                top: emojiPositions[index]?.top,
                left: emojiPositions[index]?.left,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [
                  bannerData.floatingEmojis.opacity?.min || 0.4,
                  bannerData.floatingEmojis.opacity?.max || 0.8,
                  bannerData.floatingEmojis.opacity?.min || 0.4
                ],
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{
                duration: (bannerData.floatingEmojis.animationDuration || 5) + index * 0.6,
                delay: index * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Scroll Indicator */}
      {bannerData?.scrollIndicator?.enabled && (
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: bannerData.scrollIndicator.animationDuration || 1.5,
            repeat: Infinity,
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}