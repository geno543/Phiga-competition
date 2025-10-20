import React from 'react';

const LeaderboardClosed: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-phiga-dark dark:text-phiga-light mb-8">
            Leaderboard Closed
          </h1>
          <div className="bg-white dark:bg-phiga-dark/80 backdrop-blur-sm rounded-lg shadow-lg border border-phiga-accent/20 p-8">
            <p className="text-lg text-phiga-dark/70 dark:text-phiga-light/70 mb-4">
              The competition leaderboard is currently closed.
            </p>
            <p className="text-phiga-dark/60 dark:text-phiga-light/60">
              Please check back during the competition period to view live rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardClosed;