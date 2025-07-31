import React from 'react';
import { Calendar, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const timelineEvents = [
  {
    id: '1',
    date: '2024-05-15',
    type: 'transaction',
    title: 'Large Transaction Alert',
    description: 'Acme Corp Ltd submitted invoice worth ₹5,50,000 - 40% above average',
    icon: TrendingUp,
    color: 'blue'
  },
  {
    id: '2',
    date: '2024-05-12',
    type: 'risk',
    title: 'Risk Score Increased',
    description: 'Tech Solutions Pvt Ltd risk score increased from 5.2 to 6.7',
    icon: AlertCircle,
    color: 'yellow'
  },
  {
    id: '3',
    date: '2024-05-10',
    type: 'compliance',
    title: 'Compliance Issue Resolved',
    description: 'Global Enterprises resolved GSTIN validation issue',
    icon: Calendar,
    color: 'green'
  },
  {
    id: '4',
    date: '2024-05-08',
    type: 'transaction',
    title: 'Transaction Volume Drop',
    description: 'Metro Industries showing 25% decrease in monthly transactions',
    icon: TrendingDown,
    color: 'red'
  }
];

export const VendorTimeline: React.FC = () => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Vendor Activity Timeline</h3>
        <p className="text-sm text-gray-600">Recent vendor-related events and changes</p>
      </div>
      
      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          
          return (
            <div key={event.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg border flex-shrink-0 ${getColorClasses(event.color)}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              </div>
              
              {index < timelineEvents.length - 1 && (
                <div className="absolute left-6 mt-10 w-px h-8 bg-gray-200" 
                     style={{ marginLeft: '1.125rem' }} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Complete Timeline
        </button>
      </div>
    </div>
  );
};