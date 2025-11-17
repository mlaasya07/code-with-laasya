// src/pages/projects/MiniProjects.tsx
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import miniProjectsData from "@/data/miniProjects.json";

export default function MiniProjects() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold">Mini Projects</h1>
          <p className="text-xl text-muted-foreground">
            Beginner → Advanced mini builds with tutorials.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjectsData.map((project) => (
            <div key={project.id} className="group bg-card border rounded p-6 hover:border-primary transition">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold group-hover:text-primary transition">
                  {project.title}
                </h3>

                <span className={`text-xs px-2 py-1 rounded ${
                  project.difficulty === "Beginner" ? "bg-secondary" :
                  project.difficulty === "Intermediate" ? "bg-accent" :
                  "bg-primary text-primary-foreground"
                }`}>
                  {project.difficulty}
                </span>
              </div>

              <div className="space-y-2 text-sm mt-3">
                <div className="flex gap-2 items-start">
                  <Video className="w-4 h-4 text-primary shrink-0" />
                  <a href={project.videoUrl} target="_blank" className="underline text-muted-foreground hover:text-foreground">
                    Watch Tutorial
                  </a>
                </div>

                <p className="text-muted-foreground">
                  Concepts: {project.concepts.join(", ")}
                </p>

                <p className="text-xs text-muted-foreground">
                  ⏱ Est. Time: {project.estimatedTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
