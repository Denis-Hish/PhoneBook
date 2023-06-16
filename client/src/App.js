import React from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import Header from './components/Header';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ModalAddContact from './components/ModalAddContact';
import ModalWindowsDelete from './components/ModalWindowsDelete';
import ModalWindowsDeleted from './components/ModalWindowsDeleted';
import ModalWindowsSaved from './components/ModalWindowsSaved';
import ModalWindowsNumberExists from './components/ModalWindowsNumberExists';

function App() {
   return (
      <>
         <Header />
         <Contacts />
         <ModalAddContact />

         <ModalWindowsDelete />
         <ModalWindowsDeleted />
         <ModalWindowsSaved />
         <ModalWindowsNumberExists />

         <Footer />
      </>
   );
}

export default App;
