// Mock API service layer for Unsaid AI
// Replace with actual API calls when backend is ready

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  tier: 'guest' | 'free' | 'premium';
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  mode: 'therapy' | 'unsaid' | 'closure';
}

interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

// Base API configuration
const API_BASE_URL = '/api';

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (response.status === 401) {
    // Auto-logout on unauthorized
    localStorage.removeItem('unsaid-user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  const data = await response.json();
  return data;
};

export const apiService = {
  // Authentication
  async authenticateWithGoogle(token: string): Promise<ApiResponse<User>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        tier: 'free'
      }
    };
  },

  // User management
  async getUser(): Promise<ApiResponse<User>> {
    const userData = localStorage.getItem('unsaid-user');
    if (userData) {
      return {
        success: true,
        data: JSON.parse(userData)
      };
    }
    
    throw new Error('User not found');
  },

  // Chat functionality
  async sendMessage(content: string, mode: 'therapy' | 'unsaid' | 'closure', sessionId: string): Promise<ApiResponse<ChatMessage>> {
    // Mock AI response based on mode
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let aiResponse = '';
    
    switch (mode) {
      case 'therapy':
        aiResponse = "I hear you, and I want you to know that your feelings are valid. It takes courage to share what's on your mind. How are you feeling about this situation right now?";
        break;
      case 'unsaid':
        aiResponse = "Thank you for sharing this memory with me. I can sense how meaningful this is to you. What emotions come up when you think about this experience?";
        break;
      case 'closure':
        aiResponse = "I understand how important it is for you to express these feelings. Your love and the bond you shared continue to be meaningful. What would you most want them to know?";
        break;
    }

    return {
      success: true,
      data: {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        mode
      }
    };
  },

  // Memory management
  async getMemories(): Promise<ApiResponse<Memory[]>> {
    const memories = localStorage.getItem('unsaid-memories');
    return {
      success: true,
      data: memories ? JSON.parse(memories) : []
    };
  },

  async uploadMemory(title: string, content: string, tags: string[]): Promise<ApiResponse<Memory>> {
    const memory: Memory = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      tags
    };

    const existingMemories = localStorage.getItem('unsaid-memories');
    const memories = existingMemories ? JSON.parse(existingMemories) : [];
    memories.push(memory);
    localStorage.setItem('unsaid-memories', JSON.stringify(memories));

    return {
      success: true,
      data: memory
    };
  },

  // Closure mode
  async sendClosureMessage(content: string, personName: string): Promise<ApiResponse<ChatMessage>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      `I can feel the love in your words. ${personName} would be touched to know how much they mean to you.`,
      `Your connection with ${personName} continues to be a source of strength. They would want you to find peace.`,
      `The bond you shared with ${personName} is eternal. What you're feeling is a testament to that love.`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      success: true,
      data: {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        mode: 'closure'
      }
    };
  }
};