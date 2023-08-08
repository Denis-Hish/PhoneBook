import React, { useState, useEffect } from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { ThemeProvider } from './components/ThemeContext';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import Snackbar from './components/Snackbar';
import LoginForm from './components/LoginForm';

function App() {
   const countdown = 10 * 60 * 1000; // timer in minutes
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const handleLogin = () => {
      setIsAuthenticated(true);
      const currentTime = Date.now();
      localStorage.setItem('authData', JSON.stringify({ isAuthenticated: true, loginTime: currentTime }));
   };

   const handleLogout = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('authData');
      console.log('Вылогирован');
      // clearContactsData(); //! Очистить данные контактов
      window.location.reload(); //! Перезагрузка страницы для очистки данных?
   };

   useEffect(() => {
      // Check if there's authentication data in localStorage
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (authData && authData.isAuthenticated) {
         // Check if the user's session has expired since login
         const currentTime = Date.now();
         const loginTime = authData.loginTime;

         if (currentTime - loginTime < countdown) {
            setIsAuthenticated(true);
         } else {
            // If the session has expired, log the user out
            setIsAuthenticated(false);
            localStorage.removeItem('authData');
         }
      }
   }, [isAuthenticated, countdown]);

   useEffect(() => {
      // Start the idle timer whenever the authentication status changes
      if (isAuthenticated) {
         let idleTimer = setTimeout(() => {
            // Log out the user after the idle timeout
            setIsAuthenticated(false);
            localStorage.removeItem('authData');
         }, countdown);

         // Reset the idle timer on user activity
         const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
               setIsAuthenticated(false);
               localStorage.removeItem('authData');
            }, countdown);
         };

         // Add event listeners to detect user activity
         window.addEventListener('mousemove', resetIdleTimer);
         window.addEventListener('keydown', resetIdleTimer);

         return () => {
            // Clean up event listeners when the component unmounts
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
         };
      }
   }, [isAuthenticated, countdown]);

   return (
      <ThemeProvider>
         <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
         {isAuthenticated ? <Contacts /> : <LoginForm onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
         <Snackbar />
         <Footer />
      </ThemeProvider>
   );
}

export default App;
