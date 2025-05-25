
import React from 'react';
import { Bot, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const avatarMap = {
    client: <User className="w-6 h-6 text-blue-600" />,
    freelancer: <Briefcase className="w-6 h-6 text-green-600" />,
    bot: <Bot className="w-6 h-6 text-purple-600" />
  };

  const backgroundMap = {
    client: 'bg-blue-50 border-blue-200',
    freelancer: 'bg-green-50 border-green-200',
    bot: 'bg-yellow-50 border-yellow-200'
  };

  const roleLabels = {
    client: '🧑 Client',
    freelancer: '👨‍💻 Freelancer',
    bot: '🤖 AI Bot'
  };

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
      backgroundMap[message.role]
    )}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-gray-100">
          {avatarMap[message.role]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-800">
            {roleLabels[message.role]}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: message.content.replace(/\$(\d+\.?\d*)/g, '<span class="font-bold text-green-600">$$$1</span>')
          }}
        />
      </div>
    </div>
  );
};

export default ChatMessage;
