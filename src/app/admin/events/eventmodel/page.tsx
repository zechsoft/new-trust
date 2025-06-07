'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Event } from '@/types/event';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaClock, 
  FaImage,
  FaTimes,
  FaSave,
  FaEye,
  FaEdit,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

interface AdminEventModalProps {
  event?: Event | null;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
  onSave: (eventData: any) => void;
}

const AdminEventModal = ({ event, mode, onClose, onSave }: AdminEventModalProps) => {
  const [isEditing, setIsEditing] = useState(mode === 'create' || mode === 'edit');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    imageUrl: '',
    price: 0,
    priceDetails: '',
    maxAttendees: 100,
    currentAttendees: 0,
    schedule: [],
    organizer: {
      name: '',
      role: '',
      avatar: ''
    }
  });
  
  const [newScheduleItem, setNewScheduleItem] = useState({ time: '', activity: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Workshop',
    'Conference',
    'Seminar',
    'Networking',
    'Training',
    'Webinar',
    'Social',
    'Sports',
    'Cultural',
    'Educational',
    'Business',
    'Technology',
    'Health',
    'Entertainment'
  ];

  // Initialize form data
  useEffect(() => {
    if (event && mode !== 'create') {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        location: typeof event.location === 'object' ? event.location : {
          name: event.location || '',
          address: '',
          city: '',
          state: '',
          zip: ''
        },
        imageUrl: event.imageUrl || '',
        price: event.price || 0,
        priceDetails: event.priceDetails || '',
        maxAttendees: event.maxAttendees || 100,
        currentAttendees: event.currentAttendees || 0,
        schedule: event.schedule || [],
        organizer: event.organizer || {
          name: '',
          role: '',
          avatar: ''
        }
      });
      setImagePreview(event.imageUrl || '');
    }
  }, [event, mode]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'maxAttendees' || name === 'currentAttendees' 
          ? Number(value) || 0 
          : value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle image URL change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

  // Add schedule item
  const addScheduleItem = () => {
    if (newScheduleItem.time && newScheduleItem.activity) {
      setFormData(prev => ({
        ...prev,
        schedule: [...prev.schedule, { ...newScheduleItem }]
      }));
      setNewScheduleItem({ time: '', activity: '' });
    }
  };

  // Remove schedule item
  const removeScheduleItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (formData.maxAttendees < 1) newErrors.maxAttendees = 'Max attendees must be at least 1';
    if (formData.currentAttendees < 0) newErrors.currentAttendees = 'Current attendees cannot be negative';
    if (formData.currentAttendees > formData.maxAttendees) {
      newErrors.currentAttendees = 'Current attendees cannot exceed max attendees';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const eventData = {
      ...formData,
      date: new Date(`${formData.date}T${formData.time}`).toISOString(),
    };
    
    onSave(eventData);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Format location for display
  const formatLocation = (location: any) => {
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && location !== null) {
      const { name, address, city, state, zip } = location;
      if (name) return name;
      if (address && city && state) return `${address}, ${city}, ${state} ${zip}`.trim();
      if (city && state) return `${city}, ${state}`;
      return city || 'Location TBD';
    }
    return 'Location TBD';
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {mode === 'create' && <FaPlus className="text-purple-600" />}
              {mode === 'edit' && <FaEdit className="text-blue-600" />}
              {mode === 'view' && <FaEye className="text-gray-600" />}
              <h2 className="text-2xl font-bold">
                {mode === 'create' && 'Create New Event'}
                {mode === 'edit' && 'Edit Event'}
                {mode === 'view' && 'Event Details'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              {mode === 'view' && (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaEdit size={14} />
                  <span>Edit</span>
                </motion.button>
              )}
              
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!isEditing ? (
              // View Mode
              <div className="flex flex-col lg:flex-row">
                {/* Event Details */}
                <div className="lg:w-1/2 p-6">
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                    <Image 
                      src={imagePreview || event?.imageUrl || '/placeholder.jpg'} 
                      alt={event?.title || 'Event'}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {event?.category}
                      </span>
                      <h3 className="text-white text-xl font-bold">{event?.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-3 text-purple-600" />
                      <span>{event?.date ? formatDate(event.date) : 'No date set'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-3 text-purple-600" />
                      <span>{event?.time || 'No time set'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-purple-600" />
                      <span>{formatLocation(event?.location)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaUsers className="mr-3 text-purple-600" />
                      <span>{event?.currentAttendees || 0} / {event?.maxAttendees || 0} attendees</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{event?.description}</p>
                  </div>

                  {event?.schedule && event.schedule.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Schedule</h4>
                      <div className="space-y-3">
                        {event.schedule.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              {index < event.schedule.length - 1 && (
                                <div className="w-0.5 h-8 bg-purple-200"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{item.time}</p>
                              <p className="text-gray-600">{item.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="lg:w-1/2 bg-gray-50 p-6">
                  <h4 className="text-lg font-semibold mb-4">Event Information</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Registration Status</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          (event?.maxAttendees || 0) - (event?.currentAttendees || 0) > 0 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {(event?.maxAttendees || 0) - (event?.currentAttendees || 0) > 0 ? 'Open' : 'Full'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ 
                            width: `${((event?.currentAttendees || 0) / (event?.maxAttendees || 1)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Pricing</h5>
                      <p className="text-2xl font-bold text-purple-600">
                        {event?.price ? `$${event.price.toFixed(2)}` : 'Free'}
                      </p>
                      {event?.priceDetails && (
                        <p className="text-sm text-gray-500 mt-1">{event.priceDetails}</p>
                      )}
                    </div>

                    {event?.organizer && (
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Organizer</h5>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative mr-3">
                            {event.organizer.avatar && (
                              <Image 
                                src={event.organizer.avatar} 
                                alt={event.organizer.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{event.organizer.name}</p>
                            <p className="text-gray-500 text-sm">{event.organizer.role}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Edit/Create Mode
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter event title"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Describe your event"
                      />
                      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.date ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time *
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.time ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL *
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleImageChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
                      
                      {imagePreview && (
                        <div className="mt-2">
                          <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-cover"
                              onError={() => setImagePreview('')}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Location & Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Location Details</h4>
                      
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="location.name"
                          value={formData.location.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Venue Name"
                        />
                        
                        <input
                          type="text"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Street Address"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="location.city"
                            value={formData.location.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="City"
                          />
                          
                          <input
                            type="text"
                            name="location.state"
                            value={formData.location.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="State"
                          />
                        </div>
                        
                        <input
                          type="text"
                          name="location.zip"
                          value={formData.location.zip}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Attendees *
                        </label>
                        <input
                          type="number"
                          name="maxAttendees"
                          value={formData.maxAttendees}
                          onChange={handleInputChange}
                          min="1"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.maxAttendees ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.maxAttendees && <p className="text-red-500 text-sm mt-1">{errors.maxAttendees}</p>}
                      </div>
                    </div>

                    {mode === 'edit' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Attendees
                        </label>
                        <input
                          type="number"
                          name="currentAttendees"
                          value={formData.currentAttendees}
                          onChange={handleInputChange}
                          min="0"
                          max={formData.maxAttendees}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.currentAttendees ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.currentAttendees && <p className="text-red-500 text-sm mt-1">{errors.currentAttendees}</p>}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Details (Optional)
                      </label>
                      <input
                        type="text"
                        name="priceDetails"
                        value={formData.priceDetails}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Includes lunch and materials"
                      />
                    </div>

                    {/* Schedule Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Event Schedule</h4>
                      
                      {/* Existing Schedule Items */}
                      {formData.schedule.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {formData.schedule.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <span className="font-medium">{item.time}</span> - {item.activity}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeScheduleItem(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <FaMinus size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add New Schedule Item */}
                      <div className="flex space-x-2">
                        <input
                          type="time"
                          value={newScheduleItem.time}
                          onChange={(e) => setNewScheduleItem(prev => ({ ...prev, time: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={newScheduleItem.activity}
                          onChange={(e) => setNewScheduleItem(prev => ({ ...prev, activity: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Activity description"
                        />
                        <button
                          type="button"
                          onClick={addScheduleItem}
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Organizer Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Organizer Information</h4>
                      
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="organizer.name"
                          value={formData.organizer.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Organizer Name"
                        />
                        
                        <input
                          type="text"
                          name="organizer.role"
                          value={formData.organizer.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Organizer Role"
                        />
                        
                        <input
                          type="url"
                          name="organizer.avatar"
                          value={formData.organizer.avatar}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Organizer Avatar URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              {isEditing && (
                <>
                  <motion.button
                    type="button"
                    onClick={() => {
                      if (mode === 'view') {
                        setIsEditing(false);
                      } else {
                        onClose();
                      }
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaSave size={14} />
                    <span>Save Changes</span>
                  </motion.button>
                </>
              )}
              
              {!isEditing && mode === 'view' && (
                <motion.button
                  onClick={onClose}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminEventModal;