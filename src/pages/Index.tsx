
import React, { useState, useEffect, useRef } from 'react';
import { Send, Download, CheckCircle, XCircle, Bot, User, Briefcase } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'client' | 'freelancer' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || chatEnded) return;

    // Add user message
    addMessage(activeRole, currentMessage);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot processing
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

      addMessage('bot', `💡 Updated fair price range: $${range[0].toFixed(2)} - $${range[1].toFixed(2)}`);
      
      setActiveRole(activeRole === 'client' ? 'freelancer' : 'client');
      setIsTyping(false);
    }, 1500);
  };

  const handleOfferChange = (role: 'client' | 'freelancer', value: number) => {
    const newOffers = { ...offers, [role]: value };
    setOffers(newOffers);

    if (newOffers.client > 0 && newOffers.freelancer > 0) {
      const midpoint = suggestMidpoint(newOffers.client, newOffers.freelancer);
      addMessage('bot', 
        `🧮 Gap: $${midpoint.gap.toFixed(2)} → Midpoint: $${midpoint.midpoint.toFixed(2)}`
      );
    }
  };

  const handleAcceptDeal = () => {
    const finalPrice = Math.max(offers.client, offers.freelancer);
    addMessage('bot', `✅ Deal accepted at $${finalPrice.toFixed(2)} on ${new Date().toLocaleDateString()}`);
    setChatEnded(true);
    toast({
      title: "Deal Accepted! 🎉",
      description: `Negotiation completed at $${finalPrice.toFixed(2)}`,
    });
  };

  const handleEndDiscussion = () => {
    addMessage('bot', '❌ Negotiation ended without a deal.');
    setChatEnded(true);
    toast({
      title: "Discussion Ended",
      description: "Negotiation closed without agreement",
      variant: "destructive"
    });
  };

  const downloadChatHistory = () => {
    const csvContent = messages.map(m => 
      `${m.timestamp.toISOString()},${m.role},${m.content.replace(/,/g, ';')}`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,Role,Message\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with animated banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="text-center mb-4">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="animate-pulse text-lg font-medium">
                🤝 💬 Continuous Freelance Negotiation Bot 🤖💼 Real-time Messaging & Offers 💵🎯
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">🤖 Freelance Price Negotiator</h1>
            <p className="text-xl opacity-90">Chat live, adjust offers, and reach a deal — or not</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] shadow-xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Negotiation Chat
                  {!chatEnded && (
                    <Badge variant="outline" className="ml-auto">
                      {activeRole === 'client' ? '🧑 Client Turn' : '👨‍💻 Freelancer Turn'}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full flex flex-col">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Bot className="w-4 h-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {!chatEnded && (
                  <div className="p-4 border-t bg-gray-50/80">
                    <div className="flex gap-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder={`${activeRole === 'client' ? '🧑 Client' : '👨‍💻 Freelancer'} say something...`}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border-2 focus:border-blue-500"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Offers and Controls */}
          <div className="space-y-6">
            <OfferPanel 
              offers={offers}
              onOfferChange={handleOfferChange}
              priceRange={priceRange}
              disabled={chatEnded}
            />

            {/* Action Buttons */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!chatEnded ? (
                  <>
                    <Button 
                      onClick={handleAcceptDeal}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={offers.client === 0 || offers.freelancer === 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Deal
                    </Button>
                    <Button 
                      onClick={handleEndDiscussion}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      End Discussion
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={downloadChatHistory}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Chat History
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            {priceRange && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Fair Range:</span>
                      <span className="font-bold text-blue-600">
                        ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
                      </span>
                    </div>
                    {offers.client > 0 && offers.freelancer > 0 && (
                      <>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Gap:</span>
                          <span className="font-bold text-orange-600">
                            ${Math.abs(offers.freelancer - offers.client).toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Midpoint:</span>
                          <span className="font-bold text-green-600">
                            ${((offers.client + offers.freelancer) / 2).toFixed(0)}
                          </span>
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
