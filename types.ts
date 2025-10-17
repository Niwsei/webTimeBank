
import React from 'react';

export interface UserStub {
  id: number;
  name: string;
  avatarUrl?: string;
}

export interface UserStats {
  hoursGiven: number;
  hoursReceived: number;
  peopleHelped: number;
  servicesCreated: number;
}

export interface User extends UserStub {
  firstName: string;
  lastName: string;
  email: string;
  idCardNumber: string;
  bio: string;
  skills: string[];
  timeCredit: number;
  stats: UserStats;
  achievements: number[]; // array of achievement IDs
  family: number[]; // array of user IDs
}

export interface Service {
  id: number;
  title: string;
  category: string;
  duration: number;
  unit: 'ชั่วโมง' | 'นาที' | 'วัน' | string;
  imageUrl: string;
  user: UserStub;
}

export interface Comment {
    id: number;
    text: string;
    user: UserStub;
}

export interface Reactions {
    [key: string]: number;
}

export interface ServiceRequest {
    id: number;
    title: string;
    category: string;
    description: string;
    user: UserStub;
    comments: Comment[];
    reactions: Reactions;
    duration: number;
    unit: string;
    status: 'open' | 'in_progress' | 'completed';
    applicants: UserStub[];
    selectedProvider: UserStub | null;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
}

export interface Transaction {
    id: number;
    type: 'deposit' | 'withdrawal' | 'transfer-in' | 'transfer-out';
    description: string;
    amount: number;
    date: string; // ISO string format
    from?: string; // name
    to?: string; // name
}
