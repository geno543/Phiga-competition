import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

// Function to generate device fingerprint
const generateDeviceFingerprint = (): string => {
  // Create a more stable fingerprint without canvas (which can vary)
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.platform,
    navigator.hardwareConcurrency || 'unknown',
    navigator.maxTouchPoints || 0
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

// Function to check if device has already registered
const checkDeviceRegistration = (): { hasRegistered: boolean; registrationData?: any } => {
  try {
    const deviceId = generateDeviceFingerprint();
    const deviceRegistrations = JSON.parse(localStorage.getItem('deviceRegistrations') || '{}');
    
    if (deviceRegistrations[deviceId]) {
      return {
        hasRegistered: true,
        registrationData: deviceRegistrations[deviceId]
      };
    }
    
    return { hasRegistered: false };
  } catch (error) {
    console.error('Error checking device registration:', error);
    return { hasRegistered: false };
  }
};

// Function to record device registration
const recordDeviceRegistration = (formData: any): void => {
  try {
    const deviceId = generateDeviceFingerprint();
    const deviceRegistrations = JSON.parse(localStorage.getItem('deviceRegistrations') || '{}');
    
    deviceRegistrations[deviceId] = {
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      registrationDate: new Date().toISOString(),
      deviceId: deviceId
    };
    
    localStorage.setItem('deviceRegistrations', JSON.stringify(deviceRegistrations));
  } catch (error) {
    console.error('Error recording device registration:', error);
  }
};
const updateAmbassadorReferralCount = async (ambassadorCode: string, registrantName: string, registrantEmail: string) => {
  try {
    // Check if ambassador code exists in database
    const { data: ambassador, error: ambassadorError } = await supabase
      .from('ambassadors')
      .select('ambassador_code')
      .eq('ambassador_code', ambassadorCode)
      .single();
    
    if (ambassadorError || !ambassador) {
      console.log('Ambassador code not found in database:', ambassadorCode);
      return false;
    }
    
    // Insert referral record
    const { error: referralError } = await supabase
      .from('referrals')
      .insert([
        {
          ambassador_code: ambassadorCode,
          referee_email: registrantEmail,
          referee_name: registrantName
        }
      ]);
    
    if (referralError) {
      console.error('Error inserting referral:', referralError);
      return false;
    }
    
    // Update ambassador's referral count
    const { data: referrals } = await supabase
      .from('referrals')
      .select('id')
      .eq('ambassador_code', ambassadorCode);
    
    const referralCount = referrals ? referrals.length : 0;
    
    const { error: updateError } = await supabase
      .from('ambassadors')
      .update({ referral_count: referralCount })
      .eq('ambassador_code', ambassadorCode);
    
    if (updateError) {
      console.error('Error updating ambassador referral count:', updateError);
      return false;
    }
    
    console.log('Successfully updated referral count for ambassador:', ambassadorCode);
    return true;
  } catch (error) {
    console.error('Error updating ambassador referral count:', error);
    return false;
  }
};

// Function to validate registration and prevent fake referrals (improved)
const validateRegistrationForReferral = async (formData: any, ambassadorCode: string): Promise<boolean> => {
  try {
    // Check if ambassador code exists in database
    const { data: ambassador, error: ambassadorError } = await supabase
      .from('ambassadors')
      .select('email, ambassador_code')
      .eq('ambassador_code', ambassadorCode)
      .single();
    
    if (ambassadorError || !ambassador) {
      console.log('Invalid ambassador code:', ambassadorCode);
      return false;
    }
    
    // Check if this is the ambassador trying to refer themselves
    if (ambassador.email.toLowerCase() === formData.email.toLowerCase()) {
      console.log('Ambassador cannot refer themselves');
      return false;
    }
    
    // Get existing registrations from localStorage for duplicate checking
    const existingRegistrations = JSON.parse(localStorage.getItem('registrationsWithReferrals') || '[]');
    
    // More lenient duplicate checking - only block if from same ambassador within short time
    const recentDuplicates = existingRegistrations.filter((reg: any) => {
      const regTime = new Date(reg.registrationDate).getTime();
      const now = new Date().getTime();
      const hoursAgo24 = now - (24 * 60 * 60 * 1000); // 24 hours ago
      
      return reg.email.toLowerCase() === formData.email.toLowerCase() && 
             reg.ambassadorCode === ambassadorCode &&
             regTime > hoursAgo24;
    });
    
    if (recentDuplicates.length > 0) {
      console.log('Same email already used for this ambassador recently');
      return false;
    }
    
    // Relaxed name checking - only flag if extremely similar AND from same ambassador
    const suspiciousName = existingRegistrations.filter((reg: any) => {
      const existingName = reg.name.toLowerCase().replace(/[^a-z]/g, '');
      const newName = `${formData.firstName} ${formData.lastName}`.toLowerCase().replace(/[^a-z]/g, '');
      
      const similarity = calculateSimilarity(existingName, newName);
      return similarity > 0.9 && reg.ambassadorCode === ambassadorCode; // Increased threshold to 0.9
    });
    
    if (suspiciousName.length >= 2) { // Allow one similar name, block at 2+
      console.log('Multiple very similar names from same ambassador detected');
      return false;
    }
    
    // More reasonable rate limiting - 5 per 6 hours instead of 3 per hour
    const recentRegistrations = existingRegistrations.filter((reg: any) => {
      const regTime = new Date(reg.registrationDate).getTime();
      const now = new Date().getTime();
      const sixHoursAgo = now - (6 * 60 * 60 * 1000); // 6 hours ago
      
      return reg.ambassadorCode === ambassadorCode && regTime > sixHoursAgo;
    });
    
    if (recentRegistrations.length >= 5) {
      console.log('Too many registrations from same ambassador in 6 hours');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating registration:', error);
    return false;
  }
};

// Function to calculate similarity between two strings
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

// Function to calculate Levenshtein distance
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

// Function to clean up suspicious registrations and recalculate ambassador stats (improved)
const cleanupSuspiciousRegistrations = () => {
  try {
    const registrations = JSON.parse(localStorage.getItem('registrationsWithReferrals') || '[]');
    const ambassadors = JSON.parse(localStorage.getItem('ambassadors') || '[]');
    
    // Reset all ambassador referral counts
    ambassadors.forEach((amb: any) => {
      amb.referrals = 0;
    });
    
    // Group registrations by ambassador
    const registrationsByAmbassador: { [key: string]: any[] } = {};
    registrations.forEach((reg: any) => {
      if (!registrationsByAmbassador[reg.ambassadorCode]) {
        registrationsByAmbassador[reg.ambassadorCode] = [];
      }
      registrationsByAmbassador[reg.ambassadorCode].push(reg);
    });
    
    const validRegistrations: any[] = [];
    
    // Validate each ambassador's registrations with improved logic
    Object.keys(registrationsByAmbassador).forEach(ambassadorCode => {
      const ambassador = ambassadors.find((amb: any) => amb.code === ambassadorCode);
      if (!ambassador) return;
      
      const regs = registrationsByAmbassador[ambassadorCode];
      const validRegs: any[] = [];
      const seenEmails = new Set<string>();
      const nameGroups: { [key: string]: any[] } = {};
      
      // Sort by registration date
      regs.sort((a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime());
      
      regs.forEach(reg => {
        let isValid = true;
        const email = reg.email.toLowerCase();
        const normalizedName = reg.name.toLowerCase().replace(/[^a-z]/g, '');
        
        // Check for self-referral
        if (ambassador.email.toLowerCase() === email) {
          isValid = false;
        }
        
        // Allow first occurrence of each email (legitimate duplicate submission)
        if (seenEmails.has(email)) {
          isValid = false;
        } else {
          seenEmails.add(email);
        }
        
        // Group similar names but be more lenient
        if (isValid) {
          let foundSimilarGroup = false;
          Object.keys(nameGroups).forEach(groupKey => {
            const similarity = calculateSimilarity(groupKey, normalizedName);
            if (similarity > 0.85) { // Slightly more lenient threshold
              nameGroups[groupKey].push(reg);
              foundSimilarGroup = true;
            }
          });
          
          if (!foundSimilarGroup) {
            nameGroups[normalizedName] = [reg];
          }
        }
        
        if (isValid) {
          validRegs.push(reg);
          validRegistrations.push(reg);
        }
      });
      
      // Check each name group - allow up to 2 similar names per ambassador
      Object.values(nameGroups).forEach(group => {
        if (group.length > 2) {
          // Keep first 2, remove the rest from validRegs and validRegistrations
          const toRemove = group.slice(2);
          toRemove.forEach(regToRemove => {
            const indexInValid = validRegs.findIndex(r => r.email === regToRemove.email);
            if (indexInValid !== -1) validRegs.splice(indexInValid, 1);
            
            const indexInAll = validRegistrations.findIndex(r => r.email === regToRemove.email);
            if (indexInAll !== -1) validRegistrations.splice(indexInAll, 1);
          });
        }
      });
      
      // Update ambassador referral count with final valid registrations
      const finalValidCount = validRegs.length;
      ambassador.referrals = finalValidCount;
    });
    
    // Save cleaned data
    localStorage.setItem('ambassadors', JSON.stringify(ambassadors));
    localStorage.setItem('registrationsWithReferrals', JSON.stringify(validRegistrations));
    
    console.log('Improved cleanup completed. Preserved legitimate registrations while removing obvious fraud.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};
import {
  FiUser,
  FiMail,
  FiGlobe,
  FiBook,
  FiHeart,
  FiCheck,
  FiAlertCircle,
  FiLoader,
  FiUsers,
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
  birthDate: string;
  motivation: string;
  ambassadorCode?: string;
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
    birthDate: '',
    motivation: '',
    ambassadorCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if there's an ambassador code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const ambassadorCode = urlParams.get('ref');
    if (ambassadorCode) {
      setFormData(prev => ({ ...prev, ambassadorCode }));
    }
    
    // Run cleanup on page load to remove any suspicious registrations
    cleanupSuspiciousRegistrations();
  }, []);

  // Device check effect
  useEffect(() => {
    const checkDeviceStatus = async () => {
      const deviceId = await generateDeviceFingerprint();
      console.log('🔍 Generated Device ID:', deviceId);
      
      // Update visual indicators
      const deviceIdElement = document.getElementById('deviceId');
      const deviceStatusElement = document.getElementById('deviceStatus');
      
      if (deviceIdElement) {
        deviceIdElement.textContent = deviceId.substring(0, 12) + '...';
      }
      
      const registeredDevices = JSON.parse(localStorage.getItem('registeredDevices') || '[]');
      console.log('📱 Registered Devices:', registeredDevices);
      
      const isRegistered = registeredDevices.includes(deviceId);
      console.log('✅ Is Device Already Registered?', isRegistered);
      
      setIsDeviceRegistered(isRegistered);
      
      if (isRegistered) {
        console.log('🚫 Device already registered - showing error');
        if (deviceStatusElement) {
          deviceStatusElement.textContent = 'Already registered - Registration blocked';
          deviceStatusElement.className = 'text-red-600 dark:text-red-400 font-semibold';
        }
        setErrorMessage('This device has already been used to register for the competition. Only one registration per device is allowed to prevent fraud.');
      } else {
        if (deviceStatusElement) {
          deviceStatusElement.textContent = 'Available for registration';
          deviceStatusElement.className = 'text-green-600 dark:text-green-400 font-semibold';
        }
      }
    };

    checkDeviceStatus();
  }, []);

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
    'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark',
    'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
    'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
    'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
    'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
    'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
    'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
    'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
    'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
    'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  const gradeLevels = [
    'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
    'University Year 1', 'University Year 2', 'University Year 3', 'University Year 4+'
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
      const value = formData[field as keyof RegistrationData];
      if (!value || (typeof value === 'string' && !value.trim())) {
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

    // Check if this device has already registered using simple approach
    if (isDeviceRegistered) {
      setErrorMessage('This device has already been used to register for the competition. Only one registration per device is allowed to prevent fraud.');
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
            birth_date: formData.birthDate,
            motivation: formData.motivation
          }
        ]);

      if (error) {
        throw error;
      }

      // Record this device as having registered
      recordDeviceRegistration(formData);

      // If there's an ambassador code, validate and update the ambassador's referral count
      if (formData.ambassadorCode) {
        const isValidReferral = await validateRegistrationForReferral(formData, formData.ambassadorCode);
        
        if (isValidReferral) {
          await updateAmbassadorReferralCount(
            formData.ambassadorCode, 
            `${formData.firstName} ${formData.lastName}`, 
            formData.email
          );
          
          // Track this registration with ambassador code in localStorage
          const registrationsWithReferrals = JSON.parse(localStorage.getItem('registrationsWithReferrals') || '[]');
          registrationsWithReferrals.push({
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            ambassadorCode: formData.ambassadorCode,
            registrationDate: new Date().toISOString()
          });
          localStorage.setItem('registrationsWithReferrals', JSON.stringify(registrationsWithReferrals));
        } else {
          // Invalid referral detected - still register the person but don't count the referral
          console.log('Registration completed but referral not counted due to validation failure');
        }
      }

      setSubmitStatus('success');
      
      // Mark this device as registered
      const deviceId = await generateDeviceFingerprint();
      const registeredDevices = JSON.parse(localStorage.getItem('registeredDevices') || '[]');
      if (!registeredDevices.includes(deviceId)) {
        registeredDevices.push(deviceId);
        localStorage.setItem('registeredDevices', JSON.stringify(registeredDevices));
        console.log('✅ Device marked as registered:', deviceId);
      }
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        school: '',
        gradeLevel: '',
        birthDate: '',
        motivation: '',
        ambassadorCode: ''
      });

      // Refresh page after successful registration
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
            {/* Show blocked message if device is registered, otherwise show form */}
            {isDeviceRegistered ? (
              <div className="text-center py-16">
                <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Already registered - Registration blocked
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  This device has already been used to register for the competition. Only one registration per device is allowed to prevent fraud.
                </p>
              </div>
            ) : (
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

              {/* Birth Date */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-xl shadow-lg">
                    <FiUser className="w-5 h-5 text-phiga-dark" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-accent to-phiga-main bg-clip-text text-transparent">Personal Details</span>
                </h2>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white shadow-lg hover:shadow-xl"
                  />
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

              {/* Ambassador Code */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-xl shadow-lg">
                    <FiUsers className="w-5 h-5 text-phiga-dark" />
                  </div>
                  <span className="bg-gradient-to-r from-phiga-accent to-phiga-main bg-clip-text text-transparent">Referral</span>
                </h2>
                <div>
                  <label htmlFor="ambassadorCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Ambassador Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="ambassadorCode"
                    name="ambassadorCode"
                    value={formData.ambassadorCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-phiga-accent/30 focus:border-phiga-accent hover:border-phiga-accent/50 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl"
                    placeholder="Enter ambassador code if you were referred"
                  />
                  {formData.ambassadorCode && (
                    <p className="mt-2 text-sm text-phiga-main dark:text-phiga-accent">
                      ✓ Ambassador code applied! Your registration will count towards their referrals.
                    </p>
                  )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;