import React, { useEffect, useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiStar,
  FiZap,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiHeadphones,
  FiHelpCircle
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'phigacompetition@gmail.com',
      color: 'text-blue-500'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+20 115 880 6644',
      color: 'text-green-500'
    },
    // {
    //   icon: FiMapPin,
    //   title: 'Visit Us',
    //   description: 'Our headquarters',
    //   contact: 'Physics Education Center\nSingapore',
    //   color: 'text-purple-500'
    // }
  ];

  const supportCategories = [
    {
      icon: FiHelpCircle,
      title: 'General Inquiries',
      description: 'Questions about PHIGA platform and competitions'
    },
    {
      icon: HiOutlineAcademicCap,
      title: 'Academic Support',
      description: 'Help with physics problems and educational content'
    },
    {
      icon: FiShield,
      title: 'Technical Issues',
      description: 'Platform bugs, login problems, and technical support'
    },
    {
      icon: FiHeadphones,
      title: 'Partnership',
      description: 'School partnerships and institutional collaborations'
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
            <FiMail className="text-phiga-accent animate-pulse" size={24} />
            <span className="text-white font-semibold">Get In Touch</span>
            <div className="flex gap-1">
              <FiStar className="text-yellow-400 text-sm animate-pulse" />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.2s'}} />
              <FiStar className="text-yellow-400 text-sm animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8">
            <span className="bg-gradient-to-r from-white via-phiga-accent to-phiga-light bg-clip-text text-transparent drop-shadow-2xl">
              Contact Us
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-3xl lg:text-4xl max-w-5xl mx-auto leading-relaxed font-medium mb-8">
            <span className="text-phiga-light/90">
              We're here to 
            </span>
            <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">
              help and support
            </span>
            <span className="text-phiga-light/90">
              {' '}your physics learning journey
            </span>
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-phiga-light/30 to-white dark:from-phiga-gray-900 dark:via-phiga-gray-800 dark:to-phiga-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-phiga-main/10 to-phiga-accent/5 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              
              return (
                <div
                  key={index}
                  className="group bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/20 dark:border-phiga-gray-700/50 overflow-hidden text-center"
                  style={{
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-phiga-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`p-6 rounded-2xl bg-gradient-to-r from-${info.color.split('-')[1]}-500/20 to-${info.color.split('-')[1]}-400/10 backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto w-fit`}>
                      <IconComponent className={`${info.color} group-hover:scale-110 transition-transform duration-300`} size={40} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-heading font-black text-phiga-main dark:text-white mb-3 group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                      {info.title}
                    </h3>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300 mb-4">
                      {info.description}
                    </p>
                    <div className="text-lg font-semibold text-phiga-accent whitespace-pre-line">
                      {info.icon === FiMail ? (
                        <a href={`mailto:${info.contact}`} className="hover:underline">
                          {info.contact}
                        </a>
                      ) : info.icon === FiPhone ? (
                        <a href={`tel:${info.contact}`} className="hover:underline">
                          {info.contact}
                        </a>
                      ) : (
                        info.contact
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/90 dark:bg-phiga-gray-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-phiga-gray-700/50">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-black text-phiga-main dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                    Send us a Message
                  </span>
                </h2>
                <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-phiga-gray-700 dark:text-phiga-gray-300 mb-2">
                      <FiUser className="inline mr-2" size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 dark:bg-phiga-gray-700/50 border border-phiga-gray-300 dark:border-phiga-gray-600 rounded-xl focus:ring-2 focus:ring-phiga-accent focus:border-transparent transition-all duration-300 group-hover:border-phiga-accent/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-phiga-gray-700 dark:text-phiga-gray-300 mb-2">
                      <FiMail className="inline mr-2" size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 dark:bg-phiga-gray-700/50 border border-phiga-gray-300 dark:border-phiga-gray-600 rounded-xl focus:ring-2 focus:ring-phiga-accent focus:border-transparent transition-all duration-300 group-hover:border-phiga-accent/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-phiga-gray-700 dark:text-phiga-gray-300 mb-2">
                    <FiMessageSquare className="inline mr-2" size={16} />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-phiga-gray-700/50 border border-phiga-gray-300 dark:border-phiga-gray-600 rounded-xl focus:ring-2 focus:ring-phiga-accent focus:border-transparent transition-all duration-300 group-hover:border-phiga-accent/50"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-phiga-gray-700 dark:text-phiga-gray-300 mb-2">
                    <FiMessageSquare className="inline mr-2" size={16} />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-phiga-gray-700/50 border border-phiga-gray-300 dark:border-phiga-gray-600 rounded-xl focus:ring-2 focus:ring-phiga-accent focus:border-transparent transition-all duration-300 group-hover:border-phiga-accent/50 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-phiga-accent to-phiga-light text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-phiga-light hover:to-phiga-accent transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Button Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <FiClock className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <FiCheckCircle className="text-green-400" size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <FiSend className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                        Send Message
                        <FiZap className="group-hover:scale-125 transition-transform duration-300" size={16} />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
            
            {/* Support Categories */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-black text-phiga-main dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-phiga-main via-phiga-accent to-phiga-light bg-clip-text text-transparent">
                    How can we help?
                  </span>
                </h2>
                <p className="text-lg text-phiga-gray-600 dark:text-phiga-gray-300">
                  Choose the category that best describes your inquiry for faster assistance.
                </p>
              </div>
              
              <div className="space-y-6">
                {supportCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  
                  return (
                    <div
                      key={index}
                      className="group bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 dark:border-phiga-gray-700/50 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-phiga-accent/20 to-phiga-light/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <IconComponent className="text-phiga-accent group-hover:scale-110 transition-transform duration-300" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-2 group-hover:text-phiga-accent dark:group-hover:text-phiga-accent transition-colors duration-300">
                            {category.title}
                          </h4>
                          <p className="text-phiga-gray-600 dark:text-phiga-gray-300 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                        <FiActivity className="text-phiga-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Quick Response Time */}
              <div className="bg-gradient-to-r from-phiga-accent/10 to-phiga-light/5 backdrop-blur-xl rounded-2xl p-6 border border-phiga-accent/20">
                <div className="flex items-center gap-4">
                  <FiClock className="text-phiga-accent animate-pulse" size={32} />
                  <div>
                    <h4 className="text-xl font-heading font-bold text-phiga-main dark:text-white mb-1">
                      Quick Response Time
                    </h4>
                    <p className="text-phiga-gray-600 dark:text-phiga-gray-300">
                      We typically respond within 24 hours during business days
                    </p>
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

export default Contact;