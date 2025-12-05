import { Link, useLocation } from "react-router-dom";
import { Terminal, ChevronDown, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    {
      label: "ARCHIVE",
      path: null,
      submenu: [
        { label: "VideoZone", path: "/archive/VideoZone" },
        { label: "PDFs & PPTs", path: "/archive/pdfs" },
        { label: "Dev Library", path: "/archive/dev-library" },
      ],
    },
    {
      label: "PLAYGROUND",
      path: null,
      submenu: [
        { label: "Build-With-Me [BWM]", path: "/playground/buildwithme" },
        { label: "ToolTime", path: "/playground/tooltime" },
        { label: "ByteRush", path: "/playground/byterush" },
        { label: "BugsKill", path: "/playground/bugskill" },
      ],
    },
    {
      label: "PROJECTS",
      path: null,
      submenu: [
        { label: "Projects", path: "/projects/myprojects" },
        { label: "Mini Projects", path: "/projects/miniprojects" },
      ],
    },
    {
      label: "RAGEBAITs",
      path: null,
      submenu: [
        { label: "Error Log", path: "/ragebait/errors" },
        { label: "T⁴: Tips, Tricks, Tech & Tools", path: "/ragebait/t4" },
      ],
    },
  ];

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-2.5 md:py-3">
        {/* Desktop & Tablet Layout (md and up) */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Logo/Brand - Left */}
          <Link
            to="/"
            className="flex items-center gap-2 group flex-shrink-0 touch-manipulation"
          >
            <Terminal className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary group-hover:text-foreground transition-colors" />
            <span className="text-xs md:text-sm lg:text-base font-semibold tracking-tight whitespace-nowrap">
              <span className="group-hover:hidden">CWL</span>
              <span className="hidden group-hover:inline">Code.With.Laasya</span>
            </span>
          </Link>

          {/* Nav Links - Center */}
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="relative group/item">
                {item.submenu ? (
                  <>
                    <button className="flex items-center gap-1 px-2 md:px-2.5 lg:px-3 py-1 md:py-1.5 text-xs md:text-sm lg:text-base rounded transition-colors hover:text-foreground hover:bg-muted/50">
                      {item.label}
                      <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 min-w-[180px] md:min-w-[200px] lg:min-w-[220px] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 bg-card border border-border rounded shadow-lg z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm lg:text-base transition-colors ${
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
                    className={`px-2 md:px-2.5 lg:px-3 py-1 md:py-1.5 text-xs md:text-sm lg:text-base rounded transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Profile Icon - Right */}
          <Link
            to="/profile"
            className="flex-shrink-0 p-1.5 md:p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Profile"
          >
            <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>

        {/* Mobile & Small Tablet Layout (below md) */}
        <div className="md:hidden bg-background">
          {/* Header Row: Logo + Profile */}
          <div className="flex items-center justify-between">
            {/* Logo Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center gap-1.5 sm:gap-2 touch-manipulation py-1"
            >
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold tracking-tight">CWL</span>
              <ChevronDown
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform ${
                  mobileNavOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Icon */}
            <Link
              to="/profile"
              className="p-1.5 sm:p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Profile"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Accordion Menu */}
          {mobileNavOpen && (
            <div className="flex flex-col gap-1.5 sm:gap-2 mt-2 sm:mt-3 pb-3 sm:pb-4 bg-background">
              {navItems.map((item) => {
                const isOpen = openMenu === item.label;

                return (
                  <div key={item.label} className="w-full">
                    {/* Parent Button */}
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : item.label)}
                      className="w-full flex justify-between items-center px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs rounded bg-card border border-border"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu */}
                    {isOpen && item.submenu && (
                      <div className="flex flex-col bg-card border border-border border-t-0 rounded-b">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => {
                              setOpenMenu(null);
                              setMobileNavOpen(false);
                            }}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs border-t border-border ${
                              location.pathname === subItem.path
                                ? "bg-primary text-primary-foreground font-medium"
                                : "hover:bg-muted"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
