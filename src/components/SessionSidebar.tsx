import React from 'react';
import { Plus, MessageCircle, Heart, Users } from 'lucide-react';
import { useChat, ChatMode } from '../contexts/ChatContext';

interface SessionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionSidebar: React.FC<SessionSidebarProps> = ({ isOpen, onClose }) => {
  const { sessions, currentSession, createSession, selectSession } = useChat();

  const getModeIcon = (mode: ChatMode) => {
    switch (mode) {
      case 'therapy':
        return <MessageCircle className="w-4 h-4" />;
      case 'unsaid':
        return <Heart className="w-4 h-4" />;
      case 'closure':
        return <Users className="w-4 h-4" />;
    }
  };

  const getModeColor = (mode: ChatMode) => {
    switch (mode) {
      case 'therapy':
        return 'text-blue-600';
      case 'unsaid':
        return 'text-red-600';
      case 'closure':
        return 'text-purple-600';
    }
  };

  const handleCreateSession = (mode: ChatMode) => {
    createSession(mode);
    onClose();
  };

  const handleSelectSession = (sessionId: string) => {
    selectSession(sessionId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chat Sessions</h2>
          </div>

          <div className="p-4 space-y-2">
            <button
              onClick={() => handleCreateSession('therapy')}
              className="w-full flex items-center space-x-2 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">New Therapy Chat</span>
            </button>
            
            <button
              onClick={() => handleCreateSession('unsaid')}
              className="w-full flex items-center space-x-2 p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">New Unsaid Mode</span>
            </button>
            
            <button
              onClick={() => handleCreateSession('closure')}
              className="w-full flex items-center space-x-2 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">New Closure Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSelectSession(session.id)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    currentSession?.id === session.id
                      ? 'bg-indigo-100 border border-indigo-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={getModeColor(session.mode)}>
                      {getModeIcon(session.mode)}
                    </span>
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {session.messages.length} messages • {session.updatedAt.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};