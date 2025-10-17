import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartBarIcon, MagnifyingGlassIcon, PlusCircleIcon, UserCircleIcon, BanknotesIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'Create', href: '/create', icon: PlusCircleIcon },
  { name: 'Timebank', href: '/timebank', icon: BanknotesIcon },
  { name: 'Profile', href: '/profile', icon: UserCircleIcon },
];

const BottomNavBar: React.FC = () => {
  return (
    <footer className="fixed bottom-4 left-4 right-4 h-20 bg-surface/80 backdrop-blur-md border border-border-color rounded-2xl shadow-lg z-50">
      <nav className="flex justify-around items-stretch h-full">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className="flex flex-col items-center justify-center w-full pt-2 pb-1 transition-transform duration-200 relative group"
          >
            {({ isActive }) => (
              <>
                <div className={`relative transition-transform duration-300 ease-in-out ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <div className="p-3 rounded-full transition-colors duration-200">
                       <item.icon className={`h-7 w-7 transition-all duration-200 ${isActive ? 'text-accent' : 'text-secondary-text/60 group-hover:text-primary-text'}`} aria-hidden="true" />
                    </div>
                </div>
                <span className={`text-xs font-bold transition-all duration-300 ease-in-out ${isActive ? 'text-accent' : 'text-secondary-text/80 group-hover:text-primary-text'}`}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default BottomNavBar;
