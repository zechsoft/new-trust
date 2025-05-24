'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Eye, 
  User, 
  Filter, 
  Search, 
  Star,
  BookOpen,
  Code,
  Brain,
  Globe,
  PlayCircle,
  Bookmark,
  Share2
} from 'lucide-react';
import Image from 'next/image';

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
}

export default function VideoLectureGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredVideos, setFilteredVideos] = useState<VideoLecture[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

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
      title: 'UPSC Current Affairs 2024 - Complete Analysis',
      instructor: 'Dr. Priya Singh',
      category: 'upsc',
      description: 'Comprehensive analysis of current affairs for UPSC preparation with monthly updates and key highlights.',
      duration: '2:45:30',
      views: 125000,
      rating: 4.8,
      thumbnail: '/api/placeholder/400/300',
      level: 'Intermediate',
      tags: ['UPSC', 'Current Affairs', 'Analysis'],
      uploadDate: '2024-01-15',
      isNew: true
    },
    {
      id: 2,
      title: 'SSC Math Shortcuts and Tricks',
      instructor: 'Prof. Rajesh Kumar',
      category: 'ssc',
      description: 'Learn time-saving math shortcuts and tricks for SSC examinations with practice problems.',
      duration: '1:30:45',
      views: 89000,
      rating: 4.7,
      thumbnail: '/api/placeholder/400/300',
      level: 'Beginner',
      tags: ['SSC', 'Mathematics', 'Shortcuts'],
      uploadDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Banking Awareness Masterclass',
      instructor: 'CA Anita Sharma',
      category: 'banking',
      description: 'Complete banking awareness course covering all banking concepts, RBI guidelines, and recent updates.',
      duration: '3:15:20',
      views: 67000,
      rating: 4.9,
      thumbnail: '/api/placeholder/400/300',
      level: 'Advanced',
      tags: ['Banking', 'Finance', 'RBI'],
      uploadDate: '2024-01-08'
    },
    {
      id: 4,
      title: 'Python for Beginners - Complete Course',
      instructor: 'Tech Academy',
      category: 'coding',
      description: 'Learn Python programming from scratch with hands-on projects and real-world applications.',
      duration: '8:30:15',
      views: 234000,
      rating: 4.9,
      thumbnail: '/api/placeholder/400/300',
      level: 'Beginner',
      tags: ['Python', 'Programming', 'Beginner'],
      uploadDate: '2024-01-05'
    },
    {
      id: 5,
      title: 'Effective Communication Skills',
      instructor: 'Life Coach Mentor',
      category: 'skills',
      description: 'Master the art of communication for personal and professional success with practical exercises.',
      duration: '2:00:30',
      views: 45000,
      rating: 4.6,
      thumbnail: '/api/placeholder/400/300',
      level: 'Intermediate',
      tags: ['Communication', 'Soft Skills', 'Leadership'],
      uploadDate: '2024-01-03'
    },
    {
      id: 6,
      title: 'JavaScript ES6+ Advanced Concepts',
      instructor: 'Code Masters',
      category: 'coding',
      description: 'Deep dive into advanced JavaScript concepts including ES6+, async/await, and modern frameworks.',
      duration: '4:45:20',
      views: 156000,
      rating: 4.8,
      thumbnail: '/api/placeholder/400/300',
      level: 'Advanced',
      tags: ['JavaScript', 'ES6', 'Advanced'],
      uploadDate: '2024-01-01'
    }
  ];

  useEffect(() => {
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
  }, [searchTerm, selectedCategory, selectedLevel]);

  const playVideo = (video: VideoLecture) => {
    console.log(`Playing ${video.title}`);
    // In real implementation, this would open video player modal
  };

  const bookmarkVideo = (video: VideoLecture) => {
    console.log(`Bookmarked ${video.title}`);
    // In real implementation, this would save to user's bookmarks
  };

  const shareVideo = (video: VideoLecture) => {
    console.log(`Sharing ${video.title}`);
    // In real implementation, this would open share modal
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🎥 Free Video Lectures & Tutorials
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access expert-curated video lectures covering competitive exams, programming, and life skills
        </p>
      </motion.div>

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
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Video Thumbnail */}
              <div className="relative overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredVideo === video.id ? 1 : 0.7, 
                    scale: hoveredVideo === video.id ? 1.2 : 1 
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <button
                    onClick={() => playVideo(video)}
                    className="p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <PlayCircle className="w-12 h-12 text-blue-600" />
                  </button>
                </motion.div>
                
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
                  >
                    <Bookmark className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => shareVideo(video)}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredVideos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No videos found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Featured Playlists */}
      <section className="mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">📺 Featured Playlists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'UPSC Complete Course', videos: 45, duration: '120+ hours' },
            { name: 'Python Mastery', videos: 32, duration: '80+ hours' },
            { name: 'Banking Exam Prep', videos: 28, duration: '65+ hours' }
          ].map((playlist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer"
            >
              <h4 className="text-xl font-bold mb-2">{playlist.name}</h4>
              <p className="text-purple-100 mb-4">{playlist.videos} videos • {playlist.duration}</p>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                View Playlist
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}