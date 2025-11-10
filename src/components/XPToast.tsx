import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface XPToastProps {
  xp: number;
  trigger?: number;
}

export const XPToast = ({ xp, trigger }: XPToastProps) => {
  useEffect(() => {
    if (trigger && xp > 0) {
      toast({
        title: `+${xp} XP! 🎉`,
        description: "Keep learning and growing!",
        duration: 2000,
      });
    }
  }, [trigger, xp]);

  return null;
};

export const showXPToast = (xp: number) => {
  toast({
    title: `+${xp} XP! 🎉`,
    description: "Keep learning and growing!",
    duration: 2000,
  });
};

export const showLevelUpToast = (level: number) => {
  toast({
    title: `🎊 LEVEL UP! 🎊`,
    description: `You've reached Level ${level}!`,
    duration: 3000,
  });
};

export const showAchievementToast = (title: string, icon: string) => {
  toast({
    title: `${icon} Achievement Unlocked!`,
    description: title,
    duration: 3000,
  });
};
