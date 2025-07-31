import React from 'react';
import { VendorSearch } from '../components/vendor-insights/VendorSearch';
import { RiskBadge } from '../components/vendor-insights/RiskBadge';
import { VendorTimeline } from '../components/vendor-insights/VendorTimeline';

// Mock vendor data
const mockVendors = [
  {
    id: '1',
    gstin: '27AAACG1234Q1Z5',
    vendorName: 'Acme Corp Ltd',
    totalTransactions: 45,
    totalValue: 2500000,
    riskScore: 2.3,
    riskLevel: 'low' as const,
    lastTransactionDate: '2024-05-15',
    complianceRating: 95
  },
  {
    id: '2',
    gstin: '06BBCDE5678R2A6',
    vendorName: 'Tech Solutions Pvt Ltd',
    totalTransactions: 32,
    totalValue: 1800000,
    riskScore: 6.7,
    riskLevel: 'medium' as const,
    lastTransactionDate: '2024-05-12',
    complianceRating: 78
  },
  {
    id: '3',
    gstin: '29XYZAB9876S3B7',
    vendorName: 'Global Enterprises',
    totalTransactions: 28,
    totalValue: 1200000,
    riskScore: 8.9,
    riskLevel: 'high' as const,
    lastTransactionDate: '2024-04-28',
    complianceRating: 65
  }
];

export const VendorInsights: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Insights</h1>
        <p className="text-gray-600">Analyze vendor performance and risk assessments</p>
      </div>
      
      <VendorSearch />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{vendor.vendorName}</h3>
                <p className="text-sm text-gray-600">{vendor.gstin}</p>
              </div>
              <RiskBadge level={vendor.riskLevel} score={vendor.riskScore} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Value</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(vendor.totalValue)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Transactions</span>
                <span className="font-semibold text-gray-900">
                  {vendor.totalTransactions}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Compliance Rating</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${vendor.complianceRating}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {vendor.complianceRating}%
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Transaction</span>
                <span className="text-sm text-gray-900">
                  {new Date(vendor.lastTransactionDate).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Detailed Timeline
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <VendorTimeline />
    </div>
  );
};