'use client'

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Testimonial data
  const testimonials = [
    {
      quote: "Donating to this organization was one of the most fulfilling experiences. I could actually see where my money went through their transparent reporting.",
      name: "Priya Sharma",
      role: "Monthly Donor",
      image: "/images/testimonials/donor1.jpg" // Replace with actual image path
    },
    {
      quote: "As a corporate partner, we've seen firsthand the impact this organization makes. Their dedication to their mission is unparalleled.",
      name: "Rajesh Gupta",
      role: "Corporate Sponsor",
      image: "/images/testimonials/donor2.jpg" // Replace with actual image path
    },
    {
      quote: "The donation process was smooth and easy. I appreciate how they send regular updates about the projects I've contributed to.",
      name: "Ananya Patel",
      role: "First-time Donor",
      image: "/images/testimonials/donor3.jpg" // Replace with actual image path
    },
    {
      quote: "I've been donating monthly for two years now. The impact reports they share make me proud to be a part of this journey.",
      name: "Vikram Malhotra",
      role: "Long-term Supporter",
      image: "/images/testimonials/donor4.jpg" // Replace with actual image path
    },
    {
      quote: "Their emergency response fund helped my community after the floods last year. Now I donate to help others in similar situations.",
      name: "Meena Reddy",
      role: "Community Member",
      image: "/images/testimonials/donor5.jpg" // Replace with actual image path
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Auto-scrolling for testimonials
    if (scrollRef.current) {
      const testimonialCards = scrollRef.current.querySelectorAll('.testimonial-card');
      const totalWidth = Array.from(testimonialCards).reduce((width, card) => width + card.clientWidth + 24, 0);
      const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      
      // Create the scrolling animation
      gsap.to(scrollRef.current, {
        scrollLeft: scrollWidth,
        duration: totalWidth / 100, // Speed based on content length
        ease: "none",
        repeat: -1, // Infinite repeat
        yoyo: true, // Go back and forth
        repeatDelay: 1
      });
      
      // Pause animation on hover
      scrollRef.current.addEventListener('mouseenter', () => {
        gsap.killTweensOf(scrollRef.current);
      });
      
      // Resume animation on mouse leave
      scrollRef.current.addEventListener('mouseleave', () => {
        gsap.to(scrollRef.current, {
          scrollLeft: scrollWidth,
          duration: totalWidth / 100,
          ease: "none",
          repeat: -1,
          yoyo: true,
          repeatDelay: 1
        });
      });
    }
    
    return () => {
      // Clean up animations
      if (scrollRef.current) {
        gsap.killTweensOf(scrollRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Donor Stories</h2>
        <p className="text-xl opacity-80 max-w-3xl mx-auto">
          Read what our donors have to say about their giving experience and the impact they've helped create.
        </p>
      </motion.div>
      
      {/* Auto-scrolling testimonial container */}
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-scroll pb-8 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="testimonial-card flex-shrink-0 bg-white bg-opacity-10 rounded-xl shadow-xl p-6 md:p-8 w-80 md:w-96"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                {/* Using a fallback image placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-purple-200 text-purple-700 text-xl font-bold">
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="opacity-80 text-sm">{testimonial.role}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <svg className="w-8 h-8 text-purple-300 mb-2 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-2.8 0-5 2.2-5 5s2.2 5 5 5c0.8 0 1.5-0.2 2.1-0.5-0.6 2.6-2.6 4.2-5.1 4.5v2c4.9-0.3 8-4.4 8-9.5 0-3.6-2.2-6.5-5-6.5zM22 8c-2.8 0-5 2.2-5 5s2.2 5 5 5c0.8 0 1.5-0.2 2.1-0.5-0.6 2.6-2.6 4.2-5.1 4.5v2c4.9-0.3 8-4.4 8-9.5 0-3.6-2.2-6.5-5-6.5z"></path>
              </svg>
              <p className="italic">{testimonial.quote}</p>
            </div>
            
            <div className="flex items-center mt-auto">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Call to Action */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg mb-6">Join our community of donors and make a difference today.</p>
        <motion.button
          className="px-8 py-3 bg-white text-purple-700 font-bold rounded-full hover:bg-opacity-90 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            document.querySelector('.donate-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        >
          Become a Donor
        </motion.button>
      </motion.div>
      
      {/* Custom style for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}