'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Rural Rajasthan",
    quote: "The healthcare camp in our village changed my life. I was able to get treatment for my chronic pain that had been troubling me for years. Now I can work and support my family again.",
    image: "/images/testimonials/priya.jpg",
    cause: "Healthcare for All",
    audio: "/audio/testimonial-priya.mp3"
  },
  {
    id: 2,
    name: "Rajan Kumar",
    location: "Slums of Mumbai",
    quote: "My daughter is the first in our family to receive an education. The free learning materials and scholarship have given her hope for a better future. She dreams of becoming a doctor.",
    image: "/images/testimonials/rajan.jpg",
    cause: "Education for Children",
    audio: "/audio/testimonial-rajan.mp3"
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    location: "Coastal Tamil Nadu",
    quote: "After the vocational training program, I started my own small tailoring business. I can now earn enough to support my children and even save for their education.",
    image: "/images/testimonials/lakshmi.jpg",
    cause: "Women Empowerment",
    audio: "/audio/testimonial-lakshmi.mp3"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) { // Don't auto-advance if audio is playing
        nextTestimonial();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={currentTestimonial.audio}
        onEnded={() => setIsPlaying(false)}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <p className="text-lg md:text-xl mb-4 italic text-gray-300">"{currentTestimonial.quote}"</p>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{currentTestimonial.name}</h3>
                  <p className="text-gray-400">{currentTestimonial.location}</p>
                  <span className="text-sm text-purple-400">{currentTestimonial.cause}</span>
                </div>
                
                <button 
                  onClick={toggleAudio}
                  className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
                >
                  {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isPlaying ? "Stop Audio" : "Listen"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button 
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2 items-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-purple-500' : 'bg-gray-600'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        
        <button 
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}