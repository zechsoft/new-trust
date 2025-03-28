'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const benefits = [
    "Access to all study materials and mock tests",
    "Personalized AI-driven study plans",
    "Live doubt clearing sessions with experts",
    "Performance analytics and progress tracking"
  ];

  return (
    <motion.section
      id="call-to-action"
      className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Supercharge Your Exam Preparation?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of successful aspirants who have achieved their goals with our comprehensive preparation platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 mr-2 mt-1 bg-green-500 rounded-full p-1">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Success Rate</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    94% of our students clear their target exams in first attempt
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-primary" 
                      style={{ 
                        backgroundImage: `url(/images/avatars/avatar-${i}.jpg)`,
                        backgroundSize: 'cover',
                        zIndex: 5 - i
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm">
                  <span className="font-bold">10,000+</span> students enrolled
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Start Your Journey Today</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/60 text-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="exam" className="text-sm font-medium block mb-1">Target Exam</label>
                  <select 
                    id="exam"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  >
                    <option value="" className="bg-primary">Select your target exam</option>
                    <option value="upsc" className="bg-primary">UPSC Civil Services</option>
                    <option value="banking" className="bg-primary">Banking Exams</option>
                    <option value="ssc" className="bg-primary">SSC Exams</option>
                    <option value="railways" className="bg-primary">Railway Exams</option>
                    <option value="state-psc" className="bg-primary">State PSC Exams</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full mt-6 bg-white text-primary hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg"
                >
                  Get Started Free
                </button>
                <p className="text-sm text-center text-white/80 mt-2">
                  Free 7-day trial, no credit card required
                </p>
              </form>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm mb-4">Trusted by top coaching institutes across India</p>
            <div className="flex flex-wrap justify-center gap-6 opacity-80">
              {/* These would be replaced with actual partner logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-24 bg-white/20 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;