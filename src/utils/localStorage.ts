export const storage = {
  // Code Editor
  getSavedCode: (): string | null => {
    return localStorage.getItem('savedCode');
  },
  
  setSavedCode: (code: string): void => {
    localStorage.setItem('savedCode', code);
  },
  
  // Bookmarks - Enhanced with type support
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

  isBookmarked: (id: string): boolean => {
    return storage.getBookmarks().includes(id);
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

  hasAchievement: (id: string): boolean => {
    return storage.getAchievements().includes(id);
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

  // Streak System
  getStreak: (): number => {
    const streak = localStorage.getItem('streak');
    return streak ? parseInt(streak) : 0;
  },

  getLastActiveDate: (): string | null => {
    return localStorage.getItem('lastActiveDate');
  },

  updateStreak: (): { streak: number; isNewDay: boolean; bonusXP: number } => {
    const today = new Date().toDateString();
    const lastActive = storage.getLastActiveDate();
    let currentStreak = storage.getStreak();
    let isNewDay = false;
    let bonusXP = 0;

    if (lastActive !== today) {
      isNewDay = true;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActive === yesterday.toDateString()) {
        // Consecutive day - increase streak
        currentStreak += 1;
        
        // Bonus XP for milestones
        if (currentStreak === 3) bonusXP = 25;
        else if (currentStreak === 7) bonusXP = 50;
        else if (currentStreak === 30) bonusXP = 150;
        else if (currentStreak % 7 === 0) bonusXP = 30;
      } else if (lastActive) {
        // Streak broken
        currentStreak = 1;
      } else {
        // First time
        currentStreak = 1;
      }
      
      localStorage.setItem('streak', currentStreak.toString());
      localStorage.setItem('lastActiveDate', today);
      
      if (bonusXP > 0) {
        storage.addXP(bonusXP);
      }
    }

    return { streak: currentStreak, isNewDay, bonusXP };
  },

  // Activity Heatmap Data
  getActivityLog: (): Record<string, number> => {
    const log = localStorage.getItem('activityLog');
    return log ? JSON.parse(log) : {};
  },

  logActivity: (): void => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const log = storage.getActivityLog();
    log[today] = (log[today] || 0) + 1;
    localStorage.setItem('activityLog', JSON.stringify(log));
  },

  // Notes System
  getNotes: (): Array<{ id: string; content: string; timestamp: number; title: string }> => {
    const notes = localStorage.getItem('userNotes');
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: (title: string, content: string): void => {
    const notes = storage.getNotes();
    notes.unshift({
      id: Date.now().toString(),
      title,
      content,
      timestamp: Date.now(),
    });
    localStorage.setItem('userNotes', JSON.stringify(notes));
  },

  deleteNote: (id: string): void => {
    const notes = storage.getNotes();
    const filtered = notes.filter(n => n.id !== id);
    localStorage.setItem('userNotes', JSON.stringify(filtered));
  },

  // Weekly Stats
  getWeeklyStats: (): { xpEarned: number; activitiesCompleted: number; daysActive: number } => {
    const log = storage.getActivityLog();
    const today = new Date();
    let xpEarned = 0;
    let activitiesCompleted = 0;
    let daysActive = 0;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = log[dateStr] || 0;
      if (count > 0) {
        daysActive++;
        activitiesCompleted += count;
      }
    }

    // Rough estimate based on activities
    xpEarned = activitiesCompleted * 15;

    return { xpEarned, activitiesCompleted, daysActive };
  },

  // Skill Tracking for Radar Chart
  getSkillPoints: (): Record<string, number> => {
    const skills = localStorage.getItem('skillPoints');
    return skills ? JSON.parse(skills) : {
      frontend: 0,
      backend: 0,
      debugging: 0,
      logic: 0,
      databases: 0,
    };
  },

  addSkillPoints: (skill: string, points: number): void => {
    const skills = storage.getSkillPoints();
    skills[skill] = (skills[skill] || 0) + points;
    localStorage.setItem('skillPoints', JSON.stringify(skills));
  },

  // Learning Path Progress
  getLearningPathProgress: (): Record<string, number> => {
    const progress = localStorage.getItem('learningPathProgress');
    return progress ? JSON.parse(progress) : {};
  },

  updateLearningPathProgress: (pathId: string, stepIndex: number): void => {
    const progress = storage.getLearningPathProgress();
    progress[pathId] = Math.max(progress[pathId] || 0, stepIndex);
    localStorage.setItem('learningPathProgress', JSON.stringify(progress));
  },
};
