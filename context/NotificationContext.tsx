import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Achievement } from '../types';

interface NotificationContextType {
  trophy: Achievement | null;
  showTrophy: (achievement: Achievement) => void;
  hideTrophy: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trophy, setTrophy] = useState<Achievement | null>(null);

  const showTrophy = (achievement: Achievement) => {
    setTrophy(achievement);
  };

  const hideTrophy = () => {
    setTrophy(null);
  };

  return (
    <NotificationContext.Provider value={{ trophy, showTrophy, hideTrophy }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
