import React from 'react';
import { Crown, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { sessions, usageStats } = useChat();

  if (!user) return null;

  const totalMessages = sessions.reduce((sum, session) => sum + session.messages.length, 0);
  const joinDate = new Date().toLocaleDateString(); // Mock join date

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {user.tier === 'premium' && (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Premium</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
            {user.tier !== 'premium' && (
              <Link
                to="/upgrade"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usageStats.therapy + usageStats.unsaid + usageStats.closure}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h2>
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sessions yet</p>
              <Link
                to="/chat"
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-500"
              >
                Start your first conversation
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.title}</p>
                    <p className="text-sm text-gray-500">
                      {session.messages.length} messages • {session.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.mode === 'therapy' ? 'bg-blue-100 text-blue-800' :
                    session.mode === 'unsaid' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {session.mode}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Daily Usage */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Usage</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Therapy Bot</span>
              <span className="text-gray-900">
                {usageStats.therapy}/{user.tier === 'premium' ? '∞' : '3'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Unsaid Mode</span>
              <span className="text-gray-900">
                {usageStats.unsaid}/{user.tier === 'premium' ? '∞' : '1'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Closure Mode</span>
              <span className="text-gray-900">
                {usageStats.closure}/{user.tier === 'premium' ? '∞' : '1'}
              </span>
            </div>
          </div>
          {user.tier !== 'premium' && (
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-800">
                Upgrade to Premium for unlimited access to all modes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};