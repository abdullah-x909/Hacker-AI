import React from 'react';
import Terminal from './components/Terminal';
import { AIAssistantProvider } from './contexts/AIAssistantContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <AIAssistantProvider>
        <div className="w-full max-w-4xl h-[80vh] bg-gray-950 rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 p-2 flex items-center border-b border-gray-800">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono">Terminal - AI Assistant</div>
          </div>
          <Terminal />
        </div>
      </AIAssistantProvider>
    </div>
  );
}

export default App;