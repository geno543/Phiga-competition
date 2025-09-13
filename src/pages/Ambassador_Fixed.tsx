import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';


const Ambassador: React.FC = () => {
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
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState<'welcome' | 'register' | 'login' | 'dashboard'>('welcome');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {

    // Check if user is already logged in and verify they still exist in database
    const currentUser = localStorage.getItem('currentAmbassador');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      
      // Verify ambassador still exists in database
      const verifyAmbassador = async () => {
        try {
          const { data: ambassador, error } = await supabase
            .from('ambassadors')
            .select('*')
            .eq('email', userData.email)
            .eq('ambassador_code', userData.ambassadorCode)
            .single();
          
          if (error || !ambassador) {
            // Ambassador no longer exists in database, clear localStorage
            console.log('Ambassador no longer exists in database, logging out');
            localStorage.removeItem('currentAmbassador');
            setCurrentView('welcome');
            return;
          }
          
          // Ambassador exists, proceed with login
          setAmbassadorData(userData);
          setCurrentView('dashboard');
        } catch (error) {
          console.error('Error verifying ambassador:', error);
          // On error, clear localStorage to be safe
          localStorage.removeItem('currentAmbassador');
          setCurrentView('welcome');
        }
      };
      
      verifyAmbassador();
    }

    // Load leaderboard data
    loadLeaderboardData();
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
      
      try {
        // Check if ambassador already exists
        const { data: existingAmbassador } = await supabase
          .from('ambassadors')
          .select('*')
          .eq('email', ambassadorData.email)
          .single();
        
        if (existingAmbassador) {
          setAuthError('An ambassador with this email already exists. Please login instead.');
          return;
        }
        
        const code = generateAmbassadorCode(ambassadorData.name, ambassadorData.email);
        
        // Insert new ambassador into database
        const { data: newAmbassador, error } = await supabase
          .from('ambassadors')
          .insert([
            {
              name: ambassadorData.name,
              email: ambassadorData.email,
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
          return;
        }
        
        // Set as current ambassador
        const newAmbassadorData = {
          ...ambassadorData,
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
      } catch (error) {
        console.error('Registration error:', error);
        setAuthError('An error occurred during registration. Please try again.');
      }
    } else {
      setAuthError('Please fill in all required fields.');
    }
  };

  // Handle login
  const handleLogin = async () => {
    setAuthError('');
    
    try {
      console.log('🔍 Login attempt:', { email: loginData.email });
      
      // Find ambassador in database
      const { data: ambassador, error } = await supabase
        .from('ambassadors')
        .select('*')
        .eq('email', loginData.email)
        .eq('password', loginData.password) // In production, use proper password hashing
        .single();
      
      console.log('🔍 Database query result:', { ambassador, error });
      
      if (error || !ambassador) {
        console.log('❌ Login failed, checking if email exists...');
        
        // Check if email exists
        const { data: emailCheck } = await supabase
          .from('ambassadors')
          .select('email')
          .eq('email', loginData.email)
          .single();
        
        if (emailCheck) {
          setAuthError('Incorrect password. Please try again.');
        } else {
          setAuthError('Email not found. Please check your email or register first.');
        }
        return;
      }
      
      // Get referral count from database
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
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An error occurred during login. Please try again.');
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
              <div className="space-y-4">
                <button
                  onClick={() => setCurrentView('login')}
                  className="w-full bg-phiga-accent hover:bg-phiga-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Login as Ambassador
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="w-full bg-phiga-main hover:bg-phiga-main/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Register as Ambassador
                </button>
              </div>
            )}

            {currentView === 'login' && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleLogin}
                  className="w-full bg-phiga-accent hover:bg-phiga-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentView('welcome')}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Back
                </button>
              </div>
            )}

            {currentView === 'register' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={ambassadorData.name}
                  onChange={(e) => setAmbassadorData({...ambassadorData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={ambassadorData.email}
                  onChange={(e) => setAmbassadorData({...ambassadorData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={ambassadorData.password}
                  onChange={(e) => setAmbassadorData({...ambassadorData, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="School (Optional)"
                  value={ambassadorData.school}
                  onChange={(e) => setAmbassadorData({...ambassadorData, school: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleRegisterAsAmbassador}
                  className="w-full bg-phiga-main hover:bg-phiga-main/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Register
                </button>
                <button
                  onClick={() => setCurrentView('welcome')}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Back
                </button>
              </div>
            )}

            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome, {ambassadorData.name}!
                  </h2>
                  <div className="bg-phiga-accent/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Referral Code:</p>
                    <p className="text-lg font-mono font-bold text-phiga-accent">{ambassadorData.ambassadorCode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ambassadorData.referralCount}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Referrals</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">#{ambassadorData.ranking}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Ranking</div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Ambassadors</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {leaderboardData.slice(0, 5).map((ambassador: any, index: number) => (
                      <div key={ambassador.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          #{index + 1} {ambassador.name}
                        </span>
                        <span className="text-sm font-semibold text-phiga-accent">
                          {ambassador.referrals} referrals
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
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
