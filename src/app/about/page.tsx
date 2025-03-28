'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Globe, Users, Banknote } from 'lucide-react';

// Components
import HeroSection from '@/components/about/HeroSection';
import MissionVision from '@/components/about/MissionVision';
import Timeline from '@/components/about/Timeline';
import TeamSection from '@/components/about/TeamSection';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import CallToAction from '@/components/about/CallToAction';
import FloatingDonateButton from '@/components/ui/FloatingDonateButton';
import ChatbotButton from '@/components/features/ChatbotButton';

// Data
import { timelineData } from '@/data/timelineData';
import { teamData } from '@/data/teamData';
import { coreValues } from '@/data/coreValues';

export default function AboutPage() {
  const valuesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for values section
    if (valuesRef.current) {
      gsap.from('.value-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Who We Are Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Who We Are</h2>
              <h3 className="text-xl md:text-2xl text-purple-600 font-semibold mb-4">
                "Empowering Lives, One Act of Kindness at a Time"
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                At <span className="font-bold text-purple-600">Global Kindness Trust</span>, we believe in 
                <span className="font-bold"> transforming lives through compassion and action</span>. 
                Founded in 2015, our mission is to <span className="font-bold">bring hope, resources, and 
                opportunities</span> to those in need. Whether it's providing food, education, healthcare, 
                or shelter, we are committed to creating a world where no one is left behind.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                With a community of dedicated volunteers, donors, and changemakers, we have positively 
                impacted <span className="font-bold">over 100,000 lives across 50 cities and villages in India</span>.
              </p>
              <p className="text-xl text-purple-600 font-semibold italic">
                "Every small act of kindness creates a ripple effect of change."
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-purple-200 rounded-xl" />
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Volunteers working together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <MissionVision coreValues={coreValues} valuesRef={valuesRef} />
      
      {/* Our Journey - Timeline Section */}
      <Timeline timelineData={timelineData} />
      
      {/* Team Section */}
      <TeamSection teamData={teamData} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Floating Donation Button & AI Chatbot */}
      <FloatingDonateButton />
      <ChatbotButton />
    </main>
  );
}