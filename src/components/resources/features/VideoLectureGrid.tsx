import { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  Eye, 
  User, 
  Search, 
  Star,
  BookOpen,
  Code,
  Brain,
  Globe,
  PlayCircle,
  Bookmark,
  Share2,
  Radio,
  X,
  Pause,
  Volume2,
  Maximize,
  List,
  ChevronRight
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
  isNew?: boolean;
  videoUrl?: string;
}

interface LiveLecture {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  startTime: string;
  attendees: number;
  category: string;
  isLive: boolean;
  streamUrl?: string;
}

interface Playlist {
  id: number;
  name: string;
  videos: VideoLecture[];
  totalDuration: string;
  thumbnail: string;
  description: string;
}

export default function VideoLectureGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredVideos, setFilteredVideos] = useState<VideoLecture[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [liveLectures, setLiveLectures] = useState<LiveLecture[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoLecture | null>(null);
  const [currentLiveStream, setCurrentLiveStream] = useState<LiveLecture | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isLivePlayerOpen, setIsLivePlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'upsc', name: 'UPSC', icon: BookOpen },
    { id: 'ssc', name: 'SSC', icon: BookOpen },
    { id: 'banking', name: 'Banking', icon: Star },
    { id: 'coding', name: 'Programming', icon: Code },
    { id: 'skills', name: 'Life Skills', icon: Brain }
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const mockVideos: VideoLecture[] = [
    {
      id: 1,
      title: 'UPSC History: Ancient India Complete Guide',
      instructor: 'Dr. Rajesh Kumar',
      category: 'upsc',
      description: 'Comprehensive coverage of Ancient Indian history for UPSC aspirants. From Indus Valley to Gupta Empire.',
      duration: '2:45:30',
      views: 125000,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      level: 'Intermediate',
      tags: ['History', 'UPSC', 'Ancient India'],
      uploadDate: '2 weeks ago',
      isNew: true,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 2,
      title: 'SSC Math: Algebra Fundamentals',
      instructor: 'Prof. Priya Sharma',
      category: 'ssc',
      description: 'Master algebraic concepts essential for SSC exams with step-by-step explanations.',
      duration: '1:30:15',
      views: 89000,
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      level: 'Beginner',
      tags: ['Math', 'SSC', 'Algebra'],
      uploadDate: '1 week ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 3,
      title: 'Banking Awareness: Latest Updates 2024',
      instructor: 'CA Anita Singh',
      category: 'banking',
      description: 'Stay updated with latest banking policies, RBI guidelines, and current affairs for bank exams.',
      duration: '3:20:45',
      views: 67000,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      level: 'Advanced',
      tags: ['Banking', 'Current Affairs', 'RBI'],
      uploadDate: '3 days ago',
      isNew: true,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 4,
      title: 'Python Programming: Complete Beginner Course',
      instructor: 'Amit Patel',
      category: 'coding',
      description: 'Learn Python from scratch with hands-on projects and real-world examples.',
      duration: '8:15:30',
      views: 234000,
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      level: 'Beginner',
      tags: ['Python', 'Programming', 'Beginner'],
      uploadDate: '1 month ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    {
      id: 5,
      title: 'Communication Skills for Career Growth',
      instructor: 'Dr. Meera Joshi',
      category: 'skills',
      description: 'Enhance your verbal and written communication skills for professional success.',
      duration: '2:10:20',
      views: 45000,
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      level: 'Intermediate',
      tags: ['Communication', 'Soft Skills', 'Career'],
      uploadDate: '5 days ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      id: 6,
      title: 'UPSC Geography: Physical Geography Masterclass',
      instructor: 'Prof. Vikram Rao',
      category: 'upsc',
      description: 'Complete physical geography coverage with maps, diagrams, and mnemonics.',
      duration: '4:05:15',
      views: 156000,
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      level: 'Advanced',
      tags: ['Geography', 'UPSC', 'Physical'],
      uploadDate: '2 weeks ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
    }
  ];

  const mockLiveLectures: LiveLecture[] = [
    {
      id: 101,
      title: 'UPSC Current Affairs Live Discussion',
      instructor: 'Dr. Priya Singh',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      startTime: '2024-01-20T14:30:00',
      attendees: 1250,
      category: 'upsc',
      isLive: true,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 102,
      title: 'SSC Math Problem Solving Session',
      instructor: 'Prof. Rajesh Kumar',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop',
      startTime: '2024-01-20T16:00:00',
      attendees: 890,
      category: 'ssc',
      isLive: true,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 103,
      title: 'Banking Regulations Update',
      instructor: 'CA Anita Sharma',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
      startTime: '2024-01-21T11:00:00',
      attendees: 670,
      category: 'banking',
      isLive: false,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    }
  ];

  const playlists: Playlist[] = [
    {
      id: 1,
      name: 'UPSC Complete Course',
      videos: mockVideos.filter(v => v.category === 'upsc'),
      totalDuration: '120+ hours',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      description: 'Comprehensive UPSC preparation course covering all subjects'
    },
    {
      id: 2,
      name: 'Python Mastery',
      videos: mockVideos.filter(v => v.category === 'coding'),
      totalDuration: '80+ hours',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      description: 'Complete Python programming course from beginner to advanced'
    },
    {
      id: 3,
      name: 'Banking Exam Prep',
      videos: mockVideos.filter(v => v.category === 'banking'),
      totalDuration: '65+ hours',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'Complete banking exam preparation with latest updates'
    }
  ];

  // Helper functions
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getLevelColor = (level: string): string => {
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

  const playVideo = (video: VideoLecture) => {
    setCurrentVideo(video);
    setIsVideoPlayerOpen(true);
    setIsPlaying(true);
  };

  const joinLiveLecture = (lecture: LiveLecture) => {
    setCurrentLiveStream(lecture);
    setIsLivePlayerOpen(true);
    setIsPlaying(true);
  };

  const openPlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setIsPlaylistOpen(true);
  };

  const bookmarkVideo = (video: VideoLecture) => {
    // Simple bookmark simulation - in real app, this would save to user's bookmarks
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const isBookmarked = bookmarks.some((b: VideoLecture) => b.id === video.id);
    
    if (isBookmarked) {
      const updated = bookmarks.filter((b: VideoLecture) => b.id !== video.id);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
    } else {
      bookmarks.push(video);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  const shareVideo = (video: VideoLecture) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show a toast notification instead of alert
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Link copied to clipboard!';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
    setCurrentVideo(null);
    setIsPlaying(false);
  };

  const closeLivePlayer = () => {
    setIsLivePlayerOpen(false);
    setCurrentLiveStream(null);
    setIsPlaying(false);
  };

  const closePlaylist = () => {
    setIsPlaylistOpen(false);
    setCurrentPlaylist(null);
  };

  useEffect(() => {
    // Filter videos
    let filtered = mockVideos;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(video => video.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredVideos(filtered);
    
    // Filter live lectures
    const filteredLive = selectedCategory === 'all' 
      ? mockLiveLectures 
      : mockLiveLectures.filter(lecture => lecture.category === selectedCategory);
    
    setLiveLectures(filteredLive.filter(lecture => lecture.isLive));
  }, [searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🎥 Free Video Lectures & Tutorials
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access expert-curated video lectures covering competitive exams, programming, and life skills
        </p>
      </div>

      {/* Live Lectures Section */}
      {liveLectures.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-500" />
            Live Lectures Happening Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {liveLectures.map((lecture) => (
              <div
                key={lecture.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-500 hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{lecture.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {lecture.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatViews(lecture.attendees)} watching
                    </span>
                  </div>
                  <button 
                    onClick={() => joinLiveLecture(lecture)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search videos, instructors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group relative"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredVideo === video.id ? 'opacity-100' : 'opacity-70'}`}>
                  <button
                    onClick={() => playVideo(video)}
                    className="p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-110"
                  >
                    <PlayCircle className="w-12 h-12 text-blue-600" />
                  </button>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </div>
                
                {/* New Badge */}
                {video.isNew && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    NEW
                  </div>
                )}
                
                {/* Level Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                  {video.level}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{video.instructor}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {video.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {video.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatViews(video.views)} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{video.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.uploadDate}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => playVideo(video)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-full font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Watch Now
                  </button>
                  
                  <button
                    onClick={() => bookmarkVideo(video)}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => shareVideo(video)}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Featured Playlists */}
      <section className="mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">📺 Featured Playlists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 duration-300"
              onClick={() => openPlaylist(playlist)}
            >
              <h4 className="text-xl font-bold mb-2">{playlist.name}</h4>
              <p className="text-purple-100 mb-4">{playlist.videos.length} videos • {playlist.totalDuration}</p>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                View Playlist
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Video Player Modal */}
      {isVideoPlayerOpen && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg w-full max-w-6xl max-h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-900">
              <h3 className="text-white font-semibold text-lg truncate">{currentVideo.title}</h3>
              <button
                onClick={closeVideoPlayer}
                className="text-white hover:text-gray-300 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <video
                src={currentVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4 bg-gray-900 text-white">
              <p className="text-sm text-gray-300 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                {currentVideo.instructor}
              </p>
              <p className="text-sm text-gray-400">{currentVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Live Stream Player Modal */}
      {isLivePlayerOpen && currentLiveStream && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg w-full max-w-6xl max-h-full overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-red-900">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 className="text-white font-semibold text-lg truncate">{currentLiveStream.title}</h3>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">LIVE</span>
              </div>
              <button
                onClick={closeLivePlayer}
                className="text-white hover:text-gray-300 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <video
                src={currentLiveStream.streamUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {formatViews(currentLiveStream.attendees)} watching
              </div>
            </div>
            <div className="p-4 bg-red-900 text-white">
              <p className="text-sm text-red-200 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                {currentLiveStream.instructor}
              </p>
              <p className="text-sm text-red-300">Live discussion and Q&A session</p>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Modal */}
      {isPlaylistOpen && currentPlaylist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentPlaylist.name}</h3>
                <p className="text-gray-600">{currentPlaylist.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{currentPlaylist.videos.length} videos</span>
                  <span>{currentPlaylist.totalDuration}</span>
                </div>
              </div>
              <button
                onClick={closePlaylist}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex h-[calc(90vh-120px)]">
              {/* Video Player Section */}
              <div className="flex-1 bg-black">
                {currentVideo ? (
                  <video
                    src={currentVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Select a video to start watching</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Playlist Sidebar */}
              <div className="w-80 bg-gray-50 overflow-y-auto">
                <div className="p-4 bg-gray-100 border-b">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <List className="w-5 h-5" />
                    Playlist ({currentPlaylist.videos.length})
                  </h4>
                </div>
                
                <div className="divide-y">
                  {currentPlaylist.videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                        currentVideo?.id === video.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                      onClick={() => {
                        setCurrentVideo(video);
                        setIsPlaying(true);
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="text-sm text-gray-500 font-medium min-w-[20px]">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                          <h5 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                            {video.title}
                          </h5>
                          <p className="text-xs text-gray-500 mb-1">{video.instructor}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{video.duration}</span>
                            <span>{formatViews(video.views)} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Current Video Info */}
            {currentVideo && (
              <div className="p-4 bg-gray-100 border-t">
                <h4 className="font-semibold text-gray-800 mb-1">{currentVideo.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{currentVideo.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {currentVideo.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatViews(currentVideo.views)} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {currentVideo.rating}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}