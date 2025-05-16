import React, { createContext, useContext, ReactNode, useState } from 'react';
import { processCommand } from '../utils/commands';

interface AIAssistantContextType {
  generateResponse: (command: string) => Promise<string>;
  isProcessing: boolean;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

interface AIAssistantProviderProps {
  children: ReactNode;
}

export const AIAssistantProvider: React.FC<AIAssistantProviderProps> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const generateResponse = async (command: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Add random delay to simulate AI thinking (250-1000ms)
      const thinkingTime = 250 + Math.random() * 750;
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      // Process the command and generate a response
      const response = processCommand(command);
      return response;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <AIAssistantContext.Provider value={{ generateResponse, isProcessing }}>
      {children}
    </AIAssistantContext.Provider>
  );
};