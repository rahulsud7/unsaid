import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, Save } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { SessionHistory } from '../components/SessionHistory';
import { Message, Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const UnsaidModePage: React.FC = () => {
  const { 
    currentSession, 
    setCurrentSession, 
    sessions, 
    setSessions, 
    createSession,
    settings 
  } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Auto-save session when messages change
    if (currentSession && currentSession.messages.length > 0) {
      const updatedSession = { ...currentSession, updatedAt: new Date() };
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    }
  }, [currentSession, setSessions]);

  const handleSendMessage = async (content: string) => {
    if (!currentSession) {
      const newSession = createSession('unsaid', 'Unsaid Reflection');
      setCurrentSession(newSession);
    }

    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedSession = {
      ...currentSession!,
      messages: [...(currentSession?.messages || []), userMessage],
      updatedAt: new Date()
    };

    setCurrentSession(updatedSession);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Thank you for sharing this with me. I can sense the depth of emotion in your words. What feelings come up for you as you reflect on this?",
        "Your thoughts are safe here. It takes courage to express what's been left unsaid. How does it feel to put these words into the world?",
        "I hear the weight of what you're carrying. These unspoken thoughts deserve to be acknowledged. What would you like to explore further about this experience?",
        "Your vulnerability in sharing this is beautiful. Sometimes the things we keep inside need space to breathe. What else would you like to say about this?",
        "This sounds like something that has been with you for a while. I'm honored that you're sharing it here. What impact has carrying this had on you?"
      ];

      const aiMessage: Message = {
        id: uuidv4(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage],
        updatedAt: new Date()
      };

      setCurrentSession(finalSession);
      setSessions(prev => prev.map(s => s.id === finalSession.id ? finalSession : s));
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectSession = (session: Session) => {
    setCurrentSession(session);
    setShowHistory(false);
  };

  const startNewSession = () => {
    const newSession = createSession('unsaid', 'New Unsaid Reflection');
    setCurrentSession(newSession);
    setShowHistory(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-red-50 via-pink-50 to-rose-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`p-4 rounded-2xl ${
                settings.theme === 'dark' 
                  ? 'bg-red-900/20 border border-red-800' 
                  : 'bg-gradient-to-br from-red-100 to-pink-100 border border-red-200'
              } shadow-lg`}
            >
              <Heart className="w-12 h-12 text-red-500" fill="currentColor" />
            </motion.div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Unsaid Mode
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A private space for your unspoken thoughts, unexpressed feelings, and memories that need gentle reflection. 
            Share what's been weighing on your heart.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Session History Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`glass-effect rounded-2xl p-6 border ${
              settings.theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-red-200/30 bg-white/50'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Your Reflections
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewSession}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600'
                  }`}
                >
                  New Reflection
                </motion.button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sessions
                  .filter(s => s.mode === 'unsaid')
                  .slice(0, 10)
                  .map((session, index) => (
                    <motion.button
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectSession(session)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        currentSession?.id === session.id
                          ? settings.theme === 'dark'
                            ? 'bg-red-900/30 border border-red-700'
                            : 'bg-red-100 border border-red-300'
                          : settings.theme === 'dark'
                            ? 'hover:bg-gray-700 border border-transparent'
                            : 'hover:bg-red-50 border border-transparent'
                      }`}
                    >
                      <h3 className={`font-medium text-sm mb-1 line-clamp-1 ${
                        settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {session.title}
                      </h3>
                      <p className={`text-xs ${
                        settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {session.messages.length} messages
                      </p>
                    </motion.button>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className={`glass-effect rounded-2xl border min-h-[600px] flex flex-col ${
              settings.theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-red-200/30 bg-white/50'
            }`}>
              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                {!currentSession || currentSession.messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-16"
                  >
                    <div className={`p-6 rounded-2xl inline-block mb-6 ${
                      settings.theme === 'dark' 
                        ? 'bg-red-900/20 border border-red-800' 
                        : 'bg-gradient-to-br from-red-100 to-pink-100 border border-red-200'
                    }`}>
                      <BookOpen className="w-16 h-16 text-red-500 mx-auto" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Your Private Journal
                    </h3>
                    <p className={`text-lg max-w-md mx-auto leading-relaxed ${
                      settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Share the thoughts you've kept to yourself. Express what's been left unsaid. 
                      This is your safe space for reflection and healing.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {currentSession.messages.map((message, index) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                    
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl ${
                          settings.theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-white border border-red-200 text-gray-700'
                        }`}>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-red-500 rounded-full"
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-sm">Reflecting on your words...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-red-200/30">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder="Share what's been left unsaid..."
                  isLoading={isLoading}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};