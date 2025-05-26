// src/app/admin/about/team/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Users, Eye, EyeOff } from 'lucide-react';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminButton from '@/components/admin/ui/AdminButton';
import {AdminTable} from '@/components/admin/ui/AdminTable';
import { AdminModal } from '@/components/admin/ui/AdminModal';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  isVisible: boolean;
}

interface TeamSectionSettings {
  title: string;
  subtitle: string;
  volunteerText: string;
  volunteerCount: string;
  ctaText: string;
  ctaLink: string;
  showCtaSection: boolean;
  backgroundColor: string;
  isVisible: boolean;
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Executive Director',
      bio: 'John has over 15 years of experience in nonprofit management and has dedicated his career to creating positive social impact.',
      image: '/api/placeholder/400/400',
      order: 1,
      isVisible: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Program Manager',
      bio: 'Sarah leads our community outreach programs and has helped establish partnerships with over 50 local organizations.',
      image: '/api/placeholder/400/400',
      order: 2,
      isVisible: true
    }
  ]);

  const [sectionSettings, setSectionSettings] = useState<TeamSectionSettings>({
    title: 'Meet Our Team',
    subtitle: 'The Heart Behind the Mission',
    volunteerText: 'Volunteers & Change-Makers',
    volunteerCount: '+1000',
    ctaText: 'Join Our Team',
    ctaLink: '/get-involved',
    showCtaSection: true,
    backgroundColor: 'gray-50',
    isVisible: true
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleAddMember = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      order: teamMembers.length + 1,
      isVisible: true
    });
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
    setImagePreview(member.image);
    setIsModalOpen(true);
  };

  const handleSaveMember = () => {
    if (editingMember) {
      // Update existing member
      setTeamMembers(prev => prev.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData }
          : member
      ));
    } else {
      // Add new member
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...formData as TeamMember
      };
      setTeamMembers(prev => [...prev, newMember]);
    }
    setIsModalOpen(false);
    setFormData({});
    setImagePreview('');
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving section settings:', sectionSettings);
    setIsSettingsModalOpen(false);
  };

  const backgroundOptions = [
    { name: 'Light Gray', value: 'gray-50' },
    { name: 'White', value: 'white' },
    { name: 'Light Blue', value: 'blue-50' },
    { name: 'Light Purple', value: 'purple-50' },
    { name: 'Light Green', value: 'green-50' }
  ];

  const columns = [
    {
      key: 'image',
      label: 'Photo',
      render: (member: TeamMember) => (
        <img 
          src={member.image || '/api/placeholder/40/40'} 
          alt={member.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'order', label: 'Order' },
    {
      key: 'isVisible',
      label: 'Status',
      render: (member: TeamMember) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          member.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {member.isVisible ? 'Visible' : 'Hidden'}
        </span>
      )
    },
    {
      key: 'bio',
      label: 'Bio Preview',
      render: (member: TeamMember) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 truncate">
            {member.bio || 'No bio provided'}
          </p>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (member: TeamMember) => (
        <div className="flex gap-2">
          <AdminButton 
            variant="outline" 
            size="sm"
            onClick={() => handleEditMember(member)}
          >
            <Edit className="w-4 h-4" />
          </AdminButton>
          <AdminButton 
            variant="outline" 
            size="sm"
            onClick={() => handleDeleteMember(member.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </AdminButton>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Section Management</h1>
          <p className="text-gray-600 mt-1">Manage your team members and section settings</p>
        </div>
        <div className="flex gap-3">
          <AdminButton variant="outline" onClick={() => setIsSettingsModalOpen(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Section Settings
          </AdminButton>
          <AdminButton onClick={handleAddMember}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </AdminButton>
        </div>
      </div>

      {/* Section Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard className="p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">{teamMembers.length}</h3>
              <p className="text-gray-600">Total Members</p>
            </div>
          </div>
        </AdminCard>
        
        <AdminCard className="p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">
                {teamMembers.filter(m => m.isVisible).length}
              </h3>
              <p className="text-gray-600">Visible Members</p>
            </div>
          </div>
        </AdminCard>
        
        <AdminCard className="p-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded mr-3 ${sectionSettings.isVisible ? 'bg-green-500' : 'bg-gray-400'}`} />
            <div>
              <h3 className="text-lg font-semibold">
                {sectionSettings.isVisible ? 'Active' : 'Hidden'}
              </h3>
              <p className="text-gray-600">Section Status</p>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Team Members Table */}
      <AdminCard>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>
          <AdminTable
            data={teamMembers.sort((a, b) => a.order - b.order)}
            columns={columns}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        </div>
      </AdminCard>

      {/* Live Preview */}
      <AdminCard className="p-6">
        <h2 className="text-lg font-semibold mb-4">Section Preview</h2>
        <div className={`bg-${sectionSettings.backgroundColor} p-8 rounded-lg`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {sectionSettings.title}
            </h2>
            <p className="text-lg text-gray-600">
              "{sectionSettings.subtitle}"
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.filter(m => m.isVisible).slice(0, 4).map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-32 overflow-hidden">
                  <img
                    src={member.image || '/api/placeholder/400/400'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm">{member.name}</h3>
                  <p className="text-purple-600 text-xs">{member.role}</p>
                  <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {sectionSettings.showCtaSection && (
            <div className="text-center mt-8">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-bold">{sectionSettings.volunteerCount} {sectionSettings.volunteerText}</span> across India
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-sm">
                {sectionSettings.ctaText}
              </button>
            </div>
          )}
        </div>
      </AdminCard>

      {/* Add/Edit Member Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Executive Director, Program Manager"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description about the team member..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order || 1}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Visible on website</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVisible || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AdminButton variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSaveMember}>
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </AdminButton>
          </div>
        </div>
      </AdminModal>

      {/* Section Settings Modal */}
      <AdminModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)}
        title="Section Settings"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={sectionSettings.title}
                onChange={(e) => setSectionSettings(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={sectionSettings.subtitle}
                onChange={(e) => setSectionSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <select
              value={sectionSettings.backgroundColor}
              onChange={(e) => setSectionSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {backgroundOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Call-to-Action Section</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Show CTA Section</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sectionSettings.showCtaSection}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, showCtaSection: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {sectionSettings.showCtaSection && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volunteer Count
                    </label>
                    <input
                      type="text"
                      value={sectionSettings.volunteerCount}
                      onChange={(e) => setSectionSettings(prev => ({ ...prev, volunteerCount: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volunteer Text
                    </label>
                    <input
                      type="text"
                      value={sectionSettings.volunteerText}
                      onChange={(e) => setSectionSettings(prev => ({ ...prev, volunteerText: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Volunteers & Change-Makers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={sectionSettings.ctaText}
                      onChange={(e) => setSectionSettings(prev => ({ ...prev, ctaText: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={sectionSettings.ctaLink}
                      onChange={(e) => setSectionSettings(prev => ({ ...prev, ctaLink: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm font-medium text-gray-700">Section Visible</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sectionSettings.isVisible}
                onChange={(e) => setSectionSettings(prev => ({ ...prev, isVisible: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <AdminButton variant="outline" onClick={() => setIsSettingsModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}   