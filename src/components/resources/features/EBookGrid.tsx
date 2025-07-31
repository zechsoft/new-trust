import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Search, 
  Star,
  FileText,
  Code,
  Brain,
  Globe,
  X,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

interface EBook {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  pages: number;
  downloads: number;
  rating: number;
  image: string;
  fileSize: string;
  language: string;
  tags: string[];
  downloadUrl?: string;
}

export default function EBookGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState<EBook[]>([]);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [previewBook, setPreviewBook] = useState<EBook | null>(null);
  const [downloadingBooks, setDownloadingBooks] = useState<Set<number>>(new Set());
  const [downloadedBooks, setDownloadedBooks] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'upsc', name: 'UPSC', icon: BookOpen },
    { id: 'ssc', name: 'SSC', icon: FileText },
    { id: 'banking', name: 'Banking', icon: Star },
    { id: 'coding', name: 'Programming', icon: Code },
    { id: 'skills', name: 'Life Skills', icon: Brain }
  ];

  const mockBooks: EBook[] = [
    {
      id: 1,
      title: 'UPSC Civil Services Complete Guide',
      author: 'Dr. Rajesh Kumar',
      category: 'upsc',
      description: 'Comprehensive guide covering all aspects of UPSC Civil Services examination with previous year questions and analysis.',
      pages: 450,
      downloads: 15420,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      fileSize: '25.5 MB',
      language: 'English',
      tags: ['UPSC', 'Civil Services', 'Current Affairs'],
      downloadUrl: '#upsc-guide.pdf'
    },
    {
      id: 2,
      title: 'SSC CGL Mathematics Mastery',
      author: 'Prof. Anita Sharma',
      category: 'ssc',
      description: 'Master mathematics for SSC CGL with step-by-step solutions and practice questions.',
      pages: 320,
      downloads: 12350,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=400&fit=crop',
      fileSize: '18.2 MB',
      language: 'English',
      tags: ['SSC', 'Mathematics', 'Quantitative'],
      downloadUrl: '#ssc-math.pdf'
    },
    {
      id: 3,
      title: 'Banking Awareness 2024',
      author: 'Financial Academy',
      category: 'banking',
      description: 'Latest banking awareness questions and current affairs for all banking examinations.',
      pages: 280,
      downloads: 9840,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      fileSize: '15.8 MB',
      language: 'English',
      tags: ['Banking', 'Current Affairs', 'Finance'],
      downloadUrl: '#banking-awareness.pdf'
    },
    {
      id: 4,
      title: 'Python Programming Fundamentals',
      author: 'Tech Educators',
      category: 'coding',
      description: 'Learn Python from basics to advanced with practical examples and projects.',
      pages: 380,
      downloads: 18520,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=400&fit=crop',
      fileSize: '22.1 MB',
      language: 'English',
      tags: ['Python', 'Programming', 'Web Development'],
      downloadUrl: '#python-fundamentals.pdf'
    },
    {
      id: 5,
      title: 'Communication Skills Excellence',
      author: 'Life Coach Institute',
      category: 'skills',
      description: 'Develop effective communication skills for personal and professional success.',
      pages: 240,
      downloads: 7650,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop',
      fileSize: '12.3 MB',
      language: 'English',
      tags: ['Communication', 'Soft Skills', 'Leadership'],
      downloadUrl: '#communication-skills.pdf'
    },
    {
      id: 6,
      title: 'JavaScript Complete Reference',
      author: 'Code Masters',
      category: 'coding',
      description: 'Complete JavaScript reference with ES6+ features, DOM manipulation, and modern frameworks.',
      pages: 520,
      downloads: 14200,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=400&fit=crop',
      fileSize: '28.7 MB',
      language: 'English',
      tags: ['JavaScript', 'Web Development', 'ES6'],
      downloadUrl: '#javascript-reference.pdf'
    }
  ];

  useEffect(() => {
    let filtered = mockBooks;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory]);

  const handleDownload = async (book: EBook) => {
    if (downloadingBooks.has(book.id)) return;

    setDownloadingBooks(prev => new Set(prev).add(book.id));
    
    try {
      // Create a sample PDF content for demonstration
      // In a real app, you would fetch from your server: await fetch(book.downloadUrl)
      const pdfContent = createSamplePDF(book);
      
      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Mark as downloaded and update count
      setDownloadedBooks(prev => new Set(prev).add(book.id));
      
      // Update download count
      const bookIndex = filteredBooks.findIndex(b => b.id === book.id);
      if (bookIndex !== -1) {
        const updatedBooks = [...filteredBooks];
        updatedBooks[bookIndex] = {
          ...updatedBooks[bookIndex],
          downloads: updatedBooks[bookIndex].downloads + 1
        };
        setFilteredBooks(updatedBooks);
      }
      
      // Show success message
      console.log(`Successfully downloaded: ${book.title}`);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadingBooks(prev => {
        const newSet = new Set(prev);
        newSet.delete(book.id);
        return newSet;
      });
    }
  };

  // Create a simple PDF-like content (for demo purposes)
  // In production, you would fetch actual PDF files from your server
  const createSamplePDF = (book: EBook) => {
    const content = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
50 700 Td
(${book.title}) Tj
0 -50 Td
/F1 16 Tf
(by ${book.author}) Tj
0 -100 Td
/F1 12 Tf
(${book.description}) Tj
0 -50 Td
(Pages: ${book.pages}) Tj
0 -30 Td
(File Size: ${book.fileSize}) Tj
0 -30 Td
(Rating: ${book.rating}/5) Tj
0 -50 Td
(This is a sample PDF file.) Tj
0 -30 Td
(Download more books from our collection!) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`;
    return content;
  };

  const handlePreview = (book: EBook) => {
    setPreviewBook(book);
  };

  const closePreview = () => {
    setPreviewBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            📚 Free eBooks & Study Materials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access thousands of high-quality eBooks, PDFs, and study materials for competitive exams and skill development
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books, authors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:scale-105'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="group relative"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Book Cover */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  {hoveredBook === book.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-opacity duration-300">
                      <button
                        onClick={() => handlePreview(book)}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                        title="Preview Book"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDownload(book)}
                        disabled={downloadingBooks.has(book.id)}
                        className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                        title="Download Book"
                      >
                        {downloadingBooks.has(book.id) ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : downloadedBooks.has(book.id) ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Download className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  )}
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {book.tags.slice(0, 3).map((tag, tagIndex) => (
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
                    <span>{book.pages} pages</span>
                    <span>{book.fileSize}</span>
                    <span>{book.downloads.toLocaleString()} downloads</span>
                  </div>
                  
                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(book)}
                    disabled={downloadingBooks.has(book.id)}
                    className={`w-full py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 ${
                      downloadedBooks.has(book.id)
                        ? 'bg-green-600 text-white'
                        : downloadingBooks.has(book.id)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
                    }`}
                  >
                    {downloadingBooks.has(book.id) ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : downloadedBooks.has(book.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Free
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{previewBook.title}</h3>
                <button
                  onClick={closePreview}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-6">
                <img
                  src={previewBook.image}
                  alt={previewBook.title}
                  className="w-32 h-40 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">by {previewBook.author}</p>
                  <p className="text-gray-700 mb-4">{previewBook.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Pages:</span> {previewBook.pages}
                    </div>
                    <div>
                      <span className="font-medium">File Size:</span> {previewBook.fileSize}
                    </div>
                    <div>
                      <span className="font-medium">Language:</span> {previewBook.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Rating:</span>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {previewBook.rating}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {previewBook.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDownload(previewBook)}
                  disabled={downloadingBooks.has(previewBook.id)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {downloadingBooks.has(previewBook.id) ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : downloadedBooks.has(previewBook.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Downloaded
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download
                    </>
                  )}
                </button>
                <button
                  onClick={closePreview}
                  className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}