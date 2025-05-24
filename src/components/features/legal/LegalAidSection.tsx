'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  Users, 
  Phone, 
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
  Clock,
  Volume2,
  Languages,
  Eye,
  Accessibility
} from 'lucide-react';

interface HelplineService {
  id: string;
  name: string;
  category: string;
  phone: string;
  hours: string;
  languages: string[];
  services: string[];
  isEmergency: boolean;
}

interface LegalAidCenter {
  id: string;
  name: string;
  address: string;
  district: string;
  phone: string;
  services: string[];
  timings: string;
}

export default function LegalAidSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('women');
  const [selectedHelpline, setSelectedHelpline] = useState<HelplineService | null>(null);

  const categories = [
    { id: 'women', name: 'Women Support', icon: <Heart className="w-5 h-5" />, color: 'pink' },
    { id: 'seniors', name: 'Senior Citizens', icon: <Users className="w-5 h-5" />, color: 'blue' },
    { id: 'sc-st', name: 'SC/ST Support', icon: <Shield className="w-5 h-5" />, color: 'green' },
    { id: 'disabled', name: 'Disabled Rights', icon: <Accessibility className="w-5 h-5" />, color: 'purple' },
    { id: 'child', name: 'Child Protection', icon: <Heart className="w-5 h-5" />, color: 'orange' }
  ];

  const helplines: HelplineService[] = [
    {
      id: '1',
      name: 'Women Helpline',
      category: 'women',
      phone: '181',
      hours: '24/7',
      languages: ['Hindi', 'English'],
      services: ['Domestic Violence', 'Sexual Harassment', 'Dowry Issues', 'Workplace Discrimination'],
      isEmergency: true
    },
    {
      id: '2',
      name: 'One Stop Centre',
      category: 'women',
      phone: '181',
      hours: '24/7',
      languages: ['Hindi', 'English', 'Regional Languages'],
      services: ['Medical Aid', 'Legal Counseling', 'Shelter', 'Police Assistance'],
      isEmergency: true
    },
    {
      id: '3',
      name: 'Elder Helpline',
      category: 'seniors',
      phone: '14567',
      hours: '8 AM - 8 PM',
      languages: ['Hindi', 'English'],
      services: ['Elder Abuse', 'Property Disputes', 'Pension Issues', 'Healthcare Rights'],
      isEmergency: false
    },
    {
      id: '4',
      name: 'SC/ST Helpline',
      category: 'sc-st',
      phone: '14566',
      hours: '24/7',
      languages: ['Hindi', 'English', 'Regional Languages'],
      services: ['Atrocity Cases', 'Reservation Issues', 'Legal Aid', 'Fast Track Courts'],
      isEmergency: true
    },
    {
      id: '5',
      name: 'Childline',
      category: 'child',
      phone: '1098',
      hours: '24/7',
      languages: ['Hindi', 'English'],
      services: ['Child Abuse', 'Missing Children', 'Child Labor', 'Education Rights'],
      isEmergency: true
    },
    {
      id: '6',
      name: 'Disability Helpline',
      category: 'disabled',
      phone: '1800-233-5956',
      hours: '9 AM - 5 PM',
      languages: ['Hindi', 'English'],
      services: ['Rights Awareness', 'Certification Issues', 'Employment Support', 'Accessibility'],
      isEmergency: false
    }
  ];

  const legalAidCenters: LegalAidCenter[] = [
    {
      id: '1',
      name: 'District Legal Services Authority',
      address: 'Court Complex, Civil Lines',
      district: 'Delhi',
      phone: '011-2338-7379',
      services: ['Free Legal Aid', 'Lok Adalat', 'Mediation', 'Legal Awareness'],
      timings: '10 AM - 5 PM (Mon-Fri)'
    },
    {
      id: '2',
      name: 'State Legal Services Authority',
      address: 'High Court Building',
      district: 'Mumbai',
      phone: '022-2672-8901',
      services: ['Free Legal Aid', 'Legal Literacy', 'Alternative Dispute Resolution'],
      timings: '10 AM - 5 PM (Mon-Fri)'
    }
  ];

  const filteredHelplines = helplines.filter(helpline => helpline.category === selectedCategory);

  const emergencySteps = [
    {
      step: 1,
      title: 'Immediate Safety',
      description: 'If in immediate danger, call 100 (Police) or 108 (Emergency)',
      icon: <Phone className="w-6 h-6" />,
      color: 'red'
    },
    {
      step: 2,
      title: 'Document Evidence',
      description: 'Take photos, keep records, and preserve any evidence',
      icon: <FileText className="w-6 h-6" />,
      color: 'blue'
    },
    {
      step: 3,
      title: 'Contact Helpline',
      description: 'Call the relevant helpline for specialized support',
      icon: <Phone className="w-6 h-6" />,
      color: 'green'
    },
    {
      step: 4,
      title: 'Legal Assistance',
      description: 'Visit nearest Legal Aid Center for free legal help',
      icon: <Shield className="w-6 h-6" />,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Legal Aid for Vulnerable Groups
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Specialized legal services and support for women, seniors, and underprivileged communities
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Helplines</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-medium">Police:</span>
                <a href="tel:100" className="text-red-700 font-bold">100</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-medium">Women Helpline:</span>
                <a href="tel:181" className="text-red-700 font-bold">181</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="font-medium">Child Helpline:</span>
                <a href="tel:1098" className="text-red-700 font-bold">1098</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Support Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl font-medium transition-all ${
                selectedCategory === category.id
                  ? `bg-${category.color}-100 border-2 border-${category.color}-500 text-${category.color}-800`
                  : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {category.icon}
                <span className="text-sm">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Helplines for Selected Category */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Phone className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">
            {categories.find(c => c.id === selectedCategory)?.name} Helplines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHelplines.map((helpline, index) => (
            <motion.div
              key={helpline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedHelpline(helpline)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{helpline.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <a 
                      href={`tel:${helpline.phone}`}
                      className="text-2xl font-bold text-green-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {helpline.phone}
                    </a>
                  </div>
                </div>
                {helpline.isEmergency && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    Emergency
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{helpline.hours}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Languages className="w-4 h-4" />
                  <span className="text-sm">{helpline.languages.join(', ')}</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Services Available:</p>
                  <div className="flex flex-wrap gap-1">
                    {helpline.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {helpline.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{helpline.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <a
                    href={`tel:${helpline.phone}`}
                    className="flex-1 px-4 py-2 bg-green-600 text-white text-center font-medium rounded-lg hover:bg-green-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Call Now
                  </a>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    More Info
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Emergency Process Steps */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <h3 className="text-2xl font-bold text-gray-800">Emergency Response Steps</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencySteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 bg-${step.color}-100 rounded-full text-${step.color}-600`}>
                  {step.icon}
                </div>
                <div className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center font-bold`}>
                  {step.step}
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rights in Simple Language */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-800">Rights in Simple Language</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Women\'s Rights',
              rights: [
                'Right to live without violence',
                'Equal pay for equal work',
                'Protection from sexual harassment',
                'Right to property and inheritance'
              ],
              color: 'pink'
            },
            {
              title: 'Senior Citizens Rights',
              rights: [
                'Right to maintenance from children',
                'Protection from abuse and neglect',
                'Right to pension and healthcare',
                'Priority in government services'
              ],
              color: 'blue'
            },
            {
              title: 'SC/ST Rights',
              rights: [
                'Protection from atrocities',
                'Reservation in education and jobs',
                'Special courts for quick justice',
                'Free legal aid and support'
              ],
              color: 'green'
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-${category.color}-50 border border-${category.color}-200 rounded-lg p-6`}
            >
              <h4 className={`text-lg font-bold text-${category.color}-800 mb-4`}>{category.title}</h4>
              <ul className="space-y-2">
                {category.rights.map((right, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-${category.color}-700`}>
                    <div className={`w-2 h-2 bg-${category.color}-500 rounded-full mt-2`}></div>
                    <span className="text-sm">{right}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legal Aid Centers */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-800">Nearby Legal Aid Centers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalAidCenters.map((center, index) => (
            <motion.div
              key={center.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{center.name}</h4>
                  <p className="text-gray-600 mt-1">{center.district}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-green-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${center.phone}`} className="font-medium hover:underline">
                      {center.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                  <p className="text-sm text-gray-600">{center.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-600">{center.timings}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Get Directions
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="bg-purple-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Accessibility className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-800">Accessibility Features</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-gray-800">Voice Support</h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Use voice commands to navigate and get audio descriptions of legal processes.
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Enable Voice
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-gray-800">Screen Reader</h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Optimized for screen readers with clear headings and alt text for all images.
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Optimize Display
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-gray-800">Multi-Language</h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Available in Hindi, English, and regional languages with easy translation.
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Change Language
            </button>
          </div>
        </div>
      </div>

      {/* Helpline Detail Modal */}
      {selectedHelpline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedHelpline(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedHelpline.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <a 
                    href={`tel:${selectedHelpline.phone}`}
                    className="text-2xl font-bold text-green-600 hover:underline"
                  >
                    {selectedHelpline.phone}
                  </a>
                  {selectedHelpline.isEmergency && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full ml-2">
                      Emergency
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedHelpline(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Available: {selectedHelpline.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Languages className="w-5 h-5" />
                  <span>Languages: {selectedHelpline.languages.join(', ')}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">Services Available:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedHelpline.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-800 mb-3">What to Expect:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Trained counselors available to listen and provide guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Confidential and non-judgmental support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Referrals to legal aid, shelters, and other services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span>Emergency intervention when needed</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={`tel:${selectedHelpline.phone}`}
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-bold text-center rounded-lg hover:bg-green-700 transition-colors"
                >
                  Call Now
                </a>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  WhatsApp Chat
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Support Resources */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-800">Support Resources</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Women Safety Guide', type: 'PDF', size: '2.1 MB', downloads: '15K+' },
            { title: 'Senior Rights Handbook', type: 'PDF', size: '1.8 MB', downloads: '8K+' },
            { title: 'SC/ST Act Simplified', type: 'PDF', size: '1.5 MB', downloads: '12K+' },
            { title: 'Child Protection Guide', type: 'PDF', size: '2.3 MB', downloads: '6K+' }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{resource.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{resource.type} • {resource.size}</span>
                    <span>{resource.downloads} downloads</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}