'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Eye, 
  EyeOff,
  ArrowLeft,
  FileText,
  Settings,
  Image as ImageIcon
} from 'lucide-react';

interface TransformProject {
  id: number;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SectionSettings {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  isVisible: boolean;
}

const BeforeAfterSlide = ({ 
  beforeImage, 
  afterImage, 
  title, 
  description 
}: {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(x, 0), 100));
    }
  };
  
  return (
    <div className="mb-4">
      <div 
        ref={containerRef}
        className="relative h-48 overflow-hidden rounded-lg cursor-ew-resize"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0">
          <img 
            src={afterImage}
            alt="After transformation"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage}
            alt="Before transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-white" />
        </div>
        
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 8L22 12L18 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 8L2 12L6 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <h4 className="text-sm font-semibold mt-2">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

export default function BeforeAfterAdmin() {
  const [projects, setProjects] = useState<TransformProject[]>([
    {
      id: 1,
      beforeImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      title: "Sustainable Water Project",
      description: "Transforming a water-scarce village with clean water access for all residents",
      isActive: true,
      createdAt: "2024-12-01",
      updatedAt: "2024-12-15"
    },
    {
      id: 2,
      beforeImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop",
      title: "School Renovation",
      description: "Rebuilding and equipping a dilapidated school with modern facilities",
      isActive: true,
      createdAt: "2024-11-15",
      updatedAt: "2024-12-10"
    },
    {
      id: 3,
      beforeImage: "https://images.unsplash.com/photo-1551601651-2a8bf16bafc1?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1551601651-2a8bf16bafc1?w=400&h=300&fit=crop&sat=-100",
      title: "Healthcare Center",
      description: "Converting an unused building into a fully-functional medical clinic",
      isActive: true,
      createdAt: "2024-11-01",
      updatedAt: "2024-12-05"
    }
  ]);

  const [sectionSettings, setSectionSettings] = useState<SectionSettings>({
    title: "See Our Impact",
    subtitle: "Witness the transformative power of our projects through these before and after comparisons.",
    backgroundColor: "bg-blue-900",
    textColor: "text-white",
    isVisible: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<TransformProject | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    beforeImage: '',
    afterImage: ''
  });

  const beforeImageInputRef = useRef<HTMLInputElement>(null);
  const afterImageInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (project: TransformProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      beforeImage: project.beforeImage,
      afterImage: project.afterImage
    });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      beforeImage: '',
      afterImage: ''
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : p
      ));
    } else {
      // Add new project
      const newProject: TransformProject = {
        id: Math.max(...projects.map(p => p.id)) + 1,
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setProjects(prev => [...prev, newProject]);
    }
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const toggleActive = (id: number) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleFileUpload = (field: 'beforeImage' | 'afterImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create a data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, [field]: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (field: 'beforeImage' | 'afterImage') => {
    if (field === 'beforeImage') {
      beforeImageInputRef.current?.click();
    } else {
      afterImageInputRef.current?.click();
    }
  };

  const removeImage = (field: 'beforeImage' | 'afterImage') => {
    setFormData(prev => ({ ...prev, [field]: '' }));
    // Reset the file input
    if (field === 'beforeImage' && beforeImageInputRef.current) {
      beforeImageInputRef.current.value = '';
    } else if (field === 'afterImage' && afterImageInputRef.current) {
      afterImageInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Before & After Management</h1>
            <p className="text-gray-600 mt-1">Manage transformation project slider content</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Section Settings
          </button>
        </nav>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <BeforeAfterSlide
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    title={project.title}
                    description={project.description}
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${project.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-600">
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(project.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={project.isActive ? 'Hide' : 'Show'}
                      >
                        {project.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Updated: {project.updatedAt}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Section Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={sectionSettings.title}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Subtitle
                </label>
                <textarea
                  value={sectionSettings.subtitle}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <select
                    value={sectionSettings.backgroundColor}
                    onChange={(e) => setSectionSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="bg-blue-900">Blue Dark</option>
                    <option value="bg-gray-900">Gray Dark</option>
                    <option value="bg-green-900">Green Dark</option>
                    <option value="bg-purple-900">Purple Dark</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <select
                    value={sectionSettings.textColor}
                    onChange={(e) => setSectionSettings(prev => ({ ...prev, textColor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="text-white">White</option>
                    <option value="text-gray-100">Light Gray</option>
                    <option value="text-gray-900">Dark Gray</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sectionVisible"
                  checked={sectionSettings.isVisible}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="sectionVisible" className="ml-2 text-sm text-gray-700">
                  Show section on website
                </label>
              </div>
            </div>
            
            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Before Image
                    </label>
                    <div className="space-y-3">
                      {formData.beforeImage ? (
                        <div className="relative">
                          <img 
                            src={formData.beforeImage} 
                            alt="Before preview" 
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage('beforeImage')}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No image selected</p>
                          </div>
                        </div>
                      )}
                      <input
                        ref={beforeImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('beforeImage', e)}
                        className="hidden"
                      />
                      <button
                        onClick={() => triggerFileUpload('beforeImage')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {formData.beforeImage ? 'Change Image' : 'Upload Before Image'}
                      </button>
                    </div>
                  </div>
                  
                  {/* After Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      After Image
                    </label>
                    <div className="space-y-3">
                      {formData.afterImage ? (
                        <div className="relative">
                          <img 
                            src={formData.afterImage} 
                            alt="After preview" 
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage('afterImage')}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No image selected</p>
                          </div>
                        </div>
                      )}
                      <input
                        ref={afterImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('afterImage', e)}
                        className="hidden"
                      />
                      <button
                        onClick={() => triggerFileUpload('afterImage')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {formData.afterImage ? 'Change Image' : 'Upload After Image'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Preview */}
                {formData.beforeImage && formData.afterImage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <BeforeAfterSlide
                        beforeImage={formData.beforeImage}
                        afterImage={formData.afterImage}
                        title={formData.title || 'Project Title'}
                        description={formData.description || 'Project description'}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.title || !formData.description || !formData.beforeImage || !formData.afterImage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}