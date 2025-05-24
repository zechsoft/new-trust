import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CauseCard from '@/components/ui/CauseCard';

interface Cause {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
}

interface FeaturedCausesProps {
  causes: Cause[];
}

const FeaturedCauses: React.FC<FeaturedCausesProps> = ({ causes }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Current Causes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These are the initiatives that need your support right now. Every contribution makes a difference.
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
        
        <div className="text-center mt-12">
          <Link
            href="/causes"
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            View All Causes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCauses;