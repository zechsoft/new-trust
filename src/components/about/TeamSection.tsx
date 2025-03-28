import { useState } from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamSectionProps {
  teamData: TeamMember[];
}

export default function TeamSection({ teamData }: TeamSectionProps) {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "The Heart Behind the Mission"
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <motion.div 
              key={member.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: member.id * 0.1 }}
              onHoverStart={() => setActiveTeamMember(member.id)}
              onHoverEnd={() => setActiveTeamMember(null)}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`/api/placeholder/400/400`} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent transition-opacity duration-300 ${activeTeamMember === member.id ? 'opacity-70' : 'opacity-0'}`} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                  
                  <div 
                    className={`mt-4 overflow-hidden transition-all duration-300 ${activeTeamMember === member.id ? 'max-h-48' : 'max-h-0'}`}
                  >
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-gray-700 mb-8">
            <span className="font-bold">+1000 Volunteers & Change-Makers</span> across India
          </p>
          <div className="inline-block">
            <a 
              href="/get-involved" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join Our Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}