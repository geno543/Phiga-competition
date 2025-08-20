import React, { useEffect, useState } from 'react';
import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiStar,
  FiZap,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiUsers,
  FiGlobe,
  FiAward,
  FiClock,
  FiBook,
  FiSettings
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineLightBulb } from 'react-icons/hi2';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ComponentType<any>;
}

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const categories = [
    { id: 'general', name: 'General', icon: FiHelpCircle, color: 'text-blue-500' },
    { id: 'competition', name: 'Competition', icon: FiAward, color: 'text-green-500' },
    { id: 'technical', name: 'Technical', icon: FiSettings, color: 'text-purple-500' },
    { id: 'account', name: 'Account', icon: FiUsers, color: 'text-orange-500' },
    { id: 'scoring', name: 'Scoring', icon: FiZap, color: 'text-red-500' }
  ];

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'What is PHIGA?',
      answer: 'PHIGA (Physics International Gamefield Adventure) is a global online physics competition platform that challenges high school students through interactive video-based problems and real-time scoring.',
      category: 'general',
      icon: HiOutlineAcademicCap
    },
    {
      id: '2',
      question: 'How do I register for PHIGA?',
      answer: 'Registration is simple! Click the "Register" button on our homepage, fill out your details including school information, and verify your email address. You\'ll then have access to practice problems and can participate in competitions.',
      category: 'general',
      icon: FiUsers
    },
    {
      id: '3',
      question: 'Is PHIGA free to participate?',
      answer: 'Yes! PHIGA is completely free for all students. We believe physics education should be accessible to everyone, regardless of their financial situation.',
      category: 'general',
      icon: FiGlobe
    },
    {
      id: '4',
      question: 'How does the competition format work?',
      answer: 'Competitions feature video-based physics problems that you solve in real-time. Each problem has a time limit, and points are awarded based on accuracy and speed. Rankings are updated live during the competition.',
      category: 'competition',
      icon: FiAward
    },
    {
      id: '5',
      question: 'What topics are covered in the problems?',
      answer: 'Our problems cover all major high school physics topics including mechanics, thermodynamics, electromagnetism, optics, and modern physics. Problems range from basic concepts to advanced applications.',
      category: 'competition',
      icon: FiBook
    },
    {
      id: '6',
      question: 'How is scoring calculated?',
      answer: 'Scoring is based on accuracy (correctness of your answer) and speed (how quickly you solve the problem). Bonus points are awarded for consecutive correct answers and exceptional performance.',
      category: 'scoring',
      icon: FiZap
    },
    {
      id: '7',
      question: 'Can I practice before competitions?',
      answer: 'Absolutely! We provide a comprehensive practice mode with hundreds of problems across all physics topics. Practice as much as you want to improve your skills.',
      category: 'competition',
      icon: HiOutlineLightBulb
    },
    {
      id: '8',
      question: 'What technical requirements do I need?',
      answer: 'You need a stable internet connection, a modern web browser (Chrome, Firefox, Safari, or Edge), and a device with a screen size of at least 10 inches for the best experience.',
      category: 'technical',
      icon: FiSettings
    },
    {
      id: '9',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
      category: 'account',
      icon: FiShield
    },
    {
      id: '10',
      question: 'Are there prizes for winners?',
      answer: 'Yes! We offer various prizes including certificates, scholarships, and recognition opportunities. Top performers may also receive invitations to special physics programs and events.',
      category: 'competition',
      icon: FiStar
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-phiga-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section id="faq-section" className="relative bg-gradient-to-br from-phiga-main via-phiga-dark to-black dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-black text-white py-24 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 rounded-full blur-2xl animate-pulse-slow opacity-40"></div>
          <div className="absolute top-1/3 right-20 w-60 h-60 bg-gradient-to-r from-phiga-light/15 to-phiga-accent/20 rounded-full blur-3xl animate-float opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-gradient-to-r from-phiga-accent/25 to-white/20 rounded-full blur-xl animate-bounce-slow opacity-50"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,247,244,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,247,244,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 animate-pulse"></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,191,157,0.1)_50%,transparent_100%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8 group hover:scale-105 transition-all duration-500">
            <FiHelpCircle className="text-phiga-accent animate-pulse" size={24} />
            <span className="text-white font-semibold">Frequently Asked Questions</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
              FAQ
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            <span className="text-phiga-light/90">
              Find answers to 
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              common questions
            </span>
            <span className="text-phiga-light/90">
              {' '}about PHIGA
            </span>
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:border-transparent transition-all duration-300"
              />
              <FiActivity className="absolute right-4 top-1/2 transform -translate-y-1/2 text-phiga-accent" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16" style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r from-phiga-accent to-phiga-light text-white shadow-lg shadow-phiga-accent/30 scale-105' 
                      : 'bg-white/80 dark:bg-phiga-gray-800/80 text-phiga-gray-600 dark:text-phiga-gray-300 hover:bg-phiga-accent/10 hover:scale-105'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <IconComponent 
                    className={`relative z-10 transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    } ${category.color}`} 
                    size={20} 
                  />
                  <span className={`relative z-10 font-semibold transition-all duration-300 ${
                    isActive ? 'font-bold' : 'group-hover:font-bold'
                  }`}>
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredFAQs.map((faq, index) => {
              const IconComponent = faq.icon;
              const isOpen = openItems.includes(faq.id);
              
              return (
                <div
                  key={faq.id}
                  className="group bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden"
                  style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.1}s`
                  }}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 lg:p-8 text-left transition-all duration-300 hover:bg-phiga-accent/5 focus:outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="text-phiga-accent" size={24} />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-heading font-bold text-phiga-main dark:text-white group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-4">
                        {isOpen ? (
                          <FiChevronUp className="text-phiga-accent group-hover:scale-110 transition-transform duration-300" size={24} />
                        ) : (
                          <FiChevronDown className="text-phiga-gray-400 group-hover:text-phiga-accent group-hover:scale-110 transition-all duration-300" size={24} />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                      <div className="ml-16 pl-4 border-l-2 border-phiga-accent/30">
                        <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-phiga-accent">
                          <FiCheckCircle size={16} />
                          <span className="text-sm font-medium">Helpful Answer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <FiHelpCircle className="text-phiga-gray-400 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-heading font-bold text-phiga-gray-600 dark:text-phiga-gray-400 mb-2">
                No FAQs Found
              </h3>
              <p className="text-phiga-gray-500 dark:text-phiga-gray-500">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
          
          {/* Contact Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 backdrop-blur-xl rounded-2xl border border-phiga-accent/20">
              <FiActivity className="text-phiga-accent animate-pulse" size={24} />
              <div>
                <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-1">
                  Still have questions?
                </h4>
                <p className="text-phiga-gray-600 dark:text-phiga-gray-300">
                  Contact our support team for personalized help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;