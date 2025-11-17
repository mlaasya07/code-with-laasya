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
        { label: "Build-With-Me [BWM]", path: "/playground/buildwithme" },
        { label: "ToolTime", path: "/playground/tooltime" },
        { label: "ByteRush", path: "/playground/byterush" },
        { label: "BugsKill", path: "/playground/bugskill" },
      ],
    },
    {
      label: "PROJECTS",
      path: "null",
      submenu: 
      [
        { label: "Projects", path: "/projects/myprojects" },
        { label: "Mini Projects", path: "/projects/miniprojects" }, 
      ]
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
        <div className="md:hidden bg-background">
          {/* Logo Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center gap-2 touch-manipulation py-1"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-tight">CWL</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  mobileNavOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

  {/* Accordion Menu */}
  {mobileNavOpen && (
    <div className="flex flex-col gap-2 mt-3 pb-4 bg-background">


      {navItems.map((item) => {
        const isOpen = openMenu === item.label;

        return (
          <div key={item.label} className="w-full">
            {/* Parent Button */}
            <button
              onClick={() =>
                setOpenMenu(isOpen ? null : item.label)
              }
              className="w-full flex justify-between items-center px-3 py-2 text-xs rounded bg-card border border-border"
            >
              {item.label}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
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
                    className={`px-4 py-2 text-xs border-t border-border ${
                      location.pathname === subItem.path
                        ? "bg-primary text-primary-foreground"
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
