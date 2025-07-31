import React, { useState } from 'react';
import { X, Send, Bot, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';

const suggestions = [
  {
    icon: Lightbulb,
    title: 'Optimization Tip',
    message: 'You have 12 vendors with high risk scores. Consider reviewing their compliance history.',
    type: 'info'
  },
  {
    icon: AlertTriangle,
    title: 'Compliance Alert',
    message: 'GSTR-3B filing deadline is in 3 days. Ensure all reconciliations are complete.',
    type: 'warning'
  },
  {
    icon: TrendingUp,
    title: 'Insight',
    message: 'Your matching accuracy has improved by 15% this month. Great progress!',
    type: 'success'
  }
];

export const AssistantSidebar: React.FC = () => {
  const { assistantOpen, toggleAssistant } = useAppStore();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI GST assistant. I can help you with reconciliation insights, compliance queries, and data analysis. What would you like to know?'
    }
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newConversation = [
      ...conversation,
      { role: 'user' as const, content: message },
      { 
        role: 'assistant' as const, 
        content: 'I understand your query about GST reconciliation. Based on your current data, here are some insights and recommendations...' 
      }
    ];
    
    setConversation(newConversation);
    setMessage('');
  };
  
  if (!assistantOpen) return null;
  
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
        </div>
        <button
          onClick={toggleAssistant}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Quick Insights</h4>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={clsx(
                'p-3 rounded-lg border-l-4 text-sm',
                suggestion.type === 'info' && 'bg-blue-50 border-blue-400',
                suggestion.type === 'warning' && 'bg-yellow-50 border-yellow-400',
                suggestion.type === 'success' && 'bg-green-50 border-green-400'
              )}
            >
              <div className="flex items-start space-x-2">
                <suggestion.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-gray-600 mt-1">{suggestion.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Conversation</h4>
          <div className="space-y-3">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={clsx(
                  'p-3 rounded-lg text-sm',
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white ml-4' 
                    : 'bg-gray-100 text-gray-900 mr-4'
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about GST compliance..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};