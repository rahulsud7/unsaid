import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UpgradeBannerProps {
  message: string;
  onClose?: () => void;
}

export const UpgradeBanner: React.FC<UpgradeBannerProps> = ({ message, onClose }) => {
  const { user } = useAuth();

  if (user?.tier === 'premium') return null;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className="w-6 h-6 text-yellow-300" />
          <div>
            <p className="font-medium">{message}</p>
            <p className="text-sm opacity-90">Upgrade to Premium for unlimited access</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/upgrade"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Upgrade
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};