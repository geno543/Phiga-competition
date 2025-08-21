import React, { useEffect, useState } from 'react';
import { 
  FiTarget, 
  FiEye, 
  FiUsers, 
  FiGlobe, 
  FiAward,
  FiHeart,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiBook,
  FiMonitor,
  FiPlay
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineRocketLaunch } from 'react-icons/hi2';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const competitionStats = [
    { icon: FiClock, label: '4 Hours', description: 'Competition Duration' },
    { icon: FiBook, label: '30 Problems', description: 'Progressive Challenges' },
    { icon: FiGlobe, label: 'Global', description: 'Online Platform' },
    { icon: FiCalendar, label: 'Annual', description: 'Competition Schedule' }
  ];

  const values = [
    {
      icon: FiTarget,
      title: 'Fair Competition',
      description: 'Individual achievement through strict anti-cheating measures, transparent scoring systems, and real-time monitoring to ensure genuine problem-solving skills are rewarded.',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiAward,
      title: 'Educational Excellence',
      description: 'High-quality physics problems that challenge students progressively while maintaining educational value, real-world relevance, and scientific accuracy.',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiGlobe,
      title: 'Global Accessibility',
      description: 'Making competitive physics education accessible to high school and undergraduate students worldwide through our free, multilingual online platform with 24/7 availability.',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: FiShield,
      title: 'Innovation in Learning',
      description: 'Pioneering gamified physics education through immersive video storylines, interactive simulations, and cutting-edge technology that makes complex concepts engaging.',
      color: 'red',
      gradient: 'from-red-500 to-rose-500'
    }
  ];

  const features = [
    {
      icon: FiPlay,
      title: 'Video-Based Learning',
      description: 'Each problem is presented through engaging video scenarios that bring physics to life'
    },
    {
      icon: FiTrendingUp,
      title: 'Progressive Difficulty',
      description: 'Problems increase in complexity as you advance through the 30 stages'
    },
    {
      icon: FiMonitor,
      title: 'Real-Time Tracking',
      description: 'Monitor your progress and compare with participants worldwide'
    },
    {
      icon: FiUsers,
      title: 'Individual Competition',
      description: 'Compete independently while being part of a global physics community'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-phiga-main via-phiga-accent to-phiga-dark dark:from-gray-900 dark:via-gray-800 dark:to-black text-white py-24 md:py-32 overflow-hidden" data-section="hero">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-phiga-light/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-phiga-accent/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-8 hover:bg-white/15 transition-all duration-300">
            <HiOutlineAcademicCap className="text-phiga-accent" size={24} />
            <span className="text-white font-semibold">International Physics Competition</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-light to-white bg-clip-text text-transparent">
              About PHIGA
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mb-12 text-white/90">
            The premier international online physics competition empowering 
            <span className="text-phiga-light font-semibold"> high school and undergraduate students </span>
            through innovative gamified learning experiences
          </p>
          
          {/* Competition Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {competitionStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <stat.icon className="text-phiga-accent mx-auto mb-3" size={32} />
                <div className="text-2xl font-bold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-white/70">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Quantastra Section */}
      <section className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-800 transition-colors duration-300" data-section="mission">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-2 shadow-lg">
              {['mission', 'vision', 'quantastra'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-phiga-main text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-phiga-accent/20 rounded-2xl">
                      <FiTarget className="text-phiga-accent" size={48} />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Our Mission
                      </h2>
                      <div className="w-24 h-1 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    To <span className="text-phiga-accent font-bold">revolutionize physics education</span> by creating an engaging, competitive, and accessible online learning experience that challenges high school and undergraduate students worldwide to explore physics through gamified problem-solving.
                  </p>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    PHIGA transforms traditional physics education into an exciting 4-hour journey where students solve 30 progressive problems through immersive video-based storylines. We believe physics should be <span className="text-phiga-main dark:text-phiga-accent font-semibold">challenging, innovative, and accessible</span> to every high school and undergraduate student globally.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                        <feature.icon className="text-phiga-accent mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-phiga-main to-phiga-accent rounded-3xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6">Competition Format</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-phiga-light" size={20} />
                        <span>Individual 4-hour online competition</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-phiga-light" size={20} />
                        <span>30 progressive physics problems</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-phiga-light" size={20} />
                        <span>Gamified video storyline format</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-phiga-light" size={20} />
                        <span>Real-time progress tracking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-phiga-light" size={20} />
                        <span>Anti-cheating measures</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-6">Global Impact Goals</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-blue-200" size={20} />
                        <span>International physics community building</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-blue-200" size={20} />
                        <span>Next-generation scientists & innovators</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-blue-200" size={20} />
                        <span>Quality physics education access</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-blue-200" size={20} />
                        <span>Cross-cultural scientific collaboration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiCheckCircle className="text-blue-200" size={20} />
                        <span>STEM career inspiration</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-500/20 rounded-2xl">
                      <FiEye className="text-blue-600 dark:text-blue-400" size={48} />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Our Vision
                      </h2>
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    To become the <span className="text-blue-600 dark:text-blue-400 font-bold">premier international platform</span> for high school physics competitions, inspiring the next generation of scientists, engineers, and innovators through innovative online learning experiences.
                  </p>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    We envision a world where every high school student has access to <span className="text-purple-600 dark:text-purple-400 font-semibold">high-quality physics education and competition</span> opportunities, fostering critical thinking, problem-solving skills, and a deep appreciation for the physical sciences.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {features.slice(2, 4).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                        <feature.icon className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quantastra' && (
              <div className="text-center max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12 text-white mb-12">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FiPlay className="text-white" size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    About Quantastra
                  </h2>
                  <p className="text-xl leading-relaxed mb-8">
                    Quantastra is an innovative physics education channel that explains complex physics concepts through easy-to-understand animations and visual storytelling. As the creator behind PHIGA, Quantastra brings years of experience in making physics accessible and engaging for students worldwide.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Educational Mission</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Simplified physics explanations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Engaging animated content</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Visual learning approach</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Accessible content for all levels</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Creating PHIGA</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Applied educational expertise</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Gamified learning approach</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>International competition platform</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-orange-200 mt-1" size={18} />
                          <span>Expanded global reach</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-orange-600 dark:text-orange-400">Quantastra's innovative approach</span> to physics education through gamification and storytelling became the foundation for PHIGA's comprehensive competition platform. Today, PHIGA continues Quantastra's mission while offering enhanced features, improved accessibility, and a more robust educational framework for high school students worldwide.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-gray-900 transition-colors duration-300" data-section="values">
        <div className="container mx-auto px-4">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-phiga-accent/10 to-phiga-main/10 rounded-full border border-phiga-accent/20 mb-8">
              <FiHeart className="text-phiga-accent" size={20} />
              <span className="font-semibold text-gray-900 dark:text-white">Our Core Values</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-phiga-main to-phiga-accent dark:from-white dark:via-phiga-light dark:to-phiga-accent bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The fundamental principles that drive excellence in physics education and shape every aspect of the PHIGA experience
            </p>
          </div>
          
          {/* Enhanced Values Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`p-5 rounded-2xl bg-gradient-to-br ${value.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-white" size={40} />
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {value.title}
                        </h3>
                        <div className={`w-16 h-1 bg-gradient-to-r ${value.gradient} rounded-full`}></div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className={`flex items-center gap-2 text-${value.color}`}>
                        <FiZap size={16} />
                        <span className="text-sm font-semibold">Core Value</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-phiga-main via-phiga-accent to-phiga-dark dark:from-gray-900 dark:via-gray-800 dark:to-black text-white overflow-hidden" data-section="cta">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-phiga-light/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-phiga-accent/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-12 hover:bg-white/15 transition-all duration-300">
              <FiZap className="text-yellow-400 animate-pulse" size={24} />
              <span className="text-white font-bold text-lg">Join the Elite Physics Competition</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
            
            {/* Enhanced Rocket Icon */}
            <div className="relative mx-auto mb-12">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-lg border border-white/20">
                <HiOutlineRocketLaunch className="text-6xl animate-bounce" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
            
            {/* Enhanced Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-phiga-light to-yellow-200 bg-clip-text text-transparent">
                Ready to Challenge Yourself?
              </span>
            </h2>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mb-12 text-white/90">
              Join thousands of high school students from around the world in the most
              <span className="text-yellow-200 font-bold"> innovative physics competition </span>
              ever created. Test your skills, expand your knowledge, and become part of the future of science.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group relative bg-white text-phiga-main px-12 py-6 rounded-2xl font-bold text-xl hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden">
                {/* Button Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-yellow-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center gap-3">
                  <FiZap className="group-hover:rotate-12 transition-transform duration-300" size={24} />
                  Register for PHIGA 2025
                  <FiTrendingUp className="group-hover:scale-125 transition-transform duration-300" size={20} />
                </span>
              </button>
              
              <button className="group bg-transparent border-2 border-white/30 text-white px-8 py-6 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-3">
                <FiBook size={20} />
                Learn More About Competition
                <div className="w-0 group-hover:w-6 h-0.5 bg-white rounded-full transition-all duration-300"></div>
              </button>
            </div>
            
            {/* Enhanced Features */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FiShield className="text-green-400" size={20} />
                </div>
                <span className="font-medium">100% Free Registration</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FiCheckCircle className="text-blue-400" size={20} />
                </div>
                <span className="font-medium">Instant Platform Access</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FiGlobe className="text-purple-400" size={20} />
                </div>
                <span className="font-medium">Global Competition</span>
              </div>
            </div>
            
            {/* Competition Details */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-8">Competition Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-200 mb-2">Annual</div>
                  <div className="text-white/70">Competition Schedule</div>
                  <div className="text-sm text-white/50 mt-1">Stay tuned for dates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-200 mb-2">4 Hours</div>
                  <div className="text-white/70">Competition Duration</div>
                  <div className="text-sm text-white/50 mt-1">Intensive challenge</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-200 mb-2">FREE</div>
                  <div className="text-white/70">Registration</div>
                  <div className="text-sm text-white/50 mt-1">No hidden costs</div>
                </div>
              </div>
              
              {/* Registration Info */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center justify-center gap-4 text-center">
                  <FiCalendar className="text-phiga-light" size={24} />
                  <div>
                    <div className="text-lg font-semibold text-white">Registration</div>
                    <div className="text-white/70">Opens before each competition</div>
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

export default About;