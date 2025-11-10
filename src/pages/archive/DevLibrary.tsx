import { ExternalLink, Youtube, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevLibrary() {
  const youtubeChannels = [
    { name: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia", description: "Web development tutorials" },
    { name: "freeCodeCamp.org", url: "https://www.youtube.com/@freecodecamp", description: "Free coding education" },
    { name: "The Net Ninja", url: "https://www.youtube.com/@NetNinja", description: "Modern web development" },
    { name: "Web Dev Simplified", url: "https://www.youtube.com/@WebDevSimplified", description: "Simplified web dev concepts" },
    { name: "Fireship", url: "https://www.youtube.com/@Fireship", description: "Fast-paced tech tutorials" },
    { name: "CS Dojo", url: "https://www.youtube.com/@CSDojo", description: "Programming & computer science" },
    { name: "Corey Schafer", url: "https://www.youtube.com/@coreyms", description: "Python & programming tutorials" },
    { name: "Programming with Mosh", url: "https://www.youtube.com/@programmingwithmosh", description: "Professional programming tutorials" },
    { name: "Kevin Powell", url: "https://www.youtube.com/@KevinPowell", description: "CSS master tutorials" },
    { name: "Ben Awad", url: "https://www.youtube.com/@bawad", description: "Full-stack development" },
  ];

  const docsAndCheatSheets = [
    { name: "MDN Web Docs", url: "https://developer.mozilla.org/", description: "Web technologies documentation" },
    { name: "W3Schools", url: "https://www.w3schools.com/", description: "Learn to code tutorials" },
    { name: "DevDocs", url: "https://devdocs.io/", description: "API documentation browser" },
    { name: "CSS-Tricks", url: "https://css-tricks.com/", description: "CSS guides and snippets" },
    { name: "JavaScript.info", url: "https://javascript.info/", description: "Modern JavaScript tutorial" },
    { name: "React Documentation", url: "https://react.dev/", description: "Official React docs" },
    { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", description: "TypeScript documentation" },
    { name: "Python Documentation", url: "https://docs.python.org/3/", description: "Official Python docs" },
    { name: "Git Cheat Sheet", url: "https://education.github.com/git-cheat-sheet-education.pdf", description: "Git command reference" },
    { name: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", description: "Utility-first CSS framework" },
    { name: "Node.js Docs", url: "https://nodejs.org/docs/", description: "Node.js documentation" },
    { name: "SQL Cheat Sheet", url: "https://www.sqltutorial.org/sql-cheat-sheet/", description: "SQL commands reference" },
    { name: "RegEx101", url: "https://regex101.com/", description: "Regular expressions tester" },
    { name: "Can I Use", url: "https://caniuse.com/", description: "Browser compatibility tables" },
    { name: "Roadmap.sh", url: "https://roadmap.sh/", description: "Developer roadmaps" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <FileText className="inline-block w-8 h-8 mr-2" />
            Dev Library
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Curated collection of learning resources, documentation, and tools
          </p>
        </div>

        <div className="space-y-8">
          {/* YouTube Channels Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-primary" />
                YouTube Channels & Links
              </CardTitle>
              <CardDescription>
                Recommended YouTube channels for learning development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {youtubeChannels.map((channel, index) => (
                  <a
                    key={index}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg border border-border md:hover:bg-muted/50 transition-colors touch-manipulation group"
                  >
                    <Youtube className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm md:text-base truncate">
                          {channel.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {channel.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Docs & Cheat Sheets Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Docs & Cheat Sheets
              </CardTitle>
              <CardDescription>
                Documentation, tutorials, and quick reference guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {docsAndCheatSheets.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg border border-border md:hover:bg-muted/50 transition-colors touch-manipulation group"
                  >
                    <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm md:text-base truncate">
                          {doc.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
