import Header from '../components/Header';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const HomePage = ({ onLogout, clearContactsDataRef }) => {
  return (
    <>
      <Header onLogout={onLogout} isAuthenticated={true} />
      <Contacts
        onClearData={clearFunc => (clearContactsDataRef.current = clearFunc)}
      />
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default HomePage;
