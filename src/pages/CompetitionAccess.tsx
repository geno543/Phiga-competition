import React, { useState } from 'react';
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

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCode = formatCodeInput(e.target.value);
    setCode(formattedCode);
    setError('');
  };

  const validateCode = async () => {
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

      // Code is valid, store participant data
      setParticipant(data);
      
      // Here you would typically redirect to the actual competition interface
      // For now, we'll show a success message
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-phiga-accent/30 to-phiga-light/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-phiga-light/20 to-phiga-accent/30 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
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
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          {/* Access Button */}
          <button
            onClick={validateCode}
            disabled={isLoading || code.length !== 8}
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
                Access Competition
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
            <p className="text-white text-sm font-medium">30 Problems</p>
            <p className="text-phiga-light/60 text-xs">Physics Challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionAccess;