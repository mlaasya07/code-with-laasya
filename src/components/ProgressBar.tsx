import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar = ({ current, total, label, showPercentage = true }: ProgressBarProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-foreground">{label}</span>
          {showPercentage && (
            <span className="text-muted-foreground">
              {current} / {total}
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
