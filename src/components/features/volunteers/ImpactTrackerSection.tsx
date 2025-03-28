'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface ImpactStats {
  volunteersThisMonth: number;
  totalHours: number;
  projects: number;
  livesImpacted: number;
}

const ImpactTrackerSection = () => {
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    volunteersThisMonth: 0,
    totalHours: 0,
    projects: 0,
    livesImpacted: 0
  });
  
  const [userHours, setUserHours] = useState<number>(1);
  const [userImpact, setUserImpact] = useState<{hours: number, people: number}>({ hours: 1, people: 3 });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  
  // Animate counting for stats
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (countRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: countRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });
      
      tl.to(impactStats, {
        duration: 2,
        volunteersThisMonth: 230,
        totalHours: 10645,
        projects: 52,
        livesImpacted: 5280,
        roundProps: ["volunteersThisMonth", "totalHours", "projects", "livesImpacted"],
        onUpdate: () => {
          setImpactStats({...impactStats});
        },
        ease: "power2.out"
      });
    }
    
    return () => {
      if (ScrollTrigger.getById("impact-counter")) {
        ScrollTrigger.getById("impact-counter")?.kill();
      }
    };
  }, []);
  
  // Calculate user impact
  useEffect(() => {
    setUserImpact({
      hours: userHours,
      people: Math.floor(userHours * 3)
    });
  }, [userHours]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  // Top volunteers data
  const topVolunteers = [
    { name: "Sarah Johnson", hours: 143, image: "/avatars/volunteer-1.jpg", badge: "Community Hero" },
    { name: "Michael Chen", hours: 126, image: "/avatars/volunteer-2.jpg", badge: "Teacher" },
    { name: "Aisha Patel", hours: 118, image: "/avatars/volunteer-3.jpg", badge: "Environmental Champion" },
    { name: "David Wilson", hours: 107, image: "/avatars/volunteer-4.jpg", badge: "Mentor" },
  ];
  
  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-indigo-800 mb-4">Live Impact Tracker</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch in real-time how our volunteers are changing the world
          </p>
        </motion.div>
        
        {/* Live Stats Counter */}
        <div ref={countRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">New Volunteers</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{impactStats.volunteersThisMonth}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">Hours Logged</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">{impactStats.totalHours.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">And counting</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">Active Projects</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{impactStats.projects}</p>
            <p className="text-sm text-gray-500 mt-1">Ongoing initiatives</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-amber-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">Lives Impacted</h3>
            </div>
            <p className="text-4xl font-bold text-amber-600">{impactStats.livesImpacted.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">People helped</p>
          </motion.div>
        </div>
        
        {/* Your Impact Calculator */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 bg-gradient-to-br from-indigo-800 to-purple-700 text-white">
              <h3 className="text-2xl font-bold mb-4">Calculate Your Impact</h3>
              <p className="mb-6">
                See the difference your time can make. Move the slider to calculate the impact you could have.
              </p>
              
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Hours you can volunteer per month
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={userHours} 
                  onChange={(e) => setUserHours(parseInt(e.target.value))} 
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>1 hour</span>
                  <span>20 hours</span>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <motion.button 
                  className="py-3 px-6 bg-white text-indigo-800 rounded-full font-bold hover:bg-indigo-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Volunteering Today
                </motion.button>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Potential Impact</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-2">With <span className="font-bold text-indigo-700">{userHours} {userHours === 1 ? 'hour' : 'hours'}</span> per month:</p>
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-indigo-700">{userHours * 12}</p>
                      <p className="text-sm text-gray-500">Hours contributed annually</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-purple-700">{userImpact.people * 12}</p>
                      <p className="text-sm text-gray-500">People you could help annually</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Volunteer Leaderboard */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Volunteer Recognition Board</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topVolunteers.map((volunteer, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-md flex items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-16 relative mr-4 rounded-full overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{volunteer.name}</h4>
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{volunteer.hours} hours contributed</span>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    {volunteer.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <motion.button 
              className="py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Volunteers
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactTrackerSection;