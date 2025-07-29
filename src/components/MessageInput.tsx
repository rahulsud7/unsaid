import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { VoiceInput } from './VoiceInput';
import { useApp } from '../contexts/AppContext';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  placeholder = "Share your thoughts...",
  disabled = false,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { settings } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setMessage(prev => prev + (prev ? ' ' : '') + transcript);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className={`glass-effect rounded-2xl p-4 border transition-colors ${
        settings.theme === 'dark'
          ? 'border-gray-600 bg-gray-800/80'
          : 'border-sage-200/30 bg-white/80'
      }`}
    >
      <div className="flex items-end space-x-3">
        {/* Voice Input */}
        <VoiceInput
          onTranscript={handleVoiceTranscript}
          className="flex-shrink-0"
        />

        {/* Text Input */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className={`w-full min-h-[44px] max-h-32 p-3 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
              settings.theme === 'dark'
                ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 border-gray-600'
                : 'bg-white text-sage-900 placeholder-sage-400 focus:ring-sage-400 border-sage-200'
            } border disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || disabled || isLoading}
          className={`p-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            settings.theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gradient-to-r from-sage-500 to-mint-500 text-white hover:from-sage-600 hover:to-mint-600 focus:ring-sage-400'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};