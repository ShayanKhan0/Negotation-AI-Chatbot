
import React from 'react';
import { useNegotiation } from '@/hooks/useNegotiation';
import { Send, Download, CheckCircle, XCircle, Bot, User, Briefcase, Sparkles, MessageSquare, TrendingUp, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ChatMessage from '@/components/ChatMessage';
import OfferPanel from '@/components/OfferPanel';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    activeRole,
    offers,
    priceRange,
    chatEnded,
    isTyping,
    messageCount,
    messagesEndRef,
    handleSendMessage,
    handleOfferChange,
    handleAcceptDeal,
    handleEndDiscussion,
    downloadChatHistory
  } = useNegotiation();

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
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="text-white hover:bg-white/20 p-3"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
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
              </div>
            </div>
            <p className="text-xl opacity-90 font-medium text-center mt-4">
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

export default Chat;
