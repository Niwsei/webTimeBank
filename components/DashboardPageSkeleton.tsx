
import React from 'react';

const DashboardPageSkeleton: React.FC = () => {
  return (
    <div className="font-prompt space-y-8 animate-pulse">
      <div>
        <div className="h-9 w-3/4 bg-muted rounded mb-2"></div>
        <div className="h-5 w-1/2 bg-muted rounded"></div>
      </div>
      
      <div className="bg-surface border border-border-color rounded-2xl p-6 text-center shadow-sm space-y-2">
          <div className="h-5 w-24 bg-muted rounded-full mx-auto"></div>
          <div className="h-14 w-32 bg-muted rounded-lg mx-auto my-2"></div>
          <div className="h-7 w-40 bg-muted rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="h-28 bg-surface border border-border-color rounded-2xl"></div>
          <div className="h-28 bg-surface border border-border-color rounded-2xl"></div>
          <div className="h-28 bg-surface border border-border-color rounded-2xl"></div>
          <div className="h-28 bg-surface border border-border-color rounded-2xl"></div>
      </div>
      
      <div>
        <div className="h-8 w-1/3 bg-muted rounded mb-4"></div>
        <div className="bg-surface border border-border-color rounded-2xl p-4 space-y-4 shadow-sm">
            <div className="space-y-2">
                <div className="h-16 bg-muted rounded-xl"></div>
                <div className="h-16 bg-muted rounded-xl"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageSkeleton;
