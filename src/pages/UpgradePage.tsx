import React from 'react';
import { Check, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const UpgradePage: React.FC = () => {
  const { user } = useAuth();

  const features = {
    free: [
      'Therapy Bot: 3 messages per day',
      'Unsaid Mode: 1 memory upload (preview only)',
      'Closure Mode: 1 farewell message only',
      'Basic chat history',
      'Mobile app access'
    ],
    premium: [
      'Unlimited Therapy Bot conversations',
      'Unlimited Unsaid Mode with full memory uploads',
      'Unlimited Closure Mode conversations',
      'Advanced chat history and search',
      'Priority customer support',
      'Export conversation data',
      'Early access to new features'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited access to all features and support your emotional wellbeing journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {user?.tier === 'free' ? (
              <div className="text-center py-3 bg-gray-100 rounded-lg text-gray-600">
                Current Plan
              </div>
            ) : (
              <Link
                to="/chat"
                className="block w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg text-center font-medium hover:bg-gray-300 transition-colors"
              >
                Continue with Free
              </Link>
            )}
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 border-2 border-indigo-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Most Popular</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Premium</h2>
              <div className="text-4xl font-bold text-white mb-2">
                ₹599
                <span className="text-lg font-normal text-indigo-200">/month</span>
              </div>
              <p className="text-indigo-200">Unlimited healing support</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            {user?.tier === 'premium' ? (
              <div className="text-center py-3 bg-white bg-opacity-20 rounded-lg text-white">
                Current Plan
              </div>
            ) : (
              <button className="w-full py-3 px-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose Premium?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unlimited Conversations</h3>
              <p className="text-gray-600">Chat as much as you need without daily limits</p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Memory Access</h3>
              <p className="text-gray-600">Upload and reflect on unlimited memories</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🕊️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unlimited Closure</h3>
              <p className="text-gray-600">Connect with loved ones whenever you need</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Absolutely. All conversations are encrypted and stored securely. We never share your personal information or conversations.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, debit cards, and UPI payments through our secure payment processor Stripe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};