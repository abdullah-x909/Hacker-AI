import React from 'react';
import { User, Bot } from 'lucide-react';

interface CommandOutputProps {
  command: string;
  output: string;
  isAI: boolean;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ command, output, isAI }) => {
  // Function to add syntax highlighting to command outputs
  const formatOutput = (text: string) => {
    // Simple syntax highlighting, could be more sophisticated with a library
    return text.split('\n').map((line, i) => {
      if (line.startsWith('Error:')) {
        return <span key={i} className="text-red-400">{line}</span>;
      } else if (line.startsWith('Warning:')) {
        return <span key={i} className="text-yellow-400">{line}</span>;
      } else if (line.startsWith('Success:')) {
        return <span key={i} className="text-green-400">{line}</span>;
      } else if (line.includes('```')) {
        return <span key={i} className="text-purple-400">{line}</span>;
      } else {
        return <span key={i}>{line}</span>;
      }
    }).reduce((acc, curr, i, arr) => {
      return acc.concat(curr, i < arr.length - 1 ? <br key={`br-${i}`} /> : []);
    }, [] as React.ReactNode[]);
  };

  return (
    <div className="mb-4">
      {command && (
        <div className="flex items-start space-x-2 mb-1">
          <div className="mt-1 text-blue-500">
            <User size={14} />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">User:</div>
            <pre className="text-blue-400 font-mono whitespace-pre-wrap">{command}</pre>
          </div>
        </div>
      )}
      
      {output && (
        <div className="flex items-start space-x-2 mt-1">
          <div className="mt-1 text-green-500">
            <Bot size={14} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">{isAI ? 'AI Assistant:' : 'System:'}</div>
            <div className={`font-mono whitespace-pre-wrap ${isAI ? 'text-green-400' : 'text-gray-300'}`}>
              {formatOutput(output)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandOutput;