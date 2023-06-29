import React from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ModalAddContact from './components/ModalAddContact';
import Snackbar from './components/Snackbar';

function App() {
   return (
      <>
         <Header />
         <Contacts />
         <ModalAddContact />
         <Snackbar />
         <Footer />
      </>
   );
}

export default App;
