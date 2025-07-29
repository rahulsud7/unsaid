import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Heart, 
  Users, 
  MessageCircle,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useApp } from '../contexts/AppContext';
import { Session } from '../types';

interface SessionHistoryProps {
  onSelectSession: (session: Session) => void;
  className?: string;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  onSelectSession,
  className = ''
}) => {
  const { sessions, deleteSession, updateSessionTitle, currentSession, settings } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'unsaid':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'closure':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'therapy':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'unsaid':
        return 'border-red-200 bg-red-50';
      case 'closure':
        return 'border-purple-200 bg-purple-50';
      case 'therapy':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const startEditing = (session: Session) => {
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      updateSessionTitle(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const handleDelete = (sessionId: string) => {
    if (window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      deleteSession(sessionId);
    }
  };

  if (sessions.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <History className={`w-16 h-16 mx-auto mb-4 ${
          settings.theme === 'dark' ? 'text-gray-600' : 'text-sage-300'
        }`} />
        <h3 className={`text-lg font-semibold mb-2 ${
          settings.theme === 'dark' ? 'text-gray-300' : 'text-sage-700'
        }`}>
          No sessions yet
        </h3>
        <p className={`${
          settings.theme === 'dark' ? 'text-gray-400' : 'text-sage-500'
        }`}>
          Start a conversation to see your session history here
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        settings.theme === 'dark' ? 'text-white' : 'text-sage-900'
      }`}>
        Session History
      </h2>

      <AnimatePresence>
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`glass-effect rounded-xl p-4 border transition-all duration-200 hover:shadow-lg ${
              currentSession?.id === session.id
                ? settings.theme === 'dark'
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-sage-400 bg-sage-50'
                : settings.theme === 'dark'
                  ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  : 'border-sage-200 bg-white/50 hover:border-sage-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => onSelectSession(session)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  {getModeIcon(session.mode)}
                  
                  {editingId === session.id ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`flex-1 px-2 py-1 rounded border focus:outline-none focus:ring-2 ${
                          settings.theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                            : 'bg-white border-sage-300 text-sage-900 focus:ring-sage-400'
                        }`}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className={`p-1 rounded hover:bg-green-100 ${
                          settings.theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`p-1 rounded hover:bg-red-100 ${
                          settings.theme === 'dark' ? 'text-red-400' : 'text-red-600'
                        }`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className={`font-semibold text-lg ${
                      settings.theme === 'dark' ? 'text-white' : 'text-sage-900'
                    }`}>
                      {session.title}
                    </h3>
                  )}
                </div>

                <div className={`flex items-center space-x-4 text-sm ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-sage-600'
                }`}>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDistanceToNow(session.updatedAt, { addSuffix: true })}</span>
                  </div>
                  <span>•</span>
                  <span>{session.messages.length} messages</span>
                  <span>•</span>
                  <span className="capitalize">{session.mode} mode</span>
                </div>

                {session.messages.length > 0 && (
                  <p className={`mt-2 text-sm line-clamp-2 ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-sage-700'
                  }`}>
                    {session.messages[session.messages.length - 1].content}
                  </p>
                )}
              </div>

              {editingId !== session.id && (
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEditing(session)}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-sage-500 hover:text-sage-700 hover:bg-sage-100'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(session.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      settings.theme === 'dark'
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                        : 'text-red-500 hover:text-red-700 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};