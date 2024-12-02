import { useStore } from '../store/useStore';
import { tavily as TavilyClient } from '@tavily/core';

export async function searchWeb(query: string): Promise<string> {
  const { settings } = useStore.getState();
  
  if (!settings.tavilyApiKey) {
    throw new Error('Tavily API key not configured. Please add it in Settings.');
  }

  const tavilyClient = new TavilyClient({ apiKey: settings.tavilyApiKey });

  try {
    const response = await tavilyClient.search(query, {
      searchDepth: "advanced",
      maxResults: 6,
      includeAnswer: true
    });

    if (!response?.results?.length) {
      return '';
    }

    const results = response.results
      .map(result => result.content ? `- ${result.content.slice(0, 200)}...\n  [Source: ${result.title}](${result.url})` : '')
      .filter(Boolean)
      .join('\n\n');

    return results ? `${results}\n\n` : '';
  } catch (error) {
    console.error('Web search failed:', error);
    return '';
  }
}