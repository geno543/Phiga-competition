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
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import Ambassador from './pages/Ambassador';
import ProtectedAdmin from './pages/ProtectedAdmin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle URL-based routing for referral links
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    // If there's a referral code in the URL, go to registration page
    if (ref) {
      setCurrentPage('registration');
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
         <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
         {renderPage()}
         <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
       </div>
     </ThemeProvider>
   );
}

export default App;
