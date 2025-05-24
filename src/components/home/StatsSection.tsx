import React from 'react';
import { Heart, Users, Globe, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  statsRef: React.RefObject<HTMLDivElement>;
}

const StatsSection: React.FC<StatsSectionProps> = ({ statsRef }) => {
  return (
    <div ref={statsRef} className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="stat-item flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">$2.5M+</h3>
            <p className="text-gray-600 text-center">Donations Raised</p>
          </div>
          
          <div className="stat-item flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">15,000+</h3>
            <p className="text-gray-600 text-center">Lives Changed</p>
          </div>
          
          <div className="stat-item flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <Globe className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">25+</h3>
            <p className="text-gray-600 text-center">Countries Reached</p>
          </div>
          
          <div className="stat-item flex flex-col items-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
            <TrendingUp className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">120+</h3>
            <p className="text-gray-600 text-center">Ongoing Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;