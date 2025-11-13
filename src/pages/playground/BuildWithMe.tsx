import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from "lucide-react";

type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export default function BuildWithMe() {
  const videos: Video[] = [
    {
      id: "v1",
      title: "Build a Minimal To-Do App",
      description:
        "Learn how to create a clean and functional to-do list using React + Tailwind.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "v2",
      title: "Responsive Navbar from Scratch",
      description:
        "Make a modern, mobile-friendly navbar using React Hooks and Tailwind CSS.",
      url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
      id: "v3",
      title: "Intro to ShadCN + UI Magic",
      description:
        "Use ShadCN/UI to design beautiful, consistent UI components for your app.",
      url: "https://www.youtube.com/embed/3fumBcKC6RE",
    },
    {
      id: "v4",
      title: "Build a Simple Portfolio Page",
      description:
        "Create a sleek personal portfolio layout with animation and interactivity.",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Build with Me</h1>
          <p className="text-xl text-muted-foreground">Watch. Learn. Build.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="flex flex-col justify-between hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle className="text-lg">{video.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16 / 9", maxHeight: "200px" }}
                >
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute top-0 left-0 w-full h-full rounded-md border border-border"
                    allowFullScreen
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
// End of file src/pages/playground/BuildWithMe.tsx
