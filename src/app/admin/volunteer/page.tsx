'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  BookOpen, 
  Award, 
  MessageSquare, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface VolunteerStats {
  totalVolunteers: number;
  activeVolunteers: number;
  pendingApplications: number;
  totalHours: number;
  newThisMonth: number;
  retentionRate: number;
}

interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  experience: string;
}

interface ActiveVolunteer {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  hoursCompleted: number;
  status: 'active' | 'inactive' | 'on-leave';
  lastActivity: string;
}

export default function AdminVolunteerPage() {
  const [stats, setStats] = useState<VolunteerStats>({
    totalVolunteers: 245,
    activeVolunteers: 198,
    pendingApplications: 12,
    totalHours: 8750,
    newThisMonth: 15,
    retentionRate: 87
  });

  const [applications, setApplications] = useState<VolunteerApplication[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      role: 'Event Coordinator',
      status: 'pending',
      appliedDate: '2024-01-15',
      experience: '2 years in event planning'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 987-6543',
      role: 'Community Outreach',
      status: 'pending',
      appliedDate: '2024-01-14',
      experience: 'Previous volunteer experience with local NGO'
    }
  ]);

  const [activeVolunteers, setActiveVolunteers] = useState<ActiveVolunteer[]>([
    {
      id: '1',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      role: 'Team Leader',
      joinDate: '2023-06-15',
      hoursCompleted: 120,
      status: 'active',
      lastActivity: '2024-01-12'
    },
    {
      id: '2',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      role: 'Fundraising',
      joinDate: '2023-08-20',
      hoursCompleted: 85,
      status: 'active',
      lastActivity: '2024-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleApproveApplication = (id: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'approved' as const } : app
      )
    );
  };

  const handleRejectApplication = (id: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'rejected' as const } : app
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-leave': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Management</h1>
        <p className="text-gray-600">Manage volunteers, applications, and volunteer programs</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volunteers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVolunteers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeVolunteers}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Applications</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalHours.toLocaleString()}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.newThisMonth}</p>
            </div>
            <UserPlus className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.retentionRate}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/volunteer/applications" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <UserPlus className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Applications</h3>
              <p className="text-sm text-gray-600">Review new volunteer applications</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteer/roles" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Volunteer Roles</h3>
              <p className="text-sm text-gray-600">Manage volunteer positions</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteer/schedules" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <Calendar className="h-10 w-10 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Schedules</h3>
              <p className="text-sm text-gray-600">Manage volunteer schedules</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteer/training" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-10 w-10 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Training</h3>
              <p className="text-sm text-gray-600">Manage training programs</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Pending Applications */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Pending Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.email}</div>
                    <div className="text-sm text-gray-500">{application.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleApproveApplication(application.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleRejectApplication(application.id)}
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

      {/* Active Volunteers */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Active Volunteers</h2>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search volunteers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeVolunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                    <div className="text-sm text-gray-500">{volunteer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(volunteer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volunteer.hoursCompleted}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(volunteer.status)}`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(volunteer.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Management Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/volunteer/rewards" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <Award className="h-8 w-8 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Rewards & Recognition</h3>
              <p className="text-sm text-gray-600">Manage volunteer rewards program</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteer/communications" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Communications</h3>
              <p className="text-sm text-gray-600">Send messages to volunteers</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteer/reports" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <BarChart3 className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
              <p className="text-sm text-gray-600">View volunteer engagement metrics</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}