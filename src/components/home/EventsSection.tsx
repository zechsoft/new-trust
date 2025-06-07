import React, { useState, useEffect } from 'react';
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
  visible: boolean;
  registrations: number;
  maxCapacity: number;
  category: string;
}

interface SectionSettings {
  sectionVisible: boolean;
  sectionTitle: string;
  sectionSubtitle: string;
  backgroundGradient: string;
  showOnlyFeatured: boolean;
  maxEventsToShow: number;
  showViewAllButton: boolean;
  viewAllButtonText: string;
  viewAllButtonLink: string;
}

interface EventSectionData {
  events: Event[];
  sectionSettings: SectionSettings;
}

interface EventsSectionProps {
  eventsRef: React.RefObject<HTMLDivElement>;
}

const EventsSection: React.FC<EventsSectionProps> = ({ eventsRef }) => {
  const [eventData, setEventData] = useState<EventSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api');
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  // Don't render if section is not visible or still loading
  if (loading) {
    return (
      <section ref={eventsRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !eventData) {
    return (
      <section ref={eventsRef} className="py-16 md:py-24 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h2>
            <p className="text-red-500">{error || 'Failed to load events data'}</p>
          </div>
        </div>
      </section>
    );
  }

  const { events, sectionSettings } = eventData;

  // Don't render if section is set to not visible
  if (!sectionSettings.sectionVisible) {
    return null;
  }

  // Filter events based on settings
  let filteredEvents = events.filter(event => event.visible);
  
  if (sectionSettings.showOnlyFeatured) {
    filteredEvents = filteredEvents.filter(event => event.featured);
  }

  // Limit number of events to show
  if (sectionSettings.maxEventsToShow > 0) {
    filteredEvents = filteredEvents.slice(0, sectionSettings.maxEventsToShow);
  }

  // Dynamic background gradient class
  const backgroundClass = `py-16 md:py-24 bg-gradient-to-b ${sectionSettings.backgroundGradient}`;

  return (
    <section ref={eventsRef} className={backgroundClass}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            {sectionSettings.sectionTitle}
          </h2>
          {sectionSettings.sectionSubtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {sectionSettings.sectionSubtitle}
            </p>
          )}
        </motion.div>
        
        {filteredEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div 
                  key={event.id} 
                  className="event-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                  
                  {/* Optional: Show additional event info */}
                  <div className="mt-4 text-center text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {event.category}
                      </span>
                      {event.maxCapacity > 0 && (
                        <span className="text-gray-500">
                          {event.registrations}/{event.maxCapacity} registered
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {sectionSettings.showViewAllButton && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href={sectionSettings.viewAllButtonLink}
                  className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  {sectionSettings.viewAllButtonText}
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-xl mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Events Available</h3>
            <p className="text-gray-600">Check back soon for upcoming events!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;