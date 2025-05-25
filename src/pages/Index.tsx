
import React, { useState, useEffect, useRef } from 'react';
import { Send, Download, CheckCircle, XCircle, Bot, User, Briefcase, Sparkles, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import ChatMessage from '@/components/ChatMessage';
import OfferPanel from '@/components/OfferPanel';
import { predictPrice, suggestMidpoint, buildFeatureVector } from '@/utils/negotiationLogic';

interface Message {
  id: string;
  role: 'client' | 'freelancer' | 'bot';
  content: string;
  timestamp: Date;
}

interface Offers {
  client: number;
  freelancer: number;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeRole, setActiveRole] = useState<'client' | 'freelancer'>('client');
  const [offers, setOffers] = useState<Offers>({ client: 0, freelancer: 0 });
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [chatEnded, setChatEnded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addMessage('bot', '🎉 Welcome to the AI-Powered Freelance Negotiator! I\'m here to help you reach a fair agreement. Start by describing your project and budget expectations. Let\'s make a great deal together! 🚀');
    }
  }, []);

  const addMessage = (role: 'client' | 'freelancer' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setMessageCount(prev => prev + 1);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || chatEnded) return;

    // Add user message
    addMessage(activeRole, currentMessage);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI processing with more realistic delay
    setTimeout(() => {
      const clientMessages = messages
        .filter(m => m.role === 'client')
        .map(m => m.content)
        .join(' ') + (activeRole === 'client' ? ' ' + currentMessage : '');
      
      const freelancerMessages = messages
        .filter(m => m.role === 'freelancer')
        .map(m => m.content)
        .join(' ') + (activeRole === 'freelancer' ? ' ' + currentMessage : '');

      const features = buildFeatureVector(clientMessages, freelancerMessages);
      const range = predictPrice(features);
      setPriceRange(range);

      // Generate contextual AI responses
      const aiResponses = [
        `💡 <strong>Price Analysis Updated!</strong><br/>Fair market range: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>🔍 Analyzing project complexity and market rates...`,
        `🎯 <strong>Smart Pricing Insight:</strong><br/>Based on the conversation, I recommend: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>💼 This aligns with industry standards for your project scope.`,
        `⚡ <strong>AI Recommendation:</strong><br/>Updated fair price bracket: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>📊 Confidence level: High based on current market data.`
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage('bot', randomResponse);
      
      // Switch roles for continuous conversation
      setActiveRole(activeRole === 'client' ? 'freelancer' : 'client');
      setIsTyping(false);
    }, 1800 + Math.random() * 1000);
  };

  const handleOfferChange = (role: 'client' | 'freelancer', value: number) => {
    const newOffers = { ...offers, [role]: value };
    setOffers(newOffers);

    if (newOffers.client > 0 && newOffers.freelancer > 0) {
      const midpoint = suggestMidpoint(newOffers.client, newOffers.freelancer);
      const gapPercentage = ((midpoint.gap / Math.max(newOffers.client, newOffers.freelancer)) * 100).toFixed(1);
      
      addMessage('bot', 
        `🧮 <strong>Offer Analysis:</strong><br/>
        💰 Gap: <span class="font-bold text-orange-600">$${midpoint.gap.toFixed(2)}</span> (${gapPercentage}%)<br/>
        🎯 Suggested midpoint: <span class="font-bold text-blue-600">$${midpoint.midpoint.toFixed(2)}</span><br/>
        📈 Negotiation progress: ${midpoint.gap < 100 ? 'Excellent! 🎉' : midpoint.gap < 300 ? 'Getting close! 👍' : 'Still negotiating... 💪'}`
      );
    }
  };

  const handleAcceptDeal = () => {
    const finalPrice = Math.max(offers.client, offers.freelancer);
    addMessage('bot', `✅ <strong>🎉 DEAL COMPLETED! 🎉</strong><br/>
      Final agreed price: <span class="font-bold text-green-600 text-xl">$${finalPrice.toFixed(2)}</span><br/>
      📅 Date: ${new Date().toLocaleDateString()}<br/>
      🤝 Thank you for using our AI negotiation platform!`);
    setChatEnded(true);
    toast({
      title: "🎉 Congratulations!",
      description: `Deal successfully closed at $${finalPrice.toFixed(2)}`,
    });
  };

  const handleEndDiscussion = () => {
    addMessage('bot', '❌ <strong>Negotiation Ended</strong><br/>No agreement was reached this time. Feel free to start a new negotiation anytime! 💼');
    setChatEnded(true);
    toast({
      title: "Discussion Ended",
      description: "Negotiation closed without agreement",
      variant: "destructive"
    });
  };

  const downloadChatHistory = () => {
    const csvContent = messages.map(m => 
      `${m.timestamp.toISOString()},${m.role},"${m.content.replace(/,/g, ';').replace(/<[^>]*>/g, '')}"`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,Role,Message\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `negotiation_chat_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "📥 Download Complete",
      description: "Chat history exported successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with animated elements */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        
        <div className="container mx-auto relative z-10">
          {/* Animated banner */}
          <div className="py-3 border-b border-white/20">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-pulse text-center">
                <span className="inline-flex items-center gap-2 text-lg font-semibold">
                  🤝 💬 AI-Powered Freelance Negotiation Platform 🤖💼 Real-time Smart Messaging & Dynamic Offers 💵🎯 Professional Deal Making ⚡
                </span>
              </div>
            </div>
          </div>
          
          {/* Main header content */}
          <div className="py-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Bot className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                AI Freelance Negotiator
              </h1>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <p className="text-xl opacity-90 font-medium">
              Smart negotiations powered by machine learning • Real-time market analysis • Professional deal closure
            </p>
            
            {/* Stats bar */}
            <div className="flex items-center justify-center gap-8 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>{messageCount} messages</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{priceRange ? `$${priceRange[0]}-${priceRange[1]}` : 'Analyzing...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>AI Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] shadow-2xl border-0 bg-white/60 backdrop-blur-xl overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Live Negotiation Chat</span>
                  {!chatEnded && (
                    <Badge variant="outline" className="ml-auto bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        {activeRole === 'client' ? '👤 Client Turn' : '💼 Freelancer Turn'}
                      </div>
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full flex flex-col">
                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-6 pb-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-700 font-medium">AI is thinking</span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {!chatEnded && (
                  <div className="p-6 border-t bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm">
                    <div className="flex gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                        {activeRole === 'client' ? 
                          <User className="w-4 h-4 text-blue-600" /> : 
                          <Briefcase className="w-4 h-4 text-green-600" />
                        }
                        <span className="text-sm font-medium">
                          {activeRole === 'client' ? '👤 Client' : '💼 Freelancer'}
                        </span>
                      </div>
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder={`Share your thoughts, requirements, or counter-offers...`}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border-2 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <OfferPanel 
              offers={offers}
              onOfferChange={handleOfferChange}
              priceRange={priceRange}
              disabled={chatEnded}
            />

            {/* Enhanced Action Buttons */}
            <Card className="shadow-xl border-0 bg-white/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!chatEnded ? (
                  <>
                    <Button 
                      onClick={handleAcceptDeal}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                      disabled={offers.client === 0 || offers.freelancer === 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      🎉 Accept Deal
                    </Button>
                    <Button 
                      onClick={handleEndDiscussion}
                      variant="destructive"
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      End Discussion
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={downloadChatHistory}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    📁 Download Chat History
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Enhanced AI Analysis Panel */}
            {priceRange && (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    AI Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/40">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">💰 Fair Price Range:</span>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
                        </span>
                      </div>
                    </div>
                    
                    {offers.client > 0 && offers.freelancer > 0 && (
                      <>
                        <Separator className="bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">📊 Price Gap:</span>
                            <span className="font-bold text-orange-600">
                              ${Math.abs(offers.freelancer - offers.client).toFixed(0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">🎯 Sweet Spot:</span>
                            <span className="font-bold text-green-600">
                              ${((offers.client + offers.freelancer) / 2).toFixed(0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">⚡ Negotiation Status:</span>
                            <Badge className={`${Math.abs(offers.freelancer - offers.client) < 100 ? 'bg-green-100 text-green-800' : 
                              Math.abs(offers.freelancer - offers.client) < 300 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                              {Math.abs(offers.freelancer - offers.client) < 100 ? '🎉 Almost there!' : 
                               Math.abs(offers.freelancer - offers.client) < 300 ? '💪 Good progress' : 
                               '🚀 Keep going'}
                            </Badge>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
