import React, { useEffect, useState } from 'react';
import { 
  FiMail, 
  FiExternalLink, 
  FiHeart,
  FiLinkedin,
  FiInstagram,
  FiZap,
  FiGlobe,
  FiStar,
  FiActivity,
  FiShield,
  FiAward
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

interface FooterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const handleCopyrightClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000); // Reset after 2 seconds
    
    setClickTimer(timer);
    
    // Triple click to access admin
    if (clickCount + 1 >= 3) {
      setCurrentPage('admin');
      setClickCount(0);
      if (clickTimer) clearTimeout(clickTimer);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('footer-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);

  return (
    <footer id="footer-section" className="relative bg-gradient-to-br from-phiga-main via-phiga-dark to-black dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-black text-white py-20 md:py-28 overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,rgba(4,191,157,0.1)_50%,transparent_100%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2" style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out'
          }}>
            <div className="group flex items-center mb-8">
              {/* <div className="relative p-4 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/25 backdrop-blur-lg rounded-3xl mr-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <HiOutlineAcademicCap className="text-white" size={40} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
              </div> */}
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-black mb-2">
                  <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
                    PHIGA
                  </span>
                </h3>
                <div className="flex items-center gap-2">
                  {/* <FiStar className="text-yellow-400 text-sm animate-pulse" />
                  <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
                  <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
                  <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.6s'}} />
                  <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.8s'}} /> */}
                  <span className="text-phiga-light/70 text-sm ml-2 font-medium">Global Physics Competition</span>
                </div>
              </div>
            </div>
            <p className="text-phiga-light/90 mb-10 leading-relaxed text-xl font-medium">
              <span className="text-phiga-accent font-bold">Physics International Gamefield Adventure</span> - The world's premier online physics competition 
              that challenges students through interactive video-based problems and real-time scoring.
            </p>
            
            {/* Enhanced Social Media Links */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:phigacompetition@gmail.com" 
                className="group relative p-5 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl hover:from-phiga-accent/80 hover:to-phiga-light/60 rounded-3xl transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:shadow-phiga-accent/30 overflow-hidden"
                aria-label="Email"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <FiMail className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
              </a>
              <a 
                href="https://www.instagram.com/quantastra.1/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl hover:from-phiga-accent/80 hover:to-phiga-light/60 rounded-3xl transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:shadow-phiga-accent/30 overflow-hidden"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <FiInstagram className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
              </a>
              <a 
                href="https://www.linkedin.com/company/phigacompetition/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3BD7sn5dEUTYCPkbGu6rqJ9g%3D%3D" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-xl hover:from-phiga-accent/80 hover:to-phiga-light/60 rounded-3xl transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:shadow-phiga-accent/30 overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <FiLinkedin className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
              </a>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out 0.2s'
          }}>
            <div className="relative mb-8">
              <h4 className="text-2xl font-heading font-black text-white mb-2">
                <span className="bg-gradient-to-r from-white to-phiga-accent bg-clip-text text-transparent">
                  Quick Links
                </span>
              </h4>
              <div className="w-16 h-1 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full"></div>
              <FiActivity className="absolute -top-2 -right-2 text-phiga-accent/50 animate-pulse" size={20} />
            </div>
            <ul className="space-y-5">
              <li>
                <button onClick={() => setCurrentPage('rules')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiZap className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Competition Rules</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiGlobe className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">About PHIGA</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('home')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <HiOutlineAcademicCap className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Home</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('leaderboard')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiMail className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Leaderboard</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('registration')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiStar className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Registration</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faq')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiActivity className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">FAQ</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiExternalLink size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* Enhanced Support */}
          <div style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s ease-out 0.4s'
          }}>
            <div className="relative mb-8">
              <h4 className="text-2xl font-heading font-black text-white mb-2">
                <span className="bg-gradient-to-r from-white to-phiga-accent bg-clip-text text-transparent">
                  Support
                </span>
              </h4>
              <div className="w-16 h-1 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full"></div>
              <FiShield className="absolute -top-2 -right-2 text-phiga-accent/50 animate-pulse" size={20} />
            </div>
            <ul className="space-y-5">
              <li>
                <a href="#" className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiExternalLink className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Help Center</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiAward size={16} className="text-phiga-accent" />
                  </div>
                </a>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden w-full text-left">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiExternalLink className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Contact Us</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiAward size={16} className="text-phiga-accent" />
                  </div>
                </button>
              </li>
              <li>
                <a href="#" className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiExternalLink className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Technical Support</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiAward size={16} className="text-phiga-accent" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiExternalLink className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Accessibility</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiAward size={16} className="text-phiga-accent" />
                  </div>
                </a>
              </li>
              {/* <li>
                <a href="#" className="group relative flex items-center p-3 rounded-2xl text-phiga-light/80 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiExternalLink className="relative z-10 mr-4 group-hover:text-phiga-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={20} />
                  <span className="relative z-10 font-medium group-hover:font-bold transition-all duration-300">Privacy Policy</span>
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiAward size={16} className="text-phiga-accent" />
                  </div>
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-20 pt-10 border-t border-gradient-to-r from-transparent via-white/20 to-transparent" style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s ease-out 0.6s'
        }}>
          <div className="relative">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute top-0 right-1/4 w-24 h-24 bg-gradient-to-r from-phiga-light/10 to-transparent rounded-full blur-xl animate-float"></div>
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Love Message */}
              <div className="group flex items-center">
                <div className="relative mr-4">
                  <FiHeart className="text-red-400 group-hover:scale-125 group-hover:text-red-300 transition-all duration-500" size={24} />
                  <div className="absolute inset-0 bg-red-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="text-phiga-light/90 text-lg font-medium group-hover:text-white transition-colors duration-300">
                  Made with <span className="text-red-400 font-bold">love</span> for physics enthusiasts worldwide
                </p>
              </div>
              
              {/* Copyright and Links */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <p 
                    className="text-phiga-light/70 text-sm font-medium cursor-pointer select-none hover:text-phiga-light/90 transition-colors"
                    onClick={handleCopyrightClick}
                    title="© 2025 PHIGA. All rights reserved."
                  >
                    © 2025 <span className="text-phiga-accent font-bold">PHIGA</span>. All rights reserved.
                  </p>
                </div>
                
                {/* <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <a href="#" className="group relative text-phiga-light/60 hover:text-white transition-all duration-300 px-3 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm">
                    <span className="relative z-10">Terms of Service</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </a>
                  <a href="#" className="group relative text-phiga-light/60 hover:text-white transition-all duration-300 px-3 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm">
                    <span className="relative z-10">Privacy Policy</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </a>
                  <a href="#" className="group relative text-phiga-light/60 hover:text-white transition-all duration-300 px-3 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm">
                    <span className="relative z-10">Cookie Policy</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </a>
                </div> */}
              </div>
            </div>
            
            {/* Additional Premium Elements */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-full border border-white/10">
                <FiZap className="text-phiga-accent animate-pulse" size={16} />
                <span className="text-phiga-light/70 text-sm font-medium">Powered by cutting-edge technology</span>
                <FiZap className="text-phiga-accent animate-pulse" size={16} style={{animationDelay: '0.5s'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;