import React, { useEffect, useState } from 'react';
import {
  FiAward,
  FiStar,
  FiZap,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiCircle,
  FiHexagon,
  FiFlag,
  FiCalendar
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineLightBulb } from 'react-icons/hi2';

interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  score: number;
  competitions: number;
  streak: number;
  country: string;
  avatar?: string;
}

const Leaderboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('global');
  const [timeFilter, setTimeFilter] = useState('all-time');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: 'Alex Chen',
      school: 'Singapore International School',
      score: 2847,
      competitions: 15,
      streak: 8,
      country: 'Singapore'
    },
    {
      rank: 2,
      name: 'Maria Rodriguez',
      school: 'International Baccalaureate Academy',
      score: 2756,
      competitions: 12,
      streak: 6,
      country: 'Spain'
    },
    {
      rank: 3,
      name: 'David Kim',
      school: 'Seoul Science High School',
      score: 2698,
      competitions: 18,
      streak: 4,
      country: 'South Korea'
    },
    {
      rank: 4,
      name: 'Emma Thompson',
      school: 'Cambridge International College',
      score: 2634,
      competitions: 14,
      streak: 7,
      country: 'United Kingdom'
    },
    {
      rank: 5,
      name: 'Raj Patel',
      school: 'Delhi Public School International',
      score: 2589,
      competitions: 16,
      streak: 5,
      country: 'India'
    },
    {
      rank: 6,
      name: 'Sophie Mueller',
      school: 'Berlin International School',
      score: 2534,
      competitions: 11,
      streak: 3,
      country: 'Germany'
    },
    {
      rank: 7,
      name: 'Lucas Silva',
      school: 'São Paulo International Academy',
      score: 2478,
      competitions: 13,
      streak: 6,
      country: 'Brazil'
    },
    {
      rank: 8,
      name: 'Yuki Tanaka',
      school: 'Tokyo International High School',
      score: 2423,
      competitions: 17,
      streak: 2,
      country: 'Japan'
    }
  ];

  const filters = [
    { id: 'global', label: 'Global', icon:  FiAward },
    { id: 'regional', label: 'Regional', icon: FiFlag },
    { id: 'school', label: 'School', icon: HiOutlineAcademicCap },
    { id: 'friends', label: 'Friends', icon: FiUsers }
  ];

  const timeFilters = [
    { id: 'all-time', label: 'All Time' },
    { id: 'this-year', label: 'This Year' },
    { id: 'this-month', label: 'This Month' },
    { id: 'this-week', label: 'This Week' }
  ];

  const stats = [
    {
      icon: FiUsers,
      label: 'Total Participants',
      value: '12,847',
      change: '+23%',
      color: 'text-blue-500'
    },
    {
      icon:  FiAward,
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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FiHexagon className="text-yellow-500" size={24} />;
      case 2:
        return <FiCircle className="text-gray-400" size={24} />;
      case 3:
        return <FiCircle className="text-amber-600" size={24} />;
      default:
        return <span className="text-2xl font-bold text-phiga-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-phiga-gray-400 to-phiga-gray-600';
    }
  };

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
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-phiga-accent to-phiga-light text-white shadow-lg scale-105'
                        : 'bg-white/80 dark:bg-phiga-gray-800/80 text-phiga-gray-600 dark:text-phiga-gray-300 hover:bg-phiga-accent/10 hover:scale-105'
                    }`}
                  >
                    <IconComponent size={20} className={activeFilter === filter.id ? 'text-white' : 'text-phiga-accent'} />
                    {filter.label}
                  </button>
                );
              })}
            </div>
            
            {/* Time Filters */}
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setTimeFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    timeFilter === filter.id
                      ? 'bg-phiga-accent text-white'
                      : 'bg-white/80 dark:bg-phiga-gray-800/80 text-phiga-gray-600 dark:text-phiga-gray-300 hover:bg-phiga-accent/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            {leaderboardData.slice(0, 3).map((entry, index) => {
              const positions = [1, 0, 2]; // Center first place
              const actualIndex = positions[index];
              const actualEntry = leaderboardData[actualIndex];
              
              return (
                <div
                  key={actualEntry.rank}
                  className={`group relative bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden ${
                    actualEntry.rank === 1 ? 'md:order-2 md:scale-110' : actualEntry.rank === 2 ? 'md:order-1' : 'md:order-3'
                  }`}
                  style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                >
                  {/* Background Effects */}
                  <div className={`absolute inset-0 ${getRankBadge(actualEntry.rank)} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  {/* Rank Badge */}
                  <div className="relative z-10 flex justify-center mb-6">
                    <div className={`p-4 rounded-full ${getRankBadge(actualEntry.rank)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {getRankIcon(actualEntry.rank)}
                    </div>
                  </div>
                  
                  {/* Avatar */}
                  <div className="relative z-10 flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {actualEntry.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-2">
                      {actualEntry.name}
                    </h3>
                    <p className="text-sm text-phiga-gray-600 dark:text-phiga-gray-300 mb-4">
                      {actualEntry.school}
                    </p>
                    <div className="text-3xl font-bold text-phiga-accent mb-4">
                      {actualEntry.score.toLocaleString()}
                    </div>
                    <div className="flex justify-center gap-4 text-sm text-phiga-gray-600 dark:text-phiga-gray-300">
                      <span>{actualEntry.competitions} competitions</span>
                      <span>•</span>
                      <span>{actualEntry.streak} streak</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Full Leaderboard */}
          <div className="bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-heading font-bold text-phiga-main dark:text-white mb-8 text-center">
                <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                  Complete Rankings
                </span>
              </h2>
              
              <div className="space-y-4">
                {leaderboardData.map((entry, index) => (
                  <div
                    key={entry.rank}
                    className="group flex items-center gap-6 p-6 bg-white/50 dark:bg-phiga-gray-700/50 rounded-2xl hover:bg-phiga-accent/5 dark:hover:bg-phiga-accent/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                      opacity: isVisible ? 1 : 0,
                      transition: `all 0.6s ease-out ${index * 0.1}s`
                    }}
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-16 text-center">
                      {entry.rank <= 3 ? (
                        <div className={`p-2 rounded-full ${getRankBadge(entry.rank)} inline-flex`}>
                          {getRankIcon(entry.rank)}
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-phiga-gray-500">#{entry.rank}</span>
                      )}
                    </div>
                    
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full flex items-center justify-center text-white font-bold">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-phiga-main dark:text-white">
                        {entry.name}
                      </h4>
                      <p className="text-sm text-phiga-gray-600 dark:text-phiga-gray-300">
                        {entry.school} • {entry.country}
                      </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-phiga-accent">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="text-phiga-gray-500">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-phiga-gray-700 dark:text-phiga-gray-300">
                          {entry.competitions}
                        </div>
                        <div className="text-phiga-gray-500">Competitions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-500">
                          {entry.streak}
                        </div>
                        <div className="text-phiga-gray-500">Streak</div>
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <FiTrendingUp className="text-phiga-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Join Competition CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 backdrop-blur-xl rounded-2xl border border-phiga-accent/20">
              <FiAward className="text-phiga-accent animate-pulse" size={32} />
              <div>
                <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-1">
                  Ready to compete?
                </h4>
                <p className="text-phiga-gray-600 dark:text-phiga-gray-300">
                  Join the next competition and climb the leaderboard!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;