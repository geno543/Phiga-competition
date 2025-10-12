import React, { useEffect, useState } from 'react';
import { FiStar, FiAward } from 'react-icons/fi';

const Sponsors: React.FC = () => {
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

    const section = document.querySelector('[data-section="sponsors"]');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const sponsors = [
    {
      name: 'Art of Problem Solving',
      shortName: 'AoPS',
      logo: '/AoPS.png',
      website: 'https://artofproblemsolving.com/',
      description: 'Leading platform for advanced mathematics education and problem-solving skills',
      color: 'blue'
    },
    {
      name: 'Practical guide to Physics Olympiads',
      shortName: 'PhysOlymp',
      logo: '/physolymp.png',
      website: 'https://physolymp.com/',
      description: 'Comprehensive guide for Physics Olympiad preparation and training',
      color: 'purple'
    },
    {
      name: 'Wolfram',
      shortName: 'Wolfram',
      logo: '/Wolfram.png',
      website: 'https://www.wolfram.com/',
      description: 'Computational intelligence platform powering scientific discovery and innovation',
      color: 'red'
    }
  ];

  return (
    <section 
      className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/20 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden"
      data-section="sponsors"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Premium Badge */}
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/10 backdrop-blur-xl rounded-full border border-phiga-accent/30 mb-8 group hover:scale-105 transition-all duration-500"
            style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out'
            }}
          >
            <FiAward className="text-phiga-accent animate-pulse" size={24} />
            <span className="text-phiga-main dark:text-white font-semibold">Our Partners</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>

          {/* Title */}
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
              Proud Sponsors
            </span>
          </h2>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-phiga-gray-600 dark:text-phiga-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            Partnering with leading organizations to advance{' '}
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              physics education
            </span>
            {' '}worldwide
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.name}
              className="group text-center"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                opacity: isVisible ? 1 : 0,
                transition: `all 0.8s ease-out ${0.6 + index * 0.2}s`
              }}
            >
              {/* Logo Container - Clickable */}
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-8 group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              >
                <div className="w-60 h-60 mx-auto flex items-center justify-center">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain filter hover:brightness-110 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback */}
                  <div className="hidden text-4xl font-bold text-phiga-accent">
                    {sponsor.shortName}
                  </div>
                </div>
              </a>

              {/* Sponsor Info - Non-clickable */}
              <div>
                <h3 className="text-2xl lg:text-3xl font-heading font-black text-phiga-main dark:text-white mb-4 group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                  {sponsor.name}
                </h3>
                
                <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed max-w-md mx-auto">
                  {sponsor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div 
          className="text-center mt-16"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out 1.2s'
          }}
        >
          <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300">
            Interested in sponsoring PHIGA?{' '}
            <span className="text-phiga-accent font-semibold hover:underline cursor-pointer">
              Contact us
            </span>
            {' '}to learn more about partnership opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
