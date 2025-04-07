
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
      "flex gap-3 animate-fade-in mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-autoblue rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isBot 
          ? "bg-gray-100 text-autodark rounded-tl-none" 
          : "bg-autoblue text-white rounded-tr-none"
      )}>
        <div className="text-sm">{message}</div>
        <div className={cn(
          "text-xs mt-1 text-right",
          isBot ? "text-gray-500" : "text-blue-100"
        )}>
          {timestamp}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-autoblue-dark rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
