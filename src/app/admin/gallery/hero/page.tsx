'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Eye,
  Save,
  ArrowLeft,
  ImageIcon,
  VideoIcon,
  Settings,
  Type,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface HeroSettings {
  backgroundType: 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  overlayOpacity: number;
  overlayColor: string;
  titleColor: string;
  subtitleColor: string;
  titleSize: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  subtitleSize: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  animationDelay: {
    title: number;
    subtitle: number;
  };
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Functions
const galleryHeroAPI = {
  // Fetch gallery hero settings
  getSettings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery-hero`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery hero settings:', error);
      throw error;
    }
  },

  // Save gallery hero settings
  saveSettings: async (settings: HeroSettings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery-hero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving gallery hero settings:', error);
      throw error;
    }
  },

  // Upload media
  uploadMedia: async (file: File, mediaType: string) => {
    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('mediaType', mediaType);

      const response = await fetch(`${API_BASE_URL}/gallery-hero/upload-media`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }
};

export default function AdminGalleryHero() {
  const [settings, setSettings] = useState<HeroSettings>({
    backgroundType: 'video',
    videoUrl: '/videos/gallery-hero.mp4',
    imageUrl: '/images/gallery-hero.jpg',
    title: 'Our Journey in Pictures',
    subtitle: 'Witness the impact of your contributions through our visual storytelling',
    overlayOpacity: 0.5,
    overlayColor: '#000000',
    titleColor: '#ffffff',
    subtitleColor: '#ffffff',
    titleSize: {
      mobile: 'text-4xl',
      tablet: 'text-6xl',
      desktop: 'text-7xl'
    },
    subtitleSize: {
      mobile: 'text-xl',
      tablet: 'text-2xl',
      desktop: 'text-2xl'
    },
    animationDelay: {
      title: 0.5,
      subtitle: 0.8
    },
    autoplay: true,
    loop: true,
    muted: true
  });

  const [activeTab, setActiveTab] = useState('content');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await galleryHeroAPI.getSettings();
        if (response.success) {
          setSettings(response.data);
          console.log('✅ Gallery hero settings loaded:', response.data);
        }
      } catch (error) {
        console.error('❌ Error loading settings:', error);
        // Keep default settings if API fails
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await galleryHeroAPI.saveSettings(settings);
      if (response.success) {
        console.log('✅ Settings saved successfully');
        alert('Settings saved successfully!');
      } else {
        throw new Error(response.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (type: 'video' | 'image', file: File) => {
    try {
      console.log(`📤 Uploading ${type}:`, file.name);
      
      // Show upload progress (optional)
      const tempUrl = URL.createObjectURL(file);
      if (type === 'video') {
        setSettings(prev => ({ ...prev, videoUrl: tempUrl }));
      } else {
        setSettings(prev => ({ ...prev, imageUrl: tempUrl }));
      }

      // Upload to Cloudinary via backend
      const response = await galleryHeroAPI.uploadMedia(file, type);
      
      if (response.success) {
        console.log(`✅ ${type} uploaded successfully:`, response.url);
        
        // Update settings with Cloudinary URL
        if (type === 'video') {
          setSettings(prev => ({ ...prev, videoUrl: response.url }));
        } else {
          setSettings(prev => ({ ...prev, imageUrl: response.url }));
        }
        
        // Clean up temp URL
        URL.revokeObjectURL(tempUrl);
        
        alert(`${type} uploaded successfully!`);
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      console.error(`❌ Error uploading ${type}:`, error);
      alert(`Error uploading ${type}. Please try again.`);
    }
  };

  const handleVideoControl = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getPreviewClasses = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-[500px]';
    }
  };

  const getTitleClasses = () => {
    return `${settings.titleSize[previewDevice as keyof typeof settings.titleSize]} font-bold mb-6`;
  };

  const getSubtitleClasses = () => {
    return `${settings.subtitleSize[previewDevice as keyof typeof settings.subtitleSize]} max-w-3xl`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link
            href="/admin/gallery"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
            <p className="text-gray-600">Customize your gallery hero section</p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { id: 'content', label: 'Content', icon: Type },
                  { id: 'media', label: 'Media', icon: VideoIcon },
                  { id: 'style', label: 'Style', icon: Palette },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 ${
                      activeTab === id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hero Title
                    </label>
                    <textarea
                      value={settings.title}
                      onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <textarea
                      value={settings.subtitle}
                      onChange={(e) => setSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Background Type
                    </label>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSettings(prev => ({ ...prev, backgroundType: 'video' }))}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                          settings.backgroundType === 'video'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <VideoIcon className="w-4 h-4 mr-2" />
                        Video
                      </button>
                      <button
                        onClick={() => setSettings(prev => ({ ...prev, backgroundType: 'image' }))}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                          settings.backgroundType === 'image'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Image
                      </button>
                    </div>
                  </div>

                  {settings.backgroundType === 'video' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Upload
                      </label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('video-upload')?.click()}
                      >
                        <VideoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop video here or click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">Supports MP4, MOV, AVI, MKV (Max 50MB)</p>
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('video', file);
                          }}
                        />
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="autoplay"
                            checked={settings.autoplay}
                            onChange={(e) => setSettings(prev => ({ ...prev, autoplay: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="autoplay" className="ml-2 text-sm text-gray-700">
                            Autoplay
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="loop"
                            checked={settings.loop}
                            onChange={(e) => setSettings(prev => ({ ...prev, loop: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="loop" className="ml-2 text-sm text-gray-700">
                            Loop
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="muted"
                            checked={settings.muted}
                            onChange={(e) => setSettings(prev => ({ ...prev, muted: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="muted" className="ml-2 text-sm text-gray-700">
                            Muted
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {settings.backgroundType === 'image' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Image
                      </label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop image here or click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WebP (Max 50MB)</p>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('image', file);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Style Tab */}
              {activeTab === 'style' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overlay Opacity
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.overlayOpacity}
                      onChange={(e) => setSettings(prev => ({ ...prev, overlayOpacity: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500 mt-1">{Math.round(settings.overlayOpacity * 100)}%</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overlay Color
                    </label>
                    <input
                      type="color"
                      value={settings.overlayColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, overlayColor: e.target.value }))}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title Color
                    </label>
                    <input
                      type="color"
                      value={settings.titleColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, titleColor: e.target.value }))}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle Color
                    </label>
                    <input
                      type="color"
                      value={settings.subtitleColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, subtitleColor: e.target.value }))}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title Animation Delay (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.animationDelay.title}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        animationDelay: { ...prev.animationDelay, title: parseFloat(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle Animation Delay (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.animationDelay.subtitle}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        animationDelay: { ...prev.animationDelay, subtitle: parseFloat(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
              
              <div className="flex items-center space-x-3">
                {/* Device Toggle */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {[
                    { id: 'desktop', icon: Monitor },
                    { id: 'tablet', icon: Tablet },
                    { id: 'mobile', icon: Smartphone }
                  ].map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPreviewDevice(id)}
                      className={`p-2 rounded ${
                        previewDevice === id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Video Controls */}
                {settings.backgroundType === 'video' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleVideoControl}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Container */}
            <div className="flex justify-center">
              <div className={`${getPreviewClasses()} relative overflow-hidden rounded-lg border border-gray-200`}>
                {/* Background */}
                {settings.backgroundType === 'video' ? (
                  <video
                    ref={videoRef}
                    src={settings.videoUrl}
                    autoPlay={settings.autoplay}
                    loop={settings.loop}
                    muted={settings.muted}
                    className="absolute w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={settings.imageUrl}
                    alt="Hero background"
                    className="absolute w-full h-full object-cover"
                  />
                )}

                {/* Overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    backgroundColor: settings.overlayColor,
                    opacity: settings.overlayOpacity
                  }}
                />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
                  <h1
                    className={getTitleClasses()}
                    style={{ color: settings.titleColor }}
                  >
                    {settings.title}
                  </h1>
                  <p
                    className={getSubtitleClasses()}
                    style={{ color: settings.subtitleColor }}
                  >
                    {settings.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}