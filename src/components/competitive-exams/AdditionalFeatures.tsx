'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Bell, 
  Bookmark, 
  Clock, 
  Zap,
  BookOpen
} from 'lucide-react';

const AdditionalFeatures = () => {
  // Sample progress data for demo chart
  const progressData = [
    { name: 'Week 1', score: 65 },
    { name: 'Week 2', score: 59 },
    { name: 'Week 3', score: 80 },
    { name: 'Week 4', score: 71 },
    { name: 'Week 5', score: 76 },
    { name: 'Week 6', score: 85 },
    { name: 'Week 7', score: 90 },
  ];

  // Sample subject performance data
  const subjectData = [
    { name: 'History', value: 78 },
    { name: 'Geography', value: 65 },
    { name: 'Polity', value: 82 },
    { name: 'Economy', value: 71 },
    { name: 'Science', value: 85 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Personalized Dashboard",
      description: "AI-powered dashboard that tracks your progress and suggests topics based on your performance."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Gamification",
      description: "Earn points, badges, and rewards as you complete topics, tests, and daily goals."
    },
    {
      icon: <Bookmark className="h-6 w-6 text-green-600" />,
      title: "Smart Bookmarks",
      description: "Save important notes and concepts for quick revision before exams."
    },
    {
      icon: <Bell className="h-6 w-6 text-red-600" />,
      title: "Exam Alerts",
      description: "Get timely notifications about upcoming exams, registration dates, and result announcements."
    }
  ];

  return (
    <motion.section
      id="additional-features"
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Boost Your Preparation</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Advanced features designed to enhance your learning experience and maximize your chances of success.
        </p>

        {/* Dashboard Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side: Stats and Charts */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Your Study Dashboard
              </h3>

              {/* Progress Overview */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-200">Weekly Performance</h4>
                  <select className="text-sm border border-gray-300 dark:border-gray-600 rounded p-1 bg-white dark:bg-gray-700">
                    <option>Last 7 Weeks</option>
                    <option>Last Month</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Subject-wise Performance */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Subject Performance</h4>
                <div className="flex gap-4">
                  <div className="h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {subjectData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1">
                    <ul className="space-y-1">
                      {subjectData.map((subject, index) => (
                        <li key={index} className="flex items-center">
                          <span 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></span>
                          <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{subject.name}:</span>
                          <span className="text-sm font-semibold">{subject.value}%</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        Focus areas for improvement:
                        <span className="block mt-1 font-medium text-orange-500">Geography & Economy</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Activity and Recommendations */}
            <div className="flex-1">
              <div className="h-full flex flex-col">
                {/* Daily Targets */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-lg mb-2 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Today's Targets
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center mr-3 bg-green-100 dark:bg-green-900/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 line-through opacity-70">Complete Indian History Quiz (45 min)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center mr-3 bg-green-100 dark:bg-green-900/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 line-through opacity-70">Read Current Affairs (30 min)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center mr-3">
                        <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">Geography Practice Set (60 min)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-3"></div>
                      <span className="text-gray-600 dark:text-gray-400">Mock Test for Economy (90 min)</span>
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2/4 completed</span>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-lg mb-2 text-purple-800 dark:text-purple-300">
                    AI Recommendations
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Based on your performance, you should focus more on <span className="font-semibold text-purple-700 dark:text-purple-300">Geography - Physical Features of India</span>
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Your recall ability in <span className="font-semibold text-purple-700 dark:text-purple-300">Economic Terms & Concepts</span> needs improvement
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          You're doing great in <span className="font-semibold text-green-600 dark:text-green-400">Modern History</span> and <span className="font-semibold text-green-600 dark:text-green-400">Science & Technology</span>!
                        </p>
                      </div>
                    </li>
                  </ul>
                  <button className="mt-3 text-sm text-purple-700 dark:text-purple-300 font-medium">
                    View personalized study plan →
                  </button>
                </div>

                {/* Upcoming Exams */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-2">Upcoming Exams</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">UPSC Prelims 2025</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">June 15, 2025</p>
                      </div>
                      <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-medium px-2 py-1 rounded">
                        86 days left
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">SBI PO Prelims</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">April 12, 2025</p>
                      </div>
                      <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-sm font-medium px-2 py-1 rounded">
                        22 days left
                      </div>
                    </li>
                    <li className="flex justify-between items-center opacity-60">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">SSC CGL Tier 1</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">March 10, 2025</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium px-2 py-1 rounded">
                        Completed
                      </div>
                    </li>
                  </ul>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    View all exams →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4 inline-block p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AdditionalFeatures;