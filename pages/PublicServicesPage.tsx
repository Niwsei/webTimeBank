

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { Service } from '../types';
import CustomSelect from '../components/CustomSelect';
import { useData } from '../context/DataContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicServicesPage: React.FC = () => {
  const { services } = useData();
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter(svc => {
      const matchQuery = svc.title.toLowerCase().includes(query.toLowerCase());
      const matchCategory = categoryFilter ? svc.category === categoryFilter : true;
      return matchQuery && matchCategory;
    });
  }, [query, categoryFilter, services]);

  const categoryOptions = [
    { value: '', label: '-- ทุกหมวดหมู่ --' },
    ...[...new Set(services.map(s => s.category))].map(cat => ({ value: cat, label: cat }))
  ];

  return (
    <div className="bg-background flex flex-col min-h-screen text-primary-text">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-text mb-2 font-prompt">กิจกรรมและบริการทั้งหมด</h1>
            <p className="text-secondary-text text-lg">ค้นพบทักษะและการช่วยเหลือที่หลากหลายในชุมชนของเรา</p>
          </div>

          <div className="mb-8 bg-surface border border-border-color p-4 sm:p-6 rounded-xl shadow-sm sticky top-20 z-30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ค้นหากิจกรรม, ทักษะ..."
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
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((svc, index) => (
                  <div key={svc.id} className="animate-subtle-enter" style={{ animationDelay: `${index * 50}ms` }}>
                    <Card {...svc} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-secondary-text bg-surface p-8 rounded-xl shadow-sm border border-border-color">
                <p className="font-semibold text-lg">ไม่พบกิจกรรม/บริการที่ตรงกับการค้นหาของคุณ</p>
              </div>
            )}
          </div>
        </div>

        <section className="bg-muted py-20 mt-16">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl font-bold text-primary-text mb-4 font-prompt">เข้าร่วมชุมชนแห่งการแบ่งปัน</h2>
                 <p className="text-secondary-text max-w-2xl mx-auto mb-8">สมัครสมาชิกเพื่อเข้าร่วมกิจกรรม, ขอความช่วยเหลือ หรือแบ่งปัน-ทักษะของคุณกับผู้อื่น</p>
                 <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link to="/register" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-accent/20">
                        สมัครสมาชิก
                    </Link>
                    <Link to="/login" className="bg-surface backdrop-blur-sm text-primary-text border border-border-color font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 hover:bg-muted shadow-lg">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PublicServicesPage;
