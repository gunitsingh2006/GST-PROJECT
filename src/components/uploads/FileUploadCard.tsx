import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { UploadSpinner } from './UploadSpinner';
import { clsx } from 'clsx';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
}

interface FileUploadCardProps {
  title: string;
  description: string;
  acceptedTypes: string[];
  onUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  acceptedTypes,
  onUpload,
  maxFiles = 5
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).slice(0, maxFiles);
    await processFiles(files);
  }, [maxFiles]);
  
  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, maxFiles);
    await processFiles(files);
  }, [maxFiles]);
  
  const processFiles = async (files: File[]) => {
    setIsUploading(true);
    
    const newFiles: UploadedFile[] = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    try {
      await onUpload(files);
      
      setUploadedFiles(prev => 
        prev.map(file => 
          newFiles.some(nf => nf.name === file.name) 
            ? { ...file, status: 'success', progress: 100 }
            : file
        )
      );
    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(file => 
          newFiles.some(nf => nf.name === file.name) 
            ? { ...file, status: 'error' }
            : file
        )
      );
    } finally {
      setIsUploading(false);
    }
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <div
        className={clsx(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Supported formats: {acceptedTypes.join(', ')}
        </p>
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          id={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <Button
          as="label"
          htmlFor={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`}
          variant="outline"
          className="cursor-pointer"
        >
          Choose Files
        </Button>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <UploadSpinner size="sm" />
                  )}
                  {file.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  
                  <button
                    onClick={() => removeFile(file.name)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className="mt-6 flex items-center justify-center">
          <UploadSpinner />
          <span className="ml-2 text-sm text-gray-600">Processing files...</span>
        </div>
      )}
    </div>
  );
};