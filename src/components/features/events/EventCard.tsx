'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  viewMode?: 'grid' | 'list';
  onClick: () => void;
  delay?: number;
}

const EventCard = ({ event, viewMode = 'grid', onClick, delay = 0 }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Format location (handle both string and object locations)
  const formatLocation = (location: any) => {
    if (!location) return 'Location TBA';
    if (typeof location === 'string') return location;
    return location.name || `${location.city || ''}, ${location.state || ''}`.trim() || 'Location TBA';
  };
  
  // Calculate spots left
  const spotsLeft = event.maxAttendees - event.currentAttendees;
  const spotPercentage = (event.currentAttendees / event.maxAttendees) * 100;
  
  // Get days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const eventDate = new Date(event.date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = getDaysRemaining();
  
  // Check if the image URL is valid (not empty)
  const hasValidImage = event.imageUrl && event.imageUrl.trim() !== '';
  // Default placeholder image path
  const placeholderImage = '/images/event-placeholder.jpg';

  if (viewMode === 'list') {
    return (
      <motion.div 
        className="event-animate bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-64 h-48">
            {hasValidImage ? (
              <Image 
                src={event.imageUrl} 
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
              {event.category}
            </div>
          </div>
          
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-500 mb-3">{formatDate(event.date)} • {formatLocation(event.location)}</p>
              </div>
              
              <motion.div 
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {daysRemaining > 0 ? `${daysRemaining} days left` : 'Today'}
              </motion.div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex-1 pr-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Registration</span>
                  <span className="text-xs font-medium text-purple-600">{event.currentAttendees}/{event.maxAttendees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${spotPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <motion.button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="event-animate bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-52">
        {hasValidImage ? (
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
          {event.category}
        </div>
        
        <motion.div 
          className="absolute top-4 right-4 bg-white text-purple-800 px-3 py-1 rounded-full font-bold text-sm shadow-md"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Today'}
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
        <p className="text-gray-500 mb-3">{formatDate(event.date)} • {formatLocation(event.location)}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">Registration</span>
          <span className="text-xs font-medium text-purple-600">{event.currentAttendees}/{event.maxAttendees}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-purple-600 h-2 rounded-full" 
            style={{ width: `${spotPercentage}%` }}
          ></div>
        </div>
        
        <motion.button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;