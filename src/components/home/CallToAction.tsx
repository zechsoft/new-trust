import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join Us in Making a Difference
        </motion.h2>
        
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your contribution can change lives. Together, we can create a better world for all.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/donate" 
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Donate Now
          </Link>
          <Link 
            href="/get-involved" 
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Get Involved
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;