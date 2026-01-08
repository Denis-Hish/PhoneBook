import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import './scss/style.scss';
import './scss/bootstrap-grid.css';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import Snackbar from './components/Snackbar';
import LoginForm from './components/LoginForm';

function App() {
  const countdown = 30 * 60 * 1000; // timer in milliseconds

  // Initialize authentication from localStorage once (avoid setting state inside effects synchronously)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (authData && authData.isAuthenticated) {
        const currentTime = Date.now();
        const loginTime = authData.loginTime;
        if (currentTime - loginTime < countdown) {
          return true;
        }
        // expired — remove stored data
        localStorage.removeItem('authData');
      }
    } catch {
      // ignore parse errors
    }
    return false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    const currentTime = Date.now();
    localStorage.setItem(
      'authData',
      JSON.stringify({ isAuthenticated: true, loginTime: currentTime })
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authData');
    // clearContactsData(); //! Очистить данные контактов
    window.location.reload(); //! Перезагрузка страницы для очистки данных?
  };

  useEffect(() => {
    // Start the idle timer whenever the authentication status changes
    if (isAuthenticated) {
      let idleTimer = setTimeout(() => {
        // Log out the user after the idle timeout
        setIsAuthenticated(false);
        localStorage.removeItem('authData');
        window.location.reload();
      }, countdown);

      // Reset the idle timer on user activity
      const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('authData');
          window.location.reload();
        }, countdown);
      };

      // Add event listeners to detect user activity
      window.addEventListener('mousemove', resetIdleTimer);
      window.addEventListener('keydown', resetIdleTimer);

      return () => {
        // Clean up event listeners when the component unmounts
        window.removeEventListener('mousemove', resetIdleTimer);
        window.removeEventListener('keydown', resetIdleTimer);
        clearTimeout(idleTimer);
      };
    }
  }, [isAuthenticated, countdown]);

  return (
    <ThemeProvider>
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <Contacts />
      ) : (
        <LoginForm onLogin={handleLogin} isAuthenticated={isAuthenticated} />
      )}
      <Snackbar />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
