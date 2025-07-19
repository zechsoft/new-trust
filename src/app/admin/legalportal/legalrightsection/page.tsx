'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  Search, 
  Filter,
  Eye,
  Users,
  Heart,
  Shield,
  Home,
  Briefcase,
  GraduationCap,
  Globe,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Right {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  details: string[];
  status: 'active' | 'inactive';
  lastUpdated: string;
  views: number;
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  category: string;
  applyLink: string;
  status: 'active' | 'closed' | 'upcoming';
  lastUpdated: string;
  applications: number;
}

interface Resource {
  id: string;
  title: string;
  language: string;
  size: string;
  format: string;
  downloads: number;
  uploadDate: string;
  status: 'active' | 'inactive';
}

export default function AdminLegalRightsSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rights' | 'schemes' | 'resources'>('overview');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState<'right' | 'scheme' | 'resource'>('right');

  const [rights, setRights] = useState<Right[]>([
    {
      id: '1',
      title: 'Right to Equality',
      description: 'Equal treatment before law and equal protection of laws',
      category: 'fundamental',
      icon: <Shield className="w-6 h-6" />,
      details: [
        'Equality before law (Article 14)',
        'Prohibition of discrimination (Article 15)',
        'Equality of opportunity (Article 16)',
        'Abolition of untouchability (Article 17)'
      ],
      status: 'active',
      lastUpdated: '2024-01-15',
      views: 15432
    },
    {
      id: '2',
      title: 'Right to Education',
      description: 'Free and compulsory education for children aged 6-14 years',
      category: 'education',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Free education up to elementary level',
        'Right to quality education',
        'Non-discrimination in schools',
        'Infrastructure and teacher requirements'
      ],
      status: 'active',
      lastUpdated: '2024-01-14',
      views: 12845
    },
    {
      id: '3',
      title: 'Right to Information',
      description: 'Access to information from public authorities',
      category: 'fundamental',
      icon: <Eye className="w-6 h-6" />,
      details: [
        'Access to government information',
        'RTI application process',
        'Response within 30 days',
        'Appeal process for denial'
      ],
      status: 'active',
      lastUpdated: '2024-01-13',
      views: 18976
    }
  ]);

  const [schemes, setSchemes] = useState<Scheme[]>([
    {
      id: '1',
      name: 'PM Awas Yojana',
      description: 'Housing for All - providing affordable housing to urban and rural poor',
      eligibility: ['Annual income below ₹18 lakh', 'First-time home buyer', 'Indian citizen'],
      benefits: ['Subsidy up to ₹2.67 lakh', 'Lower interest rates', 'Extended loan tenure'],
      category: 'housing',
      applyLink: 'https://pmaymis.gov.in/',
      status: 'active',
      lastUpdated: '2024-01-15',
      applications: 2456
    },
    {
      id: '2',
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares', 'Valid land records'],
      benefits: ['₹6,000 per year', 'Direct bank transfer', 'Three installments of ₹2,000'],
      category: 'agriculture',
      applyLink: 'https://pmkisan.gov.in/',
      status: 'active',
      lastUpdated: '2024-01-14',
      applications: 3821
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Rights Handbook',
      language: 'Hindi',
      size: '2.5 MB',
      format: 'PDF',
      downloads: 8934,
      uploadDate: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      title: 'Scheme Guidelines',
      language: 'English',
      size: '3.1 MB',
      format: 'PDF',
      downloads: 12456,
      uploadDate: '2024-01-12',
      status: 'active'
    },
    {
      id: '3',
      title: 'Application Forms',
      language: 'Tamil',
      size: '1.8 MB',
      format: 'PDF',
      downloads: 5678,
      uploadDate: '2024-01-08',
      status: 'inactive'
    }
  ]);

  // 1. Updated Add Modal Form Submission Handler
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (addModalType === 'right') {
      const newRight: Right = {
        id: (rights.length + 1).toString(),
        title: data.title as string,
        description: data.description as string,
        category: data.category as string,
        icon: getCategoryIcon(data.category as string),
        details: (data.details as string).split('\n').filter(detail => detail.trim()),
        status: 'active',
        lastUpdated: new Date().toISOString().split('T')[0],
        views: 0
      };
      setRights(prev => [...prev, newRight]);
    } else if (addModalType === 'scheme') {
      const newScheme: Scheme = {
        id: (schemes.length + 1).toString(),
        name: data.title as string,
        description: data.description as string,
        eligibility: (data.eligibility as string).split('\n').filter(item => item.trim()),
        benefits: (data.benefits as string).split('\n').filter(item => item.trim()),
        category: data.category as string,
        applyLink: data.applyLink as string,
        status: (data.status as 'active' | 'closed' | 'upcoming') || 'active',
        lastUpdated: new Date().toISOString().split('T')[0],
        applications: 0
      };
      setSchemes(prev => [...prev, newScheme]);
    } else if (addModalType === 'resource') {
      const newResource: Resource = {
        id: (resources.length + 1).toString(),
        title: data.title as string,
        language: data.language as string,
        size: '2.1 MB', // Default size
        format: (data.format as string).toUpperCase(),
        downloads: 0,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setResources(prev => [...prev, newResource]);
    }
    
    setShowAddModal(false);
  };

  // 2. Updated Edit Modal Form Submission Handler
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (activeTab === 'rights') {
      setRights(prev => prev.map(item => 
        item.id === editingItem.id 
          ? {
              ...item,
              title: data.title as string,
              description: data.description as string,
              category: data.category as string,
              details: (data.details as string).split('\n').filter(detail => detail.trim()),
              status: data.status as 'active' | 'inactive',
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      ));
    } else if (activeTab === 'schemes') {
      setSchemes(prev => prev.map(item => 
        item.id === editingItem.id 
          ? {
              ...item,
              name: data.title as string,
              description: data.description as string,
              category: data.category as string,
              eligibility: (data.eligibility as string).split('\n').filter(item => item.trim()),
              benefits: (data.benefits as string).split('\n').filter(item => item.trim()),
              applyLink: data.applyLink as string,
              status: data.status as 'active' | 'closed' | 'upcoming',
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : item
      ));
    } else if (activeTab === 'resources') {
      setResources(prev => prev.map(item => 
        item.id === editingItem.id 
          ? {
              ...item,
              title: data.title as string,
              language: data.language as string,
              format: (data.format as string).toUpperCase(),
              status: data.status as 'active' | 'inactive',
              uploadDate: new Date().toISOString().split('T')[0]
            }
          : item
      ));
    }
    
    setEditingItem(null);
  };

  // 3. Delete Function
  const handleDelete = (type: 'right' | 'scheme' | 'resource', id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'right') {
        setRights(prev => prev.filter(item => item.id !== id));
      } else if (type === 'scheme') {
        setSchemes(prev => prev.filter(item => item.id !== id));
      } else if (type === 'resource') {
        setResources(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  // 4. Get Category Icon Helper Function
  const getCategoryIcon = (category: string) => {
    const iconMap = {
      'fundamental': <Shield className="w-6 h-6" />,
      'education': <GraduationCap className="w-6 h-6" />,
      'employment': <Briefcase className="w-6 h-6" />,
      'social': <Users className="w-6 h-6" />,
      'property': <Home className="w-6 h-6" />,
      'housing': <Home className="w-6 h-6" />,
      'agriculture': <Globe className="w-6 h-6" />,
      'health': <Heart className="w-6 h-6" />
    };
    return iconMap[category as keyof typeof iconMap] || <Shield className="w-6 h-6" />;
  };

  const stats = {
    totalRights: rights.length,
    activeRights: rights.filter(r => r.status === 'active').length,
    totalSchemes: schemes.length,
    activeSchemes: schemes.filter(s => s.status === 'active').length,
    totalResources: resources.length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
    totalApplications: schemes.reduce((sum, s) => sum + s.applications, 0),
    totalViews: rights.reduce((sum, r) => sum + r.views, 0)
  };

  const toggleStatus = (type: 'right' | 'scheme' | 'resource', id: string) => {
    if (type === 'right') {
      setRights(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      ));
    } else if (type === 'scheme') {
      setSchemes(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'active' ? 'closed' : 'active' }
          : item
      ));
    } else if (type === 'resource') {
      setResources(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
          : item
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      case 'upcoming': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Rights & Schemes Management</h1>
            <p className="text-gray-600">Manage rights, government schemes, and downloadable resources</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'rights', label: 'Rights', icon: <Shield className="w-4 h-4" /> },
            { id: 'schemes', label: 'Schemes', icon: <Heart className="w-4 h-4" /> },
            { id: 'resources', label: 'Resources', icon: <Download className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalRights}</div>
              <div className="text-gray-600">Legal Rights</div>
              <div className="text-sm text-green-600 mt-2">{stats.activeRights} active</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalSchemes}</div>
              <div className="text-gray-600">Welfare Schemes</div>
              <div className="text-sm text-green-600 mt-2">{stats.activeSchemes} active</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Downloads</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalDownloads.toLocaleString()}</div>
              <div className="text-gray-600">Resource Downloads</div>
              <div className="text-sm text-blue-600 mt-2">{stats.totalResources} resources</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalApplications.toLocaleString()}</div>
              <div className="text-gray-600">Scheme Applications</div>
              <div className="text-sm text-green-600 mt-2">+15% this month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setAddModalType('right');
                  setShowAddModal(true);
                }}
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-blue-900">Add New Right</div>
                  <div className="text-sm text-blue-600">Create a new legal right entry</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setAddModalType('scheme');
                  setShowAddModal(true);
                }}
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-green-900">Add New Scheme</div>
                  <div className="text-sm text-green-600">Create a new welfare scheme</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setAddModalType('resource');
                  setShowAddModal(true);
                }}
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium text-purple-900">Add New Resource</div>
                  <div className="text-sm text-purple-600">Upload a new document</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rights Tab */}
      {activeTab === 'rights' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Legal Rights Management</h2>
            <button
              onClick={() => {
                setAddModalType('right');
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Right
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {rights.map((right) => (
              <div key={right.id} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {right.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{right.title}</h3>
                      <p className="text-gray-600 mt-1">{right.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Category: {right.category}</span>
                        <span>Views: {right.views.toLocaleString()}</span>
                        <span>Updated: {right.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(right.status)}`}>
                      {getStatusIcon(right.status)}
                      {right.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {right.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(right)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus('right', right.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      right.status === 'active' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {right.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDelete('right', right.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Schemes Tab */}
      {activeTab === 'schemes' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Welfare Schemes Management</h2>
            <button
              onClick={() => {
                setAddModalType('scheme');
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Add Scheme
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{scheme.name}</h3>
                    <p className="text-gray-600 mt-1">{scheme.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Category: {scheme.category}</span>
                      <span>Applications: {scheme.applications}</span>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(scheme.status)}`}>
                    {getStatusIcon(scheme.status)}
                    {scheme.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Eligibility:</h4>
                    <div className="space-y-1">
                      {scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {criteria}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Benefits:</h4>
                    <div className="space-y-1">
                      {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(scheme)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus('scheme', scheme.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      scheme.status === 'active' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {scheme.status === 'active' ? 'Close' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handleDelete('scheme', scheme.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Downloadable Resources</h2>
            <button
              onClick={() => {
                setAddModalType('resource');
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.language}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(resource.status)}`}>
                    {getStatusIcon(resource.status)}
                    {resource.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{resource.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{resource.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Downloads:</span>
                    <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="font-medium">{resource.uploadDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(resource)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus('resource', resource.id)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      resource.status === 'active' 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {resource.status === 'active' ? 'Hide' : 'Show'}
                  </button>
                  <button 
                    onClick={() => handleDelete('resource', resource.id)}
                    className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Add New {addModalType === 'right' ? 'Legal Right' : addModalType === 'scheme' ? 'Welfare Scheme' : 'Resource'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title/Name</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${addModalType} name`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder={`Enter ${addModalType} description`}
                ></textarea>
              </div>

              {addModalType === 'right' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select name="category" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select category</option>
                      <option value="fundamental">Fundamental Rights</option>
                      <option value="education">Education</option>
                      <option value="employment">Employment</option>
                      <option value="social">Social Rights</option>
                      <option value="property">Property Rights</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Details (One per line)</label>
                    <textarea
                      name="details"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter details, one per line"
                    ></textarea>
                  </div>
                </>
              )}

              {addModalType === 'scheme' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select name="category" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select category</option>
                        <option value="housing">Housing</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="employment">Employment</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="active">Active</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility (One per line)</label>
                    <textarea
                      name="eligibility"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter eligibility criteria"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits (One per line)</label>
                    <textarea
                      name="benefits"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter benefits"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Link</label>
                    <input
                      type="url"
                      name="applyLink"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter application URL"
                    />
                  </div>
                </>
              )}

              {addModalType === 'resource' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select name="language" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Bengali">Bengali</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                      <select name="format" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="pdf">PDF</option>
                        <option value="doc">DOC</option>
                        <option value="xls">XLS</option>
                        <option value="jpg">JPG</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Download className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Drag and drop file here</p>
                        <p className="text-xs text-gray-500 mt-1">or</p>
                        <input
                          type="file"
                          name="file"
                          className="hidden"
                          id="fileInput"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="fileInput"
                          className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm cursor-pointer"
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Save {addModalType === 'right' ? 'Right' : addModalType === 'scheme' ? 'Scheme' : 'Resource'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setEditingItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Edit {activeTab === 'rights' ? 'Legal Right' : activeTab === 'schemes' ? 'Welfare Scheme' : 'Resource'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title/Name</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem.title || editingItem.name}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingItem.description}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                ></textarea>
              </div>

              {activeTab === 'rights' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      name="category"
                      defaultValue={editingItem.category}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="fundamental">Fundamental Rights</option>
                      <option value="education">Education</option>
                      <option value="employment">Employment</option>
                      <option value="social">Social Rights</option>
                      <option value="property">Property Rights</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                    <textarea
                      name="details"
                      defaultValue={editingItem.details.join('\n')}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          defaultChecked={editingItem.status === 'active'}
                          className="text-blue-600"
                        />
                        <span className="ml-2">Active</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          defaultChecked={editingItem.status === 'inactive'}
                          className="text-blue-600"
                        />
                        <span className="ml-2">Inactive</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'schemes' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select 
                        name="category"
                        defaultValue={editingItem.category}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="housing">Housing</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="employment">Employment</option>
                        <option value="education">Education</option>
                        <option value="health">Health</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select 
                        name="status"
                        defaultValue={editingItem.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                    <textarea
                      name="eligibility"
                      defaultValue={editingItem.eligibility.join('\n')}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                    <textarea
                      name="benefits"
                      defaultValue={editingItem.benefits.join('\n')}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Link</label>
                    <input
                      type="url"
                      name="applyLink"
                      defaultValue={editingItem.applyLink}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {activeTab === 'resources' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select 
                        name="language"
                        defaultValue={editingItem.language}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Bengali">Bengali</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                      <select 
                        name="format"
                        defaultValue={editingItem.format.toLowerCase()}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pdf">PDF</option>
                        <option value="doc">DOC</option>
                        <option value="xls">XLS</option>
                        <option value="jpg">JPG</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex items-center gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="active"
                          defaultChecked={editingItem.status === 'active'}
                          className="text-blue-600"
                        />
                        <span className="ml-2">Active</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          defaultChecked={editingItem.status === 'inactive'}
                          className="text-blue-600"
                        />
                        <span className="ml-2">Inactive</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current File</label>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="font-medium">{editingItem.title}.{editingItem.format.toLowerCase()}</p>
                        <p className="text-sm text-gray-600">{editingItem.size} • {editingItem.downloads} downloads</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload New File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Download className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Drag and drop file here</p>
                        <p className="text-xs text-gray-500 mt-1">or</p>
                        <input
                          type="file"
                          name="file"
                          className="hidden"
                          id="fileInputEdit"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor="fileInputEdit"
                          className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm cursor-pointer"
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}