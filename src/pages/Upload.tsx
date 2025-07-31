import React from 'react';
import { FileUploadCard } from '../components/uploads/FileUploadCard';
import { Button } from '../components/ui/Button';
import { useAppStore } from '../store/useAppStore';
import { PlayCircle, RotateCcw } from 'lucide-react';

export const Upload: React.FC = () => {
  const { uploadFiles, runReconciliation, isLoading } = useAppStore();
  
  const handleGSTRUpload = async (files: File[]) => {
    await uploadFiles(files);
  };
  
  const handlePurchaseUpload = async (files: File[]) => {
    await uploadFiles(files);
  };
  
  const handleVendorUpload = async (files: File[]) => {
    await uploadFiles(files);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Data</h1>
          <p className="text-gray-600">Upload your GST returns and purchase records for reconciliation</p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={runReconciliation}
            loading={isLoading}
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Run Reconciliation
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <FileUploadCard
          title="GSTR-2A Data"
          description="Upload your GSTR-2A JSON or Excel files from the GST portal"
          acceptedTypes={['.json', '.xlsx', '.csv']}
          onUpload={handleGSTRUpload}
          maxFiles={3}
        />
        
        <FileUploadCard
          title="Purchase Register"
          description="Upload your internal purchase register in Excel or CSV format"
          acceptedTypes={['.xlsx', '.csv', '.xls']}
          onUpload={handlePurchaseUpload}
          maxFiles={5}
        />
        
        <FileUploadCard
          title="Vendor Data"
          description="Upload additional vendor information and master data"
          acceptedTypes={['.xlsx', '.csv', '.json']}
          onUpload={handleVendorUpload}
          maxFiles={3}
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Upload Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure your GSTR-2A files are the latest versions from the GST portal</li>
              <li>• Purchase register should include GSTIN, invoice details, and tax amounts</li>
              <li>• Files should be in the standard format with proper column headers</li>
              <li>• Maximum file size is 50MB per file</li>
              <li>• All dates should be in DD/MM/YYYY format</li>
              <li>• Vendor GSTIN should be 15 characters in the correct format</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};