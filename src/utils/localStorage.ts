export const storage = {
  // Code Editor
  getSavedCode: (): string | null => {
    return localStorage.getItem('savedCode');
  },
  
  setSavedCode: (code: string): void => {
    localStorage.setItem('savedCode', code);
  },
  
  // Bookmarks
  getBookmarks: (): string[] => {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
  },
  
  addBookmark: (id: string): void => {
    const bookmarks = storage.getBookmarks();
    if (!bookmarks.includes(id)) {
      bookmarks.push(id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  },
  
  removeBookmark: (id: string): void => {
    const bookmarks = storage.getBookmarks();
    const filtered = bookmarks.filter(b => b !== id);
    localStorage.setItem('bookmarks', JSON.stringify(filtered));
  },

  // XP System
  getXP: (): number => {
    const xp = localStorage.getItem('totalXP');
    return xp ? parseInt(xp) : 0;
  },

  addXP: (amount: number): void => {
    const currentXP = storage.getXP();
    localStorage.setItem('totalXP', (currentXP + amount).toString());
  },

  // Achievements
  getAchievements: (): string[] => {
    const achievements = localStorage.getItem('achievements');
    return achievements ? JSON.parse(achievements) : [];
  },

  unlockAchievement: (id: string): void => {
    const achievements = storage.getAchievements();
    if (!achievements.includes(id)) {
      achievements.push(id);
      localStorage.setItem('achievements', JSON.stringify(achievements));
    }
  },

  // Activity Tracking
  incrementActivity: (key: 'lessons' | 'quizzes' | 'projects' | 'bugs'): void => {
    const current = localStorage.getItem(`completed_${key}`);
    const count = current ? parseInt(current) : 0;
    localStorage.setItem(`completed_${key}`, (count + 1).toString());
  },

  getActivityCount: (key: 'lessons' | 'quizzes' | 'projects' | 'bugs'): number => {
    const count = localStorage.getItem(`completed_${key}`);
    return count ? parseInt(count) : 0;
  },
};
