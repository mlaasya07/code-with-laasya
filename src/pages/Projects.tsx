//backup projects + mini projects page
import { ExternalLink, Github, Tag, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import miniProjectsData from "@/data/miniProjects.json";
import arcadexDesktop from "@/assets/projects/arcadex-desktop.png";
import astroraidsDesktop from "@/assets/projects/astroraids-desktop.jpg";
import battleshipDesktop from "@/assets/projects/battleship-desktop.jpg";
import gibberishDesktop from "@/assets/projects/gibberish-desktop.jpg";
import retrosnakeDesktop from "@/assets/projects/retrosnake-desktop.jpg";
import sealyaDesktop from "@/assets/projects/sealya-desktop.png";
import sophistDesktop from "@/assets/projects/sophist-desktop.jpg";
import poetryDesktop from "@/assets/projects/poetry-desktop.png";

const Projects = () => {
  const projectCategories = [
    {
      category: "Things I Built for Him",
      description: "There's no him T_T — just passion projects and debug tears.",
      projects: [
        {
          id: 1,
          title: "PAGE-R",
          description: "A page study tool that breaks down complex medical texts into simpler, digestible parts",
          tags: ["React", "AI assistant", "Data Analysis"],
          image: "/page-r.png",
          liveDemo: null,
          github: "https://github.com/mlaasya07/PAGE-R",
        },
      ],
    },
    {
      category: "Ragebaiting My Best Friend — Chaotic Fun Builds",
      description: "When friendship meets function & food... and a little bit of trolling.",
      projects: [
        {
          id: 2,
          title: "RoshiniLovesFood",
          description: "A food-themed project built to roast my best friend's eating habits",
          tags: ["React", "JavaScript", "Humor"],
          image: "/roshnilovesfood.png",
          liveDemo: null,
          github: "https://github.com/mlaasya07/RoshiniLovesFood",
        },
      ],
    },
    {
      category: "Creative Expression",
      description: "When code meets emotions and poetry flows through the terminal.",
      projects: [
        {
          id: 4,
          title: "404-P03M.3X3",
          description: "A website for my poetry and fun-hubs — where words get debugged",
          tags: ["React", "Poetry", "Creative"],
          image: poetryDesktop,
          liveDemo: "https://404-p03m-3x3.netlify.app/",
          github: "https://github.com/mlaasya07/404-P03M.3X3",
        },
        {
          id: 3,
          title: "ARCADE-X",
          description: "A collection of nostalgic games I've developed — where retro meets code",
          tags: ["JavaScript", "Game Dev", "HTML5"],
          image: arcadexDesktop,
          liveDemo: "https://the-arcadex.netlify.app/",
          github: "https://github.com/mlaasya07/Nostalgic-Game",
        },
        {
          id: 10,
          title: "AstroRaids",
          description: "Nostalgic space arcade experience combining Brick Breaker and Space Invaders",
          tags: ["JavaScript", "Game Dev", "Retro"],
          image: astroraidsDesktop,
          liveDemo: "https://the-arcadex.netlify.app/",
          github: "https://github.com/mlaasya07/Nostalgic-Game",
        },
        {
          id: 11,
          title: "Gibberish Oracle",
          description: "Type nonsense and receive enlightenment — a chaotic wisdom generator",
          tags: ["JavaScript", "Interactive", "Humor"],
          image: gibberishDesktop,
          liveDemo: "https://the-arcadex.netlify.app/",
          github: "https://github.com/mlaasya07/Nostalgic-Game",
        },
        { 
          id: 7,
          title: "Retro Snake Game",
          description: "Nostalgic snake game with a modern twist",
          tags: ["React", "Tailwind CSS", "Nostalgia"],
          image: retrosnakeDesktop,
          liveDemo: "https://game-retro-snake.netlify.app/",
          github: "https://github.com/mlaasya07/retro-snake_v2",
        },
        {
          id: 8,
          title: "Sealya",
          description: "Your Personal Digital Diary with a Splash of Whimsy",
          tags: ["React", "Local Storage", "Creativity"],
          image: sealyaDesktop,
          liveDemo: "https://sealya.netlify.app/",
          github: "https://github.com/mlaasya07/Sealya",
        },
        {
          id: 12,
          title: "Subjective Reality - Sophist",
          description: "Master the art of persuasion through deception — a rhetoric game",
          tags: ["Game Design", "Philosophy", "Interactive"],
          image: sophistDesktop,
          liveDemo: "https://subjective-reality.netlify.app/",
          github: "https://github.com/mlaasya07/Subjective-Reality",
        },
        {
          id: 9,
          title: "BattleshipX",
          description: "A digital adaptation of the classic Battleship game",
          tags: ["React", "Game Dev", "Nostalgia"],
          image: battleshipDesktop,
          liveDemo: "https://battleship-replica.netlify.app/",
          github: "https://github.com/mlaasya07/Battleship",
        }
      ],
    },
    {
      category: "Upcoming Projects",
      description: "Currently in debug mode... stay tuned.",
      projects: [
        {
          id: 5,
          title: "Docere MedDex - DocDex",
          description: "Your Pocket Medical PokeDex — catching diagnoses instead of Pokémon",
          tags: ["React", "Healthcare", "AI"],
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
          liveDemo: null,
          github: "https://github.com/mlaasya07/DocDex-v1",
        },
        {
          id: 6,
          title: "Merlot Machine",
          description: "Age-approved wine recommendation app for the discerning (and thirsty) user",
          tags: ["AI", "Healthcare", "Chatbot"],
          image: "https://images.unsplash.com/photo-1581093588401-8b4a3f1d0e3b?w=800&h=600&fit=crop",
          liveDemo: null,
          github: "https://github.com/mlaasya07/Merlot-Machine",
        },
      ],
      
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold">My Projects</h1>
          <p className="text-xl text-muted-foreground">
            Code, chaos, and creative experiments — all documented with brutal honesty.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {projectCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">{category.category}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-card border border-border rounded overflow-hidden hover:border-primary transition-all"
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {project.liveDemo && (
                          <Button asChild size="sm" className="flex-1 gap-2">
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button 
                          asChild 
                          size="sm" 
                          variant="outline" 
                          className={project.liveDemo ? "flex-1 gap-2" : "w-full gap-2"}
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mini Projects Section */}
        <div className="max-w-6xl mx-auto mt-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Mini Projects — From Beginner to Advanced</h2>
            <p className="text-muted-foreground">
              Static list of beginner → advanced mini projects with YouTube tutorials and expected outputs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniProjectsData.map((project) => (
              <div
                key={project.id}
                className="group bg-card border border-border rounded p-6 hover:border-primary transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    💻 {project.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.difficulty === "Beginner" 
                      ? "bg-secondary text-secondary-foreground" 
                      : project.difficulty === "Intermediate"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <a 
                      href={project.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors underline"
                    >
                      Watch Tutorial
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground shrink-0">🧠</span>
                    <span className="text-muted-foreground">
                      Concepts: {project.concepts.join(", ")}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    ⏱ Est. Time: {project.estimatedTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 text-center">
          <div className="bg-card border border-border rounded p-8">
            <p className="text-muted-foreground italic">
              More projects brewing in the pipeline... currently wrestling with merge conflicts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
