'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Eye,
  Upload,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Settings,
  Image as ImageIcon,
  Video,
  Type,
  Palette
} from 'lucide-react';
import Link from 'next/link';
import AdminCard from '@/components/admin/ui/AdminCard';

export default function HeroSectionManagement() {
  const [mounted, setMounted] = useState(false);
  const [heroData, setHeroData] = useState({
    title: 'Making a Difference, One Life at a Time',
    subtitle: 'Join our mission to create positive change in communities worldwide through compassion, dedication, and sustainable impact.',
    primaryButton: {
      text: 'Donate Now',
      link: '/donate'
    },
    secondaryButton: {
      text: 'Learn More',
      link: '/about'
    },
    backgroundVideo: {
      url: '/videos/hero-background.mp4',
      poster: '/images/hero-poster.jpg'
    },
    overlayOpacity: 60,
    textAlignment: 'center',
    isActive: true
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setHeroData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // API call to save hero section data
      console.log('Saving hero data:', heroData);
      setHasChanges(false);
      // Show success notification
    } catch (error) {
      console.error('Error saving hero data:', error);
      // Show error notification
    }
  };

  const handleReset = () => {
    // Reset to original data
    setHasChanges(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/home" 
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hero Section Management
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure the main banner section of your homepage
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </button>
          {hasChanges && (
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            You have unsaved changes. Don't forget to save your work!
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Content */}
          <AdminCard>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Type className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Text Content
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter main title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={heroData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter subtitle description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Alignment
                  </label>
                  <select
                    value={heroData.textAlignment}
                    onChange={(e) => handleInputChange('textAlignment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Call-to-Action Buttons */}
          <AdminCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Call-to-Action Buttons
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Primary Button</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={heroData.primaryButton.text}
                      onChange={(e) => handleNestedInputChange('primaryButton', 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={heroData.primaryButton.link}
                      onChange={(e) => handleNestedInputChange('primaryButton', 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Button link"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Secondary Button</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={heroData.secondaryButton.text}
                      onChange={(e) => handleNestedInputChange('secondaryButton', 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={heroData.secondaryButton.link}
                      onChange={(e) => handleNestedInputChange('secondaryButton', 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Button link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Background Media */}
          <AdminCard>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Video className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Background Media
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Video URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={heroData.backgroundVideo.url}
                      onChange={(e) => handleNestedInputChange('backgroundVideo', 'url', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Video URL"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Poster Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={heroData.backgroundVideo.poster}
                      onChange={(e) => handleNestedInputChange('backgroundVideo', 'poster', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Poster image URL"
                    />
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Overlay Opacity: {heroData.overlayOpacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heroData.overlayOpacity}
                    onChange={(e) => handleInputChange('overlayOpacity', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Section Status */}
          <AdminCard>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 mr-2 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Section Settings
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={heroData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Preview */}
          <AdminCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h3>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {heroData.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {heroData.subtitle.substring(0, 50)}...
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <div className="px-3 py-1 bg-blue-600 text-white text-xs rounded">
                      {heroData.primaryButton.text}
                    </div>
                    <div className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded">
                      {heroData.secondaryButton.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Quick Actions */}
          <AdminCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  View Analytics
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  A/B Test Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  SEO Settings
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}