import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = ({ onLogin }) => {
  return (
    <>
      <Header isAuthenticated={false} />
      <LoginForm onLogin={onLogin} />
      <Footer />
    </>
  );
};

export default LoginPage;
