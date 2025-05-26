
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
  Brain,
  Target,
  Clock,
  DollarSign
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
        <div className="absolute -top-40 -right-80 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-80 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                <Bot className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                NegoAI
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 hover:shadow-green-500/25 shadow-lg transition-all duration-300">
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
            <div className="mb-8 animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-pulse">
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

            <div className="mb-16 animate-fade-in">
              <Button
                onClick={handleStartChat}
                className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6" />
                  <span>Start Negotiating Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              <p className="text-gray-400 mt-4 animate-fade-in">
                ✨ No signup required • Free to try • Instant results
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto mb-4 animate-pulse">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Smart AI Analysis</h3>
                  <p className="text-gray-300">Advanced algorithms analyze your conversation and market data to provide intelligent insights.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit mx-auto mb-4 animate-pulse">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Real-time Insights</h3>
                  <p className="text-gray-300">Get instant feedback on negotiation progress and data-driven recommendations.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit mx-auto mb-4 animate-pulse">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fair Deal Guarantee</h3>
                  <p className="text-gray-300">Ensures both parties reach mutually beneficial agreements with transparent pricing.</p>
                </CardContent>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
                <div className="text-gray-300">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</div>
                <div className="text-gray-300">Deals Closed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
                <div className="text-gray-300">Happy Freelancers</div>
              </div>
            </div>

            {/* How it Works */}
            <div className="mb-20 animate-fade-in">
              <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                How NegoAI Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">1. Share Your Conversation</h3>
                  <p className="text-gray-300">Paste your client conversation and project details into our secure AI system.</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-fit mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">2. AI Analysis</h3>
                  <p className="text-gray-300">Our AI analyzes market rates, project complexity, and negotiation dynamics.</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-fit mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">3. Get Recommendations</h3>
                  <p className="text-gray-300">Receive personalized pricing suggestions and negotiation strategies.</p>
                  </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-white/20 animate-fade-in hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Ready to negotiate like a pro?</h3>
              <p className="text-gray-300 mb-6">Join thousands of freelancers who have closed better deals with AI assistance.</p>
              <Button
                onClick={handleStartChat}
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Launch NegoAI Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
