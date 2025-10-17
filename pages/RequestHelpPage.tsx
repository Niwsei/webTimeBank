
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import FormField from '../components/FormField';
import FormTextArea from '../components/FormTextArea';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { ServiceRequest } from '../types';
import { useToast } from '../context/ToastContext';

const categoryOptions = [
  { value: 'เทคโนโลยี', label: 'Technology' },
  { value: 'งานบ้าน', label: 'Household' },
  { value: 'ดูแลสวน', label: 'Gardening' },
  { value: 'การศึกษา', label: 'Education' },
  { value: 'งานช่าง', label: 'Handiwork' },
  { value: 'อื่นๆ', label: 'Other' },
];

const RequestHelpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    unit: 'Hours',
  });
  const navigate = useNavigate();
  const { addRequest } = useData();
  const { currentUser } = useUser();
  const { showToast } = useToast();

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
    
    const requestData: Omit<ServiceRequest, 'id' | 'comments' | 'reactions' | 'status' | 'applicants' | 'selectedProvider'> = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      duration: parseInt(formData.duration) || 1,
      unit: formData.unit,
      user: { 
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`, 
        avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`
      }
    };
    addRequest(requestData);
    
    showToast('Your request has been posted!', 'success');
    navigate('/dashboard'); 
  };
  
  const isFormInvalid = !formData.title || !formData.category || !formData.description || !formData.duration;

  return (
    <div className="max-w-2xl mx-auto font-prompt">
       <h1 className="text-3xl font-bold text-primary-text mb-6">Post a Help Request</h1>
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-xl shadow-md border border-border-color space-y-6">
        <FormField 
            label="What do you need help with?"
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="e.g., Teach me how to use a smartphone"
        />
        <CustomSelect
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={handleSelectChange}
            placeholder="-- Select a Category --"
        />
         <div>
              <label className="block text-secondary-text font-medium mb-2">Estimated Duration</label>
              <div className="flex">
                <input 
                    name="duration" 
                    type="number" 
                    value={formData.duration} 
                    onChange={handleChange} 
                    className="w-1/2 bg-surface border border-border-color rounded-l-lg text-primary-text placeholder-secondary-text/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 px-4 py-3" 
                    required 
                    placeholder="e.g., 2"
                />
                <span className="px-4 py-3 border-y border-r border-border-color bg-background text-secondary-text rounded-r-lg">Hours</span>
              </div>
            </div>
        <FormTextArea
            label="Add more details"
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={5}
            required
            placeholder="Describe what you need help with..."
        />
        <div className="pt-2">
            <button 
                type="submit" 
                disabled={isFormInvalid}
                className="w-full py-3 bg-accent text-white font-bold text-lg rounded-md hover:bg-accent-hover transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transform active:scale-95 shadow-lg shadow-accent/20"
            >
                Post Request
            </button>
        </div>
      </form>
    </div>
  );
};

export default RequestHelpPage;
