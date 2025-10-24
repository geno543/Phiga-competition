import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { FiUser, FiMail, FiCalendar, FiPlay, FiUsers } from 'react-icons/fi';
import CompetitionGame from './CompetitionGame';

interface Participant {
  id: string;
  email: string;
  original_name: string;
  display_name: string | null;
  birth_date: string;
  total_score: number;
  current_question: number;
  questions_skipped: number;
  has_set_display_name: boolean;
  is_active: boolean;
}

const Competition: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsDisplayName, setNeedsDisplayName] = useState(false);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showGuideVideo, setShowGuideVideo] = useState(false);

  // Authentication form state
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Display name form state
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    // Force logout all users - increment this version to clear all sessions
    const APP_VERSION = 'v2.0';
    const currentVersion = localStorage.getItem('app_version');
    
    if (currentVersion !== APP_VERSION) {
      // Clear all login data
      localStorage.removeItem('competition_participant_id');
      localStorage.setItem('app_version', APP_VERSION);
      setIsAuthenticated(false);
      setParticipant(null);
    } else {
      checkExistingSession();
    }
    
    // Check if user has seen the guide video
    const hasSeenGuide = localStorage.getItem('competition_guide_seen');
    if (!hasSeenGuide) {
      setShowGuideVideo(true);
    }
    
    // Update current time every second for countdown
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkExistingSession = async () => {
    const storedParticipantId = localStorage.getItem('competition_participant_id');
    if (storedParticipantId) {
      try {
        const { data, error } = await supabase
          .from('competition_participants')
          .select('*')
          .eq('id', storedParticipantId)
          .single();

        if (data && !error) {
          setParticipant(data);
          setIsAuthenticated(true);
          if (!data.has_set_display_name) {
            setNeedsDisplayName(true);
          }
        } else {
          localStorage.removeItem('competition_participant_id');
        }
      } catch (err) {
        console.error('Session check error:', err);
        localStorage.removeItem('competition_participant_id');
      }
    }
  };

  // Check if competition is active
  const getCompetitionStatus = () => {
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
    
    // COMPETITION CLOSED - Force ended
    const isActive = false;
    const hasEnded = true;
    
    // Competition starts TODAY at 7 PM Cairo time
    const competitionStart = new Date(cairoTime);
    competitionStart.setHours(19, 0, 0, 0); // 7 PM TODAY
    
    // Competition ends at 12:00 AM (midnight) Cairo time (5 hours later)
    const competitionEnd = new Date(cairoTime);
    competitionEnd.setHours(24, 0, 0, 0); // 12:00 AM (midnight) NEXT DAY
    
    // const isActive = cairoTime >= competitionStart && cairoTime <= competitionEnd;
    // const hasEnded = cairoTime > competitionEnd;
    
    // Calculate time until start
    let timeUntilStart = '';
    if (cairoTime < competitionStart) {
      const timeDiff = competitionStart.getTime() - cairoTime.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      timeUntilStart = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return { isActive, hasEnded, timeUntilStart, competitionStart, competitionEnd };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check competition status
    const { isActive, hasEnded } = getCompetitionStatus();
    
    if (!isActive) {
      if (hasEnded) {
        setError('The competition has ended. Thank you for your interest.');
      } else {
        setError('The competition has not started yet. Please come back at 7:00 PM Cairo time tomorrow.');
      }
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('competition_participants')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('birth_date', birthDate.trim())
        .single();

      if (error || !data) {
        setError('Invalid email or birth date. Please check your credentials.');
        return;
      }

      setParticipant(data);
      setIsAuthenticated(true);
      localStorage.setItem('competition_participant_id', data.id);

      if (!data.has_set_display_name) {
        setNeedsDisplayName(true);
        setDisplayName(data.original_name); // Pre-fill with original name
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDisplayName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant || !displayName.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('competition_participants')
        .update({
          display_name: displayName.trim(),
          has_set_display_name: true
        })
        .eq('id', participant.id);

      if (error) {
        setError('Failed to set display name. Please try again.');
        return;
      }

      setParticipant({
        ...participant,
        display_name: displayName.trim(),
        has_set_display_name: true
      });
      setNeedsDisplayName(false);

    } catch (err) {
      console.error('Display name error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('competition_participant_id');
    setIsAuthenticated(false);
    setNeedsDisplayName(false);
    setParticipant(null);
    setEmail('');
    setBirthDate('');
    setDisplayName('');
    setError('');
  };

  const handleCloseGuide = () => {
    localStorage.setItem('competition_guide_seen', 'true');
    setShowGuideVideo(false);
  };

  // Video Guide Modal
  if (showGuideVideo) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="max-w-4xl w-full mx-4">
          <div className="bg-white dark:bg-phiga-dark rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-phiga-main to-phiga-accent p-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Welcome to PHIGA Competition!
              </h2>
              <p className="text-white/90 text-center mt-2">
                Watch this quick guide to understand how the competition works
              </p>
            </div>
            
            <div className="p-6">
              <div style={{position:'relative', paddingTop:'56.25%'}}>
                <iframe 
                  src="https://iframe.mediadelivery.net/embed/517516/bf692f7c-825a-4d65-87c3-6069a7e222ad?autoplay=true&loop=false&muted=false&preload=true&responsive=true" 
                  loading="lazy" 
                  style={{border:0, position:'absolute', top:0, height:'100%', width:'100%'}} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                  allowFullScreen={true}
                  title="Competition Guide Video"
                />
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleCloseGuide}
                  className="bg-phiga-main hover:bg-phiga-dark text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  I'm Ready - Let's Start!
                </button>
              </div>
              
              <p className="text-center text-sm text-phiga-dark/60 dark:text-phiga-light/60 mt-4">
                You can watch this guide again anytime from the help section
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login Form
  if (!isAuthenticated) {
    const { isActive, hasEnded, timeUntilStart, competitionStart } = getCompetitionStatus();
    
    // Show ONLY countdown if competition hasn't started yet
    if (!isActive && !hasEnded) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white/10 dark:bg-phiga-dark/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-phiga-accent/20">
              <div className="w-24 h-24 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full flex items-center justify-center mx-auto mb-8">
                <FiUsers className="text-white text-5xl" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-phiga-dark dark:text-white mb-4">
                PHIGA Competition
              </h1>
              
              <p className="text-xl text-phiga-dark/80 dark:text-phiga-light/80 mb-8">
                Physics International Gamefield Adventure
              </p>
              
              <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300 mb-4">Competition Not Active</h3>
                <p className="text-yellow-800 dark:text-yellow-200 text-lg mb-4">
                  Please wait until the scheduled time
                </p>
                <div className="bg-phiga-dark/30 dark:bg-white/10 rounded-xl p-6 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-2">Competition starts in:</p>
                  <div className="text-5xl md:text-7xl font-mono font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                    {timeUntilStart}
                  </div>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 text-lg mb-1">
                  Today at 7:00 PM Cairo Time
                </p>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  {competitionStart.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 dark:bg-phiga-dark/50 rounded-xl p-4">
                  <p className="text-phiga-dark dark:text-white font-bold text-xl">4h 30m</p>
                  <p className="text-phiga-dark/70 dark:text-phiga-light/70 text-sm">Duration</p>
                </div>
                <div className="bg-white/10 dark:bg-phiga-dark/50 rounded-xl p-4">
                  <p className="text-phiga-dark dark:text-white font-bold text-xl">23 Problems</p>
                  <p className="text-phiga-dark/70 dark:text-phiga-light/70 text-sm">Challenges</p>
                </div>
                <div className="bg-white/10 dark:bg-phiga-dark/50 rounded-xl p-4">
                  <p className="text-phiga-dark dark:text-white font-bold text-xl">7 PM - 12 AM</p>
                  <p className="text-phiga-dark/70 dark:text-phiga-light/70 text-sm">Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Show ended message if competition has ended
    if (hasEnded) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-white/10 dark:bg-phiga-dark/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-phiga-accent/20">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-8">
                <FiUsers className="text-white text-5xl" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-phiga-dark dark:text-white mb-4">
                Competition Has Ended
              </h1>
              
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Season 1 Closed</h3>
                <p className="text-red-800 dark:text-red-200 mb-4">
                  Thank you to all participants! The competition has ended.
                </p>
              </div>

              <div className="bg-phiga-accent/20 border-2 border-phiga-accent/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-phiga-dark dark:text-phiga-accent mb-3">📢 Next Season Coming Soon!</h3>
                <p className="text-phiga-dark dark:text-phiga-light mb-4">
                  Follow us on our social media platforms to be the first to know when the next season launches:
                </p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.facebook.com/profile.php?id=61566168965768" target="_blank" rel="noopener noreferrer" 
                     className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center transition-colors">
                    📘 Follow us on Facebook
                  </a>
                  <a href="https://www.instagram.com/phiga.eg/" target="_blank" rel="noopener noreferrer"
                     className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg text-center transition-colors">
                    📸 Follow us on Instagram
                  </a>
                  <a href="/leaderboard" 
                     className="bg-phiga-accent hover:bg-phiga-accent/80 text-white py-2 px-4 rounded-lg text-center transition-colors">
                    🏆 View Final Leaderboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Show login form ONLY when competition is active
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Active Competition Banner */}
          <div className="bg-green-500/20 border-2 border-green-500/50 rounded-2xl p-4 mb-6 text-center">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Competition is LIVE</h3>
            <p className="text-green-800 dark:text-green-200 text-sm">Enter your credentials below to start</p>
          </div>
          
          <div className="bg-white/10 dark:bg-phiga-dark/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-phiga-accent/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-phiga-main to-phiga-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPlay className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-phiga-dark dark:text-phiga-light mb-2">Competition Access</h1>
              <p className="text-phiga-dark/70 dark:text-phiga-light/70">Enter your credentials to join the competition</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-phiga-dark dark:text-phiga-light mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phiga-accent" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-phiga-dark/50 border border-phiga-accent/30 dark:border-phiga-accent/50 rounded-lg text-phiga-dark dark:text-phiga-light placeholder-phiga-accent focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:border-phiga-accent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-phiga-dark dark:text-phiga-light mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phiga-accent" />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-phiga-dark/50 border border-phiga-accent/30 dark:border-phiga-accent/50 rounded-lg text-phiga-dark dark:text-phiga-light placeholder-phiga-accent focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:border-phiga-accent"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-phiga-main hover:bg-phiga-dark disabled:bg-phiga-main/60 text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In to Competition'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Display Name Setup
  if (needsDisplayName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 dark:bg-phiga-dark/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-phiga-accent/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-phiga-accent to-phiga-main rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-phiga-dark dark:text-phiga-light mb-2">Choose Your Display Name</h1>
              <p className="text-phiga-dark/70 dark:text-phiga-light/70">This name will appear on the leaderboard</p>
            </div>

            <form onSubmit={handleSetDisplayName} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-phiga-dark dark:text-phiga-light mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-phiga-accent" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-phiga-dark/50 border border-phiga-accent/30 dark:border-phiga-accent/50 rounded-lg text-phiga-dark dark:text-phiga-light placeholder-phiga-accent focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:border-phiga-accent"
                    placeholder="Enter your display name"
                    maxLength={50}
                    required
                  />
                </div>
                <p className="text-xs text-phiga-accent mt-1">
                  Original name: {participant?.original_name}
                </p>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading || !displayName.trim()}
                  className="flex-1 bg-phiga-main hover:bg-phiga-dark text-white py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Setting...' : 'Continue'}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-6 py-3 bg-white/10 dark:bg-phiga-dark/50 text-phiga-dark dark:text-phiga-light rounded-lg hover:bg-white/20 dark:hover:bg-phiga-dark/70 transition-colors"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main Competition Interface - Show Game
  if (isAuthenticated && !needsDisplayName && participant) {
    return (
      <CompetitionGame 
        participant={{
          id: participant.id,
          email: participant.email,
          display_name: participant.display_name || '',
          total_score: participant.total_score,
          current_question: participant.current_question,
          questions_skipped: participant.questions_skipped
        }} 
        onScoreUpdate={(newScore) => {
          setParticipant(prev => prev ? { ...prev, total_score: newScore } : null);
        }}
        onParticipantUpdate={(updatedParticipant) => {
          setParticipant(prev => prev ? { 
            ...prev, 
            total_score: updatedParticipant.total_score,
            current_question: updatedParticipant.current_question,
            questions_skipped: updatedParticipant.questions_skipped
          } : null);
        }}
      />
    );
  }
};

export default Competition;