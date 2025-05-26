'use client';   
import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  RotateCcw,
  Heart, 
  Book, 
  Stethoscope, 
  Users, 
  Sprout, 
  Globe, 
  Calendar, 
  Award,
  Target,
  Lightbulb,
  Zap
} from 'lucide-react';

const ImpactStatsAdmin = () => {
  const [activeSection, setActiveSection] = useState('stats');
  const [hasChanges, setHasChanges] = useState(false);

  // Available icons for selection
  const availableIcons = {
    Heart, Book, Stethoscope, Users, Sprout, Globe, Calendar, Award, Target, Lightbulb, Zap
  };

  const [headerData, setHeaderData] = useState({
    title: "Our Global Impact",
    subtitle: "Transforming lives and communities through compassion and action"
  });

  const [stats, setStats] = useState([
    {
      id: 1,
      icon: "Heart",
      value: 1250000,
      label: "meals served",
      color: "text-red-500",
      description: "Nutritious meals delivered to communities facing food insecurity across 27 countries.",
      delay: 0.1
    },
    {
      id: 2,
      icon: "Book",
      value: 75000,
      label: "children educated",
      color: "text-blue-500",
      description: "Quality education provided through our scholarship programs and 120 newly built schools.",
      delay: 0.2
    },
    {
      id: 3,
      icon: "Stethoscope",
      value: 500000,
      label: "medical consultations",
      color: "text-green-500",
      description: "Free healthcare services delivered by our volunteer medical professionals in underserved areas.",
      delay: 0.3
    },
    {
      id: 4,
      icon: "Users",
      value: 1000,
      label: "volunteers worldwide",
      color: "text-purple-500",
      description: "Dedicated individuals donating their time and expertise across 42 countries.",
      delay: 0.4
    },
    {
      id: 5,
      icon: "Sprout",
      value: 250000,
      label: "trees planted",
      color: "text-emerald-500",
      description: "Reforestation efforts helping combat climate change and restore natural habitats.",
      delay: 0.5
    },
    {
      id: 6,
      icon: "Globe",
      value: 50,
      label: "countries reached",
      color: "text-indigo-500",
      description: "Global impact spanning across 6 continents with localized programs for maximum effectiveness.",
      delay: 0.6
    },
    {
      id: 7,
      icon: "Calendar",
      value: 15,
      label: "years of service",
      color: "text-amber-500",
      description: "Consistent dedication to making the world better since our founding in 2010.",
      delay: 0.7
    },
    {
      id: 8,
      icon: "Award",
      value: 12,
      label: "humanitarian awards",
      color: "text-rose-500",
      description: "Recognition for excellence in humanitarian work and sustainable development initiatives.",
      delay: 0.8
    }
  ]);

  const [storyContent, setStoryContent] = useState({
    title: "Our Journey",
    paragraphs: [
      "Founded in 2010 by a small group of passionate individuals, our organization began with a simple mission: to make tangible differences in communities facing the greatest challenges.",
      "What started as local weekend meal deliveries has grown into a global movement spanning 50 countries and impacting millions of lives through sustainable development programs.",
      "Today, we work with governments, local leaders, and other NGOs to implement data-driven solutions that address the root causes of poverty, inequality, and environmental degradation."
    ]
  });

  const [goalsContent, setGoalsContent] = useState({
    title: "Future Goals",
    goals: [
      {
        id: 1,
        text: "Expand educational programs to reach 200,000 children by 2027",
        color: "bg-blue-500"
      },
      {
        id: 2,
        text: "Plant 1 million trees as part of our climate action initiative",
        color: "bg-green-500"
      },
      {
        id: 3,
        text: "Establish 50 new community health centers in underserved regions",
        color: "bg-purple-500"
      },
      {
        id: 4,
        text: "Increase volunteer base to 2,500 active members worldwide",
        color: "bg-red-500"
      },
      {
        id: 5,
        text: "Develop innovative water purification systems for 100 communities",
        color: "bg-amber-500"
      }
    ]
  });

  const [footerQuote, setFooterQuote] = useState(
    "Together, we're not just changing statistics – we're changing lives."
  );

  const colorOptions = [
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-purple-500',
    'text-emerald-500', 'text-indigo-500', 'text-amber-500', 'text-rose-500',
    'text-orange-500', 'text-cyan-500', 'text-pink-500', 'text-teal-500'
  ];

  const bgColorOptions = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500', 'bg-rose-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500'
  ];

  const addNewStat = () => {
    const newStat = {
      id: Math.max(...stats.map(s => s.id)) + 1,
      icon: "Heart",
      value: 0,
      label: "new metric",
      color: "text-blue-500",
      description: "Add description for this statistic...",
      delay: stats.length * 0.1 + 0.1
    };
    setStats([...stats, newStat]);
    setHasChanges(true);
  };

  const updateStat = (id, field, value) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
    setHasChanges(true);
  };

  const deleteStat = (id) => {
    setStats(stats.filter(stat => stat.id !== id));
    setHasChanges(true);
  };

  const addNewGoal = () => {
    const newGoal = {
      id: Math.max(...goalsContent.goals.map(g => g.id)) + 1,
      text: "New goal description...",
      color: "bg-blue-500"
    };
    setGoalsContent({
      ...goalsContent,
      goals: [...goalsContent.goals, newGoal]
    });
    setHasChanges(true);
  };

  const updateGoal = (id, field, value) => {
    setGoalsContent({
      ...goalsContent,
      goals: goalsContent.goals.map(goal => 
        goal.id === id ? { ...goal, [field]: value } : goal
      )
    });
    setHasChanges(true);
  };

  const deleteGoal = (id) => {
    setGoalsContent({
      ...goalsContent,
      goals: goalsContent.goals.filter(goal => goal.id !== id)
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving data:', {
      headerData,
      stats,
      storyContent,
      goalsContent,
      footerQuote
    });
    setHasChanges(false);
    alert('Changes saved successfully!');
  };

  const renderIcon = (iconName) => {
    const IconComponent = availableIcons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Heart className="w-5 h-5" />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impact Stats Management</h1>
          <p className="text-gray-600 mt-2">Manage your impact statistics and content</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              hasChanges 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
        {[
          { id: 'header', label: 'Header' },
          { id: 'stats', label: 'Statistics' },
          { id: 'story', label: 'Story' },
          { id: 'goals', label: 'Goals' },
          { id: 'footer', label: 'Footer' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === tab.id
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Header Section */}
      {activeSection === 'header' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Header Content</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={headerData.title}
                onChange={(e) => {
                  setHeaderData({ ...headerData, title: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter main title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={headerData.subtitle}
                onChange={(e) => {
                  setHeaderData({ ...headerData, subtitle: e.target.value });
                  setHasChanges(true);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subtitle..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      {activeSection === 'stats' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Statistics Management</h2>
            <button
              onClick={addNewStat}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Statistic
            </button>
          </div>

          <div className="space-y-6">
            {stats.map((stat) => (
              <div key={stat.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${stat.color} p-2 bg-gray-50 rounded-lg`}>
                      {renderIcon(stat.icon)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Statistic #{stat.id}</h3>
                      <p className="text-sm text-gray-500">Delay: {stat.delay}s</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteStat(stat.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={stat.icon}
                      onChange={(e) => updateStat(stat.id, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {Object.keys(availableIcons).map(iconName => (
                        <option key={iconName} value={iconName}>{iconName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(stat.id, 'value', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <select
                      value={stat.color}
                      onChange={(e) => updateStat(stat.id, 'color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {colorOptions.map(color => (
                        <option key={color} value={color}>
                          {color.replace('text-', '').charAt(0).toUpperCase() + color.replace('text-', '').slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={stat.description}
                    onChange={(e) => updateStat(stat.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Story Section */}
      {activeSection === 'story' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Story Content</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
              <input
                type="text"
                value={storyContent.title}
                onChange={(e) => {
                  setStoryContent({ ...storyContent, title: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {storyContent.paragraphs.map((paragraph, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paragraph {index + 1}
                </label>
                <textarea
                  value={paragraph}
                  onChange={(e) => {
                    const newParagraphs = [...storyContent.paragraphs];
                    newParagraphs[index] = e.target.value;
                    setStoryContent({ ...storyContent, paragraphs: newParagraphs });
                    setHasChanges(true);
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Section */}
      {activeSection === 'goals' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Future Goals</h2>
            <button
              onClick={addNewGoal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Goals Section Title</label>
            <input
              type="text"
              value={goalsContent.title}
              onChange={(e) => {
                setGoalsContent({ ...goalsContent, title: e.target.value });
                setHasChanges(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-4">
            {goalsContent.goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">Goal #{goal.id}</h3>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goal Text</label>
                    <textarea
                      value={goal.text}
                      onChange={(e) => updateGoal(goal.id, 'text', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <select
                      value={goal.color}
                      onChange={(e) => updateGoal(goal.id, 'color', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {bgColorOptions.map(color => (
                        <option key={color} value={color}>
                          {color.replace('bg-', '').charAt(0).toUpperCase() + color.replace('bg-', '').slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Section */}
      {activeSection === 'footer' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Footer Quote</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Inspirational Quote</label>
            <textarea
              value={footerQuote}
              onChange={(e) => {
                setFooterQuote(e.target.value);
                setHasChanges(true);
              }}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter an inspirational quote..."
            />
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {headerData.title}
            </h2>
            <p className="text-gray-600 mt-2">{headerData.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {stats.slice(0, 4).map((stat) => (
              <div key={stat.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-bold text-xl">
                    {stat.value.toLocaleString()} {stat.label}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{stat.description.slice(0, 60)}...</p>
                </div>
                <div className={`${stat.color} p-2 bg-white rounded-lg`}>
                  {renderIcon(stat.icon)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 italic">"{footerQuote}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStatsAdmin;