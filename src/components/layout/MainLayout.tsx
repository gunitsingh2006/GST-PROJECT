import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { AssistantSidebar } from '../ai-assistant/AssistantSidebar';
import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';

export const MainLayout: React.FC = () => {
  const { sidebarCollapsed, assistantOpen } = useAppStore();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 flex overflow-hidden">
          <main className={clsx(
            'flex-1 overflow-auto',
            assistantOpen ? 'mr-80' : ''
          )}>
            <div className="p-6">
              <Outlet />
            </div>
          </main>
          
          <AssistantSidebar />
        </div>
      </div>
    </div>
  );
};