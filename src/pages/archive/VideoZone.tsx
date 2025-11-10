import { Play, Film, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";

const VideoZone = () => {
  const [openSections, setOpenSections] = useState<string[]>(["coding"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const learnWithMeCategories = [
    {
      id: "coding",
      title: "Coding",
      description: "Language-specific tutorials and best practices",
      subcategories: ["Python", "React", "HTML/CSS/JS"],
      videos: [
        // HTML/CSS/JS
        { id: "hcj1", youtubeId: "G3e-cpL7ofc", title: "HTML & CSS Full Course - Beginner to Pro", duration: "11:00:00", tags: ["HTML", "CSS"] },
        { id: "hcj2", youtubeId: "HGTJBPNC-Gw", title: "HTML & CSS Full Course for free (Bro Code)", duration: "4:00:00", tags: ["HTML", "CSS"] },
        { id: "hcj3", youtubeId: "kAiX0itnonM", title: "HTML, CSS & JavaScript - Build 15 Projects", duration: "9:00:00", tags: ["HTML", "CSS", "JS"] },
        { id: "hcj4", youtubeId: "MBlkKE0GYGg", title: "HTML and CSS For Absolute Beginners | 2024", duration: "2:30:00", tags: ["HTML", "CSS"] },
        { id: "hcj5", youtubeId: "zJSY8tbf_ys", title: "Frontend Web Development Bootcamp Course", duration: "16:00:00", tags: ["HTML", "CSS", "JS"] },
        { id: "hcj6", youtubeId: "EerdGm-ehJQ", title: "JavaScript Full Course - Beginner to Pro (2024)", duration: "12:00:00", tags: ["JavaScript"] },
        { id: "hcj7", youtubeId: "k103bbhTdXY", title: "HTML, CSS, and JavaScript for Web Developers", duration: "40:00:00", tags: ["HTML", "CSS", "JS"] },
        { id: "hcj8", youtubeId: "ii8IHXF6NTw", title: "HTML CSS JAVASCRIPT Full Course", duration: "8:00:00", tags: ["HTML", "CSS", "JS"] },
        { id: "hcj9", youtubeId: "krfUjg0S2uI", title: "Build a Simple Website with HTML, CSS, JavaScript", duration: "3:00:00", tags: ["HTML", "CSS", "JS"] },
        { id: "hcj10", youtubeId: "3-2Pj5hxwrw", title: "Responsive Website Tutorial - HTML CSS JS", duration: "2:00:00", tags: ["HTML", "CSS", "JS"] },
        // React
        { id: "react1", youtubeId: "x4rFhThSX04", title: "Learn React JS - Full Beginner's Tutorial", duration: "12:00:00", tags: ["React"] },
        { id: "react2", youtubeId: "5ZdHfJVAY-s", title: "Build 25 React Projects – Full Tutorial", duration: "9:00:00", tags: ["React"] },
        { id: "react3", youtubeId: "3OqiKTyH4r0", title: "ReactJS Beginner Course 2025 | Become a React Pro", duration: "1:30:00", tags: ["React"] },
        { id: "react4", youtubeId: "qe3mrBmeno8", title: "How to Set Up a React App with Vite", duration: "15:00", tags: ["React", "Vite"] },
        // Python
        { id: "py1", youtubeId: "H2EJuAcrZYU", title: "Python Full Course for Beginners", duration: "4:00:00", tags: ["Python"] },
        { id: "py2", youtubeId: "eWRfhZUzrAc", title: "Python for Beginners – Full Course", duration: "4:30:00", tags: ["Python"] },
        { id: "py3", youtubeId: "ix9cRaBkVe0", title: "Python Full Course for free 🐍 (2024)", duration: "12:00:00", tags: ["Python"] },
        { id: "py4", youtubeId: "kqtD5dpn9C8", title: "Python for Beginners - Learn in 1 Hour", duration: "1:00:00", tags: ["Python"] },
        { id: "py5", youtubeId: "_uQrJ0TkZlc", title: "Programming with Mosh - Python Full Course", duration: "6:00:00", tags: ["Python"] },
        { id: "py6", youtubeId: "8DvywoWv6fI", title: "Python for Everybody (Full University Course)", duration: "14:00:00", tags: ["Python"] },
        { id: "py7", youtubeId: "apACNr7DC_s", title: "Python Projects for Beginners", duration: "3:00:00", tags: ["Python"] },
        { id: "py8", youtubeId: "LHBE6Q9XlzI", title: "Intermediate Python Projects (OOP, APIs, GUI)", duration: "4:00:00", tags: ["Python"] },
      ],
    },
    {
      id: "debugging",
      title: "Debugging",
      description: "Fix bugs like a pro in React and frontend",
      subcategories: ["React", "Frontend"],
      videos: [
        { id: "debug1", youtubeId: "l8knG0BPr-o", title: "How To Debug React Apps Like A Senior Developer", duration: "15:00", tags: ["React", "Debug"] },
        { id: "debug2", youtubeId: "FOXNlZFkbPk", title: "Debug a React App with Visual Studio Code", duration: "10:00", tags: ["React", "Debug"] },
        { id: "debug3", youtubeId: "Y5Ii8zXPPys", title: "Next.js 14+ Debugging - Debug React Hooks", duration: "20:00", tags: ["React", "Debug"] },
        { id: "debug4", youtubeId: "jgJrVoLhVL4", title: "Frontend Debugging Tips Every Engineer Must Follow", duration: "12:00", tags: ["Frontend"] },
        { id: "debug5", youtubeId: "7q0cI4OZlL8", title: "Debugging Python Code in VS Code", duration: "8:00", tags: ["Python", "Debug"] },
      ],
    },
    {
      id: "concepts",
      title: "Concepts",
      description: "Theoretical deep dives across languages",
      subcategories: ["Theory", "Algorithms", "Architecture"],
      videos: [
        { id: "concept1", youtubeId: "Uvx5nsK2n5w", title: "Which Programming Language Should You Learn First?", duration: "10:00", tags: ["Theory"] },
        { id: "concept2", youtubeId: "Hbq3W8y3Q0I", title: "Choosing the Right Tech Stack for Your Project", duration: "15:00", tags: ["Theory"] },
        { id: "concept3", youtubeId: "Ok0bBJPtgJI", title: "Web vs App vs Data Science — Which Path Fits You?", duration: "12:00", tags: ["Theory"] },
        { id: "concept4", youtubeId: "azcrPFhaY9k", title: "How to Think Like a Programmer", duration: "20:00", tags: ["Theory"] },
        { id: "concept5", youtubeId: "dK4Yb6-LxAk", title: "Software Engineering Concepts Explained Simply", duration: "18:00", tags: ["Concepts"] },
        { id: "concept6", youtubeId: "ko8q0yMzDOQ", title: "How to Pick the Right Project to Learn Faster", duration: "14:00", tags: ["Theory"] },
        { id: "concept7", youtubeId: "0EgSo7hsxA0", title: "Code Architecture 101 - Building Large Projects", duration: "25:00", tags: ["Architecture"] },
        { id: "concept8", youtubeId: "UUga4-z7b6s", title: "Folder Structures, Clean Code & Scalability", duration: "22:00", tags: ["Architecture"] },
      ],
    },
  ];

  const otherCategories = [
    {
      title: "Things I Built for Him",
      description: "Emotional coding journey reels",
      videos: [
        {
          id: 3,
          title: "Building a Heartbreak Calculator",
          thumbnail: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&h=450&fit=crop",
          duration: "5:20",
          tags: ["React", "Emotions"],
        },
      ],
    },
    {
      title: "Random Chaos",
      description: "Funny experiments and coding shenanigans",
      videos: [
        {
          id: 4,
          title: "Debugging at 3 AM: A Horror Story",
          thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
          duration: "6:15",
          tags: ["Vlog", "Humor"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Video Zone</h1>
          <p className="text-xl text-muted-foreground">
            Short, cinematic clips documenting the coding journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Learn With Me Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Learn With Me</h2>
              <p className="text-muted-foreground">Mini coding lessons and tutorials</p>
            </div>

            <div className="space-y-4">
              {learnWithMeCategories.map((category) => (
                <Collapsible
                  key={category.id}
                  open={openSections.includes(category.id)}
                  onOpenChange={() => toggleSection(category.id)}
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/5 transition-colors">
                      <div className="text-left">
                        <h3 className="font-bold text-lg">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {category.subcategories.map((sub) => (
                            <span
                              key={sub}
                              className="text-xs bg-secondary px-2 py-1 rounded"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          openSections.includes(category.id) ? "rotate-180" : ""
                        }`}
                      />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="p-6 border-t border-border bg-card/50">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {category.videos.map((video) => (
                              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="group cursor-pointer">
                                  <div className="relative aspect-video bg-muted rounded overflow-hidden">
                                    <iframe
                                      className="w-full h-full"
                                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                      title={video.title}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                  <div className="mt-3 space-y-2">
                                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">
                                      {video.title}
                                    </h4>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                                      {video.tags.map((tag) => (
                                        <span
                                          key={tag}
                                          className="text-xs bg-secondary px-2 py-1 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0" />
                          <CarouselNext className="right-0" />
                        </Carousel>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Other Categories */}
          {otherCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.videos.map((video) => (
                  <div
                    key={video.id}
                    className="group bg-card border border-border rounded overflow-hidden hover:border-primary transition-all cursor-pointer"
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary rounded-full p-4">
                          <Play className="w-8 h-8 text-primary-foreground fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-bold group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-16 text-center">
          <div className="bg-card border border-border rounded p-8 space-y-4">
            <Film className="w-12 h-12 text-primary mx-auto" />
            <p className="text-muted-foreground">
              More videos coming soon... currently editing the chaos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoZone;
