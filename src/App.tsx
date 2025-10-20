import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Rules from './pages/Rules';
import CompetitionAccess from './pages/CompetitionAccess';
import Competition from './pages/Competition';
import CompetitionGame from './pages/CompetitionGame';
import LiveLeaderboard from './pages/LiveLeaderboard';
import Leaderboard from './pages/Leaderboard';
import LeaderboardClosed from './pages/LeaderboardClosed';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import Ambassador from './pages/Ambassador';
import ProtectedAdmin from './pages/ProtectedAdmin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle URL-based routing for referral links and direct page access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    const path = window.location.pathname;
    
    // If there's a referral code in the URL, go to registration page
    if (ref) {
      setCurrentPage('registration');
      return;
    }
    
    // Handle direct URL access to specific pages
    switch (path) {
      case '/about':
        setCurrentPage('about');
        break;
      case '/faq':
        setCurrentPage('faq');
        break;
      case '/rules':
        setCurrentPage('rules');
        break;
      case '/leaderboard':
        setCurrentPage('leaderboard');
        break;
      case '/contact':
        setCurrentPage('contact');
        break;
      case '/registration':
        setCurrentPage('registration');
        break;
      case '/ambassador':
        setCurrentPage('ambassador');
        break;
      case '/admin':
        setCurrentPage('admin');
        break;
      case '/competition':
        setCurrentPage('competition-access');
        break;
      case '/competition-admin':
        setCurrentPage('competition-admin');
        break;
      default:
        setCurrentPage('home');
        break;
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'faq':
        return <FAQ />;
      case 'rules':
        return <Rules />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'contact':
        return <Contact />;
      case 'registration':
        return <Registration />;
      case 'ambassador':
        return <Ambassador />;
      case 'admin':
        return <ProtectedAdmin />;
      case 'competition-access':
        return <CompetitionAccess setCurrentPage={setCurrentPage} />;
      case 'competition-game':
        return <Competition />;
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Features />
            <Prizes />
            <Sponsors />
          </>
        );
    }
  };

  return (
     <ThemeProvider>
       <div className="min-h-screen bg-phiga-light dark:bg-phiga-gray-900 transition-colors duration-300">
         {currentPage !== 'competition-access' && currentPage !== 'competition' && currentPage !== 'competition-game' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
         {renderPage()}
         {currentPage !== 'competition-access' && currentPage !== 'competition' && currentPage !== 'competition-game' && <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />}
       </div>
     </ThemeProvider>
   );
}

export default App;
