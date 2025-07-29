export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  tier: 'guest' | 'free' | 'premium';
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  audioUrl?: string;
}

export interface Session {
  id: string;
  title: string;
  mode: 'unsaid' | 'closure' | 'therapy';
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoryQuestion {
  id: string;
  question: string;
  answer?: string;
  answeredAt?: Date;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  voiceEnabled: boolean;
  ttsEnabled: boolean;
  soundsEnabled: boolean;
}