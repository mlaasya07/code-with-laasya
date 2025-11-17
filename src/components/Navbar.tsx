import { Link, useLocation } from "react-router-dom";
import { Terminal, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    {
      label: "ARCHIVE",
      path: null,
      submenu: [
        { label: "VideoZone", path: "/archive/videos" },
        { label: "PDFs & PPTs", path: "/archive/pdfs" },
        { label: "Dev Library", path: "/archive/dev-library" },
      ],
    },
    {
      label: "PLAYGROUND",
      path: null,
      submenu: [
        /* REMOVED ITEMS BECAUSE THEY ARE NO LONGER NEEDED AS THEY DONT MATCH THE AGENDA OF THE WEBAPP
        { label: "RYC - Run Your Code", path: "/playground/ryc" },
        { label: "RYQ - Run Your Query", path: "/playground/ryq" },
        */
        { label: "Build With Me [BWM]", path: "/playground/buildwithme" },
        { label: "Tool Time", path: "/playground/tooltime" },
        { label: "ByteRush", path: "/playground/byterush" },
        { label: "BugsKill", path: "/playground/bugskill" },
      ],
    },
    {
      label: "PROJECTS",
      path: "/projects",
      submenu: null,
    },
    {
      label: "RAGEBAITs",
      path: null,
      submenu: [
        { label: "Error Log", path: "/ragebait/errors" },
        { label: "T⁴: Tips, Tricks, Tech & Tools", path: "/ragebait/tips" },
      ],
    },
  ];

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3">
        {/* Desktop & Tablet Layout (md and up) */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo/Brand - Left */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0 touch-manipulation"
          >
            <Terminal className="w-5 h-5 text-primary group-hover:text-foreground transition-colors" />
            <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
              <span className="group-hover:hidden">CWL</span>
              <span className="hidden group-hover:inline">Code.With.Laasya</span>
            </span>
          </Link>

          {/* Nav Links - Center */}
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/item">
                {item.submenu ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm rounded transition-colors hover:text-foreground hover:bg-card">
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 min-w-[200px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 bg-card border border-border rounded shadow-lg z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === subItem.path
                              ? "bg-primary text-primary-foreground"
                              : "hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    className={`px-3 py-1.5 text-sm rounded transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Empty space for balance - Right */}
          <div className="flex-shrink-0 w-[140px]"></div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo - Centered at top, clickable to toggle menu */}
          <div className="flex justify-center">
            <button 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center gap-2 touch-manipulation py-1"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-tight">CWL</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Nav Grid - 2x2 (collapsible) */}
          {mobileNavOpen && (
          <div className="grid grid-cols-2 gap-2 mt-2 pb-2">
            {/* ARCHIVE */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'ARCHIVE' ? null : 'ARCHIVE')}
                className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs rounded bg-card border border-border touch-manipulation"
              >
                ARCHIVE
                <ChevronDown className="w-3 h-3" />
              </button>
              {openMenu === 'ARCHIVE' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded shadow-lg z-50">
                  {navItems.find(item => item.label === 'ARCHIVE')?.submenu?.map((subItem) => (
                     <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setMobileNavOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs touch-manipulation ${
                        location.pathname === subItem.path ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PLAYGROUND */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === 'PLAYGROUND' ? null : 'PLAYGROUND')}
                className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs rounded bg-card border border-border touch-manipulation"
              >
                PLAYGROUND
                <ChevronDown className="w-3 h-3" />
              </button>
              {openMenu === 'PLAYGROUND' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded shadow-lg z-50">
                  {navItems.find(item => item.label === 'PLAYGROUND')?.submenu?.map((subItem) => (
                     <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setMobileNavOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs touch-manipulation ${
                        location.pathname === subItem.path ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PROJECTS */}
            <Link
              to="/projects"
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center justify-center px-2 py-2 text-xs rounded bg-card border border-border touch-manipulation ${
                location.pathname === '/projects' ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              PROJECTS
            </Link>

            {/* RAGEBAIT - Full width below */}
            <div className="relative col-span-2">
              <button
                onClick={() => setOpenMenu(openMenu === 'RAGEBAITs' ? null : 'RAGEBAITs')}
                className="w-full flex items-center justify-center gap-1 px-2 py-2 text-xs rounded bg-card border border-border touch-manipulation"
              >
                RAGEBAITs
                <ChevronDown className="w-3 h-3" />
              </button>
              {openMenu === 'RAGEBAITs' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded shadow-lg z-50">
                  {navItems.find(item => item.label === 'RAGEBAITs')?.submenu?.map((subItem) => (
                     <Link
                      key={subItem.path}
                      to={subItem.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setMobileNavOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs touch-manipulation ${
                        location.pathname === subItem.path ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
