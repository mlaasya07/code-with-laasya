import { useState } from "react";
import { Brain, CheckCircle2, XCircle, Trophy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import quizzesData from "@/data/quizzes.json";

const ByteRush = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: { [qIndex: number]: number } }>({});
  const [completedQuizzes, setCompletedQuizzes] = useState<{ [key: string]: boolean }>({});
  const [totalXP, setTotalXP] = useState(0);
  const [openQuizzes, setOpenQuizzes] = useState<{ [key: string]: boolean }>({});

  const handleAnswer = (quizId: string, questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [quizId]: {
        ...(selectedAnswers[quizId] || {}),
        [questionIndex]: answerIndex
      }
    });
  };

  const submitQuiz = (quiz: any) => {
    const quizAnswers = selectedAnswers[quiz.id] || {};
    
    if (Object.keys(quizAnswers).length !== quiz.questions.length) {
      toast.error("Please answer all questions first!");
      return;
    }

    let correctCount = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const earnedXP = correctCount * 25;
    
    if (!completedQuizzes[quiz.id]) {
      setTotalXP(totalXP + earnedXP);
      setCompletedQuizzes({ ...completedQuizzes, [quiz.id]: true });
      
      toast.success(`Quiz Complete! +${earnedXP} XP`, {
        description: `You got ${correctCount} out of ${quiz.questions.length} correct!`
      });
    } else {
      toast.info(`Score: ${correctCount}/${quiz.questions.length}`, {
        description: "XP already earned for this quiz"
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "hard": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "backend": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "debugging": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const toggleQuiz = (quizId: string) => {
    setOpenQuizzes(prev => ({ ...prev, [quizId]: !prev[quizId] }));
  };

return (
  <div className="min-h-screen">
    {/* HERO SECTION */}
    <section className="container mx-auto px-4 pt-28 pb-16">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">

        <div className="inline-flex items-center gap-3 text-primary justify-center">
          <Brain className="w-10 h-10" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold">ByteRush</h1>

        <p className="text-xl text-muted-foreground">
          Test your fundamentals & logic
        </p>

        <div className="flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 w-fit mx-auto mt-4">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-bold text-lg">{totalXP} XP</span>
        </div>

        <p className="text-muted-foreground max-w-xl mx-auto pt-4">
          Sharpen your coding knowledge with these technical quizzes. Earn 25 XP
          for each correct answer!
        </p>

      </div>
    </section>

    {/* QUIZ LIST */}
    <section className="container mx-auto px-4 pb-16">
      <div className="grid gap-6">
        {quizzesData.map((quiz: any) => {
          const quizAnswers = selectedAnswers[quiz.id] || {};
          const isCompleted = completedQuizzes[quiz.id];
          const isOpen = openQuizzes[quiz.id] || false;

          return (
            <Collapsible key={quiz.id} open={isOpen} onOpenChange={() => toggleQuiz(quiz.id)}>
              <Card className="overflow-hidden">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="mb-2">{quiz.title}</CardTitle>
                          {isCompleted && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <CardDescription>
                          {quiz.questions.length} questions • {quiz.questions.length * 25} XP total
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-2 items-end">
                          <Badge className={getDifficultyColor(quiz.difficulty)}>
                            {quiz.difficulty}
                          </Badge>
                          <Badge className={getCategoryColor(quiz.category)}>
                            {quiz.category}
                          </Badge>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="space-y-6 pt-0">
                    {quiz.code && (
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <p className="text-sm font-semibold mb-2">Code to analyze:</p>
                        <pre className="text-xs overflow-x-auto">
                          <code>{quiz.code}</code>
                        </pre>
                      </div>
                    )}

                    {quiz.questions.map((question: any, qIndex: number) => {
                      const selectedAnswer = quizAnswers[qIndex];
                      const isAnswered = selectedAnswer !== undefined;
                      const isCorrect = selectedAnswer === question.correctAnswer;

                      return (
                        <div key={qIndex} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-primary shrink-0">Q{qIndex + 1}.</span>
                            <p className="font-medium">{question.question}</p>
                          </div>

                          <div className="space-y-2 ml-6">
                            {question.options.map((option: string, oIndex: number) => (
                              <button
                                key={oIndex}
                                onClick={() => handleAnswer(quiz.id, qIndex, oIndex)}
                                disabled={isCompleted}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                                  selectedAnswer === oIndex
                                    ? isCompleted
                                      ? isCorrect
                                        ? "bg-green-500/10 border-green-500 text-green-500"
                                        : "bg-red-500/10 border-red-500 text-red-500"
                                      : "bg-primary/10 border-primary"
                                    : isCompleted && oIndex === question.correctAnswer
                                    ? "bg-green-500/10 border-green-500 text-green-500"
                                    : "bg-card border-border hover:bg-muted"
                                } ${isCompleted ? "cursor-not-allowed" : "cursor-pointer"}`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCompleted && oIndex === question.correctAnswer && (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                  )}
                                  {isCompleted && selectedAnswer === oIndex && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {isCompleted && question.explanation && (
                            <div className="ml-6 bg-primary/5 p-3 rounded-lg border border-primary/20">
                              <p className="text-xs font-semibold mb-1">Explanation:</p>
                              <p className="text-xs text-muted-foreground">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {!isCompleted && (
                      <Button 
                        onClick={() => submitQuiz(quiz)} 
                        className="w-full"
                        disabled={Object.keys(quizAnswers).length !== quiz.questions.length}
                      >
                        Submit Quiz
                      </Button>
                    )}

                    {isCompleted && (
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                        <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold text-green-500">Quiz Completed!</p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </section>
  </div>
);
};
export default ByteRush;
