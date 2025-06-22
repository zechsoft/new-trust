'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Award, 
  Heart,
  TrendingUp,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  Calendar,
  Target,
  Settings,
  Download,
  Upload
} from 'lucide-react';

interface ImpactStats {
  volunteersThisMonth: number;
  totalHours: number;
  projects: number;
  livesImpacted: number;
}

interface TopVolunteer {
  id: string;
  name: string;
  hours: number;
  badge: string;
  image: string;
  status: 'active' | 'inactive';
  joinDate: string;
  email: string;
}

interface ImpactGoal {
  id: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  deadline: string;
  status: 'on-track' | 'behind' | 'achieved';
}

export default function AdminImpactTrackerPage() {
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    volunteersThisMonth: 230,
    totalHours: 10645,
    projects: 52,
    livesImpacted: 5280
  });

  const [editingStats, setEditingStats] = useState(false);
  const [tempStats, setTempStats] = useState<ImpactStats>(impactStats);

  const [topVolunteers, setTopVolunteers] = useState<TopVolunteer[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      hours: 143,
      badge: 'Community Hero',
      image: '/avatars/volunteer-1.jpg',
      status: 'active',
      joinDate: '2023-06-15',
      email: 'sarah.j@email.com'
    },
    {
      id: '2',
      name: 'Michael Chen',
      hours: 126,
      badge: 'Teacher',
      image: '/avatars/volunteer-2.jpg',
      status: 'active',
      joinDate: '2023-07-20',
      email: 'michael.c@email.com'
    },
    {
      id: '3',
      name: 'Aisha Patel',
      hours: 118,
      badge: 'Environmental Champion',
      image: '/avatars/volunteer-3.jpg',
      status: 'active',
      joinDate: '2023-08-10',
      email: 'aisha.p@email.com'
    },
    {
      id: '4',
      name: 'David Wilson',
      hours: 107,
      badge: 'Mentor',
      image: '/avatars/volunteer-4.jpg',
      status: 'active',
      joinDate: '2023-09-05',
      email: 'david.w@email.com'
    }
  ]);

  const [goals, setGoals] = useState<ImpactGoal[]>([
    {
      id: '1',
      metric: 'Volunteers This Month',
      currentValue: 230,
      targetValue: 300,
      deadline: '2025-06-30',
      status: 'on-track'
    },
    {
      id: '2',
      metric: 'Total Hours',
      currentValue: 10645,
      targetValue: 15000,
      deadline: '2025-12-31',
      status: 'on-track'
    },
    {
      id: '3',
      metric: 'Active Projects',
      currentValue: 52,
      targetValue: 75,
      deadline: '2025-09-30',
      status: 'behind'
    },
    {
      id: '4',
      metric: 'Lives Impacted',
      currentValue: 5280,
      targetValue: 10000,
      deadline: '2025-12-31',
      status: 'on-track'
    }
  ]);

  const [editingVolunteer, setEditingVolunteer] = useState<string | null>(null);
  const [newVolunteer, setNewVolunteer] = useState<Partial<TopVolunteer>>({});
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);

  const handleStatsUpdate = () => {
    setImpactStats(tempStats);
    setEditingStats(false);
  };

  const handleStatsCancelEdit = () => {
    setTempStats(impactStats);
    setEditingStats(false);
  };

  const handleVolunteerUpdate = (id: string, updatedVolunteer: Partial<TopVolunteer>) => {
    setTopVolunteers(prev => 
      prev.map(vol => 
        vol.id === id ? { ...vol, ...updatedVolunteer } : vol
      )
    );
    setEditingVolunteer(null);
  };

  const handleAddVolunteer = () => {
    if (newVolunteer.name && newVolunteer.hours && newVolunteer.badge && newVolunteer.email) {
      const volunteer: TopVolunteer = {
        id: Date.now().toString(),
        name: newVolunteer.name,
        hours: newVolunteer.hours,
        badge: newVolunteer.badge,
        email: newVolunteer.email,
        image: '/avatars/default-volunteer.jpg',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setTopVolunteers(prev => [...prev, volunteer]);
      setNewVolunteer({});
      setShowAddVolunteer(false);
    }
  };

  const handleDeleteVolunteer = (id: string) => {
    setTopVolunteers(prev => prev.filter(vol => vol.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'behind': return 'bg-red-100 text-red-800';
      case 'achieved': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Tracker Management</h1>
            <p className="text-gray-600">Manage and monitor community impact metrics</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Impact Stats Management */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Live Impact Statistics</h2>
          {!editingStats ? (
            <button 
              onClick={() => setEditingStats(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Stats</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleStatsUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button 
                onClick={handleStatsCancelEdit}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-3">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-700">New Volunteers</h3>
            </div>
            {editingStats ? (
              <input
                type="number"
                value={tempStats.volunteersThisMonth}
                onChange={(e) => setTempStats({...tempStats, volunteersThisMonth: parseInt(e.target.value) || 0})}
                className="text-3xl font-bold text-blue-600 bg-transparent border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 w-full"
              />
            ) : (
              <p className="text-4xl font-bold text-blue-600">{impactStats.volunteersThisMonth}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
            <div className="flex items-center mb-3">
              <Clock className="h-6 w-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-700">Hours Logged</h3>
            </div>
            {editingStats ? (
              <input
                type="number"
                value={tempStats.totalHours}
                onChange={(e) => setTempStats({...tempStats, totalHours: parseInt(e.target.value) || 0})}
                className="text-3xl font-bold text-purple-600 bg-transparent border-b-2 border-purple-300 focus:outline-none focus:border-purple-500 w-full"
              />
            ) : (
              <p className="text-4xl font-bold text-purple-600">{impactStats.totalHours.toLocaleString()}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Total hours</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-3">
              <Target className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-700">Active Projects</h3>
            </div>
            {editingStats ? (
              <input
                type="number"
                value={tempStats.projects}
                onChange={(e) => setTempStats({...tempStats, projects: parseInt(e.target.value) || 0})}
                className="text-3xl font-bold text-green-600 bg-transparent border-b-2 border-green-300 focus:outline-none focus:border-green-500 w-full"
              />
            ) : (
              <p className="text-4xl font-bold text-green-600">{impactStats.projects}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Ongoing initiatives</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
            <div className="flex items-center mb-3">
              <Heart className="h-6 w-6 text-amber-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-700">Lives Impacted</h3>
            </div>
            {editingStats ? (
              <input
                type="number"
                value={tempStats.livesImpacted}
                onChange={(e) => setTempStats({...tempStats, livesImpacted: parseInt(e.target.value) || 0})}
                className="text-3xl font-bold text-amber-600 bg-transparent border-b-2 border-amber-300 focus:outline-none focus:border-amber-500 w-full"
              />
            ) : (
              <p className="text-4xl font-bold text-amber-600">{impactStats.livesImpacted.toLocaleString()}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">People helped</p>
          </div>
        </div>
      </div>

      {/* Impact Goals Tracking */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Impact Goals & Targets</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{goal.metric}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{goal.currentValue.toLocaleString()}</span>
                    <span>{goal.targetValue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${goal.status === 'on-track' ? 'bg-green-500' : goal.status === 'behind' ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${calculateProgress(goal.currentValue, goal.targetValue)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                  <span>{Math.round(calculateProgress(goal.currentValue, goal.targetValue))}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Volunteers Management */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Top Volunteers Management</h2>
          <button 
            onClick={() => setShowAddVolunteer(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Volunteer</span>
          </button>
        </div>

        {/* Add New Volunteer Form */}
        {showAddVolunteer && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Add New Top Volunteer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newVolunteer.name || ''}
                onChange={(e) => setNewVolunteer({...newVolunteer, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newVolunteer.email || ''}
                onChange={(e) => setNewVolunteer({...newVolunteer, email: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Hours"
                value={newVolunteer.hours || ''}
                onChange={(e) => setNewVolunteer({...newVolunteer, hours: parseInt(e.target.value) || 0})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Badge"
                value={newVolunteer.badge || ''}
                onChange={(e) => setNewVolunteer({...newVolunteer, badge: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={handleAddVolunteer}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Volunteer
              </button>
              <button 
                onClick={() => {setShowAddVolunteer(false); setNewVolunteer({});}}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volunteer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badge</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topVolunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        {editingVolunteer === volunteer.id ? (
                          <input
                            type="text"
                            defaultValue={volunteer.name}
                            onBlur={(e) => handleVolunteerUpdate(volunteer.id, {name: e.target.value})}
                            className="text-sm font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        )}
                        <div className="text-sm text-gray-500">{volunteer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingVolunteer === volunteer.id ? (
                      <input
                        type="number"
                        defaultValue={volunteer.hours}
                        onBlur={(e) => handleVolunteerUpdate(volunteer.id, {hours: parseInt(e.target.value)})}
                        className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-20"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{volunteer.hours}h</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingVolunteer === volunteer.id ? (
                      <input
                        type="text"
                        defaultValue={volunteer.badge}
                        onBlur={(e) => handleVolunteerUpdate(volunteer.id, {badge: e.target.value})}
                        className="text-sm text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {volunteer.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(volunteer.status)}`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(volunteer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingVolunteer === volunteer.id ? (
                        <button 
                          onClick={() => setEditingVolunteer(null)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditingVolunteer(volunteer.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteVolunteer(volunteer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Rate</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
          <p className="text-sm text-gray-600">+5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg. Hours/Volunteer</h3>
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">46.3</div>
          <p className="text-sm text-gray-600">+2.1 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Impact Score</h3>
            <Award className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">9.2/10</div>
          <p className="text-sm text-gray-600">Excellent performance</p>
        </div>
      </div>
    </div>
  );
}