import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Shield, Heart, Clock, Users, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <MessageCircle className="w-6 h-6 text-sage-600" />,
      questions: [
        {
          question: "How do I get started with Unsaid AI?",
          answer: "Simply sign up with your Google account and you'll be taken to the chat interface. You can immediately start using any of our three modes: Therapy Bot, Unsaid Mode, or Closure Mode. No complex setup required."
        },
        {
          question: "Is Unsaid AI free to use?",
          answer: "Yes! We offer a free tier that includes 3 daily therapy conversations, 1 memory upload in Unsaid Mode, and 1 closure conversation per day. Premium users get unlimited access to all features."
        },
        {
          question: "Do I need to download an app?",
          answer: "No download required! Unsaid AI works directly in your web browser on any device - desktop, tablet, or mobile. We're also working on dedicated mobile apps coming soon."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-6 h-6 text-mint-600" />,
      questions: [
        {
          question: "How secure are my conversations?",
          answer: "Your privacy is our top priority. All conversations are encrypted end-to-end, stored securely, and never shared with third parties. We're SOC 2 Type II certified and HIPAA compliant."
        },
        {
          question: "Can anyone else see my messages?",
          answer: "Absolutely not. Your conversations are completely private. Even our team cannot access your personal messages. Only you can see your conversation history."
        },
        {
          question: "What data do you collect?",
          answer: "We only collect basic account information (email, name) and anonymized usage patterns to improve our service. We never analyze or store the content of your personal conversations."
        },
        {
          question: "Can I delete my data?",
          answer: "Yes, you have complete control over your data. You can delete individual conversations, export your data, or permanently delete your entire account at any time from your settings."
        }
      ]
    },
    {
      title: "Features & Modes",
      icon: <Heart className="w-6 h-6 text-sky-600" />,
      questions: [
        {
          question: "What's the difference between the three modes?",
          answer: "Therapy Bot provides general emotional support and coping strategies. Unsaid Mode helps you process memories and unexpressed thoughts through reflective journaling. Closure Mode facilitates conversations with departed loved ones for healing and peace."
        },
        {
          question: "How does the AI understand my emotions?",
          answer: "Our AI is trained specifically for empathetic conversations using advanced natural language processing. It recognizes emotional cues, responds with appropriate support, and adapts to your communication style over time."
        },
        {
          question: "Can I upload memories in Unsaid Mode?",
          answer: "Yes! Premium users can upload unlimited memories, photos, and documents to reflect on with AI guidance. Free users get one memory upload per day to try the feature."
        },
        {
          question: "Is Closure Mode appropriate for recent losses?",
          answer: "Closure Mode can be helpful at any stage of grief, but we recommend using it when you feel emotionally ready. The AI provides gentle, supportive responses and can help you process feelings at your own pace."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: <Clock className="w-6 h-6 text-sage-600" />,
      questions: [
        {
          question: "What if I'm experiencing a mental health crisis?",
          answer: "Unsaid AI is not a replacement for emergency services. If you're in crisis, please contact emergency services (911) or a crisis hotline immediately. We provide resources and can help connect you with professional support."
        },
        {
          question: "Why isn't the AI responding?",
          answer: "If you're experiencing technical issues, try refreshing your browser or checking your internet connection. If problems persist, contact our support team at support@unsaid.ai."
        },
        {
          question: "Can I use Unsaid AI on my phone?",
          answer: "Yes! Our web app is fully responsive and works great on mobile devices. We're also developing native iOS and Android apps for an even better mobile experience."
        },
        {
          question: "How do I report inappropriate AI responses?",
          answer: "We take AI safety seriously. If you receive an inappropriate response, please use the report button in the chat or contact us directly. We review all reports and continuously improve our AI training."
        }
      ]
    },
    {
      title: "Billing & Premium",
      icon: <Users className="w-6 h-6 text-mint-600" />,
      questions: [
        {
          question: "What's included in Premium?",
          answer: "Premium includes unlimited conversations in all modes, unlimited memory uploads, priority support, advanced chat history, data export, and early access to new features. It's ₹599/month with no long-term commitment."
        },
        {
          question: "Can I cancel my Premium subscription anytime?",
          answer: "Yes, you can cancel anytime from your account settings. Your Premium features will remain active until the end of your current billing period, then you'll automatically switch to the free tier."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 7-day money-back guarantee for new Premium subscribers. If you're not satisfied within the first week, contact us for a full refund."
        },
        {
          question: "Are there student or low-income discounts?",
          answer: "Yes! We offer 50% discounts for students and individuals facing financial hardship. Contact our support team with verification for discount codes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-sky-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <HelpCircle className="w-16 h-16 text-sage-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Unsaid AI. If you can't find what you're looking for, 
            feel free to contact our support team.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className={`animate-slide-up animate-stagger-${categoryIndex + 1}`}>
              <div className="glass-effect rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-sage-100/50 to-mint-100/50 p-6 border-b border-sage-200/30">
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <h2 className="text-2xl font-bold text-sage-900">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={faqIndex} className="border border-sage-200/30 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-4 text-left bg-white/50 hover:bg-sage-50/50 transition-colors flex items-center justify-between"
                        >
                          <span className="font-semibold text-sage-900 pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-sage-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-sage-600 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="p-4 bg-white/30 border-t border-sage-200/30 animate-slide-up">
                            <p className="text-sage-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="glass-effect p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Still Have Questions?
            </h3>
            <p className="text-sage-700 mb-6 leading-relaxed">
              Our support team is here to help you on your healing journey. 
              We typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@unsaid.ai"
                className="btn-primary"
              >
                Email Support
              </a>
              <a
                href="/contact"
                className="btn-secondary"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-effect p-6 rounded-xl text-center">
            <MessageCircle className="w-8 h-8 text-sage-600 mx-auto mb-3" />
            <h4 className="font-semibold text-sage-900 mb-2">Start Chatting</h4>
            <p className="text-sm text-sage-600 mb-3">Begin your healing journey today</p>
            <a href="/chat" className="text-sage-600 hover:text-sage-800 font-medium">
              Go to Chat →
            </a>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center">
            <Shield className="w-8 h-8 text-mint-600 mx-auto mb-3" />
            <h4 className="font-semibold text-sage-900 mb-2">Privacy Policy</h4>
            <p className="text-sm text-sage-600 mb-3">Learn about our data practices</p>
            <a href="/privacy" className="text-sage-600 hover:text-sage-800 font-medium">
              Read Policy →
            </a>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center">
            <Users className="w-8 h-8 text-sky-600 mx-auto mb-3" />
            <h4 className="font-semibold text-sage-900 mb-2">About Us</h4>
            <p className="text-sm text-sage-600 mb-3">Meet our team and mission</p>
            <a href="/about" className="text-sage-600 hover:text-sage-800 font-medium">
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};