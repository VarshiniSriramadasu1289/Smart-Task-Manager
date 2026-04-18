import { useState, useMemo } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

type PageType = 'login' | 'register' | 'home';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const auth = useMemo(
    () => ({
      isAuthenticated: localStorage.getItem('smart-task-manager.currentUser') !== null,
    }),
    [currentPage],
  );

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'register') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  return <HomePage onNavigate={handleNavigate} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
