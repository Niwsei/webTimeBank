
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ClockIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  BanknotesIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'ค้นหา', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'สร้างกิจกรรม', href: '/create', icon: PlusCircleIcon },
  { name: 'เครดิตของฉัน', href: '/timebank', icon: BanknotesIcon },
  { name: 'โปรไฟล์', href: '/profile', icon: UserCircleIcon },
];

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate('/login');
  };
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="md:hidden bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-border-color">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <NavLink to="/dashboard" className="flex items-center space-x-2 text-xl font-bold text-primary-text">
            <ClockIcon className="w-7 h-7 text-accent" />
            <span className="font-prompt">คลังเวลา</span>
          </NavLink>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-primary-text rounded-md hover:bg-muted"
            aria-label="Open main menu"
          >
            <Bars3Icon className="w-7 h-7" />
          </button>
        </div>
      </header>
      
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Side Panel */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-surface shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-color h-16">
                <div className="flex items-center space-x-2 text-xl font-bold text-primary-text">
                  <ClockIcon className="w-7 h-7 text-accent" />
                  <span id="mobile-menu-title" className="font-prompt">เมนู</span>
                </div>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-primary-text rounded-md hover:bg-muted"
                    aria-label="Close menu"
                >
                    <XMarkIcon className="w-7 h-7" />
                </button>
            </div>
            
             {/* User Info */}
            <div className="p-4 border-b border-border-color">
                <div className="flex items-center">
                    {currentUser?.avatarUrl ? (
                        <img src={currentUser.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-muted text-accent flex items-center justify-center text-xl font-bold">
                            {currentUser?.firstName.charAt(0)}
                        </div>
                    )}
                    <div className="ml-3 overflow-hidden">
                        <p className="font-bold text-primary-text truncate">{currentUser?.firstName} {currentUser?.lastName}</p>
                        <p className="text-sm text-secondary-text truncate">{currentUser?.email}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 group ${
                        isActive 
                        ? 'bg-accent-light text-accent' 
                        : 'text-secondary-text hover:bg-muted hover:text-primary-text'
                    }`
                    }
                >
                    <item.icon className="h-6 w-6 mr-4" aria-hidden="true" />
                    {item.name}
                </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 mt-auto border-t border-border-color">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-lg font-semibold rounded-lg text-secondary-text hover:bg-muted hover:text-primary-text transition-colors duration-200"
                >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 mr-4" aria-hidden="true" />
                    ออกจากระบบ
                </button>
            </div>
        </div>
      </aside>
    </>
  );
};

export default MobileHeader;