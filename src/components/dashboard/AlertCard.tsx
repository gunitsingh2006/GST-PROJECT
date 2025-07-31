import React from 'react';
import { AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { clsx } from 'clsx';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  dismissible?: boolean;
}

interface AlertCardProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alerts, onDismiss }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertTriangle;
      default:
        return Clock;
    }
  };
  
  const getAlertClasses = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {alerts.length} active
        </span>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div
              key={alert.id}
              className={clsx(
                'p-3 rounded-lg border',
                getAlertClasses(alert.type)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                    <p className="text-xs mt-2 opacity-75">{alert.timestamp}</p>
                  </div>
                </div>
                {alert.dismissible && onDismiss && (
                  <button
                    onClick={() => onDismiss(alert.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};