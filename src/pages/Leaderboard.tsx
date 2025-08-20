import React, { useEffect } from 'react';
import {
  FiAward,
  FiStar,
  FiZap,
  FiUsers,
  FiTarget,
  FiClock,
  FiCalendar
} from 'react-icons/fi';

const Leaderboard: React.FC = () => {
  // Competition status - set to false to close leaderboard
  const competitionStartDate = "March 15, 2025";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animation trigger if needed
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

  const stats = [
    {
      icon: FiUsers,
      label: 'Total Participants',
      value: '12,847',
      change: '+23%',
      color: 'text-blue-500'
    },
    {
      icon: FiAward,
      label: 'Competitions Held',
      value: '156',
      change: '+8%',
      color: 'text-green-500'
    },
    {
      icon: FiTarget,
      label: 'Problems Solved',
      value: '89,234',
      change: '+45%',
      color: 'text-purple-500'
    },
    {
      icon: FiZap,
      label: 'Average Score',
      value: '1,847',
      change: '+12%',
      color: 'text-orange-500'
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
            <FiAward className="text-yellow-400 animate-pulse" size={24} />
            <span className="text-white font-semibold">Global Rankings</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
              Leaderboard
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            <span className="text-phiga-light/90">
              Celebrating the 
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              brightest minds
            </span>
            <span className="text-phiga-light/90">
              {' '}in physics worldwide
            </span>
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  <IconComponent className={`${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} size={32} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-phiga-light/80 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400 font-semibold">{stat.change}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leaderboard Content */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Competition Closed Message */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl p-12 lg:p-16 shadow-2xl border border-white/20 dark:border-phiga-gray-700/50">
              {/* Closed Icon */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                  <FiClock className="text-white animate-pulse" size={60} />
                </div>
              </div>
              
              {/* Closed Message */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-phiga-main dark:text-white mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Leaderboard Closed
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 mb-8 leading-relaxed">
                The leaderboard is currently <span className="font-bold text-orange-500">closed</span> until the next competition begins.
              </p>
              
              {/* Competition Start Info */}
              <div className="bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 backdrop-blur-xl rounded-2xl p-8 border border-phiga-accent/20 mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <FiCalendar className="text-phiga-accent" size={32} />
                  <h3 className="text-2xl font-heading font-bold text-phiga-main dark:text-white">
                    Next Competition
                  </h3>
                </div>
                <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300 mb-2">
                  Competition starts on:
                </p>
                <div className="text-3xl font-bold text-phiga-accent mb-4">
                  {competitionStartDate}
                </div>
                <p className="text-phiga-gray-600 dark:text-phiga-gray-300">
                  Register now to be notified when rankings become available!
                </p>
              </div>
              
              {/* Call to Action */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-phiga-accent to-phiga-light text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-phiga-light hover:to-phiga-accent transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl">
                  <span className="flex items-center justify-center gap-3">
                    <FiUsers className="group-hover:scale-110 transition-transform duration-300" size={20} />
                    Register for Competition
                    <FiZap className="group-hover:scale-125 transition-transform duration-300" size={16} />
                  </span>
                </button>
                
                <button className="group bg-white/80 dark:bg-phiga-gray-700/80 text-phiga-main dark:text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-phiga-accent/10 transition-all duration-500 transform hover:scale-105 border border-phiga-accent/20">
                  <span className="flex items-center justify-center gap-3">
                    <FiTarget className="group-hover:scale-110 transition-transform duration-300" size={20} />
                    View Previous Rankings
                  </span>
                </button>
              </div>
              
              {/* Stats Preview */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="group bg-white/60 dark:bg-phiga-gray-700/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-phiga-gray-600/20">
                      <IconComponent className={`${stat.color} mx-auto mb-3 opacity-50`} size={24} />
                      <div className="text-lg font-bold text-phiga-gray-600 dark:text-phiga-gray-400 mb-1">{stat.value}</div>
                      <div className="text-xs text-phiga-gray-500 dark:text-phiga-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
