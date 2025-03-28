'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
  gif?: string;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.from('.faq-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      gsap.from('.faq-item', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data with questions, answers and optional GIFs
  const faqs: FAQItem[] = [
    {
      question: "How much time do I need to commit as a volunteer?",
      answer: "We offer flexible volunteering opportunities! You can commit as little as 2 hours per week or join for specific events. Many of our volunteers contribute 4-8 hours monthly, but we appreciate any time you can give. We also have one-time opportunities and ongoing positions to fit your schedule.",
      gif: "/images/gifs/time-commitment.gif"
    },
    {
      question: "Do I need any special skills or training to volunteer?",
      answer: "No special skills are required for many volunteer positions! We provide all necessary training. We have roles suited for all skill levels, and if you have specific expertise (medical, teaching, etc.), we'll match you with opportunities where your skills can make the greatest impact.",
      gif: "/images/gifs/skills-training.gif"
    },
    {
      question: "Can I volunteer remotely or do I need to be in-person?",
      answer: "We offer both remote and in-person volunteer opportunities! Remote options include virtual mentoring, digital content creation, translation services, and fundraising support. In-person volunteers help with community events, direct service, and on-site projects.",
      gif: "/images/gifs/remote-volunteer.gif"
    },
    {
      question: "Will I receive any benefits as a volunteer?",
      answer: "Absolutely! Beyond the satisfaction of making a difference, our volunteers receive: training and skill development, networking opportunities, references for employment, certificates of service, access to exclusive events, and potential internship or job opportunities within our network of partners.",
      gif: "/images/gifs/volunteer-benefits.gif"
    },
    {
      question: "How do I track my volunteer hours?",
      answer: "We provide a convenient digital volunteer portal where you can log your hours, view upcoming opportunities, connect with team leaders, and track your impact. The system is accessible via web or mobile app, making it easy to maintain your volunteer record.",
      gif: "/images/gifs/track-hours.gif"
    },
    {
      question: "Can I volunteer as part of a group or with my company?",
      answer: "Yes! We welcome group volunteering from companies, schools, religious organizations, and social clubs. We can arrange special projects for teams and customize experiences based on your group's interests and skills. Contact our volunteer coordinator for group arrangements.",
      gif: "/images/gifs/group-volunteer.gif"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="faq-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about volunteering with us
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="faq-list space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${activeIndex === index ? 'shadow-lg' : ''}`}
              >
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-purple-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 mb-4">{faq.answer}</p>
                        
                        {/* Optional GIF illustration */}
                        {faq.gif && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <Image 
                              src={faq.gif} 
                              alt="FAQ illustration" 
                              width={600} 
                              height={300} 
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-600 mb-6">Still have questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="mailto:volunteer@example.org"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </motion.a>
              <motion.a 
                href="#chat-bot"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Live Chat
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;