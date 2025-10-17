
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserStats } from '../types';
import { allAchievements } from '../pages/AchievementsPage';
import { useNotification } from './NotificationContext';

// MOCK USER DATA
const initialUsers: User[] = [
  {
    id: 1,
    firstName: 'อาทิตย์',
    lastName: 'ใจดี',
    email: 'test@user.com',
    name: 'อาทิตย์ ใจดี',
    idCardNumber: '1234567890123',
    family: [2, 3],
    bio: 'รักการช่วยเหลือผู้อื่นและแบ่งปันความรู้ด้านเทคโนโลยี',
    skills: ['สอนคอมพิวเตอร์', 'ซ่อมอุปกรณ์อิเล็กทรอนิกส์', 'ให้คำปรึกษา'],
    timeCredit: 25,
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    stats: {
      hoursGiven: 12,
      hoursReceived: 4,
      peopleHelped: 5,
      servicesCreated: 2,
    },
    achievements: [1, 5],
  },
  {
    id: 2,
    firstName: 'มานี',
    lastName: 'ใจงาม',
    email: 'manee@user.com',
    name: 'มานี ใจงาม',
    idCardNumber: '0987654321098',
    family: [1],
    bio: 'ชอบทำสวนและทำอาหาร',
    skills: ['ทำสวน', 'ทำอาหารไทย'],
    timeCredit: 10,
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    stats: { hoursGiven: 5, hoursReceived: 8, peopleHelped: 2, servicesCreated: 1 },
    achievements: [],
  },
  {
    id: 3,
    firstName: 'สมชาย',
    lastName: 'สามารถ',
    email: 'somchai@user.com',
    name: 'สมชาย สามารถ',
    idCardNumber: '1122334455667',
    family: [1],
    bio: 'นักกีฬาและช่างซ่อม',
    skills: ['ซ่อมจักรยาน', 'สอนออกกำลังกาย'],
    timeCredit: 15,
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    stats: { hoursGiven: 20, hoursReceived: 10, peopleHelped: 8, servicesCreated: 4 },
    achievements: [1],
  },
];

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password?: string) => void;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'timeCredit' | 'stats' | 'achievements' | 'name' | 'family'> & { idCardNumber: string }) => void;
  updateUserStats: (statsUpdate: Partial<UserStats>) => void;
  processJobPayment: (requesterId: number, providerId: number, amount: number, jobTitle: string) => void;
  findUserByIdCard: (idCard: string) => User | undefined;
  transferCredits: (recipientId: number, amount: number) => { success: boolean, message: string };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('timebank-users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('timebank-currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { showTrophy } = useNotification();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('timebank-currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('timebank-currentUser');
    }
  }, [currentUser]);
  
  useEffect(() => {
    localStorage.setItem('timebank-users', JSON.stringify(users));
  }, [users]);


  const login = (email: string, password?: string) => {
    const user = users.find(u => u.email === email);
    setCurrentUser(user || users[0]); 
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (userData: Omit<User, 'id' | 'timeCredit' | 'stats' | 'achievements' | 'name' | 'family'> & { idCardNumber: string }) => {
    const newUser: User = {
      ...userData,
      id: Date.now(),
      name: `${userData.firstName} ${userData.lastName}`,
      timeCredit: 5,
      stats: { hoursGiven: 0, hoursReceived: 0, peopleHelped: 0, servicesCreated: 0 },
      achievements: [],
      family: [],
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const updateUserStats = (statsUpdate: Partial<UserStats>) => {
    if (!currentUser) return;

    const newStats = { ...currentUser.stats };
    let newAchievements = [...currentUser.achievements];
    let achievementUnlocked = false;

    if (statsUpdate.servicesCreated) {
        newStats.servicesCreated += statsUpdate.servicesCreated;
        if (newStats.servicesCreated >= 1 && !newAchievements.includes(1)) {
            newAchievements.push(1);
            achievementUnlocked = true;
        }
    }
    
    setCurrentUser(prev => prev ? { ...prev, stats: newStats, achievements: newAchievements } : null);
    
    if (achievementUnlocked) {
        const unlocked = allAchievements.find(a => a.id === newAchievements[newAchievements.length - 1]);
        if(unlocked) showTrophy(unlocked);
    }
  };
  
  const processJobPayment = (requesterId: number, providerId: number, amount: number, jobTitle: string) => {
    setUsers(prevUsers => 
        prevUsers.map(user => {
            if (user.id === requesterId) {
                return { 
                    ...user, 
                    timeCredit: user.timeCredit - amount,
                    stats: { ...user.stats, hoursReceived: (user.stats.hoursReceived || 0) + amount }
                };
            }
            if (user.id === providerId) {
                return {
                    ...user,
                    timeCredit: user.timeCredit + amount,
                    stats: { 
                        ...user.stats, 
                        hoursGiven: (user.stats.hoursGiven || 0) + amount,
                        peopleHelped: (user.stats.peopleHelped || 0) + 1
                    }
                };
            }
            return user;
        })
    );
    if (currentUser) {
        if (currentUser.id === requesterId) {
            setCurrentUser(prev => prev ? { ...prev, timeCredit: prev.timeCredit - amount, stats: { ...prev.stats, hoursReceived: (prev.stats.hoursReceived || 0) + amount } } : null);
        } else if (currentUser.id === providerId) {
            setCurrentUser(prev => prev ? { ...prev, timeCredit: prev.timeCredit + amount, stats: { ...prev.stats, hoursGiven: (prev.stats.hoursGiven || 0) + amount, peopleHelped: (prev.stats.peopleHelped || 0) + 1 } } : null);
        }
    }
  };

  const findUserByIdCard = (idCard: string): User | undefined => {
    return users.find(u => u.idCardNumber === idCard);
  };

  const transferCredits = (recipientId: number, amount: number) => {
      if (!currentUser) {
          return { success: false, message: "You are not logged in." };
      }
      if (currentUser.timeCredit < amount) {
          return { success: false, message: "Insufficient credits." };
      }

      setUsers(prevUsers => 
          prevUsers.map(user => {
              if (user.id === currentUser.id) {
                  return { ...user, timeCredit: user.timeCredit - amount };
              }
              if (user.id === recipientId) {
                  return { ...user, timeCredit: user.timeCredit + amount };
              }
              return user;
          })
      );
      
      setCurrentUser(prev => prev ? { ...prev, timeCredit: prev.timeCredit - amount } : null);
      
      return { success: true, message: "Transfer successful!" };
  };

  return (
    <UserContext.Provider value={{ currentUser, users, login, logout, register, updateUserStats, processJobPayment, findUserByIdCard, transferCredits }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
