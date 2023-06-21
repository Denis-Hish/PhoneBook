import React from 'react';
import './scss/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

import Header from './components/Header';
import Contacts from './components/ContactsTest';
import Footer from './components/Footer';
import ModalAddContact from './components/ModalAddContact';
import ModalWindowsDelete from './components/TESTED/ModalWindowsDelete';
import ModalWindowsDeleted from './components/TESTED/ModalWindowsDeleted';
import ModalWindowsSaved from './components/TESTED/ModalWindowsSaved';
import ModalWindowsNumberExists from './components/TESTED/ModalWindowsNumberExists';
import YourComponent from './components/ContentModal';

function App() {
   return (
      <>
         <Header />
         <Contacts />
         <ModalAddContact />

         <div className="bottom-buttons">
            <ModalWindowsDelete />
            <ModalWindowsDeleted />
            <ModalWindowsSaved />
            <ModalWindowsNumberExists />
            <YourComponent />
         </div>

         <Footer />
      </>
   );
}

export default App;
