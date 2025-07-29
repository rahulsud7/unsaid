import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Users, ArrowRight, Shield, Clock, Sparkles, CheckCircle, Star, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from '../components/Logo';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <MessageCircle className="w-10 h-10 text-sage-600" />,
      title: "Therapy Bot",
      description: "Compassionate AI conversations for mental wellness and emotional support whenever you need it.",
      color: "bg-gradient-to-br from-sage-50 to-mint-50 border-sage-200",
      delay: "animate-stagger-1"
    },
    {
      icon: <Heart className="w-10 h-10 text-mint-600" />,
      title: "Unsaid Mode",
      description: "Reflective journaling with memory upload for deeper self-discovery and emotional processing.",
      color: "bg-gradient-to-br from-mint-50 to-sky-50 border-mint-200",
      delay: "animate-stagger-2"
    },
    {
      icon: <Users className="w-10 h-10 text-sky-600" />,
      title: "Closure Mode",
      description: "Meaningful farewell conversations with departed loved ones to find peace and healing.",
      color: "bg-gradient-to-br from-sky-50 to-sage-50 border-sky-200",
      delay: "animate-stagger-3"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-sage-600" />,
      title: "Complete Privacy",
      description: "Your conversations are encrypted and never shared. Your healing journey is completely private."
    },
    {
      icon: <Clock className="w-8 h-8 text-mint-600" />,
      title: "24/7 Availability",
      description: "Access support whenever you need it, day or night. No appointments necessary."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-sky-600" />,
      title: "Personalized Experience",
      description: "AI that learns and adapts to your unique emotional needs and communication style."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Unsaid AI helped me process grief in a way I never thought possible. The closure mode gave me peace.",
      rating: 5
    },
    {
      name: "David L.",
      text: "The therapy bot is incredibly understanding. It's like having a therapist available 24/7.",
      rating: 5
    },
    {
      name: "Maria R.",
      text: "I've been able to work through childhood memories safely. This app changed my healing journey.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Lives Touched" },
    { number: "1M+", label: "Conversations" },
    { number: "98%", label: "Feel Better" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-100/20 via-mint-100/20 to-sky-100/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <Logo size="lg" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="gradient-text">Unsaid AI</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-sage-700 mb-6 animate-slide-up animate-stagger-1">
              Your safe space for unspoken thoughts
            </p>
            
            <p className="text-lg md:text-xl text-sage-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-stagger-2">
              A compassionate AI companion designed to help you process emotions, 
              reflect on memories, and find closure in a judgment-free environment. 
              Begin your healing journey with understanding, privacy, and care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up animate-stagger-3">
              {user ? (
                <Link to="/chat" className="btn-primary text-lg px-8 py-4">
                  Continue Your Journey
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn-primary text-lg px-8 py-4">
                    Start Your Healing Journey
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                  <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/60 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-slide-up animate-stagger-${index + 1}`}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sage-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Three Paths to Healing
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
              Choose the approach that resonates with your current emotional needs. 
              Each mode is designed with care to support your unique healing journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border-2 ${feature.color} card-hover animate-slide-up ${feature.delay}`}
              >
                <div className="flex justify-center mb-6 animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-sage-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-sage-700 text-center leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/40 backdrop-blur-sm py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Why Choose Unsaid AI?
            </h2>
            <p className="text-xl text-sage-600 max-w-2xl mx-auto">
              Built with your wellbeing and privacy as our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className={`text-center animate-slide-up animate-stagger-${index + 1}`}>
                <div className="bg-gradient-to-br from-white to-cream-50 p-6 rounded-2xl shadow-lg mb-6 inline-block">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-sage-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-sage-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Stories of Healing
            </h2>
            <p className="text-xl text-sage-600">
              Real experiences from our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-sage-100/30 via-mint-100/30 to-sky-100/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              How It Works
            </h2>
            <p className="text-xl text-sage-600">
              Simple steps to begin your healing journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your secure account with Google" },
              { step: "2", title: "Choose Mode", desc: "Select therapy, reflection, or closure" },
              { step: "3", title: "Start Talking", desc: "Share your thoughts in a safe space" },
              { step: "4", title: "Find Peace", desc: "Process emotions and discover healing" }
            ].map((item, index) => (
              <div key={index} className={`text-center animate-slide-up animate-stagger-${index + 1}`}>
                <div className="bg-gradient-to-br from-sage-500 to-mint-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-sage-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sage-700">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-sage-600 via-mint-600 to-sky-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-xl text-sage-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands who have found comfort, clarity, and closure through Unsaid AI. 
              Your path to emotional wellbeing starts with a single conversation.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/login"
                  className="bg-white text-sage-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cream-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Your Free Journey
                  <ArrowRight className="ml-3 w-6 h-6 inline" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-sage-700 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-sage-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <Logo size="md" className="mb-6" />
              <p className="text-sage-300 mb-6 leading-relaxed">
                Unsaid AI provides a safe, compassionate space for emotional healing and self-discovery. 
                Our AI companion is here to support you through life's most challenging moments.
              </p>
              <div className="flex space-x-4">
                <Globe className="w-6 h-6 text-sage-400" />
                <span className="text-sage-300">Available worldwide, 24/7</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sage-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2 text-sage-300">
                <li><Link to="/chat" className="hover:text-white transition-colors">Therapy Bot</Link></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Unsaid Mode</Link></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Closure Mode</Link></li>
                <li><Link to="/upgrade" className="hover:text-white transition-colors">Premium</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-sage-800 pt-8 text-center">
            <p className="text-sage-400">
              © 2025 Unsaid AI. Designed with care for emotional wellbeing and healing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};