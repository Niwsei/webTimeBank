import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import { ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a backend API call
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-prompt">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-subtle-enter">
            <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-primary-text">
                <ClockIcon className="w-10 h-10 text-accent" />
                <span className="font-prompt">คลังเวลา</span>
            </Link>
        </div>
        <div className="bg-surface p-8 rounded-2xl shadow-md border border-border-color animate-subtle-enter" style={{animationDelay: '100ms'}}>
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-primary-text font-prompt">ตรวจสอบอีเมลของคุณ</h2>
              <p className="text-secondary-text mb-6">หากมีบัญชีที่เชื่อมโยงกับ {email} อยู่ในระบบ เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้แล้ว</p>
              <Link to="/login" className="font-medium text-accent hover:underline inline-flex items-center">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-2 text-center text-primary-text font-prompt">ลืมรหัสผ่าน?</h2>
              <p className="text-center text-secondary-text mb-6">ไม่ต้องกังวล! กรอกอีเมลของคุณด้านล่าง แล้วเราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้</p>
              <FormField
                label="อีเมล"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="กรอกอีเมลที่ใช้สมัคร"
              />
              <button type="submit" className="w-full py-3 mt-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                ส่งลิงก์รีเซ็ตรหัสผ่าน
              </button>
              <p className="text-center text-sm text-secondary-text mt-6">
                <Link to="/login" className="font-medium text-accent hover:underline">กลับไปหน้าเข้าสู่ระบบ</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
