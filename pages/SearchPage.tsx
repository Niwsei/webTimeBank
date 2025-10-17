import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { Service, ServiceRequest } from '../types';
import CustomSelect from '../components/CustomSelect';
import { useData } from '../context/DataContext';

const SearchPage: React.FC = () => {
  const { services, requests } = useData();
  const [view, setView] = useState<'offers' | 'requests'>('offers');
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter(svc => {
      const matchQuery = svc.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = categoryFilter ? svc.category === categoryFilter : true;
      return matchQuery && matchCategory;
    });
  }, [query, categoryFilter, services]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchQuery = req.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = categoryFilter ? req.category === categoryFilter : true;
      return matchQuery && matchCategory;
    });
  }, [query, categoryFilter, requests]);
  
  const commonCategories = [...new Set([...services.map(s => s.category), ...requests.map(r => r.category)])];
  const categoryOptions = [{value: '', label: '-- All Categories --'}, ...commonCategories.map(cat => ({ value: cat, label: cat }))];


  return (
    <div className="font-prompt">
        <h1 className="text-3xl font-bold text-primary-text mb-6">Discover</h1>
        
        {/* View Toggle */}
        <div className="relative flex bg-muted p-1 rounded-full mb-6 max-w-sm mx-auto">
            <span 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-full shadow-md"
              style={{ 
                transform: view === 'offers' ? 'translateX(4px)' : 'translateX(calc(100% + 4px))',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
               }}
            ></span>
            <button onClick={() => setView('offers')} className={`relative z-10 w-1/2 py-2 text-center rounded-full font-bold transition-colors ${view === 'offers' ? 'text-white' : 'text-secondary-text hover:text-primary-text'}`}>
                Offers
            </button>
            <button onClick={() => setView('requests')} className={`relative z-10 w-1/2 py-2 text-center rounded-full font-bold transition-colors ${view === 'requests' ? 'text-white' : 'text-secondary-text hover:text-primary-text'}`}>
                Requests
            </button>
        </div>

        <div className="mb-8 bg-surface border border-border-color p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={view === 'offers' ? "Search services, skills..." : "Search help requests..."}
              className="w-full px-4 py-3 bg-background border border-border-color rounded-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 ease-in-out"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <CustomSelect 
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
            />
          </div>
        </div>

        <div>
          {view === 'offers' && (
             filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((svc, index) => <div key={svc.id} className="animate-subtle-enter" style={{animationDelay: `${index * 50}ms`}}><Card {...svc} /></div>)}
                </div>
              ) : (
                <div className="text-center text-secondary-text bg-surface p-8 rounded-xl shadow-sm border border-border-color">
                    <p className="font-semibold text-lg">No services found matching your search.</p>
                </div>
              )
          )}
          {view === 'requests' && (
              filteredRequests.length > 0 ? (
                <div className="space-y-4">
                  {filteredRequests.map((req, index) => (
                     <Link to={`/request/${req.id}`} key={req.id} className="block bg-surface border border-border-color p-5 rounded-xl shadow-sm animate-subtle-enter transition-colors hover:border-accent" style={{animationDelay: `${index * 50}ms`}}>
                        <div className="flex items-start space-x-4">
                            <img src={req.user.avatarUrl} alt={req.user.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-primary-text text-lg">{req.title}</h3>
                                <p className="text-sm text-secondary-text mb-2">by {req.user.name} • <span className="font-semibold text-accent">{req.category}</span></p>
                                <p className="text-primary-text line-clamp-2">{req.description}</p>
                            </div>
                        </div>
                    </Link>
                  ))}
                </div>
              ) : (
                 <div className="text-center text-secondary-text bg-surface p-8 rounded-xl shadow-sm border border-border-color">
                    <p className="font-semibold text-lg">No requests found matching your search.</p>
                </div>
              )
          )}
        </div>
    </div>
  );
};

export default SearchPage;