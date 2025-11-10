import { Lightbulb, Sparkles, Circle, Square } from "lucide-react";

const IdeaJournal = () => {
  const ideas = [
    {
      id: 1,
      title: "Emotion-Based Code Formatter",
      concept: "A formatter that changes your code style based on commit message emotions",
      tools: ["TypeScript", "AST Parser", "Sentiment Analysis"],
      status: "draft",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      features: [
        "Angry commits = aggressive spacing",
        "Happy commits = cheerful variable names",
        "Sad commits = depressing but functional code",
      ],
    },
    {
      id: 2,
      title: "Debug Buddy AI",
      concept: "An AI that roasts your code but also helps you fix it",
      tools: ["AI API", "React", "Humor Database"],
      status: "in-progress",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
      features: [
        "Sarcastic error explanations",
        "Gentle nudges toward better practices",
        "Celebrates your small wins",
      ],
    },
    {
      id: 3,
      title: "Pomodoro with Consequences",
      concept: "Timer that donates to charity if you break focus (but makes it fun)",
      tools: ["React", "Stripe", "Push Notifications"],
      status: "completed",
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&h=600&fit=crop",
      features: [
        "Focus sessions with real stakes",
        "Gamified productivity tracking",
        "Charity integration",
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Circle className="w-3 h-3 fill-current" />;
      case "in-progress":
        return <Square className="w-3 h-3 fill-current" />;
      default:
        return <Lightbulb className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <Lightbulb className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Idea Journal</h1>
          <p className="text-xl text-muted-foreground">
            App ideas, half-built experiments, and design notes from the chaos
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-card border border-border rounded overflow-hidden hover:border-primary transition-all group"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex-1">
                    {idea.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${getStatusColor(
                      idea.status
                    )}`}
                  >
                    {getStatusIcon(idea.status)}
                    {idea.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{idea.concept}</p>

                <div>
                  <p className="text-xs font-semibold mb-2 text-primary">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Feature Wishlist:
                  </p>
                  <ul className="space-y-1">
                    {idea.features.map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold mb-2">Tools & Tech:</p>
                  <div className="flex flex-wrap gap-2">
                    {idea.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-16 text-center">
          <div className="bg-card border border-border rounded p-8 space-y-4">
            <Lightbulb className="w-12 h-12 text-primary mx-auto" />
            <p className="text-muted-foreground">
              Got an idea to collaborate on? Let's build something chaotic together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaJournal;
