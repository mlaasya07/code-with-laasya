import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import interviewData from '@/data/InterviewQuestions.json';

export default function InterviewPrep() {
  const [category, setCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = ['All', ...new Set(interviewData.map(q => q.category))];
  const filtered = category === 'All' ? interviewData : interviewData.filter(q => q.category === category);

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-500/20 text-green-400';
    if (d === 'Medium') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-2 text-center">💼 Interview Prep</h1>
        <p className="text-muted-foreground text-center mb-6">Common coding interview questions</p>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => (
            <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" onClick={() => setCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(q => (
            <Collapsible key={q.id} open={openId === q.id} onOpenChange={() => setOpenId(openId === q.id ? null : q.id)}>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={difficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                      <CardTitle className="text-left text-base">{q.question}</CardTitle>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openId === q.id ? 'rotate-180' : ''}`} />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-3">
                    <div className="bg-muted p-4 rounded">
                      <p className="font-medium text-primary mb-1">Answer:</p>
                      <p>{q.answer}</p>
                    </div>
                    <p className="text-sm text-muted-foreground"><strong>Follow-up:</strong> {q.followUp}</p>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
