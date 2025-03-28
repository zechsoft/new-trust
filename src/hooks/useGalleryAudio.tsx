import { useState, useEffect, useRef } from 'react';

interface SoundEffects {
  [key: string]: HTMLAudioElement;
}

export default function useGalleryAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  
  const backgroundMusic = useRef<HTMLAudioElement | null>(null);
  const soundEffects = useRef<SoundEffects>({});
  
  // Initialize audio elements
  useEffect(() => {
    // Create background music element
    backgroundMusic.current = new Audio('/audio/gallery-background.mp3');
    backgroundMusic.current.loop = true;
    backgroundMusic.current.volume = 0.4;
    
    // Create sound effects
    const effects = {
      'click': new Audio('/audio/click.mp3'),
      'hover': new Audio('/audio/hover.mp3'),
      'filter': new Audio('/audio/filter.mp3')
    };
    
    soundEffects.current = effects;
    
    // Cleanup function
    return () => {
      if (backgroundMusic.current) {
        backgroundMusic.current.pause();
        backgroundMusic.current = null;
      }
      
      Object.values(soundEffects.current).forEach(audio => {
        audio.pause();
      });
      soundEffects.current = {};
    };
  }, []);
  
  // Handle background music play/pause
  useEffect(() => {
    if (!backgroundMusic.current) return;
    
    if (isPlaying) {
      backgroundMusic.current.play().catch(error => {
        console.error('Error playing background music:', error);
        setIsPlaying(false);
      });
    } else {
      backgroundMusic.current.pause();
    }
  }, [isPlaying]);
  
  // Handle mute/unmute
  useEffect(() => {
    if (!backgroundMusic.current) return;
    
    backgroundMusic.current.muted = isMuted;
    Object.values(soundEffects.current).forEach(audio => {
      audio.muted = isMuted;
    });
  }, [isMuted]);
  
  // Play sound effect when currentSound changes
  useEffect(() => {
    if (!currentSound || isMuted) return;
    
    const effect = soundEffects.current[currentSound];
    if (effect) {
      effect.currentTime = 0;
      effect.play().catch(console.error);
    }
    
    // Reset current sound after playing
    const timeout = setTimeout(() => {
      setCurrentSound(null);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [currentSound, isMuted]);
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };
  
  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  return {
    isPlaying,
    isMuted,
    currentSound,
    togglePlay,
    toggleMute,
    setCurrentSound
  };
}