'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, Upload, X, Play, Pause } from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminButton from '@/components/admin/ui/AdminButton';

interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundVideo?: string;
  overlayGradient: {
    from: string;
    to: string;
    opacity: number;
  };
  showScrollIndicator: boolean;
  height: string;
  isVisible: boolean;
}

export default function AboutHeroManagement() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'About Our Mission',
    subtitle: 'One Act of Kindness, Infinite Impact',
    backgroundImage: '/api/placeholder/1920/1080',
    backgroundVideo: '',
    overlayGradient: {
      from: 'purple-900/60',
      to: 'blue-900/60',
      opacity: 60
    },
    showScrollIndicator: true,
    height: '70vh',
    isVisible: true
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // API call to save hero data
      console.log('Saving hero data:', heroData);
      // await saveAboutHeroData(heroData);
    } catch (error) {
      console.error('Error saving hero data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setHeroData(prev => ({ ...prev, backgroundImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setVideoPreview(result);
        setHeroData(prev => ({ ...prev, backgroundVideo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const gradientOptions = [
    { name: 'Purple to Blue', from: 'purple-900/60', to: 'blue-900/60' },
    { name: 'Blue to Indigo', from: 'blue-900/60', to: 'indigo-900/60' },
    { name: 'Green to Blue', from: 'green-900/60', to: 'blue-900/60' },
    { name: 'Orange to Red', from: 'orange-900/60', to: 'red-900/60' },
    { name: 'Gray to Black', from: 'gray-900/60', to: 'black/60' }
  ];

  const heightOptions = [
    { name: 'Small (50vh)', value: '50vh' },
    { name: 'Medium (60vh)', value: '60vh' },
    { name: 'Large (70vh)', value: '70vh' },
    { name: 'Extra Large (80vh)', value: '80vh' },
    { name: 'Full Screen (100vh)', value: '100vh' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Hero Section</h1>
          <p className="text-gray-600 mt-1">Manage the main hero banner for About page</p>
        </div>
        <div className="flex gap-3">
          <AdminButton variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </AdminButton>
          <AdminButton onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <AdminCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="About Our Mission"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle (appears in glass box)
                </label>
                <input
                  type="text"
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="One Act of Kindness, Infinite Impact"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Background Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <AdminButton variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </AdminButton>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1920x1080px or higher
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Video (Optional)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="flex-1"
                    />
                    <AdminButton variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </AdminButton>
                  </div>
                  <input
                    type="url"
                    value={heroData.backgroundVideo}
                    onChange={(e) => setHeroData(prev => ({ ...prev, backgroundVideo: e.target.value }))}
                    placeholder="Or enter video URL..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Video will loop automatically. Image will show as fallback.
                </p>
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Styling & Layout</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Height
                </label>
                <select
                  value={heroData.height}
                  onChange={(e) => setHeroData(prev => ({ ...prev, height: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {heightOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overlay Gradient
                </label>
                <select
                  value={`${heroData.overlayGradient.from}_${heroData.overlayGradient.to}`}
                  onChange={(e) => {
                    const [from, to] = e.target.value.split('_');
                    setHeroData(prev => ({ 
                      ...prev, 
                      overlayGradient: { ...prev.overlayGradient, from, to }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {gradientOptions.map(option => (
                    <option key={`${option.from}_${option.to}`} value={`${option.from}_${option.to}`}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overlay Opacity: {heroData.overlayGradient.opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="10"
                  value={heroData.overlayGradient.opacity}
                  onChange={(e) => setHeroData(prev => ({ 
                    ...prev, 
                    overlayGradient: { ...prev.overlayGradient, opacity: parseInt(e.target.value) }
                  }))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Show Scroll Indicator</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroData.showScrollIndicator}
                    onChange={(e) => setHeroData(prev => ({ ...prev, showScrollIndicator: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Preview & Settings */}
        <div className="space-y-6">
          <AdminCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Section Visible</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={heroData.isVisible}
                  onChange={(e) => setHeroData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </AdminCard>

          <AdminCard className="p-6">
            <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '300px' }}>
              {/* Background */}
              {(imagePreview || heroData.backgroundImage) && (
                <img 
                  src={imagePreview || heroData.backgroundImage} 
                  alt="Hero background preview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              )}
              
              {/* Gradient Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r opacity-${heroData.overlayGradient.opacity}`}
                style={{
                  background: `linear-gradient(to right, 
                    rgba(147, 51, 234, ${heroData.overlayGradient.opacity/100}), 
                    rgba(29, 78, 216, ${heroData.overlayGradient.opacity/100}))`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-2xl font-bold text-white mb-3">
                  {heroData.title}
                </h1>
                
                <div className="backdrop-blur-sm bg-white/10 p-3 rounded-lg max-w-xs">
                  <p className="text-sm text-white font-light">
                    {heroData.subtitle}
                  </p>
                </div>
                
                {heroData.showScrollIndicator && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">{heroData.height}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gradient:</span>
                <span className="font-medium">{heroData.overlayGradient.opacity}% opacity</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Scroll Indicator:</span>
                <span className="font-medium">{heroData.showScrollIndicator ? 'Visible' : 'Hidden'}</span>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}