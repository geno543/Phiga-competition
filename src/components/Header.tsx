import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon,
  FiHome,
  FiInfo,
  FiFileText,
  FiBarChart,
  FiMail,
  FiStar,
  FiZap,
  FiActivity,
  FiShield
} from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hidden admin access: Ctrl+Shift+A (case insensitive)
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        console.log('Admin shortcut triggered!');
        setCurrentPage('admin');
      }
    };

    // Check for admin URL parameter
    const checkAdminAccess = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true') {
        setCurrentPage('admin');
        // Clean URL without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    checkAdminAccess();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCurrentPage]);

  const navigationItems = [
    { name: 'Home', id: 'home', icon: FiHome },
    { name: 'About', id: 'about', icon: FiInfo },
    { name: 'FAQ', id: 'faq', icon: FiActivity },
    { name: 'Rules', id: 'rules', icon: FiFileText },
    { name: 'Leaderboard', id: 'leaderboard', icon: FiBarChart },
    { name: 'Registration', id: 'registration', icon: FiStar },
    { name: 'Contact', id: 'contact', icon: FiMail }
  ];

  return (
    <header className={`relative bg-gradient-to-r from-phiga-main via-phiga-main/95 to-phiga-dark dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-black text-white sticky top-0 z-50 transition-all duration-500 overflow-hidden ${
      isScrolled 
        ? 'shadow-2xl shadow-phiga-accent/20 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90 py-3' 
        : 'shadow-lg py-4'
    }`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-0 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/15 to-phiga-light/10 rounded-full blur-2xl animate-pulse-slow opacity-30"></div>
        <div className="absolute top-0 right-20 w-24 h-24 bg-gradient-to-r from-phiga-light/10 to-phiga-accent/15 rounded-full blur-xl animate-float opacity-25"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(232,247,244,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(232,247,244,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 animate-pulse"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-phiga-accent/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(4,191,157,0.05)_50%,transparent_100%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="group flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/phiga_logo.png" 
                alt="PHIGA Logo" 
                className={`relative z-10 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl ${
                  isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
                }`}
              />
              {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div> */}
            </div>
            
            {/* Enhanced Brand Text */}
            {/* <div className="hidden md:block">
              <h1 className="text-2xl md:text-3xl font-heading font-black">
                <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-lg">
                  PHIGA
                </span>
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <FiStar className="text-yellow-400 text-xs animate-pulse" />
                <FiStar className="text-yellow-400 text-xs animate-pulse" style={{animationDelay: '0.2s'}} />
                <FiStar className="text-yellow-400 text-xs animate-pulse" style={{animationDelay: '0.4s'}} />
                <span className="text-phiga-light/70 text-xs ml-1 font-medium">Physics Competition</span>
              </div>
            </div> */}
          </div>
          
          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              const isHovered = activeHover === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  onMouseEnter={() => setActiveHover(item.id)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`group relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-phiga-accent to-phiga-light shadow-lg shadow-phiga-accent/30 scale-105' 
                      : 'text-phiga-light/80 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-phiga-accent/20'
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Background Effects */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    !isActive ? 'group-hover:opacity-100' : ''
                  }`}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  {/* Icon */}
                  <IconComponent 
                    className={`relative z-10 transition-all duration-300 ${
                      isActive || isHovered ? 'scale-110 rotate-12' : ''
                    }`} 
                    size={20} 
                  />
                  
                  {/* Text */}
                  <span className={`relative z-10 font-semibold transition-all duration-300 ${
                    isActive ? 'font-bold' : 'group-hover:font-bold'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-pulse"></div>
                  )}
                  
                  {/* Hover Indicator */}
                  {!isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-phiga-accent rounded-full transition-all duration-300 ${
                      isHovered ? 'w-6' : 'w-0'
                    }`}></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Enhanced Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group relative p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl hover:from-phiga-accent/80 hover:to-phiga-light/60 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-phiga-accent/30 overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10">
                {theme === 'light' ? (
                  <FiMoon className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={22} />
                ) : (
                  <FiSun className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={22} />
                )}
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </button>
            
            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="group relative lg:hidden p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl hover:from-phiga-accent/80 hover:to-phiga-light/60 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-phiga-accent/30 overflow-hidden"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10">
                {isMenuOpen ? (
                  <FiX className="group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" size={24} />
                ) : (
                  <FiMenu className="group-hover:scale-110 transition-all duration-300" size={24} />
                )}
              </div>
              {isMenuOpen && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-75"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="relative mt-6 pb-6">
            {/* Enhanced Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-phiga-accent/50 to-transparent"></div>
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl"></div>
            
            <div className="relative z-10 flex flex-col space-y-3 pt-6">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`group relative flex items-center space-x-4 px-6 py-4 mx-2 rounded-2xl text-left transition-all duration-500 overflow-hidden ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-phiga-accent to-phiga-light shadow-lg shadow-phiga-accent/30 scale-105' 
                        : 'text-phiga-light/80 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg'
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${index * 0.1}s`
                    }}
                  >
                    {/* Background Effects */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      !isActive ? 'group-hover:opacity-100' : ''
                    }`}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 p-2 bg-white/10 rounded-xl group-hover:bg-phiga-accent/30 transition-all duration-300">
                      <IconComponent 
                        className={`transition-all duration-300 ${
                          isActive ? 'scale-110 rotate-12' : 'group-hover:scale-110 group-hover:rotate-12'
                        }`} 
                        size={22} 
                      />
                    </div>
                    
                    {/* Text */}
                    <span className={`relative z-10 font-semibold transition-all duration-300 ${
                      isActive ? 'font-bold' : 'group-hover:font-bold'
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="relative z-10 ml-auto">
                        <FiZap className="text-white animate-pulse" size={16} />
                      </div>
                    )}
                    
                    {/* Hover Arrow */}
                    {!isActive && (
                      <div className={`relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${
                        'translate-x-2 group-hover:translate-x-0'
                      }`}>
                        <FiActivity className="text-phiga-accent" size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Footer */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-full border border-white/10">
                  <FiShield className="text-phiga-accent animate-pulse" size={14} />
                  <span className="text-phiga-light/70 text-sm font-medium">Secure Navigation</span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;