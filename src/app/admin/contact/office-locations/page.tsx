'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  Settings, 
  Palette, 
  Layout, 
  MousePointer,
  BarChart3,
  RefreshCw,
  Download,
  Upload,
  Monitor,
  Smartphone,
  Tablet,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

// Types
interface Highlight {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt?: string;
}

interface VisualSettings {
  theme: 'light' | 'dark' | 'auto';
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  animationSpeed: 'slow' | 'normal' | 'fast';
  showGrid: boolean;
  showPulse: boolean;
  showFloatingElements: boolean;
  enableInteractions: boolean;
}

interface AnalyticsData {
  totalViews: number;
  interactions: number;
  averageEngagementTime: string;
  mostClickedHighlight: string;
  conversionRate: number;
  thisWeek: number;
}

export default function AnimatedContactVisualAdmin() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [visualSettings, setVisualSettings] = useState<VisualSettings>({
    theme: 'light',
    backgroundColor: '#f8fafc',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    animationSpeed: 'normal',
    showGrid: true,
    showPulse: true,
    showFloatingElements: true,
    enableInteractions: true
  });
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    interactions: 0,
    averageEngagementTime: '0s',
    mostClickedHighlight: '',
    conversionRate: 0,
    thisWeek: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingHighlight, setIsEditingHighlight] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const mockHighlights: Highlight[] = [
          {
            id: 1,
            title: 'Our Mission',
            description: 'Creating positive change through community engagement and sustainable practices.',
            isActive: true,
            order: 1,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-20T14:20:00Z'
          },
          {
            id: 2,
            title: 'Our Impact',
            description: 'Transforming lives across India with innovative solutions and dedicated service.',
            isActive: true,
            order: 2,
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 3,
            title: 'Join Our Cause',
            description: 'Be part of a movement that is making a difference in communities nationwide.',
            isActive: true,
            order: 3,
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 4,
            title: 'Our Network',
            description: 'Connected across Mumbai, Delhi, Bangalore, Chennai, and beyond.',
            isActive: true,
            order: 4,
            createdAt: '2024-01-15T10:30:00Z'
          }
        ];

        const mockAnalytics: AnalyticsData = {
          totalViews: 12456,
          interactions: 3247,
          averageEngagementTime: '2m 34s',
          mostClickedHighlight: 'Our Mission',
          conversionRate: 26.1,
          thisWeek: 1834
        };

        setHighlights(mockHighlights);
        setAnalytics(mockAnalytics);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleEditHighlight = (highlight: Highlight) => {
    setIsEditingHighlight(highlight.id);
    setEditForm({
      title: highlight.title,
      description: highlight.description
    });
  };

  const handleSaveHighlight = () => {
    if (isEditingHighlight) {
      setHighlights(prev => prev.map(h => 
        h.id === isEditingHighlight 
          ? { ...h, title: editForm.title, description: editForm.description, updatedAt: new Date().toISOString() }
          : h
      ));
      setIsEditingHighlight(null);
      setEditForm({ title: '', description: '' });
    }
  };

  const handleToggleActive = (id: number) => {
    setHighlights(prev => prev.map(h => 
      h.id === id ? { ...h, isActive: !h.isActive } : h
    ));
  };

  const handleDeleteHighlight = (id: number) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const getDevicePreviewClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-72';
      default:
        return 'w-full h-96';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Visual Manager</h1>
          <p className="text-gray-600 mt-1">Manage animated contact visual content and settings</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Config
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            onClick={() => setShowSettingsPanel(true)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interactions</p>
              <p className="text-3xl font-bold text-green-600">{analytics.interactions.toLocaleString()}</p>
            </div>
            <MousePointer className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Engagement</p>
              <p className="text-3xl font-bold text-purple-600">{analytics.averageEngagementTime}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Clicked</p>
              <p className="text-lg font-bold text-orange-600 truncate">{analytics.mostClickedHighlight}</p>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-indigo-600">{analytics.conversionRate}%</p>
            </div>
            <Globe className="w-8 h-8 text-indigo-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-red-600">{analytics.thisWeek.toLocaleString()}</p>
            </div>
            <RefreshCw className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>
      </div>

      {/* Content Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Highlights Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Highlight Elements</h2>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Add Highlight
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border ${highlight.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
              >
                {isEditingHighlight === highlight.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Highlight title"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Highlight description"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveHighlight}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingHighlight(null)}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{highlight.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          highlight.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {highlight.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleActive(highlight.id)}
                          className={`p-1 rounded text-xs hover:bg-gray-200 ${
                            highlight.isActive ? 'text-orange-600' : 'text-green-600'
                          }`}
                          title={highlight.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleEditHighlight(highlight)}
                          className="p-1 rounded text-xs text-blue-600 hover:bg-gray-200"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteHighlight(highlight.id)}
                          className="p-1 rounded text-xs text-red-600 hover:bg-gray-200"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded text-xs text-gray-600 hover:bg-gray-200">
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{highlight.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Order: {highlight.order}</span>
                      <span>Updated: {new Date(highlight.updatedAt || highlight.createdAt).toLocaleDateString()}</span>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-2 rounded ${previewDevice === 'tablet' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-center">
              <div className={`${getDevicePreviewClass()} border-2 border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50`}>
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Simplified preview representation */}
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Connecting Communities
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Interactive preview</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                      {highlights.slice(0, 4).map((highlight) => (
                        <div key={highlight.id} className={`p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm ${
                          highlight.isActive ? '' : 'opacity-50'
                        }`}>
                          <div className="text-xs font-semibold text-blue-600 mb-1">{highlight.title}</div>
                          <div className="w-6 h-0.5 bg-blue-400 rounded-full mb-1"></div>
                          <div className="text-xs text-gray-600 line-clamp-2">{highlight.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Animated elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-20 animate-pulse"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1">
                <Copy className="w-3 h-3" />
                Copy Code
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Visual Settings</h2>
              <button
                onClick={() => setShowSettingsPanel(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme & Colors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={visualSettings.theme}
                      onChange={(e) => setVisualSettings({...visualSettings, theme: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={visualSettings.primaryColor}
                      onChange={(e) => setVisualSettings({...visualSettings, primaryColor: e.target.value})}
                      className="w-full h-10 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Animation Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Animation Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed</label>
                    <select
                      value={visualSettings.animationSpeed}
                      onChange={(e) => setVisualSettings({...visualSettings, animationSpeed: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="slow">Slow</option>
                      <option value="normal">Normal</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={visualSettings.showGrid}
                        onChange={(e) => setVisualSettings({...visualSettings, showGrid: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show Grid Pattern</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={visualSettings.showPulse}
                        onChange={(e) => setVisualSettings({...visualSettings, showPulse: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Pulse Effects</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={visualSettings.showFloatingElements}
                        onChange={(e) => setVisualSettings({...visualSettings, showFloatingElements: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Floating Elements</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={visualSettings.enableInteractions}
                        onChange={(e) => setVisualSettings({...visualSettings, enableInteractions: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Enable Interactions</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowSettingsPanel(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}