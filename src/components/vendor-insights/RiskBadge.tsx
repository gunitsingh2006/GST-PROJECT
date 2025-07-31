import React from 'react';
import { AlertTriangle, Shield, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  score: number;
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  score, 
  showScore = true 
}) => {
  const getRiskConfig = () => {
    switch (level) {
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'bg-red-100 text-red-800 border-red-200',
          textColor: 'text-red-600'
        };
      case 'medium':
        return {
          icon: ShieldAlert,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          textColor: 'text-yellow-600'
        };
      default:
        return {
          icon: Shield,
          color: 'bg-green-100 text-green-800 border-green-200',
          textColor: 'text-green-600'
        };
    }
  };
  
  const config = getRiskConfig();
  const Icon = config.icon;
  
  return (
    <div className={clsx(
      'inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium',
      config.color
    )}>
      <Icon className="w-3 h-3" />
      <span className="capitalize">{level}</span>
      {showScore && (
        <span className="ml-1">({score.toFixed(1)})</span>
      )}
    </div>
  );
};