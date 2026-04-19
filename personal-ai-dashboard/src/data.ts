import { Goal, Habit, Note, Reminder, MoodEntry, AISummary } from './types';

export const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Run a Marathon',
    description: 'Complete a full marathon by end of year',
    progress: 45,
    target: 42,
    deadline: '2024-12-31',
    category: 'health',
    status: 'active',
  },
  {
    id: '2',
    title: 'Learn TypeScript',
    description: 'Master TypeScript for better code quality',
    progress: 70,
    target: 100,
    deadline: '2024-06-30',
    category: 'learning',
    status: 'active',
  },
  {
    id: '3',
    title: 'Save $10,000',
    description: 'Build emergency fund',
    progress: 6500,
    target: 10000,
    deadline: '2024-12-31',
    category: 'financial',
    status: 'active',
  },
];

export const initialHabits: Habit[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    streak: 12,
    completedToday: false,
    frequency: 'daily',
    category: 'mindfulness',
  },
  {
    id: '2',
    title: 'Exercise 30 min',
    streak: 5,
    completedToday: true,
    frequency: 'daily',
    category: 'health',
  },
  {
    id: '3',
    title: 'Read 20 pages',
    streak: 8,
    completedToday: false,
    frequency: 'daily',
    category: 'learning',
  },
  {
    id: '4',
    title: 'Weekly Review',
    streak: 3,
    completedToday: false,
    frequency: 'weekly',
    category: 'productivity',
  },
];

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Project Ideas',
    content: 'Build a personal AI dashboard, create a habit tracker app, develop a meditation timer...',
    tags: ['ideas', 'projects'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Book Recommendations',
    content: 'Atomic Habits, Deep Work, The Pragmatic Programmer, Clean Code...',
    tags: ['books', 'learning'],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Meeting Notes - Q1 Planning',
    content: 'Key objectives for Q1: Launch new feature, improve performance, hire 2 developers...',
    tags: ['work', 'meetings'],
    createdAt: '2024-01-05T15:00:00Z',
    updatedAt: '2024-01-05T16:00:00Z',
    isPinned: false,
  },
];

export const initialReminders: Reminder[] = [
  {
    id: '1',
    title: 'Team Standup',
    time: '09:00',
    date: '2024-01-22',
    isCompleted: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Gym Session',
    time: '18:00',
    date: '2024-01-22',
    isCompleted: false,
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Call Mom',
    time: '20:00',
    date: '2024-01-22',
    isCompleted: false,
    priority: 'high',
  },
];

export const initialMoodEntries: MoodEntry[] = [
  {
    id: '1',
    mood: 'good',
    note: 'Productive day, completed most tasks',
    timestamp: '2024-01-21T20:00:00Z',
    energyLevel: 7,
  },
  {
    id: '2',
    mood: 'excellent',
    note: 'Great workout and finished the project!',
    timestamp: '2024-01-20T20:00:00Z',
    energyLevel: 9,
  },
  {
    id: '3',
    mood: 'neutral',
    note: 'Average day, nothing special',
    timestamp: '2024-01-19T20:00:00Z',
    energyLevel: 5,
  },
];

export const aiSummary: AISummary = {
  dailyInsight: "You're on a 5-day exercise streak! Your productivity peaks in the morning hours. Consider scheduling important tasks before noon.",
  weeklyTrend: "This week shows 15% improvement in habit consistency compared to last week. Your mood correlates strongly with exercise completion.",
  suggestions: [
    "Try completing your morning meditation before checking your phone",
    "Schedule a rest day after 3 consecutive workout days",
    "Your reading habit is slipping - try audiobooks during commute",
  ],
  focusArea: "Mindfulness & Consistency",
};
