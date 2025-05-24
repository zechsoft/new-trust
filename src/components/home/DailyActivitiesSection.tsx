import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  time: string;
  location: string;
  description: string;
  days: string[];
}

interface DailyActivitiesSectionProps {
  dailyActivities: Activity[];
}

const DailyActivitiesSection: React.FC<DailyActivitiesSectionProps> = ({ dailyActivities }) => {
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
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Daily Activities</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our ongoing programs that make a difference every day in our communities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {dailyActivities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{activity.location}</span>
                </div>
                <p className="text-gray-600">{activity.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h4 className="font-medium text-gray-700 mb-2">Schedule:</h4>
                <div className="flex flex-wrap gap-2">
                  {activity.days.map(day => (
                    <span 
                      key={day} 
                      className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white">
                <Link 
                  href={`/activities/${activity.id}`}
                  className="inline-block text-purple-600 font-medium hover:text-purple-800 transition-colors"
                >
                  <span className="flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyActivitiesSection;