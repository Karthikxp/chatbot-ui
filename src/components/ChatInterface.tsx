
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Car } from "lucide-react";
import MessageBubble from './MessageBubble';

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
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Vehicle header */}
      <div className="bg-autodark p-4 flex items-center space-x-3">
        <div className="bg-autoblue rounded-full p-2">
          <Car className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-medium">{selectedVehicle.name}</h3>
          <p className="text-gray-300 text-xs">{selectedVehicle.category}</p>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 p-3 max-w-[50%] rounded-2xl bg-gray-100 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t p-3 flex items-center space-x-2">
        <Input
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!inputValue.trim() || isLoading}
          className="bg-autoblue hover:bg-autoblue-dark"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
