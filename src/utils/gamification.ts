import { storage } from './localStorage';

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100);
};

export const getXPForNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  return (currentLevel + 1) * 100;
};

export const getXPProgress = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  const xpInCurrentLevel = currentXP - (currentLevel * 100);
  return (xpInCurrentLevel / 100) * 100; // percentage
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  completedLessons: number;
  completedQuizzes: number;
  achievements: string[];
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    condition: (stats) => stats.completedLessons >= 1,
  },
  {
    id: 'lesson_master_5',
    title: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: '📚',
    condition: (stats) => stats.completedLessons >= 5,
  },
  {
    id: 'lesson_master_10',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '🏆',
    condition: (stats) => stats.completedLessons >= 10,
  },
  {
    id: 'xp_100',
    title: 'Century Club',
    description: 'Earn 100 XP',
    icon: '💯',
    condition: (stats) => stats.xp >= 100,
  },
  {
    id: 'xp_500',
    title: 'XP Champion',
    description: 'Earn 500 XP',
    icon: '⭐',
    condition: (stats) => stats.xp >= 500,
  },
  {
    id: 'xp_1000',
    title: 'XP Legend',
    description: 'Earn 1000 XP',
    icon: '🌟',
    condition: (stats) => stats.xp >= 1000,
  },
  {
    id: 'streak_3',
    title: 'Consistent',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    condition: (stats) => stats.streak >= 3,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥🔥',
    condition: (stats) => stats.streak >= 7,
  },
  {
    id: 'streak_30',
    title: 'Unstoppable',
    description: 'Maintain a 30-day streak',
    icon: '🔥🔥🔥',
    condition: (stats) => stats.streak >= 30,
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete 5 quizzes',
    icon: '🎓',
    condition: (stats) => stats.completedQuizzes >= 5,
  },
  {
    id: 'level_5',
    title: 'Level 5',
    description: 'Reach level 5',
    icon: '⬆️',
    condition: (stats) => stats.level >= 5,
  },
  {
    id: 'level_10',
    title: 'Level 10',
    description: 'Reach level 10',
    icon: '🚀',
    condition: (stats) => stats.level >= 10,
  },
];

export const checkAndUnlockAchievements = (): Achievement[] => {
  const xp = storage.getXP();
  const level = calculateLevel(xp);
  const streak = storage.getStreak();
  const completedLessons = storage.getCompletedLessons().length;
  const completedQuizzes = storage.getCompletedQuizzes().length;
  const currentAchievements = storage.getAchievements();

  const stats: UserStats = {
    xp,
    level,
    streak,
    completedLessons,
    completedQuizzes,
    achievements: currentAchievements,
  };

  const newlyUnlocked: Achievement[] = [];

  ACHIEVEMENTS.forEach((achievement) => {
    if (!currentAchievements.includes(achievement.id) && achievement.condition(stats)) {
      const wasNew = storage.unlockAchievement(achievement.id);
      if (wasNew) {
        newlyUnlocked.push(achievement);
      }
    }
  });

  return newlyUnlocked;
};

export const getUserStats = (): UserStats => {
  const xp = storage.getXP();
  return {
    xp,
    level: calculateLevel(xp),
    streak: storage.getStreak(),
    completedLessons: storage.getCompletedLessons().length,
    completedQuizzes: storage.getCompletedQuizzes().length,
    achievements: storage.getAchievements(),
  };
};
