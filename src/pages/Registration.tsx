import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import {
  FiUser,
  FiMail,
  FiGlobe,
  FiBook,
  FiAward,
  FiHeart,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiStar
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  school: string;
  gradeLevel: string;
  physicsExperience: string;
  motivation: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    school: '',
    gradeLevel: '',
    physicsExperience: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Belarus', 'Belgium',
    'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Cambodia',
    'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic',
    'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia',
    'Germany', 'Ghana', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania',
    'Luxembourg', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland',
    'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore',
    'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
    'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
    'Venezuela', 'Vietnam'
  ];

  const gradeLevels = [
    'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
    'University Year 1', 'University Year 2', 'University Year 3', 'University Year 4+'
  ];

  const physicsLevels = [
    'Beginner - Just starting with physics',
    'Intermediate - Some physics coursework completed',
    'Advanced - Strong physics background',
    'Expert - Extensive physics competition experience'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'country'];
    for (const field of requiredFields) {
      if (!formData[field as keyof RegistrationData].trim()) {
        setErrorMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setErrorMessage('Please enter a valid phone number.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            country: formData.country,
            school: formData.school,
            grade_level: formData.gradeLevel,
            physics_experience: formData.physicsExperience,
            motivation: formData.motivation
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        school: '',
        gradeLevel: '',
        physicsExperience: '',
        motivation: ''
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || 'An error occurred during registration. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-phiga-accent rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-phiga-light rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-phiga-accent rounded-full animate-bounce animation-delay-5000"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-phiga-main rounded-full animate-bounce animation-delay-2000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      </div>

      {/* Hero Section */}
      <div className={`relative pt-20 pb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Premium Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-phiga-accent/20 backdrop-blur-xl border border-phiga-accent/30 rounded-full shadow-2xl mb-8 hover:scale-105 transition-all duration-300">
            <HiSparkles className="w-5 h-5 text-phiga-accent animate-pulse" />
            <span className="text-sm font-semibold text-phiga-light">Join the Elite Competition</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <FiStar key={i} className="w-3 h-3 text-yellow-500 fill-current animate-pulse" style={{animationDelay: `${i * 200}ms`}} />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-phiga-light to-phiga-accent bg-clip-text text-transparent">
              Register for PHIGA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-phiga-light/80 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Join the <span className="bg-gradient-to-r from-phiga-accent to-phiga-light bg-clip-text text-transparent font-bold">premier physics competition</span> and showcase your problem-solving skills on a global stage.
            Connect with fellow physics enthusiasts and compete for <span className="bg-gradient-to-r from-phiga-light to-phiga-accent bg-clip-text text-transparent font-bold">prestigious awards</span>.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-phiga-accent/30 dark:border-phiga-accent/50 overflow-hidden hover:shadow-3xl transition-all duration-500 relative">
          {/* Form glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-phiga-accent/10 via-phiga-main/10 to-phiga-light/10 rounded-3xl pointer-events-none"></div>
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-xl shadow-lg">
                    <FiUser className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-accent to-phiga-main bg-clip-text text-transparent">Personal Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-xl shadow-lg">
                    <FiMail className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-main to-phiga-accent bg-clip-text text-transparent">Contact Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-xl shadow-lg">
                    <FiGlobe className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-accent to-phiga-main bg-clip-text text-transparent">Location</span>
                </h2>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white shadow-lg hover:shadow-xl"
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-main to-phiga-dark rounded-xl shadow-lg">
                    <FiBook className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-main to-phiga-dark bg-clip-text text-transparent">Academic Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="school" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      School/Institution
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                      placeholder="Your school or university name"
                    />
                  </div>
                  <div>
                    <label htmlFor="gradeLevel" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Grade Level
                    </label>
                    <select
                      id="gradeLevel"
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white shadow-lg hover:shadow-xl"
                    >
                      <option value="">Select your grade level</option>
                      {gradeLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Physics Experience */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-xl shadow-lg">
                    <FiAward className="w-5 h-5 text-phiga-dark" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-accent to-phiga-main bg-clip-text text-transparent">Physics Experience</span>
                </h2>
                <div>
                  <label htmlFor="physicsExperience" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Physics Background
                  </label>
                  <select
                    id="physicsExperience"
                    name="physicsExperience"
                    value={formData.physicsExperience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white shadow-lg hover:shadow-xl"
                  >
                    <option value="">Select your physics experience level</option>
                    {physicsLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-light to-phiga-accent rounded-xl shadow-lg">
                    <FiHeart className="w-5 h-5 text-phiga-dark" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-main to-phiga-accent bg-clip-text text-transparent">Motivation</span>
                </h2>
                <div>
                  <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to participate in PHIGA? (Optional)
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none shadow-lg hover:shadow-xl"
                    placeholder="Share your passion for physics and what motivates you to compete..."
                  />
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-phiga-accent/10 dark:bg-phiga-accent/20 border border-phiga-accent/30 dark:border-phiga-accent/40 rounded-xl">
                  <FiCheck className="w-5 h-5 text-phiga-accent flex-shrink-0" />
                  <p className="text-phiga-main dark:text-phiga-light">
                    Registration successful! Welcome to PHIGA. You'll receive a confirmation email shortly.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-phiga-main to-phiga-accent hover:from-phiga-dark hover:to-phiga-main disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;