import { useState } from 'react';
import { 
  Target, 
  CheckSquare, 
  StickyNote, 
  Bell, 
  Smile, 
  Brain, 
  TrendingUp,
  Flame,
  Calendar,
  Plus,
  ChevronRight,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Goal,
  Habit,
  Note,
  Reminder,
  MoodEntry,
} from './types';
import {
  initialGoals,
  initialHabits,
  initialNotes,
  initialReminders,
  initialMoodEntries,
  aiSummary,
} from './data';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const moodEmojis = {
  excellent: '🤩',
  good: '😊',
  neutral: '😐',
  bad: '😔',
  terrible: '😫',
};

const categoryColors = {
  health: 'bg-green-500',
  career: 'bg-blue-500',
  learning: 'bg-purple-500',
  personal: 'bg-pink-500',
  financial: 'bg-yellow-500',
  productivity: 'bg-indigo-500',
  mindfulness: 'bg-teal-500',
};

export default function App() {
  const [goals] = useState<Goal[]>(initialGoals);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [notes] = useState<Note[]>(initialNotes);
  const [reminders] = useState<Reminder[]>(initialReminders);
  const [moodEntries] = useState<MoodEntry[]>(initialMoodEntries);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'habits' | 'notes'>('overview');

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(h => 
      h.id === habitId 
        ? { ...h, completedToday: !h.completedToday, streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1) }
        : h
    ));
  };

  const completedHabitsCount = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const activeGoals = goals.filter(g => g.status === 'active');
  const averageProgress = activeGoals.reduce((acc, g) => acc + g.progress, 0) / activeGoals.length || 0;

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI Summary Card */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6" />
          <h2 className="text-xl font-bold">AI Daily Brief</h2>
        </div>
        <p className="mb-4 opacity-90">{aiSummary.dailyInsight}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <TrendingUp className="w-5 h-5 mb-2 opacity-70" />
            <p className="text-sm opacity-70">Weekly Trend</p>
            <p className="font-medium">{aiSummary.weeklyTrend}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
            <Award className="w-5 h-5 mb-2 opacity-70" />
            <p className="text-sm opacity-70">Focus Area</p>
            <p className="font-medium">{aiSummary.focusArea}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm opacity-70 mb-2">Smart Suggestions</p>
          <ul className="space-y-2">
            {aiSummary.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <Target className="w-5 h-5 text-blue-500 mb-2" />
          <p className="text-2xl font-bold">{activeGoals.length}</p>
          <p className="text-sm text-gray-500">Active Goals</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <Flame className="w-5 h-5 text-orange-500 mb-2" />
          <p className="text-2xl font-bold">{Math.max(...habits.map(h => h.streak))}</p>
          <p className="text-sm text-gray-500">Best Streak</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <CheckSquare className="w-5 h-5 text-green-500 mb-2" />
          <p className="text-2xl font-bold">{completedHabitsCount}/{totalHabits}</p>
          <p className="text-sm text-gray-500">Habits Today</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <Bell className="w-5 h-5 text-red-500 mb-2" />
          <p className="text-2xl font-bold">{reminders.filter(r => !r.isCompleted).length}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
      </div>

      {/* Today's Habits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-green-500" />
            Today's Habits
          </h3>
          <span className="text-sm text-gray-500">{completedHabitsCount}/{totalHabits} completed</span>
        </div>
        <div className="space-y-3">
          {habits.map(habit => (
            <div
              key={habit.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                habit.completedToday
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-300"
              )}
              onClick={() => toggleHabit(habit.id)}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", categoryColors[habit.category])} />
                <div>
                  <p className={cn("font-medium", habit.completedToday && "line-through text-gray-500")}>
                    {habit.title}
                  </p>
                  <p className="text-sm text-gray-500">🔥 {habit.streak} day streak</p>
                </div>
              </div>
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                habit.completedToday
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300"
              )}>
                {habit.completedToday && <CheckSquare className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Smile className="w-5 h-5 text-yellow-500" />
          How are you feeling?
        </h3>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(moodEmojis).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={cn(
                "px-4 py-3 rounded-xl text-2xl transition-all hover:scale-110",
                selectedMood === mood
                  ? "bg-yellow-100 dark:bg-yellow-900/30 ring-2 ring-yellow-500"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
        {selectedMood && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Logged: {moodEmojis[selectedMood as keyof typeof moodEmojis]} {selectedMood}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-2">Recent moods</p>
          <div className="flex gap-2">
            {moodEntries.slice(0, 5).map(entry => (
              <span key={entry.id} className="text-2xl" title={entry.mood}>
                {moodEmojis[entry.mood]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Active Goals Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Active Goals
          </h3>
          <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="space-y-4">
          {activeGoals.slice(0, 3).map(goal => (
            <div key={goal.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{goal.title}</span>
                <span className="text-sm text-gray-500">{goal.progress}/{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full transition-all", categoryColors[goal.category])}
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Overall Progress</span>
            <span className="text-sm font-medium">{averageProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-500" />
            Today's Reminders
          </h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {reminders.map(reminder => (
            <div
              key={reminder.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <Clock className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <p className={cn("font-medium", reminder.isCompleted && "line-through text-gray-500")}>
                  {reminder.title}
                </p>
                <p className="text-sm text-gray-500">{reminder.time}</p>
              </div>
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                reminder.priority === 'high' ? "bg-red-100 text-red-700" :
                reminder.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
                "bg-gray-100 text-gray-700"
              )}>
                {reminder.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Notes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-yellow-500" />
            Recent Notes
          </h3>
          <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {notes.slice(0, 4).map(note => (
            <div
              key={note.id}
              className={cn(
                "p-4 rounded-lg border",
                note.isPinned
                  ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                  : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{note.title}</h4>
                {note.isPinned && <span className="text-yellow-500">📌</span>}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{note.content}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {note.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Life OS</h1>
                <p className="text-sm text-gray-500">
                  {format(new Date(), 'EEEE, MMMM d')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-2">
                {(['overview', 'goals', 'habits', 'notes'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all capitalize",
                      activeTab === tab
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' ? renderOverview() : (
          <div className="text-center py-20">
            <p className="text-gray-500">More views coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
