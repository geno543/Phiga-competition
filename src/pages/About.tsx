import React, { useEffect, useState } from 'react';
import { 
  FiTarget, 
  FiEye, 
  FiUsers, 
  FiGlobe, 
  FiAward,
  FiHeart,
  FiStar,
  FiZap,
  FiActivity,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineRocketLaunch } from 'react-icons/hi2';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setActiveSection(entry.target.getAttribute('data-section'));
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

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Competition Director',
      description: 'Physics Professor with 15+ years in educational technology',
      avatar: '👩‍🔬'
    },
    {
      name: 'Prof. Ahmed Hassan',
      role: 'Problem Designer',
      description: 'International Physics Olympiad coordinator',
      avatar: '👨‍🏫'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Technical Lead',
      description: 'Full-stack developer specializing in educational platforms',
      avatar: '👩‍💻'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Educational Consultant',
      description: 'Curriculum specialist in STEM education',
      avatar: '👨‍🎓'
    }
  ];

  const values = [
    {
      icon: FiGlobe,
      title: 'Global Accessibility',
      description: 'Making physics education accessible to students worldwide, regardless of their location or background.',
      color: 'text-blue-500'
    },
    {
      icon: FiAward,
      title: 'Excellence in Education',
      description: 'Promoting the highest standards in physics education through innovative and challenging problems.',
      color: 'text-green-500'
    },
    {
      icon: FiUsers,
      title: 'Community Building',
      description: 'Creating a global community of physics enthusiasts who inspire and learn from each other.',
      color: 'text-purple-500'
    },
    {
      icon: FiHeart,
      title: 'Passion for Physics',
      description: 'Fostering a deep love and appreciation for the beauty and wonder of physics.',
      color: 'text-red-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-phiga-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-phiga-main via-phiga-dark to-black dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-black text-white py-24 md:py-32 overflow-hidden" data-section="hero">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 rounded-full blur-2xl animate-pulse-slow opacity-40"></div>
          <div className="absolute top-1/3 right-20 w-60 h-60 bg-gradient-to-r from-phiga-light/15 to-phiga-accent/20 rounded-full blur-3xl animate-float opacity-30"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-gradient-to-r from-phiga-accent/25 to-white/20 rounded-full blur-xl animate-bounce-slow opacity-50"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-white/20 to-phiga-accent/25 rounded-full blur-2xl animate-pulse-slow opacity-35"></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,247,244,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(232,247,244,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 animate-pulse"></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-phiga-accent/5 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,191,157,0.1)_50%,transparent_100%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8 group hover:scale-105 transition-all duration-500">
            <HiOutlineAcademicCap className="text-phiga-accent animate-pulse" size={24} />
            <span className="text-white font-semibold">About Our Mission</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
              About PHIGA
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            <span className="text-phiga-light/90">
              Empowering the next generation of 
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              physicists
            </span>
            <span className="text-phiga-light/90">
              {' '}through innovative, gamified learning experiences
            </span>
          </p>
          
          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition-all duration-500">
              <FiUsers className="text-phiga-accent group-hover:scale-110 transition-transform duration-300" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-phiga-light/70 text-sm">Students</div>
              </div>
            </div>
            <div className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition-all duration-500">
              <FiGlobe className="text-phiga-accent group-hover:scale-110 transition-transform duration-300" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-phiga-light/70 text-sm">Countries</div>
              </div>
            </div>
            <div className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:scale-105 transition-all duration-500">
              <FiAward className="text-phiga-accent group-hover:scale-110 transition-transform duration-300" size={24} />
              <div>
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-phiga-light/70 text-sm">Problems Solved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden" data-section="mission">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Enhanced Mission */}
            <div className="group text-center lg:text-left" style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out'
            }}>
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative p-6 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 backdrop-blur-lg rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <FiTarget className="text-phiga-accent" size={48} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="relative mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-phiga-main dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                    Our Mission
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full mx-auto lg:mx-0"></div>
                <FiZap className="absolute -top-4 -right-4 text-phiga-accent/50 animate-pulse" size={24} />
              </div>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed font-medium">
                  To <span className="text-phiga-accent font-bold">revolutionize physics education</span> by creating engaging, competitive, and accessible learning experiences that inspire high school students worldwide to explore the fascinating world of physics.
                </p>
                <p className="text-lg md:text-xl text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                  We believe that physics should be <span className="text-phiga-main dark:text-phiga-accent font-semibold">exciting, challenging, and fun</span>. Through PHIGA, we're building a global community where students can test their knowledge, learn from each other, and develop a lifelong passion for scientific discovery.
                </p>
              </div>
              
              {/* Mission Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Engaging video-based problems</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Real-time competitive scoring</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Global accessibility</span>
                </div>
              </div>
            </div>

            {/* Enhanced Vision */}
            <div className="group text-center lg:text-left" style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.2s'
            }}>
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="relative p-6 bg-gradient-to-r from-phiga-main/20 to-phiga-accent/15 backdrop-blur-lg rounded-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <FiEye className="text-phiga-main dark:text-phiga-accent" size={48} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="relative mb-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-phiga-main dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                    Our Vision
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full mx-auto lg:mx-0"></div>
                <FiActivity className="absolute -top-4 -right-4 text-phiga-main/50 dark:text-phiga-accent/50 animate-pulse" size={24} />
              </div>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed font-medium">
                  To become the <span className="text-phiga-main dark:text-phiga-accent font-bold">world's premier platform</span> for physics education and competition, fostering a new generation of scientists, engineers, and innovators who will shape our future.
                </p>
                <p className="text-lg md:text-xl text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                  We envision a world where every student has the opportunity to explore physics in an <span className="text-phiga-accent font-semibold">engaging, supportive, and competitive environment</span>, regardless of their geographical location or educational background.
                </p>
              </div>
              
              {/* Vision Goals */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Global physics community</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Future scientists & innovators</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <FiCheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                  <span className="text-phiga-gray-600 dark:text-phiga-gray-300 font-medium">Educational equality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-phiga-light/50 via-white to-phiga-light/30 dark:from-phiga-gray-800 dark:via-phiga-gray-900 dark:to-phiga-gray-800 overflow-hidden" data-section="values">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20" style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-phiga-accent/15 to-phiga-light/10 backdrop-blur-xl rounded-full border border-phiga-accent/20 mb-8 group hover:scale-105 transition-all duration-500">
              <FiHeart className="text-phiga-accent animate-pulse" size={20} />
              <span className="text-phiga-main dark:text-white font-semibold">Our Core Values</span>
              <div className="flex gap-1">
                <FiStar className="text-yellow-400 text-sm animate-pulse" />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-phiga-main dark:text-white mb-6">
              <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              The <span className="text-phiga-accent font-bold">principles</span> that guide everything we do at PHIGA
            </p>
          </div>
          
          {/* Enhanced Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white/80 dark:bg-phiga-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden"
                  style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-phiga-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  {/* Icon Section */}
                  <div className="relative z-10 flex items-center mb-8">
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-r from-${value.color.split('-')[1]}-500/20 to-${value.color.split('-')[1]}-400/10 backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mr-6`}>
                      <IconComponent className={`${value.color} group-hover:scale-110 transition-transform duration-300`} size={40} />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${value.color.split('-')[1]}-400 rounded-full animate-ping opacity-75`}></div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${value.color.split('-')[1]}-400 rounded-full`}></div>
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-black text-2xl lg:text-3xl text-phiga-main dark:text-white mb-2 group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                        {value.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full group-hover:w-20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="relative z-10 text-lg lg:text-xl text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed font-medium group-hover:text-phiga-gray-700 dark:group-hover:text-phiga-gray-200 transition-colors duration-300">
                    {value.description}
                  </p>
                  
                  {/* Hover Indicator */}
                  <div className="relative z-10 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-phiga-accent">
                      <FiZap size={16} className="animate-pulse" />
                      <span className="text-sm font-semibold">Core Value</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Team */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/20 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden" data-section="team">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20" style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-phiga-accent/15 to-phiga-light/10 backdrop-blur-xl rounded-full border border-phiga-accent/20 mb-8 group hover:scale-105 transition-all duration-500">
              <FiUsers className="text-phiga-accent animate-pulse" size={20} />
              <span className="text-phiga-main dark:text-white font-semibold">Our Expert Team</span>
              <div className="flex gap-1">
                <FiStar className="text-yellow-400 text-sm animate-pulse" />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-phiga-main dark:text-white mb-6">
              <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              The <span className="text-phiga-accent font-bold">passionate educators</span> and technologists behind PHIGA
            </p>
          </div>
          
          {/* Enhanced Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group relative bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden text-center"
                style={{
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.8s ease-out ${index * 0.2}s`
                }}
              >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-phiga-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                {/* Floating Background Icon */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <FiStar size={40} className="text-phiga-accent" />
                </div>
                
                <div className="relative z-10">
                  {/* Enhanced Avatar */}
                  <div className="relative mx-auto mb-6">
                    <div className="text-7xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {member.avatar}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                      <FiCheckCircle className="text-white" size={12} />
                    </div>
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-phiga-accent/30 animate-ping group-hover:border-phiga-accent/50"></div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <h3 className="font-heading font-black text-xl lg:text-2xl text-phiga-main dark:text-white mb-3 group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-phiga-accent rounded-full animate-pulse"></div>
                    <p className="text-phiga-accent font-semibold">
                      {member.role}
                    </p>
                    <div className="w-2 h-2 bg-phiga-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  <p className="text-phiga-gray-600 dark:text-phiga-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-6 h-1 bg-phiga-gray-200 dark:bg-phiga-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-phiga-main via-phiga-accent to-phiga-dark text-white overflow-hidden" data-section="cta">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-bounce-slow"></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 animate-pulse"></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-xl rounded-full border border-white/20 mb-8 group hover:scale-105 transition-all duration-500">
              <FiZap className="text-yellow-400 animate-pulse" size={24} />
              <span className="text-white font-semibold">Join the Elite</span>
              <div className="flex gap-1">
                <FiStar className="text-yellow-400 text-sm animate-pulse" />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
                <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
            
            {/* Enhanced Rocket Icon */}
            <div className="relative mx-auto mb-8">
              <HiOutlineRocketLaunch className="text-8xl mx-auto animate-bounce-slow group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-white/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
            
            {/* Enhanced Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-8">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Ready to Join the Physics Adventure?
              </span>
            </h2>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed font-medium mb-12 text-white/90">
              Be part of the 
              <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent font-bold">
                global physics community
              </span>
              {' '}and challenge yourself with the most exciting physics competition ever created.
            </p>
            
            {/* Enhanced CTA Button */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button className="group relative bg-white text-phiga-main px-12 py-6 rounded-2xl font-bold text-xl hover:bg-yellow-50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-3xl overflow-hidden">
                {/* Button Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-yellow-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center gap-3">
                  <FiZap className="group-hover:rotate-12 transition-transform duration-300" size={24} />
                  Register for PHIGA
                  <FiActivity className="group-hover:scale-125 transition-transform duration-300" size={20} />
                </span>
              </button>
              
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <FiShield className="text-green-400" size={20} />
                  <span className="text-sm font-medium">100% Free</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" size={20} />
                  <span className="text-sm font-medium">Instant Access</span>
                </div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-sm text-white/70">Students Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">150+</div>
                <div className="text-sm text-white/70">Competitions Held</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-sm text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;