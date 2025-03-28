'use client';

import { motion } from 'framer-motion';
import { CalendarCheck, BookOpen, ClipboardCheck, Clock, Brain, HeartHandshake, UserCheck } from 'lucide-react';

interface StudyStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface StudyPlanProps {
  studyPlanSteps: StudyStep[];
}

export default function StudyPlan({ studyPlanSteps }: StudyPlanProps) {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar-check':
        return <CalendarCheck className="w-8 h-8 text-white" />;
      case 'book-open':
        return <BookOpen className="w-8 h-8 text-white" />;
      case 'clipboard-check':
        return <ClipboardCheck className="w-8 h-8 text-white" />;
      case 'clock':
        return <Clock className="w-8 h-8 text-white" />;
      case 'brain':
        return <Brain className="w-8 h-8 text-white" />;
      case 'heart-handshake':
        return <HeartHandshake className="w-8 h-8 text-white" />;
      case 'user-check':
        return <UserCheck className="w-8 h-8 text-white" />;
      default:
        return <BookOpen className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="study-plan" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            📍 How to Prepare? 🚀
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured preparation guide for every exam, helping students navigate their 
            study journey effectively with a step-by-step roadmap.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12">
            {studyPlanSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  {/* Icon for mobile */}
                  <div className="flex md:hidden justify-center w-full mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-5/12 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">
                      Step {step.id}: {step.title}
                    </h3>
                    <p className="text-gray-700">{step.description}</p>
                    <div className="mt-4">
                      <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                  
                  {/* Icon for desktop */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg z-10">
                      {getStepIcon(step.icon)}
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="md:w-5/12"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Final icon */}
          <div className="flex justify-center mt-8">
            <motion.div
              className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-white text-3xl">🎯</div>
            </motion.div>
          </div>
        </div>
        
        {/* AI Study Plan Generator */}
        <motion.div
          className="mt-16 p-8 bg-blue-50 rounded-xl border border-blue-200 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                💡 AI-Powered Study Plan Generator
              </h3>
              <p className="text-gray-700 max-w-2xl">
                Generate a customized study plan based on your target exam, available study hours,
                and exam date. Our AI will create a day-by-day schedule to maximize your preparation.
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Generate My Plan
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}   