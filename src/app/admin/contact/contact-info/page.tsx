'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  QrCode,
  Save,
  Edit,
  Plus,
  Trash2,
  Eye,
  Settings,
  Building,
  Globe,
  Users,
  AlertCircle,
  CheckCircle,
  Copy,
  Download
} from 'lucide-react';

// Types
interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours' | 'social';
  label: string;
  value: string;
  isActive: boolean;
  isPrimary: boolean;
  order: number;
}

interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isMain: boolean;
  isActive: boolean;
}

interface ContactStats {
  totalContacts: number;
  activeLocations: number;
  socialPlatforms: number;
  lastUpdated: string;
}

export default function AdminContactInfoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [officeLocations, setOfficeLocations] = useState<OfficeLocation[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    totalContacts: 0,
    activeLocations: 0,
    socialPlatforms: 0,
    lastUpdated: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [savedMessage, setSavedMessage] = useState('');

  // Mock data - Replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        const mockContactInfo: ContactInfo[] = [
          {
            id: '1',
            type: 'phone',
            label: 'Main Phone',
            value: '+91 123 456 7890',
            isActive: true,
            isPrimary: true,
            order: 1
          },
          {
            id: '2',
            type: 'phone',
            label: 'Support Phone',
            value: '+91 987 654 3210',
            isActive: true,
            isPrimary: false,
            order: 2
          },
          {
            id: '3',
            type: 'email',
            label: 'General Inquiries',
            value: 'contact@charitytrust.org',
            isActive: true,
            isPrimary: true,
            order: 1
          },
          {
            id: '4',
            type: 'email',
            label: 'Support Email',
            value: 'support@charitytrust.org',
            isActive: true,
            isPrimary: false,
            order: 2
          },
          {
            id: '5',
            type: 'address',
            label: 'Main Office',
            value: '123 Charity Lane, Mumbai, India 400001',
            isActive: true,
            isPrimary: true,
            order: 1
          }
        ];

        const mockOfficeLocations: OfficeLocation[] = [
          {
            id: '1',
            name: 'Main Office - Mumbai',
            address: '123 Charity Lane, Mumbai, India 400001',
            phone: '+91 123 456 7890',
            email: 'mumbai@charitytrust.org',
            hours: 'Mon-Fri: 9am - 5pm, Sat: 10am - 2pm',
            isMain: true,
            isActive: true
          },
          {
            id: '2',
            name: 'Branch Office - Delhi',
            address: '456 Service Street, Delhi, India 110001',
            phone: '+91 987 654 3210',
            email: 'delhi@charitytrust.org',
            hours: 'Mon-Fri: 9am - 6pm',
            isMain: false,
            isActive: true
          }
        ];

        const mockStats: ContactStats = {
          totalContacts: 8,
          activeLocations: 2,
          socialPlatforms: 5,
          lastUpdated: new Date().toISOString()
        };

        setContactInfo(mockContactInfo);
        setOfficeLocations(mockOfficeLocations);
        setStats(mockStats);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleSave = async (item: ContactInfo) => {
    // Simulate API call
    setContactInfo(prev => prev.map(info => 
      info.id === item.id ? item : info
    ));
    setEditingItem(null);
    setSavedMessage('Changes saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact information?')) {
      setContactInfo(prev => prev.filter(info => info.id !== id));
      setSavedMessage('Contact information deleted.');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'address': return MapPin;
      case 'hours': return Clock;
      case 'social': return Globe;
      default: return Settings;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'phone': return 'blue';
      case 'email': return 'purple';
      case 'address': return 'green';
      case 'hours': return 'amber';
      case 'social': return 'pink';
      default: return 'gray';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Contact Information Management</h1>
          <p className="text-gray-600 mt-1">Manage your organization's contact details and office locations</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export vCard
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact Info
          </button>
        </div>
      </div>

      {/* Success Message */}
      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">{savedMessage}</span>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalContacts}</p>
            </div>
            <Phone className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Active Locations</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeLocations}</p>
            </div>
            <Building className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Social Platforms</p>
              <p className="text-3xl font-bold text-purple-600">{stats.socialPlatforms}</p>
            </div>
            <Globe className="w-8 h-8 text-purple-600" />
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
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-lg font-bold text-indigo-600">
                {new Date(stats.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <Settings className="w-8 h-8 text-indigo-600" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'general', label: 'General Contact', icon: Phone },
            { id: 'locations', label: 'Office Locations', icon: Building },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Contact Tab */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">General Contact Information</h2>
            <p className="text-gray-600 mt-1">Manage primary contact details displayed on your website</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact List */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = getContactIcon(info.type);
                  const color = getContactColor(info.type);
                  const isEditing = editingItem === info.id;

                  return (
                    <motion.div
                      key={info.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 border rounded-lg ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-${color}-100`}>
                            <Icon className={`w-5 h-5 text-${color}-600`} />
                          </div>
                          <div className="flex-1">
                            {isEditing ? (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={info.label}
                                  onChange={(e) => setContactInfo(prev => prev.map(item => 
                                    item.id === info.id ? { ...item, label: e.target.value } : item
                                  ))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Label"
                                />
                                <input
                                  type="text"
                                  value={info.value}
                                  onChange={(e) => setContactInfo(prev => prev.map(item => 
                                    item.id === info.id ? { ...item, value: e.target.value } : item
                                  ))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Value"
                                />
                                <div className="flex items-center gap-4">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={info.isActive}
                                      onChange={(e) => setContactInfo(prev => prev.map(item => 
                                        item.id === info.id ? { ...item, isActive: e.target.checked } : item
                                      ))}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Active</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={info.isPrimary}
                                      onChange={(e) => setContactInfo(prev => prev.map(item => 
                                        item.id === info.id ? { ...item, isPrimary: e.target.checked } : item
                                      ))}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Primary</span>
                                  </label>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSave(info)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingItem(null)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-gray-900">{info.label}</h3>
                                  {info.isPrimary && (
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                      Primary
                                    </span>
                                  )}
                                  {!info.isActive && (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                      Inactive
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600">{info.value}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!isEditing && (
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => navigator.clipboard.writeText(info.value)}
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                              title="Copy to clipboard"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingItem(info.id)}
                              className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(info.id)}
                              className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info Preview</h3>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    {contactInfo.filter(info => info.isActive).map(info => {
                      const Icon = getContactIcon(info.type);
                      const color = getContactColor(info.type);
                      return (
                        <div key={info.id} className="flex items-center gap-3">
                          <div className={`p-2 rounded-full bg-${color}-100`}>
                            <Icon className={`w-5 h-5 text-${color}-600`} />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{info.label}</h5>
                            <p className="text-gray-600">{info.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Office Locations Tab */}
      {activeTab === 'locations' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Office Locations</h2>
                <p className="text-gray-600 mt-1">Manage your organization's office locations and branches</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Location
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {officeLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {location.name}
                        {location.isMain && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            Main Office
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${location.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className={`text-sm ${location.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {location.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-100">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <p className="text-gray-700">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-700">{location.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-700">{location.email}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                      <p className="text-gray-700">{location.hours}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Contact Settings</h2>
            <p className="text-gray-600 mt-1">Configure contact form and display settings</p>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Display Settings</h3>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Show QR Code</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Show Business Hours</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Show Map Integration</span>
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Notifications</span>
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Auto-Reply Messages</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}