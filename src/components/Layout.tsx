import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { LoadingScreen } from './LoadingScreen';
import { useApp } from '../contexts/AppContext';

export const Layout: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-cream-50 via-sage-50 to-sky-50'
    }`}>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-16"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};