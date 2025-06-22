'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Award, 
  Globe,
  Save,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Move,
  Settings,
  RefreshCw,
  Upload,
  Download
} from 'lucide-react';

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  order: number;
  isActive: boolean;
}

interface SectionSettings {
  title: string;
  subtitle: string;
  isVisible: boolean;
  backgroundColor: string;
  textAlignment: 'left' | 'center' | 'right';
  animationEnabled: boolean;
}

export default function AdminWhyVolunteerPage() {
  const [benefitCards, setBenefitCards] = useState<BenefitCard[]>([
    {
      id: '1',
      title: 'Make an Impact',
      description: 'Your time and skills directly change lives and create lasting positive change in communities.',
      icon: 'Heart',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-100',
      order: 1,
      isActive: true
    },
    {
      id: '2',
      title: 'Meet Like-Minded People',
      description: 'Connect with a passionate community of changemakers who share your values and vision.',
      icon: 'Users',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
      order: 2,
      isActive: true
    },
    {
      id: '3',
      title: 'Gain Experience & Skills',
      description: 'Learn, grow, and develop valuable leadership skills that benefit both your personal and professional life.',
      icon: 'Award',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100',
      order: 3,
      isActive: true
    },
    {
      id: '4',
      title: 'Travel & Explore',
      description: 'Take advantage of opportunities to volunteer worldwide and immerse yourself in new cultures and communities.',
      icon: 'Globe',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-100',
      order: 4,
      isActive: true
    }
  ]);

  const [sectionSettings, setSectionSettings] = useState<SectionSettings>({
    title: 'Why Become a Volunteer?',
    subtitle: 'Be the change you wish to see in the world! Join a passionate community of changemakers dedicated to helping those in need. Whether you have a few hours or a lifetime to give, your time can create an impact.',
    isVisible: true,
    backgroundColor: 'bg-white',
    textAlignment: 'center',
    animationEnabled: true
  });

  const [editingCard, setEditingCard] = useState<BenefitCard | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const iconOptions = [
    { name: 'Heart', component: Heart },
    { name: 'Users', component: Users },
    { name: 'Award', component: Award },
    { name: 'Globe', component: Globe }
  ];

  const colorOptions = [
    { name: 'Red', iconColor: 'text-red-500', bgColor: 'bg-red-100' },
    { name: 'Blue', iconColor: 'text-blue-500', bgColor: 'bg-blue-100' },
    { name: 'Green', iconColor: 'text-green-500', bgColor: 'bg-green-100' },
    { name: 'Purple', iconColor: 'text-purple-500', bgColor: 'bg-purple-100' },
    { name: 'Amber', iconColor: 'text-amber-500', bgColor: 'bg-amber-100' },
    { name: 'Pink', iconColor: 'text-pink-500', bgColor: 'bg-pink-100' },
    { name: 'Indigo', iconColor: 'text-indigo-500', bgColor: 'bg-indigo-100' },
    { name: 'Emerald', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-100' }
  ];

  const handleSaveChanges = async () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleAddCard = () => {
    const newCard: BenefitCard = {
      id: Date.now().toString(),
      title: 'New Benefit',
      description: 'Description of the new benefit',
      icon: 'Heart',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
      order: benefitCards.length + 1,
      isActive: true
    };
    setBenefitCards([...benefitCards, newCard]);
    setEditingCard(newCard);
    setIsAddingNew(true);
  };

  const handleEditCard = (card: BenefitCard) => {
    setEditingCard(card);
  };

  const handleSaveCard = (updatedCard: BenefitCard) => {
    setBenefitCards(prev => 
      prev.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    setEditingCard(null);
    setIsAddingNew(false);
  };

  const handleDeleteCard = (id: string) => {
    setBenefitCards(prev => prev.filter(card => card.id !== id));
  };

  const handleToggleVisibility = (id: string) => {
    setBenefitCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isActive: !card.isActive } : card
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.name === iconName);
    return iconOption ? iconOption.component : Heart;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Why Volunteer Section</h1>
            <p className="text-gray-600">Manage the benefits and content for the volunteer section</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSaveChanges}
              disabled={saveStatus === 'saving'}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
            >
              {saveStatus === 'saving' ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
              </span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Settings */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Section Settings
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={sectionSettings.title}
                onChange={(e) => setSectionSettings(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.isVisible}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Section Visible</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sectionSettings.animationEnabled}
                  onChange={(e) => setSectionSettings(prev => ({ ...prev, animationEnabled: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Animations</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
            <textarea
              value={sectionSettings.subtitle}
              onChange={(e) => setSectionSettings(prev => ({ ...prev, subtitle: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Benefit Cards Management */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Benefit Cards</h2>
          <button
            onClick={handleAddCard}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Benefit</span>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {benefitCards.sort((a, b) => a.order - b.order).map((card) => {
              const IconComponent = getIconComponent(card.icon);
              return (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4 relative">
                  {!card.isActive && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 font-medium">Hidden</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-3">
                    <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center`}>
                      <IconComponent size={24} className={card.iconColor} />
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleToggleVisibility(card.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {card.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleEditCard(card)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                  <div className="text-xs text-gray-500">Order: {card.order}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isAddingNew ? 'Add New Benefit' : 'Edit Benefit'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingCard.description}
                  onChange={(e) => setEditingCard(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={editingCard.icon}
                    onChange={(e) => setEditingCard(prev => prev ? { ...prev, icon: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {iconOptions.map(option => (
                      <option key={option.name} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    value={colorOptions.findIndex(color => color.iconColor === editingCard.iconColor)}
                    onChange={(e) => {
                      const selectedColor = colorOptions[parseInt(e.target.value)];
                      setEditingCard(prev => prev ? { 
                        ...prev, 
                        iconColor: selectedColor.iconColor,
                        bgColor: selectedColor.bgColor 
                      } : null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {colorOptions.map((color, index) => (
                      <option key={color.name} value={index}>{color.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingCard.order}
                  onChange={(e) => setEditingCard(prev => prev ? { ...prev, order: parseInt(e.target.value) } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setEditingCard(null);
                  setIsAddingNew(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveCard(editingCard)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
        </div>
        <div className="p-6">
          <div className={`py-12 ${sectionSettings.backgroundColor}`}>
            <div className="container mx-auto px-4">
              <div className={`text-${sectionSettings.textAlignment} mb-12`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{sectionSettings.title}</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{sectionSettings.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefitCards
                  .filter(card => card.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map((card) => {
                    const IconComponent = getIconComponent(card.icon);
                    return (
                      <div key={card.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <div className={`w-12 h-12 ${card.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                          <IconComponent size={24} className={card.iconColor} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{card.title}</h3>
                        <p className="text-gray-600 text-center text-sm">{card.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}