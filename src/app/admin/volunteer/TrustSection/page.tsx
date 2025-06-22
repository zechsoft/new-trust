'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  Upload, 
  Download,
  AlertCircle,
  CheckCircle,
  Building2,
  TrendingUp,
  Calendar,
  Globe,
  Award,
  Target
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  status: 'active' | 'inactive';
  partnership_since: string;
  description: string;
  contact_email: string;
}

interface EffortData {
  id: string;
  area: string;
  percentage: number;
  color: string;
  target_percentage: number;
  monthly_hours: number;
  volunteers_involved: number;
}

interface TrustMetrics {
  total_partners: number;
  verified_partners: number;
  transparency_score: number;
  total_volunteer_hours: number;
  impact_reports_published: number;
  certification_level: string;
}

export default function TrustSectionAdmin() {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'United Way',
      logo: '/images/partners/united-way.svg',
      website: 'https://unitedway.org',
      status: 'active',
      partnership_since: '2022-01-15',
      description: 'Global movement focused on education, income and health',
      contact_email: 'partnerships@unitedway.org'
    },
    {
      id: '2',
      name: 'Red Cross',
      logo: '/images/partners/red-cross.svg',
      website: 'https://redcross.org',
      status: 'active',
      partnership_since: '2021-08-20',
      description: 'Humanitarian organization providing emergency assistance',
      contact_email: 'volunteer@redcross.org'
    },
    {
      id: '3',
      name: 'Habitat for Humanity',
      logo: '/images/partners/habitat.svg',
      website: 'https://habitat.org',
      status: 'active',
      partnership_since: '2023-03-10',
      description: 'Building homes, communities and hope',
      contact_email: 'info@habitat.org'
    }
  ]);

  const [effortsData, setEffortsData] = useState<EffortData[]>([
    {
      id: '1',
      area: 'Education & Literacy',
      percentage: 85,
      color: 'bg-blue-500',
      target_percentage: 80,
      monthly_hours: 2400,
      volunteers_involved: 145
    },
    {
      id: '2',
      area: 'Health & Wellness',
      percentage: 70,
      color: 'bg-purple-500',
      target_percentage: 75,
      monthly_hours: 1800,
      volunteers_involved: 98
    },
    {
      id: '3',
      area: 'Environmental',
      percentage: 65,
      color: 'bg-green-500',
      target_percentage: 70,
      monthly_hours: 1200,
      volunteers_involved: 87
    },
    {
      id: '4',
      area: 'Community Support',
      percentage: 90,
      color: 'bg-amber-500',
      target_percentage: 85,
      monthly_hours: 3200,
      volunteers_involved: 203
    },
    {
      id: '5',
      area: 'Disaster Relief',
      percentage: 50,
      color: 'bg-red-500',
      target_percentage: 60,
      monthly_hours: 800,
      volunteers_involved: 45
    }
  ]);

  const [trustMetrics, setTrustMetrics] = useState<TrustMetrics>({
    total_partners: 15,
    verified_partners: 12,
    transparency_score: 94,
    total_volunteer_hours: 8750,
    impact_reports_published: 4,
    certification_level: 'Gold Standard'
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingEffort, setEditingEffort] = useState<EffortData | null>(null);

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setIsEditing(true);
  };

  const handleSavePartner = () => {
    if (editingPartner) {
      setPartners(prev => 
        prev.map(p => p.id === editingPartner.id ? editingPartner : p)
      );
      setEditingPartner(null);
      setIsEditing(false);
    }
  };

  const handleDeletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  const handleEditEffort = (effort: EffortData) => {
    setEditingEffort({ ...effort });
  };

  const handleSaveEffort = () => {
    if (editingEffort) {
      setEffortsData(prev => 
        prev.map(e => e.id === editingEffort.id ? editingEffort : e)
      );
      setEditingEffort(null);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getPerformanceColor = (current: number, target: number) => {
    if (current >= target) return 'text-green-600';
    if (current >= target * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Trust & Transparency Management</h1>
        </div>
        <p className="text-gray-600">Manage partnerships, transparency metrics, and volunteer effort distribution</p>
      </div>

      {/* Trust Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{trustMetrics.total_partners}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Partners</p>
              <p className="text-2xl font-bold text-green-600">{trustMetrics.verified_partners}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transparency Score</p>
              <p className="text-2xl font-bold text-purple-600">{trustMetrics.transparency_score}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-indigo-600">{trustMetrics.total_volunteer_hours.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impact Reports</p>
              <p className="text-2xl font-bold text-emerald-600">{trustMetrics.impact_reports_published}</p>
            </div>
            <FileText className="h-8 w-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certification</p>
              <p className="text-lg font-bold text-yellow-600">{trustMetrics.certification_level}</p>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'partners', 'efforts', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'efforts' ? 'Volunteer Efforts' : tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Partner Status Chart */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Status Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Active Partnerships</span>
                      <span className="font-semibold text-green-600">
                        {partners.filter(p => p.status === 'active').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Inactive Partnerships</span>
                      <span className="font-semibold text-gray-600">
                        {partners.filter(p => p.status === 'inactive').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Verification Rate</span>
                      <span className="font-semibold text-blue-600">
                        {Math.round((trustMetrics.verified_partners / trustMetrics.total_partners) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700">New partner verified: Habitat for Humanity</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-700">Q4 Impact Report published</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <span className="text-sm text-gray-700">Transparency score increased to 94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Partners Tab */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Partner Organizations</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Partner</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partnership Since</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {partners.map((partner) => (
                      <tr key={partner.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <Building2 className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                              <div className="text-sm text-gray-500">{partner.website}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {partner.contact_email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(partner.partnership_since).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                            {partner.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => handleEditPartner(partner)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePartner(partner.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Volunteer Efforts Tab */}
          {activeTab === 'efforts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Volunteer Effort Distribution</h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export Data</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Effort Distribution Chart */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Current Distribution</h4>
                  <div className="space-y-4">
                    {effortsData.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">{item.area}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${getPerformanceColor(item.percentage, item.target_percentage)}`}>
                              {item.percentage}%
                            </span>
                            <span className="text-sm text-gray-500">
                              (Target: {item.target_percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-300`} 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="space-y-4">
                  {effortsData.map((effort) => (
                    <div key={effort.id} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{effort.area}</h5>
                        <button 
                          onClick={() => handleEditEffort(effort)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Monthly Hours:</span>
                          <span className="ml-2 font-medium">{effort.monthly_hours}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Volunteers:</span>
                          <span className="ml-2 font-medium">{effort.volunteers_involved}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Transparency Reports</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Generate Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <span className="text-sm text-gray-500">Q4 2024</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Annual Impact Report</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive overview of volunteer activities and partner collaborations
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                      View
                    </button>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                    <span className="text-sm text-gray-500">Monthly</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Volunteer Metrics</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed breakdown of volunteer hours and effort distribution
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                      View
                    </button>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <span className="text-sm text-gray-500">Quarterly</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparency Audit</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Third-party verification of transparency and accountability measures
                  </p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Partner Modal */}
      {isEditing && editingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Partner</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({...editingPartner, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={editingPartner.website}
                  onChange={(e) => setEditingPartner({...editingPartner, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={editingPartner.contact_email}
                  onChange={(e) => setEditingPartner({...editingPartner, contact_email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingPartner.status}
                  onChange={(e) => setEditingPartner({...editingPartner, status: e.target.value as 'active' | 'inactive'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSavePartner}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => {setIsEditing(false); setEditingPartner(null);}}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Effort Modal */}
      {editingEffort && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Volunteer Effort</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <input
                  type="text"
                  value={editingEffort.area}
                  onChange={(e) => setEditingEffort({...editingEffort, area: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingEffort.percentage}
                  onChange={(e) => setEditingEffort({...editingEffort, percentage: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingEffort.target_percentage}
                  onChange={(e) => setEditingEffort({...editingEffort, target_percentage: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Hours</label>
                <input
                  type="number"
                                    value={editingEffort.monthly_hours}
                  onChange={(e) => setEditingEffort({...editingEffort, monthly_hours: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volunteers Involved</label>
                <input
                  type="number"
                  value={editingEffort.volunteers_involved}
                  onChange={(e) => setEditingEffort({...editingEffort, volunteers_involved: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveEffort}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingEffort(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}