import React, { useEffect, useState } from 'react';
import {
  FiFileText,
  FiStar,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiAward,
  FiTarget,
  FiTrendingUp,
  FiAlertTriangle
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

const Rules: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const ruleCategories = [
    {
      id: 'general',
      title: 'General Rules',
      icon: FiFileText,
      color: 'text-blue-500',
      rules: [
        'All participants must be currently enrolled high school students',
        'Each student can only register one account per competition',
        'Fair play and academic integrity are strictly enforced',
        'Use of external help or collaboration during competitions is prohibited',
        'Respect for all participants and organizers is mandatory'
      ]
    },
    {
      id: 'competition',
      title: 'Competition Format',
      icon: FiAward,
      color: 'text-green-500',
      rules: [
        'Competitions consist of 10-15 physics problems of varying difficulty',
        'Each problem is presented as an interactive video scenario',
        'Time limits range from 2-10 minutes per problem depending on complexity',
        'Problems cover mechanics, thermodynamics, electromagnetism, optics, and modern physics',
        'Multiple choice, numerical, and conceptual questions are included'
      ]
    },
    {
      id: 'scoring',
      title: 'Scoring System',
      icon: FiTrendingUp,
      color: 'text-purple-500',
      rules: [
        'Base points: 100 points for correct answers, 0 for incorrect',
        'Speed bonus: Up to 50% extra points for quick correct answers',
        'Streak bonus: 10% additional points for consecutive correct answers',
        'Difficulty multiplier: Harder problems worth up to 2x base points',
        'Partial credit available for multi-part numerical problems'
      ]
    },
    {
      id: 'conduct',
      title: 'Code of Conduct',
      icon: FiShield,
      color: 'text-red-500',
      rules: [
        'Maintain respectful communication in all platform interactions',
        'Report any technical issues or suspected violations immediately',
        'No sharing of competition content during or after events',
        'Respect intellectual property rights of all materials',
        'Follow all local laws and school policies while participating'
      ]
    },
    {
      id: 'technical',
      title: 'Technical Requirements',
      icon: FiActivity,
      color: 'text-orange-500',
      rules: [
        'Stable internet connection with minimum 5 Mbps speed required',
        'Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)',
        'Screen resolution of at least 1024x768 pixels recommended',
        'JavaScript and cookies must be enabled',
        'Pop-up blockers should be disabled for the competition domain'
      ]
    }
  ];

  const importantNotes = [
    {
      icon: FiAlertTriangle,
      title: 'Disqualification',
      description: 'Violations of rules may result in immediate disqualification and ban from future competitions.',
      color: 'text-red-500'
    },
    {
      icon: FiClock,
      title: 'Time Zones',
      description: 'All competition times are displayed in your local time zone. Ensure you join at the correct time.',
      color: 'text-blue-500'
    },
    {
      icon: FiTarget,
      title: 'Appeals',
      description: 'Technical issues or scoring disputes must be reported within 24 hours of competition end.',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-phiga-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-phiga-main via-phiga-dark to-black dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-black text-white py-24 md:py-32 overflow-hidden" data-section="hero">
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
            <FiFileText className="text-phiga-accent animate-pulse" size={24} />
            <span className="text-white font-semibold">Competition Guidelines</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
              Competition Rules
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            <span className="text-phiga-light/90">
              Essential 
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              guidelines
            </span>
            <span className="text-phiga-light/90">
              {' '}for fair and competitive physics challenges
            </span>
          </p>
        </div>
      </section>

      {/* Rules Content */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Rules Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-20">
            {ruleCategories.map((category, index) => {
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.id}
                  className="group bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden"
                  style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-phiga-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  {/* Header */}
                  <div className="relative z-10 flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r from-${category.color.split('-')[1]}-500/20 to-${category.color.split('-')[1]}-400/10 backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <IconComponent className={`${category.color} group-hover:scale-110 transition-transform duration-300`} size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-heading font-black text-phiga-main dark:text-white group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                        {category.title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full group-hover:w-24 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Rules List */}
                  <div className="relative z-10 space-y-4">
                    {category.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className="flex items-start gap-3">
                        <FiCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                        <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Important Notes */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12" style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 1s'
            }}>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-phiga-main dark:text-white mb-4">
                <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                  Important Notes
                </span>
              </h2>
              <p className="text-xl text-phiga-gray-600 dark:text-phiga-gray-300">
                Key information every participant should know
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {importantNotes.map((note, index) => {
                const IconComponent = note.icon;
                
                return (
                  <div
                    key={index}
                    className="group bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 dark:border-phiga-gray-700/50"
                    style={{
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.8s ease-out ${1.2 + index * 0.1}s`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r from-${note.color.split('-')[1]}-500/20 to-${note.color.split('-')[1]}-400/10 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`${note.color}`} size={24} />
                      </div>
                      <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white">
                        {note.title}
                      </h4>
                    </div>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                      {note.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 backdrop-blur-xl rounded-2xl border border-phiga-accent/20">
              <HiOutlineAcademicCap className="text-phiga-accent animate-pulse" size={32} />
              <div>
                <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-1">
                  Questions about the rules?
                </h4>
                <p className="text-phiga-gray-600 dark:text-phiga-gray-300">
                  Contact our support team for clarification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;