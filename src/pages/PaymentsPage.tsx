import React, { useState } from 'react';
import { Crown, Check, CreditCard, Shield, Clock, Zap, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const PaymentsPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');
  const { user } = useAuth();

  const plans = {
    free: {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with emotional support',
      features: [
        'Therapy Bot: 3 messages per day',
        'Unsaid Mode: 1 memory upload (preview only)',
        'Closure Mode: 1 farewell message per day',
        'Basic chat history (7 days)',
        'Mobile app access',
        'Community support'
      ],
      limitations: [
        'Limited daily usage',
        'Basic features only',
        'Standard response time'
      ]
    },
    premium: {
      name: 'Premium',
      price: { monthly: 599, yearly: 5990 },
      description: 'Unlimited healing support for your complete wellbeing journey',
      features: [
        'Unlimited Therapy Bot conversations',
        'Unlimited Unsaid Mode with full memory uploads',
        'Unlimited Closure Mode conversations',
        'Advanced chat history and search (unlimited)',
        'Priority AI response time',
        'Export conversation data',
        'Priority customer support',
        'Early access to new features',
        'Advanced emotional insights',
        'Personalized healing recommendations'
      ],
      popular: true
    }
  };

  const paymentMethods = [
    { name: 'Credit/Debit Card', icon: <CreditCard className="w-6 h-6" />, supported: true },
    { name: 'UPI', icon: <Zap className="w-6 h-6" />, supported: true },
    { name: 'Net Banking', icon: <Shield className="w-6 h-6" />, supported: true },
    { name: 'Wallets', icon: <Clock className="w-6 h-6" />, supported: true }
  ];

  const testimonials = [
    {
      name: "Priya S.",
      text: "Premium was worth every rupee. Having unlimited access during my difficult time was invaluable.",
      rating: 5
    },
    {
      name: "Rahul M.",
      text: "The advanced features in Premium helped me process years of unresolved emotions.",
      rating: 5
    }
  ];

  const handleUpgrade = () => {
    // Mock payment integration
    alert('Payment integration would be implemented here with Stripe/Razorpay');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-sky-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Choose Your Healing Plan
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Invest in your emotional wellbeing with a plan that fits your needs. 
            Start free and upgrade anytime for unlimited support.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12 animate-slide-up">
          <div className="glass-effect p-2 rounded-xl">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-sage-500 text-white shadow-lg'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-sage-500 text-white shadow-lg'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-mint-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="glass-effect rounded-2xl shadow-lg p-8 border-2 border-sage-200 animate-slide-in-left">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-sage-900 mb-2">Free</h2>
              <div className="text-5xl font-bold text-sage-900 mb-2">₹0</div>
              <p className="text-sage-600">{plans.free.description}</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {plans.free.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sage-700">{feature}</span>
                </li>
              ))}
            </ul>

            {user?.tier === 'free' ? (
              <div className="text-center py-3 bg-sage-100 rounded-lg text-sage-700 font-medium">
                Current Plan
              </div>
            ) : (
              <button className="w-full btn-secondary">
                Continue with Free
              </button>
            )}
          </div>

          {/* Premium Plan */}
          <div className="relative">
            {plans.premium.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}
            
            <div className="glass-effect rounded-2xl shadow-xl p-8 border-2 border-sage-400 bg-gradient-to-br from-sage-50/50 to-mint-50/50 animate-slide-in-right">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-sage-900 mb-2">Premium</h2>
                <div className="text-5xl font-bold gradient-text mb-2">
                  ₹{billingCycle === 'monthly' ? '599' : '499'}
                  <span className="text-lg font-normal text-sage-600">
                    /{billingCycle === 'monthly' ? 'month' : 'month'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-mint-600 font-medium">
                    Billed yearly (₹5,990) - Save ₹1,198!
                  </p>
                )}
                <p className="text-sage-600 mt-2">{plans.premium.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plans.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sage-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {user?.tier === 'premium' ? (
                <div className="text-center py-3 bg-gradient-to-r from-sage-500 to-mint-500 text-white rounded-lg font-medium">
                  Current Plan
                </div>
              ) : (
                <button 
                  onClick={handleUpgrade}
                  className="w-full btn-primary text-lg py-4"
                >
                  Upgrade to Premium
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Secure Payment Methods
            </h2>
            <p className="text-sage-600">
              We support all major payment methods for your convenience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="glass-effect p-6 rounded-xl text-center">
                <div className="text-sage-600 mb-3 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="font-medium text-sage-900 mb-2">{method.name}</h3>
                <div className="text-xs text-sage-600">
                  {method.supported ? '✓ Supported' : 'Coming Soon'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Guarantees */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-effect p-8 rounded-2xl shadow-lg animate-slide-up">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-sage-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold gradient-text mb-4">
                Your Security is Our Priority
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-sage-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="font-semibold text-sage-900 mb-2">256-bit SSL Encryption</h3>
                <p className="text-sage-600 text-sm">Bank-level security for all transactions</p>
              </div>

              <div className="text-center">
                <div className="bg-mint-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-mint-600" />
                </div>
                <h3 className="font-semibold text-sage-900 mb-2">7-Day Money Back</h3>
                <p className="text-sage-600 text-sm">Full refund if not satisfied</p>
              </div>

              <div className="text-center">
                <div className="bg-sky-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-semibold text-sage-900 mb-2">PCI Compliant</h3>
                <p className="text-sage-600 text-sm">Industry standard payment security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              What Our Premium Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`glass-effect p-8 rounded-2xl shadow-lg animate-slide-up animate-stagger-${index + 1}`}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sage-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-sage-900">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Billing Questions?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold text-sage-900 mb-3">Can I cancel anytime?</h3>
              <p className="text-sage-700 text-sm">
                Yes, cancel anytime from your account settings. Your premium features remain active until the end of your billing period.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold text-sage-900 mb-3">Do you offer student discounts?</h3>
              <p className="text-sage-700 text-sm">
                Yes! We offer 50% off for students and those facing financial hardship. Contact support with verification.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold text-sage-900 mb-3">What happens to my data if I cancel?</h3>
              <p className="text-sage-700 text-sm">
                Your conversations remain accessible. You can export your data anytime, even after cancellation.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="font-semibold text-sage-900 mb-3">Is there a family plan?</h3>
              <p className="text-sage-700 text-sm">
                We're working on family plans! Contact us if you're interested in multiple accounts for your family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};