'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Star,
  AlertCircle,
  Settings,
  ExternalLink
} from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';

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
  category?: string;
}

export default function EventsSectionManagement() {
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Annual Charity Gala',
      date: 'April 15, 2025',
      time: '7:00 PM - 10:00 PM',
      location: 'Grand Ballroom, Metropolis Hotel',
      image: '/images/events/gala.jpg',
      description: 'Join us for an elegant evening of entertainment and fundraising to support our global initiatives.',
      featured: true,
      visible: true,
      registrations: 156,
      maxCapacity: 300,
      category: 'Fundraising'
    },
    {
      id: 2,
      title: 'Charity Run for Education',
      date: 'May 5, 2025',
      time: '8:00 AM - 12:00 PM',
      location: 'Central Park',
      image: '/images/events/run.jpg',
      description: 'Participate in our 5K/10K charity run to raise funds for educational programs in underprivileged areas.',
      featured: true,
      visible: true,
      registrations: 89,
      maxCapacity: 200,
      category: 'Sports'
    },
    {
      id: 3,
      title: 'Tech for Good Hackathon',
      date: 'May 22-23, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Innovation Hub',
      image: '/images/events/hackathon.jpg',
      description: 'Developers and designers team up to create technological solutions for humanitarian challenges.',
      featured: true,
      visible: true,
      registrations: 45,
      maxCapacity: 100,
      category: 'Technology'
    },
    {
      id: 4,
      title: 'Community Food Drive',
      date: 'June 10, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Community Center',
      image: '/images/events/food-drive.jpg',
      description: 'Help us collect food donations for local families in need during our monthly food drive.',
      featured: false,
      visible: true,
      registrations: 23,
      maxCapacity: 50,
      category: 'Community'
    }
  ]);
  
  const [sectionSettings, setSectionSettings] = useState({
    sectionVisible: true,
    sectionTitle: 'Upcoming Events',
    sectionSubtitle: 'Join us at these upcoming events to support our cause and connect with our community.',
    backgroundGradient: 'from-blue-50 to-white',
    showOnlyFeatured: true,
    maxEventsToShow: 3,
    showViewAllButton: true,
    viewAllButtonText: 'View All Events',
    viewAllButtonLink: '/events'
  });

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleEventVisibility = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, visible: !event.visible }
        : event
    ));
    setHasChanges(true);
  };

  const handleToggleEventFeatured = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, featured: !event.featured }
        : event
    ));
    setHasChanges(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically save to your backend
    console.log('Saving changes...', { events, sectionSettings });
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      // Reset to original state
      setHasChanges(false);
    }
  };

  const featuredEvents = events.filter(event => event.featured && event.visible);
  const visibleEvents = sectionSettings.showOnlyFeatured 
    ? featuredEvents.slice(0, sectionSettings.maxEventsToShow)
    : events.filter(event => event.visible).slice(0, sectionSettings.maxEventsToShow);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Events Section Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage the events section displayed on the homepage
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          {hasChanges && (
            <>
              <button
                onClick={handleResetChanges}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSaveChanges}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              You have unsaved changes. Don't forget to save your work!
            </span>
          </div>
        </div>
      )}

      {/* Preview Mode */}
      {previewMode && (
        <AdminCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Preview
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                This is how the section appears on your website
              </span>
            </div>
            
            {/* Client View Preview */}
            <div className={`bg-gradient-to-b ${sectionSettings.backgroundGradient} p-8 rounded-lg`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {sectionSettings.sectionTitle}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {sectionSettings.sectionSubtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {visibleEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {event.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {sectionSettings.showViewAllButton && (
                <div className="text-center">
                  <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300">
                    {sectionSettings.viewAllButtonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </AdminCard>
      )}

      {/* Section Settings */}
      {!previewMode && (
        <AdminCard>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Section Settings
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={sectionSettings.sectionTitle}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, sectionTitle: e.target.value});
                    setHasChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Section Subtitle
                </label>
                <textarea
                  value={sectionSettings.sectionSubtitle}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, sectionSubtitle: e.target.value});
                    setHasChanges(true);
                  }}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Gradient
                </label>
                <select
                  value={sectionSettings.backgroundGradient}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, backgroundGradient: e.target.value});
                    setHasChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="from-blue-50 to-white">Blue to White</option>
                  <option value="from-purple-50 to-white">Purple to White</option>
                  <option value="from-green-50 to-white">Green to White</option>
                  <option value="from-gray-50 to-white">Gray to White</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Events to Show
                </label>
                <select
                  value={sectionSettings.maxEventsToShow}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, maxEventsToShow: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value={2}>2 Events</option>
                  <option value={3}>3 Events</option>
                  <option value={4}>4 Events</option>
                  <option value={6}>6 Events</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  View All Button Text
                </label>
                <input
                  type="text"
                  value={sectionSettings.viewAllButtonText}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, viewAllButtonText: e.target.value});
                    setHasChanges(true);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sectionSettings.sectionVisible}
                    onChange={(e) => {
                      setSectionSettings({...sectionSettings, sectionVisible: e.target.checked});
                      setHasChanges(true);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show section on homepage
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sectionSettings.showOnlyFeatured}
                    onChange={(e) => {
                      setSectionSettings({...sectionSettings, showOnlyFeatured: e.target.checked});
                      setHasChanges(true);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show only featured events
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sectionSettings.showViewAllButton}
                    onChange={(e) => {
                      setSectionSettings({...sectionSettings, showViewAllButton: e.target.checked});
                      setHasChanges(true);
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show "View All Events" button
                  </span>
                </label>
              </div>
            </div>
          </div>
        </AdminCard>
      )}

      {/* Events Management */}
      {!previewMode && (
        <AdminCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Events Management ({events.length} total, {featuredEvents.length} featured)
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Featured events appear in the grid layout</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 hover:shadow-md transition-all ${
                    event.featured 
                      ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {event.featured && (
                          <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full">
                            ★
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </h4>
                          {event.category && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                              {event.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <Users className="w-4 h-4 mr-1" />
                            {event.registrations}/{event.maxCapacity} registered
                          </div>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {Math.round((event.registrations / event.maxCapacity) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleEventFeatured(event.id)}
                        className={`p-2 rounded-md transition-colors ${
                          event.featured
                            ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 hover:bg-yellow-200'
                            : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                        }`}
                        title={`${event.featured ? 'Remove from' : 'Add to'} featured events`}
                      >
                        <Star className={`w-4 h-4 ${event.featured ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleToggleEventVisibility(event.id)}
                        className={`p-2 rounded-md transition-colors ${
                          event.visible
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/20 hover:bg-green-200'
                            : 'text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
                        }`}
                        title={`${event.visible ? 'Hide' : 'Show'} event`}
                      >
                        {event.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditingEvent(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                        title="Edit event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}
    </div>
  );
}