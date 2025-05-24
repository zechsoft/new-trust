'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Users, 
  TreePine,
  Scale,
  Download,
  Eye,
  Search,
  Map,
  Calendar,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Building,
  Landmark
} from 'lucide-react';

interface LegalTerm {
  term: string;
  definition: string;
  example?: string;
}

interface InheritanceRule {
  religion: string;
  maleHeir: string[];
  femaleHeir: string[];
  spouse: string;
  specialNotes: string[];
}

interface Document {
  name: string;
  description: string;
  useCase: string;
  format: string;
  requirements: string[];
}

export default function PropertyLawSection() {
  const [activeSection, setActiveSection] = useState<'terms' | 'inheritance' | 'documents' | 'farmers'>('terms');
  const [selectedInheritance, setSelectedInheritance] = useState<InheritanceRule | null>(null);

  const legalTerms: LegalTerm[] = [
    {
      term: 'Mutation',
      definition: 'The process of changing ownership records in government revenue records when property is transferred',
      example: 'After buying a house, you need to apply for mutation to get the property registered in your name'
    },
    {
      term: 'Encumbrance Certificate',
      definition: 'A legal document showing the transaction history of a property for a specific period',
      example: 'Banks require encumbrance certificate to verify if the property has any legal disputes before approving loans'
    },
    {
      term: 'Freehold',
      definition: 'Complete ownership of property and the land it stands on, with no time limit',
      example: 'Most residential houses are freehold properties where you own both the building and land'
    },
    {
      term: 'Leasehold',
      definition: 'Ownership of property for a specific period (usually 99 years) while land belongs to someone else',
      example: 'Many apartments in Mumbai are leasehold where you own the flat but not the land'
    },
    {
      term: 'Power of Attorney',
      definition: 'Legal document giving someone authority to act on your behalf in property matters',
      example: 'If you live abroad, you can give power of attorney to someone to sell your property'
    },
    {
      term: 'Sale Deed',
      definition: 'Legal document that transfers ownership of property from seller to buyer',
      example: 'After payment, the sale deed is signed and registered to complete property purchase'
    }
  ];

  const inheritanceRules: InheritanceRule[] = [
    {
      religion: 'Hindu',
      maleHeir: ['Sons', 'Grandsons', 'Father', 'Brothers'],
      femaleHeir: ['Daughters', 'Mother', 'Wife', 'Sisters'],
      spouse: 'Wife gets equal share with sons',
      specialNotes: [
        'Hindu Succession Act 2005 gives equal rights to daughters',
        'Coparcenary rights from birth for sons and daughters',
        'Mother inherits equally with father in ancestral property'
      ]
    },
    {
      religion: 'Muslim',
      maleHeir: ['Sons (2 shares)', 'Father', 'Husband', 'Brothers'],
      femaleHeir: ['Daughters (1 share)', 'Mother', 'Wife', 'Sisters'],
      spouse: 'Wife gets 1/8th if children exist, 1/4th if no children',
      specialNotes: [
        'Male heirs get double share compared to female heirs',
        'Maximum 1/3rd can be given as gift/will to non-heirs',
        'Sharia law governs inheritance distribution'
      ]
    },
    {
      religion: 'Christian',
      maleHeir: ['Sons', 'Husband', 'Father', 'Brothers'],
      femaleHeir: ['Daughters', 'Wife', 'Mother', 'Sisters'],
      spouse: 'Widow gets 1/3rd of property',
      specialNotes: [
        'Indian Succession Act 1925 applies',
        'Equal inheritance rights for sons and daughters',
        'Can make will to distribute property as desired'
      ]
    }
  ];

  const legalDocuments: Document[] = [
    {
      name: 'Sale Agreement',
      description: 'Contract between buyer and seller for property purchase',
      useCase: 'Property buying/selling',
      format: 'Stamp paper with registration',
      requirements: ['Property details', 'Payment terms', 'Possession date', 'Both parties signatures']
    },
    {
      name: 'Rent Agreement',
      description: 'Contract between landlord and tenant for property rental',
      useCase: 'Renting residential/commercial property',
      format: 'Stamp paper (₹100-500 depending on rent)',
      requirements: ['Monthly rent', 'Security deposit', 'Duration', 'Maintenance terms']
    },
    {
      name: 'Gift Deed',
      description: 'Document for transferring property as gift without payment',
      useCase: 'Transferring property to family members',
      format: 'Registered document with stamp duty',
      requirements: ['Donor consent', 'Property documents', 'Acceptance by recipient', 'Registration']
    },
    {
      name: 'Will/Testament',
      description: 'Document stating how property should be distributed after death',
      useCase: 'Estate planning and inheritance',
      format: 'Simple document with witness signatures',
      requirements: ['Clear property description', 'Beneficiary details', 'Two witnesses', 'Testator signature']
    }
  ];

  const farmerRights = [
    {
      title: 'Land Acquisition Rights',
      description: 'Fair compensation when government acquires agricultural land',
      details: [
        'Compensation at 4 times the market value for rural areas',
        'Compensation at 2 times for urban areas',
        'Rehabilitation and resettlement benefits',
        'Employment to at least one family member'
      ]
    },
    {
      title: 'Forest Land Rights',
      description: 'Recognition of traditional forest dwelling communities',
      details: [
        'Individual rights up to 4 hectares',
        'Community forest resource rights',
        'Right to protect and manage forest',
        'Compensation for historical injustice'
      ]
    },
    {
      title: 'Water Rights',
      description: 'Access to water resources for agricultural purposes',
      details: [
        'Priority right for irrigation water',
        'Groundwater extraction rights',
        'Protection from water pollution',
        'Fair pricing for irrigation water'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Land & Property Law Guide
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to property ownership, inheritance laws, and farmer rights in India
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { id: 'terms', label: 'Legal Terms', icon: <Scale className="w-5 h-5" /> },
          { id: 'inheritance', label: 'Inheritance Rights', icon: <Users className="w-5 h-5" /> },
          { id: 'documents', label: 'Legal Documents', icon: <FileText className="w-5 h-5" /> },
          { id: 'farmers', label: 'Farmer Rights', icon: <TreePine className="w-5 h-5" /> }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              activeSection === section.id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Legal Terms Glossary */}
      {activeSection === 'terms' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">Basic Legal Terms Glossary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalTerms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-bold text-blue-600 mb-3">{term.term}</h4>
                <p className="text-gray-700 mb-4">{term.definition}</p>
                {term.example && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Example:</strong> {term.example}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Property Types Comparison */}
          <div className="mt-12">
            <h4 className="text-xl font-bold text-gray-800 mb-6">Freehold vs Leasehold Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-4 text-left">Aspect</th>
                    <th className="border border-gray-300 p-4 text-left">Freehold</th>
                    <th className="border border-gray-300 p-4 text-left">Leasehold</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Ownership Period', 'Permanent', '99 years typically'],
                    ['Land Ownership', 'You own the land', 'Land belongs to others'],
                    ['Resale Value', 'Higher', 'Lower due to reducing lease'],
                    ['Bank Loans', 'Easier to get', 'More difficult, lower amount'],
                    ['Renewal', 'Not required', 'Required at lease end'],
                    ['Maintenance', 'Your responsibility', 'Shared with land owner']
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 p-4 font-medium">{row[0]}</td>
                      <td className="border border-gray-300 p-4">{row[1]}</td>
                      <td className="border border-gray-300 p-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inheritance Rights */}
      {activeSection === 'inheritance' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Inheritance Rights by Religion</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inheritanceRules.map((rule, index) => (
                <motion.div
                  key={rule.religion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedInheritance(rule)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Landmark className="w-8 h-8 text-purple-600" />
                    <h4 className="text-xl font-bold text-gray-800">{rule.religion} Law</h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Male Heirs:</h5>
                      <div className="flex flex-wrap gap-1">
                        {rule.maleHeir.slice(0, 2).map((heir, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {heir}
                          </span>
                        ))}
                        {rule.maleHeir.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{rule.maleHeir.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Female Heirs:</h5>
                      <div className="flex flex-wrap gap-1">
                        {rule.femaleHeir.slice(0, 2).map((heir, idx) => (
                          <span key={idx} className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                            {heir}
                          </span>
                        ))}
                        {rule.femaleHeir.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{rule.femaleHeir.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <h5 className="font-medium text-gray-700 mb-1">Spouse Rights:</h5>
                      <p className="text-sm text-gray-600">{rule.spouse}</p>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Inheritance Tree Diagram */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Sample Inheritance Structure</h3>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-green-600 text-white rounded-lg">
                  <h4 className="font-bold">Deceased Person</h4>
                  <p className="text-sm">Property Owner</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Spouse */}
                <div className="text-center">
                  <div className="p-4 bg-purple-100 rounded-lg mb-4">
                    <h5 className="font-bold text-purple-800">Spouse</h5>
                    <p className="text-sm text-purple-600">Wife/Husband</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Share varies by religion</p>
                    <p>Equal rights in most cases</p>
                  </div>
                </div>

                {/* Children */}
                <div className="text-center">
                  <div className="p-4 bg-blue-100 rounded-lg mb-4">
                    <h5 className="font-bold text-blue-800">Children</h5>
                    <p className="text-sm text-blue-600">Sons & Daughters</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>Primary heirs</p>
                    <p>Equal rights under Hindu law</p>
                  </div>
                </div>

                {/* Parents */}
                <div className="text-center">
                  <div className="p-4 bg-orange-100 rounded-lg mb-4">
                    <h5 className="font-bold text-orange-800">Parents</h5>
                    <p className="text-sm text-orange-600">Father & Mother</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    <p>If no spouse/children</p>
                    <p>Equal inheritance rights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal Documents */}
      {activeSection === 'documents' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Essential Legal Documents</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalDocuments.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-800">{doc.name}</h4>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{doc.description}</p>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Use Case:</h5>
                    <p className="text-sm text-gray-600">{doc.useCase}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Format:</h5>
                    <p className="text-sm text-gray-600">{doc.format}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Requirements:</h5>
                    <ul className="space-y-1">
                      {doc.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
                      Download Template
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      View Sample
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Document Viewer */}
          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-gray-600" />
              <h4 className="text-xl font-bold text-gray-800">Document Format Viewer</h4>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <h5 className="font-bold text-gray-800">Sample Sale Agreement Format</h5>
              </div>
              <div className="font-mono text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto">
                <p>SALE AGREEMENT</p>
                <br />
                <p>This Sale Agreement is made on [Date] between:</p>
                <br />
                <p>SELLER:</p>
                <p>Name: [Seller Name]</p>
                <p>Address: [Seller Address]</p>
                <p>Aadhar: [Aadhar Number]</p>
                <br />
                <p>PURCHASER:</p>
                <p>Name: [Buyer Name]</p>
                <p>Address: [Buyer Address]</p>
                <p>Aadhar: [Aadhar Number]</p>
                <br />
                <p>PROPERTY DETAILS:</p>
                <p>Address: [Property Address]</p>
                <p>Survey No: [Survey Number]</p>
                <p>Area: [Area in Sq.ft/Acres]</p>
                <p>Sale Price: Rs. [Amount]</p>
                <br />
                <p className="text-gray-500">[Document continues with terms and conditions...]</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Download Full Format
                </button>
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  Fill Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Farmer Rights */}
      {activeSection === 'farmers' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <TreePine className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Farmer Land Rights</h3>
            </div>

            <div className="space-y-8">
              {farmerRights.map((right, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg"
                >
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{right.title}</h4>
                  <p className="text-gray-700 mb-4">{right.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {right.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Land Acquisition Process */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Map className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Land Acquisition Process</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 1, title: 'Survey & Planning', desc: 'Government identifies land needs' },
                { step: 2, title: 'Public Notice', desc: 'Notice published for objections' },
                { step: 3, title: 'Social Impact', desc: 'Assessment of impact on farmers' },
                { step: 4, title: 'Compensation', desc: 'Fair compensation calculated' },
                { step: 5, title: 'Rehabilitation', desc: 'Resettlement and employment' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-blue-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h5 className="font-bold text-gray-800 mb-2">{item.title}</h5>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-800 mb-2">Important Rights:</h4>
                  <ul className="space-y-1 text-yellow-700 text-sm">
                    <li>• Right to object during public hearing</li>
                    <li>• Right to fair compensation at market value</li>
                    <li>• Right to rehabilitation and resettlement</li>
                    <li>• Right to employment for affected families</li>
                    <li>• Right to legal representation throughout process</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inheritance Detail Modal */}
      {selectedInheritance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedInheritance(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedInheritance.religion} Inheritance Law</h3>
              <button
                onClick={() => setSelectedInheritance(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Male Heirs (Order of Priority):</h4>
                  <ul className="space-y-2">
                    {selectedInheritance.maleHeir.map((heir, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700">{heir}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Female Heirs (Order of Priority):</h4>
                  <ul className="space-y-2">
                    {selectedInheritance.femaleHeir.map((heir, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-pink-100 text-pink-800 rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700">{heir}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Spouse Rights:</h4>
                <p className="text-purple-700">{selectedInheritance.spouse}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">Special Notes:</h4>
                <ul className="space-y-2">
                  {selectedInheritance.specialNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-gray-700 text-sm">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button className="flex-1 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
                  Download Inheritance Guide
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  Consult Lawyer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Quick Resources */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-8 h-8 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-800">Quick Resources</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Property Verification Checklist', type: 'PDF', icon: <CheckCircle className="w-5 h-5" /> },
            { title: 'Inheritance Calculator', type: 'Tool', icon: <Calculator className="w-5 h-5" /> },
            { title: 'Document Templates Pack', type: 'ZIP', icon: <FileText className="w-5 h-5" /> },
            { title: 'Farmer Rights Handbook', type: 'PDF', icon: <TreePine className="w-5 h-5" /> }
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  {resource.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                </div>
              </div>
              <button className="w-full px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}