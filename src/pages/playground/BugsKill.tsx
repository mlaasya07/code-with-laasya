import React, { useMemo, useState } from "react";
import { Bug, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import raw from "@/data/BugsKill.json";
const challenges = raw as unknown as Challenge[];



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

const PER_PAGE = 4;

const BugsKill: React.FC = () => {
  // --- state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});
  const [totalXP, setTotalXP] = useState(0);

  // UI state
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [expanded, setExpanded] = useState<Record<string, { code: boolean; explanation: boolean }>>({});

  // --- data

  // --- derived lists for filters
  const languages = useMemo(() => {
    const set = new Set(challenges.map((c) => c.language));
    return ["All", ...Array.from(set)];
  }, [challenges]);

  const difficulties = useMemo(() => ["All", "Easy", "Medium", "Hard"], []);

  // --- filtering
  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      if (languageFilter !== "All" && c.language !== languageFilter) return false;
      if (difficultyFilter !== "All" && c.difficulty !== (difficultyFilter as Challenge["difficulty"])) return false;
      return true;
    });
  }, [challenges, languageFilter, difficultyFilter]);

  // --- pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // --- handlers
  const handleAnswer = (challengeId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [challengeId]: answerIndex }));
  };

  const checkAnswer = (challenge: Challenge) => {
    const selected = selectedAnswers[challenge.id];
    if (selected === undefined) {
      toast.error("Please select an answer first!");
      return;
    }

    const isCorrect = selected === challenge.correctAnswer;
    setRevealedAnswers((prev) => ({ ...prev, [challenge.id]: true }));

    if (isCorrect && !revealedAnswers[challenge.id]) {
      setTotalXP((v) => v + challenge.xp);
      toast.success(`Correct! +${challenge.xp} XP`, {
        description: challenge.explanation
      });
    } else if (!isCorrect) {
      toast.error("Incorrect! Try again.", {
        description: challenge.explanation
      });
    }
  };

  const toggleExpandCode = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: { ...(prev[id] || { code: false, explanation: false }), code: !((prev[id] || { code: false }).code) } }));
  };

  const toggleExpandExplanation = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: { ...(prev[id] || { code: false, explanation: false }), explanation: !((prev[id] || { explanation: false }).explanation) } }));
  };

  const gotoPage = (p: number) => {
    const newPage = Math.min(Math.max(1, p), pageCount);
    setPage(newPage);
    // make the list visible at top of viewport (helpful when switching pages)
    const el = document.querySelector("#challenge-list");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <section className="container mx-auto px-4 pt-28 pb-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-3 text-destructive justify-center">
            <Bug className="w-10 h-10" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold">BugsKill</h1>

          <p className="text-lg text-muted-foreground">
            Find the bug, earn the XP.
          </p>

          <div className="flex items-center justify-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border border-primary/20 w-fit mx-auto mt-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">{totalXP} XP</span>
          </div>

          <p className="text-muted-foreground max-w-xl mx-auto pt-2">
            Debug challenges across different languages. Each bug you catch earns you XP!
          </p>
        </div>

        {/* Filters + controls */}
        <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between px-2">
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Language</label>
            <select
              value={languageFilter}
              onChange={(e) => { setLanguageFilter(e.target.value); setPage(1); }}
              className="rounded-md border px-2 py-1 text-sm bg-primary/20 text-primary"
            >
              {languages.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            <label className="text-sm text-muted-foreground">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => { setDifficultyFilter(e.target.value); setPage(1); }}
              className="rounded-md border px-2 py-1 text-sm bg-primary/20 text-primary"
            >
              {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filtered.length}</strong> challenge{filtered.length !== 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => { setLanguageFilter("All"); setDifficultyFilter("All"); setPage(1); }} variant="outline" className="text-sm">Reset</Button>
            </div>
          </div>
        </div>
      </section>

      {/* challenge list */}
      <div id="challenge-list" className="max-w-4xl mx-auto w-full px-2 pb-8">

        <div className="grid gap-6 md:grid-cols-2">
          {pageItems.map((challenge) => {
            const selected = selectedAnswers[challenge.id];
            const revealed = revealedAnswers[challenge.id];
            const isCorrect = selected === challenge.correctAnswer;
            const exp = expanded[challenge.id] || { code: false, explanation: false };

            return (
              <Card key={challenge.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-1 text-sm md:text-base">{challenge.title}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{challenge.description}</CardDescription>
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

                <CardContent className="space-y-3">
                  {/* collapsible code */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">Code</div>
                      <button
                      onClick={() => toggleExpandCode(challenge.id)}
                      className="text-xs px-2 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition"
                      aria-expanded={exp.code}
                    >
                      {exp.code ? "Hide" : "View"}
                    </button>
                    </div>

                    <div
                      className="overflow-hidden transition-[max-height] duration-300 ease-in-out mt-2 rounded-md border border-border bg-secondary/40"
                      style={{ maxHeight: exp.code ? 400 : 0 }}
                    >
                      <pre className="text-xs p-3 overflow-x-auto">
                        <code>{challenge.buggyCode}</code>
                      </pre>
                    </div>
                  </div>

                  {/* options */}
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">What's the bug?</p>
                    {challenge.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(challenge.id, index)}
                        disabled={revealed}
                        className={`w-full text-left p-2 rounded-md border transition-all text-sm ${
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
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          )}
                          {revealed && selected === index && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* action / explanation */}
                  <div>
                    {!revealed ? (
                      
                      <Button onClick={() => checkAnswer(challenge)} className="w-full text-sm">Check Answer</Button>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-green-600">Answered</div>
                          <button
                          onClick={() => toggleExpandExplanation(challenge.id)}
                          className="text-xs px-2 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition"
                          aria-expanded={exp.explanation}
                        >
                          {exp.explanation ? "Hide explanation" : "Show explanation"}
                        </button>
                        </div>

                        <div
                          className="overflow-hidden transition-[max-height] duration-300 ease-in-out mt-2 rounded-md bg-primary/5 border border-primary/20 p-0"
                          style={{ maxHeight: exp.explanation ? 200 : 0 }}
                        >
                          <div className="p-3">
                            <p className="text-sm">{challenge.explanation}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* pagination */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button onClick={() => gotoPage(page - 1)} variant="outline" className="text-sm" disabled={page === 1}>Prev</Button>

            {(() => {
              const maxVisible = 7;
              const pages: (number | string)[] = [];
              
              if (pageCount <= maxVisible) {
                // Show all pages
                for (let i = 1; i <= pageCount; i++) pages.push(i);
              } else {
                // Always show first page
                pages.push(1);
                
                if (page <= 3) {
                  // Near start
                  for (let i = 2; i <= 4; i++) pages.push(i);
                  pages.push('...');
                  pages.push(pageCount);
                } else if (page >= pageCount - 2) {
                  // Near end
                  pages.push('...');
                  for (let i = pageCount - 3; i <= pageCount; i++) pages.push(i);
                } else {
                  // Middle
                  pages.push('...');
                  for (let i = page - 1; i <= page + 1; i++) pages.push(i);
                  pages.push('...');
                  pages.push(pageCount);
                }
              }
              
              return pages.map((p, idx) => {
                if (typeof p === 'string') {
                  return <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>;
                }
                const isActive = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => gotoPage(p)}
                    className={`px-3 py-1 rounded-md text-sm ${isActive ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}
                  >
                    {p}
                  </button>
                );
              });
            })()}

            <Button onClick={() => gotoPage(page + 1)} variant="outline" className="text-sm" disabled={page === pageCount}>Next</Button>
          </div>

          <div className="text-xs text-muted-foreground">Page {page} of {pageCount}</div>
        </div>

        {/* gap before footer */}
        <div className="h-16" />

      </div>
    </div>
  );
};

export default BugsKill;
