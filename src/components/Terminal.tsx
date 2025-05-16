import React, { useState, useRef, useEffect } from 'react';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import CommandInput from './CommandInput';
import CommandOutput from './CommandOutput';
import { ArrowDownCircle } from 'lucide-react';

interface HistoryItem {
  id: number;
  command: string;
  output: string;
  isAI: boolean;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { 
      id: 0, 
      command: '', 
      output: "Welcome to HackerAI Terminal Assistant v1.0.0\nType 'help' to see available commands.", 
      isAI: true 
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { generateResponse } = useAIAssistant();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = async (command: string) => {
    if (!command.trim()) return;
    
    // Add the command to history
    const commandItem: HistoryItem = {
      id: history.length,
      command,
      output: '',
      isAI: false
    };
    
    setHistory(prev => [...prev, commandItem]);
    setCurrentCommand('');
    setIsProcessing(true);
    
    // Generate AI response
    try {
      const response = await generateResponse(command);
      
      const responseItem: HistoryItem = {
        id: history.length + 1,
        command: '',
        output: response,
        isAI: true
      };
      
      setHistory(prev => [...prev, responseItem]);
    } catch (error) {
      const errorItem: HistoryItem = {
        id: history.length + 1,
        command: '',
        output: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        isAI: true
      };
      
      setHistory(prev => [...prev, errorItem]);
    } finally {
      setIsProcessing(false);
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-gray-950 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
      >
        {history.map((item) => (
          <CommandOutput 
            key={item.id}
            command={item.command}
            output={item.output}
            isAI={item.isAI}
          />
        ))}
        {isProcessing && (
          <div className="text-green-400 flex items-center space-x-2 my-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>AI assistant is thinking...</span>
          </div>
        )}
      </div>
      
      {terminalRef.current && terminalRef.current.scrollHeight > terminalRef.current.clientHeight && (
        <button 
          onClick={scrollToBottom}
          className="absolute bottom-20 right-10 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
          title="Scroll to bottom"
        >
          <ArrowDownCircle size={16} />
        </button>
      )}
      
      <CommandInput 
        value={currentCommand}
        onChange={setCurrentCommand}
        onSubmit={handleCommandSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default Terminal;