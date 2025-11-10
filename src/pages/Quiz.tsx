import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/utils/localStorage';
import { calculateLevel, checkAndUnlockAchievements } from '@/utils/gamification';
import { showXPToast, showLevelUpToast, showAchievementToast } from '@/components/XPToast';
import { Brain, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import quizzesData from '@/data/quizzes.json';

export default function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    setCompletedQuizzes(storage.getCompletedQuizzes());
  }, []);

  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quiz.questions.length).fill(false));
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    // Move to next question or finish
    setTimeout(() => {
      if (currentQuestion < selectedQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz(isCorrect ? score + 1 : score);
      }
    }, 1000);
  };

  const finishQuiz = (finalScore: number) => {
    setShowResult(true);
    
    // Award XP if passed (>= 50%)
    const passingScore = Math.ceil(selectedQuiz.questions.length * 0.5);
    if (finalScore >= passingScore) {
      const oldLevel = calculateLevel(storage.getXP());
      storage.addXP(selectedQuiz.xp);
      storage.completeQuiz(selectedQuiz.id);
      setCompletedQuizzes([...completedQuizzes, selectedQuiz.id]);

      const newLevel = calculateLevel(storage.getXP());
      if (newLevel > oldLevel) {
        showLevelUpToast(newLevel);
      }

      showXPToast(selectedQuiz.xp);

      const newAchievements = checkAndUnlockAchievements();
      newAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          showAchievementToast(achievement.title, achievement.icon);
        }, 500 * (index + 1));
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-secondary text-secondary-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <Brain className="inline-block w-10 h-10 mr-2" />
              Quizzes & Challenges
            </h1>
            <p className="text-muted-foreground text-lg">
              Test your knowledge, earn XP, and level up!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quizzesData.map((quiz: any) => {
              const isCompleted = completedQuizzes.includes(quiz.id);

              return (
                <Card
                  key={quiz.id}
                  className={`p-6 border-2 transition-all ${
                    isCompleted
                      ? 'border-primary bg-card/50'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <Badge variant="outline" className="ml-2">
                        {quiz.category}
                      </Badge>
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                  
                  {quiz.code && (
                    <pre className="bg-muted p-3 rounded text-xs mb-4 overflow-x-auto">
                      <code>{quiz.code}</code>
                    </pre>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-primary border-primary">
                        +{quiz.xp} XP
                      </Badge>
                      <Button onClick={() => startQuiz(quiz)}>
                        {isCompleted ? 'Retake' : 'Start Quiz'}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (!showResult) {
    const question = selectedQuiz.questions[currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const isCorrect =
      isAnswered && selectedAnswer === question.correctAnswer;

    return (
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8 border-border">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </span>
                <span className="text-sm font-semibold">
                  Score: {score}/{selectedQuiz.questions.length}
                </span>
              </div>
              <div className="w-full bg-muted h-2 rounded">
                <div
                  className="bg-primary h-2 rounded transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const showCorrect =
                  isAnswered && index === question.correctAnswer;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => !isAnswered && setSelectedAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded border-2 transition-all ${
                      showCorrect
                        ? 'border-primary bg-primary/10'
                        : showWrong
                        ? 'border-destructive bg-destructive/10'
                        : isSelected
                        ? 'border-primary bg-card'
                        : 'border-border hover:border-primary/50 bg-card'
                    } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation (if available and answered) */}
            {isAnswered && question.explanation && (
              <Card className="p-4 bg-muted border-border mb-6">
                <p className="text-sm">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null || isAnswered}
              size="lg"
              className="w-full"
            >
              {isAnswered ? 'Moving to next...' : 'Submit Answer'}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Results
  const percentage = (score / selectedQuiz.questions.length) * 100;
  const passed = percentage >= 50;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="p-8 border-border text-center">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? 'text-primary' : 'text-muted-foreground'}`} />
          
          <h2 className="text-3xl font-bold mb-2">
            {passed ? '🎉 Great Job!' : '💪 Keep Practicing!'}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            You scored {score} out of {selectedQuiz.questions.length}
          </p>

          <div className="text-5xl font-bold mb-6 text-primary">
            {Math.round(percentage)}%
          </div>

          {passed && (
            <Badge variant="outline" className="mb-6 text-primary border-primary text-lg px-4 py-2">
              +{selectedQuiz.xp} XP Earned!
            </Badge>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={() => startQuiz(selectedQuiz)} variant="outline">
              Retake Quiz
            </Button>
            <Button onClick={() => setSelectedQuiz(null)}>
              Back to Quizzes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
