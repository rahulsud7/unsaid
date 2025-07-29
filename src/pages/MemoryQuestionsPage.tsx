import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Save, Check, ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const MemoryQuestionsPage: React.FC = () => {
  const { memoryQuestions, setMemoryQuestions, settings } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = memoryQuestions[currentQuestionIndex];
  const answeredCount = memoryQuestions.filter(q => q.answer).length;
  const progress = (answeredCount / memoryQuestions.length) * 100;

  const saveAnswer = () => {
    if (!currentAnswer.trim()) return;

    setMemoryQuestions(prev => prev.map(q => 
      q.id === currentQuestion.id 
        ? { ...q, answer: currentAnswer.trim(), answeredAt: new Date() }
        : q
    ));

    setCurrentAnswer('');
    
    if (currentQuestionIndex < memoryQuestions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentAnswer(memoryQuestions[index].answer || '');
  };

  const nextUnanswered = () => {
    const nextIndex = memoryQuestions.findIndex((q, index) => 
      index > currentQuestionIndex && !q.answer
    );
    if (nextIndex !== -1) {
      goToQuestion(nextIndex);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
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
                  ? 'bg-amber-900/20 border border-amber-800' 
                  : 'bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200'
              } shadow-lg`}
            >
              <BookOpen className="w-12 h-12 text-amber-500" />
            </motion.div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Memory Questions
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Reflect on meaningful memories to prepare for deeper conversations. 
            These questions will help create context for your closure journey.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progress
              </span>
              <span className={`text-sm font-medium ${
                settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {answeredCount}/{memoryQuestions.length}
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className={`glass-effect rounded-2xl p-6 border ${
              settings.theme === 'dark' 
                ? 'border-gray-700 bg-gray-800/50' 
                : 'border-amber-200/30 bg-white/50'
            }`}>
              <h2 className={`text-lg font-semibold mb-6 ${
                settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Questions
              </h2>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {memoryQuestions.map((question, index) => (
                  <motion.button
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => goToQuestion(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                      currentQuestionIndex === index
                        ? settings.theme === 'dark'
                          ? 'bg-amber-900/30 border border-amber-700'
                          : 'bg-amber-100 border border-amber-300'
                        : settings.theme === 'dark'
                          ? 'hover:bg-gray-700 border border-transparent'
                          : 'hover:bg-amber-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        question.answer
                          ? 'bg-green-500 text-white'
                          : settings.theme === 'dark'
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {question.answer ? <Check className="w-3 h-3" /> : index + 1}
                      </div>
                      <span className={`text-sm line-clamp-2 ${
                        settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {question.question}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {answeredCount < memoryQuestions.length && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextUnanswered}
                  className={`w-full mt-6 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                  }`}
                >
                  Next Unanswered
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Main Question Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? 20 : 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`glass-effect rounded-2xl border p-8 ${
                  settings.theme === 'dark' 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-amber-200/30 bg-white/50'
                }`}
              >
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentQuestion.answer
                        ? 'bg-green-500 text-white'
                        : settings.theme === 'dark'
                          ? 'bg-amber-600 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    }`}>
                      {currentQuestion.answer ? <Check className="w-5 h-5" /> : currentQuestionIndex + 1}
                    </div>
                    <h2 className={`text-2xl font-bold ${
                      settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentQuestion.question}
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Take your time to reflect and share your thoughts..."
                    rows={8}
                    className={`w-full p-4 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
                      settings.theme === 'dark'
                        ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-amber-500 border-gray-600'
                        : 'bg-white text-gray-900 placeholder-gray-400 focus:ring-amber-400 border-amber-200'
                    } border`}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {currentQuestion.answer && (
                        <div className={`flex items-center space-x-2 text-sm ${
                          settings.theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        }`}>
                          <Check className="w-4 h-4" />
                          <span>Saved</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveAnswer}
                        disabled={!currentAnswer.trim()}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                          settings.theme === 'dark'
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                        }`}
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Answer</span>
                      </motion.button>

                      {answeredCount === memoryQuestions.length && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href="/closure-mode"
                          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                            settings.theme === 'dark'
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                          }`}
                        >
                          <Heart className="w-5 h-5" />
                          <span>Begin Closure</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};