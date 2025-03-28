import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  timelineData: TimelineItem[];
}

export default function Timeline({ timelineData }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = timelineRef.current;
    if (timeline) {
      // Create a horizontal scrolling effect for the timeline
      gsap.to('.timeline-container', {
        x: () => -(timeline.scrollWidth - timeline.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animate each timeline item
      gsap.from('.timeline-item', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: timeline,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "From a Small Dream to a Nationwide Movement"
          </p>
        </motion.div>
        
        <div ref={timelineRef} className="relative overflow-hidden" style={{ height: '500px' }}>
          <div className="timeline-container flex items-center space-x-16 absolute left-0 px-4">
            {timelineData.map((item) => (
              <div key={item.id} className="timeline-item w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">{item.year}</h3>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2">
            <div className="absolute top-1/2 left-0 h-3 w-3 bg-purple-600 rounded-full -translate-y-1/2"></div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <motion.p 
            className="text-xl font-semibold text-purple-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join us in writing the next chapter of hope!
          </motion.p>
        </div>
      </div>
    </section>
  );
}