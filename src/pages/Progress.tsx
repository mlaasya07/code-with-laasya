import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';
import { storage } from '@/utils/localStorage';
import { getUserStats, calculateLevel, getXPForNextLevel, getXPProgress, ACHIEVEMENTS } from '@/utils/gamification';
import { Download, Upload, Trophy, Zap, Flame, BookOpen, Brain, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import lessonsData from '@/data/lessons.json';
import quizzesData from '@/data/quizzes.json';

export default function Progress() {
  const [stats, setStats] = useState(getUserStats());
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  const handleExport = () => {
    const data = storage.exportProgress();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codeWithLaasya-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Progress exported!",
      description: "Your progress has been saved to a file",
      duration: 3000,
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        storage.importProgress(content);
        setStats(getUserStats());
        toast({
          title: "Progress imported!",
          description: "Your progress has been restored",
          duration: 3000,
        });
        setShowImport(false);
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid progress file",
          duration: 3000,
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const unlockedAchievements = ACHIEVEMENTS.filter(a =>
    stats.achievements.includes(a.id)
  );

  const nextXP = getXPForNextLevel(stats.xp);
  const progressPercentage = getXPProgress(stats.xp);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Trophy className="inline-block w-10 h-10 mr-2" />
            Your Progress
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Warning about localStorage */}
        <Card className="p-4 mb-6 bg-destructive/10 border-destructive">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-destructive font-semibold mb-1">
                ⚠️ Local Storage Warning
              </p>
              <p className="text-xs text-destructive/90">
                All progress is stored locally in your browser. Clearing browser data will delete your progress. 
                Use the Export button below to backup your data!
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{stats.xp}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">Level {stats.level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{stats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <div className="text-3xl font-bold">{stats.completedLessons}</div>
                <div className="text-sm text-muted-foreground">Lessons Done</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-6 mb-8 border-border">
          <h3 className="text-xl font-bold mb-4">Level Progress</h3>
          <ProgressBar
            current={stats.xp % 100}
            total={100}
            label={`${stats.xp % 100} / 100 XP to Level ${stats.level + 1}`}
            showPercentage={false}
          />
          <p className="text-sm text-muted-foreground mt-2">
            {nextXP - stats.xp} XP needed to reach next level
          </p>
        </Card>

        {/* Detailed Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Lessons Progress */}
          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Lessons Progress</h3>
            </div>
            <ProgressBar
              current={stats.completedLessons}
              total={lessonsData.length}
              label="Completed Lessons"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {lessonsData.length - stats.completedLessons} lessons remaining
            </p>
          </Card>

          {/* Quizzes Progress */}
          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Quizzes Progress</h3>
            </div>
            <ProgressBar
              current={stats.completedQuizzes}
              total={quizzesData.length}
              label="Completed Quizzes"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {quizzesData.length - stats.completedQuizzes} quizzes remaining
            </p>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 mb-8 border-border">
          <h3 className="text-xl font-bold mb-4">
            Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
          </h3>
          
          {unlockedAchievements.length === 0 ? (
            <p className="text-muted-foreground">
              Complete lessons and quizzes to unlock achievements!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.map((achievement) => (
                <Card key={achievement.id} className="p-4 border-primary/50 bg-card/50">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-bold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {/* Locked Achievements Preview */}
          {unlockedAchievements.length < ACHIEVEMENTS.length && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Locked Achievements
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.filter(a => !stats.achievements.includes(a.id))
                  .slice(0, 3)
                  .map((achievement) => (
                    <Card
                      key={achievement.id}
                      className="p-4 border-border bg-muted/50 opacity-60"
                    >
                      <div className="text-3xl mb-2 grayscale">{achievement.icon}</div>
                      <h4 className="font-bold mb-1">???</h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </Card>

        {/* Export/Import */}
        <Card className="p-6 border-border">
          <h3 className="text-xl font-bold mb-4">Backup & Restore</h3>
          <p className="text-muted-foreground mb-4">
            Export your progress to a JSON file for backup, or import previously saved progress.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Progress
            </Button>
            
            <label htmlFor="import-file">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Progress
                </span>
              </Button>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
