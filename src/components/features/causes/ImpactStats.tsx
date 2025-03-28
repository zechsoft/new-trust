'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Heart, Book, Stethoscope, Users, Sprout, Globe, Calendar, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  description: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, color, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="mb-6 relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300">
        <div>
          <span className="font-bold text-2xl">
            <CountUp end={value} separator="," duration={2.5} />
            <span className="text-sm ml-1">{label}</span>
          </span>
          <motion.p 
            className="text-sm text-gray-600 mt-1 max-w-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
        <motion.div 
          className={`${color} h-12 w-12 rounded-full flex items-center justify-center bg-opacity-20 p-2`}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

const ImpactStats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'story' | 'goals'>('stats');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  const stats = [
    {
      icon: <Heart />,
      value: 1250000,
      label: "meals served",
      color: "text-red-500",
      description: "Nutritious meals delivered to communities facing food insecurity across 27 countries.",
      delay: 0.1
    },
    {
      icon: <Book />,
      value: 75000,
      label: "children educated",
      color: "text-blue-500",
      description: "Quality education provided through our scholarship programs and 120 newly built schools.",
      delay: 0.2
    },
    {
      icon: <Stethoscope />,
      value: 500000,
      label: "medical consultations",
      color: "text-green-500",
      description: "Free healthcare services delivered by our volunteer medical professionals in underserved areas.",
      delay: 0.3
    },
    {
      icon: <Users />,
      value: 1000,
      label: "volunteers worldwide",
      color: "text-purple-500",
      description: "Dedicated individuals donating their time and expertise across 42 countries.",
      delay: 0.4
    },
    {
      icon: <Sprout />,
      value: 250000,
      label: "trees planted",
      color: "text-emerald-500",
      description: "Reforestation efforts helping combat climate change and restore natural habitats.",
      delay: 0.5
    },
    {
      icon: <Globe />,
      value: 50,
      label: "countries reached",
      color: "text-indigo-500",
      description: "Global impact spanning across 6 continents with localized programs for maximum effectiveness.",
      delay: 0.6
    },
    {
      icon: <Calendar />,
      value: 15,
      label: "years of service",
      color: "text-amber-500",
      description: "Consistent dedication to making the world better since our founding in 2010.",
      delay: 0.7
    },
    {
      icon: <Award />,
      value: 12,
      label: "humanitarian awards",
      color: "text-rose-500",
      description: "Recognition for excellence in humanitarian work and sustainable development initiatives.",
      delay: 0.8
    }
  ];
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 md:p-8 transition-all duration-700 overflow-hidden"
      style={{ 
        backgroundImage: "linear-gradient(to right bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
        backgroundSize: "cover"
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7 }}
      ref={statsRef}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Global Impact</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto">Transforming lives and communities through compassion and action</p>
      </motion.div>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {['stats', 'story', 'goals'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'stats' && (
            <div className="grid md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                  description={stat.description}
                  delay={stat.delay}
                />
              ))}
            </div>
          )}
          
          {activeTab === 'story' && (
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Journey</h3>
              <p className="mb-4 text-gray-700">Founded in 2010 by a small group of passionate individuals, our organization began with a simple mission: to make tangible differences in communities facing the greatest challenges.</p>
              <p className="mb-4 text-gray-700">What started as local weekend meal deliveries has grown into a global movement spanning 50 countries and impacting millions of lives through sustainable development programs.</p>
              <p className="text-gray-700">Today, we work with governments, local leaders, and other NGOs to implement data-driven solutions that address the root causes of poverty, inequality, and environmental degradation.</p>
            </motion.div>
          )}
          
          {activeTab === 'goals' && (
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Future Goals</h3>
              <ul className="space-y-3">
                <motion.li 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  Expand educational programs to reach 200,000 children by 2027
                </motion.li>
                <motion.li 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Plant 1 million trees as part of our climate action initiative
                </motion.li>
                <motion.li 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                  Establish 50 new community health centers in underserved regions
                </motion.li>
                <motion.li 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                  Increase volunteer base to 2,500 active members worldwide
                </motion.li>
                <motion.li 
                  className="flex items-center text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                  Develop innovative water purification systems for 100 communities
                </motion.li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-gray-600 italic">"Together, we're not just changing statistics – we're changing lives."</p>
      </motion.div>
    </motion.div>
  );
};

export default ImpactStats;