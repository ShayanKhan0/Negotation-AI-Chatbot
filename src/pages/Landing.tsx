
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
  console.log('Landing component is rendering');
  const navigate = useNavigate();

  const handleStartChat = () => {
    console.log('Navigate to chat clicked');
    navigate('/chat');
  };

  console.log('About to return JSX');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
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
            <div className="mb-8">
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

            <div className="mb-16">
              <Button
                onClick={handleStartChat}
                className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6" />
                  <span>Start Negotiating Now</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              <p className="text-gray-400 mt-4">✨ No signup required • Free to try • Instant results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Smart AI Analysis</h3>
                  <p className="text-gray-300">Advanced algorithms analyze your conversation and market data.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit mx-auto mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Real-time Insights</h3>
                  <p className="text-gray-300">Get instant feedback on negotiation progress and recommendations.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fair Deal Guarantee</h3>
                  <p className="text-gray-300">Ensures both parties reach mutually beneficial agreements.</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-20 p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Ready to negotiate like a pro?</h3>
              <p className="text-gray-300 mb-6">Join thousands of freelancers who have closed better deals with AI assistance.</p>
              <Button
                onClick={handleStartChat}
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-bold rounded-xl"
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
