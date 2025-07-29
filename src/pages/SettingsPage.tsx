import React, { useState } from 'react';
import { Moon, Sun, LogOut, Trash2, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const { user, logout } = useAuth();
  const { sessions, resetUsage } = useChat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClearData = () => {
    localStorage.removeItem('unsaid-sessions');
    localStorage.removeItem('unsaid-memories');
    resetUsage();
    setShowConfirmClear(false);
    window.location.reload();
  };

  const handleExportData = () => {
    const data = {
      user,
      sessions,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unsaid-ai-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Theme Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Data Management */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
              <div className="space-y-3">
                <button
                  onClick={handleExportData}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Export Data</p>
                      <p className="text-sm text-gray-500">Download your conversations and memories</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setShowConfirmClear(true)}
                  className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <div className="text-left">
                      <p className="font-medium text-red-900">Clear Local Data</p>
                      <p className="text-sm text-red-600">Delete all conversations and reset usage</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Account */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Sign Out</p>
                    <p className="text-sm text-gray-500">Sign out of your account</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Local Data</h3>
              <p className="text-gray-600 mb-6">
                This will permanently delete all your conversations, memories, and reset usage counters. 
                This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearData}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Clear Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};