'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define types for volunteer roles
type VolunteerRole = {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  commitment: string;
  skills: string[];
};

export default function VolunteerRolesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sample volunteer roles data
  const volunteerRoles: VolunteerRole[] = [
    {
      id: 1,
      title: 'Teaching Assistant',
      description: 'Help educate children in underserved communities. Provide support with reading, mathematics, and other educational activities.',
      category: 'Teaching',
      icon: '/icons/teaching.svg',
      commitment: '4-8 hours weekly',
      skills: ['Patience', 'Communication', 'Basic academic knowledge']
    },
    {
      id: 2,
      title: 'Medical Support',
      description: 'Assist healthcare professionals in providing basic medical services to communities in need.',
      category: 'Medical',
      icon: '/icons/medical.svg',
      commitment: '8-12 hours weekly',
      skills: ['Medical background', 'Empathy', 'Organization']
    },
    {
      id: 3,
      title: 'Fundraising Coordinator',
      description: 'Organize fundraising events and campaigns to support our various initiatives around the world.',
      category: 'Fundraising',
      icon: '/icons/fundraising.svg',
      commitment: '5-10 hours weekly',
      skills: ['Event planning', 'Communication', 'Marketing']
    },
    {
      id: 4,
      title: 'Event Organizer',
      description: 'Plan and execute community events, workshops, and awareness campaigns.',
      category: 'Events',
      icon: '/icons/events.svg',
      commitment: '10-15 hours monthly',
      skills: ['Organization', 'Leadership', 'Creative thinking']
    },
    {
      id: 5,
      title: 'Environmental Advocate',
      description: 'Participate in tree planting, clean-up drives, and environmental education initiatives.',
      category: 'Environment',
      icon: '/icons/environment.svg',
      commitment: '8-12 hours monthly',
      skills: ['Environmental knowledge', 'Physical stamina', 'Passion for nature']
    },
    {
      id: 6,
      title: 'Social Media Manager',
      description: 'Help manage our social media presence and create engaging content to promote our cause.',
      category: 'Marketing',
      icon: '/icons/social-media.svg',
      commitment: '5-8 hours weekly',
      skills: ['Digital marketing', 'Content creation', 'Social media expertise']
    },
    {
      id: 7,
      title: 'Community Outreach',
      description: 'Connect with local communities to assess needs and coordinate support efforts.',
      category: 'Outreach',
      icon: '/icons/community.svg',
      commitment: '8-10 hours weekly',
      skills: ['Communication', 'Empathy', 'Cultural awareness']
    },
    {
      id: 8,
      title: 'Technical Support',
      description: 'Provide IT assistance, website maintenance, and technical troubleshooting.',
      category: 'Technical',
      icon: '/icons/technical.svg',
      commitment: '5-10 hours weekly',
      skills: ['IT knowledge', 'Problem-solving', 'Technical aptitude']
    }
  ];

  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(volunteerRoles.map(role => role.category)))];

  // Filter roles based on selected category
  const filteredRoles = selectedCategory === 'All' 
    ? volunteerRoles 
    : volunteerRoles.filter(role => role.category === selectedCategory);

  // Handle click outside of modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedRole(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section id="volunteer-roles" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Perfect Role</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the volunteer opportunity that matches your skills, interests, and availability
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md group cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <Image 
                    src={role.icon} 
                    alt={role.title} 
                    width={32} 
                    height={32}
                    className="text-purple-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">{role.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{role.description.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm font-medium text-purple-600">{role.category}</span>
                  <span className="text-sm text-gray-500">{role.commitment}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Role Detail Modal */}
        <AnimatePresence>
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Image 
                        src={selectedRole.icon} 
                        alt={selectedRole.title} 
                        width={24} 
                        height={24}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedRole.title}</h3>
                      <span className="text-sm font-medium text-purple-600">{selectedRole.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedRole.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Time Commitment</h4>
                  <p className="text-gray-600">{selectedRole.commitment}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.skills.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md"
                    onClick={() => {
                      setSelectedRole(null);
                      // Scroll to signup form
                      document.getElementById('volunteer-signup')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}