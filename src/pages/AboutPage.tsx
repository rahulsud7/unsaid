import React from 'react';
import { Heart, Shield, Users, Award, Globe, Lightbulb } from 'lucide-react';
import { Logo } from '../components/Logo';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-sage-600" />,
      title: "Compassion First",
      description: "Every interaction is designed with empathy and understanding at its core."
    },
    {
      icon: <Shield className="w-8 h-8 text-mint-600" />,
      title: "Privacy Protected",
      description: "Your conversations are encrypted and never shared. Your healing is private."
    },
    {
      icon: <Users className="w-8 h-8 text-sky-600" />,
      title: "Inclusive Support",
      description: "We welcome everyone, regardless of background, identity, or circumstances."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Psychologist & Co-Founder",
      bio: "15+ years in trauma therapy and AI ethics",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      name: "Alex Rodriguez",
      role: "AI Engineer & Co-Founder",
      bio: "Former Google AI researcher specializing in empathetic AI",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    },
    {
      name: "Maya Patel",
      role: "Head of User Experience",
      bio: "Accessibility advocate and trauma-informed design expert",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded with mission to democratize mental health support" },
    { year: "2024", event: "Launched beta with 1,000 users, 98% satisfaction rate" },
    { year: "2024", event: "Partnered with leading trauma therapy organizations" },
    { year: "2025", event: "Serving 50,000+ users worldwide with 24/7 support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-sky-50">
      {/* Hero Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <Logo size="lg" className="justify-center mb-8" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              About Unsaid AI
            </h1>
            <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              We believe everyone deserves access to compassionate support for their emotional wellbeing, 
              regardless of time, location, or circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white/60 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold gradient-text mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-sage-700 mb-6 leading-relaxed">
                Unsaid AI was born from a simple yet profound realization: many people carry unspoken thoughts, 
                unprocessed emotions, and unresolved grief that traditional therapy models can't always address 
                due to barriers like cost, availability, or stigma.
              </p>
              <p className="text-lg text-sage-700 mb-6 leading-relaxed">
                We created a safe, judgment-free space where you can express what's been left unsaid, 
                process difficult emotions, and find closure at your own pace, with the support of 
                compassionate AI technology.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-sage-600" />
                <span className="text-sage-700 font-medium">Recognized by Mental Health Innovation Awards 2024</span>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-sage-100 to-mint-100 p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                    <div className="text-sage-600">Lives Touched</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
                    <div className="text-sage-600">Conversations</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                    <div className="text-sage-600">Feel Better</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                    <div className="text-sage-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product development to user support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className={`text-center animate-slide-up animate-stagger-${index + 1}`}>
                <div className="bg-gradient-to-br from-white to-cream-50 p-6 rounded-2xl shadow-lg mb-6 inline-block">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-sage-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-sage-700 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/40 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              A diverse group of mental health professionals, AI researchers, and advocates 
              united by a shared mission to make emotional support accessible to all
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className={`glass-effect p-8 rounded-2xl shadow-lg text-center animate-slide-up animate-stagger-${index + 1}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-sage-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sage-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-sage-700 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              From a small idea to a global platform supporting emotional wellbeing
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center space-x-8 animate-slide-in-left animate-stagger-${index + 1}`}>
                <div className="bg-gradient-to-br from-sage-500 to-mint-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="glass-effect p-6 rounded-xl shadow-lg flex-1">
                  <p className="text-sage-700 text-lg leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-gradient-to-r from-sage-100/30 via-mint-100/30 to-sky-100/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <Lightbulb className="w-16 h-16 text-sage-600 mb-6" />
              <h2 className="text-4xl font-bold gradient-text mb-6">
                Ethical AI Technology
              </h2>
              <p className="text-lg text-sage-700 mb-6 leading-relaxed">
                Our AI is built on principles of empathy, respect, and understanding. We use advanced 
                natural language processing trained specifically for emotional support conversations, 
                with built-in safeguards to ensure appropriate responses.
              </p>
              <p className="text-lg text-sage-700 mb-6 leading-relaxed">
                Every conversation is encrypted end-to-end, and we never store or analyze your personal 
                information. Our AI learns from anonymized patterns to improve support quality while 
                maintaining complete privacy.
              </p>
              <div className="flex items-center space-x-4">
                <Shield className="w-8 h-8 text-sage-600" />
                <span className="text-sage-700 font-medium">SOC 2 Type II Certified & HIPAA Compliant</span>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-white to-cream-50 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-sage-900 mb-6">Our Commitments</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sage-700">Never replace human therapy, only supplement it</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-mint-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sage-700">Maintain complete user privacy and data security</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sage-700">Provide crisis intervention and professional referrals</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sage-700">Continuously improve through ethical AI practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Impact */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Globe className="w-16 h-16 text-sage-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Global Impact
            </h2>
            <p className="text-xl text-sage-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Unsaid AI is available in 15+ languages and serves users across 50+ countries. 
              We're committed to making emotional support accessible regardless of geographic, 
              economic, or cultural barriers.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-effect p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-sage-600">Languages Supported</div>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-sage-600">Countries Served</div>
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-sage-600">Global Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};