import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate the password. Here we just log in.
    login(email, "password"); // Simple login, no real auth
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 font-prompt">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-subtle-enter">
            <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-primary-text">
                <ClockIcon className="w-10 h-10 text-accent" />
                <span className="font-prompt">คลังเวลา</span>
            </Link>
        </div>
        <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl shadow-md border border-border-color animate-subtle-enter" style={{animationDelay: '100ms'}}>
          <h2 className="text-2xl font-bold mb-6 text-center text-primary-text font-prompt">เข้าสู่ระบบ</h2>
          <div className="space-y-4">
            <FormField
              label="อีเมล"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="กรอกอีเมลของคุณ"
            />
             <FormField
              label="รหัสผ่าน"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          <div className="flex items-center justify-between mt-6 text-sm">
            <label className="flex items-center text-secondary-text">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
              <span className="ml-2">จดจำฉันไว้ในระบบ</span>
            </label>
            <Link to="/forgot-password" className="font-medium text-accent hover:underline">ลืมรหัสผ่าน?</Link>
          </div>
          <button type="submit" className="w-full py-3 mt-8 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
            เข้าสู่ระบบ
          </button>
          
          <p className="text-center text-sm text-secondary-text mt-8">
            ยังไม่มีบัญชี? <Link to="/register" className="font-medium text-accent hover:underline">สมัครสมาชิกที่นี่</Link>
          </p>
        </form>
        <div className="text-center mt-6 animate-subtle-enter" style={{animationDelay: '200ms'}}>
            <Link to="/" className="text-sm text-secondary-text hover:text-accent transition-colors inline-flex items-center group">
                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                กลับไปหน้าหลัก
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;