import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from "lucide-react";
import tools from "@/data/tools.json";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono border border-border">
    {code}
  </pre>
);

export default function ToolTime() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(tools[0]);

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-28 pb-16">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Tool Time</h1>
          <p className="text-xl text-muted-foreground">
            Handy developer tricks, one tool at a time.
          </p>
        </div>

        {/* Timing Label */}
        <div className="text-right mb-6">
          <div className="text-xs text-muted-foreground">~2 mins per tip</div>
        </div>

        {/* Mobile Selector / Desktop Layout */}
        {isMobile ? (
          <div className="space-y-4">
            <Select
              value={active.id.toString()}
              onValueChange={(value) => {
                const tool = tools.find(t => t.id.toString() === value);
                if (tool) setActive(tool);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a tool" />
              </SelectTrigger>
              <SelectContent>
                {tools.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{active.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">💡 {active.tip}</p>
                <CodeBlock code={active.snippet} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Sidebar */}
            <aside className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
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
            <main className="md:col-span-2 space-y-4 sticky top-28">
              <Card>
                <CardHeader>
                  <CardTitle>{active.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">💡 {active.tip}</p>
                  <CodeBlock code={active.snippet} />
                </CardContent>
              </Card>
            </main>
          </div>
        )}
      </section>
    </div>
  );
}
