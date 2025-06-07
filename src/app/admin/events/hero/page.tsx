'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

// Icons
import { 
  Save, 
  Edit2, 
  Eye, 
  Upload, 
  Video, 
  Type, 
  Palette, 
  Clock, 
  Settings,
  Monitor,
  Smartphone,
  Tablet,
   Download,
  RefreshCw,
  Calendar,
  MapPin,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';

// Mock API functions (replace with actual API calls)
const fetchHeroBannerConfig = async () => {
  // This would be replaced with actual API call
  return {
    id: 'hero-banner-1',
    title: 'Join Our Events',
    highlightText: 'Events',
    typewriterSequences: [
      'Be part of something bigger.',
      'Join our mission to create change.',
      'Transform lives together.'
    ],
    videoUrl: '/videos/events-hero.mp4',
    videoSettings: {
      autoplay: true,
      muted: true,
      loop: true
    },
    gradientOverlay: {
      from: 'purple-900/80',
      to: 'indigo-900/80'
    },
    nextEvent: {
      name: 'Charity Marathon',
      date: '2024-02-15T10:00:00Z',
      location: 'Central Park, NYC'
    },
    buttons: {
      primary: {
        text: 'Browse Events',
        link: '#events',
        color: 'purple-600'
      },
      secondary: {
        text: 'Host an Event',
        link: '/host-event',
        style: 'outline'
      }
    },
    parallaxIntensity: 0.3,
    animationTimings: {
      titleDelay: 0,
      typewriterDelay: 0.2,
      countdownDelay: 0.4,
      buttonsDelay: 0.6
    }
  };
};

const updateHeroBannerConfig = async (config) => {
  // This would be replaced with actual API call
  console.log('Updating hero banner config:', config);
  return config;
};

export default function AdminHeroBannerPage() {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const previewRef = useRef(null);
  const videoRef = useRef(null);

  // Load initial configuration
  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      try {
        const data = await fetchHeroBannerConfig();
        setConfig(data);
      } catch (error) {
        console.error('Error loading hero banner config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Update configuration
  const updateConfig = (path, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
    setHasUnsavedChanges(true);
  };

  // Save configuration
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHeroBannerConfig(config);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  // Add new typewriter sequence
  const addTypewriterSequence = () => {
    const newSequences = [...config.typewriterSequences, 'New message...'];
    updateConfig('typewriterSequences', newSequences);
  };

  // Remove typewriter sequence
  const removeTypewriterSequence = (index) => {
    const newSequences = config.typewriterSequences.filter((_, i) => i !== index);
    updateConfig('typewriterSequences', newSequences);
  };

  // Update typewriter sequence
  const updateTypewriterSequence = (index, value) => {
    const newSequences = [...config.typewriterSequences];
    newSequences[index] = value;
    updateConfig('typewriterSequences', newSequences);
  };

  // Calculate countdown
  const calculateCountdown = () => {
    if (!config?.nextEvent?.date) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const now = new Date();
    const eventDate = new Date(config.nextEvent.date);
    const diff = eventDate - now;
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [config?.nextEvent?.date]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hero banner configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load configuration</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'content', label: 'Content', icon: Type },
    { id: 'media', label: 'Media', icon: Video },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'countdown', label: 'Countdown', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hero Banner Management</h1>
              <p className="text-gray-600 mt-1">Configure the main event landing page hero section</p>
            </div>
            <div className="flex items-center space-x-4">
              {hasUnsavedChanges && (
                <span className="text-amber-600 text-sm">Unsaved changes</span>
              )}
              <motion.button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-md disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
              >
                {isSaving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.title}
                        onChange={(e) => updateConfig('title', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highlighted Text
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.highlightText}
                        onChange={(e) => updateConfig('highlightText', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Typewriter Messages
                      </label>
                      <div className="space-y-3">
                        {config.typewriterSequences.map((sequence, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              value={sequence}
                              onChange={(e) => updateTypewriterSequence(index, e.target.value)}
                            />
                            <button
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                              onClick={() => removeTypewriterSequence(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200"
                          onClick={addTypewriterSequence}
                        >
                          + Add Message
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Button Text
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={config.buttons.primary.text}
                          onChange={(e) => updateConfig('buttons.primary.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Button Link
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={config.buttons.primary.link}
                          onChange={(e) => updateConfig('buttons.primary.link', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Button Text
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={config.buttons.secondary.text}
                          onChange={(e) => updateConfig('buttons.secondary.text', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Button Link
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={config.buttons.secondary.link}
                          onChange={(e) => updateConfig('buttons.secondary.link', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Media Tab */}
                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Video URL
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.videoUrl}
                        onChange={(e) => updateConfig('videoUrl', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          checked={config.videoSettings.autoplay}
                          onChange={(e) => updateConfig('videoSettings.autoplay', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Autoplay</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          checked={config.videoSettings.muted}
                          onChange={(e) => updateConfig('videoSettings.muted', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Muted</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          checked={config.videoSettings.loop}
                          onChange={(e) => updateConfig('videoSettings.loop', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-700">Loop</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Preview
                      </label>
                      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          className="w-full h-48 object-cover"
                          src={config.videoUrl}
                          muted={config.videoSettings.muted}
                          loop={config.videoSettings.loop}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm"
                            onClick={() => {
                              if (videoRef.current) {
                                if (isPreviewPlaying) {
                                  videoRef.current.pause();
                                } else {
                                  videoRef.current.play();
                                }
                                setIsPreviewPlaying(!isPreviewPlaying);
                              }
                            }}
                          >
                            {isPreviewPlaying ? <Pause size={24} /> : <Play size={24} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Design Tab */}
                {activeTab === 'design' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gradient Overlay
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">From</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.gradientOverlay.from}
                            onChange={(e) => updateConfig('gradientOverlay.from', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">To</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.gradientOverlay.to}
                            onChange={(e) => updateConfig('gradientOverlay.to', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parallax Intensity: {config.parallaxIntensity}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full"
                        value={config.parallaxIntensity}
                        onChange={(e) => updateConfig('parallaxIntensity', parseFloat(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Animation Timings (seconds)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Title Delay</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.animationTimings.titleDelay}
                            onChange={(e) => updateConfig('animationTimings.titleDelay', parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Typewriter Delay</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.animationTimings.typewriterDelay}
                            onChange={(e) => updateConfig('animationTimings.typewriterDelay', parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Countdown Delay</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.animationTimings.countdownDelay}
                            onChange={(e) => updateConfig('animationTimings.countdownDelay', parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Buttons Delay</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={config.animationTimings.buttonsDelay}
                            onChange={(e) => updateConfig('animationTimings.buttonsDelay', parseFloat(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Countdown Tab */}
                {activeTab === 'countdown' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.nextEvent.name}
                        onChange={(e) => updateConfig('nextEvent.name', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.nextEvent.date ? new Date(config.nextEvent.date).toISOString().slice(0, 16) : ''}
                        onChange={(e) => updateConfig('nextEvent.date', new Date(e.target.value).toISOString())}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={config.nextEvent.location}
                        onChange={(e) => updateConfig('nextEvent.location', e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Live Countdown Preview</h4>
                      <div className="flex justify-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-purple-600">{countdown.days}</div>
                          <div className="text-xs text-gray-600">Days</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-purple-600">{countdown.hours}</div>
                          <div className="text-xs text-gray-600">Hours</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-purple-600">{countdown.minutes}</div>
                          <div className="text-xs text-gray-600">Minutes</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold text-purple-600">{countdown.seconds}</div>
                          <div className="text-xs text-gray-600">Seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Settings</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">Enable parallax effects</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">Enable animations</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">Auto-hide scroll indicator</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Accessibility</h3>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">Reduce motion for users with motion sensitivity</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">High contrast mode support</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border sticky top-8">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Live Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`p-2 rounded-lg ${previewMode === 'desktop' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor size={16} />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${previewMode === 'tablet' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet size={16} />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-purple-100 text-purple-600' : 'text-gray-400'}`}
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div 
                  ref={previewRef}
                  className={`relative bg-gray-900 rounded-lg overflow-hidden ${
                    previewMode === 'desktop' ? 'h-64' : 
                    previewMode === 'tablet' ? 'h-48 max-w-xs mx-auto' : 
                    'h-56 max-w-xs mx-auto'
                  }`}
                >
                  {/* Mini Hero Preview */}
                  <div className="absolute inset-0">
                    {/* Background with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-${config.gradientOverlay.from} to-${config.gradientOverlay.to}`}></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <h1 className={`font-bold text-center mb-2 ${
                        previewMode === 'desktop' ? 'text-lg' : 'text-sm'
                      }`}>
                        {config.title.replace(config.highlightText, '')}
                        <span className="text-purple-300">{config.highlightText}</span>
                      </h1>
                      
                      <div className={`text-center mb-3 ${
                        previewMode === 'desktop' ? 'text-sm' : 'text-xs'
                      }`}>
                        {config.typewriterSequences[0]}
                      </div>
                      
                      {/* Mini Countdown */}
                      <div className="bg-white/10 backdrop-blur-sm rounded p-2 mb-3">
                        <p className="text-xs text-purple-200 mb-1">{config.nextEvent.name}</p>
                        <div className="flex gap-2">
                          <div className="text-center">
                            <div className="text-xs font-bold">{countdown.days}</div>
                            <div className="text-xs text-purple-200">D</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold">{countdown.hours}</div>
                            <div className="text-xs text-purple-200">H</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold">{countdown.minutes}</div>
                            <div className="text-xs text-purple-200">M</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold">{countdown.seconds}</div>
                            <div className="text-xs text-purple-200">S</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mini Buttons */}
                      <div className={`flex gap-2 ${previewMode === 'mobile' ? 'flex-col' : 'flex-row'}`}>
                        <div className="bg-purple-600 px-3 py-1 rounded-full text-xs">
                          {config.buttons.primary.text}
                        </div>
                        <div className="border border-white px-3 py-1 rounded-full text-xs">
                          {config.buttons.secondary.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Preview Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Video:</span>
                    <span className="text-gray-900">{config.videoUrl ? '✓ Loaded' : '✗ Missing'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Autoplay:</span>
                    <span className="text-gray-900">{config.videoSettings.autoplay ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Messages:</span>
                    <span className="text-gray-900">{config.typewriterSequences.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Event Date:</span>
                    <span className="text-gray-900">{config.nextEvent.date ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border p-4">
              <h3 className="font-medium text-gray-900 mb-4">Configuration Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Content Complete</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(config.title && config.highlightText && config.typewriterSequences.length > 0) ? 100 : 60}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {(config.title && config.highlightText && config.typewriterSequences.length > 0) ? 100 : 60}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Media Setup</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${config.videoUrl ? 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {config.videoUrl ? 100 : 0}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Event Info</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(config.nextEvent.name && config.nextEvent.date && config.nextEvent.location) ? 100 : 33}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {(config.nextEvent.name && config.nextEvent.date && config.nextEvent.location) ? 100 : 33}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Eye size={16} />
                <span>Preview in New Tab</span>
              </button>
              
              <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Upload size={16} />
                <span>Export Config</span>
              </button>
              
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Import Config</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Configuration</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset all settings to default? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                Reset
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}