'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Globe,
  ExternalLink,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  MousePointer,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Types
interface SocialLink {
  id: string;
  platform: string;
  name: string;
  url: string;
  isActive: boolean;
  icon: string;
  color: string;
  followers?: number;
  clicks?: number;
  lastUpdated: string;
  description?: string;
}

interface SocialStats {
  totalLinks: number;
  activeLinks: number;
  totalFollowers: number;
  totalClicks: number;
  topPerformer: string;
  engagementRate: string;
}

export default function AdminSocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [stats, setStats] = useState<SocialStats>({
    totalLinks: 0,
    activeLinks: 0,
    totalFollowers: 0,
    totalClicks: 0,
    topPerformer: '',
    engagementRate: '0%'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    name: '',
    url: '',
    description: '',
    isActive: true
  });

  // Available social platforms
  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-500' },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-400' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
    { name: 'Website', icon: Globe, color: 'bg-gray-600' }
  ];

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchSocialData = async () => {
      setTimeout(() => {
        const mockLinks: SocialLink[] = [
          {
            id: '1',
            platform: 'Facebook',
            name: 'Our Organization',
            url: 'https://facebook.com/ourorg',
            isActive: true,
            icon: 'Facebook',
            color: 'bg-blue-500',
            followers: 12500,
            clicks: 342,
            lastUpdated: '2024-01-15T10:30:00Z',
            description: 'Main Facebook page for updates and community engagement'
          },
          {
            id: '2',
            platform: 'Instagram',
            name: '@ourorganization',
            url: 'https://instagram.com/ourorganization',
            isActive: true,
            icon: 'Instagram',
            color: 'bg-pink-500',
            followers: 8900,
            clicks: 198,
            lastUpdated: '2024-01-14T14:20:00Z',
            description: 'Visual content and behind-the-scenes updates'
          },
          {
            id: '3',
            platform: 'Twitter',
            name: '@OurOrg',
            url: 'https://twitter.com/ourorg',
            isActive: false,
            icon: 'Twitter',
            color: 'bg-sky-400',
            followers: 5600,
            clicks: 89,
            lastUpdated: '2024-01-10T09:15:00Z',
            description: 'News updates and quick announcements'
          },
          {
            id: '4',
            platform: 'LinkedIn',
            name: 'Our Organization',
            url: 'https://linkedin.com/company/ourorg',
            isActive: true,
            icon: 'LinkedIn',
            color: 'bg-blue-600',
            followers: 3200,
            clicks: 156,
            lastUpdated: '2024-01-12T16:45:00Z',
            description: 'Professional updates and career opportunities'
          }
        ];

        const mockStats: SocialStats = {
          totalLinks: 6,
          activeLinks: 4,
          totalFollowers: 30200,
          totalClicks: 785,
          topPerformer: 'Facebook',
          engagementRate: '4.2%'
        };

        setSocialLinks(mockLinks);
        setStats(mockStats);
        setIsLoading(false);
      }, 1000);
    };

    fetchSocialData();
  }, []);

  const handleAddLink = () => {
    setEditingLink(null);
    setFormData({
      platform: '',
      name: '',
      url: '',
      description: '',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleEditLink = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      name: link.name,
      url: link.url,
      description: link.description || '',
      isActive: link.isActive
    });
    setShowAddModal(true);
  };

  const handleSaveLink = () => {
    if (editingLink) {
      // Update existing link
      setSocialLinks(prev => prev.map(link => 
        link.id === editingLink.id 
          ? { ...link, ...formData, lastUpdated: new Date().toISOString() }
          : link
      ));
    } else {
      // Add new link
      const platform = socialPlatforms.find(p => p.name === formData.platform);
      const newLink: SocialLink = {
        id: Date.now().toString(),
        ...formData,
        icon: formData.platform,
        color: platform?.color || 'bg-gray-500',
        followers: 0,
        clicks: 0,
        lastUpdated: new Date().toISOString()
      };
      setSocialLinks(prev => [...prev, newLink]);
    }
    setShowAddModal(false);
  };

  const handleDeleteLink = (id: string) => {
    setSocialLinks(prev => prev.filter(link => link.id !== id));
  };

  const toggleLinkStatus = (id: string) => {
    setSocialLinks(prev => prev.map(link => 
      link.id === id 
        ? { ...link, isActive: !link.isActive, lastUpdated: new Date().toISOString() }
        : link
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Facebook,
      Twitter,
      Instagram,
      LinkedIn: Linkedin,
      YouTube: Youtube,
      WhatsApp: MessageCircle,
      Website: Globe
    };
    return iconMap[iconName] || Globe;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">Social Links Management</h1>
          <p className="text-gray-600 mt-1">Manage your organization's social media presence</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button 
            onClick={handleAddLink}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Social Link
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Links</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLinks}</p>
            </div>
            <Share2 className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Active Links</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeLinks}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.totalFollowers)}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
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
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-3xl font-bold text-orange-600">{stats.totalClicks}</p>
            </div>
            <MousePointer className="w-8 h-8 text-orange-600" />
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
              <p className="text-sm font-medium text-gray-600">Top Performer</p>
              <p className="text-lg font-bold text-indigo-600">{stats.topPerformer}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-600" />
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
              <p className="text-sm font-medium text-gray-600">Engagement</p>
              <p className="text-3xl font-bold text-pink-600">{stats.engagementRate}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-pink-600" />
          </div>
        </motion.div>
      </div>

      {/* Social Links Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Social Media Links</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {socialLinks.map((link, index) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${link.color}`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{link.platform}</div>
                          {link.description && (
                            <div className="text-sm text-gray-500">{link.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{link.name}</div>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          {link.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleLinkStatus(link.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${
                          link.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {link.isActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(link.followers || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {link.clicks || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(link.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditLink(link)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {socialLinks.length === 0 && (
          <div className="p-12 text-center">
            <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No social links</h3>
            <p className="text-gray-500 mb-4">Add your first social media link to get started.</p>
            <button 
              onClick={handleAddLink}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Social Link
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingLink ? 'Edit Social Link' : 'Add New Social Link'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select platform</option>
                  {socialPlatforms.map((platform) => (
                    <option key={platform.name} value={platform.name}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., @yourorganization"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this social account..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (visible to visitors)
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLink}
                disabled={!formData.platform || !formData.name || !formData.url}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingLink ? 'Update' : 'Add'} Link
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}