
import React from 'react';
import { Bot, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  role: 'client' | 'freelancer' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  const isClient = message.role === 'client';
  const isFreelancer = message.role === 'freelancer';

  const avatarConfig = {
    client: {
      image: 'https://i.imgur.com/OmN4rb4.jpeg',
      fallback: <User className="w-5 h-5 text-blue-600" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 via-blue-25 to-cyan-50',
      borderColor: 'border-blue-200/60',
      textColor: 'text-blue-900'
    },
    freelancer: {
      image: 'https://i.imgur.com/SVjTR4W.png',
      fallback: <Briefcase className="w-5 h-5 text-emerald-600" />,
      gradient: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 via-green-25 to-teal-50',
      borderColor: 'border-emerald-200/60',
      textColor: 'text-emerald-900'
    },
    bot: {
      image: 'https://i.imgur.com/w62vuhM.jpeg',
      fallback: <Bot className="w-5 h-5 text-purple-600" />,
      gradient: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 via-violet-25 to-indigo-50',
      borderColor: 'border-purple-200/60',
      textColor: 'text-purple-900'
    }
  };

  const config = avatarConfig[message.role];

  const roleLabels = {
    client: '👤 Client',
    freelancer: '💼 Freelancer',
    bot: '🤖 AI Assistant'
  };

  return (
    <div className={cn(
      "group relative flex gap-4 p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm",
      config.bgColor,
      config.borderColor,
      "shadow-lg hover:shadow-2xl"
    )}>
      {/* Avatar with gradient ring */}
      <div className="flex-shrink-0 relative">
        <div className={cn(
          "p-0.5 rounded-full bg-gradient-to-r",
          config.gradient
        )}>
          <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
            <AvatarImage 
              src={config.image} 
              alt={`${message.role} avatar`}
              className="object-cover"
            />
            <AvatarFallback className="bg-white">
              {config.fallback}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Online status indicator */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
      </div>

      {/* Message content */}
      <div className="flex-1 min-w-0">
        {/* Header with role and timestamp */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className={cn(
              "font-bold text-sm px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm",
              config.textColor
            )}>
              {roleLabels[message.role]}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>🕒</span>
              <span className="font-medium">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
          
          {/* Message type indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className={cn(
              "px-2 py-1 rounded-lg text-xs font-medium bg-white/60 backdrop-blur-sm",
              config.textColor
            )}>
              {isBot ? '🔮 AI' : '💬 Human'}
            </div>
          </div>
        </div>

        {/* Message content with enhanced styling */}
        <div className={cn(
          "text-gray-800 leading-relaxed font-medium text-base",
          "bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/60"
        )}>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: message.content
                .replace(/\$(\d+\.?\d*)/g, '<span class="inline-flex items-center px-2 py-1 rounded-lg bg-green-100 text-green-800 font-bold text-sm">💰 $$$1</span>')
                .replace(/\b(expert|professional|experienced)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm">⭐ $1</span>')
                .replace(/\b(urgent|asap|quickly|rush)\b/gi, '<span class="inline-flex items-center px-2 py-1 rounded-lg bg-red-100 text-red-800 font-semibold text-sm">🚨 $1</span>')
            }}
          />
        </div>

        {/* Message actions (visible on hover) */}
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
            👍 Helpful
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
            📎 Quote
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
            ⭐ Star
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
