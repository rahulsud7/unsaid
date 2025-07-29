import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, User, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useApp } from '../contexts/AppContext';
import { useVoice } from '../hooks/useVoice';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, index }) => {
  const { settings } = useApp();
  const { speakText } = useVoice();
  const isUser = message.sender === 'user';

  const handleSpeak = () => {
    if (settings.ttsEnabled) {
      speakText(message.content);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isUser
              ? settings.theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gradient-to-br from-sage-500 to-mint-500 text-white'
              : settings.theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-white border-2 border-sage-200 text-sage-600'
          } shadow-lg`}
        >
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </motion.div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative px-4 py-3 rounded-2xl shadow-lg ${
              isUser
                ? settings.theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-br from-sage-500 to-mint-500 text-white'
                : settings.theme === 'dark'
                  ? 'bg-gray-700 text-gray-100 border border-gray-600'
                  : 'bg-white text-sage-900 border border-sage-200'
            } ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            
            {/* Speak Button for AI messages */}
            {!isUser && settings.ttsEnabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSpeak}
                className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg transition-colors ${
                  settings.theme === 'dark'
                    ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                }`}
              >
                <Volume2 className="w-3 h-3" />
              </motion.button>
            )}
          </motion.div>

          {/* Timestamp */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs mt-2 ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-sage-500'
            }`}
          >
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};