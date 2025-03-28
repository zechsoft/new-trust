'use client';

import { RefObject, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, Briefcase } from 'lucide-react';

interface Exam {
  id: number;
  title: string;
  description: string;
  icon: string;
  eligibility: string;
  pattern: string;
  opportunities: string;
}

interface ExamOverviewProps {
  examData: Exam[];
  examOverviewRef: RefObject<HTMLDivElement>;
}

export default function ExamOverview({ examData, examOverviewRef }: ExamOverviewProps) {
  // Track which cards have their details visible
  const [expandedCards, setExpandedCards] = useState<{[key: number]: boolean}>({});

  const toggleCardDetails = (examId: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="w-12 h-12 text-blue-600" />;
      case 'clock':
        return <Clock className="w-12 h-12 text-green-600" />;
      case 'users':
        return <Users className="w-12 h-12 text-purple-600" />;
      case 'briefcase':
        return <Briefcase className="w-12 h-12 text-orange-600" />;
      default:
        return <Award className="w-12 h-12 text-blue-600" />;
    }
  };

  return (
    <section id="exams" className="py-16 md:py-24 bg-white" ref={examOverviewRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            📍 Introduction to Competitive Exams 🏆
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A detailed overview of all major competitive exams in India, their eligibility, 
            exam pattern, syllabus, and job opportunities after selection.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examData.map((exam) => (
            <motion.div 
              key={exam.id}
              className="exam-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex justify-center">
                    {getIcon(exam.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{exam.title}</h3>
                  <p className="text-gray-600 text-center flex-grow">{exam.description}</p>
                  
                  {/* Toggle Button */}
                  <div className="mt-6 flex justify-center">
                    <button 
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                      onClick={() => toggleCardDetails(exam.id)}
                    >
                      {expandedCards[exam.id] ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  
                  {/* Details Panel with transition */}
                  {expandedCards[exam.id] && (
                    <motion.div 
                      className="mt-6 pt-4 border-t border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-blue-600">Eligibility:</h4>
                          <p className="text-gray-700 text-sm">{exam.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600">Exam Pattern:</h4>
                          <p className="text-gray-700 text-sm">{exam.pattern}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600">Job Opportunities:</h4>
                          <p className="text-gray-700 text-sm">{exam.opportunities}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}