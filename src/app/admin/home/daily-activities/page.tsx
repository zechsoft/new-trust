'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  AlertCircle,
  Activity
} from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';

interface DailyActivity {
  id: number;
  title: string;
  time: string;
  location: string;
  description: string;
  days: string[];
  visible: boolean;
  volunteers: number;
  beneficiaries: number;
  icon: string;
  color: string;
}

export default function DailyActivitiesManagement() {
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState<DailyActivity[]>([
    {
      id: 1,
      title: 'Food Distribution',
      time: 'Daily, 12:00 PM - 2:00 PM',
      location: 'Various Community Centers',
      description: 'Our volunteers distribute nutritious meals to those in need across the city.',
      days: ['Monday', 'Wednesday', 'Friday'],
      visible: true,
      volunteers: 25,
      beneficiaries: 150,
      icon: '🍽️',
      color: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'After-School Learning Program',
      time: 'Weekdays, 3:30 PM - 5:30 PM',
      location: 'Community Education Centers',
      description: 'Providing tutoring and enrichment activities for underprivileged children.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      visible: true,
      volunteers: 15,
      beneficiaries: 80,
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Senior Care Visits',
      time: 'Daily, 10:00 AM - 12:00 PM',
      location: 'Various Senior Living Facilities',
      description: 'Volunteers provide companionship and assistance to elderly individuals.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      visible: true,
      volunteers: 20,
      beneficiaries: 60,
      icon: '👴',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Free Medical Checkups',
      time: '9:00 AM - 1:00 PM',
      location: 'Mobile Health Clinics',
      description: 'Providing basic health screenings and consultations in underserved areas.',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      visible: true,
      volunteers: 12,
      beneficiaries: 100,
      icon: '🏥',
      color: 'bg-red-500'
    }
  ]);

  const [sectionSettings, setSectionSettings] = useState({
    sectionVisible: true,
    sectionTitle: 'Daily Activities',
    sectionSubtitle: 'Our ongoing commitment to the community',
    showSchedule: true,
    showVolunteerCount: true,
    showBeneficiaryCount: true
  });

  const [editingActivity, setEditingActivity] = useState<DailyActivity | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleActivityVisibility = (activityId: number) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, visible: !activity.visible }
        : activity
    ));
    setHasChanges(true);
  };

  const handleDeleteActivity = (activityId: number) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter(activity => activity.id !== activityId));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...', { activities, sectionSettings });
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setHasChanges(false);
    }
  };

  const getDayAbbreviation = (day: string) => {
    return day.substring(0, 3).toUpperCase();
  };

  const getActivityFrequency = (days: string[]) => {
    if (days.length === 7) return 'Daily';
    if (days.length === 5 && !days.includes('Saturday') && !days.includes('Sunday')) return 'Weekdays';
    if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) return 'Weekends';
    return `${days.length} days/week`;
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Daily Activities Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage regular ongoing activities and programs
          </p>
        </div>
        <div className="flex space-x-3">
          {hasChanges && (
            <>
              <button
                onClick={handleResetChanges}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
              <button
                onClick={handleSaveChanges}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">
              You have unsaved changes. Don't forget to save your work!
            </span>
          </div>
        </div>
      )}

      {/* Section Settings */}
      <AdminCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Section Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={sectionSettings.sectionTitle}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, sectionTitle: e.target.value});
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={sectionSettings.sectionSubtitle}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, sectionSubtitle: e.target.value});
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sectionSettings.sectionVisible}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, sectionVisible: e.target.checked});
                  setHasChanges(true);
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show section on homepage
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sectionSettings.showSchedule}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, showSchedule: e.target.checked});
                  setHasChanges(true);
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show activity schedule
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sectionSettings.showVolunteerCount}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, showVolunteerCount: e.target.checked});
                  setHasChanges(true);
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show volunteer count
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sectionSettings.showBeneficiaryCount}
                onChange={(e) => {
                  setSectionSettings({...sectionSettings, showBeneficiaryCount: e.target.checked});
                  setHasChanges(true);
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show beneficiary count
              </span>
            </label>
          </div>
        </div>
      </AdminCard>

      {/* Activities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{activities.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Activities</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {activities.filter(a => a.visible).length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Activities</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {activities.reduce((sum, a) => sum + a.volunteers, 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Volunteers</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">
              {activities.reduce((sum, a) => sum + a.beneficiaries, 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">People Served</div>
          </div>
        </AdminCard>
      </div>

      {/* Activities List */}
      <AdminCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Activities ({activities.length})
          </h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {activity.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {getActivityFrequency(activity.days)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SCHEDULE:</span>
                          <div className="flex space-x-1">
                            {daysOfWeek.map(day => (
                              <span
                                key={day}
                                className={`px-1.5 py-0.5 text-xs rounded ${
                                  activity.days.includes(day)
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                }`}
                              >
                                {getDayAbbreviation(day)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm mt-3">
                        <div className="flex items-center text-blue-600 dark:text-blue-400">
                          <Users className="w-4 h-4 mr-1" />
                          {activity.volunteers} volunteers
                        </div>
                        <div className="flex items-center text-green-600 dark:text-green-400">
                          <Activity className="w-4 h-4 mr-1" />
                          {activity.beneficiaries} beneficiaries
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActivityVisibility(activity.id)}
                      className={`p-2 rounded-md ${
                        activity.visible
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                          : 'text-gray-400 bg-gray-100 dark:bg-gray-800'
                      }`}
                      title="Toggle Visibility"
                    >
                      {activity.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setEditingActivity(activity)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                      title="Edit Activity"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                      title="Delete Activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}