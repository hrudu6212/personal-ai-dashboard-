export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: 'health' | 'career' | 'learning' | 'personal' | 'financial';
  status: 'active' | 'completed' | 'paused';
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  completedToday: boolean;
  frequency: 'daily' | 'weekly';
  category: 'health' | 'productivity' | 'mindfulness' | 'learning';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface MoodEntry {
  id: string;
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  note: string;
  timestamp: string;
  energyLevel: number;
}

export interface AISummary {
  dailyInsight: string;
  weeklyTrend: string;
  suggestions: string[];
  focusArea: string;
}
