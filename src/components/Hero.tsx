import React from 'react';
import { FiPlay, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';
import AtomVisualization from './AtomVisualization';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-phiga-light/20 to-phiga-accent/30 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-phiga-accent/40 to-white/20 rounded-full blur-lg animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-white/20 to-phiga-accent/30 rounded-full blur-xl animate-bounce-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(4,191,157,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(4,191,157,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-phiga-dark/50 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Main Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-phiga-accent/20 backdrop-blur-sm border border-phiga-accent/30 rounded-full px-6 py-2 mb-6 animate-fade-in">
            <FiZap className="text-phiga-accent" />
            <span className="text-phiga-light font-medium">Global Physics Competition</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black text-white mb-6 animate-fade-in leading-tight">
            <span className="bg-gradient-to-r from-white via-phiga-light to-phiga-accent bg-clip-text text-transparent">
              PHIGA
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-phiga-light/90 mt-2">
              Physics International Gamefield Adventure
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-phiga-light/80 mb-8 leading-relaxed animate-slide-up max-w-2xl">
            Ready to test your physics prowess? Register now for the ultimate intellectual challenge featuring 30 mind-bending problems in 4 hours of pure scientific excitement!
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mb-8 animate-slide-up">
            {/* <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FiUsers className="text-phiga-accent" />
              <span className="text-white font-semibold">1000+ Students</span>
            </div> */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FiTarget className="text-phiga-accent" />
              <span className="text-white font-semibold">30 Challenges</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FiTrendingUp className="text-phiga-accent" />
              <span className="text-white font-semibold">Live Rankings</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
            <button 
              onClick={() => setCurrentPage('registration')}
              className="group bg-gradient-to-r from-phiga-accent to-phiga-light hover:from-phiga-light hover:to-phiga-accent text-phiga-dark px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-phiga-accent/25 flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <FiPlay size={24} className="group-hover:scale-110 transition-transform" />
              Register Now
            </button>
            <button 
              onClick={() => setCurrentPage('rules')}
              className="group border-2 border-phiga-light/50 text-phiga-light hover:bg-phiga-light/10 hover:border-phiga-light px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <FiZap size={24} className="group-hover:scale-110 transition-transform" />
              View Rules
            </button>
          </div>
        </div>

        {/* 3D Atom Visualization Area */}
        <div className="hidden lg:block lg:w-1/2 lg:pl-12">
          <div className="relative w-full h-full min-h-screen flex items-center justify-center">
            <AtomVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;