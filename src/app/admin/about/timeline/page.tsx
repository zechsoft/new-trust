// src/app/admin/about/timeline/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminModal from '@/components/admin/ui/AdminModal';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

export default function TimelineManagement() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: 1,
      year: '2015',
      title: 'Foundation Established',
      description: 'Global Kindness Trust was founded with a mission to create positive change across communities worldwide.'
    },
    {
      id: 2,
      year: '2018',
      title: 'First Major Campaign',
      description: 'Launched our first major fundraising campaign focused on education and youth development programs.'
    },
    {
      id: 3,
      year: '2020',
      title: 'Global Expansion',
      description: 'Expanded operations to 15 countries, reaching over 100,000 beneficiaries through various initiatives.'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [formData, setFormData] = useState<Partial<TimelineItem>>({});

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      year: '',
      title: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleEditItem = (item: TimelineItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.year || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingItem) {
      // Update existing item
      setTimelineItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData as TimelineItem }
          : item
      ));
    } else {
      // Add new item
      const newId = Math.max(...timelineItems.map(item => item.id), 0) + 1;
      const newItem: TimelineItem = {
        id: newId,
        ...formData as Omit<TimelineItem, 'id'>
      };
      setTimelineItems(prev => [...prev, newItem]);
    }
    
    setIsModalOpen(false);
    setFormData({});
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Are you sure you want to delete this timeline item?')) {
      setTimelineItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const sortedItems = [...timelineItems].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timeline Management</h1>
          <p className="text-gray-600 mt-1">Manage your organization's journey milestones</p>
        </div>
        <AdminButton onClick={handleAddItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Timeline Item
        </AdminButton>
      </div>

      {/* Timeline Items */}
      <div className="space-y-4">
        {sortedItems.map((item) => (
          <AdminCard key={item.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {item.year}
                  </span>
                  <span className="text-sm text-gray-500">ID: {item.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <AdminButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="w-4 h-4" />
                </AdminButton>
                <AdminButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        ))}
        
        {timelineItems.length === 0 && (
          <AdminCard className="p-12 text-center">
            <p className="text-gray-500 text-lg">No timeline items yet.</p>
            <p className="text-gray-400 mt-2">Click "Add Timeline Item" to create your first milestone.</p>
          </AdminCard>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setFormData({});
          setEditingItem(null);
        }}
        title={editingItem ? 'Edit Timeline Item' : 'Add Timeline Item'}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.year || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Foundation Established"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe this milestone in your organization's journey..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <AdminButton 
              variant="outline" 
              onClick={() => {
                setIsModalOpen(false);
                setFormData({});
                setEditingItem(null);
              }}
            >
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSaveItem}>
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'Update Item' : 'Save Item'}
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}