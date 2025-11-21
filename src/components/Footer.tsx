import { Github, Linkedin, Mail, Code2, Terminal, Instagram, Globe } from "lucide-react";
import footerQuotesData from "@/data/footerQuotes.json";

const Footer = () => {
  const randomQuote = footerQuotesData[Math.floor(Math.random() * footerQuotesData.length)];

  return (
    <footer className="sticky top-[100vh] border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Quote of the Day - Desktop & Tablet only */}
          <div className="hidden md:block text-center max-w-2xl">
            <p className="text-sm text-muted-foreground italic">
              {randomQuote}
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://aboutme-laasya.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Portfolio Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/mlaasya07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://mlaasya07.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Substack"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="4" width="18" height="16" rx="3" fill="currentColor" />
                <rect x="5" y="8" width="14" height="1.8" fill="hsl(var(--background))" />
                <rect x="5" y="12" width="14" height="1.8" fill="hsl(var(--background))" />
                <rect x="5" y="16" width="14" height="1.8" fill="hsl(var(--background))" />
              </svg>
            </a>
            <a
              href="https://leetcode.com/u/ydHg4pM34m/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LeetCode"
            >
              <Terminal className="w-5 h-5" />
            </a>
            <a
              href="https://www.codingame.com/profile/1926e3967e6d68739783fc04eba77d9a5852966"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="CodinGame"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mlaasya07/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/mlaasya_05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:mlaasy16@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground font-semibold">
              Built with Chaos | © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
