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
  FiGlobe
} from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi2';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    // {
    //   category: 'Progression',
    //   detail: 'Sequential unlock system - solve to advance',
    //   icon: FiUnlock,
    //   color: 'text-purple-500',
    //   bgColor: 'from-purple-500/20 to-purple-600/10',
    //   borderColor: 'border-purple-500/30'
    // },
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
      description: 'Track your progress and rivals\' positions — live scoreboard visible except during the last 30 minutes.',
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
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-phiga-accent/10 text-phiga-accent text-sm font-medium rounded-full mb-4">
              Competition details
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Facts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about the physics competition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {competitionFacts.map((fact, index) => {
              const IconComponent = fact.icon;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-phiga-accent/30 hover:shadow-md transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.5s ease-out'
                  }}
                >
                  <div className={`inline-flex p-3 ${fact.color.replace('text-', 'bg-').replace('-500', '-50')} ${fact.color} rounded-lg mb-4`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {fact.category}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How PHIGA Works */}
      <section className="relative py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          {/* Clean Header Section */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-phiga-accent/10 text-phiga-accent text-sm font-medium rounded-full mb-4">
              How it works
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Competition Journey
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From registration to victory in six straightforward steps
            </p>
          </div>
          
          {/* Steps Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {howItWorks.map((item, index) => {
                const IconComponent = item.icon;
                  
                return (
                  <div 
                    key={index}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.5s ease-out'
                    }}
                  >
                    {/* Simple Card Design */}
                    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-phiga-accent/30 hover:shadow-lg transition-all duration-300">
                      
                      {/* Step Number */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-semibold text-lg`}>
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          Step {index + 1}
                        </span>
                      </div>
                      
                      {/* Icon */}
                      <div className="mb-4">
                        <div className={`inline-flex p-3 ${item.color.replace('bg-', 'bg-').replace('-500', '-50')} ${item.color.replace('bg-', 'text-').replace('-500', '-600')} rounded-lg`}>
                          <IconComponent size={24} />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Bottom indicator */}
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1">
                            <div 
                              className={`h-1 ${item.color} rounded-full transition-all duration-500 group-hover:w-full`}
                              style={{ width: `${(index + 1) * 16.67}%` }}
                            ></div>
                          </div>
                          <span className="ml-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                            {Math.round((index + 1) * 16.67)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simple Call to Action */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg px-6 py-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-phiga-accent rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Ready to participate?</span>
                </div>
                <div className="text-phiga-accent font-semibold">Join the competition</div>
              </div>
            </div>
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