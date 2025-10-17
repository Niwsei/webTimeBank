
import React from 'react';

const AchievementsPageSkeleton: React.FC = () => {
  return (
    <div className="font-prompt animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <div className="h-9 w-48 bg-muted rounded mb-2"></div>
          <div className="h-5 w-64 bg-muted rounded"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 bg-surface border border-border-color rounded-2xl space-y-3">
                <div className="w-24 h-24 bg-muted rounded-full"></div>
                <div className="h-6 w-3/4 bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-1/2 bg-muted rounded mt-1"></div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPageSkeleton;
