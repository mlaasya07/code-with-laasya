import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ProgressBar';
import { storage } from '@/utils/localStorage';
import { calculateLevel, checkAndUnlockAchievements } from '@/utils/gamification';
import { showXPToast, showLevelUpToast, showAchievementToast } from '@/components/XPToast';
import { CheckCircle2, PlayCircle, Code2, Filter } from 'lucide-react';
import lessonsData from '@/data/lessons.json';

export default function LearningFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setCompletedLessons(storage.getCompletedLessons());
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Debugging'];

  const filteredLessons = selectedCategory === 'All'
    ? lessonsData
    : lessonsData.filter(lesson => lesson.category === selectedCategory);

  const completedCount = lessonsData.filter(lesson =>
    completedLessons.includes(lesson.id)
  ).length;

  const handleCompleteLesson = (lessonId: string, xp: number) => {
    if (!completedLessons.includes(lessonId)) {
      // Get level before XP addition
      const oldLevel = calculateLevel(storage.getXP());
      
      // Add XP and complete lesson
      storage.addXP(xp);
      storage.completeLesson(lessonId);
      setCompletedLessons([...completedLessons, lessonId]);
      
      // Check for level up
      const newLevel = calculateLevel(storage.getXP());
      if (newLevel > oldLevel) {
        showLevelUpToast(newLevel);
      }
      
      // Show XP toast
      showXPToast(xp);
      
      // Check for new achievements
      const newAchievements = checkAndUnlockAchievements();
      newAchievements.forEach(achievement => {
        setTimeout(() => {
          showAchievementToast(achievement.title, achievement.icon);
        }, 500);
      });
    }
  };

  const getNextLesson = () => {
    return lessonsData.find(lesson => !completedLessons.includes(lesson.id));
  };

  // Auto-scroll to specific lesson if provided in URL
  useEffect(() => {
    const lessonId = searchParams.get('lesson');
    if (lessonId) {
      const element = document.getElementById(`lesson-${lessonId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Flow</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Follow the path, complete lessons, and level up your skills
          </p>
          
          {/* Progress Overview */}
          <Card className="p-6 bg-card border-border">
            <ProgressBar
              current={completedCount}
              total={lessonsData.length}
              label="Overall Progress"
              showPercentage
            />
            <p className="text-sm text-muted-foreground mt-2">
              {completedCount === lessonsData.length
                ? "🎉 All lessons completed! You're amazing!"
                : `${lessonsData.length - completedCount} lessons remaining`}
            </p>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6">
          {filteredLessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <Card
                key={lesson.id}
                id={`lesson-${lesson.id}`}
                className={`p-6 border-2 transition-all ${
                  isCompleted
                    ? 'border-primary bg-card/50'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Video Section */}
                  <div className="md:w-1/2">
                    <div className="relative aspect-video bg-muted rounded overflow-hidden">
                      <iframe
                        src={lesson.videoUrl}
                        title={lesson.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-1/2 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="mb-2">
                        {lesson.category}
                      </Badge>
                      {isCompleted && (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                    <p className="text-muted-foreground mb-4">
                      {lesson.description}
                    </p>

                    {/* Practice Snippet */}
                    <div className="flex-1 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="w-4 h-4" />
                        <span className="text-sm font-semibold">Practice Code:</span>
                      </div>
                      <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                        <code>{lesson.practiceSnippet}</code>
                      </pre>
                    </div>

                    {/* XP Badge */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-primary border-primary">
                        +{lesson.xp} XP
                      </Badge>
                      
                      <Button
                        onClick={() => handleCompleteLesson(lesson.id, lesson.xp)}
                        disabled={isCompleted}
                        size="lg"
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Mark Complete
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        {completedCount < lessonsData.length && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => {
                const nextLesson = getNextLesson();
                if (nextLesson) {
                  navigate(`/learn?lesson=${nextLesson.id}`);
                }
              }}
            >
              Continue to Next Lesson
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
