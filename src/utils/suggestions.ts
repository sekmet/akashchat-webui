interface Suggestion {
  title: string;
  description: string;
  category: 'productivity' | 'learning' | 'creativity' | 'technology' | 'lifestyle';
}

export const suggestions: Suggestion[] = [
  {
    title: 'Help me study',
    description: 'Create a study plan for vocabulary in a college entrance exam',
    category: 'learning'
  },
  {
    title: 'Creative writing',
    description: 'Help me write a short story about a time traveler who can only go 24 hours into the future',
    category: 'creativity'
  },
  {
    title: 'Code review',
    description: 'Review my React component and suggest improvements for performance and readability',
    category: 'technology'
  },
  {
    title: 'Meal planning',
    description: 'Create a weekly meal plan focusing on Mediterranean cuisine with shopping list',
    category: 'lifestyle'
  },
  {
    title: 'Learn a concept',
    description: 'Explain quantum computing in simple terms using everyday analogies',
    category: 'learning'
  },
  {
    title: 'Career advice',
    description: 'Help me prepare for a software developer interview at a tech company',
    category: 'productivity'
  },
  {
    title: 'Travel planning',
    description: 'Create a 5-day itinerary for a trip to Tokyo, including must-see spots and local cuisine',
    category: 'lifestyle'
  },
  {
    title: 'Debug code',
    description: 'Help me understand and fix common React hooks exhaustive deps warnings',
    category: 'technology'
  },
  {
    title: 'Write poetry',
    description: 'Help me write a haiku about the changing seasons',
    category: 'creativity'
  },
  {
    title: 'Fitness routine',
    description: 'Design a home workout routine using only bodyweight exercises',
    category: 'lifestyle'
  },
  {
    title: 'Learn language',
    description: 'Teach me common Spanish phrases for ordering food at a restaurant',
    category: 'learning'
  },
  {
    title: 'Project ideas',
    description: 'Suggest creative weekend DIY projects using recycled materials',
    category: 'creativity'
  },
  {
    title: 'Productivity tips',
    description: 'Share effective time management techniques for remote work',
    category: 'productivity'
  },
  {
    title: 'Tech explanation',
    description: 'Explain how blockchain technology works using simple analogies',
    category: 'technology'
  },
  {
    title: 'Mental health',
    description: 'Suggest mindfulness exercises for reducing work-related stress',
    category: 'lifestyle'
  },
  {
    title: 'Book summary',
    description: 'Summarize the key concepts from "Atomic Habits" by James Clear',
    category: 'learning'
  },
  {
    title: 'Design feedback',
    description: 'Review my website design and suggest improvements for better UX',
    category: 'technology'
  },
  {
    title: 'Writing help',
    description: 'Help me write a compelling professional bio for my portfolio',
    category: 'productivity'
  },
  {
    title: 'Recipe creation',
    description: 'Create a healthy smoothie recipe using seasonal ingredients',
    category: 'lifestyle'
  },
  {
    title: 'Learn history',
    description: 'Explain the most significant technological advances of the 20th century',
    category: 'learning'
  }
];

export function getRandomSuggestions(count: number = 4): Suggestion[] {
  const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}