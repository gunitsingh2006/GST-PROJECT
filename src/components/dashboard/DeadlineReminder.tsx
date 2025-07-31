import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
}

interface DeadlineReminderProps {
  deadlines: Deadline[];
}

export const DeadlineReminder: React.FC<DeadlineReminderProps> = ({ deadlines }) => {
  const getPriorityColor = (priority: Deadline['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  const getDaysRemaining = (dueDate: Date) => {
    const days = differenceInDays(dueDate, new Date());
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {deadlines.slice(0, 4).map((deadline) => {
          const daysRemaining = getDaysRemaining(deadline.dueDate);
          const isOverdue = differenceInDays(deadline.dueDate, new Date()) < 0;
          
          return (
            <div
              key={deadline.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{format(deadline.dueDate, 'MMM dd, yyyy')}</span>
                    <span className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                      <Clock className="w-3 h-3" />
                      <span>{daysRemaining}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};