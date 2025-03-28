// FILE: /components/features/gallery/GalleryRotator.tsx
'use client'

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Image from 'next/image';

// Types
import { GalleryItem } from '@/types/gallery';

interface GalleryRotatorProps {
  items: GalleryItem[];
  autoPlay: boolean;
  onItemClick: (item: GalleryItem) => void;
}

export default function GalleryRotator({ items, autoPlay, onItemClick }: GalleryRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-rotate timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 5000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, items.length]);
  
  // Set up 3D rotation effect
  useEffect(() => {
    gsap.registerPlugin(Draggable);
    
    if (rotatorRef.current && carouselRef.current) {
      // Create a 3D carousel effect
      const radius = 300;
      const cards = gsap.utils.toArray('.carousel-item');
      const angleStep = 360 / cards.length;
      
      // Position cards in a circle
      gsap.set(cards, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      });
      
      // Initial layout
      positionCards(currentIndex);
      
      // Make the carousel draggable
      Draggable.create(carouselRef.current, {
        type: 'rotation',
        inertia: true,
        onDrag: updateRotation,
        onThrowUpdate: updateRotation,
      });
      
      function positionCards(centerIndex: number) {
        cards.forEach((card: any, index: number) => {
          const angle = (index - centerIndex) * angleStep;
          const angleRad = angle * Math.PI / 180;
          
          gsap.to(card, {
            x: Math.sin(angleRad) * radius,
            z: Math.cos(angleRad) * radius,
            rotationY: angle,
            scale: index === centerIndex ? 1.2 : 0.8,
            opacity: index === centerIndex ? 1 : 0.6,
            duration: 0.8,
            ease: 'power2.out',
          });
        });
      }
      
      function updateRotation() {
        const rotation = this.rotation % 360;
        const normalizedRotation = rotation < 0 ? rotation + 360 : rotation;
        const newIndex = Math.round(normalizedRotation / angleStep) % cards.length;
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    }
  }, [items.length, currentIndex]);
  
  // Update card positions when current index changes
  useEffect(() => {
    if (rotatorRef.current) {
      const cards = gsap.utils.toArray('.carousel-item');
      const angleStep = 360 / cards.length;
      
      cards.forEach((card: any, index: number) => {
        const angle = (index - currentIndex) * angleStep;
        const angleRad = angle * Math.PI / 180;
        const radius = 300;
        
        gsap.to(card, {
          x: Math.sin(angleRad) * radius,
          z: Math.cos(angleRad) * radius,
          rotationY: angle,
          scale: index === currentIndex ? 1.2 : 0.8,
          opacity: index === currentIndex ? 1 : 0.6,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }
  }, [currentIndex, items.length]);
  
  return (
    <div ref={rotatorRef} className="w-full h-[500px] relative perspective-1000">
      <div 
        ref={carouselRef} 
        className="w-full h-full absolute transform-style-3d cursor-grab active:cursor-grabbing"
      >
        {items.map((item, index) => (
          <div 
            key={`carousel-${item.id}`}
            className="carousel-item absolute w-64 h-80 rounded-lg overflow-hidden shadow-xl"
            onClick={() => onItemClick(item)}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={`nav-${index}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
