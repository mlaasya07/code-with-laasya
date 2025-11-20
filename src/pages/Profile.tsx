import { User, Trophy, Target, Zap, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { storage } from "@/utils/localStorage";
import { showXPToast } from "@/components/XPToast";

interface UserStats {
  totalXP: number;
  level: number;
  quizzesCompleted: number;
  projectsCompleted: number;
  streak: number;
  bookmarks: number;
}

export default function Profile() {
  const [stats, setStats] = useState<UserStats>({
    totalXP: 0,
    level: 1,
    quizzesCompleted: 0,
    projectsCompleted: 0,
    streak: 0,
    bookmarks: 0,
  });

  useEffect(() => {
    // Load user stats from localStorage
    const bookmarks = storage.getBookmarks();
    const completedQuizzes = Object.keys(localStorage).filter(key => 
      key.startsWith('quiz_') && localStorage.getItem(key) === 'completed'
    ).length;

    // Calculate stats
    const totalXP = (completedQuizzes * 50) + (bookmarks.length * 10);
    const level = Math.floor(totalXP / 100) + 1;

    setStats({
      totalXP,
      level,
      quizzesCompleted: completedQuizzes,
      projectsCompleted: 0,
      streak: 0,
      bookmarks: bookmarks.length,
    });
  }, []);

  const xpToNextLevel = stats.level * 100;
  const progressPercentage = (stats.totalXP % 100);

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      icon: Target,
      unlocked: stats.quizzesCompleted >= 1,
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Bookmark 5 tips",
      icon: BookOpen,
      unlocked: stats.bookmarks >= 5,
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Complete 10 quizzes",
      icon: Trophy,
      unlocked: stats.quizzesCompleted >= 10,
    },
    {
      id: 4,
      title: "Level Up!",
      description: "Reach Level 5",
      icon: Zap,
      unlocked: stats.level >= 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">My Profile</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="default" className="text-lg px-4 py-1">
              Level {stats.level}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {stats.totalXP} XP
            </Badge>
          </div>
        </div>

        {/* XP Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Level Progress</span>
              <span className="text-sm text-muted-foreground">
                {stats.totalXP} / {xpToNextLevel} XP
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {xpToNextLevel - stats.totalXP} XP until Level {stats.level + 1}
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.quizzesCompleted}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.projectsCompleted}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.streak} 🔥</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Bookmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.bookmarks}</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </CardTitle>
            <CardDescription>Unlock achievements as you learn and grow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      achievement.unlocked
                        ? "bg-primary/10 border-primary"
                        : "bg-muted/50 border-border opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="default">Unlocked</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}