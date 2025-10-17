
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormField from '../components/FormField';
import FormTextArea from '../components/FormTextArea';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับไปโดยเร็วที่สุด');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-background flex flex-col min-h-screen text-primary-text">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-4 font-prompt">ติดต่อเรา</h1>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">เรายินดีรับฟังทุกความคิดเห็น คำถาม หรือข้อเสนอแนะจากคุณ</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="bg-surface p-8 rounded-2xl shadow-md border border-border-color">
              <h2 className="text-2xl font-bold text-primary-text mb-6 font-prompt">ส่งข้อความถึงเรา</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="ชื่อของคุณ" name="name" value={formData.name} onChange={handleChange} required />
                <FormField label="อีเมล" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <FormField label="หัวข้อ" name="subject" value={formData.subject} onChange={handleChange} required />
                <FormTextArea label="ข้อความ" name="message" value={formData.message} onChange={handleChange} rows={5} required />
                <button type="submit" className="w-full py-3 mt-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                  ส่งข้อความ
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-primary-text mb-2 font-prompt">ข้อมูลการติดต่อ</h2>
                <div className="flex items-start space-x-4">
                    <div className="bg-accent-light p-4 rounded-full">
                        <MapPinIcon className="w-6 h-6 text-accent"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary-text text-lg">ที่อยู่</h3>
                        <p className="text-secondary-text">123 ถนนสุขุมวิท, กรุงเทพมหานคร 10110</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <div className="bg-accent-light p-4 rounded-full">
                        <EnvelopeIcon className="w-6 h-6 text-accent"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary-text text-lg">อีเมล</h3>
                        <p className="text-secondary-text">contact@thaitimebank.net</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <div className="bg-accent-light p-4 rounded-full">
                        <PhoneIcon className="w-6 h-6 text-accent"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary-text text-lg">โทรศัพท์</h3>
                        <p className="text-secondary-text">02-123-4567</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
