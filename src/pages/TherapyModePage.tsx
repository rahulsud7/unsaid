import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Brain, Lightbulb } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { SessionHistory } from '../components/SessionHistory';
import { Message, Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const TherapyModePage: React.FC = () => {
  const { 
    currentSession, 
    setCurrentSession, 
    sessions, 
    setSessions, 
    createSession,
    settings 
  } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentSession && currentSession.messages.length > 0) {
      const updatedSession = { ...currentSession, updatedAt: new Date() };
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    }
  }, [currentSession, setSessions]);

  const handleSendMessage = async (content: string) => {
    if (!currentSession) {
      const newSession = createSession('therapy', 'Therapy Session');
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

    // Generate therapeutic AI response
    setTimeout(() => {
      const therapeuticResponses = [
        "I hear you, and I want you to know that your feelings are completely valid. It takes courage to share what's on your mind. How are you feeling about this situation right now?",
        "Thank you for trusting me with this. What you're experiencing sounds challenging. Can you tell me more about what this means to you?",
        "I can sense that this is important to you. Sometimes talking through our thoughts can help us see them more clearly. What stands out most to you about this?",
        "Your awareness of these feelings shows real emotional intelligence. How long have you been carrying this with you?",
        "It sounds like you're processing something significant. What would feel most helpful for you to explore right now?",
        "I appreciate your openness in sharing this. What do you think might be the first small step toward feeling better about this situation?",
        "Your feelings make complete sense given what you've shared. What kind of support do you feel you need most right now?"
      ];

      const aiMessage: Message = {
        id: uuidv4(),
        content: therapeuticResponses[Math.floor(Math.random() * therapeuticResponses.length)],
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
    }, 1800);
  };

  const handleSelectSession = (session: Session) => {
    setCurrentSession(session);
  };

  const startNewSession = () => {
    const newSession = createSession('therapy', 'New Therapy Session');
    setCurrentSession(newSession);
  };

  const therapyPrompts = [
    "How are you feeling today?",
    "What's been on your mind lately?",
    "Tell me about a challenge you're facing",
    "What would you like to work through?"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50'
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
                  ? 'bg-blue-900/20 border border-blue-800' 
                  : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200'
              } shadow-lg`}
            >
              <MessageCircle className="w-12 h-12 text-blue-500" />
            </motion.div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Therapy Mode
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A supportive space for reflection, growth, and emotional wellness. 
            Share your thoughts and feelings in a judgment-free environment.
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
                : 'border-blue-200/30 bg-white/50'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${
                  settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Your Sessions
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startNewSession}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                  }`}
                >
                  New Session
                </motion.button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sessions
                  .filter(s => s.mode === 'therapy')
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
                            ? 'bg-blue-900/30 border border-blue-700'
                            : 'bg-blue-100 border border-blue-300'
                          : settings.theme === 'dark'
                            ? 'hover:bg-gray-700 border border-transparent'
                            : 'hover:bg-blue-50 border border-transparent'
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

              {/* Therapy Prompts */}
              <div className="mt-8 pt-6 border-t border-blue-200/30">
                <h3 className={`text-sm font-semibold mb-4 ${
                  settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Conversation Starters
                </h3>
                <div className="space-y-2">
                  {therapyPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(prompt)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                        settings.theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-blue-50'
                      }`}
                    >
                      "{prompt}"
                    </motion.button>
                  ))}
                </div>
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
                : 'border-blue-200/30 bg-white/50'
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
                        ? 'bg-blue-900/20 border border-blue-800' 
                        : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200'
                    }`}>
                      <Brain className="w-16 h-16 text-blue-500 mx-auto" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Your Therapeutic Space
                    </h3>
                    <p className={`text-lg max-w-md mx-auto leading-relaxed mb-8 ${
                      settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      This is a safe space to explore your thoughts, process emotions, 
                      and work through challenges with supportive guidance.
                    </p>

                    {/* Helpful Tips */}
                    <div className={`max-w-lg mx-auto p-6 rounded-xl ${
                      settings.theme === 'dark' 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-center space-x-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-blue-500" />
                        <h4 className={`font-semibold ${
                          settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Tips for Your Session
                        </h4>
                      </div>
                      <ul className={`text-sm space-y-2 text-left ${
                        settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <li>• Be honest about your feelings</li>
                        <li>• Take your time to reflect</li>
                        <li>• There's no judgment here</li>
                        <li>• Focus on what feels important to you</li>
                      </ul>
                    </div>
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
                            : 'bg-white border border-blue-200 text-gray-700'
                        }`}>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-blue-500 rounded-full"
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
                          <span className="text-sm">Thinking thoughtfully...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-blue-200/30">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder="Share what's on your mind..."
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