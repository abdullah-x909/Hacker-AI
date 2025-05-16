import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface CommandInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (command: string) => void;
  isProcessing: boolean;
}

const CommandInput: React.FC<CommandInputProps> = ({ value, onChange, onSubmit, isProcessing }) => {
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing || !value.trim()) return;
    
    // Add to command history
    setCommandHistory(prev => [...prev, value]);
    
    // Reset history index
    setHistoryIndex(-1);
    
    // Submit the command
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;
    
    // Handle up arrow key for history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0 && newIndex < commandHistory.length) {
        onChange(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
    
    // Handle down arrow key for history navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        onChange(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        onChange('');
      }
    }
    
    // Handle tab key for auto-completion (placeholder)
    if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-completion logic would go here
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-800 p-3 bg-gray-900 flex items-center"
    >
      <div className="text-green-500 mr-2">
        <TerminalIcon size={16} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        className="flex-1 bg-transparent text-green-400 outline-none font-mono text-sm"
        placeholder={isProcessing ? "Processing..." : "Enter a command..."}
        autoComplete="off"
        spellCheck="false"
      />
    </form>
  );
};

export default CommandInput;