
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, ShareIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { User } from '../types';
import { useUser } from '../context/UserContext';
import ProfilePageSkeleton from '../components/ProfilePageSkeleton';

const StatCircle: React.FC<{ value: number, label: string, colorClass: string }> = ({ value, label, colorClass }) => (
    <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="8" className="text-border-color" fill="transparent" />
                <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="8" className={colorClass} fill="transparent"
                    strokeDasharray={339.292}
                    strokeDashoffset={339.292 - (value / 50) * 339.292} // Assuming max value of 50 for visuals
                    strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-bold text-primary-text">{value}</span>
        </div>
        <p className="text-secondary-text mt-2 text-sm font-medium">{label}</p>
    </div>
);


const RenderAvatar: React.FC<{ user: User }> = ({ user }) => {
  if (user.avatarUrl) {
    return <img src={user.avatarUrl} alt="avatar" className="w-32 h-32 rounded-full object-cover ring-4 ring-surface shadow-lg" />;
  } else {
    const initial = user.firstName.charAt(0);
    return (
      <div className="w-32 h-32 rounded-full bg-muted text-accent flex items-center justify-center text-5xl font-bold ring-4 ring-surface shadow-lg">
        {initial}
      </div>
    );
  }
};

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  if (!currentUser) {
    return <ProfilePageSkeleton />;
  }
  
  const user = currentUser;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto font-prompt text-primary-text">
        <div className="bg-surface border border-border-color rounded-2xl shadow-md overflow-hidden">
            <div className="h-40 bg-muted relative">
                <div className="absolute top-4 right-4 flex space-x-2">
                     <button className="text-secondary-text hover:text-primary-text bg-surface/50 p-2 rounded-full backdrop-blur-sm transition-colors">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    <button className="text-secondary-text hover:text-primary-text bg-surface/50 p-2 rounded-full backdrop-blur-sm transition-colors">
                        <PencilIcon className="w-5 h-5" />
                    </button>
                </div>
                 <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <RenderAvatar user={user} />
                </div>
            </div>

            <div className="pt-20 pb-8 px-6 text-center">
                <h1 className="text-3xl font-bold text-primary-text">{user.firstName} {user.lastName}</h1>
                <p className="text-secondary-text mt-1">{user.bio}</p>
            </div>

            <div className="p-6">
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 border-y border-border-color py-6">
                    <StatCircle value={user.stats.hoursGiven} label="ชั่วโมงที่แบ่งปัน" colorClass="text-green-500" />
                    <StatCircle value={user.stats.hoursReceived} label="ชั่วโมงที่ได้รับ" colorClass="text-sky-500" />
                    <StatCircle value={user.stats.peopleHelped} label="คนที่ช่วยเหลือ" colorClass="text-accent" />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-primary-text mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {user.skills.length > 0 ? user.skills.map(skill => (
                        <span key={skill} className="bg-muted text-primary-text text-base font-medium px-4 py-2 rounded-full">
                            {skill}
                        </span>
                        )) : <p className="text-secondary-text">No skills listed yet.</p>}
                    </div>
                </div>
                 <div className="mt-8 border-t border-border-color pt-6 flex justify-center">
                    <button onClick={handleLogout} className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors">
                        <ArrowRightOnRectangleIcon className="w-6 h-6"/>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
