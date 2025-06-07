'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe, TrendingUp, Award, Target, DollarSign, Calendar, BarChart3 } from 'lucide-react';

interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
  suffix?: string;
  color: string;
  isActive: boolean;
  order: number;
}

interface StatsSectionData {
  title?: string;
  subtitle?: string;
  isActive: boolean;
  backgroundColor: string;
  animationType: string;
  stats: StatItem[];
}

interface StatsSectionProps {
  statsRef: React.RefObject<HTMLDivElement>;
}

const StatsSection: React.FC<StatsSectionProps> = ({ statsRef }) => {
  const [statsData, setStatsData] = useState<StatsSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for dynamic icon rendering
  const iconMap = {
    'Heart': Heart,
    'Users': Users,
    'Globe': Globe,
    'TrendingUp': TrendingUp,
    'Trending Up': TrendingUp, // Handle space in name
    'Award': Award,
    'Target': Target,
    'DollarSign': DollarSign,
    'Calendar': Calendar,
    'BarChart': BarChart3,
    'Bar Chart': BarChart3, // Handle space in name
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      console.log('Fetching stats data from API...');
      const response = await fetch('http://localhost:5000/api/stat/stats');
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      console.log('Data structure:', JSON.stringify(data, null, 2));
      
      // Check if data is empty object and provide fallback
      if (!data || Object.keys(data).length === 0) {
        console.log('Empty data received, using fallback');
        throw new Error('No data found in database');
      }
      
      // Log individual properties to debug
      console.log('Title:', data.title);
      console.log('IsActive:', data.isActive);
      console.log('Stats array:', data.stats);
      console.log('Stats length:', data.stats?.length);
      
      setStatsData(data);
    } catch (err) {
      console.error('Error fetching stats data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch stats data');
      // Fallback to default data
      setStatsData({
        title: "Our Impact",
        subtitle: "Making a difference worldwide",
        isActive: true,
        backgroundColor: "white",
        animationType: "fadeIn",
        stats: [
          {
            id: "1",
            icon: "Heart",
            value: "$2.5M",
            label: "Donations Raised",
            suffix: "+",
            color: "purple-600",
            isActive: true,
            order: 1
          },
          {
            id: "2",
            icon: "Users",
            value: "15,000",
            label: "Lives Changed",
            suffix: "+",
            color: "blue-600",
            isActive: true,
            order: 2
          },
          {
            id: "3",
            icon: "Globe",
            value: "25",
            label: "Countries Reached",
            suffix: "+",
            color: "green-600",
            isActive: true,
            order: 3
          },
          {
            id: "4",
            icon: "TrendingUp",
            value: "120",
            label: "Ongoing Projects",
            suffix: "+",
            color: "orange-600",
            isActive: true,
            order: 4
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getIconColorClass = (color: string) => {
    // Handle both format: "purple-600" or just "purple"
    const colorName = color?.toLowerCase();
    
    if (colorName?.includes('purple')) return 'text-purple-600';
    if (colorName?.includes('blue')) return 'text-blue-600';
    if (colorName?.includes('green')) return 'text-green-600';
    if (colorName?.includes('orange')) return 'text-orange-600';
    if (colorName?.includes('red')) return 'text-red-600';
    if (colorName?.includes('yellow')) return 'text-yellow-600';
    if (colorName?.includes('indigo')) return 'text-indigo-600';
    
    // Default fallback
    return 'text-purple-600';
  };

  const getAnimationClass = (animationType: string) => {
    switch (animationType) {
      case 'slideUp':
        return 'animate-slide-up';
      case 'fadeIn':
        return 'animate-fade-in';
      case 'bounce':
        return 'animate-bounce-in';
      default:
        return '';
    }
  };

  const getBackgroundClass = (backgroundColor: string) => {
    switch (backgroundColor?.toLowerCase()) {
      case 'gray':
        return 'bg-gray-100';
      case 'blue':
        return 'bg-blue-50';
      case 'purple':
        return 'bg-purple-50';
      case 'green':
        return 'bg-green-50';
      case 'orange':
        return 'bg-orange-50';
      case 'red':
        return 'bg-red-50';
      case 'yellow':
        return 'bg-yellow-50';
      case 'indigo':
        return 'bg-indigo-50';
      case 'white':
      default:
        return 'bg-white';
    }
  };

  if (loading) {
    return (
      <div ref={statsRef} className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !statsData) {
    return (
      <div ref={statsRef} className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading stats: {error}</p>
            <button 
              onClick={fetchStatsData}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!statsData || statsData.isActive === false) {
    console.log('Component not rendering because:');
    console.log('- statsData exists:', !!statsData);
    console.log('- isActive:', statsData?.isActive);
    return null;
  }

  // Filter active stats and sort by order
  const activeStats = statsData.stats
    ?.filter(stat => stat.isActive !== false) // Show stats unless explicitly set to false
    ?.sort((a, b) => a.order - b.order) || [];
    
  console.log('Active stats:', activeStats);
  console.log('Active stats count:', activeStats.length);

  return (
    <div 
      ref={statsRef} 
      className={`${getBackgroundClass(statsData.backgroundColor)} py-16 md:py-24 ${getAnimationClass(statsData.animationType)}`}
    >
      <div className="container mx-auto px-4">
        {/* Optional title and subtitle */}
        {(statsData.title || statsData.subtitle) && (
          <div className="text-center mb-12">
            {statsData.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {statsData.title}
              </h2>
            )}
            {statsData.subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {statsData.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(activeStats.length, 4)} gap-8`}>
          {activeStats.map((stat) => {
            console.log('Rendering stat:', stat);
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Heart;
            
            return (
              <div 
                key={stat.id}
                className="stat-item flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <IconComponent className={`w-12 h-12 mb-4 ${getIconColorClass(stat.color)}`} />
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {stat.value}{stat.suffix || ''}
                </h3>
                <p className="text-gray-600 text-center">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StatsSection;