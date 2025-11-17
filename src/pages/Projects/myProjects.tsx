// src/pages/projects/ProjectsPage.tsx

import { ExternalLink, Github, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import arcadexDesktop from "@/assets/projects/arcadex-desktop.png";
import astroraidsDesktop from "@/assets/projects/astroraids-desktop.jpg";
import battleshipDesktop from "@/assets/projects/battleship-desktop.jpg";
import gibberishDesktop from "@/assets/projects/gibberish-desktop.jpg";
import retrosnakeDesktop from "@/assets/projects/retrosnake-desktop.jpg";
import sealyaDesktop from "@/assets/projects/sealya-desktop.png";
import sophistDesktop from "@/assets/projects/sophist-desktop.jpg";
import poetryDesktop from "@/assets/projects/poetry-desktop.png";

const projectCategories = [
  {
    category: "Things I Built for Him",
    description: "There's no him T_T — just passion projects and debug tears.",
    projects: [
      {
        id: 1,
        title: "PAGE-R",
        description: "A page study tool...",
        tags: ["React", "AI assistant", "Data Analysis"],
        image: "/page-r.png",
        liveDemo: null,
        github: "https://github.com/mlaasya07/PAGE-R",
      },
    ],
  },
  {
    category: "Ragebaiting My Best Friend — Chaotic Fun Builds",
    description: "When friendship meets function & food...",
    projects: [
      {
        id: 2,
        title: "RoshiniLovesFood",
        description: "A food-themed project...",
        tags: ["React", "JavaScript", "Humor"],
        image: "/roshnilovesfood.png",
        liveDemo: null,
        github: "https://github.com/mlaasya07/RoshiniLovesFood",
      },
    ],
  },
  {
    category: "Creative Expression",
    description: "When code meets emotions...",
    projects: [
      {
        id: 4,
        title: "404-P03M.3X3",
        description: "Poetry site",
        tags: ["React", "Poetry"],
        image: poetryDesktop,
        liveDemo: "https://404-p03m-3x3.netlify.app/",
        github: "https://github.com/mlaasya07/404-P03M.3X3",
      },
      {
        id: 3,
        title: "ARCADE-X",
        description: "Retro game hub",
        tags: ["JavaScript", "Game Dev"],
        image: arcadexDesktop,
        liveDemo: "https://the-arcadex.netlify.app/",
        github: "https://github.com/mlaasya07/Nostalgic-Game",
      },
      {
        id: 10,
        title: "AstroRaids",
        description: "Space arcade",
        tags: ["JavaScript", "Retro"],
        image: astroraidsDesktop,
        liveDemo: "https://the-arcadex.netlify.app/",
        github: "https://github.com/mlaasya07/Nostalgic-Game",
      },
      {
        id: 11,
        title: "Gibberish Oracle",
        description: "Type nonsense → wisdom",
        tags: ["JavaScript", "Interactive"],
        image: gibberishDesktop,
        liveDemo: "https://the-arcadex.netlify.app/",
        github: "https://github.com/mlaasya07/Nostalgic-Game",
      },
      {
        id: 7,
        title: "Retro Snake Game",
        description: "Modern snake",
        tags: ["React"],
        image: retrosnakeDesktop,
        liveDemo: "https://game-retro-snake.netlify.app/",
        github: "https://github.com/mlaasya07/retro-snake_v2",
      },
      {
        id: 8,
        title: "Sealya",
        description: "Digital diary",
        tags: ["React"],
        image: sealyaDesktop,
        liveDemo: "https://sealya.netlify.app/",
        github: "https://github.com/mlaasya07/Sealya",
      },
      {
        id: 12,
        title: "Subjective Reality - Sophist",
        description: "Rhetoric game",
        tags: ["Game Design"],
        image: sophistDesktop,
        liveDemo: "https://subjective-reality.netlify.app/",
        github: "https://github.com/mlaasya07/Subjective-Reality",
      },
      {
        id: 9,
        title: "BattleshipX",
        description: "Classic battleship",
        tags: ["React"],
        image: battleshipDesktop,
        liveDemo: "https://battleship-replica.netlify.app/",
        github: "https://github.com/mlaasya07/Battleship",
      },
    ],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold">My Projects</h1>
          <p className="text-xl text-muted-foreground">
            Code, chaos & creativity.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {projectCategories.map((cat, i) => (
            <div key={i} className="space-y-8">
              <h2 className="text-3xl font-bold">{cat.category}</h2>
              <p className="text-muted-foreground">{cat.description}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.projects.map((p) => (
                  <div key={p.id} className="group bg-card border rounded overflow-hidden hover:border-primary transition-all">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold group-hover:text-primary transition">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{p.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {p.liveDemo && (
                          <Button asChild size="sm" className="flex-1">
                            <a href={p.liveDemo} target="_blank"><ExternalLink className="w-3 h-3" /> Demo</a>
                          </Button>
                        )}

                        <Button asChild size="sm" variant="outline" className={p.liveDemo ? "flex-1" : "w-full"}>
                          <a href={p.github} target="_blank"><Github className="w-3 h-3" /> Code</a>
                        </Button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
