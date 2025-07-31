import { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Search, 
  Plus,
  User,
  Clock,
  ArrowUp,
  ArrowDown,
  Star,
  Badge,
  Filter,
  Eye,
  Reply,
  Heart,
  Share2,
  X
} from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    badge: 'Top Helper' | 'Volunteer Mentor' | 'Newbie' | 'Expert';
    points: number;
  };
  category: string;
  tags: string[];
  replies: number;
  views: number;
  likes: number;
  createdAt: string;
  isHelpful: boolean;
  isPinned?: boolean;
  liked?: boolean;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  posts: number;
  color: string;
}

interface Reply {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}

export default function CommunityForums() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>([]);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'exams',
    tags: ''
  });

  const categories: ForumCategory[] = [
    {
      id: 'all',
      name: 'All Discussions',
      description: 'Browse all forum topics',
      icon: '💬',
      posts: 1250,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'exams',
      name: 'Competitive Exams',
      description: 'UPSC, SSC, Banking, Railway discussions',
      icon: '📚',
      posts: 456,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'careers',
      name: 'Career Guidance',
      description: 'Job search, interviews, career advice',
      icon: '💼',
      posts: 234,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'skills',
      name: 'Skill Development',
      description: 'Programming, communication, technical skills',
      icon: '🛠️',
      posts: 189,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      description: 'Study motivation, stress management',
      icon: '🧠',
      posts: 167,
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'study-groups',
      name: 'Study Groups',
      description: 'Find study partners and groups',
      icon: '👥',
      posts: 203,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const initialPosts: ForumPost[] = [
    {
      id: 1,
      title: 'Best Strategy for UPSC Prelims 2024 - Need Guidance',
      content: 'I\'m preparing for UPSC 2024 and confused about the strategy for prelims. Should I focus more on current affairs or static portions? Any toppers here who can guide?',
      author: {
        name: 'Priya Sharma',
        avatar: '👩‍🎓',
        badge: 'Newbie',
        points: 125
      },
      category: 'exams',
      tags: ['UPSC', 'Prelims', 'Strategy'],
      replies: 23,
      views: 456,
      likes: 34,
      createdAt: '2 hours ago',
      isHelpful: true,
      isPinned: true,
      liked: false
    },
    {
      id: 2,
      title: 'Python vs Java for Beginners - Which to Choose?',
      content: 'I\'m new to programming and want to start my coding journey. Everyone suggests different languages. What would be better for a complete beginner?',
      author: {
        name: 'Rahul Kumar',
        avatar: '👨‍💻',
        badge: 'Top Helper',
        points: 2450
      },
      category: 'skills',
      tags: ['Programming', 'Python', 'Java', 'Beginner'],
      replies: 18,
      views: 289,
      likes: 27,
      createdAt: '4 hours ago',
      isHelpful: false,
      liked: false
    },
    {
      id: 3,
      title: 'Dealing with Exam Anxiety - Your Tips?',
      content: 'I get really nervous during exams even though I prepare well. This affects my performance badly. How do you all manage exam stress?',
      author: {
        name: 'Anjali Patel',
        avatar: '👩‍⚕️',
        badge: 'Volunteer Mentor',
        points: 1890
      },
      category: 'mental-health',
      tags: ['Stress', 'Anxiety', 'Mental Health'],
      replies: 31,
      views: 578,
      likes: 45,
      createdAt: '6 hours ago',
      isHelpful: true,
      liked: false
    },
    {
      id: 4,
      title: 'SSC CGL Math Section - Shortcuts and Tricks',
      content: 'Sharing some amazing math shortcuts that helped me solve SSC CGL quant section faster. These tricks can save you 30-40 minutes in the exam!',
      author: {
        name: 'Vikash Singh',
        avatar: '🧮',
        badge: 'Expert',
        points: 3200
      },
      category: 'exams',
      tags: ['SSC', 'Mathematics', 'Shortcuts'],
      replies: 42,
      views: 1200,
      likes: 89,
      createdAt: '1 day ago',
      isHelpful: true,
      liked: false
    },
    {
      id: 5,
      title: 'Looking for Study Group - Banking Exams 2024',
      content: 'Hi everyone! I\'m preparing for SBI PO and IBPS PO 2024. Looking for serious study partners to form a study group. Daily discussion and mock tests.',
      author: {
        name: 'Meera Reddy',
        avatar: '🏦',
        badge: 'Newbie',
        points: 87
      },
      category: 'study-groups',
      tags: ['Banking', 'Study Group', 'SBI PO'],
      replies: 15,
      views: 234,
      likes: 19,
      createdAt: '2 days ago',
      isHelpful: false,
      liked: false
    }
  ];

  const initialReplies: Reply[] = [
    {
      id: 1,
      postId: 1,
      author: 'Amit Gupta',
      content: 'Focus on current affairs for the first 3 months, then shift to static portions. This strategy worked for me!',
      createdAt: '1 hour ago',
      avatar: '👨‍🎓'
    },
    {
      id: 2,
      postId: 1,
      author: 'Sneha Verma',
      content: 'I would suggest a balanced approach. Allocate 60% time to static and 40% to current affairs.',
      createdAt: '30 minutes ago',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      postId: 2,
      author: 'Dev Sharma',
      content: 'Python is definitely better for beginners. It has simpler syntax and is very beginner-friendly.',
      createdAt: '2 hours ago',
      avatar: '👨‍💻'
    },
    {
      id: 4,
      postId: 3,
      author: 'Dr. Maya Patel',
      content: 'Practice meditation and deep breathing exercises. Also, ensure you get enough sleep before exams.',
      createdAt: '3 hours ago',
      avatar: '👩‍⚕️'
    }
  ];

  // Initialize posts and replies
  useEffect(() => {
    setPosts(initialPosts);
    setReplies(initialReplies);
  }, []);

  // Update category post counts based on actual posts
  useEffect(() => {
    const updatedCategories = categories.map(category => {
      if (category.id === 'all') {
        return { ...category, posts: posts.length };
      }
      const categoryPosts = posts.filter(post => post.category === category.id);
      return { ...category, posts: categoryPosts.length };
    });
  }, [posts]);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort posts
    switch (sortBy) {
      case 'recent':
        // Sort by id (higher id = more recent)
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes + b.replies * 2 + b.views * 0.1) - (a.likes + a.replies * 2 + a.views * 0.1));
        break;
      case 'helpful':
        filtered.sort((a, b) => {
          if (a.isHelpful && !b.isHelpful) return -1;
          if (!a.isHelpful && b.isHelpful) return 1;
          return b.likes - a.likes;
        });
        break;
    }

    // Pinned posts should always be at the top
    const pinnedPosts = filtered.filter(post => post.isPinned);
    const regularPosts = filtered.filter(post => !post.isPinned);
    
    setFilteredPosts([...pinnedPosts, ...regularPosts]);
  }, [searchTerm, selectedCategory, sortBy, posts]);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Top Helper':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Volunteer Mentor':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Expert':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Newbie':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const toggleExpansion = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const likePost = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked
            }
          : post
      )
    );
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: ForumPost = {
      id: Math.max(...posts.map(p => p.id)) + 1,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: 'Current User',
        avatar: '👤',
        badge: 'Newbie',
        points: 50
      },
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      replies: 0,
      views: 1,
      likes: 0,
      createdAt: 'just now',
      isHelpful: false,
      liked: false
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    setNewPost({ title: '', content: '', category: 'exams', tags: '' });
    setShowNewPostModal(false);
  };

  const handleViewPost = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, views: post.views + 1 }
          : post
      )
    );
  };

  const handleAddReply = (postId: number) => {
    if (!newReply.trim()) return;
    
    const reply: Reply = {
      id: Math.max(...replies.map(r => r.id), 0) + 1,
      postId: postId,
      author: 'Current User',
      content: newReply,
      createdAt: 'just now',
      avatar: '👤'
    };

    setReplies(prevReplies => [...prevReplies, reply]);
    
    // Update reply count
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, replies: post.replies + 1 }
          : post
      )
    );
    
    setNewReply('');
  };

  const getPostReplies = (postId: number) => {
    return replies.filter(reply => reply.postId === postId);
  };

  const sharePost = (post: ForumPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\nShared from Community Forums`);
      alert('Post copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          💬 Community Forums & Discussion
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with fellow learners, ask questions, share knowledge, and build meaningful relationships
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`cursor-pointer bg-gradient-to-r ${category.color} p-6 rounded-2xl text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform ${
              selectedCategory === category.id ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{category.icon}</span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {category.id === 'all' ? posts.length : posts.filter(p => p.category === category.id).length} posts
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-white/80 text-sm">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-lg">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search discussions, topics, or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              post.isPinned ? 'border-l-4 border-yellow-400' : ''
            }`}
          >
            <div className="p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                      {post.author.avatar}
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-800">{post.author.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getBadgeColor(post.author.badge)}`}>
                        {post.author.badge}
                      </span>
                      {post.isPinned && (
                        <span className="text-yellow-500" title="Pinned Post">📌</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{post.author.points} points</span>
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                
                {post.isHelpful && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Helpful
                  </span>
                )}
              </div>

              {/* Post Title and Content */}
              <h3 
                className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={() => handleViewPost(post.id)}
              >
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 cursor-pointer transition-colors"
                    onClick={() => setSearchTerm(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Stats and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => likePost(post.id)}
                    className={`flex items-center gap-1 transition-colors transform hover:scale-110 ${
                      post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => toggleExpansion(post.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors transform hover:scale-110"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  
                  <button 
                    onClick={() => sharePost(post)}
                    className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors transform hover:scale-110"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedPost === post.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <h4 className="font-medium text-gray-800 mb-3">Replies ({getPostReplies(post.id).length})</h4>
                
                {/* Existing Replies */}
                <div className="space-y-4 mb-6">
                  {getPostReplies(post.id).map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-sm">
                        {reply.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.createdAt}</span>
                          </div>
                          <p className="text-sm text-gray-600">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {getPostReplies(post.id).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No replies yet. Be the first to reply!</p>
                  )}
                </div>
                
                {/* New Reply Form */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddReply(post.id)}
                        disabled={!newReply.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => toggleExpansion(post.id)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No discussions found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 
              `No posts match "${searchTerm}". Try different keywords or browse all categories.` :
              'Be the first to start a conversation in this category!'
            }
          </p>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Discussion
          </button>
        </div>
      )}

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        {[
          { icon: Users, label: 'Active Members', value: '25,000+', color: 'text-blue-500' },
          { icon: MessageCircle, label: 'Total Posts', value: `${posts.length}`, color: 'text-green-500' },
          { icon: Star, label: 'Helpful Answers', value: `${posts.filter(p => p.isHelpful).length}`, color: 'text-yellow-500' },
          { icon: TrendingUp, label: 'Total Replies', value: `${replies.length}`, color: 'text-purple-500' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">📋 Community Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Be Respectful</h4>
            <p className="text-gray-600 text-sm">Treat all community members with respect and kindness</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Stay On Topic</h4>
            <p className="text-gray-600 text-sm">Keep discussions relevant to the chosen category</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Help Others</h4>
            <p className="text-gray-600 text-sm">Share your knowledge and help fellow learners</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">No Spam</h4>
            <p className="text-gray-600 text-sm">Avoid promotional content and repetitive posts</p>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Start New Discussion</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="Enter a descriptive title for your post"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={6}
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Describe your question or topic in detail..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  placeholder="Add tags separated by commas (e.g., UPSC, Strategy, Tips)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}