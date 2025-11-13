import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from "lucide-react"; 
const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono border border-border">
    {code}
  </pre>
);

export default function ToolTime() {
  const tools = [
    {
      id: "git",
      title: "Git Basics",
      tip: "Use git status often to stay aware of changes.",
      snippet: "git add . && git commit -m 'save progress'",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "vscode",
      title: "VSCode Multi-Cursor",
      tip: "Ctrl/Cmd + D selects next matching word.",
      snippet: "// Try it in your editor!",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const [active, setActive] = useState(tools[0]);

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Tool Time</h1>
          <p className="text-xl text-muted-foreground">
            Handy developer tricks, one tool at a time.
          </p>
        </div>

        <div className="text-right mb-6">
          <div className="text-xs text-muted-foreground">~5 mins per tip</div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Sidebar */}
          <aside className="space-y-2">
            {tools.map((t) => (
              <Button
                key={t.id}
                variant={active.id === t.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setActive(t)}
              >
                {t.title}
              </Button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{active.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="aspect-video bg-black rounded overflow-hidden"
                  style={{ maxHeight: "300px" }}
                >
                  <iframe
                    src={active.video}
                    className="w-full h-full"
                    title={active.title}
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-muted-foreground">💡 {active.tip}</p>
                <CodeBlock code={active.snippet} />
                <Button
                  onClick={() => navigator.clipboard.writeText(active.snippet)}
                >
                  Copy Snippet
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </section>
    </div>
  );
}
