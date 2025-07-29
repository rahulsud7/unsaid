import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center animate-fade-in">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Logo size="md" />
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Your safe space for unspoken thoughts awaits
          </p>
        </div>

        <div className="glass-effect py-8 px-6 shadow-xl rounded-2xl border border-sage-200/30">
          <div className="space-y-6">
            <GoogleSignInButton />
            
            <div className="text-center">
              <p className="text-sm text-sage-600">
                By signing in, you agree to our terms of service and privacy policy.
                Your conversations are private and secure.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-sage-600">
            New to Unsaid AI?{' '}
            <Link to="/" className="font-medium text-sage-600 hover:text-sage-800">
              Learn more about our platform
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};