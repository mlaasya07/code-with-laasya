import { useState } from "react";
import { Bug, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Challenge {
  id: string;
  title: string;
  language: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  buggyCode: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xp: number;
}

const BugsKill = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});
  const [totalXP, setTotalXP] = useState(0);

  const challenges: Challenge[] = [
    {
      id: "bug-1",
      title: "Missing Return Statement",
      language: "JavaScript",
      difficulty: "Easy",
      description: "This function should return the sum of two numbers, but it's not working. What's the bug?",
      buggyCode: `function addNumbers(a, b) {
  const sum = a + b;
}

console.log(addNumbers(5, 3)); // undefined`,
      options: [
        "Missing semicolon after sum",
        "Missing return statement",
        "Wrong variable name",
        "Function parameters are incorrect"
      ],
      correctAnswer: 1,
      explanation: "The function calculates the sum but never returns it. Add 'return sum;' before the closing brace.",
      xp: 10
    },
    {
      id: "bug-2",
      title: "Array Index Out of Bounds",
      language: "Python",
      difficulty: "Easy",
      description: "This code tries to access array elements but crashes. What's wrong?",
      buggyCode: `numbers = [1, 2, 3, 4, 5]
for i in range(6):
    print(numbers[i])
    
# IndexError: list index out of range`,
      options: [
        "Array is empty",
        "Loop range exceeds array length",
        "Wrong syntax for range",
        "Print statement is incorrect"
      ],
      correctAnswer: 1,
      explanation: "The array has 5 elements (indices 0-4), but the loop runs 6 times (0-5). Change range(6) to range(len(numbers)).",
      xp: 10
    },
    {
      id: "bug-3",
      title: "State Update Not Reflecting",
      language: "React",
      difficulty: "Medium",
      description: "Clicking the button doesn't update the counter. Why?",
      buggyCode: `function Counter() {
  let count = 0;
  
  const increment = () => {
    count = count + 1;
  };
  
  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}`,
      options: [
        "Missing useState hook",
        "Wrong onClick syntax",
        "Button is disabled",
        "Count should be const"
      ],
      correctAnswer: 0,
      explanation: "Regular variables don't trigger re-renders in React. Use const [count, setCount] = useState(0) and setCount(count + 1) in the increment function.",
      xp: 10
    },
    {
      id: "bug-4",
      title: "Infinite Loop Alert",
      language: "JavaScript",
      difficulty: "Medium",
      description: "This loop never stops! What's the issue?",
      buggyCode: `let i = 0;
while (i < 10) {
  console.log(i);
  // Do something
}

// Browser freezes!`,
      options: [
        "Wrong comparison operator",
        "Missing increment statement (i++)",
        "Console.log is blocking",
        "While loop syntax error"
      ],
      correctAnswer: 1,
      explanation: "The variable 'i' never increases, so the condition 'i < 10' is always true. Add 'i++' inside the loop to increment i.",
      xp: 10
    },
    {
      id: "bug-5",
      title: "Null Pointer Exception",
      language: "Java",
      difficulty: "Medium",
      description: "This code crashes with NullPointerException. What's the bug?",
      buggyCode: `String name = null;
System.out.println(name.length());

// NullPointerException`,
      options: [
        "Length() method doesn't exist",
        "Trying to call method on null object",
        "String is not initialized properly",
        "Wrong println syntax"
      ],
      correctAnswer: 1,
      explanation: "You cannot call methods on a null reference. Check if name != null before calling name.length(), or initialize name with a value.",
      xp: 10
    },
    {
      id: "bug-6",
      title: "Async Await Missing",
      language: "JavaScript",
      difficulty: "Hard",
      description: "The data is always undefined. What's missing?",
      buggyCode: `function fetchUserData() {
  const response = fetch('/api/user');
  const data = response.json();
  return data;
}

const user = fetchUserData();
console.log(user); // Promise {<pending>}`,
      options: [
        "Missing async/await keywords",
        "Wrong API endpoint",
        "JSON() method is wrong",
        "Fetch is not defined"
      ],
      correctAnswer: 0,
      explanation: "fetch() returns a Promise. Make the function async and use await: 'const response = await fetch(...)' and 'const data = await response.json()'.",
      xp: 10
    },
    {
      id: "bug-7",
      title: "Comparison Type Coercion",
      language: "JavaScript",
      difficulty: "Hard",
      description: "This condition should be false but it's true. Why?",
      buggyCode: `const value = '0';
if (value == false) {
  console.log('This shouldn't print!');
}

// Output: This shouldn't print!`,
      options: [
        "String is always truthy",
        "Type coercion with == operator",
        "False is not a valid value",
        "Missing NOT operator"
      ],
      correctAnswer: 1,
      explanation: "The == operator performs type coercion. '0' is converted to 0, which equals false. Use === for strict equality or check if (value === 'false').",
      xp: 10
    },
    {
      id: "bug-8",
      title: "Closure Variable Scope",
      language: "JavaScript",
      difficulty: "Hard",
      description: "All buttons alert '3'. What's the bug?",
      buggyCode: `for (var i = 0; i < 3; i++) {
  document.getElementById('btn' + i)
    .addEventListener('click', function() {
      alert(i);
    });
}

// All buttons alert: 3`,
      options: [
        "Wrong loop counter",
        "var has function scope, use let for block scope",
        "addEventListener syntax error",
        "Alert function is broken"
      ],
      correctAnswer: 1,
      explanation: "var has function scope, so all closures reference the same 'i' which is 3 after the loop. Use 'let i = 0' for block scope, creating a new binding for each iteration.",
      xp: 10
    }
  ];

  const handleAnswer = (challengeId: string, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [challengeId]: answerIndex });
  };

  const checkAnswer = (challenge: Challenge) => {
    const selected = selectedAnswers[challenge.id];
    if (selected === undefined) {
      toast.error("Please select an answer first!");
      return;
    }

    const isCorrect = selected === challenge.correctAnswer;
    setRevealedAnswers({ ...revealedAnswers, [challenge.id]: true });

    if (isCorrect && !revealedAnswers[challenge.id]) {
      setTotalXP(totalXP + challenge.xp);
      toast.success(`Correct! +${challenge.xp} XP`, {
        description: challenge.explanation
      });
    } else if (!isCorrect) {
      toast.error("Incorrect! Try again.", {
        description: challenge.explanation
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Hard": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
<div className="min-h-screen">
  <section className="container mx-auto px-4 pt-28 pb-12">
    <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">

      <div className="inline-flex items-center gap-3 text-destructive justify-center">
        <Bug className="w-10 h-10" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold">BugsKill</h1>

      <p className="text-xl text-muted-foreground">
        Find the bug, earn the XP.
      </p>

      <div className="flex items-center justify-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 w-fit mx-auto mt-4">
        <Trophy className="w-5 h-5 text-primary" />
        <span className="font-bold text-lg">{totalXP} XP</span>
      </div>

      <p className="text-muted-foreground max-w-xl mx-auto pt-4">
        Debug challenges across different languages. Each bug you catch earns you 10 XP!
      </p>

    </div>
  </section>

      <div className="grid gap-6">
        {challenges.map((challenge) => {
          const selected = selectedAnswers[challenge.id];
          const revealed = revealedAnswers[challenge.id];
          const isCorrect = selected === challenge.correctAnswer;

          return (
            <Card key={challenge.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">{challenge.language}</Badge>
                    <Badge variant="secondary">{challenge.xp} XP</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{challenge.buggyCode}</code>
                  </pre>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm">What's the bug?</p>
                  {challenge.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(challenge.id, index)}
                      disabled={revealed}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selected === index
                          ? revealed
                            ? isCorrect
                              ? "bg-green-500/10 border-green-500 text-green-500"
                              : "bg-red-500/10 border-red-500 text-red-500"
                            : "bg-primary/10 border-primary"
                          : revealed && index === challenge.correctAnswer
                          ? "bg-green-500/10 border-green-500 text-green-500"
                          : "bg-card border-border hover:bg-muted"
                      } ${revealed ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-2">
                        {revealed && index === challenge.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        )}
                        {revealed && selected === index && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {!revealed && (
                  <Button onClick={() => checkAnswer(challenge)} className="w-full">
                    Check Answer
                  </Button>
                )}

                {revealed && (
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm font-semibold mb-2">Explanation:</p>
                    <p className="text-sm">{challenge.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BugsKill;
