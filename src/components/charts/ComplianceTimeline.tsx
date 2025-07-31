import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ComplianceData {
  month: string;
  complianceScore: number;
  matchingAccuracy: number;
  filingStatus: number;
}

interface ComplianceTimelineProps {
  data: ComplianceData[];
}

export const ComplianceTimeline: React.FC<ComplianceTimelineProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Timeline</h3>
        <p className="text-sm text-gray-600">Monthly compliance metrics and trends</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value}%`, name]}
              labelStyle={{ color: '#374151' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="complianceScore"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#complianceGradient)"
              name="Compliance Score"
            />
            <Area
              type="monotone"
              dataKey="matchingAccuracy"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#accuracyGradient)"
              name="Matching Accuracy"
            />
            <Line
              type="monotone"
              dataKey="filingStatus"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              name="Filing Status"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};