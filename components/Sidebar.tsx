
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    ChartBarIcon, 
    UserCircleIcon, 
    MagnifyingGlassIcon, 
    PlusCircleIcon, 
    BanknotesIcon, 
    ArrowRightOnRectangleIcon, 
    ClockIcon,
} from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'ค้นหา', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'สร้างกิจกรรม', href: '/create', icon: PlusCircleIcon },
  { name: 'เครดิตของฉัน', href: '/timebank', icon: BanknotesIcon },
  { name: 'โปรไฟล์', href: '/profile', icon: UserCircleIcon },
];

const Sidebar: React.FC = () => {
  const { logout, currentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-surface border-r border-border-color flex-col p-4 fixed top-0 left-0 h-full hidden md:flex">
      <div className="flex items-center space-x-2 text-2xl font-bold text-primary-text mb-8 px-2 pt-4">
          <ClockIcon className="w-8 h-8 text-accent" />
          <span className="font-prompt">คลังเวลา</span>
      </div>
      <nav className="flex-1 flex flex-col space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 group ${
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
      <div className="mt-auto pt-4 border-t border-border-color">
         <div className="p-2 mb-2">
            <div className="flex items-center">
                {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="avatar" className="w-11 h-11 rounded-full object-cover" />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-muted text-accent flex items-center justify-center text-xl font-bold">
                        {currentUser?.firstName.charAt(0)}
                    </div>
                )}
                <div className="ml-3 overflow-hidden">
                    <p className="font-bold text-primary-text text-sm truncate">{currentUser?.firstName} {currentUser?.lastName}</p>
                    <p className="text-xs text-secondary-text truncate">{currentUser?.email}</p>
                </div>
            </div>
         </div>
         <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-base font-semibold rounded-lg text-secondary-text hover:bg-muted hover:text-primary-text transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 mr-4" aria-hidden="true" />
            ออกจากระบบ
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;