import React from 'react';
import { Menu, Bell, User, Bot } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const { toggleSidebar, toggleAssistant, sidebarCollapsed, assistantOpen } = useAppStore();
  
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GST</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              AI GST Reconciliation
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleAssistant}
            className={`p-2 rounded-md transition-colors ${
              assistantOpen 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bot className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};