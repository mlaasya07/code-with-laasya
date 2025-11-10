// localStorage utility functions with prefixed keys
const PREFIX = 'codeWithLaasya_';

export const storage = {
  // XP and Level
  getXP: (): number => {
    return parseInt(localStorage.getItem(`${PREFIX}xp`) || '0', 10);
  },
  setXP: (xp: number): void => {
    localStorage.setItem(`${PREFIX}xp`, xp.toString());
  },
  addXP: (xp: number): number => {
    const currentXP = storage.getXP();
    const newXP = currentXP + xp;
    storage.setXP(newXP);
    return newXP;
  },

  // Streak
  getStreak: (): number => {
    return parseInt(localStorage.getItem(`${PREFIX}streak`) || '0', 10);
  },
  setStreak: (streak: number): void => {
    localStorage.setItem(`${PREFIX}streak`, streak.toString());
  },
  getLastVisit: (): string | null => {
    return localStorage.getItem(`${PREFIX}lastVisit`);
  },
  setLastVisit: (date: string): void => {
    localStorage.setItem(`${PREFIX}lastVisit`, date);
  },
  updateStreak: (): number => {
    const today = new Date().toDateString();
    const lastVisit = storage.getLastVisit();
    
    if (!lastVisit) {
      storage.setStreak(1);
      storage.setLastVisit(today);
      return 1;
    }
    
    const lastDate = new Date(lastVisit);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Same day, no change
      return storage.getStreak();
    } else if (diffDays === 1) {
      // Next day, increment streak
      const newStreak = storage.getStreak() + 1;
      storage.setStreak(newStreak);
      storage.setLastVisit(today);
      return newStreak;
    } else {
      // Streak broken
      storage.setStreak(1);
      storage.setLastVisit(today);
      return 1;
    }
  },

  // Completed Lessons
  getCompletedLessons: (): string[] => {
    const data = localStorage.getItem(`${PREFIX}completedLessons`);
    return data ? JSON.parse(data) : [];
  },
  setCompletedLessons: (lessons: string[]): void => {
    localStorage.setItem(`${PREFIX}completedLessons`, JSON.stringify(lessons));
  },
  completeLesson: (lessonId: string): void => {
    const completed = storage.getCompletedLessons();
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      storage.setCompletedLessons(completed);
    }
  },
  isLessonCompleted: (lessonId: string): boolean => {
    return storage.getCompletedLessons().includes(lessonId);
  },

  // Completed Quizzes
  getCompletedQuizzes: (): string[] => {
    const data = localStorage.getItem(`${PREFIX}completedQuizzes`);
    return data ? JSON.parse(data) : [];
  },
  completeQuiz: (quizId: string): void => {
    const completed = storage.getCompletedQuizzes();
    if (!completed.includes(quizId)) {
      completed.push(quizId);
      localStorage.setItem(`${PREFIX}completedQuizzes`, JSON.stringify(completed));
    }
  },

  // Bookmarks
  getBookmarks: (): string[] => {
    const data = localStorage.getItem(`${PREFIX}bookmarks`);
    return data ? JSON.parse(data) : [];
  },
  addBookmark: (tipId: string): void => {
    const bookmarks = storage.getBookmarks();
    if (!bookmarks.includes(tipId)) {
      bookmarks.push(tipId);
      localStorage.setItem(`${PREFIX}bookmarks`, JSON.stringify(bookmarks));
    }
  },
  removeBookmark: (tipId: string): void => {
    const bookmarks = storage.getBookmarks();
    const filtered = bookmarks.filter(id => id !== tipId);
    localStorage.setItem(`${PREFIX}bookmarks`, JSON.stringify(filtered));
  },
  isBookmarked: (tipId: string): boolean => {
    return storage.getBookmarks().includes(tipId);
  },

  // Saved Code
  getSavedCode: (): string => {
    return localStorage.getItem(`${PREFIX}savedCode`) || '';
  },
  setSavedCode: (code: string): void => {
    localStorage.setItem(`${PREFIX}savedCode`, code);
  },

  // Achievements
  getAchievements: (): string[] => {
    const data = localStorage.getItem(`${PREFIX}achievements`);
    return data ? JSON.parse(data) : [];
  },
  unlockAchievement: (achievementId: string): boolean => {
    const achievements = storage.getAchievements();
    if (!achievements.includes(achievementId)) {
      achievements.push(achievementId);
      localStorage.setItem(`${PREFIX}achievements`, JSON.stringify(achievements));
      return true; // newly unlocked
    }
    return false; // already had it
  },

  // Export/Import Progress
  exportProgress: (): string => {
    const data = {
      xp: storage.getXP(),
      streak: storage.getStreak(),
      lastVisit: storage.getLastVisit(),
      completedLessons: storage.getCompletedLessons(),
      completedQuizzes: storage.getCompletedQuizzes(),
      bookmarks: storage.getBookmarks(),
      savedCode: storage.getSavedCode(),
      achievements: storage.getAchievements(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },
  importProgress: (jsonString: string): void => {
    try {
      const data = JSON.parse(jsonString);
      storage.setXP(data.xp || 0);
      storage.setStreak(data.streak || 0);
      if (data.lastVisit) storage.setLastVisit(data.lastVisit);
      storage.setCompletedLessons(data.completedLessons || []);
      if (data.completedQuizzes) localStorage.setItem(`${PREFIX}completedQuizzes`, JSON.stringify(data.completedQuizzes));
      if (data.bookmarks) localStorage.setItem(`${PREFIX}bookmarks`, JSON.stringify(data.bookmarks));
      if (data.savedCode) storage.setSavedCode(data.savedCode);
      if (data.achievements) localStorage.setItem(`${PREFIX}achievements`, JSON.stringify(data.achievements));
    } catch (error) {
      console.error('Failed to import progress:', error);
      throw new Error('Invalid progress data');
    }
  },

  // Clear all data (for debugging)
  clearAll: (): void => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  },
};
