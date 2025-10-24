import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { Trophy, Medal, Award, Users, RefreshCw, Clock } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  total_score: number;
  current_question: number;
  questions_skipped: number;
  last_activity: string;
  rank: number;
}

interface LiveLeaderboardProps {
  refreshInterval?: number; // in milliseconds, default 5000 (5 seconds)
}

export default function LiveLeaderboard({ refreshInterval = 5000 }: LiveLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Initial load
    fetchLeaderboard();

    // Set up real-time updates
    const interval = setInterval(fetchLeaderboard, refreshInterval);

    // Set up Supabase real-time subscription for immediate updates
    const subscription = supabase
      .channel('leaderboard_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'competition_participants'
        },
        () => {
          // Refresh leaderboard when any participant data changes
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [refreshInterval]);

  const fetchLeaderboard = async () => {
    try {
      // Fetch top 50 leaderboard data with ranking
      const { data, error } = await supabase
        .from('competition_participants')
        .select('id, display_name, total_score, current_question, questions_skipped, last_activity, is_active')
        .eq('is_active', true)
        .not('display_name', 'is', null)
        .order('total_score', { ascending: false })
        .order('current_question', { ascending: false })
        .order('last_activity', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Add ranking to the data
      const rankedData: LeaderboardEntry[] = (data || []).map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

      setLeaderboard(rankedData);
      setLastUpdated(new Date());
      setLoading(false);

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Award className="text-amber-600" size={24} />;
      default:
        return <span className="text-phiga-light/70 font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-900';
      default:
        return 'bg-phiga-accent/20 text-phiga-light';
    }
  };

  const formatLastActivity = (timestamp: string) => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffMs = now.getTime() - activity.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return activity.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-phiga-accent mx-auto mb-4" size={48} />
          <p className="text-phiga-dark dark:text-phiga-light text-lg">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-phiga-dark/80 backdrop-blur-sm rounded-lg p-6 mb-6 border border-phiga-accent/20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-phiga-accent mb-2">Live Leaderboard</h1>
              <p className="text-phiga-light/70">PHIGA Physics Competition - Top 50</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-phiga-light/60 text-sm">
            <Clock size={16} />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <span className="ml-4 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
              Live Updates
            </span>
            <span className="ml-2 px-2 py-1 bg-phiga-accent/20 text-phiga-accent rounded-full text-xs">
              Showing Top 50
            </span>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-phiga-dark/80 backdrop-blur-sm rounded-lg border border-phiga-accent/20 overflow-hidden">
          {leaderboard.length === 0 ? (
            <div className="text-center py-16">
              <Users className="text-6xl text-phiga-accent/50 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-phiga-light mb-2">No Active Participants</h2>
              <p className="text-phiga-light/70">Participants will appear here once they start the competition.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-phiga-main/20">
                  <tr className="text-phiga-light">
                    <th className="px-6 py-4 text-left">Rank</th>
                    <th className="px-6 py-4 text-left">Participant</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-center">Question</th>
                    <th className="px-6 py-4 text-center">Skips</th>
                    <th className="px-6 py-4 text-center">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr 
                      key={entry.id}
                      className={`border-b border-phiga-accent/10 hover:bg-phiga-accent/5 transition-colors ${
                        index < 3 ? 'bg-phiga-accent/10' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getRankIcon(entry.rank)}
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRankBadgeColor(entry.rank)}`}>
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-phiga-light">
                          {entry.display_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-2xl font-bold text-phiga-accent">
                          {entry.total_score}
                        </div>
                        <div className="text-xs text-phiga-light/60">points</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-lg font-semibold text-phiga-light">
                          {entry.current_question}/22
                        </div>
                        <div className="text-xs text-phiga-light/60">completed</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`text-lg font-semibold ${
                          entry.questions_skipped >= 3 ? 'text-red-400' : 'text-phiga-light'
                        }`}>
                          {entry.questions_skipped}
                        </div>
                        <div className="text-xs text-phiga-light/60">skips</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-phiga-light/80">
                          {formatLastActivity(entry.last_activity)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-phiga-dark/60 backdrop-blur-sm rounded-lg p-4 border border-phiga-accent/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-phiga-accent">
                {leaderboard.length > 0 ? Math.max(...leaderboard.map(p => p.total_score)) : 0}
              </div>
              <div className="text-sm text-phiga-light/70">Highest Score</div>
            </div>
          </div>
          
          <div className="bg-phiga-dark/60 backdrop-blur-sm rounded-lg p-4 border border-phiga-accent/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-phiga-accent">
                {leaderboard.length > 0 ? Math.max(...leaderboard.map(p => p.current_question)) : 0}
              </div>
              <div className="text-sm text-phiga-light/70">Furthest Question</div>
            </div>
          </div>
          
          <div className="bg-phiga-dark/60 backdrop-blur-sm rounded-lg p-4 border border-phiga-accent/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-phiga-accent">
                {leaderboard.length > 0 ? 
                  Math.round(leaderboard.reduce((sum, p) => sum + p.total_score, 0) / leaderboard.length) : 0}
              </div>
              <div className="text-sm text-phiga-light/70">Average Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}