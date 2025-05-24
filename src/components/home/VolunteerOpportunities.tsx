import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Briefcase, Heart, BookOpen, Utensils, Code } from 'lucide-react';

const VolunteerOpportunities = () => {
  return (
    <motion.div 
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="relative h-64 lg:h-auto col-span-1">
            <Image 
              src="/images/volunteer/volunteers-group.jpg" 
              alt="Volunteer team"
              fill
              style={{objectFit: "cover"}}
              className="brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Make an Impact
              </span>
            </div>
          </div>
          
          <div className="col-span-2 p-8 lg:p-10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Volunteer Opportunities</h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-indigo-100">
                Our work is made possible by dedicated volunteers who donate their time and skills. 
                Join our community of changemakers and help create lasting impact.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Flexible Scheduling
                  </h4>
                  <p className="text-indigo-100 text-sm">
                    Choose from one-time events, weekly commitments, or remote opportunities that fit your schedule.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-400" />
                    Community Building
                  </h4>
                  <p className="text-indigo-100 text-sm">
                    Connect with passionate individuals who share your commitment to making a difference.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-orange-400" />
                    Skills Development
                  </h4>
                  <p className="text-indigo-100 text-sm">
                    Gain valuable experience and develop new skills through meaningful volunteer work.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-orange-400" />
                    Direct Impact
                  </h4>
                  <p className="text-indigo-100 text-sm">
                    See firsthand how your contribution transforms lives in our community programs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link 
                href="/volunteer"
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-6 py-3 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-center"
              >
                Become a Volunteer
              </Link>
              <Link 
                href="/volunteer-faq"
                className="inline-block bg-white/20 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-800/50 p-6 lg:p-8">
          <h4 className="text-xl font-medium text-white mb-4">Current Priority Needs:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <BookOpen className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h5 className="text-white font-medium">Tutors</h5>
                <p className="text-xs text-indigo-200">After-school programs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Utensils className="w-5 h-5 text-green-300" />
              </div>
              <div>
                <h5 className="text-white font-medium">Kitchen Helpers</h5>
                <p className="text-xs text-indigo-200">Food distribution program</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <Code className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h5 className="text-white font-medium">Tech Volunteers</h5>
                <p className="text-xs text-indigo-200">Website & digital support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VolunteerOpportunities;