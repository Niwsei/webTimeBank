
import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-color">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-text">
          <ClockIcon className="w-8 h-8 text-accent" />
          <span className="font-prompt">คลังเวลา</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-secondary-text hover:text-accent font-medium transition-colors">หน้าหลัก</Link>
          <Link to="/about" className="text-secondary-text hover:text-accent font-medium transition-colors">คลังเวลาคืออะไร</Link>
          <Link to="/services" className="text-secondary-text hover:text-accent font-medium transition-colors">กิจกรรม/บริการ</Link>
          <Link to="/contact" className="text-secondary-text hover:text-accent font-medium transition-colors">ติดต่อเรา</Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Link to="/login" className="text-secondary-text hover:text-accent font-medium px-4 py-2 rounded-md transition-colors">เข้าสู่ระบบ</Link>
          <Link to="/register" className="bg-accent hover:bg-accent-hover text-white font-medium px-4 py-2 rounded-md shadow-lg shadow-accent/20 transition-colors">สมัครสมาชิก</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;