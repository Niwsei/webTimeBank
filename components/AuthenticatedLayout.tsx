import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { useUser } from '../context/UserContext';

const AuthenticatedLayout: React.FC = () => {
  const { currentUser } = useUser();
  const location = useLocation();

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they
    // log in, which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-background font-prompt flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 overflow-x-hidden">
        <MobileHeader />
        <main className="p-4 sm:p-6 lg:p-10 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;