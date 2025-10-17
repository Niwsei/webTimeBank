import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Service, ServiceRequest, Comment, UserStub } from '../types';

// --- MOCK INITIAL DATA ---
const initialServices: Service[] = [
  { 
    id: 1, 
    title: 'สอนพื้นฐานการเขียนเว็บไซต์', 
    category: 'การศึกษา', 
    duration: 2, 
    unit: 'ชั่วโมง',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2970&auto=format&fit=crop',
    user: { id: 201, name: 'วิชาญ สอนดี', avatarUrl: 'https://i.pravatar.cc/150?img=4' }
  },
  { 
    id: 2, 
    title: 'ซ่อมจักรยานและมอเตอร์ไซค์เล็ก', 
    category: 'งานช่าง', 
    duration: 1, 
    unit: 'ชั่วโมง',
    imageUrl: 'https://images.unsplash.com/photo-1582213524330-8c8f3a8b2776?q=80&w=2970&auto=format&fit=crop',
    user: { id: 202, name: 'ชำนาญ การช่าง', avatarUrl: 'https://i.pravatar.cc/150?img=5' }
  },
];

const initialRequests: ServiceRequest[] = [
    { 
        id: 1, 
        title: 'ต้องการคนช่วยสอนใช้สมาร์ทโฟนให้ผู้สูงอายุ', 
        category: 'เทคโนโลยี', 
        description: 'อยากให้ช่วยสอนการใช้งาน Line และ Facebook ขั้นพื้นฐานให้คุณแม่ครับ ท่านไม่เคยใช้เลย อยากให้มีคนใจเย็นๆ มาช่วยสอนหน่อยครับ', 
        user: { id: 203, name: 'เอกพล', avatarUrl: 'https://i.pravatar.cc/150?img=9' }, 
        comments: [{id: 1, text: "สนใจครับ ผมสอนผู้ใหญ่บ่อยๆ", user: {id: 204, name: "สมชาย", avatarUrl: 'https://i.pravatar.cc/150?img=11'}}], 
        reactions: {'👍': 5, '❤️': 2},
        duration: 2,
        unit: 'ชั่วโมง',
        status: 'open',
        applicants: [{id: 204, name: "สมชาย", avatarUrl: 'https://i.pravatar.cc/150?img=11'}],
        selectedProvider: null
    },
    { 
        id: 2, 
        title: 'หาคนช่วยย้ายของเข้าบ้านใหม่', 
        category: 'งานบ้าน', 
        description: 'มีของหนักนิดหน่อยครับ เป็นกล่องหนังสือกับโต๊ะเล็กๆ ใช้เวลาไม่น่าเกิน 2 ชั่วโมง แถวลาดพร้าวครับ', 
        user: { id: 205, name: 'น้ำฝน', avatarUrl: 'https://i.pravatar.cc/150?img=10' }, 
        comments: [], 
        reactions: {'👍': 8},
        duration: 2,
        unit: 'ชั่วโมง',
        status: 'open',
        applicants: [],
        selectedProvider: null
    },
];

interface DataContextType {
  services: Service[];
  requests: ServiceRequest[];
  addService: (service: Omit<Service, 'id'>) => void;
  addRequest: (request: Omit<ServiceRequest, 'id' | 'comments' | 'reactions' | 'status' | 'applicants' | 'selectedProvider'>) => void;
  addCommentToRequest: (requestId: number, comment: Omit<Comment, 'id'>) => void;
  addReactionToRequest: (requestId: number, emoji: string) => void;
  applyToRequest: (requestId: number, applicant: UserStub) => void;
  selectProvider: (requestId: number, provider: UserStub) => void;
  completeRequest: (requestId: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('timebank-services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('timebank-requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  useEffect(() => {
    localStorage.setItem('timebank-services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('timebank-requests', JSON.stringify(requests));
  }, [requests]);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = { ...service, id: Date.now() };
    setServices(prev => [newService, ...prev]);
  };

  const addRequest = (request: Omit<ServiceRequest, 'id' | 'comments' | 'reactions'| 'status' | 'applicants' | 'selectedProvider'>) => {
    const newRequest: ServiceRequest = {
        ...request, 
        id: Date.now(), 
        comments: [], 
        reactions: {},
        status: 'open',
        applicants: [],
        selectedProvider: null,
    };
    setRequests(prev => [newRequest, ...prev]);
  };
  
  const addCommentToRequest = (requestId: number, comment: Omit<Comment, 'id'>) => {
      const newComment: Comment = { ...comment, id: Date.now() };
      setRequests(prev => prev.map(req => 
          req.id === requestId 
          ? { ...req, comments: [newComment, ...req.comments] }
          : req
      ));
  };

  const addReactionToRequest = (requestId: number, emoji: string) => {
      setRequests(prev => prev.map(req => {
          if (req.id !== requestId) return req;
          const newReactions = { ...req.reactions };
          newReactions[emoji] = (newReactions[emoji] || 0) + 1;
          return { ...req, reactions: newReactions };
      }));
  };

  const applyToRequest = (requestId: number, applicant: UserStub) => {
      setRequests(prev => prev.map(req => 
          req.id === requestId && !req.applicants.some(a => a.id === applicant.id)
          ? { ...req, applicants: [...req.applicants, applicant] }
          : req
      ));
  };

  const selectProvider = (requestId: number, provider: UserStub) => {
      setRequests(prev => prev.map(req => 
          req.id === requestId
          ? { ...req, selectedProvider: provider, status: 'in_progress' }
          : req
      ));
  };
  
  const completeRequest = (requestId: number) => {
      setRequests(prev => prev.map(req => 
          req.id === requestId
          ? { ...req, status: 'completed' }
          : req
      ));
  };

  return (
    <DataContext.Provider value={{ services, requests, addService, addRequest, addCommentToRequest, addReactionToRequest, applyToRequest, selectProvider, completeRequest }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};