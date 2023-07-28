import React, { useState } from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { ThemeProvider } from './components/ThemeContext';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import Snackbar from './components/Snackbar';
import LoginForm from './components/LoginForm';

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const handleLogin = () => {
      setIsAuthenticated(true);
   };

   const handleLogout = () => {
      setIsAuthenticated(false);
   };

   return (
      <ThemeProvider>
         <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
         {isAuthenticated ? <Contacts /> : <LoginForm onLogin={handleLogin} />}
         <Snackbar />
         <Footer />
      </ThemeProvider>
   );
}

export default App;
