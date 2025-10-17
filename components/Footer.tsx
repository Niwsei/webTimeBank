
import React from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted text-primary-text">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-2xl font-bold mb-4 text-primary-text">
              <ClockIcon className="w-8 h-8 text-accent" />
              <span className="font-prompt">คลังเวลา</span>
            </div>
            <p className="text-secondary-text">
              แพลตฟอร์มกลางในการแลกเปลี่ยนเวลาและทักษะ สร้างสรรค์สังคมแห่งการแบ่งปัน
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-text">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-text hover:text-primary-text">เกี่ยวกับเรา</Link></li>
              <li><Link to="/search" className="text-secondary-text hover:text-primary-text">กิจกรรมทั้งหมด</Link></li>
              <li><Link to="/contact" className="text-secondary-text hover:text-primary-text">ติดต่อเรา</Link></li>
              <li><a href="#" className="text-secondary-text hover:text-primary-text">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-text">ติดต่อเรา</h3>
            <p className="text-secondary-text">123 ถนนสุขุมวิท,<br />กรุงเทพมหานคร 10110</p>
            <p className="text-secondary-text mt-2">อีเมล: contact@thaitimebank.net</p>
            <p className="text-secondary-text">โทร: 02-123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-text">ติดตามเรา</h3>
            <div className="flex space-x-4">
                <a href="#" className="text-secondary-text hover:text-primary-text">Facebook</a>
                <a href="#" className="text-secondary-text hover:text-primary-text">Line</a>
                <a href="#" className="text-secondary-text hover:text-primary-text">YouTube</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border-color mt-8 pt-6 text-center text-secondary-text">
          <p>&copy; 2024 คลังเวลา. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
