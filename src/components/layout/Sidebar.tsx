import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  GitCompare, 
  Users, 
  FileText,
  Settings,
  ChevronLeft
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Upload Data', href: '/upload', icon: Upload },
  { name: 'Match Results', href: '/match-results', icon: GitCompare },
  { name: 'Vendor Insights', href: '/vendor-insights', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  
  return (
    <div className={clsx(
      'bg-gray-900 text-white transition-all duration-300 flex flex-col',
      sidebarCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center justify-between p-4">
        {!sidebarCollapsed && (
          <h2 className="text-lg font-semibold">Navigation</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className={clsx(
            'w-4 h-4 transition-transform',
            sidebarCollapsed && 'rotate-180'
          )} />
        </button>
      </div>
      
      <nav className="flex-1 px-2 pb-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="ml-3">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className={clsx(
          'flex items-center',
          sidebarCollapsed ? 'justify-center' : 'space-x-3'
        )}>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">GS</span>
          </div>
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-medium">Gunit Singh</p>
              <p className="text-xs text-gray-400">Tax Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};