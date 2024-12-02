// Maximum size for stored content (5MB)
const MAX_STORAGE_SIZE = 5 * 1024 * 1024;

export function setFileContent(fileName: string, content: string): void {
  try {
    // Check content size
    const contentSize = new Blob([content]).size;
    if (contentSize > MAX_STORAGE_SIZE) {
      throw new Error('File content too large for temporary storage');
    }

    // Store with timestamp for cleanup
    const fileData = {
      content,
      timestamp: Date.now(),
    };

    localStorage.setItem(`file_content_${fileName}`, JSON.stringify(fileData));
  } catch (error) {
    console.error('Failed to store file content:', error);
    throw error;
  }
}

export function getFileContent(fileName: string): string | null {
  try {
    const fileDataStr = localStorage.getItem(`file_content_${fileName}`);
    if (!fileDataStr) return null;

    const fileData = JSON.parse(fileDataStr);
    
    // Remove content older than 1 hour
    if (Date.now() - fileData.timestamp > 3600000) {
      clearFileContent(fileName);
      return null;
    }

    return fileData.content;
  } catch (error) {
    console.error('Failed to retrieve file content:', error);
    return null;
  }
}

export function clearFileContent(fileName: string): void {
  localStorage.removeItem(`file_content_${fileName}`);
}

// Cleanup old file contents
export function cleanupOldFileContents(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('file_content_')) {
      try {
        const fileData = JSON.parse(localStorage.getItem(key)!);
        if (Date.now() - fileData.timestamp > 3600000) {
          localStorage.removeItem(key);
        }
      } catch (error) {
        // Remove invalid entries
        localStorage.removeItem(key);
      }
    }
  });
}