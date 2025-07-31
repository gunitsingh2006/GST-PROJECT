import React, { useState } from 'react';
import { MatchResultsTable } from '../components/match-results/MatchResultsTable';
import { TableFilters } from '../components/match-results/TableFilters';
import { ExportButtons } from '../components/match-results/ExportButtons';
import { useAppStore } from '../store/useAppStore';

export const MatchResults: React.FC = () => {
  const { gstRecords } = useAppStore();
  const [filteredRecords, setFilteredRecords] = useState(gstRecords);
  
  const handleFilterChange = (filters: any) => {
    let filtered = [...gstRecords];
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(record => record.status === filters.status);
    }
    
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      filtered = filtered.filter(record => record.riskLevel === filters.riskLevel);
    }
    
    if (filters.dateRange) {
      // Apply date filtering logic here
    }
    
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(record => 
        record.vendorName.toLowerCase().includes(searchTerm) ||
        record.gstin.toLowerCase().includes(searchTerm) ||
        record.invoiceNumber.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredRecords(filtered);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Match Results</h1>
          <p className="text-gray-600">Review reconciliation results and resolve discrepancies</p>
        </div>
        
        <ExportButtons data={filteredRecords} />
      </div>
      
      <TableFilters onFilterChange={handleFilterChange} />
      
      <MatchResultsTable data={filteredRecords} />
    </div>
  );
};