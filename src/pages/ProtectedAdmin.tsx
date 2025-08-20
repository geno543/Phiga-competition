import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import Admin from './Admin';

const ProtectedAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (session storage)
    const authStatus = sessionStorage.getItem('phiga_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Store authentication in session storage (expires when browser closes)
    sessionStorage.setItem('phiga_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('phiga_admin_auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
      <Admin />
    </div>
  );
};

export default ProtectedAdmin;