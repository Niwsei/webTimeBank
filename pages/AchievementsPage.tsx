
import React from 'react';
import { TrophyIcon, AcademicCapIcon, HeartIcon, SparklesIcon, SunIcon, ChatBubbleLeftRightIcon, UserGroupIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { Achievement } from '../types';
import { useUser } from '../context/UserContext';
import AchievementsPageSkeleton from '../components/AchievementsPageSkeleton';

export const allAchievements: Achievement[] = [
  { id: 1, name: 'Ice Breaker', description: 'Create your first service.', icon: SparklesIcon },
  { id: 2, name: 'Helping Hand', description: 'Contribute 10 hours to the community.', icon: HeartIcon },
  { id: 3, name: 'Community Pillar', description: 'Contribute 50 hours to the community.', icon: TrophyIcon },
  { id: 4, name: 'Good Morning!', description: 'Complete a service in the morning.', icon: SunIcon },
  { id: 5, name: 'Social Butterfly', description: 'Help 5 different people.', icon: ChatBubbleLeftRightIcon },
  { id: 6, name: 'Specialist: Education', description: 'Complete 3 services in the Education category.', icon: AcademicCapIcon },
  { id: 7, name: 'Team Player', description: 'Participate in a group activity.', icon: UserGroupIcon },
  { id: 8, name: 'Handyman', description: 'Complete 3 services in the "งานช่าง" category.', icon: WrenchScrewdriverIcon },
];

const AchievementCard: React.FC<{ ach: Achievement; isEarned: boolean; delay: number }> = ({ ach, isEarned, delay }) => {
  return (
    <div 
      className="flex flex-col items-center text-center p-4 bg-surface border border-border-color rounded-2xl transition-all duration-300 ease-in-out hover:border-accent/50 hover:-translate-y-1 hover:shadow-md animate-subtle-enter"
      style={{ animationDelay: `${delay}ms`}}
    >
      <div className={`relative w-24 h-24 mb-4 flex items-center justify-center`}>
        {isEarned ? (
          <>
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg"></div>
            <ach.icon className="w-16 h-16 text-accent" />
          </>
        ) : (
          <>
            <ach.icon className="w-16 h-16 text-secondary-text/30" />
            <div className="absolute inset-0 bg-background/50 rounded-full"></div>
            <LockClosedIcon className="w-6 h-6 absolute text-secondary-text/50" />
          </>
        )}
      </div>
      <h2 className={`text-lg font-bold ${isEarned ? 'text-primary-text' : 'text-secondary-text/70'}`}>
        {ach.name}
      </h2>
      <p className="text-sm text-secondary-text mt-1 flex-grow">{ach.description}</p>
      {isEarned && (
         <div className="mt-4 bg-accent-light text-accent font-bold px-3 py-1 rounded-full text-xs">UNLOCKED</div>
      )}
    </div>
  );
};


const AchievementsPage: React.FC = () => {
  const { currentUser } = useUser();

  if (!currentUser) return <AchievementsPageSkeleton />;

  const earnedAchievementIds = currentUser.achievements;

  return (
    <div className="font-prompt text-primary-text">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Awards</h1>
          <p className="text-secondary-text">Unlock awards by participating in the community!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {allAchievements.map((ach, index) => {
          const isEarned = earnedAchievementIds.includes(ach.id);
          return (
            <AchievementCard 
              key={ach.id} 
              ach={ach}
              isEarned={isEarned}
              delay={index * 50}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
