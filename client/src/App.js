import React from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { ThemeProvider } from './components/ThemeContext';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import Snackbar from './components/Snackbar';

function App() {
   return (
      <ThemeProvider>
         <Header />
         <Contacts />
         <Snackbar />
         <Footer />
      </ThemeProvider>
   );
}

export default App;
