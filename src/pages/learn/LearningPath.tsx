import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Layout, Braces, Bug, Database, Atom, CheckCircle2 } from 'lucide-react';
import { storage } from '@/utils/localStorage';
import learningPathsData from '@/data/learningPaths.json';

const iconMap: Record<string, any> = { Layout, Braces, Bug, Database, Atom };

export default function LearningPath() {
  const pathProgress = storage.getLearningPathProgress();

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-2 text-center">Learning Paths</h1>
        <p className="text-muted-foreground text-center mb-8">Structured pathways to master coding</p>

        <div className="space-y-6">
          {learningPathsData.map(path => {
            const Icon = iconMap[path.icon] || Layout;
            const completed = pathProgress[path.id] || 0;
            const progress = (completed / path.steps.length) * 100;

            return (
              <Card key={path.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20"><Icon className="w-6 h-6 text-primary" /></div>
                    <div className="flex-1">
                      <CardTitle>{path.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <Badge>{Math.round(progress)}%</Badge>
                  </div>
                  <Progress value={progress} className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {path.steps.map((step, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded ${idx <= completed ? 'bg-primary/10' : 'bg-muted/50'}`}>
                        {idx < completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />}
                        <div className="flex-1">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge variant="secondary">+{step.xp} XP</Badge>
                        <Button asChild size="sm" variant="outline"><Link to={step.link}>Go</Link></Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
