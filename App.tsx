
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import CreateServicePage from './pages/CreateServicePage';
import ProfilePage from './pages/ProfilePage';
import TimeBankPage from './pages/TimeBankPage';
import AchievementsPage from './pages/AchievementsPage';
import RequestHelpPage from './pages/RequestHelpPage';
import RequestDetailPage from './pages/RequestDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PublicServicesPage from './pages/PublicServicesPage';
import TransferCreditsPage from './pages/TransferCreditsPage';

import AuthenticatedLayout from './components/AuthenticatedLayout';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import TrophyUnlockToast from './components/TrophyUnlockToast';

const App: React.FC = () => {
  // Fix for routing in a dynamic subdirectory environment.
  // This robustly calculates the basename, even in environments where
  // window.location.pathname might incorrectly return a full URL.
  const getBasename = () => {
    let path = window.location.pathname;

    // Defensively handle non-standard environment behavior.
    // If path looks like a full URL, parse it to get the actual pathname.
    try {
        if (path.startsWith('http')) {
            const url = new URL(path);
            path = url.pathname;
        }
    } catch (e) {
        console.error("Could not parse pathname:", path, e);
        return '/'; // Fallback to root on error
    }

    // Now, `path` is guaranteed to be a valid path string.
    const segments = path.split('/').filter(Boolean);
    
    // If there is at least one segment (the dynamic UUID), use it as the base.
    if (segments.length > 0) {
      return `/${segments[0]}`;
    }
    
    // Fallback for root deployment.
    return '/';
  };

  const basename = getBasename();
  
  return (
    <Router basename={basename}>
      <ToastProvider>
        <NotificationProvider>
          <DataProvider>
            <UserProvider>
              <TrophyUnlockToast />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<PublicServicesPage />} />

                {/* Authenticated Routes */}
                <Route element={<AuthenticatedLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/create" element={<CreateServicePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/timebank" element={<TimeBankPage />} />
                  <Route path="/timebank/transfer" element={<TransferCreditsPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/request-help" element={<RequestHelpPage />} />
                  <Route path="/request/:requestId" element={<RequestDetailPage />} />
                </Route>
              </Routes>
            </UserProvider>
          </DataProvider>
        </NotificationProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
