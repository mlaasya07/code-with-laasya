import { BookOpen, Code2, Heart } from "lucide-react";
import { useState } from "react";

const TipsAndTricks = () => {
  const [openTip, setOpenTip] = useState<number | null>(1);

  const tips = [
    {
      id: 1,
      title: "How to read error logs without crying",
      category: "Debugging",
      preview: "Error messages are just your code's way of asking for help",
      content: `First, breathe. Then:
      
1. Read the ENTIRE error message (yes, all of it)
2. Note the file name and line number
3. Google the error type (not the whole message)
4. Check if you're even in the right file
5. console.log() is your best friend
6. Take a break if you're stuck for 20+ minutes

Remember: Every developer, even the pros, still Googles "how to center a div"`,
    },
    {
      id: 2,
      title: "Why semicolons save relationships",
      category: "Best Practices",
      preview: "Consistency is key in code and in life",
      content: `Whether you use semicolons or not, PICK ONE and stick with it.

Your linter will thank you.
Your teammates will thank you.
Your future self will thank you.

Mixed semicolons in a codebase = trust issues.

Pro tip: Configure Prettier and never think about it again.`,
    },
    {
      id: 3,
      title: "The real reason your code isn't working",
      category: "Mindset",
      preview: "You forgot to breathe",
      content: `Seriously though, coding while stressed = more bugs.

Try this:
- Step away from your keyboard
- Drink some water
- Explain the problem out loud (rubber duck debugging)
- Take a 5-minute walk
- Come back with fresh eyes

Your brain needs oxygen to debug. Metaphorically and literally.

Bonus: Your mental health is not a nice-to-have feature.`,
    },
    {
      id: 4,
      title: "Git commit messages that don't lie",
      category: "Git",
      preview: "\"fixed stuff\" is not a commit message",
      content: `Good commit messages = future you being grateful

Bad: "updated code"
Good: "fix: resolved infinite loop in user auth"

Format:
[type]: [what you did]

Types:
- feat: new feature
- fix: bug fix
- refactor: code cleanup
- docs: documentation
- style: formatting

Your future self debugging at 2 AM will appreciate it.`,
    },
    {
      id: 5,
      title: "When to use console.log vs debugger",
      category: "Debugging",
      preview: "Both are valid, fight me",
      content: `console.log():
- Quick checks
- Seeing data flow
- When you're too lazy for breakpoints
- Literally everywhere

debugger;
- Complex logic
- When you need to pause time
- Inspector tools are your friend
- When console.log() betrays you

There's no shame in either. Use what works.`,
    },
  ];

  const commandments = [
    "Read the docs (yes, actually read them)",
    "Save your work. Then save it again.",
    "Test in production is not a vibe",
    "Comments explain why, not what",
    "Your 3 AM code will haunt you",
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Code Survival Guide</h1>
          <p className="text-xl text-muted-foreground">
            Tips & tricks I wish someone told me earlier
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-card border border-border rounded overflow-hidden hover:border-primary transition-colors"
            >
              <button
                onClick={() => setOpenTip(openTip === tip.id ? null : tip.id)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.preview}</p>
                  <span className="inline-block text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {tip.category}
                  </span>
                </div>
                <div
                  className={`text-primary transition-transform ${
                    openTip === tip.id ? "rotate-90" : ""
                  }`}
                >
                  →
                </div>
              </button>

              {openTip === tip.id && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="pt-6 prose prose-invert max-w-none">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 p-4 rounded">
                      {tip.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-secondary/50 border border-border rounded p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Laasya's Coding Commandments</h3>
            </div>
            <ul className="space-y-3">
              {commandments.map((commandment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-muted-foreground">{commandment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipsAndTricks;
