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
  FiUserPlus,
  FiLogIn,
  FiLogOut,
  FiEye,
  FiEyeOff,
  FiShare2,
  FiZap,
  FiShield,
  FiExternalLink,
  FiBarChart,
  FiActivity
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

// Interface definitions
interface Analytics {
  totalReferrals: number;
  thisMonth: number;
  thisWeek: number;
  avgPerMonth: number;
  rankChange: number;
  conversionRate: number;
  totalEarnings: number;
}

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
  const [copied, setCopied] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState<'welcome' | 'register' | 'login' | 'dashboard'>('welcome');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard'>('overview');
  const [analytics, setAnalytics] = useState<Analytics>({
    totalReferrals: 0,
    thisMonth: 0,
    thisWeek: 0,
    avgPerMonth: 0,
    rankChange: 0,
    conversionRate: 0,
    totalEarnings: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Share via email function
  const shareViaEmail = () => {
    const referralLink = `${window.location.origin}/?ref=${ambassadorData.ambassadorCode}`;
    const subject = encodeURIComponent('Join PHIGA - Physics International Gamefield Adventure!');
    const body = encodeURIComponent(
      `Hey everyone, I wanted to share a great physics opportunity for anyone who loves real, think-on-your-feet problem solving:\n\nPHIGA — Physics International Gamefield Adventure\nA global, free competition that tests real understanding (not memorization). Each problem starts with a short everyday-scenario video and asks you to explain/solve what's happening using physics.\n\nKEY DETAILS\n1) Format: 30 video-based questions in one session; total duration 4 hours; held in October (time on the site).\n2) Tracks: Grade 10 / Grade 11 / Grade 12 / Open (fair competition by level).\n3) Tools: Calculator and quick lookup of constants/formulas are okay. AI tools (e.g., ChatGPT), coding solvers, or outside help are not allowed (cheating = disqualification).\n4) Scoring: First-try correct = 5 points. Each wrong attempt reduces the max by 1 (minimum 1 if solved).\n5) Recognition: Global leaderboard (hidden for the last 30 minutes), digital certificates, and achievement badges (great for LinkedIn).\n6) Who can join: Anyone, from anywhere. You just need a computer, internet, and a problem-solving mindset.\n\nREGISTER\n${referralLink}\n\nUPDATES & SUPPORT\nInstagram: https://www.instagram.com/quantastra.1/\nWhatsApp Channel: https://whatsapp.com/channel/0029VbBc4vr4dTnAWVArKJ37\nWhatsApp Support: https://chat.whatsapp.com/LZJ4BlUKtr3COhGSrMCtXi?mode=ems_copy_c\nTelegram Group: https://t.me/+EKKS9HqRyN03ZmU0`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Share on social media function
  const shareOnSocial = () => {
    const referralLink = `${window.location.origin}/?ref=${ambassadorData.ambassadorCode}`;
    const text = encodeURIComponent(
      `Hey everyone, I wanted to share a great physics opportunity for anyone who loves real, think-on-your-feet problem solving: PHIGA — Physics International Gamefield Adventure. A global, free competition that tests real understanding (not memorization). Register: ${referralLink} #PHIGA #Physics #Competition`
    );
    
    // Try to use Web Share API if available, otherwise fallback to Twitter
    if (navigator.share) {
      navigator.share({
        title: 'Join PHIGA - Physics Competition',
        text: `Hey everyone, I wanted to share a great physics opportunity: PHIGA — Physics International Gamefield Adventure. A global, free competition that tests real understanding. Use my code: ${ambassadorData.ambassadorCode}`,
        url: referralLink
      }).catch(console.error);
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    }
  };

  // Copy full message function
  const copyFullMessage = () => {
    const referralLink = `${window.location.origin}/?ref=${ambassadorData.ambassadorCode}`;
    const fullMessage = `Hey everyone, I wanted to share a great physics opportunity for anyone who loves real, think-on-your-feet problem solving:\n\nPHIGA — Physics International Gamefield Adventure\nA global, free competition that tests real understanding (not memorization). Each problem starts with a short everyday-scenario video and asks you to explain/solve what's happening using physics.\n\nKEY DETAILS\n1) Format: 30 video-based questions in one session; total duration 4 hours; held in October (time on the site).\n2) Tracks: Grade 10 / Grade 11 / Grade 12 / Open (fair competition by level).\n3) Tools: Calculator and quick lookup of constants/formulas are okay. AI tools (e.g., ChatGPT), coding solvers, or outside help are not allowed (cheating = disqualification).\n4) Scoring: First-try correct = 5 points. Each wrong attempt reduces the max by 1 (minimum 1 if solved).\n5) Recognition: Global leaderboard (hidden for the last 30 minutes), digital certificates, and achievement badges (great for LinkedIn).\n6) Who can join: Anyone, from anywhere. You just need a computer, internet, and a problem-solving mindset.\n\nREGISTER\n${referralLink}\n\nUPDATES & SUPPORT\nInstagram: https://www.instagram.com/quantastra.1/\nWhatsApp Channel: https://whatsapp.com/channel/0029VbBc4vr4dTnAWVArKJ37\nWhatsApp Support: https://chat.whatsapp.com/LZJ4BlUKtr3COhGSrMCtXi?mode=ems_copy_c\nTelegram Group: https://t.me/+EKKS9HqRyN03ZmU0`;
    
    copyToClipboard(fullMessage);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Component is visible
        }
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

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
          
          // Initialize analytics and achievements
          initializeAnalytics(userData);
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

    // Set up periodic refresh for dashboard data (every 30 seconds)
    const refreshInterval = setInterval(() => {
      if (currentView === 'dashboard') {
        loadLeaderboardData();
      }
    }, 30000);

    return () => {
      sections.forEach(section => observer.unobserve(section));
      clearInterval(refreshInterval);
    };
  }, [currentView]);

  // Initialize analytics data
  const initializeAnalytics = (userData: any) => {
    // Mock analytics data - in real app, fetch from database
    setAnalytics({
      totalReferrals: userData.referralCount || 0,
      thisMonth: Math.max(0, (userData.referralCount || 0) - Math.floor(Math.random() * 5)),
      thisWeek: Math.max(0, Math.floor((userData.referralCount || 0) / 4)),
      conversionRate: userData.referralCount > 0 ? Math.min(100, 60 + Math.random() * 30) : 0,
      avgPerMonth: userData.referralCount > 0 ? (userData.referralCount || 0) / 3 : 0,
      rankChange: userData.ranking ? Math.floor(Math.random() * 10) - 5 : 0,
      totalEarnings: (userData.referralCount || 0) * 25 // $25 per referral
    });
  };

  // Load leaderboard data from database
  const loadLeaderboardData = async () => {
    setIsRefreshing(true);
    try {
      const { data: ambassadors, error } = await supabase
        .from('ambassadors')
        .select('*');
      
      if (error) {
        console.error('Error loading leaderboard:', error);
        setIsRefreshing(false);
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
      
      // Update current user's ranking if they're logged in
      const currentUser = localStorage.getItem('currentAmbassador');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        const currentUserInLeaderboard = sortedAmbassadors.find(
          (amb: any) => amb.email === userData.email
        );
        
        if (currentUserInLeaderboard) {
          const updatedUserData = {
            ...userData,
            ranking: currentUserInLeaderboard.ranking,
            referralCount: currentUserInLeaderboard.referrals
          };
          
          setAmbassadorData(updatedUserData);
          localStorage.setItem('currentAmbassador', JSON.stringify(updatedUserData));
        }
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setIsRefreshing(false);
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
        
        // Initialize new features
        initializeAnalytics(newAmbassadorData);
        
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
      
      // Initialize new features
      initializeAnalytics(updatedAmbassador);
      
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
    <div className="min-h-screen bg-gradient-to-br from-phiga-light via-white to-phiga-light dark:from-phiga-dark dark:via-phiga-main dark:to-phiga-accent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-phiga-accent/30 to-phiga-main/30 dark:from-phiga-accent dark:to-phiga-light rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-phiga-main/30 to-phiga-accent/30 dark:from-phiga-main dark:to-phiga-accent rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-phiga-accent/20 to-phiga-main/20 dark:from-phiga-accent dark:to-phiga-main rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Simple Login/Register Interface */}
        <div className="container mx-auto px-4 py-20">
          {/* Ambassador Program Information Section */}
          {currentView === 'welcome' && (
            <div className="mb-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-phiga-main dark:text-white mb-4 flex items-center justify-center gap-3">
                  <HiSparkles className="text-phiga-accent text-5xl" />
                  Ambassador Program
                </h1>
                <p className="text-xl text-phiga-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  Join our elite ambassador program and earn amazing rewards while helping physics students succeed worldwide
                </p>
              </div>

              {/* Why Become an Ambassador */}
              <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-phiga-main dark:text-white text-center mb-12">Why Become an Ambassador?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-phiga-gray-200 dark:border-phiga-gray-700 text-center shadow-lg">
                    <FiAward className="text-4xl text-phiga-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">AoPS Coupons</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300 mb-4">Top 1 ambassador wins educational coupons</p>
                    <div className="text-phiga-accent font-semibold">$25 AoPS Coupon</div>
                  </div>
                  <div className="bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-phiga-gray-200 dark:border-phiga-gray-700 text-center shadow-lg">
                    <FiGift className="text-4xl text-phiga-main mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">PhysOlymp Coupons</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300 mb-4">Top 3 ambassadors win premium coupons</p>
                    <div className="text-phiga-main font-semibold">$80 PhysOlymp Coupons</div>
                  </div>
                  <div className="bg-white/80 dark:bg-phiga-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-phiga-gray-200 dark:border-phiga-gray-700 text-center shadow-lg">
                    <FiUsers className="text-4xl text-phiga-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">Make Impact</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300 mb-4">Help students discover amazing physics opportunities</p>
                    <div className="text-phiga-accent font-semibold">Change Lives</div>
                  </div>
                </div>
              </div>

              {/* Prize Structure */}
              <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-phiga-main dark:text-white text-center mb-12">Ambassador Prizes</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Top 1 Prize */}
                  <div className="bg-gradient-to-br from-phiga-accent/20 to-phiga-main/20 dark:from-phiga-accent/20 dark:to-phiga-main/20 backdrop-blur-sm rounded-xl p-8 border border-phiga-accent/30 dark:border-phiga-accent/30 text-center relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 bg-phiga-accent text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
                      #1
                    </div>
                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <img 
                        src="/AoPS.png" 
                        alt="Art of Problem Solving"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-phiga-main dark:text-white mb-3">Top 1 Ambassador</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300 mb-6">Best performing ambassador</p>
                    <div className="space-y-3">
                      <div className="bg-phiga-accent/20 dark:bg-phiga-accent/20 rounded-lg p-4">
                        <div className="text-phiga-accent font-bold text-lg">AoPS Coupons</div>
                        <div className="text-phiga-main dark:text-white font-semibold">1 × $25</div>
                        <div className="text-phiga-gray-600 dark:text-gray-300 text-sm">Art of Problem Solving</div>
                      </div>
                      <div className="text-phiga-accent font-semibold">Total Value: $25</div>
                    </div>
                  </div>

                  {/* Top 2 Prize */}
                  <div className="bg-gradient-to-br from-phiga-main/20 to-phiga-dark/20 dark:from-phiga-main/20 dark:to-phiga-dark/20 backdrop-blur-sm rounded-xl p-8 border border-phiga-main/30 dark:border-phiga-main/30 text-center relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 bg-phiga-main text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
#2-3
                    </div>
                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <img 
                        src="/physolymp.png" 
                        alt="Physics Olympiad Guide"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-phiga-main dark:text-white mb-3">Top 3 Ambassadors</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300 mb-6">Best performing ambassadors</p>
                    <div className="space-y-3">
                      <div className="bg-phiga-main/20 dark:bg-phiga-main/20 rounded-lg p-4">
                        <div className="text-phiga-main font-bold text-lg">PhysOlymp Coupons</div>
                        <div className="text-phiga-main dark:text-white font-semibold">3 × $80</div>
                        <div className="text-phiga-gray-600 dark:text-gray-300 text-sm">Physics Olympiad Guide</div>
                      </div>
                      <div className="text-phiga-main font-semibold">Total Value: $240</div>
                    </div>
                  </div>
                </div>

                {/* Additional Benefits */}
                <div className="mt-12 bg-gradient-to-r from-phiga-accent/20 to-phiga-main/20 dark:from-phiga-accent/30 dark:to-phiga-main/30 backdrop-blur-sm rounded-xl p-8 border border-phiga-accent/30 dark:border-phiga-accent/50">
                  <h3 className="text-2xl font-bold text-phiga-main dark:text-white text-center mb-6">Additional Benefits for All Ambassadors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <FiShield className="text-3xl text-phiga-accent mx-auto mb-2" />
                      <h4 className="text-phiga-main dark:text-white font-semibold mb-1">Digital Certificate</h4>
                      <p className="text-phiga-gray-600 dark:text-gray-300 text-sm">Official recognition</p>
                    </div>
                    <div className="text-center">
                      <FiZap className="text-3xl text-phiga-accent mx-auto mb-2" />
                      <h4 className="text-phiga-main dark:text-white font-semibold mb-1">Early Access</h4>
                      <p className="text-phiga-gray-600 dark:text-gray-300 text-sm">Be first to try new features</p>
                    </div>
                    <div className="text-center">
                      <FiUsers className="text-3xl text-phiga-accent mx-auto mb-2" />
                      <h4 className="text-phiga-main dark:text-white font-semibold mb-1">Exclusive Community</h4>
                      <p className="text-phiga-gray-600 dark:text-gray-300 text-sm">Connect with top performers</p>
                    </div>
                    <div className="text-center">
                      <FiTrendingUp className="text-3xl text-phiga-accent mx-auto mb-2" />
                      <h4 className="text-phiga-main dark:text-white font-semibold mb-1">Career Opportunities</h4>
                      <p className="text-phiga-gray-600 dark:text-gray-300 text-sm">Network and grow</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="max-w-5xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-phiga-main dark:text-white text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-phiga-accent/20 dark:bg-phiga-accent/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-phiga-accent">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">Register</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300">Sign up as an ambassador and get your unique referral code</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-phiga-accent/20 dark:bg-phiga-accent/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-phiga-accent">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">Share</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300">Share your code with friends, classmates, and physics students</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-phiga-accent/20 dark:bg-phiga-accent/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-phiga-accent">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-phiga-main dark:text-white mb-3">Earn</h3>
                    <p className="text-phiga-gray-600 dark:text-gray-300">Compete for AoPS and PhysOlymp coupons based on your performance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`${currentView === 'welcome' ? 'max-w-md' : 'max-w-6xl'} mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8`}>
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
                {/* Header with Welcome Message */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <HiSparkles className="text-phiga-accent" />
                    Welcome, {ambassadorData.name}!
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Ambassador • Rank #{ambassadorData.ranking}
                  </p>
                  <button
                    onClick={loadLeaderboardData}
                    disabled={isRefreshing}
                    className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-300 text-sm mb-6 ${
                      isRefreshing 
                        ? 'bg-gray-500/20 text-gray-400 border-gray-400/30 cursor-not-allowed' 
                        : 'bg-phiga-accent/20 hover:bg-phiga-accent/30 text-phiga-accent border-phiga-accent/30'
                    }`}
                  >
                    <FiActivity className={`text-sm ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                  </button>
                  
                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30">
                      <FiUsers className="text-2xl text-blue-400 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-blue-400">{analytics.totalReferrals}</div>
                      <div className="text-xs text-blue-300">Total Referrals</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm p-4 rounded-xl border border-green-400/30">
                      <FiTrendingUp className="text-2xl text-green-400 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-green-400">#{ambassadorData.ranking}</div>
                      <div className="text-xs text-green-300">Current Rank</div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: FiBarChart },
                    { id: 'leaderboard', label: 'Leaderboard', icon: FiTrendingUp }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-phiga-accent text-white shadow-lg'
                            : 'bg-white/10 dark:bg-gray-700/50 text-phiga-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'
                        }`}
                      >
                        <Icon size={16} />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Referral Code Section */}
                    <div className="bg-gradient-to-r from-phiga-accent/20 to-phiga-main/20 dark:from-phiga-accent/30 dark:to-phiga-main/30 backdrop-blur-sm p-6 rounded-xl border border-phiga-accent/30 dark:border-phiga-accent/50 shadow-xl">
                      <h3 className="text-lg font-semibold text-phiga-main dark:text-white mb-3 flex items-center gap-2">
                        <FiShare2 className="text-phiga-accent" />
                        Your Referral Tools
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-phiga-gray-600 dark:text-gray-300 mb-2">Referral Code:</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white/10 dark:bg-gray-700/50 p-3 rounded-lg border border-white/20 dark:border-gray-600/50">
                              <code className="text-phiga-accent font-mono font-bold text-lg">
                                {ambassadorData.ambassadorCode}
                              </code>
                            </div>
                            <button
                              onClick={() => copyToClipboard(ambassadorData.ambassadorCode)}
                              className="p-3 bg-phiga-accent hover:bg-phiga-accent/80 text-white rounded-lg transition-colors"
                              title="Copy code"
                            >
                              {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-phiga-gray-600 dark:text-gray-300 mb-2">Referral Link:</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white/10 dark:bg-gray-700/50 p-3 rounded-lg border border-white/20 dark:border-gray-600/50">
                              <code className="text-phiga-gray-600 dark:text-gray-300 text-sm break-all">
                                {window.location.origin}/?ref={ambassadorData.ambassadorCode}
                              </code>
                            </div>
                            <button
                              onClick={() => copyToClipboard(`${window.location.origin}/?ref=${ambassadorData.ambassadorCode}`)}
                              className="p-3 bg-phiga-main hover:bg-phiga-main/80 text-white rounded-lg transition-colors"
                              title="Copy link"
                            >
                              <FiExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <button 
                              onClick={shareViaEmail}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <FiMail size={16} />
                              Share via Email
                            </button>
                            <button 
                              onClick={shareOnSocial}
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <FiShare2 size={16} />
                              Share on Social
                            </button>
                          </div>
                          <button 
                            onClick={copyFullMessage}
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <FiCopy size={16} />
                            Copy Full Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}



                {activeTab === 'leaderboard' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Global Leaderboard</h3>
                      <p className="text-gray-300">See how you rank against other ambassadors</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                      <div className="space-y-3">
                        {leaderboardData.slice(0, 10).map((ambassador: any, index: number) => {
                          const isCurrentUser = ambassador.email === ambassadorData.email;
                          return (
                            <div 
                              key={ambassador.id} 
                              className={`flex justify-between items-center p-4 rounded-lg border transition-all duration-300 ${
                                isCurrentUser 
                                  ? 'bg-phiga-accent/20 border-phiga-accent/50 shadow-lg' 
                                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                  index === 0 ? 'bg-yellow-500 text-yellow-900' :
                                  index === 1 ? 'bg-gray-400 text-gray-900' :
                                  index === 2 ? 'bg-amber-600 text-amber-100' :
                                  'bg-white/20 text-gray-300'
                                }`}>
                                  {index === 0 && <FiStar size={16} />}
                                  {index === 1 && <FiStar size={16} />}
                                  {index === 2 && <FiStar size={16} />}
                                  {index > 2 && (index + 1)}
                                </div>
                                <div>
                                  <span className={`font-medium ${isCurrentUser ? 'text-phiga-accent' : 'text-gray-200'}`}>
                                    {ambassador.name}
                                    {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                                  </span>
                                  <p className="text-xs text-gray-400">{ambassador.school || 'School not specified'}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-phiga-accent font-semibold">
                                  {ambassador.referrals || 0} referrals
                                </span>
                                <p className="text-xs text-gray-400">
                                  Joined {new Date(ambassador.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}



                {/* Logout Button */}
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
