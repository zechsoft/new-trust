'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the partner logos
    if (sectionRef.current) {
      gsap.from('.partner-logo', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Animate the chart elements
    if (chartRef.current) {
      gsap.from('.chart-bar', {
        width: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      gsap.from('.chart-label', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: chartRef.current,
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

  // Partner logos data
  const partners = [
    { name: 'United Way', logo: '/images/partners/united-way.svg' },
    { name: 'Red Cross', logo: '/images/partners/red-cross.svg' },
    { name: 'Habitat for Humanity', logo: '/images/partners/habitat.svg' },
    { name: 'Feeding America', logo: '/images/partners/feeding-america.svg' },
    { name: 'UNICEF', logo: '/images/partners/unicef.svg' },
  ];

  // Volunteer efforts distribution data
  const effortsData = [
    { area: 'Education & Literacy', percentage: 85, color: 'bg-blue-500' },
    { area: 'Health & Wellness', percentage: 70, color: 'bg-purple-500' },
    { area: 'Environmental', percentage: 65, color: 'bg-green-500' },
    { area: 'Community Support', percentage: 90, color: 'bg-amber-500' },
    { area: 'Disaster Relief', percentage: 50, color: 'bg-red-500' },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Trust & Transparency</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in complete transparency about how we utilize volunteer efforts and donations to maximize our impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Volunteer Efforts Distribution Chart */}
          <div ref={chartRef} className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">How We Use Volunteer Efforts</h3>
            
            <div className="space-y-5">
              {effortsData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="chart-label text-gray-700 font-medium">{item.area}</span>
                    <span className="chart-label text-gray-700 font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`chart-bar h-full ${item.color} rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/impact-report"
                  className="text-purple-600 font-semibold inline-flex items-center group"
                >
                  View our full impact report
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Verified Non-Profit Partners */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Verified Non-Profit Partners</h3>
            <p className="text-gray-600 mb-8">
              We collaborate with reputable organizations worldwide to amplify our volunteer impact and ensure accountability.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="partner-logo bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={120} 
                    height={80} 
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href="/volunteer-handbook"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Volunteer Handbook
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;