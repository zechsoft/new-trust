'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  Heart,
  Globe,
  TrendingUp,
  Award,
  Plus,
  Edit,
  Eye,
  Save,
  RotateCcw,
  Image as ImageIcon,
  BarChart3
} from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';

export default function ImpactSectionManagement() {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [impactData, setImpactData] = useState({
    title: "Our Global Impact",
    subtitle: "Making a difference in communities worldwide through dedicated action and support",
    description: "Every donation, every volunteer hour, and every act of kindness creates a ripple effect that transforms lives and communities. Here's how we're making a lasting impact together.",
    backgroundImage: "/images/impact/impact-bg.jpg",
    stats: [
      {
        id: 1,
        icon: "Users",
        number: "50,000+",
        label: "Lives Transformed",
        description: "People whose lives have been positively impacted by our programs",
        color: "blue"
      },
      {
        id: 2,
        icon: "Globe",
        number: "25",
        label: "Countries Reached",
        description: "Nations where our humanitarian efforts have made a difference",
        color: "green"
      },
      {
        id: 3,
        icon: "Heart",
        number: "$2.5M",
        label: "Funds Raised",
        description: "Total amount raised for various charitable causes and initiatives",
        color: "red"
      },
      {
        id: 4,
        icon: "Award",
        number: "150+",
        label: "Projects Completed",
        description: "Successfully implemented projects across different sectors",
        color: "purple"
      }
    ],
    achievements: [
      {
        id: 1,
        title: "Clean Water Access",
        description: "Provided clean water access to 15,000 people in rural communities",
        image: "/images/impact/water-project.jpg",
        category: "Infrastructure",
        year: "2024"
      },
      {
        id: 2,
        title: "Education Initiative",
        description: "Built 12 schools and educated over 3,000 children",
        image: "/images/impact/education-project.jpg",
        category: "Education",
        year: "2023-2024"
      },
      {
        id: 3,
        title: "Healthcare Program",
        description: "Delivered medical aid to 8,500 patients through mobile clinics",
        image: "/images/impact/healthcare-project.jpg",
        category: "Healthcare",
        year: "2024"
      }
    ]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setImpactData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleStatChange = (statId: number, field: string, value: string) => {
    setImpactData(prev => ({
      ...prev,
      stats: prev.stats.map(stat => 
        stat.id === statId ? { ...stat, [field]: value } : stat
      )
    }));
    setHasChanges(true);
  };

  const handleAchievementChange = (achievementId: number, field: string, value: string) => {
    setImpactData(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => 
        achievement.id === achievementId ? { ...achievement, [field]: value } : achievement
      )
    }));
    setHasChanges(true);
  };

  const addNewStat = () => {
    const newStat = {
      id: Math.max(...impactData.stats.map(s => s.id)) + 1,
      icon: "Target",
      number: "0",
      label: "New Metric",
      description: "Description for new metric",
      color: "blue"
    };
    setImpactData(prev => ({
      ...prev,
      stats: [...prev.stats, newStat]
    }));
    setHasChanges(true);
  };

  const addNewAchievement = () => {
    const newAchievement = {
      id: Math.max(...impactData.achievements.map(a => a.id)) + 1,
      title: "New Achievement",
      description: "Description of the new achievement",
      image: "/images/impact/placeholder.jpg",
      category: "General",
      year: "2024"
    };
    setImpactData(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would save the data to your backend
    console.log('Saving impact data:', impactData);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleReset = () => {
    // Reset to original data or fetch from backend
    setHasChanges(false);
    setIsEditing(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Impact Section Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your impact statistics, achievements, and success stories
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Eye className="w-4 h-4 mr-2" />
            Preview Section
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'Stop Editing' : 'Edit Section'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{impactData.stats.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Impact Stats</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{impactData.achievements.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Achievements</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.8</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Impact Score</div>
          </div>
        </AdminCard>
      </div>

      {/* Save/Reset Bar (shown when editing) */}
      {isEditing && hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                You have unsaved changes
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Settings */}
        <div className="lg:col-span-1">
          <AdminCard title="Section Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={impactData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={impactData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={impactData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Image
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={impactData.backgroundImage}
                    onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  />
                  {isEditing && (
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Impact Statistics */}
        <div className="lg:col-span-2">
          <AdminCard 
            title="Impact Statistics"
            action={
              isEditing ? (
                <button
                  onClick={addNewStat}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Stat
                </button>
              ) : null
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {impactData.stats.map((stat) => (
                <div key={stat.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Number</label>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => handleStatChange(stat.id, 'number', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Color</label>
                        <select
                          value={stat.color}
                          onChange={(e) => handleStatChange(stat.id, 'color', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                        >
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="red">Red</option>
                          <option value="purple">Purple</option>
                          <option value="yellow">Yellow</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                      <textarea
                        value={stat.description}
                        onChange={(e) => handleStatChange(stat.id, 'description', e.target.value)}
                        disabled={!isEditing}
                        rows={2}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Achievements Section */}
      <AdminCard 
        title="Key Achievements"
        action={
          isEditing ? (
            <button
              onClick={addNewAchievement}
              className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Achievement
            </button>
          ) : null
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactData.achievements.map((achievement) => (
            <div key={achievement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(achievement.id, 'title', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(achievement.id, 'description', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                    <input
                      type="text"
                      value={achievement.category}
                      onChange={(e) => handleAchievementChange(achievement.id, 'category', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                    <input
                      type="text"
                      value={achievement.year}
                      onChange={(e) => handleAchievementChange(achievement.id, 'year', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}