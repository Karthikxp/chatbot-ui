
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Car } from "lucide-react";
import MessageBubble from './MessageBubble';
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
};

type ChatInterfaceProps = {
  selectedVehicle: any;
};

const ChatInterface = ({ selectedVehicle }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send initial bot message when vehicle is selected
  useEffect(() => {
    if (selectedVehicle) {
      setMessages([
        {
          id: '1',
          text: `Hello! I'm your virtual assistant for the ${selectedVehicle.name}. What would you like to know about this vehicle?`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [selectedVehicle]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        `The ${selectedVehicle.name} comes with a comprehensive infotainment system including Apple CarPlay and Android Auto.`,
        `${selectedVehicle.name} has an impressive range of over 300 miles on a single charge.`,
        `The ${selectedVehicle.name} features advanced driver assistance systems including adaptive cruise control and lane keeping assist.`,
        `The acceleration of the ${selectedVehicle.name} is 0-60 mph in under 4 seconds.`,
        `The interior of the ${selectedVehicle.name} features premium materials and spacious seating for 5 adults.`
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full glass-card rounded-xl shadow-lg overflow-hidden border border-white/10 animate-fade-in">
      {/* Vehicle header */}
      <div className="bg-gradient-chat p-4 flex items-center space-x-3 border-b border-white/10">
        <div className="bg-gradient-to-br from-autoblue to-autoblue-dark rounded-full p-2">
          <Car className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-display font-medium">{selectedVehicle.name}</h3>
          <p className="text-gray-300 text-xs">{selectedVehicle.category}</p>
        </div>
      </div>
      
      {/* Messages container */}
      <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-md">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 p-3 max-w-[50%] glass-card rounded-2xl animate-pulse">
            <div className="w-2 h-2 rounded-full bg-autoblue"></div>
            <div className="w-2 h-2 rounded-full bg-autoblue/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-autoblue/40 animate-pulse"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* Input area */}
      <div className="border-t border-white/10 p-4 bg-black/50">
        <div className="flex items-center space-x-2 glass-card rounded-full p-1 pr-2">
          <Input
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 bg-transparent border-0 text-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-autoblue to-autoblue-dark hover:from-autoblue-dark hover:to-autoblue text-white rounded-full w-10 h-10 p-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
