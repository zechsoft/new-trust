'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Bell,
  MapPin,
  User,
  Phone,
  Mail,
  Download,
  Eye,
  Filter
} from 'lucide-react';

interface CaseStatus {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  status: 'filed' | 'hearing' | 'evidence' | 'judgment' | 'disposed' | 'appeal';
  nextHearing: string;
  lastUpdate: string;
  petitioner: string;
  respondent: string;
  judge: string;
  progress: number;
}

interface CaseEvent {
  date: string;
  event: string;
  description: string;
  documents?: string[];
}

export default function CaseTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'cnr' | 'case' | 'party'>('cnr');
  const [selectedCase, setSelectedCase] = useState<CaseStatus | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockCases: CaseStatus[] = [
    {
      id: '1',
      caseNumber: 'CC/123/2024',
      title: 'Property Dispute - ABC vs XYZ',
      court: 'District Court, Delhi',
      status: 'hearing',
      nextHearing: '2024-02-15',
      lastUpdate: '2024-01-20',
      petitioner: 'ABC Kumar',
      respondent: 'XYZ Singh',
      judge: 'Hon\'ble Justice Sharma',
      progress: 65
    },
    {
      id: '2',
      caseNumber: 'CRL/456/2024',
      title: 'Consumer Complaint - Defective Product',
      court: 'Consumer Forum, Mumbai',
      status: 'evidence',
      nextHearing: '2024-02-20',
      lastUpdate: '2024-01-18',
      petitioner: 'Priya Patel',
      respondent: 'TechCorp Ltd',
      judge: 'Hon\'ble Member Gupta',
      progress: 40
    },
    {
      id: '3',
      caseNumber: 'FAM/789/2024',
      title: 'Matrimonial Dispute - Custody Rights',
      court: 'Family Court, Bangalore',
      status: 'judgment',
      nextHearing: '2024-02-10',
      lastUpdate: '2024-01-25',
      petitioner: 'Raj Mehta',
      respondent: 'Sita Mehta',
      judge: 'Hon\'ble Justice Reddy',
      progress: 90
    }
  ];

  const caseEvents: CaseEvent[] = [
    {
      date: '2024-01-25',
      event: 'Arguments Completed',
      description: 'Final arguments completed by both parties. Case reserved for judgment.',
      documents: ['Final Arguments.pdf', 'Evidence Summary.pdf']
    },
    {
      date: '2024-01-15',
      event: 'Evidence Hearing',
      description: 'Witness examination completed. Documentary evidence submitted.',
      documents: ['Witness Statement.pdf', 'Property Papers.pdf']
    },
    {
      date: '2024-01-05',
      event: 'Case Hearing',
      description: 'Regular hearing conducted. Next date fixed for evidence.',
    },
    {
      date: '2023-12-20',
      event: 'Case Filed',
      description: 'Case filed and registered. Notice issued to respondent.',
      documents: ['Petition.pdf', 'Court Notice.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'hearing': return 'bg-yellow-100 text-yellow-800';
      case 'evidence': return 'bg-purple-100 text-purple-800';
      case 'judgment': return 'bg-orange-100 text-orange-800';
      case 'disposed': return 'bg-green-100 text-green-800';
      case 'appeal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'filed': return <FileText className="w-4 h-4" />;
      case 'hearing': return <Calendar className="w-4 h-4" />;
      case 'evidence': return <Eye className="w-4 h-4" />;
      case 'judgment': return <CheckCircle className="w-4 h-4" />;
      case 'disposed': return <CheckCircle className="w-4 h-4" />;
      case 'appeal': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleSearch = () => {
    // Mock search functionality
    if (searchQuery.trim()) {
      console.log(`Searching ${searchType}: ${searchQuery}`);
      // In real implementation, this would call an API
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Case Status Tracker
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your legal case progress through courts using CNR Number, Case ID, or Party Name
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">Search Your Case</h3>
        </div>

        <div className="space-y-4">
          {/* Search Type Selection */}
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'cnr', label: 'CNR Number', example: 'DLCT01-123456-2024' },
              { id: 'case', label: 'Case Number', example: 'CC/123/2024' },
              { id: 'party', label: 'Party Name', example: 'John Doe' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  searchType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Enter ${searchType === 'cnr' ? 'CNR Number' : searchType === 'case' ? 'Case Number' : 'Party Name'}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: {searchType === 'cnr' ? 'DLCT01-123456-2024' : searchType === 'case' ? 'CC/123/2024' : 'John Doe'}
              </p>
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Integration Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-bold text-blue-800 mb-1">eCourts Integration</h4>
              <p className="text-blue-700 text-sm">
                This service is integrated with eCourts India for real-time case status updates. 
                All case information is fetched directly from official court records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Cases / Search Results */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-800">Your Cases</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedCase(caseItem)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{caseItem.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {caseItem.caseNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {caseItem.court}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseItem.status)}`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(caseItem.status)}
                      {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                    </span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Next Hearing:</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {caseItem.nextHearing}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Last Update:</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {caseItem.lastUpdate}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Judge:</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {caseItem.judge}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Case Progress</span>
                    <span className="text-sm text-gray-600">{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${caseItem.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">Recent Notifications</h3>
            </div>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                type: 'hearing',
                title: 'Hearing Scheduled',
                message: 'Your case CC/123/2024 has a hearing on Feb 15, 2024 at 11:00 AM',
                time: '2 hours ago',
                urgent: true
              },
              {
                type: 'update',
                title: 'Case Status Updated',
                message: 'Evidence submission completed for case CRL/456/2024',
                time: '1 day ago',
                urgent: false
              },
              {
                type: 'document',
                title: 'New Document Available',
                message: 'Court order uploaded for case FAM/789/2024',
                time: '2 days ago',
                urgent: false
              }
            ].map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{notification.title}</h4>
                    <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                    <p className="text-gray-500 text-xs">{notification.time}</p>
                  </div>
                  {notification.urgent && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
              Enable SMS Alerts
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Email Notifications
            </button>
          </div>
        </motion.div>
      )}

      {/* Case Detail Modal */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedCase.title}</h3>
                <p className="text-gray-600">{selectedCase.caseNumber} • {selectedCase.court}</p>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Case Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Case Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Petitioner:</p>
                        <p className="text-gray-600">{selectedCase.petitioner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Respondent:</p>
                        <p className="text-gray-600">{selectedCase.respondent}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Next Hearing:</p>
                        <p className="text-gray-600">{selectedCase.nextHearing}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Current Status</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedCase.status)}`}>
                      <span className="flex items-center gap-2">
                        {getStatusIcon(selectedCase.status)}
                        {selectedCase.status.charAt(0).toUpperCase() + selectedCase.status.slice(1)}
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedCase.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{selectedCase.progress}% Complete</p>
                </div>
              </div>

              {/* Case Timeline */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">Case Timeline</h4>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {caseEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        {index < caseEvents.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800">{event.event}</h5>
                          <span className="text-sm text-gray-500">{event.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        {event.documents && (
                          <div className="flex flex-wrap gap-2">
                            {event.documents.map((doc, idx) => (
                              <button
                                key={idx}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                {doc}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t">
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Download Case Summary
              </button>
              <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                Set Reminder
              </button>
              <button className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
                Share Case
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">Need Help?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Finding CNR Number</h4>
            <p className="text-gray-600 text-sm mb-4">
              CNR (Case Number Record) is a unique 16-digit number assigned to every case filed in Indian courts.
            </p>
            <button className="text-blue-600 font-medium text-sm hover:underline">
              Learn More →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Court Terminology</h4>
            <p className="text-gray-600 text-sm mb-4">
              Understand common legal terms like "Disposed", "Adjourned", "Reserved for Orders", etc.
            </p>
            <button className="text-blue-600 font-medium text-sm hover:underline">
              View Glossary →
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Technical Support</h4>
            <p className="text-gray-600 text-sm mb-4">
              Having trouble finding your case? Contact our support team for assistance.
            </p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}