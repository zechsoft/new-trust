'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import HeroBanner from '@/components/features/donate/HeroBanner';
import DonationForm from '@/components/features/donate/DonationForm';
import ImpactMeter from '@/components/features/donate/ImpactMeter';
import TransparencySection from '@/components/features/donate/TransparencySection';
import TestimonialSection from '@/components/features/donate/TestimonialSection';
import FloatingDonateButton from '@/components/ui/FloatingDonateButton';
import ChatbotButton from '@/components/features/ChatbotButton';
import ThankYouModal from '@/components/features/donate/ThankYouModal';

export default function DonatePage() {
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial page animation
    gsap.from('.donate-section', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    });

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // State for donation flow
  const [showThankYou, setShowThankYou] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);

  // Function to handle successful donation
  const handleDonationSuccess = (name: string, amount: number) => {
    setDonorName(name);
    setDonationAmount(amount);
    setShowThankYou(true);
    
    // Trigger confetti effect (implemented in ThankYouModal)
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero Section with Video Background */}
      <HeroBanner />

      {/* Main Donation Form Section */}
      <section className="donate-section py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Make a Difference Today</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your generous donation brings hope and creates lasting change in the lives of those who need it most.
            </p>
          </motion.div>

          {/* Donation Form Component */}
          <DonationForm onDonationSuccess={handleDonationSuccess} />
        </div>
      </section>

      {/* Impact Visualization Section */}
      <section className="donate-section py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ImpactMeter />
        </div>
      </section>

      {/* Transparency & Trust Section */}
      <section className="donate-section py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <TransparencySection />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="donate-section py-16 md:py-20 bg-gradient-to-r from-purple-900 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <TestimonialSection />
        </div>
      </section>

      {/* Floating UI Elements */}
      <FloatingDonateButton />
      <ChatbotButton />

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <ThankYouModal 
            name={donorName}
            amount={donationAmount}
            onClose={() => setShowThankYou(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}