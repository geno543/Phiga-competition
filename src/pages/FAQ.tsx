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
      answer: 'PHIGA (Physics International Gamefield Adventure) is an individual, 4-hour online physics competition for high school students and undergraduates. It features 30 progressive problems presented through an immersive video-based storyline, created by the physics education experts at Quantastra.',
      category: 'general',
      icon: HiOutlineAcademicCap
    },
    {
      id: '2',
      question: 'Who can participate in PHIGA?',
      answer: 'PHIGA is open to high school students (grades 9-12) and undergraduate students worldwide. Participants compete individually, not as teams. There are separate categories based on grade level: Category A (grades 9-10), Category B (grade 11), Category C (grade 12), and Open Category (undergraduates and extended programs).',
      category: 'general',
      icon: FiUsers
    },
    {
      id: '3',
      question: 'Is PHIGA free to participate?',
      answer: 'Yes! PHIGA is completely free of charge. We believe in making quality physics education accessible to all students worldwide, regardless of their financial situation.',
      category: 'general',
      icon: FiGlobe
    },
    {
      id: '4',
      question: 'How does the competition format work?',
      answer: 'The competition lasts exactly 4 hours and consists of 30 consecutive problems. Each problem is presented as part of a gamified video storyline. You must solve each problem correctly to unlock the next one. Problems increase in difficulty as you progress through the stages.',
      category: 'competition',
      icon: FiAward
    },
    {
      id: '5',
      question: 'How is scoring calculated?',
      answer: 'Each problem has a maximum score of 5 points if solved correctly on the first attempt. For each incorrect attempt, available points decrease: 4 points (2nd attempt), 3 points (3rd), 2 points (4th), and 1 point (5th). The goal is to collect as many points as possible in the shortest time.',
      category: 'scoring',
      icon: FiZap
    },
    {
      id: '6',
      question: 'Can I skip problems if I get stuck?',
      answer: 'Yes, you can skip up to 5 problems during the competition, but each skip deducts 2 points from your total score. This feature becomes available after the competition begins and should be used strategically.',
      category: 'competition',
      icon: FiActivity
    },
    {
      id: '7',
      question: 'What resources am I allowed to use?',
      answer: 'You can use Google Search and publicly accessible internet resources for physics concepts, formulas, and general knowledge. However, communication with other participants is strictly prohibited, and the use of generative AI tools (like ChatGPT) or pre-written code/scripts is forbidden.',
      category: 'competition',
      icon: FiBook
    },
    {
      id: '8',
      question: 'What technical requirements do I need?',
      answer: 'You need a stable internet connection, a modern web browser (Chrome, Firefox, Safari, or Edge), and a device capable of viewing videos and submitting numerical answers. The platform works on computers, tablets, and large smartphones.',
      category: 'technical',
      icon: FiSettings
    },
    {
      id: '9',
      question: 'How do I register for PHIGA?',
      answer: 'Registration opens before each competition period. You must pre-register at the official PHIGA website with your personal and school information. You\'ll receive a unique password shortly before the competition to access the platform.',
      category: 'account',
      icon: FiShield
    },
    {
      id: '10',
      question: 'What happens if there are technical issues during competition?',
      answer: 'Important announcements are posted on the online board within the platform. Only in exceptional cases will email be used for urgent communications. If serious issues are discovered with problems, organizers may modify or eliminate them. Monitor the online board throughout the event.',
      category: 'technical',
      icon: FiActivity
    },
    {
      id: '11',
      question: 'How are winners determined and what are the prizes?',
      answer: 'The winner is the participant with the highest number of points. In case of ties, the earlier time of the last submitted correct answer prevails. Winners receive certificates and recognition. Results are published with basic information (name, school, country, points) in both digital and print formats.',
      category: 'scoring',
      icon: FiStar
    },
    {
      id: '12',
      question: 'Can I appeal results or contest decisions?',
      answer: 'Yes, participants may appeal to organizers up to 60 minutes after the competition ends. Your remarks will be considered and may be reflected in the final results. After all appeals are reviewed, final results are published on the PHIGA website.',
      category: 'scoring',
      icon: FiCheckCircle
    },
    {
      id: '13',
      question: 'What is the connection between PHIGA and Quantastra?',
      answer: 'Quantastra is a physics education channel that creates animated content to make physics concepts accessible and engaging. The educational expertise and gamified approach developed by Quantastra became the foundation for PHIGA\'s comprehensive competition platform.',
      category: 'general',
      icon: HiOutlineLightBulb
    },
    {
      id: '14',
      question: 'Are there practice opportunities before the competition?',
      answer: 'While specific practice modes aren\'t mentioned in the official rules, the competition platform will be made available to registered participants before the event begins. Focus on reviewing fundamental physics concepts across all major topics.',
      category: 'competition',
      icon: FiBook
    },
    {
      id: '15',
      question: 'What physics topics should I study?',
      answer: 'The competition covers all major high school and early undergraduate physics topics including mechanics, thermodynamics, electromagnetism, optics, waves, and modern physics. Problems range from basic concepts to advanced applications requiring analytical thinking.',
      category: 'competition',
      icon: HiOutlineAcademicCap
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
              Everything you need to know about the{' '}
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              4-hour physics competition
            </span>
            <span className="text-phiga-light/90">
              {' '}and how to participate
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