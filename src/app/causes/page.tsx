'use client'

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Components
import HeroBanner from '@/components/features/causes/HeroBanner';
import IntroductionSection from '@/components/IntroductionSection';
import CauseCard from '@/components/ui/CauseCard';
import ImpactStats from '@/components/features/causes/ImpactStats';
import TestimonialCarousel from '@/components/features/causes/TestimonialCarousel';
import BeforeAfterSlider from '@/components/features/causes/BeforeAfterSlider';
import FloatingDonateButton from '@/components/ui/FloatingDonateButton';
import ChatbotButton from '@/components/features/ChatbotButton';

export default function CausesPage() {
  const scrollRef = useRef(null);
  const statsRef = useRef(null);
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for stats section
    if (statsRef.current) {
      gsap.from('.stat-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
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

  // For parallax effect in CTA section
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  
  const ctaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  // Main causes data
  const causes = [
    {
      id: 1,
      title: "Feeding the Hungry",
      description: "No one should sleep hungry. We've served 5 million+ meals across India in urban slums, rural villages, and disaster-hit regions.",
      image: "/images/causes/hunger.jpg",
      icon: "bread",
      raised: 1250000,
      goal: 2000000,
      donors: 3245,
      primaryAction: "Donate Now",
      secondaryAction: "Join Our Meal Drives",
      category: "Food"
    },
    {
      id: 2,
      title: "Educating Underprivileged Children",
      description: "Education is a right, not a privilege. We've provided 10,000+ children with free education & learning kits across schools in remote areas, slums, and orphanages.",
      image: "/images/causes/education.jpg",
      icon: "book",
      raised: 1500000,
      goal: 3000000,
      donors: 2156,
      primaryAction: "Sponsor a Child's Education",
      secondaryAction: "Volunteer",
      category: "Education"
    },
    {
      id: 3,
      title: "Healthcare for All",
      description: "Providing free medical aid, screenings, and awareness. Over 50,000 patients treated, 300+ free medical camps in villages, rural hospitals, and urban slums.",
      image: "/images/causes/healthcare.jpg",
      icon: "medical",
      raised: 980000,
      goal: 1500000,
      donors: 1879,
      primaryAction: "Support Healthcare Initiatives",
      secondaryAction: "Donate Medicines",
      category: "Healthcare"
    },
    {
      id: 4,
      title: "Women Empowerment",
      description: "Uplifting women through education, employment, and self-defense training. Empowered 20,000+ women with skills and self-reliance in rural communities and urban training centers.",
      image: "/images/causes/women.jpg",
      icon: "female",
      raised: 870000,
      goal: 1200000,
      donors: 1456,
      primaryAction: "Empower a Woman",
      secondaryAction: "Sponsor a Training Program",
      category: "Empowerment"
    },
    {
      id: 5,
      title: "Environmental Sustainability",
      description: "Planting trees, reducing waste, and creating a greener tomorrow. Planted 100,000+ trees, launched zero-waste programs across major cities and rural areas.",
      image: "/images/causes/environment.jpg",
      icon: "leaf",
      raised: 750000,
      goal: 1000000,
      donors: 1234,
      primaryAction: "Plant a Tree",
      secondaryAction: "Join the Sustainability Movement",
      category: "Environment"
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <HeroBanner />
      
      {/* Introduction Section */}
      <IntroductionSection />
      
      {/* Impact Stats */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          <ImpactStats />
        </div>
      </section>
      
      {/* Causes Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Causes We Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our causes below and be a part of the change!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes.map((cause, index) => (
              <CauseCard 
                key={cause.id}
                cause={cause}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials & Success Stories */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Voices of Change</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from the people whose lives have been transformed through our programs.
            </p>
          </motion.div>
          
          <TestimonialCarousel />
          
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Before & After</h3>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>
      
      {/* CTA Section with Parallax Effect */}
      <section ref={scrollRef} className="relative py-24 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-700 z-0"
          style={{ scale: ctaScale, opacity: ctaOpacity }}
        />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Take Action Now!</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
              Your contribution can change lives. Every donation counts, no matter how small.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/donate" 
                  className="px-8 py-4 bg-white text-purple-700 font-bold rounded-full text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg inline-block"
                >
                  Donate Now
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/get-involved" 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all duration-300 inline-block"
                >
                  Get Involved
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Floating UI Elements */}
      <FloatingDonateButton />
      <ChatbotButton />
    </main>
  );
}     