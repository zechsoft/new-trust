'use client';
import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Search,
  Filter,
  Save,
  X,
  Upload,
  ChevronDown,
  MoreVertical,
  Award,
  MapPin,
  Calendar,
  User,
  Quote,
  Check,
  AlertCircle
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  achievement: string;
  quote: string;
  category: string;
  rating: number;
  examYear?: string;
  currentRole?: string;
  featured: boolean;
  status: 'active' | 'pending' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }[type];

  const icon = {
    success: <Check className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />
  }[type];

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 border rounded-lg shadow-lg ${bgColor}`}>
      {icon}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: 'Ranjitha',
      location: 'Tamil Nadu',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2cd?w=80&h=80&fit=crop&crop=face',
      achievement: 'Cleared Group 4 Exams',
      quote: 'Thanks to the free books and study materials, I was able to clear my Group 4 exams on the first attempt. The quality of content is excellent!',
      category: 'TNPSC',
      rating: 5,
      examYear: '2024',
      currentRole: 'Junior Assistant',
      featured: true,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Ajay',
      location: 'Chennai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      achievement: 'Cracked IBPS PO',
      quote: 'Found a mentor who guided me from zero to cracking IBPS! The mentorship program completely transformed my preparation strategy.',
      category: 'Banking',
      rating: 5,
      examYear: '2023',
      currentRole: 'Probationary Officer at SBI',
      featured: true,
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'Neha',
      location: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      achievement: 'Learned Python Programming',
      quote: 'I love the video section. Learning Python was never easier. The step-by-step tutorials helped me land my first tech job!',
      category: 'Programming',
      rating: 5,
      currentRole: 'Software Developer',
      featured: false,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Priyanka Sharma',
      location: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      achievement: 'UPSC Mains Qualified',
      quote: 'The comprehensive study materials and community support helped me qualify for UPSC Mains. The current affairs section is particularly helpful.',
      category: 'UPSC',
      rating: 5,
      examYear: '2024',
      featured: false,
      status: 'pending',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedTestimonials, setSelectedTestimonials] = useState<number[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', 'UPSC', 'SSC', 'RRB', 'Banking', 'TNPSC', 'Programming', 'Entrepreneurship', 'Tech Career'];
  const statuses = ['all', 'active', 'pending', 'draft'];

  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    location: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    achievement: '',
    quote: '',
    category: 'UPSC',
    rating: 5,
    examYear: '',
    currentRole: '',
    featured: false,
    status: 'draft'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const showAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.location?.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!formData.achievement?.trim()) {
      errors.achievement = 'Achievement is required';
    }
    
    if (!formData.quote?.trim()) {
      errors.quote = 'Quote is required';
    } else if (formData.quote.length < 10) {
      errors.quote = 'Quote must be at least 10 characters long';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || testimonial.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || testimonial.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      location: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      achievement: '',
      quote: '',
      category: 'UPSC',
      rating: 5,
      examYear: '',
      currentRole: '',
      featured: false,
      status: 'draft'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      showAlert('error', 'Please fill in all required fields correctly');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const now = new Date().toISOString().split('T')[0];
      
      if (editingTestimonial) {
        // Update existing testimonial
        setTestimonials(prev => prev.map(t => 
          t.id === editingTestimonial.id 
            ? { ...formData, id: t.id, updatedAt: now } as Testimonial
            : t
        ));
        showAlert('success', 'Testimonial updated successfully!');
      } else {
        // Add new testimonial
        const newTestimonial: Testimonial = {
          ...formData,
          id: Math.max(...testimonials.map(t => t.id)) + 1,
          createdAt: now,
          updatedAt: now
        } as Testimonial;
        setTestimonials(prev => [...prev, newTestimonial]);
        showAlert('success', 'Testimonial added successfully!');
      }
      
      setIsModalOpen(false);
      setEditingTestimonial(null);
      setFormErrors({});
    } catch (error) {
      showAlert('error', 'Failed to save testimonial. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (!testimonial) return;

    if (window.confirm(`Are you sure you want to delete "${testimonial.name}'s" testimonial? This action cannot be undone.`)) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setSelectedTestimonials(prev => prev.filter(selectedId => selectedId !== id));
      showAlert('success', 'Testimonial deleted successfully');
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedTestimonials.length === 0) {
      showAlert('warning', 'Please select testimonials first');
      return;
    }
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedTestimonials.length} testimonial(s)? This action cannot be undone.`)) {
          setTestimonials(prev => prev.filter(t => !selectedTestimonials.includes(t.id)));
          setSelectedTestimonials([]);
          showAlert('success', `${selectedTestimonials.length} testimonial(s) deleted successfully`);
        }
        break;
      case 'feature':
        setTestimonials(prev => prev.map(t => 
          selectedTestimonials.includes(t.id) ? { ...t, featured: true, updatedAt: new Date().toISOString().split('T')[0] } : t
        ));
        setSelectedTestimonials([]);
        showAlert('success', `${selectedTestimonials.length} testimonial(s) marked as featured`);
        break;
      case 'activate':
        setTestimonials(prev => prev.map(t => 
          selectedTestimonials.includes(t.id) ? { ...t, status: 'active' as const, updatedAt: new Date().toISOString().split('T')[0] } : t
        ));
        setSelectedTestimonials([]);
        showAlert('success', `${selectedTestimonials.length} testimonial(s) activated`);
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'TNPSC': 'bg-blue-100 text-blue-800',
      'Banking': 'bg-green-100 text-green-800',
      'Programming': 'bg-purple-100 text-purple-800',
      'UPSC': 'bg-orange-100 text-orange-800',
      'Tech Career': 'bg-indigo-100 text-indigo-800',
      'Entrepreneurship': 'bg-yellow-100 text-yellow-800',
      'SSC': 'bg-pink-100 text-pink-800',
      'RRB': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
              <p className="text-gray-600">Manage user testimonials and success stories ({testimonials.length} total)</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search testimonials by name, achievement, or quote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {viewMode === 'grid' ? 'Table View' : 'Grid View'}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTestimonials.length} of {testimonials.length} testimonials
          </div>

          {/* Bulk Actions */}
          {selectedTestimonials.length > 0 && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700 font-medium">
                {selectedTestimonials.length} testimonial(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('feature')}
                  className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
                >
                  Feature
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {filteredTestimonials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Quote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' 
                ? 'Try adjusting your search criteria or filters'
                : 'Get started by adding your first testimonial'
              }
            </p>
            {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Testimonial
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedTestimonials.length === filteredTestimonials.length && filteredTestimonials.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTestimonials(filteredTestimonials.map(t => t.id));
                          } else {
                            setSelectedTestimonials([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Achievement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTestimonials.includes(testimonial.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTestimonials([...selectedTestimonials, testimonial.id]);
                            } else {
                              setSelectedTestimonials(selectedTestimonials.filter(id => id !== testimonial.id));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face';
                            }}
                          />
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {testimonial.name}
                              {testimonial.featured && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {testimonial.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{testimonial.achievement}</div>
                        {testimonial.currentRole && (
                          <div className="text-sm text-gray-500">{testimonial.currentRole}</div>
                        )}
                        {testimonial.examYear && (
                          <div className="text-xs text-gray-400">Year: {testimonial.examYear}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-600">
                          "{truncateText(testimonial.quote, 100)}"
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimonial.category)}`}>
                          {testimonial.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">({testimonial.rating})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testimonial.status)}`}>
                          {testimonial.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            title="Edit testimonial"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Delete testimonial"
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
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face';
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {testimonial.name}
                        {testimonial.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Edit testimonial"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(testimonial.category)}`}>
                      {testimonial.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testimonial.status)}`}>
                      {testimonial.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-800">{testimonial.achievement}</h4>
                  {testimonial.currentRole && (
                    <p className="text-sm text-gray-600">{testimonial.currentRole}</p>
                  )}
                  {testimonial.examYear && (
                    <p className="text-xs text-gray-500">Year: {testimonial.examYear}</p>
                  )}
                </div>

                <blockquote className="text-sm text-gray-600 mb-3">
                  "{truncateText(testimonial.quote, 120)}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    Updated {new Date(testimonial.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) {
                        setFormErrors({ ...formErrors, name: '' });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                    disabled={isLoading}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (formErrors.location) {
                        setFormErrors({ ...formErrors, location: '' });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      formErrors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter location (e.g., Chennai, Tamil Nadu)"
                    disabled={isLoading}
                  />
                  {formErrors.location && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.achievement || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, achievement: e.target.value });
                    if (formErrors.achievement) {
                      setFormErrors({ ...formErrors, achievement: '' });
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    formErrors.achievement ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter achievement (e.g., Cleared UPSC Mains)"
                  disabled={isLoading}
                />
                {formErrors.achievement && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.achievement}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Quote <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.quote || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, quote: e.target.value });
                    if (formErrors.quote) {
                      setFormErrors({ ...formErrors, quote: '' });
                    }
                  }}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    formErrors.quote ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter the testimonial quote (minimum 10 characters)"
                  disabled={isLoading}
                />
                <div className="flex justify-between items-center mt-1">
                  {formErrors.quote && (
                    <p className="text-red-500 text-xs">{formErrors.quote}</p>
                  )}
                  <p className="text-gray-500 text-xs ml-auto">
                    {formData.quote?.length || 0} characters
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category || 'UPSC'}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      if (formErrors.category) {
                        setFormErrors({ ...formErrors, category: '' });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      formErrors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                    disabled={isLoading}
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status || 'draft'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'pending' | 'draft' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Year (Optional)</label>
                  <input
                    type="text"
                    value={formData.examYear || ''}
                    onChange={(e) => setFormData({ ...formData, examYear: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2024"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Role (Optional)</label>
                  <input
                    type="text"
                    value={formData.currentRole || ''}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current job role"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL (Optional)</label>
                <input
                  type="url"
                  value={formData.avatar || ''}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL or leave blank for default"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use default avatar. Must be a valid image URL.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300"
                  disabled={isLoading}
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Mark as Featured Testimonial
                  </div>
                  <p className="text-xs text-gray-500">Featured testimonials appear prominently on the website</p>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingTestimonial ? 'Update' : 'Save'} Testimonial
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}