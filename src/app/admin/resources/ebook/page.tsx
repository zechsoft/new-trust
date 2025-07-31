'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  Star,
  FileText,
  Code,
  Brain,
  Globe,
  Save,
  X,
  Tag,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface EBook {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: number;
  downloads: number;
  rating: number;
  image: string;
  fileSize: string;
  language: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  uploadDate: string;
  lastModified: string;
}

interface EBookFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  pages: number;
  language: string;
  tags: string[];
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
}

interface Alert {
  id: number;
  type: 'success' | 'error' | 'warning';
  message: string;
}

export default function AdminEBooksPage() {
  const [books, setBooks] = useState<EBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<EBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<EBook | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<EBookFormData>({
    title: '',
    author: '',
    category: 'upsc',
    description: '',
    pages: 0,
    language: 'English',
    tags: [],
    featured: false,
    status: 'draft'
  });
  const [newTag, setNewTag] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'upsc', name: 'UPSC', icon: BookOpen },
    { id: 'ssc', name: 'SSC', icon: FileText },
    { id: 'banking', name: 'Banking', icon: Star },
    { id: 'coding', name: 'Programming', icon: Code },
    { id: 'skills', name: 'Life Skills', icon: Brain }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'published', name: 'Published' },
    { id: 'draft', name: 'Draft' },
    { id: 'archived', name: 'Archived' }
  ];

  // Mock data
  const mockBooks: EBook[] = [
    {
      id: 1,
      title: 'UPSC Civil Services Complete Guide',
      author: 'Dr. Rajesh Kumar',
      category: 'upsc',
      description: 'Comprehensive guide covering all aspects of UPSC Civil Services examination with previous year questions and analysis.',
      pages: 450,
      downloads: 15420,
      rating: 4.8,
      image: '/api/placeholder/300/400',
      fileSize: '25.5 MB',
      language: 'English',
      tags: ['UPSC', 'Civil Services', 'Current Affairs'],
      featured: true,
      status: 'published',
      uploadDate: '2024-01-15',
      lastModified: '2024-02-10'
    },
    {
      id: 2,
      title: 'SSC CGL Mathematics Mastery',
      author: 'Prof. Anita Sharma',
      category: 'ssc',
      description: 'Master mathematics for SSC CGL with step-by-step solutions and practice questions.',
      pages: 320,
      downloads: 12350,
      rating: 4.6,
      image: '/api/placeholder/300/400',
      fileSize: '18.2 MB',
      language: 'English',
      tags: ['SSC', 'Mathematics', 'Quantitative'],
      featured: false,
      status: 'published',
      uploadDate: '2024-01-20',
      lastModified: '2024-02-05'
    },
    {
      id: 3,
      title: 'Banking Awareness 2024',
      author: 'Financial Academy',
      category: 'banking',
      description: 'Latest banking awareness questions and current affairs for all banking examinations.',
      pages: 280,
      downloads: 9840,
      rating: 4.7,
      image: '/api/placeholder/300/400',
      fileSize: '15.8 MB',
      language: 'English',
      tags: ['Banking', 'Current Affairs', 'Finance'],
      featured: true,
      status: 'published',
      uploadDate: '2024-02-01',
      lastModified: '2024-02-15'
    },
    {
      id: 4,
      title: 'JavaScript Fundamentals',
      author: 'Tech Guru',
      category: 'coding',
      description: 'Learn JavaScript from basics to advanced concepts with practical examples.',
      pages: 380,
      downloads: 8500,
      rating: 4.5,
      image: '/api/placeholder/300/400',
      fileSize: '22.1 MB',
      language: 'English',
      tags: ['JavaScript', 'Programming', 'Web Development'],
      featured: false,
      status: 'draft',
      uploadDate: '2024-02-10',
      lastModified: '2024-02-20'
    }
  ];

  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  useEffect(() => {
    let filtered = books;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(book => book.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, selectedStatus]);

  const showAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (formData.pages <= 0) {
      errors.pages = 'Pages must be greater than 0';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openModal = (book?: EBook, viewMode = false) => {
    setIsViewMode(viewMode);
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        pages: book.pages,
        language: book.language,
        tags: book.tags,
        featured: book.featured,
        status: book.status
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        category: 'upsc',
        description: '',
        pages: 0,
        language: 'English',
        tags: [],
        featured: false,
        status: 'draft'
      });
    }
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setIsViewMode(false);
    setNewTag('');
    setFormErrors({});
  };

  const handleSave = () => {
    if (!validateForm()) {
      showAlert('error', 'Please fix the form errors before saving.');
      return;
    }

    try {
      if (editingBook) {
        // Update existing book
        setBooks(books.map(book => 
          book.id === editingBook.id 
            ? { 
                ...book, 
                ...formData, 
                lastModified: new Date().toISOString().split('T')[0] 
              }
            : book
        ));
        showAlert('success', 'E-book updated successfully!');
      } else {
        // Add new book
        const newBook: EBook = {
          ...formData,
          id: Date.now(),
          downloads: 0,
          rating: 0,
          image: '/api/placeholder/300/400',
          fileSize: '0 MB',
          uploadDate: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0]
        };
        setBooks([...books, newBook]);
        showAlert('success', 'E-book added successfully!');
      }
      closeModal();
    } catch (error) {
      showAlert('error', 'An error occurred while saving the e-book.');
    }
  };

  const confirmDelete = (id: number) => {
    setBookToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (bookToDelete) {
      try {
        const bookTitle = books.find(book => book.id === bookToDelete)?.title || 'Unknown';
        setBooks(books.filter(book => book.id !== bookToDelete));
        showAlert('success', `"${bookTitle}" has been deleted successfully!`);
        setIsDeleteConfirmOpen(false);
        setBookToDelete(null);
      } catch (error) {
        showAlert('error', 'An error occurred while deleting the e-book.');
      }
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    } else if (formData.tags.includes(newTag.trim())) {
      showAlert('warning', 'Tag already exists!');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleView = (book: EBook) => {
    openModal(book, true);
  };

  const handleDownload = (book: EBook) => {
    showAlert('success', `Download started for "${book.title}"`);
    // In a real app, this would trigger actual download
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : BookOpen;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      case 'warning': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alerts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {alerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`flex items-center gap-2 px-4 py-3 border rounded-lg shadow-lg ${getAlertColor(alert.type)}`}
            >
              <AlertIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{alert.message}</span>
              <button
                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">E-Books Management</h1>
              <p className="text-gray-600">Manage your digital library and educational resources</p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New E-Book
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total E-Books</p>
                <p className="text-2xl font-bold text-gray-900">{books.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}
                </p>
              </div>
              <Download className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured Books</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.filter(book => book.featured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {books.length > 0 ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1) : '0.0'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search e-books, authors, or tags..."
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
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredBooks.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No e-books found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first e-book'}
              </p>
              {!searchTerm && selectedCategory === 'all' && selectedStatus === 'all' && (
                <button
                  onClick={() => openModal()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First E-Book
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.map((book) => {
                    const CategoryIcon = getCategoryIcon(book.category);
                    return (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-8">
                              <div className="h-12 w-8 bg-blue-100 rounded flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900">{book.title}</span>
                                {book.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              </div>
                              <div className="text-sm text-gray-500">by {book.author}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {book.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {book.tags.length > 2 && (
                                  <span className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded">
                                    +{book.tags.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-900 capitalize">{book.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div>{book.downloads.toLocaleString()} downloads</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{book.rating}</span>
                            </div>
                            <div className="text-gray-500">{book.pages} pages • {book.fileSize}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(book)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownload(book)}
                              className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => openModal(book)}
                              className="p-1 text-indigo-600 hover:bg-indigo-100 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => confirmDelete(book.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete E-Book</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "{books.find(b => b.id === bookToDelete)?.title}"?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setBookToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isViewMode ? 'View E-Book Details' : editingBook ? 'Edit E-Book' : 'Add New E-Book'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title {!isViewMode && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      disabled={isViewMode}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.title ? 'border-red-300' : 'border-gray-300'
                      } ${isViewMode ? 'bg-gray-50' : ''}`}
                      placeholder="Enter book title"
                    />
                    {formErrors.title && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author {!isViewMode && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      disabled={isViewMode}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.author ? 'border-red-300' : 'border-gray-300'
                      } ${isViewMode ? 'bg-gray-50' : ''}`}
                      placeholder="Enter author name"
                    />
                    {formErrors.author && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.author}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description {!isViewMode && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    disabled={isViewMode}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.description ? 'border-red-300' : 'border-gray-300'
                    } ${isViewMode ? 'bg-gray-50' : ''}`}
                    placeholder="Enter book description"
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      disabled={isViewMode}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isViewMode ? 'bg-gray-50' : ''
                      }`}
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pages {!isViewMode && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="number"
                      value={formData.pages}
                      onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 0})}
                      disabled={isViewMode}
                      min="1"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.pages ? 'border-red-300' : 'border-gray-300'
                      } ${isViewMode ? 'bg-gray-50' : ''}`}
                      placeholder="Number of pages"
                    />
                    {formErrors.pages && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.pages}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      disabled={isViewMode}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isViewMode ? 'bg-gray-50' : ''
                      }`}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tag}
                        {!isViewMode && (
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {!isViewMode && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Tag className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      disabled={isViewMode}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isViewMode ? 'bg-gray-50' : ''
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center pt-8">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        disabled={isViewMode}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Book</span>
                      <Star className="w-4 h-4 text-yellow-500 ml-1" />
                    </label>
                  </div>
                </div>

                {/* Display additional info for view mode */}
                {isViewMode && editingBook && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">File Size:</span>
                        <span className="ml-2 font-medium">{editingBook.fileSize}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Downloads:</span>
                        <span className="ml-2 font-medium">{editingBook.downloads.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rating:</span>
                        <div className="inline-flex items-center ml-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 font-medium">{editingBook.rating}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Upload Date:</span>
                        <span className="ml-2 font-medium">{new Date(editingBook.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Modified:</span>
                        <span className="ml-2 font-medium">{new Date(editingBook.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isViewMode ? 'Close' : 'Cancel'}
                  </button>
                  {!isViewMode && (
                    <>
                      {editingBook && (
                        <button
                          type="button"
                          onClick={() => setIsViewMode(true)}
                          className="px-6 py-2 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4 inline mr-2" />
                          Preview
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        {editingBook ? 'Update' : 'Create'} E-Book
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}