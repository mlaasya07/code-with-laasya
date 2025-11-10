import { Link } from "react-router-dom";
import { Terminal, Video, FileText, Code2, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const videoSneakPeeks = [
    {
      title: "HTML & CSS Full Course",
      category: "Frontend Basics",
      url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
    },
    {
      title: "React JS - Full Tutorial",
      category: "React",
      url: "https://www.youtube.com/watch?v=x4rFhThSX04",
    },
    {
      title: "Python Full Course",
      category: "Python",
      url: "https://www.youtube.com/watch?v=H2EJuAcrZYU",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Welcome to Code.With.Laasya</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {'>'}_  Code.With.Laasya
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your coding companion — where learning meets practice, and errors become lessons.
          </p>
        </div>
      </section>

      {/* What is CWL Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">What is CWL?</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">Code.With.Laasya (CWL)</span> is an
                all-in-one learning platform designed to help you master coding through curated
                resources, interactive practice, and real-world project ideas.
              </p>
              <p>
                Whether you're debugging your first "Hello World" or building complex applications,
                CWL provides structured learning paths, coding playgrounds, and a treasure trove of
                resources to accelerate your journey.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Aim of CWL */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">The Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            To make coding accessible, practical, and fun by curating the best learning resources,
            providing hands-on practice environments, and turning frustrating errors into valuable
            learning experiences.
          </p>
        </div>
      </section>

      {/* Video Sneak Peek */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Sneak Peek: VideoZone</h2>
            <p className="text-muted-foreground">
              Handpicked tutorials from the best creators on YouTube
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {videoSneakPeeks.map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-lg p-5 hover:border-primary transition-all"
              >
                <Video className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1 text-sm group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">{video.category}</p>
              </a>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button asChild variant="outline">
              <Link to="/archive/videos">Browse Full VideoZone →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Shortcuts */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Quick Access</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/playground/ryc"
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
            >
              <Code2 className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                RYC - Run Your Code
              </h3>
              <p className="text-sm text-muted-foreground">
                Interactive code editor with live preview
              </p>
            </Link>

            <Link
              to="/archive/videos"
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
            >
              <Video className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                VideoZone
              </h3>
              <p className="text-sm text-muted-foreground">
                Curated learning videos organized by topic
              </p>
            </Link>

            <Link
              to="/archive/pdfs"
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all"
            >
              <FileText className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                PDFs & Resources
              </h3>
              <p className="text-sm text-muted-foreground">
                Downloadable guides and presentations
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Bug className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Start Coding?</h2>
          <p className="text-muted-foreground">
            Dive into projects, explore resources, or start debugging with the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/playground/ryc">Start Coding Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/projects">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
