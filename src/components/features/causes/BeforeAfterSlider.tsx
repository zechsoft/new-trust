'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSlideProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

const transformProjects = [
  {
    beforeImage: "/images/before-after/village-before.jpg",
    afterImage: "/images/before-after/village-after.jpg",
    title: "Sustainable Water Project",
    description: "Transforming a water-scarce village with clean water access for all residents"
  },
  {
    beforeImage: "/images/before-after/school-before.jpg",
    afterImage: "/images/before-after/school-after.jpg",
    title: "School Renovation",
    description: "Rebuilding and equipping a dilapidated school with modern facilities"
  },
  {
    beforeImage: "/images/before-after/clinic-before.jpg",
    afterImage: "/images/before-after/clinic-after.jpg",
    title: "Healthcare Center",
    description: "Converting an unused building into a fully-functional medical clinic"
  }
];

const BeforeAfterSlide: React.FC<BeforeAfterSlideProps> = ({ 
  beforeImage, 
  afterImage, 
  title, 
  description 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(x, 0), 100));
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(x, 0), 100));
    }
  };
  return (
    <div className="mb-12">
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div 
        ref={containerRef}
        className="relative h-80 md:h-96 overflow-hidden rounded-xl cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full size) */}
        <div className="absolute inset-0">
          <Image 
            src={afterImage}
            alt="After transformation"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Before image (clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image 
            src={beforeImage}
            alt="Before transformation"
            fill
            className="object-cover"
          />
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-white" />
        </div>
        
        {/* Slider handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8L22 12L18 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 8L2 12L6 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Witness the transformative power of our projects through these before and after comparisons.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <BeforeAfterSlide 
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
                description={project.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;