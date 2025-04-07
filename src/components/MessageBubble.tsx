
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

type MessageBubbleProps = {
  message: string;
  isBot: boolean;
  timestamp: string;
};

const MessageBubble = ({ message, isBot, timestamp }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isBot ? "justify-start animate-slide-in" : "justify-end animate-fade-in"
    )}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-autoblue to-autoblue-dark rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isBot 
          ? "glass-card text-gray-100 rounded-tl-none" 
          : "bg-gradient-blue text-white rounded-tr-none"
      )}>
        <div className="text-sm leading-relaxed">{message}</div>
        <div className={cn(
          "text-xs mt-1 text-right",
          isBot ? "text-gray-400" : "text-blue-200"
        )}>
          {timestamp}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-autoblue-dark to-blue-800 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
