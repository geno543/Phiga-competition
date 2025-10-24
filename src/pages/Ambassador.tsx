import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiCopy, 
  FiMail, 
  FiStar,
  FiCheck,
  FiGift,
  FiTarget,
  FiUserPlus,
  FiLogIn,
  FiLogOut,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

const Ambassador: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ambassadorData, setAmbassadorData] = useState({
    name: '',
    email: '',
    password: '',
    school: '',
    ambassadorCode: '',
    referralCount: 0,
    totalRegistrations: 0,
    ranking: 0
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [copied, setCopied] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState<'welcome' | 'register' | 'login' | 'dashboard'>('welcome');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentAmbassador');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setAmbassadorData(userData);
      setCurrentView('dashboard');
    }

    // Load leaderboard data
    loadLeaderboardData();

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Load leaderboard data from database
  const loadLeaderboardData = async () => {
    try {
      const { data: ambassadors, error } = await supabase
        .from('ambassadors')
        .select('*');
      
      if (error) {
        console.error('Error loading leaderboard:', error);
        return;
      }
      
      // Get referral counts for each ambassador
      const ambassadorsWithReferrals = await Promise.all(
        (ambassadors || []).map(async (ambassador: any) => {
          const { data: referrals } = await supabase
            .from('referrals')
            .select('id')
            .eq('ambassador_code', ambassador.ambassador_code);
          
          return {
            ...ambassador,
            referrals: referrals ? referrals.length : 0
          };
        })
      );
      
      // Sort by referral count and assign rankings
      const sortedAmbassadors = ambassadorsWithReferrals
        .sort((a: any, b: any) => b.referrals - a.referrals)
        .map((ambassador: any, index: number) => ({
          ...ambassador,
          ranking: index + 1
        }));
      
      setLeaderboardData(sortedAmbassadors);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  };

  // Generate ambassador code
  const generateAmbassadorCode = (name: string, email: string) => {
    const nameCode = name.split(' ').map(n => n.substring(0, 2)).join('').toUpperCase();
    const emailCode = email.split('@')[0].substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${nameCode}${emailCode}${randomNum}`;
  };

  // Handle ambassador registration
  const handleRegisterAsAmbassador = async () => {
    if (ambassadorData.name && ambassadorData.email && ambassadorData.password) {
      setAuthError('');
      setIsLoading(true);
      
      try {
        // Normalize email to lowercase
        const normalizedEmail = ambassadorData.email.toLowerCase().trim();
        
        // Check if ambassador already exists
        const { data: existingAmbassador } = await supabase
          .from('ambassadors')
          .select('*')
          .eq('email', normalizedEmail)
          .single();
        
        if (existingAmbassador) {
          setAuthError('An ambassador with this email already exists. Please login instead.');
          setIsLoading(false);
          return;
        }
        
        const code = generateAmbassadorCode(ambassadorData.name, normalizedEmail);
        
        // Insert new ambassador into database
        const { data: newAmbassador, error } = await supabase
          .from('ambassadors')
          .insert([
            {
              name: ambassadorData.name,
              email: normalizedEmail,
              password: ambassadorData.password, // In production, hash this password
              school: ambassadorData.school,
              ambassador_code: code,
              referral_count: 0,
              total_registrations: Math.floor(Math.random() * 50) + 10,
              ranking: Math.floor(Math.random() * 100) + 1
            }
          ])
          .select()
          .single();
        
        if (error) {
          setAuthError('Failed to register ambassador. Please try again.');
          console.error('Registration error:', error);
          setIsLoading(false);
          return;
        }
        
        // Set as current ambassador
        const newAmbassadorData = {
          ...ambassadorData,
          email: normalizedEmail,
          ambassadorCode: code,
          referrals: 0,
          ranking: newAmbassador.ranking,
          totalRegistrations: newAmbassador.total_registrations,
          createdAt: newAmbassador.created_at
        };
        
        localStorage.setItem('currentAmbassador', JSON.stringify(newAmbassadorData));
        setAmbassadorData(newAmbassadorData);
        setCurrentView('dashboard');
        loadLeaderboardData(); // Refresh leaderboard
        setIsLoading(false);
      } catch (error) {
        console.error('Registration error:', error);
        setAuthError('An error occurred during registration. Please try again.');
        setIsLoading(false);
      }
    } else {
      setAuthError('Please fill in all required fields.');
    }
  };

  // Handle login
  const handleLogin = async () => {
    setAuthError('');
    setIsLoading(true);
    
    try {
      // Normalize email to lowercase
      const normalizedEmail = loginData.email.toLowerCase().trim();
      
      console.log('🔍 Login attempt:', { email: normalizedEmail });
      
      // Find ambassador in database
      const { data: ambassador, error } = await supabase
        .from('ambassadors')
        .select('*')
        .eq('email', normalizedEmail)
        .eq('password', loginData.password) // In production, use proper password hashing
        .single();
      
      console.log('🔍 Database query result:', { ambassador, error });
      
        if (error || !ambassador) {
          console.log('❌ Login failed, checking if email exists...');
          
          // Check if email exists
          const { data: emailCheck } = await supabase
            .from('ambassadors')
            .select('email')
            .eq('email', normalizedEmail)
            .single();
          
          if (emailCheck) {
            setAuthError('Incorrect password. Please try again.');
          } else {
            setAuthError('Email not found. Please check your email or register first.');
          }
          setIsLoading(false);
          return;
        }      // Get referral count from database
      const { data: referrals } = await supabase
        .from('referrals')
        .select('*')
        .eq('ambassador_code', ambassador.ambassador_code);
      
      const referralCount = referrals ? referrals.length : 0;
      
      const updatedAmbassador = {
        name: ambassador.name,
        email: ambassador.email,
        password: ambassador.password,
        school: ambassador.school,
        ambassadorCode: ambassador.ambassador_code,
        referralCount: referralCount,
        totalRegistrations: ambassador.total_registrations,
        ranking: ambassador.ranking,
        createdAt: ambassador.created_at
      };
      
      setAmbassadorData(updatedAmbassador);
      localStorage.setItem('currentAmbassador', JSON.stringify(updatedAmbassador));
      setCurrentView('dashboard');
      loadLeaderboardData(); // Refresh leaderboard
      setIsLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentAmbassador');
    setCurrentView('welcome');
    setAmbassadorData({
      name: '',
      email: '',
      password: '',
      school: '',
      ambassadorCode: '',
      referralCount: 0,
      totalRegistrations: 0,
      ranking: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Simple Login/Register Interface */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Ambassador Program
            </h1>

            {authError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{authError}</p>
              </div>
            )}

            {currentView === 'welcome' && (
              <div className="space-y-6">
                <button
                  onClick={() => setCurrentView('login')}
                  className="w-full bg-gradient-to-r from-phiga-accent to-phiga-main hover:from-phiga-accent/90 hover:to-phiga-main/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FiLogIn className="text-xl" />
                  Login as Ambassador
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="w-full bg-gradient-to-r from-phiga-main to-phiga-accent hover:from-phiga-main/90 hover:to-phiga-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FiUserPlus className="text-xl" />
                  Register as Ambassador
                </button>
              </div>
            )}

            {currentView === 'login' && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full p-4 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-phiga-main to-phiga-accent hover:from-phiga-main/90 hover:to-phiga-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-xl" />
                      Login as Ambassador
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCurrentView('welcome')}
                  disabled={isLoading}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors py-2 disabled:opacity-50"
                >
                  Back
                </button>
              </div>
            )}

            {currentView === 'register' && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={ambassadorData.name}
                    onChange={(e) => setAmbassadorData({...ambassadorData, name: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={ambassadorData.email}
                    onChange={(e) => setAmbassadorData({...ambassadorData, email: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={ambassadorData.password}
                    onChange={(e) => setAmbassadorData({...ambassadorData, password: e.target.value})}
                    className="w-full p-4 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="School (Optional)"
                    value={ambassadorData.school}
                    onChange={(e) => setAmbassadorData({...ambassadorData, school: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-phiga-main dark:focus:border-phiga-accent focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleRegisterAsAmbassador}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-phiga-main to-phiga-accent hover:from-phiga-main/90 hover:to-phiga-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-xl" />
                      Register as Ambassador
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCurrentView('welcome')}
                  disabled={isLoading}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors py-2 disabled:opacity-50"
                >
                  Back
                </button>
              </div>
            )}

            {currentView === 'dashboard' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Welcome, {ambassadorData.name}! <HiSparkles className="inline text-phiga-accent" />
                  </h2>
                  <div className="bg-gradient-to-r from-phiga-accent/20 to-phiga-main/20 backdrop-blur-sm p-6 rounded-xl border border-phiga-accent/30 shadow-xl">
                    <p className="text-sm text-gray-300 mb-2">Your Referral Code:</p>
                    <div className="flex items-center justify-center gap-3">
                      <p className="text-2xl font-mono font-bold text-phiga-accent bg-white/10 px-4 py-2 rounded-lg">
                        {ambassadorData.ambassadorCode}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(ambassadorData.ambassadorCode);
                          // Could add a toast notification here
                        }}
                        className="p-2 bg-phiga-accent hover:bg-phiga-accent/80 text-white rounded-lg transition-colors"
                        title="Copy code"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-xl text-center border border-blue-400/30 shadow-lg">
                    <FiUsers className="text-3xl text-blue-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-400">{ambassadorData.referralCount}</div>
                    <div className="text-sm text-blue-300">Referrals</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-6 rounded-xl text-center border border-green-400/30 shadow-lg">
                    <FiAward className="text-3xl text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-400">#{ambassadorData.ranking}</div>
                    <div className="text-sm text-green-300">Ranking</div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FiTrendingUp className="text-phiga-accent" />
                    Top Ambassadors
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {leaderboardData.slice(0, 5).map((ambassador: any, index: number) => (
                      <div key={ambassador.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-gray-200 flex items-center gap-2">
                          {index === 0 && <FiStar className="text-yellow-400" />}
                          {index === 1 && <FiStar className="text-gray-400" />}
                          {index === 2 && <FiStar className="text-amber-600" />}
                          #{index + 1} {ambassador.name}
                        </span>
                        <span className="text-phiga-accent font-semibold">
                          {ambassador.referrals} referrals
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FiLogOut className="text-xl" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambassador;
