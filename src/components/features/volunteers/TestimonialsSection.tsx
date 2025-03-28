'use client'

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

// Define testimonial type
type Testimonial = {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  yearsSince: number;
};

// Pre-generate static star positions to avoid hydration mismatches
const starPositions = Array(20).fill(0).map((_, index) => ({
  id: index,
  size: Math.floor(Math.random() * 16) + 16, // Random size between 16-32
  position: Math.floor(Math.random() * 90) + 5, // Random position 5-95%
  delay: Math.random() * 5, // Random delay 0-5s
  duration: Math.random() * 5 + 10, // Random duration 10-15s
}));

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true on component mount to ensure hydration completes
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Teaching Volunteer",
      location: "Kenya",
      image: "/images/testimonials/volunteer-1.jpg",
      quote: "Volunteering as a teacher in Kenya changed my perspective forever. The children's eagerness to learn despite difficult circumstances was truly inspiring. This experience has given me much more than I could ever give back.",
      rating: 5,
      yearsSince: 2
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Medical Support",
      location: "Guatemala",
      image: "/images/testimonials/volunteer-2.jpg",
      quote: "As a medical student, I wanted to use my skills where they were most needed. Working alongside local healthcare providers taught me so much about resourcefulness and compassion. I've made lifelong connections and found my purpose.",
      rating: 5,
      yearsSince: 1
    },
    {
      id: 3,
      name: "Amara Okafor",
      role: "Environmental Advocate",
      location: "Nigeria",
      image: "/images/testimonials/volunteer-3.jpg",
      quote: "Being part of reforestation efforts in my home country has been incredibly rewarding. Seeing barren land transform into thriving ecosystems gives me hope for our planet's future. The community we've built is like family.",
      rating: 5,
      yearsSince: 3
    },
    {
      id: 4,
      name: "Thomas Rivera",
      role: "Community Outreach",
      location: "Peru",
      image: "/images/testimonials/volunteer-4.jpg",
      quote: "Facilitating communication between our organization and remote villages in Peru has been challenging but deeply fulfilling. Watching communities take ownership of sustainable development projects makes every difficult moment worthwhile.",
      rating: 5,
      yearsSince: 2
    },
    {
      id: 5,
      name: "Emma Larsson",
      role: "Fundraising Coordinator",
      location: "Remote",
      image: "/images/testimonials/volunteer-5.jpg",
      quote: "Even though I volunteer remotely, I feel deeply connected to our mission. Organizing virtual fundraising events that bring people together from around the world has shown me the power of collective action.",
      rating: 5,
      yearsSince: 1
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!scrollRef.current) return;

    let animating = false;
    let scrollPosition = 0;
    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    const scroll = () => {
      if (animating || !scrollContainer) return;
      
      animating = true;
      
      // Increment scroll position
      scrollPosition += 1;
      if (scrollPosition >= maxScroll) {
        // Reset to beginning with a smooth transition
        gsap.to(scrollContainer, {
          scrollLeft: 0,
          duration: 0.5,
          onComplete: () => {
            scrollPosition = 0;
            animating = false;
          }
        });
      } else {
        // Smooth scroll
        gsap.to(scrollContainer, {
          scrollLeft: scrollPosition,
          duration: 0.01,
          onComplete: () => {
            animating = false;
          }
        });
      }
    };

    // Set interval for continuous scrolling
    const scrollInterval = setInterval(scroll, 30);

    // Pause scrolling when hovering
    const handleMouseEnter = () => clearInterval(scrollInterval);
    const handleMouseLeave = () => {
      clearInterval(scrollInterval);
      // Restart interval
      setInterval(scroll, 30);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Volunteer Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from people whose lives have been transformed through volunteering
          </p>
        </motion.div>

        {/* Horizontal scrolling testimonials */}
        <div 
          ref={scrollRef} 
          className="flex space-x-6 overflow-x-auto pb-8 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.03, y: -5 }}
              className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setActiveTestimonial(testimonial)}
            >
              <div className="relative h-48">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-2">{testimonial.role}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span className="ml-2">{testimonial.location}</span>
                </div>
                <p className="text-gray-600 line-clamp-3">{testimonial.quote}</p>
                <div className="mt-4 text-purple-600 font-medium">
                  Volunteering for {testimonial.yearsSince} {testimonial.yearsSince === 1 ? 'year' : 'years'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full testimonial modal */}
        {activeTestimonial && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setActiveTestimonial(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setActiveTestimonial(null)}
                  className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{activeTestimonial.name}</h3>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">{activeTestimonial.role}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                      <span className="ml-2">{activeTestimonial.location}</span>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < activeTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <svg className="w-10 h-10 text-purple-200 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4h-10zM8 14c0-1.103 0.897-2 2-2h2c0-2.209-1.791-4-4-4v2c1.103 0 2 0.897 2 2zM22 14c0-1.103 0.897-2 2-2h2c0-2.209-1.791-4-4-4v2c1.103 0 2 0.897 2 2z" />
                  </svg>
                  <p className="text-lg text-gray-700 italic">{activeTestimonial.quote}</p>
                </div>
                <div className="text-purple-600 font-medium">
                  Volunteering for {activeTestimonial.yearsSince} {activeTestimonial.yearsSince === 1 ? 'year' : 'years'}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Floating animation stars - only render client-side to avoid hydration errors */}
        {isClient && (
          <div className="relative h-16 mt-12">
            {starPositions.map((star) => (
              <motion.div
                key={star.id}
                className="absolute text-yellow-400"
                style={{ 
                  left: `${star.position}%`,
                  width: star.size,
                  height: star.size
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ 
                  y: [-20, 0, -20],
                  opacity: [0, 1, 0],
                  transition: { 
                    y: { 
                      repeat: Infinity,
                      duration: star.duration,
                      delay: star.delay 
                    },
                    opacity: {
                      repeat: Infinity,
                      duration: star.duration,
                      delay: star.delay
                    }
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}