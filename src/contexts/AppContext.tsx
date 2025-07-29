import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Session, MemoryQuestion, AppSettings } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AppContextType {
  // Sessions
  sessions: Session[];
  setSessions: (sessions: Session[] | ((prev: Session[]) => Session[])) => void;
  currentSession: Session | null;
  setCurrentSession: (session: Session | null) => void;
  
  // Memory Questions
  memoryQuestions: MemoryQuestion[];
  setMemoryQuestions: (questions: MemoryQuestion[] | ((prev: MemoryQuestion[]) => MemoryQuestion[])) => void;
  
  // Settings
  settings: AppSettings;
  setSettings: (settings: AppSettings | ((prev: AppSettings) => AppSettings)) => void;
  
  // Helper functions
  createSession: (mode: 'unsaid' | 'closure' | 'therapy', title?: string) => Session;
  deleteSession: (sessionId: string) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const defaultMemoryQuestions: MemoryQuestion[] = [
  { id: '1', question: 'What is your favorite memory with this person?' },
  { id: '2', question: 'What would you want to tell them if they were here right now?' },
  { id: '3', question: 'What did they teach you about life?' },
  { id: '4', question: 'What do you miss most about them?' },
  { id: '5', question: 'How did they make you feel loved?' },
  { id: '6', question: 'What was their laugh like?' },
  { id: '7', question: 'What advice would they give you today?' },
  { id: '8', question: 'What are you grateful for about your time together?' },
];

const defaultSettings: AppSettings = {
  theme: 'light',
  voiceEnabled: true,
  ttsEnabled: true,
  soundsEnabled: true,
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useLocalStorage<Session[]>('unsaid-sessions', []);
  const [currentSession, setCurrentSession] = useLocalStorage<Session | null>('unsaid-current-session', null);
  const [memoryQuestions, setMemoryQuestions] = useLocalStorage<MemoryQuestion[]>('unsaid-memory-questions', defaultMemoryQuestions);
  const [settings, setSettings] = useLocalStorage<AppSettings>('unsaid-settings', defaultSettings);

  const createSession = (mode: 'unsaid' | 'closure' | 'therapy', title?: string): Session => {
    const session: Session = {
      id: uuidv4(),
      title: title || `${mode.charAt(0).toUpperCase() + mode.slice(1)} Session`,
      mode,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSessions(prev => [session, ...prev]);
    setCurrentSession(session);
    return session;
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  };

  const updateSessionTitle = (sessionId: string, title: string) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, title, updatedAt: new Date() } : s
    ));
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => prev ? { ...prev, title, updatedAt: new Date() } : null);
    }
  };

  return (
    <AppContext.Provider value={{
      sessions,
      setSessions,
      currentSession,
      setCurrentSession,
      memoryQuestions,
      setMemoryQuestions,
      settings,
      setSettings,
      createSession,
      deleteSession,
      updateSessionTitle,
    }}>
      {children}
    </AppContext.Provider>
  );
};