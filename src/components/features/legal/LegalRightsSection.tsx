'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Download, 
  Search, 
  Filter,
  Eye,
  Users,
  Heart,
  Shield,
  Home,
  Briefcase,
  GraduationCap,
  Globe
} from 'lucide-react';

interface Right {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  details: string[];
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  category: string;
  applyLink: string;
  status: 'active' | 'closed' | 'upcoming';
}

export default function LegalRightsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [eligibilityFilters, setEligibilityFilters] = useState({
    age: '',
    gender: '',
    category: '',
    income: ''
  });

  const categories = [
    { id: 'all', name: 'All Rights', icon: <Globe className="w-4 h-4" /> },
    { id: 'fundamental', name: 'Fundamental Rights', icon: <Shield className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'employment', name: 'Employment', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'social', name: 'Social Rights', icon: <Users className="w-4 h-4" /> },
    { id: 'property', name: 'Property Rights', icon: <Home className="w-4 h-4" /> }
  ];

  const rights: Right[] = [
    {
      id: '1',
      title: 'Right to Equality',
      description: 'Equal treatment before law and equal protection of laws',
      category: 'fundamental',
      icon: <Shield className="w-6 h-6" />,
      details: [
        'Equality before law (Article 14)',
        'Prohibition of discrimination (Article 15)',
        'Equality of opportunity (Article 16)',
        'Abolition of untouchability (Article 17)'
      ]
    },
    {
      id: '2',
      title: 'Right to Education',
      description: 'Free and compulsory education for children aged 6-14 years',
      category: 'education',
      icon: <GraduationCap className="w-6 h-6" />,
      details: [
        'Free education up to elementary level',
        'Right to quality education',
        'Non-discrimination in schools',
        'Infrastructure and teacher requirements'
      ]
    },
    {
      id: '3',
      title: 'Right to Information',
      description: 'Access to information from public authorities',
      category: 'fundamental',
      icon: <Eye className="w-6 h-6" />,
      details: [
        'Access to government information',
        'RTI application process',
        'Response within 30 days',
        'Appeal process for denial'
      ]
    },
    {
      id: '4',
      title: 'Right to Work',
      description: 'Employment opportunities and fair wages',
      category: 'employment',
      icon: <Briefcase className="w-6 h-6" />,
      details: [
        'Right to work and livelihood',
        'Fair wages and working conditions',
        'Social security benefits',
        'Protection against exploitation'
      ]
    }
  ];

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM Awas Yojana',
      description: 'Housing for All - providing affordable housing to urban and rural poor',
      eligibility: ['Annual income below ₹18 lakh', 'First-time home buyer', 'Indian citizen'],
      benefits: ['Subsidy up to ₹2.67 lakh', 'Lower interest rates', 'Extended loan tenure'],
      category: 'housing',
      applyLink: 'https://pmaymis.gov.in/',
      status: 'active'
    },
    {
      id: '2',
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: ['Small and marginal farmers', 'Land holding up to 2 hectares', 'Valid land records'],
      benefits: ['₹6,000 per year', 'Direct bank transfer', 'Three installments of ₹2,000'],
      category: 'agriculture',
      applyLink: 'https://pmkisan.gov.in/',
      status: 'active'
    },
    {
      id: '3',
      name: 'Beti Bachao Beti Padhao',
      description: 'Women empowerment and girl child education',
      eligibility: ['Girl child', 'Indian resident', 'Age-specific criteria'],
      benefits: ['Educational scholarships', 'Skill development', 'Employment opportunities'],
      category: 'women',
      applyLink: 'https://wcd.nic.in/bbbp-scheme',
      status: 'active'
    },
    {
      id: '4',
      name: 'NREGA',
      description: 'Guaranteed employment in rural areas',
      eligibility: ['Rural household', 'Adult family members', 'Job card holder'],
      benefits: ['100 days guaranteed work', 'Minimum wage payment', 'Social security'],
      category: 'employment',
      applyLink: 'https://nrega.nic.in/',
      status: 'active'
    }
  ];

  const filteredRights = rights.filter(right => 
    selectedCategory === 'all' || right.category === selectedCategory
  );

  const checkEligibility = () => {
    // Simple eligibility checker logic
    const eligibleSchemes = schemes.filter(scheme => {
      // This is a simplified version - in real implementation, you'd have more complex logic
      return scheme.status === 'active';
    });
    return eligibleSchemes;
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Legal Rights & Government Schemes
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Understand your fundamental rights and discover government welfare schemes available for different categories
        </p>
      </div>

      {/* Rights Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">Know Your Rights</h3>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Rights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRights.map((right, index) => (
            <motion.div
              key={right.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  {right.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{right.title}</h4>
                  <p className="text-gray-600 mb-4">{right.description}</p>
                  <div className="space-y-2">
                    {right.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scheme Eligibility Checker */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-800">Scheme Eligibility Checker</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
            <select 
              value={eligibilityFilters.age}
              onChange={(e) => setEligibilityFilters({...eligibilityFilters, age: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Age</option>
              <option value="0-18">0-18 years</option>
              <option value="18-35">18-35 years</option>
              <option value="35-60">35-60 years</option>
              <option value="60+">60+ years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select 
              value={eligibilityFilters.gender}
              onChange={(e) => setEligibilityFilters({...eligibilityFilters, gender: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={eligibilityFilters.category}
              onChange={(e) => setEligibilityFilters({...eligibilityFilters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="general">General</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="obc">OBC</option>
              <option value="minority">Minority</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <select 
              value={eligibilityFilters.income}
              onChange={(e) => setEligibilityFilters({...eligibilityFilters, income: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Income</option>
              <option value="0-2">Below ₹2 lakh</option>
              <option value="2-5">₹2-5 lakh</option>
              <option value="5-10">₹5-10 lakh</option>
              <option value="10+">Above ₹10 lakh</option>
            </select>
          </div>
        </div>

        <button
          onClick={checkEligibility}
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Check Eligible Schemes
        </button>
      </div>

      {/* Government Schemes */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Welfare Schemes</h3>
          </div>
          <div className="text-sm text-gray-600">
            Showing {schemes.length} active schemes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-6 hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => setSelectedScheme(scheme)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {scheme.name}
                  </h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    scheme.status === 'active' ? 'bg-green-100 text-green-800' :
                    scheme.status === 'closed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {scheme.status.toUpperCase()}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: selectedScheme?.id === scheme.id ? 45 : 0 }}
                  className="text-blue-600"
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
              </div>

              <p className="text-gray-600 mb-4">{scheme.description}</p>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Key Benefits:</h5>
                  <div className="text-sm text-gray-600">
                    {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScheme(scheme);
                    }}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-800">Downloadable Resources</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Rights Handbook (Hindi)', size: '2.5 MB', format: 'PDF' },
            { title: 'Scheme Guidelines (English)', size: '3.1 MB', format: 'PDF' },
            { title: 'Application Forms (Tamil)', size: '1.8 MB', format: 'PDF' }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  <p className="text-sm text-gray-600">{resource.format} • {resource.size}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedScheme(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedScheme.name}</h3>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-6">{selectedScheme.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Eligibility Criteria:</h4>
                <ul className="space-y-1">
                  {selectedScheme.eligibility.map((criteria, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {selectedScheme.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={selectedScheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Online
                </a>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  Download Form
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}