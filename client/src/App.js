import React from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ModalAddContact from './components/ModalAddContact';

import ToggleColorMode from './components/TogglingColorMode';

function App() {
   return (
      <>
         <Header />
         <Contacts />
         <ModalAddContact />
         <Footer />
      </>
   );
}

export default App;
