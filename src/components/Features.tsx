import React, { useEffect, useState } from 'react';
import { 
  FiClock, 
  FiTrendingUp, 
  FiUnlock, 
  FiTool, 
  FiDollarSign, 
  FiAward, 
  FiHeart,
  FiUserPlus,
  FiPlay,
  FiTarget,
  FiBarChart,
  FiShield,
  FiZap,
  FiStar,
  FiUsers,
  FiGlobe,
  FiLayers,
  FiActivity,
  FiCheckCircle
} from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi2';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const competitionFacts = [
    {
      category: 'Duration',
      detail: '4 hours of intense physics problem-solving',
      icon: FiClock,
      color: 'text-blue-500',
      bgColor: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/30'
    },
    {
      category: 'Problems',
      detail: '30 sequential video-driven physics challenges',
      icon: FiPlay,
      color: 'text-green-500',
      bgColor: 'from-green-500/20 to-green-600/10',
      borderColor: 'border-green-500/30'
    },
    {
      category: 'Scoring',
      detail: 'Points decrease with each attempt, encouraging precision',
      icon: FiTrendingUp,
      color: 'text-orange-500',
      bgColor: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-500/30'
    },
    {
      category: 'Progression',
      detail: 'Sequential unlock system - solve to advance',
      icon: FiUnlock,
      color: 'text-purple-500',
      bgColor: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30'
    },
    {
      category: 'Allowed Tools',
      detail: 'Calculators, internet search (no AI/code assistance)',
      icon: FiTool,
      color: 'text-indigo-500',
      bgColor: 'from-indigo-500/20 to-indigo-600/10',
      borderColor: 'border-indigo-500/30'
    },
    {
      category: 'Cost',
      detail: 'Completely FREE for all participants worldwide',
      icon: FiDollarSign,
      color: 'text-emerald-500',
      bgColor: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      category: 'Recognition',
      detail: 'Digital certificates and badges for achievements',
      icon: FiAward,
      color: 'text-yellow-500',
      bgColor: 'from-yellow-500/20 to-yellow-600/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      category: 'Accessibility',
      detail: 'WCAG AA-compliant, screen-reader-friendly, color-accessible design',
      icon: FiHeart,
      color: 'text-pink-500',
      bgColor: 'from-pink-500/20 to-pink-600/10',
      borderColor: 'border-pink-500/30'
    }
  ];

  const howItWorks = [
    {
      step: '1. Registration',
      title: 'Create Your Account',
      description: 'Create an account and secure your place. You\'ll receive a unique password shortly before the event.',
      icon: FiUserPlus,
      color: 'bg-blue-500'
    },
    {
      step: '2. Game On',
      title: 'Watch & Solve',
      description: 'Log in, watch a short scenario video, then tackle the connected physics problem.',
      icon: FiPlay,
      color: 'bg-purple-500'
    },
    {
      step: '3. Level Up',
      title: 'Progress Forward',
      description: 'Solve the problem to progress to the next scenario. Each correct answer propels you further!',
      icon: FiTarget,
      color: 'bg-green-500'
    },
    {
      step: '4. Scoring',
      title: 'Earn Points',
      description: 'Maximum 5 points if solved on the first try; points decrease with each incorrect attempt (down to a minimum of 1).',
      icon: FiTrendingUp,
      color: 'bg-yellow-500'
    },
    {
      step: '5. Live Leaderboard',
      title: 'Track Progress',
      description: 'Track your progress and rivals\' positions — live scoreboard visible except during the last 20 minutes.',
      icon: FiBarChart,
      color: 'bg-indigo-500'
    },
    {
      step: '6. Fair Play',
      title: 'Maintain Integrity',
      description: 'Strict anti-cheating policies, browser detection, and logging keep PHIGA honest.',
      icon: FiShield,
      color: 'bg-red-500'
    }
  ];

  return (
    <div id="features-section" className="relative bg-gradient-to-b from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 rounded-full blur-xl animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-r from-phiga-main/15 to-phiga-accent/20 rounded-full blur-2xl animate-pulse-slow opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-phiga-accent/25 to-white/20 rounded-full blur-lg animate-bounce-slow opacity-70"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-white/20 to-phiga-accent/25 rounded-full blur-xl animate-float opacity-65"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.08)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40 animate-pulse"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-phiga-accent/3 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(4,191,157,0.05)_50%,transparent_100%)]"></div>
      </div>
      {/* Competition Facts */}
      <section className="relative py-24 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <div className="group inline-flex items-center gap-4 bg-gradient-to-r from-phiga-accent/20 via-phiga-light/15 to-phiga-accent/20 backdrop-blur-lg border border-phiga-accent/40 rounded-full px-10 py-4 mb-10 animate-fade-in shadow-2xl hover:shadow-phiga-accent/20 transition-all duration-500 hover:scale-110 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full shadow-lg group-hover:rotate-180 transition-transform duration-500">
                <FiZap className="text-white text-lg" />
              </div>
              <span className="text-phiga-main dark:text-white font-bold text-lg tracking-wide">Competition Overview</span>
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 text-sm animate-pulse" />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black text-phiga-main dark:text-white mb-8 animate-fade-in leading-none">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-main bg-clip-text text-transparent drop-shadow-2xl">
                  Quick Facts
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-phiga-main/20 blur-3xl -z-10 animate-pulse"></div>
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-phiga-gray-600 dark:text-phiga-gray-300 max-w-5xl mx-auto leading-relaxed font-medium animate-slide-up">
              Everything you need to know about the world's most <span className="text-phiga-accent font-bold">exciting physics competition</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {competitionFacts.map((fact, index) => {
              const IconComponent = fact.icon;
              return (
                <div 
                  key={index}
                  className={`group relative bg-gradient-to-br ${fact.bgColor} backdrop-blur-xl rounded-3xl p-10 border-2 ${fact.borderColor} hover:shadow-[0_0_40px_rgba(4,191,157,0.3)] transition-all duration-700 hover:scale-110 hover:-translate-y-6 overflow-hidden cursor-pointer`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.6s ease-out'
                  }}
                >
                  {/* Enhanced Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Floating Icon Background */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <IconComponent size={80} className={fact.color} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className={`p-5 rounded-3xl bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm ${fact.color} shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                        <IconComponent size={32} />
                      </div>
                    </div>
                    <h3 className="font-heading font-black text-2xl text-phiga-main dark:text-white mb-4 group-hover:text-phiga-accent transition-colors duration-300 leading-tight">
                      {fact.category}
                    </h3>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed text-lg group-hover:text-phiga-gray-700 dark:group-hover:text-phiga-gray-200 transition-colors duration-300">
                      {fact.detail}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-6 w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${fact.bgColor.replace('/20', '/60').replace('/10', '/40')} transition-all duration-1000 ${activeCard === index ? 'w-full' : 'w-1/3'}`}
                      ></div>
                    </div>
                    
                    {/* Check Icon */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <FiCheckCircle className={`${fact.color} text-2xl`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How PHIGA Works */}
      <section className="relative py-24 lg:py-40 bg-gradient-to-br from-phiga-light via-white to-phiga-light/50 dark:from-phiga-gray-800 dark:via-phiga-gray-900 dark:to-phiga-gray-800 overflow-hidden">
        {/* Section Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-r from-phiga-accent/15 to-phiga-main/10 rounded-full blur-3xl animate-pulse-slow opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/15 rounded-full blur-3xl animate-float opacity-50"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="group inline-flex items-center gap-4 bg-gradient-to-r from-phiga-main/20 via-phiga-accent/15 to-phiga-main/20 backdrop-blur-lg border border-phiga-main/40 rounded-full px-10 py-4 mb-10 animate-fade-in shadow-2xl hover:shadow-phiga-main/20 transition-all duration-500 hover:scale-110 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="p-2 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full shadow-lg group-hover:rotate-180 transition-transform duration-500">
                <FiLayers className="text-white text-lg" />
              </div>
              <span className="text-phiga-main dark:text-white font-bold text-lg tracking-wide">Step-by-Step Guide</span>
              <div className="flex items-center gap-1">
                <FiActivity className="text-phiga-accent text-lg animate-pulse" />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black text-phiga-main dark:text-white mb-8 animate-fade-in leading-none">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-main bg-clip-text text-transparent drop-shadow-2xl">
                  How PHIGA Works
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-phiga-main/20 to-phiga-accent/20 blur-3xl -z-10 animate-pulse"></div>
              </span>
            </h2>
            <p className="text-2xl md:text-3xl text-phiga-gray-600 dark:text-phiga-gray-300 max-w-5xl mx-auto leading-relaxed font-medium animate-slide-up">
              Your journey from <span className="text-phiga-main font-bold">registration</span> to <span className="text-phiga-accent font-bold">victory</span> in six simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {howItWorks.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white via-white/95 to-white/90 dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 rounded-3xl p-10 shadow-2xl hover:shadow-[0_0_50px_rgba(4,191,157,0.2)] transition-all duration-700 transform hover:-translate-y-8 hover:scale-105 border-2 border-white/50 dark:border-phiga-gray-700/50 hover:border-phiga-accent/40 overflow-hidden cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.9)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s ease-out'
                  }}
                >
                  {/* Enhanced Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-phiga-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200"></div>
                  
                  {/* Floating Background Icon */}
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <IconComponent size={120} className="text-phiga-accent" />
                  </div>
                  
                  {/* Enhanced Step Number */}
                  <div className="absolute -top-6 left-8">
                    <div className={`${item.color} text-white px-6 py-3 rounded-2xl text-lg font-black shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-4 border-white/30`}>
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Enhanced Icon */}
                  <div className="flex justify-center mb-8 mt-8">
                    <div className={`${item.color} p-6 rounded-3xl text-white shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative`}>
                      <IconComponent size={40} />
                      <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="text-center relative z-10">
                    <h3 className="font-heading font-black text-2xl text-phiga-main dark:text-white mb-4 group-hover:text-phiga-accent transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed text-lg group-hover:text-phiga-gray-700 dark:group-hover:text-phiga-gray-200 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="mt-6 flex justify-center">
                      <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-').replace('-500', '-600')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left`}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Connecting Line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-5 w-10 h-1 bg-gradient-to-r from-phiga-accent to-phiga-main transform -translate-y-1/2 z-10 opacity-60">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-6 border-l-phiga-accent border-t-3 border-b-3 border-t-transparent border-b-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent to-phiga-main animate-pulse"></div>
                    </div>
                  )}
                  
                  {/* Success Indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <FiCheckCircle className="text-green-500 text-2xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-phiga-main/10 border border-phiga-main/20 rounded-full px-6 py-2 mb-6">
                <FiStar className="text-phiga-main" />
                <span className="text-phiga-main dark:text-phiga-accent font-medium">Key Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-phiga-main dark:text-white mb-6">
                <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-main bg-clip-text text-transparent">
                  Why Choose PHIGA?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="group relative bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm text-blue-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                        <FiUsers size={32} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-phiga-main dark:text-white group-hover:text-blue-500 transition-colors duration-300">
                        Global Community
                      </h3>
                    </div>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed mb-6 text-lg">
                      Join thousands of physics enthusiasts from around the world in this international competition.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-blue-500/10 mr-3 group-hover/item:bg-blue-500/20 transition-colors duration-300">
                          <FiGlobe className="text-blue-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Open to all skill levels worldwide</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-blue-500/10 mr-3 group-hover/item:bg-blue-500/20 transition-colors duration-300">
                          <FiTarget className="text-blue-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Real-time global leaderboard</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-blue-500/10 mr-3 group-hover/item:bg-blue-500/20 transition-colors duration-300">
                          <FiHeart className="text-blue-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Supportive physics community</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-green-500/10 via-green-600/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-2xl bg-green-500/20 backdrop-blur-sm text-green-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                        <FiBarChart size={32} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-phiga-main dark:text-white group-hover:text-green-500 transition-colors duration-300">
                        Smart Analytics
                      </h3>
                    </div>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed mb-6 text-lg">
                      Track your progress with detailed analytics and performance insights.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-green-500/10 mr-3 group-hover/item:bg-green-500/20 transition-colors duration-300">
                          <FiTrendingUp className="text-green-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Detailed solution breakdowns</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-green-500/10 mr-3 group-hover/item:bg-green-500/20 transition-colors duration-300">
                          <FiClock className="text-green-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Time-based performance metrics</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-green-500/10 mr-3 group-hover/item:bg-green-500/20 transition-colors duration-300">
                          <FiTarget className="text-green-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Comparative analysis with peers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="group relative bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-2xl bg-purple-500/20 backdrop-blur-sm text-purple-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                        <HiOutlineLightBulb size={32} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-phiga-main dark:text-white group-hover:text-purple-500 transition-colors duration-300">
                        Interactive Learning
                      </h3>
                    </div>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed mb-6 text-lg">
                      Experience physics through engaging video scenarios and interactive problem-solving.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-purple-500/10 mr-3 group-hover/item:bg-purple-500/20 transition-colors duration-300">
                          <FiPlay className="text-purple-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Video-based problem scenarios</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-purple-500/10 mr-3 group-hover/item:bg-purple-500/20 transition-colors duration-300">
                          <FiUnlock className="text-purple-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Progressive difficulty levels</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-purple-500/10 mr-3 group-hover/item:bg-purple-500/20 transition-colors duration-300">
                          <FiZap className="text-purple-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Immediate feedback system</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-4 rounded-2xl bg-orange-500/20 backdrop-blur-sm text-orange-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                        <FiShield size={32} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-phiga-main dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                        Fair & Secure
                      </h3>
                    </div>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed mb-6 text-lg">
                      Ensuring a fair and secure competition environment for all participants.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-orange-500/10 mr-3 group-hover/item:bg-orange-500/20 transition-colors duration-300">
                          <FiShield className="text-orange-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Advanced anti-cheating measures</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-orange-500/10 mr-3 group-hover/item:bg-orange-500/20 transition-colors duration-300">
                          <FiTool className="text-orange-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Secure submission system</span>
                      </div>
                      <div className="flex items-center group/item">
                        <div className="p-2 rounded-lg bg-orange-500/10 mr-3 group-hover/item:bg-orange-500/20 transition-colors duration-300">
                          <FiAward className="text-orange-500" size={16} />
                        </div>
                        <span className="text-phiga-gray-600 dark:text-phiga-gray-300">Transparent scoring algorithm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;