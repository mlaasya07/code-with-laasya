import { User, Trophy, Target, Zap, BookOpen, Code2, Bug, Flame, Crown, Calendar, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { storage } from "@/utils/localStorage";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import SkillRadar from "@/components/SkillRadar";

interface UserStats {
  totalXP: number;
  level: number;
  levelName: string;
  lessonsCompleted: number;
  quizzesCompleted: number;
  projectsCompleted: number;
  bugsFixed: number;
  streak: number;
  bookmarks: number;
}

const LEVEL_NAMES = [
  "Seed", "Sprout", "Debugger", "Logical Thinker", "Junior Builder",
  "Code Adventurer", "UI Artisan", "API Explorer", "Real Programmer™", "Code Wizard"
];

const XP_PER_LEVEL = 100;

export default function Profile() {
  const [stats, setStats] = useState<UserStats>({
    totalXP: 0,
    level: 1,
    levelName: "Seed",
    lessonsCompleted: 0,
    quizzesCompleted: 0,
    projectsCompleted: 0,
    bugsFixed: 0,
    streak: 0,
    bookmarks: 0,
  });

  useEffect(() => {
    const totalXP = storage.getXP();
    const level = Math.min(Math.floor(totalXP / XP_PER_LEVEL) + 1, 10);
    const levelName = LEVEL_NAMES[level - 1] || "Code Wizard";
    const streakData = storage.getStreak();

    const lessonsCompleted = storage.getActivityCount('lessons');
    const quizzesCompleted = storage.getActivityCount('quizzes');
    const projectsCompleted = storage.getActivityCount('projects');
    const bugsFixed = storage.getActivityCount('bugs');
    const bookmarks = storage.getBookmarks().length;

    setStats({
      totalXP,
      level,
      levelName,
      lessonsCompleted,
      quizzesCompleted,
      projectsCompleted,
      bugsFixed,
      streak: streakData.current,
      bookmarks,
    });
  }, []);

  const xpToNextLevel = stats.level * XP_PER_LEVEL;
  const progressPercentage = ((stats.totalXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const starterBadges = [
    {
      id: "first_step",
      title: "First Step",
      description: "Open 1 lesson",
      icon: Target,
      unlocked: stats.lessonsCompleted >= 1,
    },
    {
      id: "tiny_victory",
      title: "Tiny Victory",
      description: "Finish your first micro-project",
      icon: Trophy,
      unlocked: stats.projectsCompleted >= 1,
    },
    {
      id: "unbroken_streak",
      title: "Unbroken Streak",
      description: "3 days consistent coding",
      icon: Flame,
      unlocked: stats.streak >= 3,
    },
  ];

  const progressBadges = [
    {
      id: "syntax_summoner",
      title: "Syntax Summoner",
      description: "Pass 5 quizzes",
      icon: Zap,
      unlocked: stats.quizzesCompleted >= 5,
    },
    {
      id: "bug_tamer",
      title: "Bug Tamer",
      description: "Fix 10 mini-bugs",
      icon: Bug,
      unlocked: stats.bugsFixed >= 10,
    },
    {
      id: "knowledge_seeker",
      title: "Knowledge Seeker",
      description: "Bookmark 5 tips",
      icon: BookOpen,
      unlocked: stats.bookmarks >= 5,
    },
  ];

  const bossBadges = [
    {
      id: "dom_whisperer",
      title: "DOM Whisperer",
      description: "Build 3 DOM projects",
      icon: Code2,
      unlocked: stats.projectsCompleted >= 3,
    },
    {
      id: "level_master",
      title: "Level Master",
      description: "Reach Level 5",
      icon: Crown,
      unlocked: stats.level >= 5,
    },
    {
      id: "code_wizard",
      title: "Code Wizard",
      description: "Reach Level 10",
      icon: Trophy,
      unlocked: stats.level >= 10,
    },
  ];

  const renderBadgeSection = (title: string, badges: typeof starterBadges, variant: "default" | "secondary" | "destructive" = "default") => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold flex items-center gap-2">
        {variant === "destructive" && "💀"} {title}
      </h3>
      <div className="grid gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                badge.unlocked
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  badge.unlocked ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{badge.title}</h4>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
              {badge.unlocked && (
                <Badge variant={variant}>Unlocked</Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

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
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="default" className="text-lg px-4 py-1">
              Level {stats.level}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {stats.totalXP} XP
            </Badge>
            {stats.streak > 0 && (
              <Badge variant="outline" className="text-lg px-4 py-1">
                <Flame className="w-4 h-4 mr-1 text-orange-500" />
                {stats.streak} day streak
              </Badge>
            )}
          </div>
          <p className="text-xl text-primary font-bold">{stats.levelName}</p>
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
              {stats.level < 10 && ` — ${LEVEL_NAMES[stats.level]}`}
            </p>
          </CardContent>
        </Card>

        {/* Activity Heatmap & Skill Radar */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activity Heatmap
              </CardTitle>
              <CardDescription>Your coding activity over the last 12 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityHeatmap weeks={12} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Skill Breakdown
              </CardTitle>
              <CardDescription>Skills based on completed activities</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillRadar />
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.lessonsCompleted}</p>
              <p className="text-xs text-muted-foreground">+20 XP each</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.quizzesCompleted}</p>
              <p className="text-xs text-muted-foreground">+25 XP each</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.projectsCompleted}</p>
              <p className="text-xs text-muted-foreground">+30 XP each</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Bugs Fixed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{stats.bugsFixed}</p>
              <p className="text-xs text-muted-foreground">+10 XP each</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements & Badges
            </CardTitle>
            <CardDescription>Unlock badges as you learn and grow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderBadgeSection("✨ Starter Badges", starterBadges)}
            {renderBadgeSection("🔥 Progress Badges", progressBadges, "secondary")}
            {renderBadgeSection("Boss Badges", bossBadges, "destructive")}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
