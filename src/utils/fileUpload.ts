import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { useStore } from '../store/useStore';
import { setFileContent, clearFileContent } from './storage';

const UPLOAD_ENDPOINT = 'https://api.uploadthing.com/v6/uploadFiles';

// Set worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      try {
        let content = '';
        const result = e.target?.result;

        if (!result) {
          reject(new Error('Failed to read file'));
          return;
        }

        switch (fileType) {
          case 'application/pdf':
            const loadingTask = pdfjsLib.getDocument(result);
            const pdf = await loadingTask.promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
              fullText += pageText + '\n';
            }
            
            content = fullText;
            break;

          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            const { value } = await mammoth.extractRawText({ arrayBuffer: result as ArrayBuffer });
            content = value;
            break;

          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          case 'text/csv':
            const workbook = XLSX.read(result, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            content = XLSX.utils.sheet_to_csv(worksheet);
            break;

          case 'text/plain':
            content = result as string;
            break;

          default:
            reject(new Error('Unsupported file type'));
            return;
        }

        // Store the content in browser storage
        setFileContent(file.name, content);

        resolve(content);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (fileType === 'text/plain') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

export async function uploadFile(file: File): Promise<string> {
  const { settings } = useStore.getState();
  
  if (!settings.uploadthingToken) {
    throw new Error('File upload token not configured. Please add it in Settings.');
  }

  try {
    const response = await fetch(UPLOAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Uploadthing-Api-Key': settings.uploadthingToken
      },
      body: JSON.stringify({
        files: [{
          name: file.name,
          size: file.size,
          type: file.type
        }],
        //acl: 'public-read',
        //contentDisposition: 'inline'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Upload failed. Please try again.');
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No upload URL received');
    }
    
    // Parse and store file content before returning URL
    const content = await parseFile(file);
    setFileContent(file.name, content);
    
    return data.data[0].fileUrl;
  } catch (error) {
    console.error('Upload error:', error instanceof Error ? error.message : 'Unknown error');
    throw error instanceof Error ? error : new Error('Failed to upload file. Please try again.');
  }
}