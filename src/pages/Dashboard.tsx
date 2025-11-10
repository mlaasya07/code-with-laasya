import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';
import { storage } from '@/utils/localStorage';
import { getUserStats, calculateLevel } from '@/utils/gamification';
import { 
  Zap, 
  Trophy, 
  Flame, 
  BookOpen, 
  Play, 
  Lightbulb,
  Youtube,
  Code2,
  Brain,
  TrendingUp
} from 'lucide-react';
import lessonsData from '@/data/lessons.json';
import tipsData from '@/data/tips.json';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(getUserStats());
  const [tipOfTheDay, setTipOfTheDay] = useState<any>(null);

  useEffect(() => {
    // Update streak on visit
    storage.updateStreak();
    setStats(getUserStats());

    // Get random tip of the day
    const randomTip = tipsData[Math.floor(Math.random() * tipsData.length)];
    setTipOfTheDay(randomTip);
  }, []);

  const getNextLesson = () => {
    const completedLessons = storage.getCompletedLessons();
    return lessonsData.find(lesson => !completedLessons.includes(lesson.id));
  };

  const nextLesson = getNextLesson();
  const completedLessons = storage.getCompletedLessons().length;
  const progressPercentage = (completedLessons / lessonsData.length) * 100;

  const recentVideos = [
    {
      title: "React JS - Full Course",
      url: "https://www.youtube.com/watch?v=x4rFhThSX04",
      category: "React"
    },
    {
      title: "JavaScript for Beginners",
      url: "https://www.youtube.com/watch?v=EerdGm-ehJQ",
      category: "JavaScript"
    },
    {
      title: "Python Full Course",
      url: "https://www.youtube.com/watch?v=H2EJuAcrZYU",
      category: "Python"
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome Back, Coder! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to level up your skills today?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => navigate('/progress')}>
            <div className="flex flex-col items-center text-center">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{stats.xp}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </Card>

          <Card className="p-4 border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => navigate('/progress')}>
            <div className="flex flex-col items-center text-center">
              <Trophy className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">Level {stats.level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
          </Card>

          <Card className="p-4 border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => navigate('/progress')}>
            <div className="flex flex-col items-center text-center">
              <Flame className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </Card>

          <Card className="p-4 border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => navigate('/learn')}>
            <div className="flex flex-col items-center text-center">
              <BookOpen className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold">{stats.completedLessons}</div>
              <div className="text-xs text-muted-foreground">Lessons Done</div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Continue Learning */}
          <Card className="lg:col-span-2 p-6 border-2 border-primary/50 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Continue Learning</h2>
            </div>

            {nextLesson ? (
              <>
                <Badge variant="secondary" className="mb-3">
                  {nextLesson.category}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{nextLesson.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {nextLesson.description}
                </p>
                <ProgressBar
                  current={completedLessons}
                  total={lessonsData.length}
                  label="Overall Progress"
                />
                <Button 
                  className="mt-4 w-full md:w-auto" 
                  size="lg"
                  onClick={() => navigate(`/learn?lesson=${nextLesson.id}`)}
                >
                  Continue Lesson
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  🎉 All Lessons Complete!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Amazing work! Try quizzes to test your knowledge.
                </p>
                <Button onClick={() => navigate('/quiz')}>
                  Start Quizzes
                </Button>
              </div>
            )}
          </Card>

          {/* Tip of the Day */}
          <Card className="p-6 border-border bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Tip of the Day</h2>
            </div>
            {tipOfTheDay && (
              <>
                <Badge variant="outline" className="mb-3">
                  {tipOfTheDay.category}
                </Badge>
                <h3 className="font-semibold mb-2">{tipOfTheDay.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tipOfTheDay.content}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/tips')}
                >
                  View All Tips
                </Button>
              </>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="p-6 border-border hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => navigate('/practice')}
          >
            <Code2 className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-lg font-bold mb-2">Practice Playground</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Write code and see results instantly
            </p>
            <Button variant="outline" className="w-full">
              Start Coding
            </Button>
          </Card>

          <Card 
            className="p-6 border-border hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => navigate('/quiz')}
          >
            <Brain className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-lg font-bold mb-2">Take a Quiz</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Test your knowledge and earn XP
            </p>
            <Button variant="outline" className="w-full">
              Start Quiz
            </Button>
          </Card>

          <Card 
            className="p-6 border-border hover:border-primary/50 transition-all cursor-pointer"
            onClick={() => navigate('/progress')}
          >
            <TrendingUp className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-lg font-bold mb-2">View Progress</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track your achievements and stats
            </p>
            <Button variant="outline" className="w-full">
              See Details
            </Button>
          </Card>
        </div>

        {/* Recent Videos */}
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Youtube className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Recent Videos</h2>
            </div>
            <Button variant="ghost" onClick={() => navigate('/videos')}>
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {recentVideos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-4 border-border hover:border-primary/50 transition-all">
                  <Badge variant="secondary" className="mb-2">
                    {video.category}
                  </Badge>
                  <h4 className="font-semibold text-sm">{video.title}</h4>
                </Card>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
