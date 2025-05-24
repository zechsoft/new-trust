'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Bookmark, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface Law {
  id: string;
  title: string;
  act: string;
  sections: string[];
  keywords: string[];
  summary: string;
  fullText: string;
}

const lawsData: Law[] = [
  {
    id: 'ipc-498a',
    title: 'Husband or relative of husband subjecting woman to cruelty',
    act: 'Indian Penal Code (IPC)',
    sections: ['Section 498A'],
    keywords: ['dowry', 'harassment', 'marital cruelty', 'domestic violence'],
    summary: 'This section deals with cruelty by husband or his relatives towards a married woman, including demands for dowry, mental or physical torture.',
    fullText: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine. Explanation.—For the purposes of this section, "cruelty" means— (a) any wilful conduct which is of such a nature as is likely to drive the woman to commit suicide or to cause grave injury or danger to life, limb or health (whether mental or physical) of the woman; or (b) harassment of the woman where such harassment is with a view to coercing her or any person related to her to meet any unlawful demand for any property or valuable security or is on account of failure by her or any person related to her to meet such demand.'
  },
  {
    id: 'rte-act',
    title: 'Right of Children to Free and Compulsory Education',
    act: 'Right to Education Act (RTE)',
    sections: ['Section 3', 'Section 8', 'Section 12'],
    keywords: ['education', 'school', 'children', 'free education'],
    summary: 'The Act makes education a fundamental right of every child between the ages of 6 and 14 and specifies minimum norms in elementary schools.',
    fullText: 'Every child of the age of six to fourteen years shall have a right to free and compulsory education in a neighbourhood school till completion of elementary education. No child shall be liable to pay any kind of fee or charges or expenses which may prevent him or her from pursuing and completing elementary education. The appropriate Government and local authority shall establish, within such area or limits of neighbourhood, as may be prescribed, a school, where it is not so established, within a period of three years from the commencement of this Act.'
  },
  {
    id: 'consumer-protection',
    title: 'Consumer Rights Protection',
    act: 'Consumer Protection Act, 2019',
    sections: ['Section 2(7)', 'Section 2(9)', 'Section 2(11)'],
    keywords: ['consumer rights', 'defective product', 'deficiency in service', 'compensation'],
    summary: 'The Act provides for protection of the interests of consumers and establishes authorities for timely and effective administration and settlement of consumers disputes.',
    fullText: 'A consumer is defined as a person who buys any goods or avails services for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment. It includes any user of such goods or beneficiary of such services when such use is made with the approval of such person. Consumer rights include the right to be protected against marketing of goods and services which are hazardous to life and property; the right to be informed about the quality, quantity, potency, purity, standard and price of goods or services; the right to be assured access to a variety of goods or services at competitive prices; and the right to seek redressal against unfair or restrictive trade practices.'
  },
  {
    id: 'rti-act',
    title: 'Right to Information',
    act: 'Right to Information Act, 2005',
    sections: ['Section 6', 'Section 7', 'Section 8'],
    keywords: ['information', 'government', 'transparency', 'public authority'],
    summary: 'The Act empowers citizens to request information from public authorities to promote transparency and accountability in government.',
    fullText: 'Any person desirous of obtaining any information under this Act shall make a request in writing or through electronic means in English or Hindi or in the official language of the area in which the application is being made, accompanying such fee as may be prescribed, to the Central Public Information Officer or State Public Information Officer, as the case may be. The information shall ordinarily be provided within thirty days of the receipt of the request. The Act lists certain exemptions where information need not be provided, including information which would prejudicially affect the sovereignty and integrity of India, security, strategic, scientific or economic interests of the State, relation with foreign State or lead to incitement of an offence.'
  },
  {
    id: 'domestic-violence',
    title: 'Protection of Women from Domestic Violence',
    act: 'Protection of Women from Domestic Violence Act, 2005',
    sections: ['Section 3', 'Section 12', 'Section 17'],
    keywords: ['domestic violence', 'women protection', 'abuse', 'protection order'],
    summary: 'The Act provides for more effective protection of the rights of women guaranteed under the Constitution who are victims of violence of any kind occurring within the family.',
    fullText: 'Domestic violence includes actual abuse or threat of abuse that is physical, sexual, verbal, emotional or economic. Harassment by way of unlawful dowry demands to the woman or her relatives would also be covered under this definition. The Act provides for the right of a woman to reside in the shared household, whether or not she has any title or rights in the household. The aggrieved person can approach the court for protection orders, residence orders, monetary relief, custody orders or compensation orders. The court may pass a protection order in favor of the aggrieved person prohibiting the respondent from committing any act of domestic violence, aiding or abetting in the commission of acts of domestic violence or entering the place of employment of the aggrieved person.'
  },
];

const LawFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Law[]>([]);
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [bookmarkedLaws, setBookmarkedLaws] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load bookmarked laws from localStorage
    const savedBookmarks = localStorage.getItem('bookmarkedLaws');
    if (savedBookmarks) {
      setBookmarkedLaws(JSON.parse(savedBookmarks));
    }

    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentLegalSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = lawsData.filter(law => 
      law.title.toLowerCase().includes(query) ||
      law.act.toLowerCase().includes(query) ||
      law.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
      law.summary.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && !recentSearches.includes(query)) {
      const updatedSearches = [query, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentLegalSearches', JSON.stringify(updatedSearches));
    }
  };

  const toggleBookmark = (lawId: string) => {
    let updatedBookmarks;
    if (bookmarkedLaws.includes(lawId)) {
      updatedBookmarks = bookmarkedLaws.filter(id => id !== lawId);
    } else {
      updatedBookmarks = [...bookmarkedLaws, lawId];
    }
    setBookmarkedLaws(updatedBookmarks);
    localStorage.setItem('bookmarkedLaws', JSON.stringify(updatedBookmarks));
  };

  const toggleSection = (lawId: string) => {
    setExpandedSections({
      ...expandedSections,
      [lawId]: !expandedSections[lawId]
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedLaw(null);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Indian Law Finder</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search and understand Indian laws using simple keywords or common issues
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Search by keyword (e.g. harassment, divorce, property)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {recentSearches.length > 0 && searchQuery === '' && (
            <div className="max-w-2xl mx-auto mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {searchQuery && searchResults.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No laws found</h3>
                <p className="text-gray-500">
                  Try different keywords like "property", "divorce", "consumer rights" etc.
                </p>
              </div>
            ) : null}

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
                </h3>
                
                <AnimatePresence>
                  {searchResults.map((law) => (
                    <motion.div
                      key={law.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-xl shadow-md overflow-hidden border ${
                        selectedLaw?.id === law.id ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{law.title}</h3>
                            <p className="text-sm text-blue-600 font-medium mb-2">{law.act}</p>
                            <p className="text-gray-600 text-sm mb-3">{law.summary}</p>
                          </div>
                          <button
                            onClick={() => toggleBookmark(law.id)}
                            className={`p-2 rounded-full ${
                              bookmarkedLaws.includes(law.id) 
                                ? 'text-yellow-500 bg-yellow-50' 
                                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                            }`}
                          >
                            <Bookmark className="h-5 w-5" fill={bookmarkedLaws.includes(law.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {law.keywords.map((keyword, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => setSelectedLaw(law)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Full Text
                          </button>
                          <button
                            onClick={() => toggleSection(law.id)}
                            className="flex items-center text-gray-500 text-sm"
                          >
                            {expandedSections[law.id] ? (
                              <>
                                Hide Sections <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Show Sections <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                        
                        {expandedSections[law.id] && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-medium text-gray-700 mb-2">Relevant Sections:</h4>
                            <ul className="space-y-2">
                              {law.sections.map((section, idx) => (
                                <li key={idx} className="text-sm text-gray-600">
                                  • {section}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {selectedLaw ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 sticky top-4">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{selectedLaw.title}</h3>
                    <button
                      onClick={() => setSelectedLaw(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {selectedLaw.act}
                    </span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                    <p className="whitespace-pre-line">{selectedLaw.fullText}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Download className="h-4 w-4" />
                      Download as PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 sticky top-4">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Laws</h3>
                  <ul className="space-y-3">
                    {lawsData.slice(0, 5).map((law) => (
                      <li key={law.id}>
                        <button
                          onClick={() => {
                            setSelectedLaw(law);
                            handleSearch(law.title.split(' ')[0]);
                          }}
                          className="text-left text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {law.title}
                        </button>
                        <p className="text-xs text-gray-500">{law.act}</p>
                      </li>
                    ))}
                  </ul>
                  
                  {bookmarkedLaws.length > 0 && (
                    <>
                      <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Your Bookmarks</h3>
                      <ul className="space-y-3">
                        {lawsData
                          .filter(law => bookmarkedLaws.includes(law.id))
                          .map((law) => (
                            <li key={law.id}>
                              <button
                                onClick={() => {
                                  setSelectedLaw(law);
                                  handleSearch(law.title.split(' ')[0]);
                                }}
                                className="text-left text-blue-600 hover:text-blue-800 text-sm flex items-start gap-2"
                              >
                                <Bookmark className="h-4 w-4 flex-shrink-0 text-yellow-500" fill="currentColor" />
                                <span>{law.title}</span>
                              </button>
                              <p className="text-xs text-gray-500 ml-6">{law.act}</p>
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawFinder;