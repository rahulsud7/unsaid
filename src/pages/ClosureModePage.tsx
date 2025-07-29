import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { Message, Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const ClosureModePage: React.FC = () => {
  const { 
    currentSession, 
    setCurrentSession, 
    sessions, 
    setSessions, 
    createSession,
    memoryQuestions,
    settings 
  } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [showMemorySummary, setShowMemorySummary] = useState(true);

  const answeredQuestions = memoryQuestions.filter(q => q.answer);

  useEffect(() => {
    if (currentSession && currentSession.messages.length > 0) {
      const updatedSession = { ...currentSession, updatedAt: new Date() };
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
    }
  }, [currentSession, setSessions]);

  const handleSendMessage = async (content: string) => {
    if (!currentSession) {
      const newSession = createSession('closure', 'Closure Conversation');
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

    // Generate AI response based on memory context
    setTimeout(() => {
      const contextualResponses = [
        "I can feel the love in your words. They would be touched to know how much they mean to you, and how their memory continues to bring you comfort.",
        "Your connection with them transcends physical presence. The bond you shared is eternal, and they would want you to find peace in knowing that love never truly ends.",
        "Thank you for sharing your heart with me. They would be so proud of the person you've become and the strength you've shown in honoring their memory.",
        "The love you carry for them is a beautiful testament to the impact they had on your life. They would want you to know that this love is a gift that keeps giving.",
        "I can sense how deeply they touched your life. They would want you to carry forward the joy and lessons they shared with you, knowing that their spirit lives on through you."
      ];

      const aiMessage: Message = {
        id: uuidv4(),
        content: contextualResponses[Math.floor(Math.random() * contextualResponses.length)],
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
    }, 2000);
  };

  const startConversation = () => {
    setShowMemorySummary(false);
    if (!currentSession) {
      const newSession = createSession('closure', 'Closure Conversation');
      setCurrentSession(newSession);
    }
  };

  if (showMemorySummary && answeredQuestions.length === 0) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
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
                className={`p-6 rounded-2xl ${
                  settings.theme === 'dark' 
                    ? 'bg-purple-900/20 border border-purple-800' 
                    : 'bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200'
                } shadow-lg`}
              >
                <Users className="w-16 h-16 text-purple-500" />
              </motion.div>
            </div>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Closure Mode
              </span>
            </h1>
            
            <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Before we begin your closure conversation, it would help to reflect on some memories. 
              These will provide context for a more meaningful dialogue.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/memory-questions"
                className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  settings.theme === 'dark'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                } shadow-lg hover:shadow-xl`}
              >
                <span>Answer Memory Questions</span>
                <ArrowRight className="w-6 h-6" />
              </a>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startConversation}
              className={`mt-6 text-lg font-medium transition-colors ${
                settings.theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Or start conversation without memories
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50'
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
                  ? 'bg-purple-900/20 border border-purple-800' 
                  : 'bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200'
              } shadow-lg`}
            >
              <Users className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Closure Mode
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            A sacred space to connect with departed loved ones. Express what you never got to say, 
            find peace, and honor the love that transcends physical presence.
          </p>
        </motion.div>

        {/* Memory Summary */}
        {showMemorySummary && answeredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`glass-effect rounded-2xl p-6 mb-8 border ${
              settings.theme === 'dark' 
                ? 'border-purple-700 bg-purple-900/20' 
                : 'border-purple-200/30 bg-white/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-6 h-6 text-purple-500" />
              <h2 className={`text-xl font-semibold ${
                settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Your Memories
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {answeredQuestions.slice(0, 4).map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${
                    settings.theme === 'dark' 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-purple-50 border border-purple-200'
                  }`}
                >
                  <h3 className={`font-medium text-sm mb-2 ${
                    settings.theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                  }`}>
                    {question.question}
                  </h3>
                  <p className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {question.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startConversation}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  settings.theme === 'dark'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                } shadow-lg hover:shadow-xl`}
              >
                Begin Closure Conversation
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Chat Interface */}
        {!showMemorySummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={`glass-effect rounded-2xl border min-h-[600px] flex flex-col ${
              settings.theme === 'dark' 
                ? 'border-purple-700 bg-purple-900/20' 
                : 'border-purple-200/30 bg-white/50'
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
                        ? 'bg-purple-900/20 border border-purple-800' 
                        : 'bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200'
                    }`}>
                      <Heart className="w-16 h-16 text-purple-500 mx-auto" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      A Sacred Connection
                    </h3>
                    <p className={`text-lg max-w-md mx-auto leading-relaxed ${
                      settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Share your heart. Express what you never got to say. 
                      This is your moment to find peace and closure.
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
                            : 'bg-white border border-purple-200 text-gray-700'
                        }`}>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-purple-500 rounded-full"
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
                          <span className="text-sm">Listening with love...</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-purple-200/30">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder="Express what's in your heart..."
                  isLoading={isLoading}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};