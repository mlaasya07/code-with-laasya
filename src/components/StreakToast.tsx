import { useEffect } from 'react';
import { toast } from 'sonner';
import { Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storage } from '@/utils/localStorage';

export function useStreakCheck() {
  useEffect(() => {
    const { streak, isNewDay, bonusXP } = storage.updateStreak();
    storage.logActivity();

    if (isNewDay && streak > 1) {
      toast(
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-orange-500" />
          <div>
            <div className="font-bold">{streak} Day Streak!</div>
            {bonusXP > 0 && <div className="text-sm text-muted-foreground">+{bonusXP} Bonus XP!</div>}
          </div>
        </div>,
        { duration: 4000 }
      );

      if (bonusXP > 0) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, []);
}

export function showAchievementToast(title: string, icon: string) {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  toast(
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-bold">🎊 Achievement Unlocked!</div>
        <div className="text-sm">{title}</div>
      </div>
    </div>,
    { duration: 4000 }
  );
}
