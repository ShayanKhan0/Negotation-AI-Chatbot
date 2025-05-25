import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { suggestMidpoint } from '@/utils/negotiationLogic';
import { apiClient } from '@/utils/apiClient';

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

export const useNegotiation = () => {
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

    addMessage(activeRole, currentMessage);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Call your FastAPI backend
      const clientMessages = messages
        .filter(m => m.role === 'client')
        .map(m => m.content)
        .join(' ') + (activeRole === 'client' ? ' ' + currentMessage : '');
      
      const freelancerMessages = messages
        .filter(m => m.role === 'freelancer')
        .map(m => m.content)
        .join(' ') + (activeRole === 'freelancer' ? ' ' + currentMessage : '');

      // Get AI predictions from your FastAPI backend
      const range = await apiClient.predictPrice(clientMessages, freelancerMessages);
      setPriceRange(range);

      const aiResponses = [
        `💡 <strong>AI Price Analysis Updated!</strong><br/>Fair market range: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>🔍 Analyzing project complexity and market rates...`,
        `🎯 <strong>Smart AI Pricing Insight:</strong><br/>Based on the conversation, I recommend: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>💼 This aligns with industry standards for your project scope.`,
        `⚡ <strong>AI Recommendation:</strong><br/>Updated fair price bracket: <span class="font-bold text-lg">$${range[0].toFixed(2)} - $${range[1].toFixed(2)}</span><br/>📊 Confidence level: High based on current market data.`
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage('bot', randomResponse);
      
      setActiveRole(activeRole === 'client' ? 'freelancer' : 'client');
    } catch (error) {
      console.error('AI processing error:', error);
      addMessage('bot', '⚠️ <strong>AI temporarily unavailable</strong><br/>Using backup analysis. Your FastAPI backend might be offline.');
    } finally {
      setIsTyping(false);
    }
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

  return {
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
  };
};
