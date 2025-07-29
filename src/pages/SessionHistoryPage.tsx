import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Filter, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { SessionHistory } from '../components/SessionHistory';
import { Session } from '../types';

export const SessionHistoryPage: React.FC = () => {
  const { sessions, setCurrentSession, settings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'unsaid' | 'closure' | 'therapy'>('all');

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterMode === 'all' || session.mode === filterMode;
    return matchesSearch && matchesFilter;
  });

  const handleSelectSession = (session: Session) => {
    setCurrentSession(session);
    // Navigate to the appropriate mode page
    window.location.href = `/${session.mode}-mode`;
  };

  const modeStats = {
    all: sessions.length,
    unsaid: sessions.filter(s => s.mode === 'unsaid').length,
    closure: sessions.filter(s => s.mode === 'closure').length,
    therapy: sessions.filter(s => s.mode === 'therapy').length,
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50'
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
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-gradient-to-br from-slate-100 to-gray-100 border border-slate-200'
              } shadow-lg`}
            >
              <History className="w-12 h-12 text-slate-600" />
            </motion.div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 bg-clip-text text-transparent">
              Session History
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Review and continue your previous conversations. Your journey of healing and reflection is preserved here.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { key: 'all', label: 'Total Sessions', color: 'slate' },
            { key: 'therapy', label: 'Therapy', color: 'blue' },
            { key: 'unsaid', label: 'Unsaid', color: 'red' },
            { key: 'closure', label: 'Closure', color: 'purple' },
          ].map((stat, index) => (
            <motion.button
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setFilterMode(stat.key as any)}
              className={`glass-effect p-4 rounded-xl border transition-all duration-200 ${
                filterMode === stat.key
                  ? settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-blue-400 bg-blue-50'
                  : settings.theme === 'dark'
                    ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {modeStats[stat.key as keyof typeof modeStats]}
              </div>
              <div className={`text-sm ${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className={`glass-effect rounded-2xl p-6 border ${
            settings.theme === 'dark' 
              ? 'border-gray-700 bg-gray-800/50' 
              : 'border-gray-200 bg-white/50'
          }`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search sessions and messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    settings.theme === 'dark'
                      ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-400'
                  }`}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center space-x-2">
                <Filter className={`w-5 h-5 ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                {['all', 'therapy', 'unsaid', 'closure'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      filterMode === mode
                        ? settings.theme === 'dark'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : settings.theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Session List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredSessions.length === 0 ? (
            <div className="text-center py-16">
              <History className={`w-16 h-16 mx-auto mb-4 ${
                settings.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {searchTerm || filterMode !== 'all' ? 'No matching sessions' : 'No sessions yet'}
              </h3>
              <p className={`${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {searchTerm || filterMode !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start a conversation to see your session history here'
                }
              </p>
            </div>
          ) : (
            <SessionHistory
              onSelectSession={handleSelectSession}
              className="space-y-4"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};