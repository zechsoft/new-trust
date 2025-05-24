import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EventCard from '@/components/ui/EventCard';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  featured: boolean;
}

interface EventsSectionProps {
  eventsRef: React.RefObject<HTMLDivElement>;
  upcomingEvents: Event[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ eventsRef, upcomingEvents }) => {
  return (
    <section ref={eventsRef} className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at these upcoming events to support our cause and connect with our community.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {upcomingEvents.filter(event => event.featured).map((event, index) => (
            <div key={event.id} className="event-card">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/events"
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;