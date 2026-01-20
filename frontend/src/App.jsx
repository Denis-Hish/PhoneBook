import { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/bootstrap-grid.css';
import './styles/style.css';

import Snackbar from './components/Snackbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

const IDLE_TIMEOUT_MINUTES = 30; // Таймер неактивности (в минутах)
const IDLE_TIMEOUT_MS = IDLE_TIMEOUT_MINUTES * 60 * 1000; // конвертируем в миллисекунды

const AppContent = () => {
  const countdown = IDLE_TIMEOUT_MS;
  const clearContactsDataRef = useRef(null);
  const { logout: authLogout } = useAuth();

  // Initialize authentication from localStorage once (avoid setting state inside effects synchronously)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (token && authData && authData.isAuthenticated) {
        const currentTime = Date.now();
        const loginTime = authData.loginTime;
        if (currentTime - loginTime < countdown) {
          return true;
        }
        // expired — remove stored data
        localStorage.removeItem('authData');
        localStorage.removeItem('token');
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
      JSON.stringify({ isAuthenticated: true, loginTime: currentTime }),
    );
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    authLogout(); // Вызываем logout из AuthContext
    // Очистить данные контактов вместо перезагрузки страницы
    if (clearContactsDataRef.current) {
      clearContactsDataRef.current();
    }
  };

  useEffect(() => {
    // Start the idle timer whenever the authentication status changes
    if (isAuthenticated) {
      let idleTimer = setTimeout(() => {
        // Log out the user after the idle timeout
        setIsAuthenticated(false);
        authLogout(); // Вызываем logout из AuthContext
        // Очистить данные контактов
        if (clearContactsDataRef.current) {
          clearContactsDataRef.current();
        }
      }, countdown);

      // Reset the idle timer on user activity
      const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          setIsAuthenticated(false);
          authLogout(); // Вызываем logout из AuthContext
          // Очистить данные контактов
          if (clearContactsDataRef.current) {
            clearContactsDataRef.current();
          }
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
  }, [isAuthenticated, countdown, authLogout]);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={
              isAuthenticated ? (
                <Navigate to='/' replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage
                  onLogout={handleLogout}
                  clearContactsDataRef={clearContactsDataRef}
                />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Snackbar />
      </Router>
    </ThemeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
