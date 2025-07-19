'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Home,
  Scale,
  Users,
  TreePine,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Building,
  Landmark
} from 'lucide-react';

interface LegalTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface InheritanceRule {
  id: string;
  religion: string;
  maleHeir: string[];
  femaleHeir: string[];
  spouse: string;
  specialNotes: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Document {
  id: string;
  name: string;
  description: string;
  useCase: string;
  format: string;
  requirements: string[];
  templateUrl?: string;
  downloadCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface FarmerRight {
  id: string;
  title: string;
  description: string;
  details: string[];
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export default function PropertyLawAdminPage() {
  const [activeTab, setActiveTab] = useState<'terms' | 'inheritance' | 'documents' | 'farmers' | 'analytics'>('terms');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Sample data - in real app this would come from API
  const [legalTerms, setLegalTerms] = useState<LegalTerm[]>([
    {
      id: '1',
      term: 'Mutation',
      definition: 'The process of changing ownership records in government revenue records when property is transferred',
      example: 'After buying a house, you need to apply for mutation to get the property registered in your name',
      category: 'Property Transfer',
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      term: 'Encumbrance Certificate',
      definition: 'A legal document showing the transaction history of a property for a specific period',
      example: 'Banks require encumbrance certificate to verify if the property has any legal disputes before approving loans',
      category: 'Documentation',
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      term: 'Freehold',
      definition: 'Complete ownership of property and the land it stands on, with no time limit',
      example: 'Most residential houses are freehold properties where you own both the building and land',
      category: 'Ownership Types',
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-10'
    }
  ]);

  const [inheritanceRules, setInheritanceRules] = useState<InheritanceRule[]>([
    {
      id: '1',
      religion: 'Hindu',
      maleHeir: ['Sons', 'Grandsons', 'Father', 'Brothers'],
      femaleHeir: ['Daughters', 'Mother', 'Wife', 'Sisters'],
      spouse: 'Wife gets equal share with sons',
      specialNotes: [
        'Hindu Succession Act 2005 gives equal rights to daughters',
        'Coparcenary rights from birth for sons and daughters'
      ],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      religion: 'Muslim',
      maleHeir: ['Sons (2 shares)', 'Father', 'Husband', 'Brothers'],
      femaleHeir: ['Daughters (1 share)', 'Mother', 'Wife', 'Sisters'],
      spouse: 'Wife gets 1/8th if children exist, 1/4th if no children',
      specialNotes: [
        'Male heirs get double share compared to female heirs',
        'Maximum 1/3rd can be given as gift/will to non-heirs'
      ],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-12'
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Sale Agreement',
      description: 'Contract between buyer and seller for property purchase',
      useCase: 'Property buying/selling',
      format: 'Stamp paper with registration',
      requirements: ['Property details', 'Payment terms', 'Possession date', 'Both parties signatures'],
      downloadCount: 1250,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Rent Agreement',
      description: 'Contract between landlord and tenant for property rental',
      useCase: 'Renting residential/commercial property',
      format: 'Stamp paper (₹100-500 depending on rent)',
      requirements: ['Monthly rent', 'Security deposit', 'Duration', 'Maintenance terms'],
      downloadCount: 890,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    }
  ]);

  const [farmerRights, setFarmerRights] = useState<FarmerRight[]>([
    {
      id: '1',
      title: 'Land Acquisition Rights',
      description: 'Fair compensation when government acquires agricultural land',
      details: [
        'Compensation at 4 times the market value for rural areas',
        'Compensation at 2 times for urban areas',
        'Rehabilitation and resettlement benefits'
      ],
      category: 'Compensation',
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    }
  ]);

  const handleSave = (data: any) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (activeTab === 'terms') {
      if (editingItem) {
        // Update existing term
        setLegalTerms(prev => prev.map(term => 
          term.id === editingItem.id 
            ? { ...term, ...formData, updatedAt: currentDate }
            : term
        ));
      } else {
        // Add new term
        const newTerm = {
          id: Date.now().toString(),
          ...formData,
          createdAt: currentDate,
          updatedAt: currentDate
        };
        setLegalTerms(prev => [...prev, newTerm]);
      }
    } else if (activeTab === 'inheritance') {
      if (editingItem) {
        setInheritanceRules(prev => prev.map(rule => 
          rule.id === editingItem.id 
            ? { ...rule, ...formData, updatedAt: currentDate }
            : rule
        ));
      } else {
        const newRule = {
          id: Date.now().toString(),
          ...formData,
          createdAt: currentDate,
          updatedAt: currentDate
        };
        setInheritanceRules(prev => [...prev, newRule]);
      }
    } else if (activeTab === 'documents') {
      if (editingItem) {
        setDocuments(prev => prev.map(doc => 
          doc.id === editingItem.id 
            ? { ...doc, ...formData, updatedAt: currentDate }
            : doc
        ));
      } else {
        const newDoc = {
          id: Date.now().toString(),
          downloadCount: 0,
          ...formData,
          createdAt: currentDate,
          updatedAt: currentDate
        };
        setDocuments(prev => [...prev, newDoc]);
      }
    } else if (activeTab === 'farmers') {
      if (editingItem) {
        setFarmerRights(prev => prev.map(right => 
          right.id === editingItem.id 
            ? { ...right, ...formData, updatedAt: currentDate }
            : right
        ));
      } else {
        const newRight = {
          id: Date.now().toString(),
          ...formData,
          createdAt: currentDate,
          updatedAt: currentDate
        };
        setFarmerRights(prev => [...prev, newRight]);
      }
    }
    
    closeModal();
  };

  const handleDelete = (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'term') {
        setLegalTerms(prev => prev.filter(term => term.id !== id));
      } else if (type === 'inheritance') {
        setInheritanceRules(prev => prev.filter(rule => rule.id !== id));
      } else if (type === 'document') {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
      } else if (type === 'farmer') {
        setFarmerRights(prev => prev.filter(right => right.id !== id));
      }
    }
  };

  const toggleStatus = (id: string, type: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (type === 'term') {
      setLegalTerms(prev => prev.map(term => 
        term.id === id 
          ? { ...term, status: newStatus, updatedAt: currentDate }
          : term
      ));
    } else if (type === 'inheritance') {
      setInheritanceRules(prev => prev.map(rule => 
        rule.id === id 
          ? { ...rule, status: newStatus, updatedAt: currentDate }
          : rule
      ));
    } else if (type === 'document') {
      setDocuments(prev => prev.map(doc => 
        doc.id === id 
          ? { ...doc, status: newStatus, updatedAt: currentDate }
          : doc
      ));
    } else if (type === 'farmer') {
      setFarmerRights(prev => prev.map(right => 
        right.id === id 
          ? { ...right, status: newStatus, updatedAt: currentDate }
          : right
      ));
    }
  };

  const openPreview = (item: any) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewItem(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openModal = (type: string, item?: any) => {
    setEditingItem(item || null);
    if (item) {
      setFormData(item);
    } else {
      setFormData({ status: 'active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const filteredTerms = legalTerms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Law Section Admin</h1>
              <p className="text-gray-600">Manage legal terms, inheritance laws, documents, and farmer rights</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              Import Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{legalTerms.length}</div>
                <div className="text-gray-600">Legal Terms</div>
              </div>
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{inheritanceRules.length}</div>
                <div className="text-gray-600">Inheritance Rules</div>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
                <div className="text-gray-600">Document Templates</div>
              </div>
              <FileText className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{farmerRights.length}</div>
                <div className="text-gray-600">Farmer Rights</div>
              </div>
              <TreePine className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { id: 'terms', label: 'Legal Terms', icon: <Scale className="w-4 h-4" /> },
            { id: 'inheritance', label: 'Inheritance', icon: <Users className="w-4 h-4" /> },
            { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
            { id: 'farmers', label: 'Farmer Rights', icon: <TreePine className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legal Terms Tab */}
      {activeTab === 'terms' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Legal Terms Management</h3>
                <button
                  onClick={() => openModal('term')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Term
                </button>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Definition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTerms.map((term) => (
                    <tr key={term.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{term.term}</div>
                        <div className="text-sm text-gray-500">Updated: {term.updatedAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{term.definition}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {term.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          term.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {term.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal('term', term)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openPreview(term)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(term.id, 'term')}
                            className="p-1 text-gray-400 hover:text-red-600"
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
        </motion.div>
      )}

      {/* Inheritance Rules Tab */}
      {activeTab === 'inheritance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Inheritance Rules Management</h3>
                <button
                  onClick={() => openModal('inheritance')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Rule
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inheritanceRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Landmark className="w-6 h-6 text-purple-600" />
                        <h4 className="text-lg font-semibold text-gray-900">{rule.religion} Law</h4>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rule.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rule.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Male Heirs:</h5>
                        <div className="text-sm text-gray-600">{rule.maleHeir.join(', ')}</div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Female Heirs:</h5>
                        <div className="text-sm text-gray-600">{rule.femaleHeir.join(', ')}</div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Spouse Rights:</h5>
                        <div className="text-sm text-gray-600">{rule.spouse}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('inheritance', rule)}
                        className="flex-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openPreview(rule)}
                        className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id, 'inheritance')}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Document Templates Management</h3>
                <button
                  onClick={() => openModal('document')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Document
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-red-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.useCase}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{doc.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Downloads:</span>
                        <span className="font-medium">{doc.downloadCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">{doc.format}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('document', doc)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => openPreview(doc)}
                        className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Farmer Rights Tab */}
      {activeTab === 'farmers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Farmer Rights Management</h3>
                <button
                  onClick={() => openModal('farmer')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Right
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {farmerRights.map((right) => (
                  <div key={right.id} className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <TreePine className="w-6 h-6 text-green-600" />
                        <h4 className="text-lg font-semibold text-gray-900">{right.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          right.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {right.status}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {right.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{right.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {right.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('farmer', right)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openPreview(right)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDelete(right.id, 'farmer')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Usage</h3>
              <div className="space-y-4">
                {[
                  { name: 'Legal Terms Views', count: 12500, change: '+15%' },
                  { name: 'Inheritance Queries', count: 8900, change: '+22%' },
                  { name: 'Document Downloads', count: 5600, change: '+8%' },
                  { name: 'Farmer Rights Views', count: 3400, change: '+12%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-green-600">{item.change} from last month</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{item.count.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Content</h3>
              <div className="space-y-4">
                {[
                  { name: 'Sale Agreement Template', downloads: 2450 },
                  { name: 'Hindu Inheritance Guide', views: 1890 },
                  { name: 'Mutation Definition', views: 1560 },
                  { name: 'Land Acquisition Rights', views: 1320 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 truncate max-w-xs">{item.name}</div>
                    <div className="text-lg font-bold text-gray-900">{item.downloads || item.views}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-800 mb-2">Average Time Spent</div>
                <div className="text-2xl font-bold text-blue-900">4.2 mins</div>
                <div className="text-xs text-blue-600 mt-1">+12% from last month</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-800 mb-2">Returning Visitors</div>
                <div className="text-2xl font-bold text-green-900">68%</div>
                <div className="text-xs text-green-600 mt-1">+5% from last month</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-purple-800 mb-2">Consultation Requests</div>
                <div className="text-2xl font-bold text-purple-900">124</div>
                <div className="text-xs text-purple-600 mt-1">+18% from last month</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit' : 'Add New'} {activeTab === 'terms' ? 'Legal Term' : 
                     activeTab === 'inheritance' ? 'Inheritance Rule' :
                     activeTab === 'documents' ? 'Document' : 'Farmer Right'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  {activeTab === 'terms' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
                        <input
                          type="text"
                          value={formData.term || ''}
                          onChange={(e) => handleInputChange('term', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter legal term"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Definition</label>
                        <textarea
                          value={formData.definition || ''}
                          onChange={(e) => handleInputChange('definition', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter detailed definition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Example (Optional)</label>
                        <textarea
                          value={formData.example || ''}
                          onChange={(e) => handleInputChange('example', e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter example usage"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter category"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'inheritance' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                        <input
                          type="text"
                          value={formData.religion || ''}
                          onChange={(e) => handleInputChange('religion', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter religion"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Male Heirs (comma separated)</label>
                        <textarea
                          value={formData.maleHeir?.join(', ') || ''}
                          onChange={(e) => handleInputChange('maleHeir', e.target.value.split(',').map(item => item.trim()))}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter male heirs in order of priority"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Female Heirs (comma separated)</label>
                        <textarea
                          value={formData.femaleHeir?.join(', ') || ''}
                          onChange={(e) => handleInputChange('femaleHeir', e.target.value.split(',').map(item => item.trim()))}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter female heirs in order of priority"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Rights</label>
                        <textarea
                          value={formData.spouse || ''}
                          onChange={(e) => handleInputChange('spouse', e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe spouse inheritance rights"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'documents' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter document name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter document description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
                        <input
                          type="text"
                          value={formData.useCase || ''}
                          onChange={(e) => handleInputChange('useCase', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter when this document is used"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                        <input
                          type="text"
                          value={formData.format || ''}
                          onChange={(e) => handleInputChange('format', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter document format"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'farmers' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter right title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter detailed description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={formData.category || ''}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter category"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Details (one per line)</label>
                        <textarea
                          value={formData.details?.join('\n') || ''}
                          onChange={(e) => handleInputChange('details', e.target.value.split('\n'))}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter key details, one per line"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave(formData)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingItem ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Preview: {previewItem.term || previewItem.religion || previewItem.name || previewItem.title}
                  </h3>
                  <button onClick={closePreview} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Term:</h4>
                      <p className="text-gray-900">{previewItem.term}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Definition:</h4>
                      <p className="text-gray-900">{previewItem.definition}</p>
                    </div>
                    {previewItem.example && (
                      <div>
                        <h4 className="font-semibold text-gray-700">Example:</h4>
                        <p className="text-gray-900">{previewItem.example}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-700">Category:</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {previewItem.category}
                      </span>
                    </div>
                  </div>
                )}
                
                {activeTab === 'inheritance' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Religion:</h4>
                      <p className="text-gray-900">{previewItem.religion}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Male Heirs:</h4>
                      <ul className="list-disc list-inside text-gray-900">
                        {previewItem.maleHeir?.map((heir: string, idx: number) => (
                          <li key={idx}>{heir}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Female Heirs:</h4>
                      <ul className="list-disc list-inside text-gray-900">
                        {previewItem.femaleHeir?.map((heir: string, idx: number) => (
                          <li key={idx}>{heir}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Spouse Rights:</h4>
                      <p className="text-gray-900">{previewItem.spouse}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Document Name:</h4>
                      <p className="text-gray-900">{previewItem.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Description:</h4>
                      <p className="text-gray-900">{previewItem.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Use Case:</h4>
                      <p className="text-gray-900">{previewItem.useCase}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Format:</h4>
                      <p className="text-gray-900">{previewItem.format}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Downloads:</h4>
                      <p className="text-gray-900">{previewItem.downloadCount}</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'farmers' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Title:</h4>
                      <p className="text-gray-900">{previewItem.title}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Description:</h4>
                      <p className="text-gray-900">{previewItem.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Category:</h4>
                      <p className="text-gray-900">{previewItem.category}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Key Details:</h4>
                      <ul className="list-disc list-inside text-gray-900">
                        {previewItem.details?.map((detail: string, idx: number) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Status: <span className={previewItem.status === 'active' ? 'text-green-600' : 'text-red-600'}>{previewItem.status}</span></span>
                    <span>Last updated: {previewItem.updatedAt}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}