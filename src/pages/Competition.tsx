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

  // Authentication form state
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Display name form state
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    checkExistingSession();
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center p-4">
        <div className="max-w-md w-full">
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