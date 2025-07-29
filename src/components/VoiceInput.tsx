import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useApp } from '../contexts/AppContext';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onSpeakResponse?: (text: string) => void;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  onSpeakResponse,
  className = ''
}) => {
  const { settings, setSettings } = useApp();
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    speaking,
    speakText,
    stopSpeaking
  } = useVoice();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      clearTranscript();
    }
  }, [transcript, onTranscript, clearTranscript]);

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleTTS = () => {
    setSettings(prev => ({ ...prev, ttsEnabled: !prev.ttsEnabled }));
    if (speaking) {
      stopSpeaking();
    }
  };

  const handleSpeakResponse = (text: string) => {
    if (settings.ttsEnabled && onSpeakResponse) {
      speakText(text);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Voice Input Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleVoiceInput}
        disabled={!settings.voiceEnabled}
        className={`relative p-3 rounded-full transition-all duration-200 ${
          isListening
            ? 'bg-red-500 text-white shadow-lg'
            : settings.theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
        
        {/* Listening Animation */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* TTS Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTTS}
        className={`p-3 rounded-full transition-all duration-200 ${
          settings.ttsEnabled
            ? settings.theme === 'dark'
              ? 'bg-blue-600 text-white'
              : 'bg-sage-500 text-white'
            : settings.theme === 'dark'
              ? 'bg-gray-700 text-gray-400'
              : 'bg-gray-200 text-gray-500'
        }`}
      >
        {settings.ttsEnabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        
        {/* Speaking Animation */}
        <AnimatePresence>
          {speaking && settings.ttsEnabled && (
            <motion.div
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.3, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className={`absolute inset-0 rounded-full ${
                settings.theme === 'dark' ? 'bg-blue-600' : 'bg-sage-500'
              }`}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Voice Status Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={`text-sm font-medium ${
              settings.theme === 'dark' ? 'text-gray-300' : 'text-sage-600'
            }`}
          >
            Listening...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};