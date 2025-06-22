'use client'

import { useEffect, useRef, useState } from 'react';
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
  
  // State for dynamic data
  const [causes, setCauses] = useState([]);
  const [ctaData, setCtaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch causes and CTA data in parallel
        const [causesResponse, ctaResponse] = await Promise.all([
          fetch('http://localhost:5000/api/causeList'),
          fetch('http://localhost:5000/api/causecta')
        ]);
        
        if (!causesResponse.ok) {
          throw new Error('Failed to fetch causes');
        }
        
        const causesData = await causesResponse.json();
        setCauses(causesData);
        
        // CTA response might not exist or might fail
        if (ctaResponse.ok) {
          const ctaData = await ctaResponse.json();
          setCtaData(ctaData);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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

  // Transform database cause data to match component expectations
  const transformCauseData = (dbCause) => ({
    id: dbCause.id || dbCause._id,
    title: dbCause.title,
    description: dbCause.description,
    image: dbCause.image,
    icon: getCauseIcon(dbCause.category), // Helper function to map category to icon
    raised: dbCause.raisedAmount,
    goal: dbCause.goalAmount,
    donors: dbCause.donors || 0, // Fallback if not in schema
    primaryAction: "Donate Now",
    secondaryAction: getSecondaryAction(dbCause.category), // Helper function
    category: dbCause.category
  });

  // Helper function to map category to icon
  const getCauseIcon = (category) => {
    const iconMap = {
      'Food': 'bread',
      'Education': 'book',
      'Healthcare': 'medical',
      'Empowerment': 'female',
      'Environment': 'leaf'
    };
    return iconMap[category] || 'heart';
  };

  // Helper function to get secondary action based on category
  const getSecondaryAction = (category) => {
    const actionMap = {
      'Food': 'Join Our Meal Drives',
      'Education': 'Volunteer',
      'Healthcare': 'Donate Medicines',
      'Empowerment': 'Sponsor a Training Program',
      'Environment': 'Join the Sustainability Movement'
    };
    return actionMap[category] || 'Get Involved';
  };

  // Loading state
  if (loading) {
    return (
      <main className="overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-700"></div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="overflow-hidden">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Transform causes data
  const transformedCauses = causes.map(transformCauseData);

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
          
          {transformedCauses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transformedCauses.map((cause, index) => (
                <CauseCard 
                  key={cause.id}
                  cause={cause}
                  delay={index * 0.2}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No causes available at the moment.</p>
            </div>
          )}
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
      
      {/* Dynamic CTA Section with Parallax Effect */}
      {ctaData?.isVisible !== false && (
        <section 
          ref={scrollRef} 
          className={`relative py-24 overflow-hidden ${ctaData?.backgroundColor || 'bg-gradient-to-r from-purple-800 to-blue-700'}`}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-0"
            style={{ 
              scale: ctaScale, 
              opacity: ctaOpacity
            }}
          />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${ctaData?.textColor || 'text-white'}`}>
                {ctaData?.title || 'Take Action Now!'}
              </h2>
              <p className={`text-xl opacity-90 max-w-2xl mx-auto mb-12 ${ctaData?.textColor || 'text-white'}`}>
                {ctaData?.description || 'Your contribution can change lives. Every donation counts, no matter how small.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {ctaData?.buttons && ctaData.buttons.length > 0 ? (
                  ctaData.buttons
                    .filter(button => button.isVisible)
                    .map((button, index) => (
                      <motion.div
                        key={button.id || index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href={button.href}
                          className={`px-8 py-4 font-bold rounded-full text-xl transition-all duration-300 shadow-lg inline-block ${
                            button.type === 'primary' 
                              ? 'bg-white text-purple-700 hover:bg-gray-100' 
                              : 'bg-transparent border-2 border-white text-white hover:bg-white/10'
                          }`}
                        >
                          {button.text}
                        </Link>
                      </motion.div>
                    ))
                ) : (
                  // Fallback buttons if no CTA data
                  <>
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
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Floating UI Elements */}
      <FloatingDonateButton />
      <ChatbotButton />
    </main>
  );
}