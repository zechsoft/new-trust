import { motion } from 'framer-motion';
import { RefObject } from 'react';
import { Star, Heart, Globe, Lightbulb } from 'lucide-react';

interface CoreValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface MissionVisionProps {
  coreValues: CoreValue[];
  valuesRef: RefObject<HTMLDivElement>;
}

export default function MissionVision({ coreValues, valuesRef }: MissionVisionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-12 h-12 text-purple-600" />;
      case 'Globe':
        return <Globe className="w-12 h-12 text-blue-600" />;
      case 'Lightbulb':
        return <Lightbulb className="w-12 h-12 text-yellow-500" />;
      default:
        return <Star className="w-12 h-12 text-green-600" />;
    }
  };

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
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Our Mission & Vision</h2>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <motion.div 
            className="md:w-1/2 p-8 rounded-xl bg-white shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Mission</h3>
            </div>
            <p className="text-lg text-gray-700">
              To create a world where every individual has access to basic human rights—
              <span className="font-bold text-purple-600">food, education, healthcare, and dignity</span>.
            </p>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 p-8 rounded-xl bg-white shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Vision</h3>
            </div>
            <p className="text-lg text-gray-700">
              To <span className="font-bold text-blue-600">end poverty, uplift communities, and create sustainable solutions</span> for a better tomorrow.
            </p>
          </motion.div>
        </div>
        
        <div ref={valuesRef} className="mt-16">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Values
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <div 
                key={value.id} 
                className="value-card p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {getIcon(value.icon)}
                  <h4 className="text-xl font-bold text-gray-800 mt-4 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}