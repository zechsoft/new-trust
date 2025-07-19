'use client';
import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  FileText, 
  MessageCircle, 
  Globe, 
  GraduationCap,
  Target,
  Users,
  TrendingUp,
  Star,
  Award,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  ChevronRight,
  X,
  Save,
  Upload,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function AdminJobGuidanceDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  
  // Enhanced state for different data types
  const [stats, setStats] = useState({
    totalJobs: 15000,
    activeCandidates: 50000,
    successfulPlacements: 45000,
    skillPrograms: 150,
    freelanceProjects: 8500,
    successStories: 2500
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'job', action: 'New job posted', title: 'Software Developer at TechCorp', time: '2 hours ago' },
    { id: 2, type: 'user', action: 'User completed training', title: 'React.js Fundamentals', time: '4 hours ago' },
    { id: 3, type: 'success', action: 'Success story added', title: 'Priya Sharma - Software Developer', time: '1 day ago' },
    { id: 4, type: 'freelance', action: 'Freelance project posted', title: 'Mobile App Development', time: '2 days ago' }
  ]);

  const [jobListings, setJobListings] = useState([
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Mumbai', type: 'Full-time', salary: '₹8-12 LPA', status: 'Active', applicants: 45 },
    { id: 2, title: 'UI/UX Designer', company: 'DesignHub', location: 'Bangalore', type: 'Full-time', salary: '₹6-10 LPA', status: 'Active', applicants: 32 },
    { id: 3, title: 'Backend Developer', company: 'DataSoft', location: 'Hyderabad', type: 'Full-time', salary: '₹7-11 LPA', status: 'Paused', applicants: 28 }
  ]);

  const [successStories, setSuccessStories] = useState([
    { id: 1, name: 'Priya Sharma', role: 'Software Developer', company: 'Google', image: '/api/placeholder/60/60', story: 'Landed dream job after completing React course' },
    { id: 2, name: 'Amit Kumar', role: 'Data Scientist', company: 'Microsoft', image: '/api/placeholder/60/60', story: 'Transitioned from teaching to tech' },
    { id: 3, name: 'Sneha Patel', role: 'Product Manager', company: 'Amazon', image: '/api/placeholder/60/60', story: 'From startup to Big Tech' }
  ]);

  const [skillPrograms, setSkillPrograms] = useState([
    { id: 1, title: 'React.js Fundamentals', duration: '6 weeks', enrolled: 1250, rating: 4.8, status: 'Active' },
    { id: 2, title: 'Python for Data Science', duration: '8 weeks', enrolled: 980, rating: 4.9, status: 'Active' },
    { id: 3, title: 'Digital Marketing', duration: '4 weeks', enrolled: 750, rating: 4.7, status: 'Active' }
  ]);

  const [freelanceProjects, setFreelanceProjects] = useState([
    { id: 1, title: 'E-commerce Website', budget: '₹50,000', deadline: '2024-02-15', bids: 12, status: 'Open' },
    { id: 2, title: 'Mobile App Development', budget: '₹1,20,000', deadline: '2024-03-01', bids: 8, status: 'Open' },
    { id: 3, title: 'Logo Design', budget: '₹15,000', deadline: '2024-01-30', bids: 25, status: 'In Progress' }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    switch (activeModal) {
      case 'addJob':
        const newJob = {
          id: Date.now(),
          ...formData,
          status: 'Active',
          applicants: 0
        };
        setJobListings([...jobListings, newJob]);
        setStats(prev => ({ ...prev, totalJobs: prev.totalJobs + 1 }));
        showNotification('Job posted successfully!');
        break;
        
      case 'addSuccessStory':
        const newStory = {
          id: Date.now(),
          ...formData,
          image: '/api/placeholder/60/60'
        };
        setSuccessStories([...successStories, newStory]);
        setStats(prev => ({ ...prev, successStories: prev.successStories + 1 }));
        showNotification('Success story added!');
        break;
        
      case 'addSkillProgram':
        const newProgram = {
          id: Date.now(),
          ...formData,
          enrolled: 0,
          rating: 0,
          status: 'Active'
        };
        setSkillPrograms([...skillPrograms, newProgram]);
        setStats(prev => ({ ...prev, skillPrograms: prev.skillPrograms + 1 }));
        showNotification('Skill program created!');
        break;
        
      case 'addFreelanceProject':
        const newProject = {
          id: Date.now(),
          ...formData,
          bids: 0,
          status: 'Open'
        };
        setFreelanceProjects([...freelanceProjects, newProject]);
        setStats(prev => ({ ...prev, freelanceProjects: prev.freelanceProjects + 1 }));
        showNotification('Freelance project posted!');
        break;
    }
    
    setActiveModal(null);
    setFormData({});
    
    // Add to recent activities
    const activity = {
      id: Date.now(),
      type: activeModal.includes('Job') ? 'job' : 
            activeModal.includes('Success') ? 'success' : 
            activeModal.includes('Skill') ? 'user' : 'freelance',
      action: `New ${activeModal.replace('add', '').toLowerCase()} created`,
      title: formData.title || formData.name || 'New item',
      time: 'Just now'
    };
    setRecentActivities([activity, ...recentActivities.slice(0, 9)]);
  };

  const handleDelete = (type, id) => {
    switch (type) {
      case 'job':
        setJobListings(jobListings.filter(job => job.id !== id));
        setStats(prev => ({ ...prev, totalJobs: prev.totalJobs - 1 }));
        break;
      case 'story':
        setSuccessStories(successStories.filter(story => story.id !== id));
        setStats(prev => ({ ...prev, successStories: prev.successStories - 1 }));
        break;
      case 'program':
        setSkillPrograms(skillPrograms.filter(program => program.id !== id));
        setStats(prev => ({ ...prev, skillPrograms: prev.skillPrograms - 1 }));
        break;
      case 'project':
        setFreelanceProjects(freelanceProjects.filter(project => project.id !== id));
        setStats(prev => ({ ...prev, freelanceProjects: prev.freelanceProjects - 1 }));
        break;
    }
    showNotification('Item deleted successfully!', 'success');
  };

  const managementSections = [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Manage hero content, background, and CTA buttons',
      icon: Target,
      color: 'bg-blue-500',
      count: '1 Active'
    },
    {
      id: 'stats',
      title: 'Statistics',
      description: 'Update platform statistics and metrics',
      icon: BarChart3,
      color: 'bg-green-500',
      count: '6 Metrics'
    },
    {
      id: 'job-listings',
      title: 'Job Listings',
      description: 'Manage job postings and applications',
      icon: Briefcase,
      color: 'bg-purple-500',
      count: `${stats.totalJobs} Jobs`
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      description: 'Configure resume templates and settings',
      icon: FileText,
      color: 'bg-orange-500',
      count: '12 Templates'
    },
    {
      id: 'skill-training',
      title: 'Skill Training',
      description: 'Manage training courses and certifications',
      icon: GraduationCap,
      color: 'bg-indigo-500',
      count: `${stats.skillPrograms} Programs`
    },
    {
      id: 'freelance-opportunities',
      title: 'Freelance Opportunities',
      description: 'Handle freelance projects and gigs',
      icon: Globe,
      color: 'bg-teal-500',
      count: `${stats.freelanceProjects} Projects`
    },
    {
      id: 'communication-coach',
      title: 'Communication Coach',
      description: 'Manage coaching modules and sessions',
      icon: MessageCircle,
      color: 'bg-pink-500',
      count: '25 Modules'
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'Handle testimonials and success cases',
      icon: Star,
      color: 'bg-yellow-500',
      count: `${stats.successStories} Stories`
    }
  ];

  const quickStats = [
    { label: 'Total Jobs', value: stats.totalJobs, change: '+12%', color: 'text-blue-600' },
    { label: 'Active Users', value: stats.activeCandidates, change: '+8%', color: 'text-green-600' },
    { label: 'Placements', value: stats.successfulPlacements, change: '+15%', color: 'text-purple-600' },
    { label: 'Success Rate', value: '85%', change: '+3%', color: 'text-orange-600' }
  ];

  const renderModal = () => {
    if (!activeModal) return null;

    const modalConfig = {
      addJob: {
        title: 'Add New Job Posting',
        fields: [
          { name: 'title', label: 'Job Title', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'type', label: 'Job Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
          { name: 'salary', label: 'Salary Range', type: 'text', required: true },
          { name: 'description', label: 'Job Description', type: 'textarea', rows: 4 }
        ]
      },
      addSuccessStory: {
        title: 'Add Success Story',
        fields: [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'role', label: 'Current Role', type: 'text', required: true },
          { name: 'company', label: 'Company', type: 'text', required: true },
          { name: 'story', label: 'Success Story', type: 'textarea', rows: 4, required: true }
        ]
      },
      addSkillProgram: {
        title: 'Add Skill Program',
        fields: [
          { name: 'title', label: 'Program Title', type: 'text', required: true },
          { name: 'duration', label: 'Duration', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', rows: 3 }
        ]
      },
      addFreelanceProject: {
        title: 'Add Freelance Project',
        fields: [
          { name: 'title', label: 'Project Title', type: 'text', required: true },
          { name: 'budget', label: 'Budget', type: 'text', required: true },
          { name: 'deadline', label: 'Deadline', type: 'date', required: true },
          { name: 'description', label: 'Project Description', type: 'textarea', rows: 4 }
        ]
      }
    };

    const config = modalConfig[activeModal];
    if (!config) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{config.title}</h3>
            <button 
              onClick={() => setActiveModal(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    rows={field.rows || 3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'job-listings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Listings Management</h2>
              <button
                onClick={() => setActiveModal('addJob')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Job
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobListings.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.type}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.salary}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.applicants}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete('job', job.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'success-stories':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Success Stories Management</h2>
              <button
                onClick={() => setActiveModal('addSuccessStory')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Story
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.role} at {story.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{story.story}</p>
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete('story', story.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'skill-training':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Skill Training Management</h2>
              <button
                onClick={() => setActiveModal('addSkillProgram')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Program
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {program.enrolled} enrolled
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('program', program.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'freelance-opportunities':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Freelance Opportunities Management</h2>
              <button
                onClick={() => setActiveModal('addFreelanceProject')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelanceProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {project.budget}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {project.deadline}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {project.bids} bids
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'Open' ? 'bg-green-100 text-green-800' : 
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete('project', project.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          {notification.message}
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-900">Job Guidance Admin</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentSection('dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === 'dashboard' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentSection('job-listings')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === 'job-listings' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => setCurrentSection('success-stories')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === 'success-stories' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => setCurrentSection('skill-training')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === 'skill-training' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Training
              </button>
              <button
                onClick={() => setCurrentSection('freelance-opportunities')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentSection === 'freelance-opportunities' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Freelance
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveModal('addJob')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Quick Add
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {currentSection === 'dashboard' ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Job Guidance Management</h1>
                  <p className="text-gray-600 mt-2">Manage all aspects of the job guidance platform</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      </p>
                    </div>
                    <div className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Management Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {managementSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      if (['job-listings', 'success-stories', 'skill-training', 'freelance-opportunities'].includes(section.id)) {
                        setCurrentSection(section.id);
                      } else {
                        showNotification(`${section.title} management coming soon!`, 'success');
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${section.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{section.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">{section.count}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            showNotification(`Viewing ${section.title}`, 'success');
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            showNotification(`Editing ${section.title}`, 'success');
                          }}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                  <button 
                    onClick={() => showNotification('Viewing all activities', 'success')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'job' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'user' ? 'bg-green-100 text-green-600' :
                        activity.type === 'success' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'job' && <Briefcase className="w-4 h-4" />}
                        {activity.type === 'user' && <Users className="w-4 h-4" />}
                        {activity.type === 'success' && <Star className="w-4 h-4" />}
                        {activity.type === 'freelance' && <Globe className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: 'Add New Job Posting', description: 'Create a new job opportunity', icon: Plus, color: 'bg-blue-500', action: 'addJob' },
                    { title: 'Create Success Story', description: 'Add a new testimonial', icon: Star, color: 'bg-yellow-500', action: 'addSuccessStory' },
                    { title: 'Add Training Course', description: 'Create new skill program', icon: GraduationCap, color: 'bg-green-500', action: 'addSkillProgram' },
                    { title: 'Post Freelance Project', description: 'Add new freelance opportunity', icon: BarChart3, color: 'bg-purple-500', action: 'addFreelanceProject' }
                  ].map((action, index) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        onClick={() => setActiveModal(action.action)}
                      >
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <ActionIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{action.title}</p>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          renderSectionContent()
        )}
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}