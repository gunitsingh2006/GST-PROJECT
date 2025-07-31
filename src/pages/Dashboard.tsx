import React from 'react';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { AlertCard } from '../components/dashboard/AlertCard';
import { DeadlineReminder } from '../components/dashboard/DeadlineReminder';
import { ITCBarChart } from '../components/charts/ITCBarChart';
import { VendorPieChart } from '../components/charts/VendorPieChart';
import { ComplianceTimeline } from '../components/charts/ComplianceTimeline';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  IndianRupee, 
  Users,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const mockITCData = [
  { month: 'Jan', claimed: 120000, available: 150000, reversed: 10000 },
  { month: 'Feb', claimed: 140000, available: 160000, reversed: 15000 },
  { month: 'Mar', claimed: 135000, available: 170000, reversed: 12000 },
  { month: 'Apr', claimed: 155000, available: 180000, reversed: 8000 },
  { month: 'May', claimed: 165000, available: 190000, reversed: 20000 },
  { month: 'Jun', claimed: 175000, available: 200000, reversed: 18000 },
];

const mockVendorData = [
  { name: 'Acme Corp Ltd', value: 2500000, count: 45 },
  { name: 'Tech Solutions', value: 1800000, count: 32 },
  { name: 'Global Enterprises', value: 1200000, count: 28 },
  { name: 'Metro Industries', value: 950000, count: 21 },
  { name: 'Others', value: 1550000, count: 78 },
];

const mockComplianceData = [
  { month: 'Jan', complianceScore: 85, matchingAccuracy: 78, filingStatus: 95 },
  { month: 'Feb', complianceScore: 88, matchingAccuracy: 82, filingStatus: 98 },
  { month: 'Mar', complianceScore: 91, matchingAccuracy: 85, filingStatus: 92 },
  { month: 'Apr', complianceScore: 89, matchingAccuracy: 88, filingStatus: 96 },
  { month: 'May', complianceScore: 93, matchingAccuracy: 91, filingStatus: 100 },
  { month: 'Jun', complianceScore: 95, matchingAccuracy: 93, filingStatus: 98 },
];

const mockAlerts = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'GSTR-3B Filing Due',
    message: 'Your GSTR-3B filing is due in 2 days. Please ensure all reconciliations are complete.',
    timestamp: '2 hours ago',
    dismissible: true
  },
  {
    id: '2',
    type: 'error' as const,
    title: 'High Risk Vendor Alert',
    message: 'Vendor ABC Corp has a risk score of 8.5. Review their recent transactions.',
    timestamp: '4 hours ago',
    dismissible: true
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Reconciliation Complete',
    message: 'Successfully matched 45 out of 50 invoices for May 2024.',
    timestamp: '1 day ago',
    dismissible: true
  }
];

const mockDeadlines = [
  {
    id: '1',
    title: 'GSTR-3B Filing',
    description: 'Monthly return filing for May 2024',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    priority: 'high' as const,
    status: 'pending' as const
  },
  {
    id: '2',
    title: 'GSTR-1 Filing',
    description: 'Outward supplies return for May 2024',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: 'medium' as const,
    status: 'pending' as const
  },
  {
    id: '3',
    title: 'ITC Reconciliation',
    description: 'Quarterly ITC reconciliation report',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    priority: 'medium' as const,
    status: 'pending' as const
  }
];

export const Dashboard: React.FC = () => {
  const { dashboardMetrics } = useAppStore();
  
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your GST reconciliation status</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <SummaryCard
          title="Total Invoices"
          value={dashboardMetrics.totalInvoices.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          color="blue"
        />
        <SummaryCard
          title="Matched"
          value={dashboardMetrics.matchedInvoices.toLocaleString()}
          change={`${Math.round((dashboardMetrics.matchedInvoices / dashboardMetrics.totalInvoices) * 100)}% match rate`}
          changeType="positive"
          icon={CheckCircle}
          color="green"
        />
        <SummaryCard
          title="Unmatched"
          value={dashboardMetrics.unmatchedInvoices.toLocaleString()}
          change="Needs attention"
          changeType="negative"
          icon={AlertTriangle}
          color="red"
        />
        <SummaryCard
          title="Total ITC"
          value={formatCurrency(dashboardMetrics.totalITC)}
          change="+8% from last month"
          changeType="positive"
          icon={IndianRupee}
          color="purple"
        />
        <SummaryCard
          title="Risk Invoices"
          value={dashboardMetrics.riskInvoices.toLocaleString()}
          change="Review required"
          changeType="neutral"
          icon={Users}
          color="yellow"
        />
        <SummaryCard
          title="Compliance Score"
          value={`${dashboardMetrics.complianceScore}%`}
          change="+5% improvement"
          changeType="positive"
          icon={TrendingUp}
          color="green"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ITCBarChart data={mockITCData} />
        <VendorPieChart data={mockVendorData} />
      </div>
      
      {/* Compliance Timeline */}
      <ComplianceTimeline data={mockComplianceData} />
      
      {/* Alerts and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard alerts={mockAlerts} />
        <DeadlineReminder deadlines={mockDeadlines} />
      </div>
    </div>
  );
};