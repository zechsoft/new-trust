'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Target, 
  MessageSquare, 
  BarChart3,
  Plus,
  Edit,
  Eye,
  Trash2,
  ImageIcon,
  FileText,
  Settings,
  Filter,
  Search,
  DollarSign,
  X,
  Save,
  Upload
} from 'lucide-react';

interface CauseStats {
  totalCauses: number;
  totalDonors: number;
  totalRaised: number;
  activeCampaigns: number;
  avgProgress: number;
}

interface Cause {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  raised: string;
  goal: string;
  raisedAmount: number;
  goalAmount: number;
  image: string;
  lastUpdated: string;
  status: 'active' | 'paused' | 'completed';
}

export default function CausesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingCause, setEditingCause] = useState<Cause | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Updated stats based on client data
  const [stats, setStats] = useState<CauseStats>({
    totalCauses: 6,
    totalDonors: 8450,
    totalRaised: 187500,
    activeCampaigns: 6,
    avgProgress: 70
  });

  // Updated causes data to match client structure
  const [causes, setCauses] = useState<Cause[]>([
    {
      id: 'clean-water',
      title: 'Clean Water Initiative',
      description: 'Providing access to clean and safe drinking water in rural communities across Africa.',
      category: 'Water',
      progress: 75,
      raised: '$15,000',
      goal: '$20,000',
      raisedAmount: 15000,
      goalAmount: 20000,
      image: '/images/causes/clean-water.jpg',
      lastUpdated: '2024-12-15',
      status: 'active'
    },
    {
      id: 'education',
      title: 'Education for All',
      description: 'Building schools and supporting education programs for underprivileged children.',
      category: 'Education',
      progress: 60,
      raised: '$30,000',
      goal: '$50,000',
      raisedAmount: 30000,
      goalAmount: 50000,
      image: '/images/causes/education.jpg',
      lastUpdated: '2024-12-14',
      status: 'active'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Access',
      description: 'Improving healthcare facilities and services in remote and underserved areas.',
      category: 'Healthcare',
      progress: 45,
      raised: '$22,500',
      goal: '$50,000',
      raisedAmount: 22500,
      goalAmount: 50000,
      image: '/images/causes/healthcare.jpg',
      lastUpdated: '2024-12-13',
      status: 'active'
    },
    {
      id: 'sustainable-farming',
      title: 'Sustainable Farming',
      description: 'Teaching sustainable farming techniques to combat food insecurity and climate change.',
      category: 'Agriculture',
      progress: 85,
      raised: '$42,500',
      goal: '$50,000',
      raisedAmount: 42500,
      goalAmount: 50000,
      image: '/images/causes/farming.jpg',
      lastUpdated: '2024-12-12',
      status: 'active'
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      description: 'Supporting women entrepreneurs and providing skills training for economic independence.',
      category: 'Empowerment',
      progress: 65,
      raised: '$32,500',
      goal: '$50,000',
      raisedAmount: 32500,
      goalAmount: 50000,
      image: '/images/causes/women.jpg',
      lastUpdated: '2024-12-11',
      status: 'active'
    },
    {
      id: 'disaster-relief',
      title: 'Disaster Relief',
      description: 'Providing immediate aid and long-term support for communities affected by natural disasters.',
      category: 'Emergency',
      progress: 90,
      raised: '$45,000',
      goal: '$50,000',
      raisedAmount: 45000,
      goalAmount: 50000,
      image: '/images/causes/disaster.jpg',
      lastUpdated: '2024-12-10',
      status: 'active'
    }
  ]);

  // Get unique categories from causes
  const categories = ['All', ...Array.from(new Set(causes.map(cause => cause.category)))];
  const statuses = ['All', 'active', 'paused', 'completed'];
  const availableCategories = ['Water', 'Education', 'Healthcare', 'Agriculture', 'Empowerment', 'Emergency', 'Environment', 'Technology'];

  // Filter causes based on search and filters
  const filteredCauses = causes.filter(cause => {
    const matchesSearch = cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cause.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || cause.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || cause.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEditCause = (cause: Cause) => {
    setEditingCause({ ...cause });
    setIsModalOpen(true);
  };

  const handleSaveCause = () => {
    if (!editingCause) return;

    // Calculate progress based on raised and goal amounts
    const progress = Math.round((editingCause.raisedAmount / editingCause.goalAmount) * 100);
    
    const updatedCause = {
      ...editingCause,
      progress,
      raised: `$${editingCause.raisedAmount.toLocaleString()}`,
      goal: `$${editingCause.goalAmount.toLocaleString()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setCauses(prev => prev.map(cause => 
      cause.id === editingCause.id ? updatedCause : cause
    ));

    // Update stats
    const totalRaised = causes.reduce((sum, cause) => 
      cause.id === editingCause.id ? sum + editingCause.raisedAmount : sum + cause.raisedAmount, 0
    );
    const avgProgress = Math.round(causes.reduce((sum, cause) => 
      cause.id === editingCause.id ? sum + progress : sum + cause.progress, 0
    ) / causes.length);

    setStats(prev => ({
      ...prev,
      totalRaised,
      avgProgress
    }));

    setIsModalOpen(false);
    setEditingCause(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCause(null);
  };

  const handleDeleteCause = (causeId: string) => {
    if (window.confirm('Are you sure you want to delete this cause? This action cannot be undone.')) {
      setCauses(prev => prev.filter(cause => cause.id !== causeId));
      
      // Update stats
      const remainingCauses = causes.filter(cause => cause.id !== causeId);
      const totalRaised = remainingCauses.reduce((sum, cause) => sum + cause.raisedAmount, 0);
      const avgProgress = remainingCauses.length > 0 
        ? Math.round(remainingCauses.reduce((sum, cause) => sum + cause.progress, 0) / remainingCauses.length)
        : 0;

      setStats(prev => ({
        ...prev,
        totalCauses: remainingCauses.length,
        totalRaised,
        avgProgress,
        activeCampaigns: remainingCauses.filter(cause => cause.status === 'active').length
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Causes Management</h1>
          <p className="text-gray-600 mt-2">Manage your causes page content and campaigns</p>
        </div>
        <Link
          href="/admin/causes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Cause
        </Link>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Causes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCauses}</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDonors.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRaised.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Management Sections */}
    

      {/* Causes Management Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Manage Causes</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search causes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cause
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raised / Goal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCauses.map((cause) => (
                <tr key={cause.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={cause.image}
                        alt={cause.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{cause.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{cause.description}</div>
                        <div className="text-xs text-gray-400">Updated {cause.lastUpdated}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {cause.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(cause.progress)}`}
                            style={{ width: `${cause.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                          {cause.progress}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{cause.raised}</div>
                      <div className="text-gray-500">of {cause.goal}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cause.status)}`}>
                      {cause.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link href={`/causes/${cause.id}`} className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleEditCause(cause)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCause(cause.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCauses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No causes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingCause && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Cause</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cause Image
                </label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={editingCause.image} 
                    alt={editingCause.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingCause.title}
                  onChange={(e) => setEditingCause(prev => prev ? {...prev, title: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingCause.description}
                  onChange={(e) => setEditingCause(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editingCause.category}
                    onChange={(e) => setEditingCause(prev => prev ? {...prev, category: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingCause.status}
                    onChange={(e) => setEditingCause(prev => prev ? {...prev, status: e.target.value as 'active' | 'paused' | 'completed'} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Raised and Goal Amounts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Raised ($)
                  </label>
                  <input
                    type="number"
                    value={editingCause.raisedAmount}
                    onChange={(e) => setEditingCause(prev => prev ? {...prev, raisedAmount: parseInt(e.target.value)} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Amount ($)
                  </label>
                  <input
                    type="number"
                    value={editingCause.goalAmount}
                    onChange={(e) => setEditingCause(prev => prev ? {...prev, goalAmount: parseInt(e.target.value)} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Progress Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Preview
                </label>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                    <div 
                      className={`h-3 rounded-full ${getProgressColor(Math.round((editingCause.raisedAmount / editingCause.goalAmount) * 100))}`}
                      style={{ width: `${Math.min(Math.round((editingCause.raisedAmount / editingCause.goalAmount) * 100), 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                    {Math.round((editingCause.raisedAmount / editingCause.goalAmount) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCause}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}