import React, { useState, useEffect } from 'react';
import { FiKey, FiPlay, FiClock, FiUsers, FiShield } from 'react-icons/fi';
import { supabase } from '../utils/supabase/client';
import { validateCodeFormat, formatCodeInput } from '../utils/codeGenerator';

interface CompetitionAccessProps {
  setCurrentPage: (page: string) => void;
}

const CompetitionAccess: React.FC<CompetitionAccessProps> = ({ setCurrentPage }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [participant, setParticipant] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Competition timing - 6 PM Cairo time today for 4 hours
  const getCompetitionTiming = () => {
    const now = new Date();
    const cairoTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
    
    // Set competition start time to 6 PM Cairo time today
    const competitionStart = new Date(cairoTime);
    competitionStart.setHours(18, 0, 0, 0); // 6 PM
    
    // If it's already past 6 PM today, set it for tomorrow (this shouldn't happen for today's competition)
    if (cairoTime > competitionStart) {
      competitionStart.setDate(competitionStart.getDate() + 1);
    }
    
    // Competition ends 4 hours after start
    const competitionEnd = new Date(competitionStart);
    competitionEnd.setHours(competitionEnd.getHours() + 4);
    
    return { competitionStart, competitionEnd, cairoTime };
  };

  const { competitionStart, competitionEnd, cairoTime } = getCompetitionTiming();
  const isCompetitionActive = cairoTime >= competitionStart && cairoTime <= competitionEnd;
  const hasCompetitionEnded = cairoTime > competitionEnd;

  // Format time remaining until competition starts
  const getTimeUntilStart = () => {
    if (cairoTime >= competitionStart) return null;
    
    const timeDiff = competitionStart.getTime() - cairoTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCode = formatCodeInput(e.target.value);
    setCode(formattedCode);
    setError('');
  };

  const validateCode = async () => {
    // Check if competition is active
    if (!isCompetitionActive) {
      if (hasCompetitionEnded) {
        setError('The competition has ended. Thank you for your interest!');
      } else {
        setError('The competition has not started yet. Please wait until 6:00 PM Cairo time.');
      }
      return;
    }

    if (!validateCodeFormat(code)) {
      setError('Please enter a valid 8-character code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error: dbError } = await supabase
        .from('registrations')
        .select('*')
        .eq('competition_code', code)
        .eq('registration_status', 'approved')
        .single();

      if (dbError || !data) {
        setError('Invalid or expired competition code. Please check your code and try again.');
        return;
      }

      // Code is valid and competition is active, redirect to competition game
      setCurrentPage('competition-game');
      
    } catch (err) {
      setError('An error occurred while validating your code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateCode();
    }
  };

  // Show competition status message
  const getCompetitionStatusMessage = () => {
    if (hasCompetitionEnded) {
      return {
        title: "Competition Ended",
        message: "The PHIGA competition has concluded. Thank you to all participants!",
        color: "text-red-400"
      };
    } else if (isCompetitionActive) {
      return {
        title: "Competition Active",
        message: "The competition is currently running! Enter your code to participate.",
        color: "text-green-400"
      };
    } else {
      const timeUntil = getTimeUntilStart();
      return {
        title: "Competition Starts Soon",
        message: `Competition starts in ${timeUntil} (6:00 PM Cairo time)`,
        color: "text-yellow-400"
      };
    }
  };

  const statusInfo = getCompetitionStatusMessage();

  if (participant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Success State */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShield size={40} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to PHIGA!</h2>
            <p className="text-phiga-light/80 mb-6">
              Hello {participant.first_name} {participant.last_name}! Your access has been verified.
            </p>
            
            <div className="bg-phiga-dark/30 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Competition Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-4">
                  <FiClock className="text-phiga-accent mx-auto mb-2" size={24} />
                  <p className="text-white font-semibold">Competition</p>
                  <p className="text-phiga-light/80 text-sm">Not Started</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <FiUsers className="text-phiga-accent mx-auto mb-2" size={24} />
                  <p className="text-white font-semibold">Participants</p>
                  <p className="text-phiga-light/80 text-sm">1000+ Registered</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <FiPlay className="text-phiga-accent mx-auto mb-2" size={24} />
                  <p className="text-white font-semibold">Duration</p>
                  <p className="text-phiga-light/80 text-sm">4 Hours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> The competition has not started yet. You will receive an email notification when it begins.
              </p>
            </div>
            
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-gradient-to-r from-phiga-accent to-phiga-light text-phiga-dark px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If competition hasn't started, show only countdown
  if (!isCompetitionActive && !hasCompetitionEnded) {
    const timeUntil = getTimeUntilStart();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/20 rounded-full blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-phiga-light/20 to-phiga-accent/30 rounded-full blur-2xl animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-phiga-accent/20 to-phiga-light/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-2xl w-full relative z-10 text-center">
          {/* Main Countdown Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            {/* Logo/Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <FiClock size={48} className="text-phiga-dark" />
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-white via-phiga-light to-phiga-accent bg-clip-text text-transparent">
                PHIGA Competition
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-phiga-light/80 mb-8 animate-slide-up">
              Physics International Gamefield Adventure
            </p>
            
            {/* Countdown Display */}
            <div className="bg-phiga-dark/30 rounded-2xl p-8 mb-8 border border-phiga-accent/30">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Competition Starts In</h2>
              <div className="text-5xl md:text-7xl font-mono font-bold text-white mb-2 animate-pulse">
                {timeUntil}
              </div>
              <p className="text-phiga-light/60 text-lg">
                6:00 PM Cairo Time
              </p>
            </div>
            
            {/* Competition Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                <FiClock className="text-phiga-accent mx-auto mb-3" size={32} />
                <p className="text-white font-bold text-xl mb-1">4 Hours</p>
                <p className="text-phiga-light/70 text-sm">Duration</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                <FiUsers className="text-phiga-accent mx-auto mb-3" size={32} />
                <p className="text-white font-bold text-xl mb-1">24 Problems</p>
                <p className="text-phiga-light/70 text-sm">Challenges</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
                <FiShield className="text-phiga-accent mx-auto mb-3" size={32} />
                <p className="text-white font-bold text-xl mb-1">Global</p>
                <p className="text-phiga-light/70 text-sm">Competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-phiga-light/20 to-phiga-accent/30 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Competition Status Banner */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20 text-center">
          <h3 className={`text-lg font-bold ${statusInfo.color} mb-2`}>{statusInfo.title}</h3>
          <p className="text-white text-sm">{statusInfo.message}</p>
        </div>

        {/* Access Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-phiga-accent to-phiga-light rounded-full flex items-center justify-center mx-auto mb-4">
              <FiKey size={32} className="text-phiga-dark" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Competition Access</h1>
            <p className="text-phiga-light/80">
              Enter your 8-character competition code to access PHIGA
            </p>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <label className="block text-phiga-light font-medium mb-2">
              Competition Code
            </label>
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              onKeyPress={handleKeyPress}
              placeholder="ABCD1234"
              maxLength={8}
              className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-phiga-accent focus:border-transparent text-center text-2xl font-mono tracking-widest"
              disabled={isLoading || !isCompetitionActive}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          {/* Access Button */}
          <button
            onClick={validateCode}
            disabled={isLoading || code.length !== 8 || !isCompetitionActive}
            className="w-full bg-gradient-to-r from-phiga-accent to-phiga-light text-phiga-dark py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-phiga-dark/30 border-t-phiga-dark rounded-full animate-spin"></div>
                Validating...
              </>
            ) : (
              <>
                <FiPlay size={20} />
                {isCompetitionActive ? 'Access Competition' : 'Competition Not Active'}
              </>
            )}
          </button>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-phiga-light/60 text-sm mb-2">
              Don't have a code? 
            </p>
            <button 
              onClick={() => setCurrentPage('registration')}
              className="text-phiga-accent hover:text-phiga-light transition-colors font-medium"
            >
              Register for PHIGA
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
            <FiClock className="text-phiga-accent mx-auto mb-2" size={20} />
            <p className="text-white text-sm font-medium">4 Hours</p>
            <p className="text-phiga-light/60 text-xs">Competition Duration</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
            <FiUsers className="text-phiga-accent mx-auto mb-2" size={20} />
            <p className="text-white text-sm font-medium">24 Problems</p>
            <p className="text-phiga-light/60 text-xs">Physics Challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionAccess;