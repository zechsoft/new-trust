'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  Filter,
  Search,
  Clock,
  Users,
  Star,
  PlayCircle,
  MoreVertical,
  Calendar,
  Tag,
  TrendingUp,
  AlertCircle,
  Radio,
  Wifi,
  Pause,
  Play,
  Square,
  Settings,
  UserCheck,
  MessageCircle,
  Share,
  
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import {
  // ... other imports
  Mic,
  Circle,
  Dot,
  // ... rest of your imports
} from 'lucide-react';
interface VideoLecture {
  id: number;
  title: string;
  instructor: string;
  category: string;
  description: string;
  duration: string;
  views: number;
  rating: number;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  uploadDate: string;
  status: 'Published' | 'Draft' | 'Review';
  isNew?: boolean;
  featured?: boolean;
}

interface LiveLecture {
  id: number;
  title: string;
  instructor: string;
  category: string;
  description: string;
  scheduledTime: string;
  duration: string;
  status: 'Scheduled' | 'Live' | 'Ended' | 'Cancelled';
  attendees: number;
  maxAttendees: number;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isRecording?: boolean;
  chatEnabled?: boolean;
  meetingLink?: string;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ConfirmDialogState {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  type: 'danger' | 'warning' | 'info';
}

export default function AdminVideoLectures() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'live'>('videos');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false, message: '', type: 'info'
  });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    show: false, title: '', message: '', onConfirm: () => {}, type: 'info'
  });

  // Form states
  const [uploadForm, setUploadForm] = useState({
    title: '',
    instructor: '',
    category: 'UPSC',
    description: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    tags: '',
    file: null as File | null
  });

  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    instructor: '',
    category: 'UPSC',
    description: '',
    scheduledTime: '',
    duration: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    maxAttendees: 100,
    tags: '',
    chatEnabled: true,
    isRecording: false
  });

  const categories = ['all', 'UPSC', 'SSC', 'RRB', 'Banking', 'TNPSC', 'Programming', 'Life Skills'];
  const statuses = ['all', 'Published', 'Draft', 'Review'];
  const liveStatuses = ['all', 'Scheduled', 'Live', 'Ended', 'Cancelled'];

  const [mockVideos, setMockVideos] = useState<VideoLecture[]>([
    {
      id: 1,
      title: 'UPSC Current Affairs 2024 - Complete Analysis',
      instructor: 'Dr. Priya Singh',
      category: 'UPSC',
      description: 'Comprehensive analysis of current affairs for UPSC preparation with monthly updates and key highlights.',
      duration: '2:45:30',
      views: 125000,
      rating: 4.8,
      thumbnail: '/api/placeholder/400/300',
      level: 'Intermediate',
      tags: ['UPSC', 'Current Affairs', 'Analysis'],
      uploadDate: '2024-01-15',
      status: 'Published',
      isNew: true,
      featured: true
    },
    {
      id: 2,
      title: 'SSC Math Shortcuts and Tricks',
      instructor: 'Prof. Rajesh Kumar',
      category: 'SSC',
      description: 'Learn time-saving math shortcuts and tricks for SSC examinations with practice problems.',
      duration: '1:30:45',
      views: 89000,
      rating: 4.7,
      thumbnail: '/api/placeholder/400/300',
      level: 'Beginner',
      tags: ['SSC', 'Mathematics', 'Shortcuts'],
      uploadDate: '2024-01-10',
      status: 'Published',
      featured: false
    },
    {
      id: 3,
      title: 'Banking Awareness Draft Course',
      instructor: 'CA Anita Sharma',
      category: 'Banking',
      description: 'Complete banking awareness course covering all banking concepts, RBI guidelines, and recent updates.',
      duration: '3:15:20',
      views: 0,
      rating: 0,
      thumbnail: '/api/placeholder/400/300',
      level: 'Advanced',
      tags: ['Banking', 'Finance', 'RBI'],
      uploadDate: '2024-01-20',
      status: 'Draft',
      featured: false
    },
    {
      id: 4,
      title: 'Python for Beginners - Under Review',
      instructor: 'Tech Academy',
      category: 'Programming',
      description: 'Learn Python programming from scratch with hands-on projects and real-world applications.',
      duration: '8:30:15',
      views: 0,
      rating: 0,
      thumbnail: '/api/placeholder/400/300',
      level: 'Beginner',
      tags: ['Python', 'Programming', 'Beginner'],
      uploadDate: '2024-01-18',
      status: 'Review',
      featured: false
    }
  ]);

  const [mockLiveLectures, setMockLiveLectures] = useState<LiveLecture[]>([
    {
      id: 1,
      title: 'UPSC Mains Strategy Session - Live Q&A',
      instructor: 'Dr. Priya Singh',
      category: 'UPSC',
      description: 'Interactive session discussing UPSC Mains strategy with live Q&A and doubt clearing.',
      scheduledTime: '2024-07-30T10:00:00',
      duration: '2:00:00',
      status: 'Live',
      attendees: 1250,
      maxAttendees: 2000,
      thumbnail: '/api/placeholder/400/300',
      level: 'Intermediate',
      tags: ['UPSC', 'Mains', 'Strategy', 'Live'],
      isRecording: true,
      chatEnabled: true,
      meetingLink: 'https://meet.example.com/upsc-mains-session'
    },
    {
      id: 2,
      title: 'SSC CGL Math Problem Solving',
      instructor: 'Prof. Rajesh Kumar',
      category: 'SSC',
      description: 'Live problem-solving session for SSC CGL mathematics with real-time doubt clearing.',
      scheduledTime: '2024-07-30T14:00:00',
      duration: '1:30:00',
      status: 'Scheduled',
      attendees: 0,
      maxAttendees: 1500,
      thumbnail: '/api/placeholder/400/300',
      level: 'Beginner',
      tags: ['SSC', 'Mathematics', 'Problem Solving'],
      isRecording: false,
      chatEnabled: true,
      meetingLink: 'https://meet.example.com/ssc-math-session'
    },
    {
      id: 3,
      title: 'Banking Current Affairs Weekly Update',
      instructor: 'CA Anita Sharma',
      category: 'Banking',
      description: 'Weekly current affairs update specifically for banking examinations with key highlights.',
      scheduledTime: '2024-07-28T16:00:00',
      duration: '1:00:00',
      status: 'Ended',
      attendees: 890,
      maxAttendees: 1000,
      thumbnail: '/api/placeholder/400/300',
      level: 'Intermediate',
      tags: ['Banking', 'Current Affairs', 'Weekly Update'],
      isRecording: true,
      chatEnabled: true
    },
    {
      id: 4,
      title: 'Python Web Development Bootcamp',
      instructor: 'Tech Academy',
      category: 'Programming',
      description: 'Intensive live bootcamp covering Python web development with Django framework.',
      scheduledTime: '2024-07-31T09:00:00',
      duration: '4:00:00',
      status: 'Scheduled',
      attendees: 0,
      maxAttendees: 500,
      thumbnail: '/api/placeholder/400/300',
      level: 'Advanced',
      tags: ['Python', 'Web Development', 'Django', 'Bootcamp'],
      isRecording: true,
      chatEnabled: true,
      meetingLink: 'https://meet.example.com/python-bootcamp'
    }
  ]);

  // Utility functions
  const showNotification = (message: string, type: NotificationState['type'] = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  const showConfirmDialog = (title: string, message: string, onConfirm: () => void, type: ConfirmDialogState['type'] = 'info') => {
    setConfirmDialog({ show: true, title, message, onConfirm, type });
  };

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || video.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredLiveLectures = mockLiveLectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || lecture.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || lecture.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
      case 'Live':
        return 'bg-green-100 text-green-800';
      case 'Draft':
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ended':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const getTimeUntilStart = (scheduledTime: string) => {
    const now = new Date();
    const start = new Date(scheduledTime);
    const diff = start.getTime() - now.getTime();
    
    if (diff <= 0) return 'Started';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`;
    }
    return `Starts in ${minutes}m`;
  };

  // Event handlers
  const handleEdit = (item: VideoLecture | LiveLecture) => {
    showNotification(`Opening edit dialog for: ${item.title}`, 'info');
    // In real implementation, this would open an edit modal
  };

  const handleDelete = (item: VideoLecture | LiveLecture) => {
    showConfirmDialog(
      'Delete Confirmation',
      `Are you sure you want to delete "${item.title}"? This action cannot be undone.`,
      () => {
        if (activeTab === 'videos') {
          setMockVideos(prev => prev.filter(v => v.id !== item.id));
          showNotification('Video deleted successfully', 'success');
        } else {
          setMockLiveLectures(prev => prev.filter(l => l.id !== item.id));
          showNotification('Live lecture deleted successfully', 'success');
        }
      },
      'danger'
    );
  };

  const handleView = (item: VideoLecture | LiveLecture) => {
    showNotification(`Opening viewer for: ${item.title}`, 'info');
    // In real implementation, this would open the video/lecture viewer
  };

  const handleJoinLive = (lecture: LiveLecture) => {
    if (lecture.meetingLink) {
      showNotification(`Joining live session: ${lecture.title}`, 'success');
      // In real implementation: window.open(lecture.meetingLink, '_blank');
    } else {
      showNotification('Meeting link not available', 'error');
    }
  };

  const handleStartLive = (lecture: LiveLecture) => {
    showConfirmDialog(
      'Start Live Session',
      `Are you ready to start the live session "${lecture.title}"?`,
      () => {
        setMockLiveLectures(prev => prev.map(l => 
          l.id === lecture.id ? { ...l, status: 'Live' as const } : l
        ));
        showNotification('Live session started successfully', 'success');
      },
      'info'
    );
  };

  const handleEndLive = (lecture: LiveLecture) => {
    showConfirmDialog(
      'End Live Session',
      `Are you sure you want to end the live session "${lecture.title}"?`,
      () => {
        setMockLiveLectures(prev => prev.map(l => 
          l.id === lecture.id ? { ...l, status: 'Ended' as const } : l
        ));
        showNotification('Live session ended successfully', 'success');
      },
      'warning'
    );
  };

  const handleToggleFeatured = (video: VideoLecture) => {
    setMockVideos(prev => prev.map(v => 
      v.id === video.id ? { ...v, featured: !v.featured } : v
    ));
    showNotification(
      `Video ${video.featured ? 'removed from' : 'added to'} featured list`, 
      'success'
    );
  };

  const handleUploadVideo = () => {
    if (!uploadForm.title || !uploadForm.instructor) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const newVideo: VideoLecture = {
      id: Date.now(),
      title: uploadForm.title,
      instructor: uploadForm.instructor,
      category: uploadForm.category,
      description: uploadForm.description,
      duration: '0:00:00', // Would be calculated from actual file
      views: 0,
      rating: 0,
      thumbnail: '/api/placeholder/400/300',
      level: uploadForm.level,
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Draft',
      isNew: true,
      featured: false
    };

    setMockVideos(prev => [newVideo, ...prev]);
    setShowUploadModal(false);
    setUploadForm({
      title: '', instructor: '', category: 'UPSC', description: '',
      level: 'Beginner', tags: '', file: null
    });
    showNotification('Video uploaded successfully', 'success');
  };

  const handleScheduleLive = () => {
    if (!scheduleForm.title || !scheduleForm.instructor || !scheduleForm.scheduledTime) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const newLecture: LiveLecture = {
      id: Date.now(),
      title: scheduleForm.title,
      instructor: scheduleForm.instructor,
      category: scheduleForm.category,
      description: scheduleForm.description,
      scheduledTime: scheduleForm.scheduledTime,
      duration: scheduleForm.duration,
      status: 'Scheduled',
      attendees: 0,
      maxAttendees: scheduleForm.maxAttendees,
      thumbnail: '/api/placeholder/400/300',
      level: scheduleForm.level,
      tags: scheduleForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isRecording: scheduleForm.isRecording,
      chatEnabled: scheduleForm.chatEnabled,
      meetingLink: `https://meet.example.com/${scheduleForm.title.toLowerCase().replace(/\s+/g, '-')}`
    };

    setMockLiveLectures(prev => [newLecture, ...prev]);
    setShowScheduleModal(false);
    setScheduleForm({
      title: '', instructor: '', category: 'UPSC', description: '',
      scheduledTime: '', duration: '', level: 'Beginner', maxAttendees: 100,
      tags: '', chatEnabled: true, isRecording: false
    });
    showNotification('Live lecture scheduled successfully', 'success');
  };

  const handleExport = () => {
    const data = activeTab === 'videos' ? filteredVideos : filteredLiveLectures;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTab}-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully', 'success');
  };

  // Render functions
  const renderLiveGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredLiveLectures.map((lecture, index) => (
        <motion.div
          key={lecture.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <Radio className="w-12 h-12 text-gray-400" />
            </div>
            
            {/* Status Badge */}
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lecture.status)}`}>
              <div className="flex items-center gap-1">
                {lecture.status === 'Live' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                {lecture.status}
              </div>
            </div>
            
            {/* Duration */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
              {lecture.duration}
            </div>
            
            {/* Recording Badge */}
            {lecture.isRecording && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Recording className="w-3 h-3" />
                REC
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{lecture.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{lecture.instructor}</p>
            
            {/* Category & Level */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {lecture.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(lecture.level)}`}>
                {lecture.level}
              </span>
            </div>
            
            {/* Schedule & Attendees */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDateTime(lecture.scheduledTime)}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{lecture.attendees}/{lecture.maxAttendees} attendees</span>
              </div>
              
              {lecture.status === 'Scheduled' && (
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span>{getTimeUntilStart(lecture.scheduledTime)}</span>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              {lecture.status === 'Live' ? (
                <button
                  onClick={() => handleJoinLive(lecture)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Wifi className="w-4 h-4" />
                  Join Live
                </button>
              ) : lecture.status === 'Scheduled' ? (
                <button
                  onClick={() => handleStartLive(lecture)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Start
                </button>
              ) : (
                <button
                  onClick={() => handleView(lecture)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              )}
              
              <button
                onClick={() => handleEdit(lecture)}
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
  );

  const renderVideoGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredVideos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-gray-400" />
            </div>
            
            {/* Status Badge */}
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
              {video.status}
            </div>
            
            {/* Duration */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
              {video.duration}
            </div>
            
            {/* Featured Badge */}
            {video.featured && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            )}
            
            {/* New Badge */}
            {video.isNew && (
              <div className="absolute top-8 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                NEW
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{video.instructor}</p>
            
            {/* Category & Level */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {video.category}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(video.level)}`}>
                {video.level}
              </span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatViews(video.views)}</span>
              </div>
              {video.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{video.rating}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{video.uploadDate}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleView(video)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => handleEdit(video)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <div className="relative">
                <button 
                  onClick={() => handleToggleFeatured(video)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={video.featured ? "Remove from featured" : "Add to featured"}
                >
                  <Star className={`w-4 h-4 ${video.featured ? 'text-yellow-500 fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTableView = () => {
    if (activeTab === 'live') {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Live Lecture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLiveLectures.map((lecture) => (
                  <tr key={lecture.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 h-10 bg-gray-200 rounded mr-4 flex items-center justify-center">
                          <Radio className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{lecture.title}</div>
                          <div className="text-sm text-gray-600">{lecture.instructor}</div>
                          <div className="text-xs text-gray-500">{lecture.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {lecture.category}
                        </span>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${getLevelColor(lecture.level)}`}>
                          {lecture.level}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${getStatusColor(lecture.status)}`}>
                          <div className="flex items-center gap-1">
                            {lecture.status === 'Live' && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                            {lecture.status}
                          </div>
                        </span>
                        {lecture.isRecording && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full inline-block">
                            Recording
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{lecture.attendees}/{lecture.maxAttendees}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round((lecture.attendees / lecture.maxAttendees) * 100)}% capacity
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{formatDateTime(lecture.scheduledTime)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {lecture.status === 'Live' ? (
                          <>
                            <button
                              onClick={() => handleJoinLive(lecture)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                              title="Join Live"
                            >
                              <Wifi className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEndLive(lecture)}
                              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="End Live"
                            >
                              <Square className="w-4 h-4" />
                            </button>
                          </>
                        ) : lecture.status === 'Scheduled' ? (
                          <button
                            onClick={() => handleStartLive(lecture)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Start Live"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleView(lecture)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(lecture)}
                          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(lecture)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
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
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVideos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 h-10 bg-gray-200 rounded mr-4 flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">{video.title}</div>
                        <div className="text-sm text-gray-600">{video.instructor}</div>
                        <div className="text-xs text-gray-500">{video.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {video.category}
                      </span>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${getLevelColor(video.level)}`}>
                        {video.level}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${getStatusColor(video.status)}`}>
                        {video.status}
                      </span>
                      {video.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full inline-block">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{formatViews(video.views)}</td>
                  <td className="px-6 py-4">
                    {video.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-gray-900">{video.rating}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{video.uploadDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(video)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(video)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(video)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(video)}
                        className={`p-1 hover:bg-orange-100 rounded transition-colors ${
                          video.featured ? 'text-orange-600' : 'text-gray-400'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${video.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className={`rounded-lg p-4 shadow-lg border ${
            notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' && <Check className="w-5 h-5" />}
              {notification.type === 'error' && <X className="w-5 h-5" />}
              {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              {notification.type === 'info' && <AlertCircle className="w-5 h-5" />}
              <span>{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              {confirmDialog.type === 'danger' && <AlertTriangle className="w-6 h-6 text-red-500" />}
              {confirmDialog.type === 'warning' && <AlertTriangle className="w-6 h-6 text-yellow-500" />}
              {confirmDialog.type === 'info' && <AlertCircle className="w-6 h-6 text-blue-500" />}
              <h3 className="text-lg font-semibold text-gray-900">{confirmDialog.title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{confirmDialog.message}</p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setConfirmDialog(prev => ({ ...prev, show: false }))}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(prev => ({ ...prev, show: false }));
                }}
                className={`px-4 py-2 text-white rounded-lg transition-colors ${
                  confirmDialog.type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
                  confirmDialog.type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Upload New Video</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter video title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                <input
                  type="text"
                  value={uploadForm.instructor}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, instructor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={uploadForm.level}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, level: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter video description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">MP4, MOV, AVI up to 2GB</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadVideo}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Live Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Schedule Live Lecture</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={scheduleForm.title}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lecture title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                <input
                  type="text"
                  value={scheduleForm.instructor}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, instructor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter instructor name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={scheduleForm.category}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={scheduleForm.level}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, level: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time *</label>
                  <input
                    type="datetime-local"
                    value={scheduleForm.scheduledTime}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1:30:00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees</label>
                <input
                  type="number"
                  value={scheduleForm.maxAttendees}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) || 100 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lecture description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  value={scheduleForm.tags}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={scheduleForm.chatEnabled}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, chatEnabled: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Enable Chat</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={scheduleForm.isRecording}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, isRecording: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Auto Record</span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleLive}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Schedule Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Video & Live Lectures Management</h1>
              <p className="text-gray-600">Manage all video lectures, live sessions, and educational content</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
              {activeTab === 'videos' ? (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Video
                </button>
              ) : (
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Schedule Live
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 p-1 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'videos' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Video className="w-4 h-4" />
            Video Lectures
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'live' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Radio className="w-4 h-4" />
            Live Lectures
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {activeTab === 'videos' ? (
            <>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Videos</p>
                    <p className="text-2xl font-bold text-gray-800">{mockVideos.length}</p>
                  </div>
                  <Video className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Published</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockVideos.filter(v => v.status === 'Published').length}
                    </p>
                  </div>
                  <PlayCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Views</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatViews(mockVideos.reduce((sum, v) => sum + v.views, 0))}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {mockVideos.filter(v => v.status === 'Review').length}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Live Sessions</p>
                    <p className="text-2xl font-bold text-gray-800">{mockLiveLectures.length}</p>
                  </div>
                  <Radio className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Currently Live</p>
                    <p className="text-2xl font-bold text-red-600">
                      {mockLiveLectures.filter(l => l.status === 'Live').length}
                    </p>
                  </div>
                  <Wifi className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Attendees</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatViews(mockLiveLectures.reduce((sum, l) => sum + l.attendees, 0))}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Scheduled</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {mockLiveLectures.filter(l => l.status === 'Scheduled').length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'videos' ? 'videos' : 'live lectures'}, instructors, or tags...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {(activeTab === 'videos' ? statuses : liveStatuses).map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded transition-colors ${
                    viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        {activeTab === 'videos' ? (
          filteredVideos.length === 0 ? (
            <div className="bg-white rounded-xl p-16 shadow-lg border border-gray-200 text-center">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No videos found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            viewMode === 'grid' ? renderVideoGridView() : renderTableView()
          )
        ) : (
          filteredLiveLectures.length === 0 ? (
            <div className="bg-white rounded-xl p-16 shadow-lg border border-gray-200 text-center">
              <Radio className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No live lectures found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            viewMode === 'grid' ? renderLiveGridView() : renderTableView()
          )
        )}
      </div>
    </div>
  );
}