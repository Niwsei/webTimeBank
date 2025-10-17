
import React from 'react';

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
        <div className="bg-surface border border-border-color rounded-2xl shadow-md overflow-hidden">
            <div className="h-40 bg-muted"></div>
            <div className="relative">
                 <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full bg-muted ring-4 ring-surface"></div>
                </div>
            </div>
            <div className="pt-20 pb-8 px-6 text-center space-y-3">
                <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            </div>
            <div className="p-6">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 border-y border-border-color py-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-muted rounded-full"></div>
                            <div className="h-4 bg-muted rounded w-16 mt-2"></div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <div className="h-6 w-24 bg-muted rounded mb-4"></div>
                    <div className="flex flex-wrap gap-3">
                        <div className="h-10 w-28 bg-muted rounded-full"></div>
                        <div className="h-10 w-36 bg-muted rounded-full"></div>
                        <div className="h-10 w-24 bg-muted rounded-full"></div>
                    </div>
                </div>
                 <div className="mt-8 border-t border-border-color pt-6 flex justify-center">
                    <div className="h-12 w-32 bg-muted rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePageSkeleton;
