
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Users, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Star,
  Brain
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                <Bot className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                NegoAI
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                AI Online
              </div>
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main heading with animation */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Freelance Negotiator
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Revolutionize your freelance deals with our intelligent AI that analyzes market trends, 
                suggests fair pricing, and guides you to successful negotiations in real-time.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-16 animate-scale-in" style={{animationDelay: '0.5s'}}>
              <Button
                onClick={handleStartChat}
                className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25"
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6" />
                  <span>Start Negotiating Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
              </Button>
              <p className="text-gray-400 mt-4">✨ No signup required • Free to try • Instant results</p>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Smart AI Analysis</h3>
                  <p className="text-gray-300">Advanced algorithms analyze your conversation and market data to suggest optimal pricing strategies.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105" style={{animationDelay: '0.2s'}}>
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Real-time Insights</h3>
                  <p className="text-gray-300">Get instant feedback on negotiation progress and receive strategic recommendations as you chat.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105" style={{animationDelay: '0.4s'}}>
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fair Deal Guarantee</h3>
                  <p className="text-gray-300">Our AI ensures both parties reach mutually beneficial agreements based on industry standards.</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats section */}
            <div className="grid md:grid-cols-4 gap-8 mb-20">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">$2.3M+</div>
                <div className="text-gray-400">Deals Closed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">10K+</div>
                <div className="text-gray-400">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-400">AI Available</div>
              </div>
            </div>

            {/* Features list */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Why Choose NegoAI?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                {[
                  'Market-based pricing analysis',
                  'Instant negotiation feedback',
                  'Professional deal templates',
                  'Multi-language support',
                  'Export conversation history',
                  'Zero learning curve'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-20 p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Ready to negotiate like a pro?</h3>
              <p className="text-gray-300 mb-6">Join thousands of freelancers who have closed better deals with AI assistance.</p>
              <Button
                onClick={handleStartChat}
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Launch NegoAI Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-6 py-8 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              © 2024 NegoAI. Powered by advanced machine learning.
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-400">4.9/5 from 2,847 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
