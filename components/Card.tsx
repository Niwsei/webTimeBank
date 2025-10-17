import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Service } from '../types';

const Card: React.FC<Omit<Service, 'id'>> = ({ title, category, duration, unit, imageUrl, user }) => {
  return (
    <div className="bg-surface border border-border-color rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:border-accent/50 hover:-translate-y-1 hover:shadow-lg group">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{category}</div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary-text text-lg mt-1 mb-3 h-14 font-prompt">{title}</h3>
        <div className="flex items-center justify-between border-t border-border-color pt-4">
          <div className="flex items-center">
            <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover mr-3" />
            <span className="text-sm text-secondary-text font-medium">{user.name}</span>
          </div>
          <div className="text-right">
             <p className="text-sm text-secondary-text flex items-center">
                <ClockIcon className="w-4 h-4 mr-1.5" />
                {duration} {unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;