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
  Target,
  X
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

interface TrustMetrics {
  total_partners: number;
  verified_partners: number;
  transparency_score: number;
  impact_reports_published: number;
  certification_level: string;
}

interface Report {
  id: string;
  title: string;
  type: string;
  period: string;
  description: string;
  created_date: string;
  file_url: string;
  icon: any;
  color: string;
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

  const [trustMetrics, setTrustMetrics] = useState<TrustMetrics>({
    total_partners: 15,
    verified_partners: 12,
    transparency_score: 94,
    impact_reports_published: 4,
    certification_level: 'Gold Standard'
  });

  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Annual Impact Report',
      type: 'impact',
      period: 'Q4 2024',
      description: 'Comprehensive overview of organizational activities and partner collaborations',
      created_date: '2024-12-15',
      file_url: '/reports/annual-impact-2024.pdf',
      icon: FileText,
      color: 'blue'
    },
    {
      id: '2',
      title: 'Partnership Metrics',
      type: 'metrics',
      period: 'Monthly',
      description: 'Detailed breakdown of partnership performance and collaboration outcomes',
      created_date: '2024-12-01',
      file_url: '/reports/partnership-metrics-dec.pdf',
      icon: BarChart3,
      color: 'green'
    },
    {
      id: '3',
      title: 'Transparency Audit',
      type: 'audit',
      period: 'Quarterly',
      description: 'Third-party verification of transparency and accountability measures',
      created_date: '2024-10-30',
      file_url: '/reports/transparency-audit-q3.pdf',
      icon: Shield,
      color: 'purple'
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [viewingPartner, setViewingPartner] = useState<Partner | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Create new partner template
  const createNewPartner = (): Partner => ({
    id: Date.now().toString(),
    name: '',
    logo: '',
    website: '',
    status: 'active',
    partnership_since: new Date().toISOString().split('T')[0],
    description: '',
    contact_email: ''
  });

  // Handle adding new partner
  const handleAddPartner = () => {
    setEditingPartner(createNewPartner());
    setShowAddPartner(true);
  };

  // Handle editing existing partner
  const handleEditPartner = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setIsEditing(true);
  };

  // Handle saving partner (both new and edited)
  const handleSavePartner = () => {
    if (editingPartner) {
      if (showAddPartner) {
        // Adding new partner
        setPartners(prev => [...prev, editingPartner]);
        setTrustMetrics(prev => ({
          ...prev,
          total_partners: prev.total_partners + 1,
          verified_partners: prev.verified_partners + 1
        }));
        setShowAddPartner(false);
      } else {
        // Editing existing partner
        setPartners(prev => 
          prev.map(p => p.id === editingPartner.id ? editingPartner : p)
        );
        setIsEditing(false);
      }
      setEditingPartner(null);
    }
  };

  // Handle viewing partner details
  const handleViewPartner = (partner: Partner) => {
    setViewingPartner(partner);
  };

  // Handle deleting partner with confirmation
  const handleDeletePartner = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDeletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    setTrustMetrics(prev => ({
      ...prev,
      total_partners: prev.total_partners - 1,
      verified_partners: Math.max(0, prev.verified_partners - 1)
    }));
    setShowDeleteConfirm(null);
  };

  // Handle report download
  const handleDownloadReport = (report: Report) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = report.file_url;
    link.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle report viewing
  const handleViewReport = (report: Report) => {
    // Open report in new tab
    window.open(report.file_url, '_blank');
  };

  // Handle generating new report
  const handleGenerateReport = () => {
    alert('Report generation feature would integrate with your reporting system');
  };

  // Cancel editing/adding
  const handleCancel = () => {
    setIsEditing(false);
    setShowAddPartner(false);
    setEditingPartner(null);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600'
    };
    return colorMap[color] || 'text-gray-600';
  };

  const getButtonColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700'
    };
    return colorMap[color] || 'bg-gray-600 hover:bg-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Trust & Transparency Management</h1>
        </div>
        <p className="text-gray-600">Manage partnerships, transparency metrics, and reporting</p>
      </div>

      {/* Trust Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
            {['overview', 'partners', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
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
                <button 
                  onClick={handleAddPartner}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
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
                            title="Edit partner"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleViewPartner(partner)}
                            className="text-gray-600 hover:text-gray-900"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePartner(partner.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete partner"
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

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Transparency Reports</h3>
                <button 
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Generate Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => {
                  const IconComponent = report.icon;
                  return (
                    <div key={report.id} className="bg-white border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className={`h-8 w-8 ${getColorClasses(report.color)}`} />
                        <span className="text-sm text-gray-500">{report.period}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDownloadReport(report)}
                          className={`flex-1 px-3 py-2 text-white text-sm rounded ${getButtonColorClasses(report.color)}`}
                        >
                          Download
                        </button>
                        <button 
                          onClick={() => handleViewReport(report)}
                          className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Partner Modal */}
      {(isEditing || showAddPartner) && editingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {showAddPartner ? 'Add New Partner' : 'Edit Partner'}
              </h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                <input
                  type="text"
                  value={editingPartner.name}
                  onChange={(e) => setEditingPartner({...editingPartner, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  value={editingPartner.website}
                  onChange={(e) => setEditingPartner({...editingPartner, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.org"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={editingPartner.contact_email}
                  onChange={(e) => setEditingPartner({...editingPartner, contact_email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingPartner.description}
                  onChange={(e) => setEditingPartner({...editingPartner, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Brief description of the organization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Since</label>
                <input
                  type="date"
                  value={editingPartner.partnership_since}
                  onChange={(e) => setEditingPartner({...editingPartner, partnership_since: e.target.value})}
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
                disabled={!editingPartner.name || !editingPartner.contact_email}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {showAddPartner ? 'Add Partner' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Partner Modal */}
      {viewingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Partner Details</h3>
              <button onClick={() => setViewingPartner(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-gray-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">{viewingPartner.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingPartner.status)}`}>
                    {viewingPartner.status}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <p className="text-sm text-gray-900">{viewingPartner.website || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Email</label>
                  <p className="text-sm text-gray-900">{viewingPartner.contact_email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Partnership Since</label>
                  <p className="text-sm text-gray-900">
                    {new Date(viewingPartner.partnership_since).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900">{viewingPartner.description || 'No description provided'}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewingPartner(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this partner? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => confirmDeletePartner(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
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