import { create } from 'zustand';

export interface GSTRecord {
  id: string;
  gstin: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalTax: number;
  totalValue: number;
  status: 'matched' | 'unmatched' | 'disputed' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface VendorInsight {
  gstin: string;
  vendorName: string;
  totalTransactions: number;
  totalValue: number;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastTransactionDate: string;
  complianceRating: number;
}

export interface DashboardMetrics {
  totalInvoices: number;
  matchedInvoices: number;
  unmatchedInvoices: number;
  totalITC: number;
  riskInvoices: number;
  complianceScore: number;
}

interface AppState {
  // Data
  gstRecords: GSTRecord[];
  vendorInsights: VendorInsight[];
  dashboardMetrics: DashboardMetrics;
  
  // UI State
  isLoading: boolean;
  currentPage: string;
  sidebarCollapsed: boolean;
  assistantOpen: boolean;
  
  // Actions
  setGSTRecords: (records: GSTRecord[]) => void;
  setVendorInsights: (insights: VendorInsight[]) => void;
  setDashboardMetrics: (metrics: DashboardMetrics) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: string) => void;
  toggleSidebar: () => void;
  toggleAssistant: () => void;
  
  // File Upload
  uploadFiles: (files: File[]) => Promise<void>;
  
  // Reconciliation
  runReconciliation: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  gstRecords: [],
  vendorInsights: [],
  dashboardMetrics: {
    totalInvoices: 0,
    matchedInvoices: 0,
    unmatchedInvoices: 0,
    totalITC: 0,
    riskInvoices: 0,
    complianceScore: 0,
  },
  isLoading: false,
  currentPage: 'dashboard',
  sidebarCollapsed: false,
  assistantOpen: false,
  
  // Actions
  setGSTRecords: (records) => set({ gstRecords: records }),
  setVendorInsights: (insights) => set({ vendorInsights: insights }),
  setDashboardMetrics: (metrics) => set({ dashboardMetrics: metrics }),
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleAssistant: () => set((state) => ({ assistantOpen: !state.assistantOpen })),
  
  uploadFiles: async (files) => {
    set({ isLoading: true });
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample data based on uploaded files
    const sampleRecords: GSTRecord[] = Array.from({ length: 50 }, (_, i) => ({
      id: `rec-${i + 1}`,
      gstin: `${Math.random().toString(36).substr(2, 2).toUpperCase()}AAACG${Math.floor(Math.random() * 9000) + 1000}Q1Z5`,
      vendorName: [
        'Acme Corp Ltd', 'Tech Solutions Pvt Ltd', 'Global Enterprises', 
        'Metro Industries', 'Prime Logistics', 'Smart Systems Ltd',
        'Digital Services Inc', 'Manufacturing Co', 'Export House Ltd'
      ][Math.floor(Math.random() * 9)],
      invoiceNumber: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
      invoiceDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      taxableValue: Math.floor(Math.random() * 100000) + 10000,
      igst: Math.random() > 0.5 ? Math.floor(Math.random() * 18000) + 1800 : 0,
      cgst: Math.random() > 0.5 ? Math.floor(Math.random() * 9000) + 900 : 0,
      sgst: Math.random() > 0.5 ? Math.floor(Math.random() * 9000) + 900 : 0,
      totalTax: 0,
      totalValue: 0,
      status: ['matched', 'unmatched', 'disputed', 'pending'][Math.floor(Math.random() * 4)] as any,
      riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
    }));
    
    // Calculate totals
    sampleRecords.forEach(record => {
      record.totalTax = record.igst + record.cgst + record.sgst;
      record.totalValue = record.taxableValue + record.totalTax;
    });
    
    const matched = sampleRecords.filter(r => r.status === 'matched').length;
    const unmatched = sampleRecords.filter(r => r.status === 'unmatched').length;
    const riskInvoices = sampleRecords.filter(r => r.riskLevel === 'high').length;
    const totalITC = sampleRecords.reduce((sum, r) => sum + r.totalTax, 0);
    
    set({
      gstRecords: sampleRecords,
      dashboardMetrics: {
        totalInvoices: sampleRecords.length,
        matchedInvoices: matched,
        unmatchedInvoices: unmatched,
        totalITC,
        riskInvoices,
        complianceScore: Math.floor((matched / sampleRecords.length) * 100),
      },
      isLoading: false,
    });
  },
  
  runReconciliation: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update reconciliation results
    const { gstRecords } = get();
    const updatedRecords = gstRecords.map(record => ({
      ...record,
      status: Math.random() > 0.3 ? 'matched' : record.status,
    }));
    
    set({ gstRecords: updatedRecords, isLoading: false });
  },
}));