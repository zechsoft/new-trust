
'use client';

import { useState, useEffect } from 'react';
import { 
  Image, 
  Plus, 
  Eye, 
  Star, 
  Folder, 
  Upload,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Settings,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Save,
  Camera,
  Globe,
  RotateCcw,
  Check,
  AlertCircle,
  Loader
} from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Updated Gallery API with better error handling and logging
const galleryAPI = {
  // Get all items with filtering
  getItems: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/gallery${queryString ? `?${queryString}` : ''}`;
      console.log('Fetching from:', url);
      
      const res = await fetch(url);
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('API Response data:', data);
      return data;
      
    } catch (error) {
      console.error('API Error in getItems:', error);
      throw error;
    }
  },
  
  // Get stats
  getStats: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/stats`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('API Error in getStats:', error);
      return { totalItems: 0, totalCategories: 0, totalViews: 0, featuredItems: 0, rotatingItems: 0 };
    }
  },
  
  // Create item
  createItem: async (formData: any) => {
    try {
      console.log('Creating item with form data');
      
      const res = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'POST',
        body: formData // FormData with image file
      });
      
      console.log('Create response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }
      
      const data = await res.json();
      console.log('Create response data:', data);
      return data;
      
    } catch (error) {
      console.error('API Error in createItem:', error);
      throw error;
    }
  },
  
  // Update item
  updateItem: async (id: any, formData: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'PUT',
        body: formData
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('API Error in updateItem:', error);
      throw error;
    }
  },
  
  // Delete item
  deleteItem: async (id: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('API Error in deleteItem:', error);
      throw error;
    }
  },
  
  // Toggle featured
  toggleFeatured: async (id: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}/featured`, {
        method: 'PATCH'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('API Error in toggleFeatured:', error);
      throw error;
    }
  },
  
  // Toggle rotating gallery
  toggleRotating: async (id: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}/rotating`, {
        method: 'PATCH'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error('API Error in toggleRotating:', error);
      throw error;
    }
  }
};

// Gallery Categories API
const galleryCategoryAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/gallery-categories`); // Fixed: was /categories
    return await res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/gallery-categories`, { // Fixed: was /categories
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  update: async (id: any, data: any) => {
    const res = await fetch(`${API_BASE_URL}/gallery-categories/${id}`, { // Fixed: was /categories
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },
  delete: async (id: any) => {
    const res = await fetch(`${API_BASE_URL}/gallery-categories/${id}`, { // Fixed: was /categories
      method: 'DELETE'
    });
    return await res.json();
  }
};

interface GalleryItem {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  category: string;
  uploadDate: string;
  views: number;
  thumbnail: string;
  imageUrl: string;
  featured: boolean;
  rotatingGallery: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

interface Stats {
  totalItems: number;
  totalCategories: number;
  totalViews: number;
  featuredItems: number;
  rotatingItems: number;
}

export default function GalleryAdminManagement() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for data
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalItems: 0,
    totalCategories: 0,
    totalViews: 0,
    featuredItems: 0,
    rotatingItems: 0
  });

  const [newItem, setNewItem] = useState<Partial<GalleryItem & { imageFile: File | null }>>({
    title: '',
    description: '',
    category: '',
    imageFile: null,
    featured: false,
    rotatingGallery: false,
    tags: []
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  // Fetch data functions
// Updated fetchGalleryItems function with better error handling and image URL processing
const fetchGalleryItems = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await galleryAPI.getItems();
    console.log('Raw API Response:', response);
    
    let items = [];
    
    // Handle different response formats
    if (response) {
      if (Array.isArray(response)) {
        items = response;
      } else if (response.success && Array.isArray(response.data)) {
        items = response.data;
      } else if (response.data && Array.isArray(response.data)) {
        items = response.data;
      } else if (response.items && Array.isArray(response.items)) {
        items = response.items;
      } else if (response.galleryItems && Array.isArray(response.galleryItems)) {
        items = response.galleryItems;
      } else if (response.gallery && Array.isArray(response.gallery)) {
        items = response.gallery;
      } else if (response.success === false) {
        throw new Error(response.message || 'Failed to fetch gallery items');
      } else {
        // If response is an object but doesn't match expected format, check all properties
        const possibleArrays = Object.values(response).filter(val => Array.isArray(val));
        if (possibleArrays.length > 0) {
          items = possibleArrays[0];
        }
      }
    }
    
    console.log('Extracted items before processing:', items);
    
    // Process items to ensure proper structure and image URLs
    const processedItems = items.map((item) => {
      // Handle different image URL field names and ensure proper URL format
      let imageUrl = item.imageUrl || item.image_url || item.image || item.thumbnail;
      let thumbnail = item.thumbnail || item.imageUrl || item.image_url || item.image;
      
      // If image URL is relative, make it absolute
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = imageUrl.startsWith('/') ? `http://localhost:5000${imageUrl}` : `http://localhost:5000/${imageUrl}`;
      }
      if (thumbnail && !thumbnail.startsWith('http')) {
        thumbnail = thumbnail.startsWith('/') ? `http://localhost:5000${thumbnail}` : `http://localhost:5000/${thumbnail}`;
      }
      
      return {
        id: item.id || item._id,
        title: item.title || 'Untitled',
        description: item.description || '',
        category: item.category || 'Uncategorized',
        imageUrl: imageUrl,
        thumbnail: thumbnail,
        uploadDate: item.uploadDate || item.createdAt || item.created_at || new Date().toISOString(),
        createdAt: item.createdAt || item.created_at || item.uploadDate || new Date().toISOString(),
        views: parseInt(item.views) || 0,
        featured: Boolean(item.featured),
        rotatingGallery: Boolean(item.rotatingGallery || item.rotating_gallery),
        tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',') : [])
      };
    });
    
    console.log('Processed items:', processedItems);
    setGalleryItems(processedItems);
    
    // Update stats after fetching items
    await fetchStats();
    
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    setError(`Failed to fetch gallery items: ${error.message}`);
    setGalleryItems([]);
  } finally {
    setLoading(false);
  }
};


const fetchCategories = async () => {
  try {
    const response = await galleryCategoryAPI.getAll();
    console.log('Categories API Response:', response);
    
    let cats = [];
    if (response) {
      if (Array.isArray(response)) {
        cats = response;
      } else if (response.data && Array.isArray(response.data)) {
        cats = response.data;
      } else if (response.categories && Array.isArray(response.categories)) {
        cats = response.categories;
      } else if (response.success && response.data && Array.isArray(response.data)) {
        cats = response.data;
      }
    }
    
    console.log('Processed categories:', cats);
    setCategories(cats);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategories([]);
    setError(`Failed to fetch categories: ${error.message}`);
  }
};

const fetchStats = async () => {
  try {
    const response = await galleryAPI.getStats();
    setStats(response?.data || response || {
      totalItems: 0, totalCategories: 0, totalViews: 0, 
      featuredItems: 0, rotatingItems: 0
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchGalleryItems(),
        fetchCategories(),
        fetchStats()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

// Updated handleAddItem function with better response handling
const handleAddItem = async () => {
  if (!newItem.title || !newItem.category || !newItem.imageFile) {
    setError('Please fill in all required fields (title, category, and image)');
    return;
  }

  setLoading(true);
  setError(null);
  
  try {
    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('description', newItem.description || '');
    formData.append('category', newItem.category);
    formData.append('featured', String(newItem.featured || false));
    formData.append('rotatingGallery', String(newItem.rotatingGallery || false));
    formData.append('tags', newItem.tags?.join(',') || '');
    formData.append('image', newItem.imageFile);

    console.log('Sending form data:', {
      title: newItem.title,
      description: newItem.description,
      category: newItem.category,
      featured: newItem.featured,
      rotatingGallery: newItem.rotatingGallery,
      imageFile: newItem.imageFile.name
    });

    const response = await galleryAPI.createItem(formData);
    console.log('Create item response:', response);
    
    // Handle different response formats
    if (response && (response.success || response.id || response.data)) {
      // Clear the form
      setNewItem({
        title: '', 
        description: '', 
        category: '', 
        imageFile: null,
        featured: false, 
        rotatingGallery: false, 
        tags: []
      });
      
      // Close modal
      setShowAddItemModal(false);
      
      // Refresh data
      await Promise.all([
        fetchGalleryItems(),
        fetchStats(),
        fetchCategories()
      ]);
      
      console.log('Item created successfully');
      
    } else {
      throw new Error(response?.message || 'Failed to create item - no success response');
    }
    
  } catch (error) {
    console.error('Error creating item:', error);
    setError(`Failed to create item: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  // Add new category with API
  const handleAddCategory = async () => {
    if (newCategory.name) {
      setLoading(true);
      try {
        const response = await galleryCategoryAPI.create(newCategory);
        if (response.success) {
          await Promise.all([fetchCategories(), fetchStats()]);
          setNewCategory({ name: '', description: '' });
          setShowAddCategoryModal(false);
          setError(null);
        } else {
          setError(response.message || 'Failed to create category');
        }
      } catch (error) {
        console.error('Error creating category:', error);
        setError('Failed to create category');
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle featured status with API
  const toggleFeatured = async (id: string) => {
    try {
      const response = await galleryAPI.toggleFeatured(id);
      if (response.success) {
        await Promise.all([fetchGalleryItems(), fetchStats()]);
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
      setError('Failed to update featured status');
    }
  };

  // Toggle rotating gallery status with API
  const toggleRotatingGallery = async (id: string) => {
    try {
      const response = await galleryAPI.toggleRotating(id);
      if (response.success) {
        await Promise.all([fetchGalleryItems(), fetchStats()]);
      }
    } catch (error) {
      console.error('Error toggling rotating gallery:', error);
      setError('Failed to update rotating gallery status');
    }
  };

  // Delete item with API
  const deleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await galleryAPI.deleteItem(id);
        if (response.success) {
          await Promise.all([fetchGalleryItems(), fetchStats()]);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item');
      }
    }
  };

  // Delete category with API
  const deleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await galleryCategoryAPI.delete(id);
        if (response.success) {
          await Promise.all([fetchCategories(), fetchStats()]);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        setError('Failed to delete category');
      }
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }: {
    icon: any; title: string; value: string | number; change?: string; color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-900">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-3 text-red-700 hover:text-red-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddItemModal(true)}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </button>
              <button
                onClick={() => setShowAddCategoryModal(true)}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Folder className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 mt-6">
            {['dashboard', 'items', 'categories', 'rotating'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'rotating' ? '3D Gallery' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
   {activeTab === 'dashboard' && (
  <div>
    {/* Stats Grid - keep existing */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatCard icon={Image} title="Total Items" value={galleryItems.length} change="+12 this month" color="bg-blue-500" />
      <StatCard icon={Folder} title="Categories" value={categories.length} change="+2 this month" color="bg-green-500" />
      <StatCard icon={Eye} title="Total Views" value={galleryItems.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()} change="+23% this month" color="bg-purple-500" />
      <StatCard icon={Star} title="Featured Items" value={galleryItems.filter(item => item.featured).length} color="bg-orange-500" />
      <StatCard icon={RotateCcw} title="3D Gallery Items" value={galleryItems.filter(item => item.rotatingGallery).length} color="bg-red-500" />
    </div>

    {/* Recent Uploads - Updated */}
   
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-900">Recent Uploads</h2>
    <button 
      onClick={() => {
        fetchGalleryItems();
        fetchStats();
      }}
      disabled={loading}
      className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin mr-1" />
          Refreshing...
        </>
      ) : (
        <>
          <RotateCcw className="w-4 h-4 mr-1" />
          Refresh
        </>
      )}
    </button>
  </div>
  
  {loading ? (
    <div className="flex items-center justify-center py-8">
      <Loader className="w-6 h-6 animate-spin text-blue-600 mr-2" />
      <span className="text-gray-600">Loading recent uploads...</span>
    </div>
  ) : (
    <div className="space-y-4">
      {Array.isArray(galleryItems) && galleryItems.length > 0 ? (
        galleryItems
          .sort((a, b) => new Date(b.uploadDate || b.createdAt).getTime() - new Date(a.uploadDate || a.createdAt).getTime())
          .slice(0, 5)
          .map((item) => (
            <div key={item.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                {item.imageUrl || item.thumbnail ? (
                  <img 
                    src={item.imageUrl || item.thumbnail}
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', item.imageUrl || item.thumbnail);
                    }}
                  />
                ) : null}
                <div 
                  className="absolute inset-0 bg-gray-200 flex items-center justify-center" 
                  style={{ display: (item.imageUrl || item.thumbnail) ? 'none' : 'flex' }}
                >
                  <Image className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 flex items-center truncate">
                    <span className="truncate">{item.title}</span>
                    {item.featured && (
                      <Star className="w-4 h-4 text-orange-500 ml-2 fill-current flex-shrink-0" title="Featured" />
                    )}
                    {item.rotatingGallery && (
                      <RotateCcw className="w-4 h-4 text-red-500 ml-2 flex-shrink-0" title="3D Gallery" />
                    )}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium mr-2 flex-shrink-0">
                    {item.category || 'Uncategorized'}
                  </span>
                  <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="mr-3 truncate">
                    {new Date(item.uploadDate || item.createdAt).toLocaleDateString()}
                  </span>
                  <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="flex-shrink-0">{item.views || 0} views</span>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => toggleFeatured(item.id)}
                  disabled={loading}
                  className={`p-1 rounded transition-colors ${
                    item.featured 
                      ? 'text-orange-600 hover:bg-orange-50' 
                      : 'text-gray-400 hover:bg-gray-100'
                  } disabled:opacity-50`}
                  title={item.featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => toggleRotatingGallery(item.id)}
                  disabled={loading}
                  className={`p-1 rounded transition-colors ${
                    item.rotatingGallery 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-gray-400 hover:bg-gray-100'
                  } disabled:opacity-50`}
                  title={item.rotatingGallery ? 'Remove from 3D gallery' : 'Add to 3D gallery'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
      ) : (
        <div className="text-center py-8">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No gallery items found</p>
          <p className="text-sm text-gray-400 mt-1">
            Add your first gallery item to get started
          </p>
          <button
            onClick={() => setShowAddItemModal(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
          >
            Add First Item
          </button>
        </div>
      )}
    </div>
  )}
  
  {/* View All Link */}
  {Array.isArray(galleryItems) && galleryItems.length > 5 && (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <button
        onClick={() => setActiveTab('items')}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        View all {galleryItems.length} items →
      </button>
    </div>
  )}
</div>
  </div>
)}

    {activeTab === 'items' && (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6 border-b flex items-center justify-between">
      <h2 className="text-lg font-semibold">Gallery Items ({galleryItems.length})</h2>
      <button 
        onClick={fetchGalleryItems}
        disabled={loading}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
    
    {loading ? (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-blue-600 mr-2" />
        <span className="text-gray-600">Loading gallery items...</span>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(galleryItems) && galleryItems.length > 0 ? (
              galleryItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {item.imageUrl || item.thumbnail ? (
                          <img 
                            src={item.imageUrl || item.thumbnail} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.log('Table image failed to load:', e.target.src);
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                            onLoad={() => {
                              console.log('Table image loaded successfully:', item.imageUrl || item.thumbnail);
                            }}
                          />
                        ) : null}
                        <div 
                          className="absolute inset-0 bg-gray-200 flex items-center justify-center" 
                          style={{ display: (item.imageUrl || item.thumbnail) ? 'none' : 'flex' }}
                        >
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {item.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {item.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.views || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.uploadDate || item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.featured && <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">Featured</span>}
                      {item.rotatingGallery && <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">3D Gallery</span>}
                      {!item.featured && !item.rotatingGallery && <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Regular</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFeatured(item.id)}
                        disabled={loading}
                        className={`p-2 rounded transition-colors ${item.featured ? 'text-orange-600 hover:bg-orange-50' : 'text-gray-400 hover:bg-gray-50'} disabled:opacity-50`}
                        title={item.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className={`w-4 h-4 ${item.featured ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleRotatingGallery(item.id)}
                        disabled={loading}
                        className={`p-2 rounded transition-colors ${item.rotatingGallery ? 'text-red-600 hover:bg-red-50' : 'text-gray-400 hover:bg-gray-50'} disabled:opacity-50`}
                        title={item.rotatingGallery ? 'Remove from 3D gallery' : 'Add to 3D gallery'}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        disabled={loading}
                        className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Image className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 font-medium">No gallery items found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Click "Add Item" to create your first gallery item
                    </p>
                    <button
                      onClick={() => setShowAddItemModal(true)}
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add First Item
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <div className="flex space-x-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50" disabled={loading}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteCategory(category.id)}
                        disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="text-sm text-gray-500">{category.itemCount} items</div>
                </div>
              ))}
            </div>
          </div>
        )}

       {activeTab === 'rotating' && (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6 border-b">
      <h2 className="text-lg font-semibold">3D Rotating Gallery Management</h2>
      <p className="text-sm text-gray-600 mt-1">Manage items that appear in the 3D rotating gallery section</p>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(galleryItems) && galleryItems.filter(item => item.rotatingGallery).length > 0 ? (
          galleryItems.filter(item => item.rotatingGallery).map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {item.imageUrl || item.thumbnail ? (
                  <img 
                    src={item.imageUrl || item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center" style={{ display: (item.imageUrl || item.thumbnail) ? 'none' : 'flex' }}>
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{item.category}</span>
                  <button
                    onClick={() => toggleRotatingGallery(item.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200 disabled:opacity-50"
                  >
                    Remove from 3D
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <RotateCcw className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items in 3D gallery</h3>
            <p className="text-gray-600">Add items to the 3D rotating gallery from the items tab.</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Gallery Item</h2>
              <button onClick={() => setShowAddItemModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newItem.category || ''}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItem({...newItem, imageFile: e.target.files?.[0] || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {newItem.imageFile && (
                  <p className="text-sm text-gray-500 mt-1">Selected: {newItem.imageFile.name}</p>
                )}
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newItem.featured || false}
                    onChange={(e) => setNewItem({...newItem, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Item</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newItem.rotatingGallery || false}
                    onChange={(e) => setNewItem({...newItem, rotatingGallery: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Include in 3D Rotating Gallery</span>
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowAddItemModal(false)}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add New Category</h2>
              <button onClick={() => setShowAddCategoryModal(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="p-6 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}