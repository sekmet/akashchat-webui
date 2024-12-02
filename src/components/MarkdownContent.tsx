import React from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
  className?: string;
  preserveWhitespace?: boolean;
}

export default function MarkdownContent({ content, className = '', preserveWhitespace = false }: MarkdownContentProps) {
  // Configure marked options
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true, // Enable GitHub Flavored Markdown
    headerIds: false, // Disable header IDs to prevent conflicts
    mangle: false // Disable mangling to prevent escaping
  });

  const html = marked(content);

  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${preserveWhitespace ? 'whitespace-pre-wrap' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}