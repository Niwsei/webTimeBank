
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    idCardNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
     if (formData.idCardNumber.length !== 13 || !/^\d+$/.test(formData.idCardNumber)) {
      setError('ID Card Number must be 13 digits.');
      return;
    }
    setError('');
    
    register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      idCardNumber: formData.idCardNumber,
      bio: 'New member of the Time Bank community!',
      skills: [],
      avatarUrl: `https://i.pravatar.cc/150?u=${formData.email}`,
    });
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
        <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl shadow-md border border-border-color animate-subtle-enter" style={{ animationDelay: '100ms' }}>
          <h2 className="text-2xl font-bold mb-6 text-center text-primary-text font-prompt">สร้างบัญชีใหม่</h2>
          <div className="grid grid-cols-2 gap-x-4">
             <FormField
              label="ชื่อจริง"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              label="นามสกุล"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <FormField
            label="อีเมล"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            label="เลขบัตรประชาชน (13 หลัก)"
            name="idCardNumber"
            type="text"
            value={formData.idCardNumber}
            onChange={handleChange}
            required
            maxLength={13}
            error={error && error.includes('ID Card') ? error : undefined}
          />
          <FormField
            label="รหัสผ่าน"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormField
            label="ยืนยันรหัสผ่าน"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={error && error.includes('Passwords') ? error : undefined}
          />
          <button type="submit" className="w-full py-3 mt-6 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
            สมัครสมาชิก
          </button>
          <p className="text-center text-sm text-secondary-text mt-8">
            มีบัญชีอยู่แล้ว? <Link to="/login" className="font-medium text-accent hover:underline">เข้าสู่ระบบที่นี่</Link>
          </p>
        </form>
        <div className="text-center mt-6 animate-subtle-enter" style={{ animationDelay: '200ms' }}>
            <Link to="/" className="text-sm text-secondary-text hover:text-accent transition-colors inline-flex items-center group">
                <ArrowLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                กลับไปหน้าหลัก
            </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
