
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import FormField from '../components/FormField';
import FormTextArea from '../components/FormTextArea';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { Service } from '../types';
import { useToast } from '../context/ToastContext';

const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({ step, totalSteps }) => {
    return (
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div 
          className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step -1) / (totalSteps-1)) * 100}%` }}
        ></div>
      </div>
    );
};

const categoryOptions = [
  { value: 'การศึกษา', label: 'Education' },
  { value: 'งานบ้าน', label: 'Household' },
  { value: 'งานช่าง', label: 'Handiwork' },
  { value: 'เทคโนโลยี', label: 'Technology' },
  { value: 'ดูแลสวน', label: 'Gardening' },
  { value: 'อื่นๆ', label: 'Other' },
];

const CreateServicePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    unit: 'ชั่วโมง',
    date: '',
    description: '',
  });
  const navigate = useNavigate();
  const { addService } = useData();
  const { currentUser, updateUserStats } = useUser();
  const { showToast } = useToast();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({...prev, category: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const serviceData: Omit<Service, 'id'> = {
      title: formData.title,
      category: formData.category,
      duration: parseInt(formData.duration) || 1,
      unit: formData.unit,
      user: { 
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`, 
        avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`
      },
      imageUrl: `https://source.unsplash.com/random/800x600?${formData.category}`
    };

    addService(serviceData);
    
    updateUserStats({ servicesCreated: (currentUser.stats.servicesCreated || 0) + 1 });

    showToast('Service created successfully!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto font-prompt">
       <h1 className="text-3xl font-bold text-primary-text mb-6">Create a New Service</h1>
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-xl shadow-md border border-border-color">
        <ProgressBar step={step} totalSteps={3} />
        {step === 1 && (
          <div className="animate-subtle-enter space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-text">Step 1: Basic Info</h2>
            <FormField
              label="Service/Activity Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <CustomSelect 
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={handleSelectChange}
              placeholder="-- Select a Category --"
            />
            <div className="flex justify-end pt-4">
                <button type="button" onClick={nextStep} className="px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-all duration-200 active:scale-95 transform">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-subtle-enter space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-text">Step 2: Time Details</h2>
            <div>
              <label className="block text-secondary-text font-medium mb-2">Duration</label>
              <div className="flex">
                <input name="duration" type="number" value={formData.duration} onChange={handleChange} className="w-1/2 bg-surface border border-border-color rounded-l-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 px-4 py-3" required />
                <span className="px-4 py-3 border-y border-r border-border-color bg-background text-secondary-text rounded-r-lg">Hours</span>
              </div>
            </div>
            <FormField
              label="Date/Timeframe"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors active:scale-95">Back</button>
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-accent text-white font-semibold rounded-md hover:bg-accent-hover transition-colors active:scale-95">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-subtle-enter space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-text">Step 3: Additional Info</h2>
            <FormTextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
            />
            <div className="flex justify-between pt-4">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors active:scale-95">Back</button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors active:scale-95">Create Service</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateServicePage;
