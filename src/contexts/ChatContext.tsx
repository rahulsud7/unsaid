import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ChatMode = 'therapy' | 'unsaid' | 'closure';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mode: ChatMode;
}

export interface Session {
  id: string;
  title: string;
  mode: ChatMode;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageStats {
  therapy: number;
  unsaid: number;
  closure: number;
  lastReset: string;
}

interface ChatContextType {
  sessions: Session[];
  currentSession: Session | null;
  usageStats: UsageStats;
  createSession: (mode: ChatMode, title?: string) => Session;
  selectSession: (sessionId: string) => void;
  addMessage: (content: string, sender: 'user' | 'ai') => void;
  updateUsage: (mode: ChatMode) => void;
  resetUsage: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('unsaid-sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const [usageStats, setUsageStats] = useState<UsageStats>(() => {
    const saved = localStorage.getItem('unsaid-usage');
    const today = new Date().toDateString();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.lastReset !== today) {
        return { therapy: 0, unsaid: 0, closure: 0, lastReset: today };
      }
      return parsed;
    }
    
    return { therapy: 0, unsaid: 0, closure: 0, lastReset: today };
  });

  const saveSessions = (newSessions: Session[]) => {
    setSessions(newSessions);
    localStorage.setItem('unsaid-sessions', JSON.stringify(newSessions));
  };

  const saveUsage = (newUsage: UsageStats) => {
    setUsageStats(newUsage);
    localStorage.setItem('unsaid-usage', JSON.stringify(newUsage));
  };

  const createSession = (mode: ChatMode, title?: string): Session => {
    const session: Session = {
      id: Date.now().toString(),
      title: title || `${mode.charAt(0).toUpperCase() + mode.slice(1)} Session`,
      mode,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newSessions = [session, ...sessions];
    saveSessions(newSessions);
    setCurrentSession(session);
    return session;
  };

  const selectSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const addMessage = (content: string, sender: 'user' | 'ai') => {
    if (!currentSession) return;

    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      mode: currentSession.mode
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, message],
      updatedAt: new Date()
    };

    const updatedSessions = sessions.map(s => 
      s.id === currentSession.id ? updatedSession : s
    );

    saveSessions(updatedSessions);
    setCurrentSession(updatedSession);
  };

  const updateUsage = (mode: ChatMode) => {
    const today = new Date().toDateString();
    const newUsage = {
      ...usageStats,
      [mode]: usageStats[mode] + 1,
      lastReset: today
    };
    saveUsage(newUsage);
  };

  const resetUsage = () => {
    const today = new Date().toDateString();
    const newUsage = { therapy: 0, unsaid: 0, closure: 0, lastReset: today };
    saveUsage(newUsage);
  };

  return (
    <ChatContext.Provider value={{
      sessions,
      currentSession,
      usageStats,
      createSession,
      selectSession,
      addMessage,
      updateUsage,
      resetUsage
    }}>
      {children}
    </ChatContext.Provider>
  );
};