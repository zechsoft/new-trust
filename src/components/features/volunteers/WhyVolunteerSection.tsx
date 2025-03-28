'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Heart, Users, Award, Globe } from 'lucide-react';

const WhyVolunteerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.from('.benefit-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const benefitCardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const iconAnimationVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3, type: "spring" }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Why Become a Volunteer?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be the change you wish to see in the world! Join a passionate community of changemakers dedicated to helping those in need. Whether you have a few hours or a lifetime to give, your time can create an impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Make an Impact */}
          <motion.div 
            className="benefit-card bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={benefitCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto"
              variants={iconAnimationVariants}
              whileHover="hover"
            >
              <Heart size={32} className="text-red-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Make an Impact</h3>
            <p className="text-gray-600 text-center">Your time and skills directly change lives and create lasting positive change in communities.</p>
          </motion.div>

          {/* Meet Like-Minded People */}
          <motion.div 
            className="benefit-card bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={benefitCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto"
              variants={iconAnimationVariants}
              whileHover="hover"
            >
              <Users size={32} className="text-blue-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Meet Like-Minded People</h3>
            <p className="text-gray-600 text-center">Connect with a passionate community of changemakers who share your values and vision.</p>
          </motion.div>

          {/* Gain Experience & Skills */}
          <motion.div 
            className="benefit-card bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={benefitCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto"
              variants={iconAnimationVariants}
              whileHover="hover"
            >
              <Award size={32} className="text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Gain Experience & Skills</h3>
            <p className="text-gray-600 text-center">Learn, grow, and develop valuable leadership skills that benefit both your personal and professional life.</p>
          </motion.div>

          {/* Travel & Explore */}
          <motion.div 
            className="benefit-card bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            variants={benefitCardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto"
              variants={iconAnimationVariants}
              whileHover="hover"
            >
              <Globe size={32} className="text-amber-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Travel & Explore</h3>
            <p className="text-gray-600 text-center">Take advantage of opportunities to volunteer worldwide and immerse yourself in new cultures and communities.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyVolunteerSection;