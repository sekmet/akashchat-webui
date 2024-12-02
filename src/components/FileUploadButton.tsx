import React from 'react';
import { FileUp } from 'lucide-react';
import { uploadFile } from '../utils/fileUpload';
import { useStore } from '../store/useStore';
import type { Message } from '../types';

interface FileUploadButtonProps {
  onUpload: (message: Message) => void;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/plain'
];

export default function FileUploadButton({ onUpload }: FileUploadButtonProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Unsupported file type. Please upload PDF, DOC, DOCX, XLS, CSV, or TXT files.');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      if (!url) {
        throw new Error('Failed to get upload URL');
      }

      const message: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: `[File uploaded: [${file.name}](${url})]`,
        timestamp: new Date(),
        fileType: file.type,
        fileName: file.name,
        fileUrl: url
      };

      onUpload(message);
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload file. Please try again.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <FileUp 
          size={20} 
          className={`text-gray-500 dark:text-gray-400 ${isUploading ? 'animate-pulse' : ''}`} 
        />
      </button>
    </>
  );
}