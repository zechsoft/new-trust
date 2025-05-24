'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Clock,
  MapPin,
  Users,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  AlertCircle,
  Heart,
  Award,
  CheckCircle
} from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';

interface VolunteerOpportunity {
  id: number;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  timeCommitment: string;
  location: string;
  spotsAvailable: number;
  currentVolunteers: number;
  skillsRequired: string[];
  benefits: string[];
  visible: boolean;
  urgent: boolean;
  remote: boolean;
  icon: string;
  color: string;
}

export default function VolunteerOpportunitiesManagement() {
  const [mounted, setMounted] = useState(false);
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([
    {
      id: 1,
      title: 'Community Outreach Coordinator',
      category: 'Leadership',
      description: 'Help coordinate community events and outreach programs to expand our impact.',
      requirements: ['Strong communication skills', 'Event planning experience', 'Available weekends'],
      timeCommitment: '10-15 hours/week',
      location: 'Main Office + Field Work',
      spotsAvailable: 3,
      currentVolunteers: 1,
      skillsRequired: ['Communication', 'Organization', 'Leadership'],
      benefits: ['Leadership experience', 'Networking opportunities', 'Certificate of service'],
      visible: true,
      urgent: true,
      remote: false,
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Social Media Manager',
      category: 'Marketing',
      description: 'Manage our social media presence and create engaging content to raise awareness.',
      requirements: ['Social media experience', 'Creative skills', 'Basic design knowledge'],
      timeCommitment: '5-8 hours/week',
      location: 'Remote',
      spotsAvailable: 2,
      currentVolunteers: 0,
      skillsRequired: ['Social Media', 'Content Creation', 'Design'],
      benefits: ['Portfolio building', 'Marketing experience', 'Flexible schedule'],
      visible: true,
      urgent: false,
      remote: true,
      icon: '📱',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Youth Mentor',
      category: 'Education',
      description: 'Provide guidance and support to underprivileged youth in our after-school programs.',
      requirements: ['Background check', 'Good with children', 'Reliable schedule'],
      timeCommitment: '4-6 hours/week',
      location: 'Community Centers',
      spotsAvailable: 8,
      currentVolunteers: 5,
      skillsRequired: ['Mentoring', 'Patience', 'Communication'],
      benefits: ['Personal fulfillment', 'Skill development', 'Community impact'],
      visible: true,
      urgent: false,
      remote: false,
      icon: '🎓',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Healthcare Support Volunteer',
      category: 'Healthcare',
      description: 'Assist with basic health screenings and provide support at mobile clinics.',
      requirements: ['Medical background preferred', 'First aid certification', 'Physical fitness'],
      timeCommitment: '6-8 hours/week',
      location: 'Mobile Clinics',
      spotsAvailable: 5,
      currentVolunteers: 3,
      skillsRequired: ['Healthcare', 'First Aid', 'Compassion'],
      benefits: ['Medical experience', 'Skill enhancement', 'Direct impact'],
      visible: true,
      urgent: true,
      remote: false,
      icon: '🏥',
      color: 'bg-red-500'
    }
  ]);

  const [sectionSettings, setSectionSettings] = useState({
    sectionVisible: true,
    sectionTitle: 'Volunteer Opportunities',
    sectionSubtitle: 'Join our mission to make a difference',
    showApplicationForm: true,
    requireRegistration: true,
    highlightUrgent: true,
    showSkillsRequired: true,
    showBenefits: true
  });

  const [editingOpportunity, setEditingOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const categories = ['Leadership', 'Marketing', 'Education', 'Healthcare', 'Technology', 'Operations', 'Fundraising'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleOpportunityVisibility = (opportunityId: number) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, visible: !opp.visible }
        : opp
    ));
    setHasChanges(true);
  };

  const handleToggleUrgent = (opportunityId: number) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, urgent: !opp.urgent }
        : opp
    ));
    setHasChanges(true);
  };

  const handleDeleteOpportunity = (opportunityId: number) => {
    if (confirm('Are you sure you want to delete this volunteer opportunity?')) {
      setOpportunities(opportunities.filter(opp => opp.id !== opportunityId));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes...', { opportunities, sectionSettings });
    setHasChanges(false);
  };

  const handleResetChanges = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setHasChanges(false);
    }
  };

  const getAvailabilityStatus = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    if (percentage >= 90) return { status: 'Full', color: 'text-red-600' };
    if (percentage >= 70) return { status: 'Almost Full', color: 'text-yellow-600' };
    return { status: 'Available', color: 'text-green-600' };
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Volunteer Opportunities Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage volunteer positions and opportunities
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
            Add Opportunity
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
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
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
                  checked={sectionSettings.showApplicationForm}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, showApplicationForm: e.target.checked});
                    setHasChanges(true);
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Show application form
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.requireRegistration}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, requireRegistration: e.target.checked});
                    setHasChanges(true);
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Require user registration
                </span>
              </label>
            </div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.highlightUrgent}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, highlightUrgent: e.target.checked});
                    setHasChanges(true);
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Highlight urgent positions
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.showSkillsRequired}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, showSkillsRequired: e.target.checked});
                    setHasChanges(true);
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Show required skills
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.showBenefits}
                  onChange={(e) => {
                    setSectionSettings({...sectionSettings, showBenefits: e.target.checked});
                    setHasChanges(true);
                  }}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Show volunteer benefits
                </span>
              </label>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{opportunities.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Opportunities</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {opportunities.filter(o => o.visible).length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Active Positions</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-red-600">
              {opportunities.filter(o => o.urgent).length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Urgent Positions</div>
          </div>
        </AdminCard>
        <AdminCard>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {opportunities.reduce((sum, o) => sum + o.currentVolunteers, 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Current Volunteers</div>
          </div>
        </AdminCard>
      </div>

      {/* Opportunities List */}
      <AdminCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Volunteer Opportunities ({opportunities.length})
          </h3>
          <div className="space-y-4">
            {opportunities.map((opportunity) => {
              const availability = getAvailabilityStatus(opportunity.currentVolunteers, opportunity.spotsAvailable);
              return (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    opportunity.urgent 
                      ? 'border-red-200 dark:border-red-800 bg-red-50/20 dark:bg-red-900/10' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <div className={`w-12 h-12 ${opportunity.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                        {opportunity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                            {opportunity.title}
                          </h4>
                          {opportunity.urgent && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full">
                              URGENT
                            </span>
                          )}
                          {opportunity.remote && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
                              REMOTE
                            </span>
                          )}
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full">
                            {opportunity.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {opportunity.timeCommitment}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {opportunity.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span className={availability.color}>
                              {opportunity.currentVolunteers}/{opportunity.spotsAvailable} filled
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {opportunity.description}
                        </p>
                        
                        {/* Skills Required */}
                        <div className="mb-3">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                            SKILLS REQUIRED:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.skillsRequired.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="mb-3">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                            BENEFITS:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.benefits.map((benefit, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Requirements */}
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                            REQUIREMENTS:
                          </span>
                          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                            {opportunity.requirements.map((req, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleUrgent(opportunity.id)}
                        className={`p-2 rounded-md ${
                          opportunity.urgent
                            ? 'text-red-600 bg-red-100 dark:bg-red-900/20'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                        title="Toggle Urgent Status"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleOpportunityVisibility(opportunity.id)}
                        className={`p-2 rounded-md ${
                          opportunity.visible
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                            : 'text-gray-400 bg-gray-100 dark:bg-gray-800'
                        }`}
                        title="Toggle Visibility"
                      >
                        {opportunity.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditingOpportunity(opportunity)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                        title="Edit Opportunity"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOpportunity(opportunity.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                        title="Delete Opportunity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}