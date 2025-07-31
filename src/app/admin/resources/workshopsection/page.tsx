'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  BarChart3,
  UserPlus,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  PlayCircle,
  Pause,
  MoreVertical,
  Mail,
  Bell,
  FileText,
  Award,
  X,
  Save
} from 'lucide-react';

// Mock data for workshops
const initialWorkshops = [
  {
    id: 1,
    title: 'UPSC Strategy Bootcamp 2024',
    instructor: 'Dr. Rajesh Sharma',
    type: 'upcoming',
    status: 'published',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '3 hours',
    participants: 245,
    maxParticipants: 500,
    price: 0,
    category: 'exam-strategy',
    level: 'Intermediate',
    registrations: 245,
    completions: 0,
    rating: 0,
    revenue: 0
  },
  {
    id: 2,
    title: 'Communication Skills Masterclass',
    instructor: 'Priya Patel',
    type: 'live',
    status: 'live',
    date: '2024-02-10',
    time: '2:00 PM',
    duration: '2.5 hours',
    participants: 156,
    maxParticipants: 300,
    price: 299,
    category: 'soft-skills',
    level: 'Beginner',
    registrations: 156,
    completions: 89,
    rating: 4.8,
    revenue: 46644
  },
  {
    id: 3,
    title: 'AI & Machine Learning Workshop',
    instructor: 'Vikash Kumar',
    type: 'recorded',
    status: 'published',
    date: '2024-02-08',
    time: 'Available Now',
    duration: '4 hours',
    participants: 890,
    maxParticipants: 1000,
    price: 599,
    category: 'tech-talks',
    level: 'Advanced',
    registrations: 890,
    completions: 678,
    rating: 4.9,
    revenue: 533110
  }
];

const initialInstructors = [
  { id: 1, name: 'Dr. Rajesh Sharma', expertise: 'UPSC Expert', workshops: 12, rating: 4.9, status: 'active' },
  { id: 2, name: 'Priya Patel', expertise: 'Soft Skills Coach', workshops: 8, rating: 4.8, status: 'active' },
  { id: 3, name: 'Vikash Kumar', expertise: 'Tech Expert', workshops: 15, rating: 4.9, status: 'active' }
];

const mockStats = [
  { label: 'Total Workshops', value: '156', change: '+12%', icon: Video, color: 'text-blue-500' },
  { label: 'Active Participants', value: '3,450', change: '+8%', icon: Users, color: 'text-green-500' },
  { label: 'This Month Revenue', value: '₹2.4L', change: '+15%', icon: TrendingUp, color: 'text-purple-500' },
  { label: 'Completion Rate', value: '87%', change: '+3%', icon: Award, color: 'text-orange-500' }
];

export default function AdminWorkshopsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [instructors, setInstructors] = useState(initialInstructors);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'workshops', label: 'Workshops', icon: Video },
    { id: 'instructors', label: 'Instructors', icon: UserPlus },
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const categories = ['all', 'exam-strategy', 'soft-skills', 'tech-talks', 'life-coaching'];
  const statuses = ['all', 'draft', 'published', 'live', 'completed', 'cancelled'];

  // Enhanced notification system
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove notification after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Notification Component
  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg border-l-4 animate-slide-in
            ${notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : ''}
            ${notification.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' : ''}
            ${notification.type === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' : ''}
          `}
          style={{
            animation: 'slideInRight 0.3s ease-out'
          }}
        >
          <div className="flex-shrink-0">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
            {notification.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
          </div>
          <span className="font-medium flex-1">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  // Filter workshops based on search and filters
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || workshop.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Workshop CRUD operations
  const handleDeleteWorkshop = (id) => {
    // Use browser confirmation only on client side
    const confirmDelete = typeof window !== 'undefined' 
      ? window.confirm('Are you sure you want to delete this workshop? This action cannot be undone.')
      : true;
      
    if (confirmDelete) {
      setWorkshops(workshops.filter(w => w.id !== id));
      showNotification('Workshop deleted successfully!', 'success');
    }
  };

  const handleToggleWorkshopStatus = (id) => {
    setWorkshops(workshops.map(w => {
      if (w.id === id) {
        const newStatus = w.status === 'live' ? 'published' : 'live';
        showNotification(`Workshop ${newStatus === 'live' ? 'started' : 'stopped'} successfully!`, 'info');
        return { ...w, status: newStatus };
      }
      return w;
    }));
  };

  const handleCreateWorkshop = () => {
    setModalType('create-workshop');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditWorkshop = (workshop) => {
    setModalType('edit-workshop');
    setSelectedItem(workshop);
    setShowModal(true);
  };

  const handleViewWorkshop = (workshop) => {
    setModalType('view-workshop');
    setSelectedItem(workshop);
    setShowModal(true);
  };

  // Instructor operations
  const handleAddInstructor = () => {
    setModalType('add-instructor');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditInstructor = (instructor) => {
    setModalType('edit-instructor');
    setSelectedItem(instructor);
    setShowModal(true);
  };

  const handleDeleteInstructor = (id) => {
    // Use browser confirmation only on client side
    const confirmDelete = typeof window !== 'undefined' 
      ? window.confirm('Are you sure you want to remove this instructor? This action cannot be undone.')
      : true;
      
    if (confirmDelete) {
      setInstructors(instructors.filter(i => i.id !== id));
      showNotification('Instructor removed successfully!', 'success');
    }
  };

  // Export data function
  const handleExportData = () => {
    try {
      const data = {
        workshops: filteredWorkshops,
        instructors,
        exportDate: new Date().toISOString(),
        totalRevenue: workshops.reduce((sum, w) => sum + w.revenue, 0),
        totalParticipants: workshops.reduce((sum, w) => sum + w.participants, 0)
      };
      
      // Check if we're in browser environment
      if (typeof window !== 'undefined') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `workshop-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Data exported successfully! Check your downloads folder.', 'success');
      } else {
        showNotification('Export not available on server side.', 'error');
      }
    } catch (error) {
      showNotification('Export failed. Please try again.', 'error');
    }
  };

  // Bulk operations
  const handleBulkAction = (action) => {
    switch (action) {
      case 'export-workshops':
        handleExportData();
        break;
      case 'backup-data':
        showNotification('Data backup initiated. You will be notified when complete.', 'info');
        setTimeout(() => {
          showNotification('Data backup completed successfully!', 'success');
        }, 2000);
        break;
      case 'sync-data':
        showNotification('Syncing data with server...', 'info');
        setTimeout(() => {
          showNotification('Data synchronized successfully!', 'success');
        }, 1500);
        break;
      default:
        showNotification('Action completed!', 'info');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Modal Component
  const Modal = ({ children }) => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-semibold">
              {modalType === 'create-workshop' && 'Create New Workshop'}
              {modalType === 'edit-workshop' && 'Edit Workshop'}
              {modalType === 'view-workshop' && 'Workshop Details'}
              {modalType === 'add-instructor' && 'Add New Instructor'}
              {modalType === 'edit-instructor' && 'Edit Instructor'}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Workshop Form Component
  const WorkshopForm = ({ workshop = null, isView = false }) => {
    const [formData, setFormData] = useState({
      title: workshop?.title || '',
      instructor: workshop?.instructor || '',
      date: workshop?.date || '',
      time: workshop?.time || '',
      duration: workshop?.duration || '',
      maxParticipants: workshop?.maxParticipants || 100,
      price: workshop?.price || 0,
      category: workshop?.category || 'exam-strategy',
      level: workshop?.level || 'Beginner',
      status: workshop?.status || 'draft'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        if (workshop) {
          // Edit existing workshop
          setWorkshops(workshops.map(w => w.id === workshop.id ? { ...w, ...formData } : w));
          showNotification('Workshop updated successfully!', 'success');
        } else {
          // Create new workshop
          const newWorkshop = {
            ...formData,
            id: Date.now(),
            participants: 0,
            registrations: 0,
            completions: 0,
            rating: 0,
            revenue: 0,
            type: 'upcoming'
          };
          setWorkshops([...workshops, newWorkshop]);
          showNotification('Workshop created successfully!', 'success');
        }
        setShowModal(false);
      } catch (error) {
        showNotification('Operation failed. Please check your inputs and try again.', 'error');
      }
    };

    if (isView) {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <p className="mt-1 text-sm text-gray-900">{workshop?.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instructor</label>
              <p className="mt-1 text-sm text-gray-900">{workshop?.instructor}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <p className="mt-1 text-sm text-gray-900">{workshop?.date} at {workshop?.time}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <p className="mt-1 text-sm text-gray-900">{workshop?.duration}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Participants</label>
              <p className="mt-1 text-sm text-gray-900">{workshop?.participants}/{workshop?.maxParticipants}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Revenue</label>
              <p className="mt-1 text-sm text-gray-900">₹{workshop?.revenue?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Instructor</label>
            <input
              type="text"
              required
              value={formData.instructor}
              onChange={(e) => setFormData({...formData, instructor: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g., 2 hours"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Participants</label>
            <input
              type="number"
              required
              min="1"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {statuses.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            {workshop ? 'Update' : 'Create'} Workshop
          </button>
        </div>
      </form>
    );
  };

  // Instructor Form Component
  const InstructorForm = ({ instructor = null }) => {
    const [formData, setFormData] = useState({
      name: instructor?.name || '',
      expertise: instructor?.expertise || '',
      status: instructor?.status || 'active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        if (instructor) {
          // Edit existing instructor
          setInstructors(instructors.map(i => i.id === instructor.id ? { ...i, ...formData } : i));
          showNotification('Instructor updated successfully!', 'success');
        } else {
          // Add new instructor
          const newInstructor = {
            ...formData,
            id: Date.now(),
            workshops: 0,
            rating: 0
          };
          setInstructors([...instructors, newInstructor]);
          showNotification('Instructor added successfully!', 'success');
        }
        setShowModal(false);
      } catch (error) {
        showNotification('Operation failed. Please check your inputs and try again.', 'error');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expertise</label>
          <input
            type="text"
            required
            value={formData.expertise}
            onChange={(e) => setFormData({...formData, expertise: e.target.value})}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            {instructor ? 'Update' : 'Add'} Instructor
          </button>
        </div>
      </form>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={handleCreateWorkshop}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-600">New Workshop</span>
          </button>
          <button 
            onClick={handleAddInstructor}
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <UserPlus className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-600">Add Instructor</span>
          </button>
          <button 
            onClick={() => setActiveSection('workshops')}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Calendar className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-600">View All Workshops</span>
          </button>
          <button 
            onClick={() => handleBulkAction('backup-data')}
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-600">Backup Data</span>
          </button>
        </div>
      </div>

      {/* Live Workshops */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Live Workshops</h3>
          <button 
            onClick={() => setActiveSection('workshops')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {workshops.filter(w => w.status === 'live').map((workshop) => (
            <div key={workshop.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-800">{workshop.title}</p>
                  <p className="text-sm text-gray-600">{workshop.participants} participants</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleViewWorkshop(workshop)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                >
                  Monitor
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-800">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {workshops.filter(w => w.status === 'live').length === 0 && (
            <p className="text-gray-500 text-center py-4">No live workshops at the moment</p>
          )}
        </div>
      </div>

      {/* Upcoming Workshops */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming This Week</h3>
        <div className="space-y-3">
          {workshops.filter(w => w.type === 'upcoming').map((workshop) => (
            <div key={workshop.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{workshop.title}</p>
                <p className="text-sm text-gray-600">{workshop.date} at {workshop.time}</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">{workshop.registrations} registered</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkshops = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Workshops Management</h2>
        <button 
          onClick={handleCreateWorkshop}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Workshop
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status === 'all' ? 'All Status' : status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Workshops Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Workshop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredWorkshops.map((workshop) => (
                <tr key={workshop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{workshop.title}</div>
                      <div className="text-sm text-gray-500">{workshop.category} • {workshop.level}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{workshop.instructor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{workshop.date}</div>
                    <div className="text-sm text-gray-500">{workshop.time} • {workshop.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{workshop.participants}/{workshop.maxParticipants}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(workshop.participants / workshop.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(workshop.status)}`}>
                      {workshop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">₹{workshop.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewWorkshop(workshop)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditWorkshop(workshop)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Edit Workshop"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleWorkshopStatus(workshop.id)}
                        className="p-1 text-orange-600 hover:bg-orange-100 rounded"
                        title={workshop.status === 'live' ? 'Stop Workshop' : 'Start Workshop'}
                      >
                        {workshop.status === 'live' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <PlayCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button 
                        onClick={() => handleDeleteWorkshop(workshop.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete Workshop"
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
        {filteredWorkshops.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No workshops found matching your criteria
          </div>
        )}
      </div>
    </div>
  );

  const renderInstructors = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Instructors Management</h2>
        <button 
          onClick={handleAddInstructor}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add Instructor
        </button>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {instructor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{instructor.name}</h3>
                <p className="text-sm text-gray-600">{instructor.expertise}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Workshops:</span>
                <span className="text-sm font-medium">{instructor.workshops}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rating:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{instructor.rating || 'N/A'}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`text-sm font-medium ${instructor.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {instructor.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleEditInstructor(instructor)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteInstructor(instructor.id)}
                className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
      
      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Interactive Revenue Chart</p>
            <p className="text-sm text-gray-400">Total Revenue: ₹{workshops.reduce((sum, w) => sum + w.revenue, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Participant Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Participant Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completion Rate</span>
              <span className="font-medium">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Rating</span>
              <span className="font-medium">4.7/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Repeat Attendees</span>
              <span className="font-medium">64%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Participants</span>
              <span className="font-medium">{workshops.reduce((sum, w) => sum + w.participants, 0)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Categories</h3>
          <div className="space-y-3">
            {categories.filter(c => c !== 'all').map(category => {
              const categoryWorkshops = workshops.filter(w => w.category === category);
              const percentage = workshops.length > 0 ? ((categoryWorkshops.length / workshops.length) * 100).toFixed(0) : 0;
              return (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{category.replace('-', ' ')}</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'workshops':
        return renderWorkshops();
      case 'instructors':
        return renderInstructors();
      case 'participants':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Participants Management</h3>
            <p className="text-gray-600 mb-4">Manage workshop participants, registrations, and communications</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Total Participants</h4>
                <p className="text-2xl font-bold text-blue-600">{workshops.reduce((sum, w) => sum + w.participants, 0)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Active Registrations</h4>
                <p className="text-2xl font-bold text-green-600">{workshops.reduce((sum, w) => sum + w.registrations, 0)}</p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Workshop Settings</h3>
            <p className="text-gray-600 mb-6">Configure workshop settings, notifications, and integrations</p>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Email Notifications</span>
                <button 
                  onClick={() => showNotification('Email notifications enabled!', 'success')}
                  className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors hover:bg-blue-700"
                >
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Auto-Backup Data</span>
                <button 
                  onClick={() => showNotification('Auto-backup enabled! Data will be backed up daily.', 'info')}
                  className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors hover:bg-blue-700"
                >
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Workshop Reminders</span>
                <button 
                  onClick={() => showNotification('Workshop reminders disabled!', 'warning')}
                  className="w-12 h-6 bg-gray-300 rounded-full relative transition-colors hover:bg-gray-400"
                >
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                </button>
              </div>
              <div className="mt-6 pt-4 border-t">
                <button 
                  onClick={() => showNotification('All settings saved successfully!', 'success')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Notification Container */}
      <NotificationContainer />

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workshops Management</h1>
              <p className="text-gray-600">Manage workshops, instructors, and participant engagement</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleBulkAction('export-workshops')}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2 inline" />
                Export Data
              </button>
              <button 
                onClick={() => handleBulkAction('sync-data')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Bell className="w-4 h-4 mr-2 inline" />
                Sync Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderSection()}
        </div>
      </div>

      {/* Modal */}
      <Modal>
        {modalType === 'create-workshop' && <WorkshopForm />}
        {modalType === 'edit-workshop' && <WorkshopForm workshop={selectedItem} />}
        {modalType === 'view-workshop' && <WorkshopForm workshop={selectedItem} isView={true} />}
        {modalType === 'add-instructor' && <InstructorForm />}
        {modalType === 'edit-instructor' && <InstructorForm instructor={selectedItem} />}
      </Modal>
    </div>
  );
}