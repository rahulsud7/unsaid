import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Heart, 
  Users, 
  MessageCircle, 
  BookOpen, 
  History, 
  User, 
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings, setSettings } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/unsaid-mode', label: 'Unsaid Mode', icon: Heart },
    { path: '/closure-mode', label: 'Closure Mode', icon: Users },
    { path: '/therapy-mode', label: 'Therapy Mode', icon: MessageCircle },
    { path: '/memory-questions', label: 'Memory Questions', icon: BookOpen },
    { path: '/session-history', label: 'Session History', icon: History },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 glass-effect border-b transition-colors duration-300 ${
        settings.theme === 'dark' 
          ? 'border-gray-700 bg-gray-800/80' 
          : 'border-sage-200/30 bg-white/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? settings.theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-sage-100 text-sage-700'
                      : settings.theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-xl ${
                        settings.theme === 'dark' ? 'bg-gray-700' : 'bg-sage-100'
                      }`}
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
              }`}
            >
              {settings.theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* User Menu */}
            {user && (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 p-2 rounded-xl transition-colors ${
                    isActive('/profile')
                      ? settings.theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-sage-100'
                      : settings.theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-sage-100'
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className={`text-sm font-medium ${
                    settings.theme === 'dark' ? 'text-gray-300' : 'text-sage-700'
                  }`}>
                    {user.name}
                  </span>
                </Link>
                
                <Link
                  to="/settings"
                  className={`p-2 rounded-xl transition-colors ${
                    isActive('/settings')
                      ? settings.theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-sage-100 text-sage-700'
                      : settings.theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-sage-600 hover:text-sage-800 hover:bg-sage-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                settings.theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-sage-600 hover:text-sage-800 hover:bg-sage-100'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden border-t overflow-hidden ${
                settings.theme === 'dark' ? 'border-gray-700' : 'border-sage-200/30'
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? settings.theme === 'dark'
                            ? 'bg-gray-700 text-white'
                            : 'bg-sage-100 text-sage-700'
                          : settings.theme === 'dark'
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {user && (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive('/profile')
                          ? settings.theme === 'dark'
                            ? 'bg-gray-700 text-white'
                            : 'bg-sage-100 text-sage-700'
                          : settings.theme === 'dark'
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive('/settings')
                          ? settings.theme === 'dark'
                            ? 'bg-gray-700 text-white'
                            : 'bg-sage-100 text-sage-700'
                          : settings.theme === 'dark'
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};