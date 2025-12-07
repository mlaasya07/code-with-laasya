import { useMemo } from 'react';
import { storage } from '@/utils/localStorage';

interface ActivityHeatmapProps {
  weeks?: number;
}

export default function ActivityHeatmap({ weeks = 12 }: ActivityHeatmapProps) {
  const activityData = useMemo(() => {
    const log = storage.getActivityLog();
    const today = new Date();
    const days: { date: string; count: number; level: number }[] = [];
    
    // Generate last N weeks of dates
    for (let i = weeks * 7 - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = log[dateStr] || 0;
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4;
      days.push({ date: dateStr, count, level });
    }
    
    return days;
  }, [weeks]);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted';
      case 1: return 'bg-primary/25';
      case 2: return 'bg-primary/50';
      case 3: return 'bg-primary/75';
      case 4: return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Group by week
  const weeksData: typeof activityData[] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeksData.push(activityData.slice(i, i + 7));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 text-[10px] text-muted-foreground pr-1">
          {weekDays.map((day, i) => (
            <div key={day} className="h-3 flex items-center">
              {i % 2 === 1 ? day : ''}
            </div>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {weeksData.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm ${getColor(day.level)} transition-colors hover:ring-1 hover:ring-primary/50`}
                  title={`${day.date}: ${day.count} activities`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
