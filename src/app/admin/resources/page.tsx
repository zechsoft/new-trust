'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  Users,
  Calendar,
  UserPlus,
  Star,
  BarChart3,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  Filter,
  Search,
  X,
  AlertCircle
} from 'lucide-react';

// Mock data for demonstration
const mockStats = [
  { id: 1, label: 'Free Resources', value: '10,000+', icon: BookOpen, color: 'text-blue-500' },
  { id: 2, label: 'Video Lectures', value: '5,000+', icon: Video, color: 'text-green-500' },
  { id: 3, label: 'Active Learners', value: '25,000+', icon: Users, color: 'text-purple-500' },
  { id: 4, label: 'Expert Mentors', value: '500+', icon: Star, color: 'text-orange-500' }
];

const initialEBooks = [
  { id: 1, title: 'UPSC General Studies', category: 'UPSC', downloads: 1250, featured: true },
  { id: 2, title: 'SSC Quantitative Aptitude', category: 'SSC', downloads: 890, featured: false },
  { id: 3, title: 'Banking Awareness Guide', category: 'Bank', downloads: 670, featured: true }
];

const initialVideos = [
  { id: 1, title: 'Constitutional Law Basics', duration: '45:30', views: 3400, category: 'UPSC' },
  { id: 2, title: 'Algebra Fundamentals', duration: '32:15', views: 2100, category: 'SSC' },
  { id: 3, title: 'Current Affairs Weekly', duration: '28:45', views: 5600, category: 'General' }
];

export default function AdminResourcesPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [eBooks, setEBooks] = useState(initialEBooks);
  const [videos, setVideos] = useState(initialVideos);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add-ebook', 'edit-ebook', 'delete-ebook', 'add-video', etc.
  const [currentItem, setCurrentItem] = useState(null);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'ebooks', label: 'E-Books', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'forums', label: 'Forums', icon: MessageCircle },
    { id: 'workshops', label: 'Workshops', icon: Calendar },
    { id: 'mentorship', label: 'Mentorship', icon: UserPlus },
    { id: 'testimonials', label: 'Testimonials', icon: Star }
  ];

  const categories = ['all', 'UPSC', 'SSC', 'RRB', 'Bank', 'TNPSC', 'Coding', 'Life Skills', 'General'];

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Form Component for E-Books
  const EBookForm = ({ book, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: book?.title || '',
      category: book?.category || 'UPSC',
      downloads: book?.downloads || 0,
      featured: book?.featured || false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.filter(cat => cat !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2"
            />
            Featured
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  // CRUD Functions for E-Books
  const handleAddEBook = () => {
    setCurrentItem(null);
    setModalType('add-ebook');
    setShowModal(true);
  };

  const handleEditEBook = (book) => {
    setCurrentItem(book);
    setModalType('edit-ebook');
    setShowModal(true);
  };

  const handleDeleteEBook = (book) => {
    setCurrentItem(book);
    setModalType('delete-ebook');
    setShowModal(true);
  };

  const saveEBook = (formData) => {
    if (modalType === 'add-ebook') {
      const newId = Math.max(...eBooks.map(b => b.id)) + 1;
      setEBooks([...eBooks, { id: newId, ...formData }]);
    } else if (modalType === 'edit-ebook') {
      setEBooks(eBooks.map(book => 
        book.id === currentItem.id ? { ...book, ...formData } : book
      ));
    }
    setShowModal(false);
  };

  const confirmDeleteEBook = () => {
    setEBooks(eBooks.filter(book => book.id !== currentItem.id));
    setShowModal(false);
  };

  // Video Form Component
  const VideoForm = ({ video, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: video?.title || '',
      duration: video?.duration || '',
      category: video?.category || 'UPSC',
      views: video?.views || 0
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            type="text"
            placeholder="e.g., 45:30"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.filter(cat => cat !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    );
  };

  // CRUD Functions for Videos
  const handleAddVideo = () => {
    setCurrentItem(null);
    setModalType('add-video');
    setShowModal(true);
  };

  const handleEditVideo = (video) => {
    setCurrentItem(video);
    setModalType('edit-video');
    setShowModal(true);
  };

  const handleDeleteVideo = (video) => {
    setCurrentItem(video);
    setModalType('delete-video');
    setShowModal(true);
  };

  const saveVideo = (formData) => {
    if (modalType === 'add-video') {
      const newId = Math.max(...videos.map(v => v.id)) + 1;
      setVideos([...videos, { id: newId, ...formData }]);
    } else if (modalType === 'edit-video') {
      setVideos(videos.map(video => 
        video.id === currentItem.id ? { ...video, ...formData } : video
      ));
    }
    setShowModal(false);
  };

  const confirmDeleteVideo = () => {
    setVideos(videos.filter(video => video.id !== currentItem.id));
    setShowModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <motion.div
            key={stat.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <button className="text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.slice(1).map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              <section.icon className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New e-book uploaded', item: 'UPSC History Notes', time: '2 hours ago' },
            { action: 'Video lecture added', item: 'Mathematics Basics', time: '4 hours ago' },
            { action: 'Workshop scheduled', item: 'Interview Preparation', time: '1 day ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEBooks = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">E-Books Management</h2>
        <button 
          onClick={handleAddEBook}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New E-Book
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
                placeholder="Search e-books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* E-Books Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eBooks.filter(book => 
                (selectedCategory === 'all' || book.category === selectedCategory) &&
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="font-medium text-gray-900">{book.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{book.downloads}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      book.featured 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {book.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditEBook(book)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEBook(book)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Video Lectures Management</h2>
        <button 
          onClick={handleAddVideo}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Video
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.filter(video => 
          (selectedCategory === 'all' || video.category === selectedCategory) &&
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((video) => (
          <motion.div
            key={video.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {video.category}
                </span>
                <span>{video.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button 
                  onClick={() => handleEditVideo(video)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'ebooks':
        return renderEBooks();
      case 'videos':
        return renderVideos();
      case 'forums':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Forums Management</h3>
            <p className="text-gray-600">Manage forum categories, posts, and user interactions</p>
          </div>
        );
      case 'workshops':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Workshops Management</h3>
            <p className="text-gray-600">Schedule and manage workshops, sessions, and registrations</p>
          </div>
        );
      case 'mentorship':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mentorship Program</h3>
            <p className="text-gray-600">Manage mentors, mentees, and mentorship sessions</p>
          </div>
        );
      case 'testimonials':
        return (
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Testimonials Management</h3>
            <p className="text-gray-600">Review, approve, and manage user testimonials</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resources Management</h1>
              <p className="text-gray-600">Manage all educational resources and community features</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Analytics
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
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalType === 'add-ebook' ? 'Add New E-Book' :
            modalType === 'edit-ebook' ? 'Edit E-Book' :
            modalType === 'delete-ebook' ? 'Delete E-Book' :
            modalType === 'add-video' ? 'Add New Video' :
            modalType === 'edit-video' ? 'Edit Video' :
            modalType === 'delete-video' ? 'Delete Video' : ''
          }
        >
          {(modalType === 'add-ebook' || modalType === 'edit-ebook') && (
            <EBookForm
              book={currentItem}
              onSave={saveEBook}
              onCancel={() => setShowModal(false)}
            />
          )}
          
          {(modalType === 'add-video' || modalType === 'edit-video') && (
            <VideoForm
              video={currentItem}
              onSave={saveVideo}
              onCancel={() => setShowModal(false)}
            />
          )}
          
          {(modalType === 'delete-ebook' || modalType === 'delete-video') && (
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete "{currentItem?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={modalType === 'delete-ebook' ? confirmDeleteEBook : confirmDeleteVideo}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}