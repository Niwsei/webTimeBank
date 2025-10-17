import React, { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';
import { XMarkIcon } from '@heroicons/react/24/solid';

const TrophyUnlockToast: React.FC = () => {
  const { trophy, hideTrophy } = useNotification();

  useEffect(() => {
    if (trophy) {
      const timer = setTimeout(() => {
        hideTrophy();
      }, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [trophy, hideTrophy]);

  if (!trophy) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 z-50 animate-subtle-enter">
      <div className="bg-surface border-2 border-accent rounded-xl shadow-lg shadow-accent/20 max-w-sm w-full p-4 flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-md"></div>
            <trophy.icon className="w-16 h-16 text-accent" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-accent">TROPHY UNLOCKED!</p>
          <h3 className="text-lg font-bold text-primary-text">{trophy.name}</h3>
          <p className="text-sm text-secondary-text">{trophy.description}</p>
        </div>
        <button onClick={hideTrophy} className="p-1 text-secondary-text hover:text-primary-text">
            <XMarkIcon className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};

export default TrophyUnlockToast;