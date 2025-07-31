import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  achievement: string;
  quote: string;
  category: string;
  rating: number;
  examYear?: string;
  currentRole?: string;
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ranjitha',
      location: 'Tamil Nadu',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=80&h=80&fit=crop&crop=face',
      achievement: 'Cleared Group 4 Exams',
      quote: 'Thanks to the free books and study materials, I was able to clear my Group 4 exams on the first attempt. The quality of content is excellent!',
      category: 'TNPSC',
      rating: 5,
      examYear: '2024',
      currentRole: 'Junior Assistant'
    },
    {
      id: 2,
      name: 'Ajay',
      location: 'Chennai',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      achievement: 'Cracked IBPS PO',
      quote: 'Found a mentor who guided me from zero to cracking IBPS! The mentorship program completely transformed my preparation strategy.',
      category: 'Banking',
      rating: 5,
      examYear: '2023',
      currentRole: 'Probationary Officer at SBI'
    },
    {
      id: 3,
      name: 'Neha',
      location: 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      achievement: 'Learned Python Programming',
      quote: 'I love the video section. Learning Python was never easier. The step-by-step tutorials helped me land my first tech job!',
      category: 'Programming',
      rating: 5,
      currentRole: 'Software Developer'
    },
    {
      id: 4,
      name: 'Priyanka Sharma',
      location: 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
      achievement: 'UPSC Mains Qualified',
      quote: 'The comprehensive study materials and community support helped me qualify for UPSC Mains. The current affairs section is particularly helpful.',
      category: 'UPSC',
      rating: 5,
      examYear: '2024'
    },
    {
      id: 5,
      name: 'Rohit Kumar',
      location: 'Bangalore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      achievement: 'Got Placed in Microsoft',
      quote: 'The coding workshops and technical interview preparation materials were game-changers. Secured my dream job at Microsoft!',
      category: 'Tech Career',
      rating: 5,
      currentRole: 'Software Engineer at Microsoft'
    },
    {
      id: 6,
      name: 'Anita Patel',
      location: 'Gujarat',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face',
      achievement: 'Started Own Business',
      quote: 'The entrepreneurship workshops and business mentorship helped me start my own successful consultancy. Forever grateful!',
      category: 'Entrepreneurship',
      rating: 5,
      currentRole: 'Founder, TechConsult Solutions'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, testimonials.length]);

  const handleTransition = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    handleTransition(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    handleTransition(prevIndex);
  };

  const goToSlide = (index: number) => {
    handleTransition(index);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'TNPSC': 'from-blue-500 to-purple-500',
      'Banking': 'from-green-500 to-blue-500',
      'Programming': 'from-purple-500 to-pink-500',
      'UPSC': 'from-orange-500 to-red-500',
      'Tech Career': 'from-indigo-500 to-purple-500',
      'Entrepreneurship': 'from-yellow-500 to-orange-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const highlightKeywords = (text: string) => {
    const keywords = ['cleared', 'cracked', 'mentor', 'love', 'helped', 'successful', 'dream'];
    let highlightedText = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-yellow-300 font-semibold">${keyword}</span>`);
    });
    
    return highlightedText;
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto p-4">
      {/* Main Carousel */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className={`bg-gradient-to-r ${getCategoryColor(currentTestimonial.category)} p-8 md:p-12 text-white min-h-[400px] flex items-center transition-all duration-500 ease-in-out ${
            isTransitioning ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="w-full">
            {/* Quote Icon */}
            <div className="mb-6">
              <Quote className="w-12 h-12 text-white/30" />
            </div>

            {/* Testimonial Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* User Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block mb-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg object-cover"
                  />
                  {/* Achievement Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{currentTestimonial.name}</h3>
                <p className="text-white/80 mb-1">{currentTestimonial.location}</p>
                
                {/* Category Tag */}
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {currentTestimonial.category}
                </span>
                
                {/* Achievement */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-lg text-yellow-300 mb-1">
                    🏆 {currentTestimonial.achievement}
                  </h4>
                  {currentTestimonial.examYear && (
                    <p className="text-white/70 text-sm">Class of {currentTestimonial.examYear}</p>
                  )}
                  {currentTestimonial.currentRole && (
                    <p className="text-white/70 text-sm">{currentTestimonial.currentRole}</p>
                  )}
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-2">
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                  "<span 
                    dangerouslySetInnerHTML={{ 
                      __html: highlightKeywords(currentTestimonial.quote) 
                    }} 
                  />"
                </blockquote>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                    ))}
                  </div>
                  <span className="text-white/80">({currentTestimonial.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-6 space-x-4 overflow-x-auto pb-2 px-4">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentIndex
                ? 'bg-white shadow-lg scale-105 ring-2 ring-blue-500'
                : 'bg-white/50 hover:bg-white/70 hover:scale-105'
            }`}
          >
            <div className="flex items-center gap-3 min-w-[200px]">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <h4 className={`font-medium text-sm ${
                  index === currentIndex ? 'text-gray-800' : 'text-gray-600'
                }`}>
                  {testimonial.name}
                </h4>
                <p className={`text-xs ${
                  index === currentIndex ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  {testimonial.achievement}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Auto-play Control */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isAutoPlaying
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isAutoPlaying ? '⏸️ Pause Auto-play' : '▶️ Resume Auto-play'}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">25,000+</div>
          <div className="text-gray-600">Success Stories</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
          <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
          <div className="text-gray-600">Success Rate</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
      </div>
    </div>
  );
}