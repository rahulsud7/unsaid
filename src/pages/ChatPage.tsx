import React, { useState, useEffect, useRef } from 'react';
import { Menu, Crown } from 'lucide-react';
import { SessionSidebar } from '../components/SessionSidebar';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { UpgradeBanner } from '../components/UpgradeBanner';
import { useChat, ChatMode } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

export const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatMode>('therapy');
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { currentSession, addMessage, createSession, usageStats, updateUsage } = useChat();
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const getUsageLimit = (mode: ChatMode) => {
    if (user?.tier === 'premium') return null;
    switch (mode) {
      case 'therapy': return 3;
      case 'unsaid': return 1;
      case 'closure': return 1;
    }
  };

  const getUsageCount = (mode: ChatMode) => {
    return usageStats[mode];
  };

  const canSendMessage = (mode: ChatMode) => {
    if (user?.tier === 'premium') return true;
    const limit = getUsageLimit(mode);
    const count = getUsageCount(mode);
    return limit === null || count < limit;
  };

  const handleSendMessage = async (content: string) => {
    if (!currentSession || !canSendMessage(currentSession.mode)) {
      setShowUpgradeBanner(true);
      return;
    }

    addMessage(content, 'user');
    updateUsage(currentSession.mode);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      
      switch (currentSession.mode) {
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
      
      if (currentSession) {
        addMessage(aiResponse, 'ai');
      }
    }, 1000);
  };

  const handleTabChange = (mode: ChatMode) => {
    setActiveTab(mode);
    if (!currentSession || currentSession.mode !== mode) {
      createSession(mode);
    }
  };

  const tabs = [
    { id: 'therapy', label: 'Therapy Bot', icon: '💬', color: 'text-blue-600 border-b-blue-600' },
    { id: 'unsaid', label: 'Unsaid Mode', icon: '❤️', color: 'text-red-600 border-b-red-600' },
    { id: 'closure', label: 'Closure Mode', icon: '🕊️', color: 'text-purple-600 border-b-purple-600' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SessionSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                {user?.tier === 'premium' && (
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-medium">Premium</span>
                  </div>
                )}
                
                <div className="text-sm text-gray-600">
                  Daily Usage: Therapy {getUsageCount('therapy')}/{getUsageLimit('therapy') || '∞'} • 
                  Unsaid {getUsageCount('unsaid')}/{getUsageLimit('unsaid') || '∞'} • 
                  Closure {getUsageCount('closure')}/{getUsageLimit('closure') || '∞'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as ChatMode)}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? tab.color
                    : 'text-gray-500 border-b-transparent hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {showUpgradeBanner && (
            <UpgradeBanner
              message="You've reached your daily limit for this mode"
              onClose={() => setShowUpgradeBanner(false)}
            />
          )}
          
          {currentSession?.messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {tabs.find(t => t.id === activeTab)?.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {activeTab === 'therapy' && "Start a conversation about what's on your mind. I'm here to listen and support you."}
                {activeTab === 'unsaid' && "Share a memory or thought that you've kept to yourself. This is your space for reflection."}
                {activeTab === 'closure' && "Connect with someone you've lost. Express what you never got to say."}
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {currentSession?.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!canSendMessage(activeTab)}
          placeholder={
            !canSendMessage(activeTab)
              ? "Daily limit reached. Upgrade to continue..."
              : `Type your ${activeTab === 'therapy' ? 'thoughts' : activeTab === 'unsaid' ? 'reflections' : 'message'}...`
          }
        />
      </div>
    </div>
  );
};