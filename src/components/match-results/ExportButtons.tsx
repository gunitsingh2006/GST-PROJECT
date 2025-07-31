import React from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../ui/Button';
import { GSTRecord } from '../../store/useAppStore';

interface ExportButtonsProps {
  data: GSTRecord[];
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  const exportToCSV = () => {
    const headers = [
      'Vendor Name',
      'GSTIN',
      'Invoice Number',
      'Invoice Date',
      'Taxable Value',
      'IGST',
      'CGST',
      'SGST',
      'Total Tax',
      'Total Value',
      'Status',
      'Risk Level'
    ];
    
    const csvContent = [
      headers.join(','),
      ...data.map(record => [
        record.vendorName,
        record.gstin,
        record.invoiceNumber,
        record.invoiceDate,
        record.taxableValue,
        record.igst,
        record.cgst,
        record.sgst,
        record.totalTax,
        record.totalValue,
        record.status,
        record.riskLevel
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gst-reconciliation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const exportToPDF = () => {
    // In a real implementation, you would use a library like jsPDF
    console.log('Exporting to PDF...', data);
  };
  
  const exportToExcel = () => {
    // In a real implementation, you would use a library like xlsx
    console.log('Exporting to Excel...', data);
  };
  
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
      >
        <Download className="w-4 h-4 mr-2" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToExcel}
      >
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Excel
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToPDF}
      >
        <FileText className="w-4 h-4 mr-2" />
        PDF
      </Button>
    </div>
  );
};