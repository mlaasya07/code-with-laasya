# Code.With.Laasya - Complete Changelog
## All notable changes to this project will be documented in this file.

--- 

## [2.1.0] - 07-12-2025

### Added
- **Gamification & Engagement**:
  - Daily Streak System with visual counter and bonus XP milestones
  - Achievement notifications with confetti animation (`StreakToast.tsx`)
  - Weekly Challenge feature with special XP rewards
  - "Did You Know?" random coding facts throughout the site

- **Learning Experience**:
  - **Flashcards Section** (`/learn/flashcards`) - Quick syntax/concept flashcards for spaced repetition
  - **Cheat Sheets** (`/learn/cheatsheets`) - Interactive cheat sheets with copy-paste ready snippets
  - **Interview Prep** (`/learn/interview`) - Common coding interview questions with explanations
  - **Learning Paths** (`/learn/paths`) - Structured pathways (HTML → CSS → JS → React) with progress tracking
  - **Code Templates in RYC** - Pre-built starter templates (Blank, Bootstrap, React, Tailwind, Animation)
  - **Bookmark System** - Bookmark videos, PDFs, tools, and quizzes for quick access

- **UI/UX Enhancements**:
  - **Global Search** (Ctrl+K) - Search across videos, PDFs, tools, quizzes, and projects
  - **Keyboard Shortcuts in RYC** - Ctrl+S to save, Ctrl+Enter to run, Ctrl+Shift+R to reset
  - **LEARN section in Navbar** - New navigation category for learning resources

- **Analytics & Stats**:
  - **Activity Heatmap** - GitHub-style contribution calendar on Profile showing daily coding activity
  - **Skill Radar Chart** - Visual breakdown of skills (Frontend, Backend, Debugging, Logic, Database, Tools)
  - Streak tracking with 3-day, 7-day, 30-day milestones

### New Files Created
- src/components/GlobalSearch.tsx
- src/components/StreakToast.tsx
- src/components/ActivityHeatmap.tsx
- src/components/SkillRadar.tsx
- src/pages/learn/Flashcards.tsx
- src/pages/learn/CheatSheets.tsx
- src/pages/learn/InterviewPrep.tsx
- src/pages/learn/LearningPaths.tsx
- src/data/flashcards.json (50+ flashcards across categories)
- src/data/cheatsheets.json (6 language cheat sheets)
- src/data/interviewQuestions.json (30+ interview questions)
- src/data/didYouKnow.json (20 coding facts)
- src/data/learningPaths.json (4 structured paths)
- src/data/weeklyChallenge.json
- src/data/codeTemplates.json (5 starter templates)

### Modified Files
- src/utils/localStorage.ts - Added streak, bookmarks, skills, activity log functions
- src/components/Navbar.tsx - Added LEARN section with dropdown
- src/pages/Profile.tsx - Added Activity Heatmap and Skill Radar
- src/pages/playground/RYC.tsx - Added keyboard shortcuts and template loader
- src/App.tsx - Added new routes and global components

---

## [2.0.3] - 05-12-2025

### Changed
- **RYC Practice Playground** (`src/pages/playground/RYC.tsx`):
  - Preview now opens in a separate browser tab named "code-with-laasya-html-preview"
  - Live updates to the preview tab as you type (300ms debounce)
  - Removed inline iframe preview panel for full-width editor
  - Added `openPreview()` function using window.open()

### Files Modified
- src/pages/playground/RYC.tsx
- CHANGELOG.md

### Functions Changed
- RYC.tsx: Added `previewWindowRef` for window reference
- RYC.tsx: Added `openPreview()` to open/update preview in new tab
- RYC.tsx: Updated live preview useEffect to write to external window
- RYC.tsx: Removed `output` state (no longer using iframe)

---

## [2.0.2] - 05-12-2025

### Changed
- **RYC Practice Playground** (`src/pages/playground/RYC.tsx`):
  - Complete refactor to multi-file editor with separate HTML, CSS, JS tabs
  - Added Tabs component for file switching (index.html, style.css, script.js)
  - Proper code injection: CSS injected into `<head>`, JS injected before `</body>`
  - New localStorage key `ryc-code-files` stores all three file contents
  - Functions like OneCompiler with real multi-file project structure
  - Added file type icons (FileCode, FileType, Braces) for each tab

- **ByteRush** (`src/pages/playground/ByteRush.tsx`):
  - Made each quiz section collapsible and expandable
  - Added Collapsible component wrapping each quiz card
  - CardHeader as CollapsibleTrigger with ChevronDown rotation indicator
  - Added `openQuizzes` state to track expanded/collapsed sections

### Files Modified
- src/pages/playground/RYC.tsx (complete rewrite)
- src/pages/playground/ByteRush.tsx
- CHANGELOG.md
- README.md

### Functions Changed
- RYC.tsx: Removed single `code` state, added `files` state with html/css/js
- RYC.tsx: Added `buildOutput()` to combine files with proper injection
- RYC.tsx: Added `updateFile()` helper for tab-specific updates
- RYC.tsx: Changed storage key from `savedCode` to `ryc-code-files`
- ByteRush.tsx: Added `openQuizzes` state and `toggleQuiz()` function

---

## [2.0.1] - 04-12-2025

### Changed
- **T⁴ Section** (`src/pages/ragebait/T4.tsx`):
  - Minimized buttons for mobile view with smaller text, padding, height, and icons
  - Added responsive `md:` classes for proper scaling

- **PDFs & PPTs** (`src/pages/archive/PDFs.tsx`):
  - Buttons "Preview" and "Download" now always appear at bottom of card in all device views
  - Added `flex flex-col h-full` to Card and `mt-auto pt-0` to CardContent
  - Removed "Last opened" feature and related localStorage logic
  - Added color indicators: yellow for PPTs, red for PDFs (icon and badge)
  - Removed `useIsMobile` hook import and related mobile-specific display logic

- **Mini Projects** (`src/pages/projects/MiniProjects.tsx`):
  - Added difficulty filter system (All, Beginner, Intermediate, Advanced)
  - Filter buttons with visual feedback for active state

### Files Modified
- src/pages/ragebait/T4.tsx
- src/pages/archive/PDFs.tsx
- src/pages/projects/MiniProjects.tsx
- CHANGELOG.md

### Functions Changed
- Removed: `formatRelativeTime()`, `handleOpened()` from PDFs.tsx
- Removed: `lastOpenedMap` state and `useEffect` for localStorage in PDFs.tsx

---

## [2.0.0] - 01-12-2025

### Added
- **Homepage Redesign**: Complete overhaul with beginner/comeback learning paths
  - "Absolute Beginner" path with HTML, CSS, JS basics and first webpage project
  - "Coming Back After a Break" path with syntax refresh and error-fixing exercises
  - Daily Byte challenge preview on homepage
  - "Why This Site Exists" emotional mission statement section
  - Gamification preview showcasing XP rewards

- **Enhanced Gamification System**:
  - New level names: Seed, Sprout, Debugger, Logical Thinker, Junior Builder, Code Adventurer, UI Artisan, API Explorer, Real Programmer™, Code Wizard
  - Three-tier badge system:
    - ✨ Starter Badges: First Step, Tiny Victory, Unbroken Streak
    - 🔥 Progress Badges: Syntax Summoner, Bug Tamer, Knowledge Seeker
    - 💀 Boss Badges: DOM Whisperer, Level Master, Code Wizard
  - Updated XP rewards: Lessons (+20), Daily Bytes (+10), Projects (+30), Boss Challenges (+50), Tips (+5), Bugs (+10), Quizzes (+25)

### Changed
- **Profile Page**: Completely redesigned with new level system and badge display
- **localStorage**: Added comprehensive XP tracking and activity counters
- Updated README.md with new gamification details and homepage features

### Files Modified
- src/pages/Home.tsx - Complete redesign
- src/pages/Profile.tsx - New gamification display
- src/utils/localStorage.ts - Added XP and achievement functions
- README.md - Updated features and achievement system
- CHANGELOG.md - This file

---

## [1.2.2] - 21-11-2025

### Changed
- **PDFViewer** (`src/components/PDFViewer.tsx`):
  - Added swipe gestures for page navigation (mobile only)
  - Made Previous/Next buttons icon-only and smaller on mobile devices
  - Improved touch interaction with dedicated swipe handlers
- **Navbar** (`src/components/Navbar.tsx`):
  - Fixed mobile menu to close when clicking outside the navigation area
  - Added click-outside detection for better mobile UX

### Files Updated
- src/components/PDFViewer.tsx
- src/components/Navbar.tsx
- README.md
- CHANGELOG.md

---

## [1.2.1] - 21-11-2025

### Changed
- Updated README to clarify that RYC = Run Your Code and RYQ = Run Your Query across documentation.
- Adjusted PDFs & PPTs page so "Last opened" tracking uses localStorage only on desktop.
- Added Substack profile icon link to footer social links.
- Improved mobile button layout in PDFs & PPTs actions.
- Fixed intermittent mobile navbar background turning white by refining touch hover handling.

### Files Updated
- src/pages/archive/PDFs.tsx
- src/components/Footer.tsx
- src/index.css
- README.md
- CHANGELOG.md

---
## [1.2.0] - 2025-11-20

### Added
- Profile page with comprehensive progress tracking system
  - XP and level progression with visual progress bar
  - Statistics dashboard (quizzes, projects, streak, bookmarks)
  - Achievement system with unlockable badges
  - Integration with ProgressBar and XPToast components
- Mobile accordion view for Error Logs section for better readability
- Mobile-optimized ToolTime section with Select dropdown
- Code overflow handling in Error Logs with proper text wrapping

### Changed
- Renamed "My Projects" to "Projects" in navigation (files unchanged)
- Renamed Tips.tsx to T4.tsx for T^4 framework (Time, Task, Team, Technology)
- Renamed tips.json to t4.json for consistency
- Improved Error Logs code block display with max-width and word wrapping
- Enhanced responsive design across all device sizes

### Fixed
- Code blocks in Error Logs going out of screen on mobile devices
- Mobile navbar hover background color (changed to muted/50)
- ToolTime mobile view usability

### Removed
- Duplicate T4.json file

---

## [2025-11-19] - Navbar Responsiveness, PDF Viewer & Component Enhancements

### Added
- **Enhanced PDF Viewer Component** (`src/components/PDFViewer.tsx`)
  - Integrated `react-pdf` library for native PDF rendering
  - Page navigation with Previous/Next controls
  - Zoom in/out functionality (0.5x to 2.0x)
  - Responsive page display with loading states
  - Support for both PDF and PPT viewing modes
- **ProgressBar Component** (`src/components/ProgressBar.tsx`)
  - Reusable progress indicator with percentage display
  - Customizable labels and styling
- **XPToast Component** (`src/components/XPToast.tsx`)
  - Centralized toast notifications for XP gains
  - Level-up celebration toasts
  - Achievement unlock notifications
- **Expanded PDF Archive** - Added 5 new programming resources:
  - Programming in C - LPU (285 pages)
  - Introduction to Ada (156 pages)
  - C and MatLab (349 pages)
  - Think C by Allen B. Downey (191 pages)
  - Lecture Notes on C & Data Structures (197 pages)

### Modified
- **Navbar Responsiveness** (`src/components/Navbar.tsx`)
  - Fixed mobile/tablet hover background color (changed from `bg-card` to `bg-muted/50`)
  - Enhanced screen size detection with adaptive font sizes
  - Improved touch targets for mobile devices (minimum 44x44px)
  - Responsive icon sizing: mobile (14-16px), tablet (16-20px), desktop (20-24px)
  - Better spacing and padding across all screen sizes
  - Profile icon hover state now uses proper semantic colors
- **Footer** (`src/components/Footer.tsx`)
  - Added comprehensive social media links (Portfolio, GitHub, LeetCode, CodinGame, LinkedIn, Instagram, Email)
  - Random quote display (desktop/tablet only)
  - Sticky footer positioning with backdrop blur
  - Enhanced icon layout and hover states
- **Error Logs** (`src/pages/ragebait/ErrorLogs.tsx`)
  - Expanded error collection with 12 real-world debugging scenarios
  - Added code examples with before/after comparisons
  - Enhanced error context and lessons learned sections
  - Added debugging commandments list
- **ToolTime** (`src/data/tools.json`)
  - 40 developer tool tips across categories
  - Git, VSCode, Terminal, Chrome DevTools shortcuts
  - NPM, Docker, Bash productivity hacks
  - Enhanced with video tutorial links
- **PDFs Page** (`src/pages/archive/PDFs.tsx`)
  - Updated to use new enhanced PDFViewer component
  - Fixed PDF file paths to match actual uploaded files
  - Improved categorization (Frontend vs Programming)

### Fixed
- Mobile navbar hover background no longer turns white (uses muted/50 with proper transparency)
- PDF file naming conventions aligned with actual uploaded files
- Improved color consistency across all hover states

---

## [2025-11-10 18:45] - Major Cleanup and Data Refactoring

### Removed
- Alternate reading theme (CWL key combo toggle) completely removed from UI
- Storage section removed from navigation and routes
- `src/pages/LocalStorageViewer.tsx` deleted

### Added
- `src/data/dailyBytes.json` - Centralized data file for Daily Byte tips (15 tips)
- `src/data/footerQuotes.json` - Centralized data file for footer quotes (8 quotes)
- `src/data/miniProjects.json` - 20 mini projects with YouTube tutorials (Beginner → Advanced)
- New **Mini Projects** section in Projects page with tutorial links and concepts
  - Tip Calculator, Digital Clock, Quote Generator, Color Flipper, Counter App
  - BMI Calculator, Password Generator, Modal Popup, Stopwatch Timer
  - Rock Paper Scissors, Accordion, Temperature Converter
  - Image Slider, Typing Speed Test, Memory Card Game
  - URL Shortener, Expense Tracker, Drawing App, Snake Game, Chat App

### Modified
- `src/App.tsx` - Now imports Daily Bytes from JSON file
- `src/components/Footer.tsx` - Now imports quotes from JSON file
- `src/components/Navbar.tsx` - Removed Storage link, adjusted mobile layout (RageBait full-width)
- `src/pages/Home.tsx` - Removed alt-theme state and CWL key listener
- `src/pages/Projects.tsx` - Added Mini Projects section with 20 projects in card format
- `src/index.css` - Removed alt-theme styles completely
- `CHANGELOG.md` - This file
- `README.md` - Updated features and folder structure

### Folder Structure
```
src/data/
├── dailyBytes.json (NEW)
├── footerQuotes.json (NEW)
├── miniProjects.json (NEW)
├── lessons.json
├── projects.json
├── quizzes.json
└── tips.json
```

---

## 2025-11-09 - Daily Byte Global Load & Alt Theme Fix

### Modified:
- `src/App.tsx` - Moved Daily Byte logic to global app load with toast notification
- `src/pages/Home.tsx` - Removed Daily Byte section (now loads globally)
- `src/index.css` - Fixed alt-theme text visibility (muted-foreground now light color)
- `CHANGELOG.md` - This file
- `README.md` - Updated feature descriptions

### Fixed:
**Alt Reading Theme Text Visibility:**
- Fixed `--muted-foreground` color in alt-theme from dark (21 8 4) to light (210 40 98)
- All text now visible and readable in alternate reading mode

**Daily Byte Loading:**
- Daily Byte now appears as toast notification on app startup
- Loads globally across all pages, not just Home page
- Displays for 8 seconds at top-center of screen

---

## 2025-11-09 - Offline Mode, Daily Byte, Quote & Alt Theme

### Modified:
- `public/sw.js` (created) - Service worker for offline caching of static content
- `src/main.tsx` - Service worker registration
- `src/components/Navbar.tsx` - Auto-hide nav on mobile after selection
- `src/components/Footer.tsx` - Added random quote display (desktop/tablet only)
- `src/pages/Home.tsx` - Added Daily Byte section and key combo theme switcher
- `src/index.css` - Added `.alt-theme` CSS class with alternate color palette
- `CHANGELOG.md` - This file
- `README.md` - Updated with offline mode and new features

### Added:
**Offline Mode:**
- Service worker caches static content and lessons for offline access
- Caches: lessons, quizzes, tips, projects data

**Daily Byte Section:**
- Random developer tip displayed on Home page load
- 15 rotating tips covering JS, CSS, React, Python, Git, SQL, etc.

**Quote of the Day:**
- Random programming quote in footer (desktop/tablet only, not mobile)
- 8 rotating quotes from famous developers

**Alt Reading Theme:**
- Press "CWL" key combo to toggle alternate color palette
- Color scheme:
  - Background: #0F1108
  - Primary/Buttons: #A63D40
  - Secondary: #4D7C8A
  - Accent: #F7EF99

**Mobile Navbar Enhancement:**
- Nav automatically hides after selecting any link
- Prevents nav overlap with content on mobile

---

## 2025-11-06 - Mobile Navbar Collapsible & Dev Library Addition

### Modified:
- `src/components/Navbar.tsx` - Mobile navbar now collapsible (click CWL to toggle), tablet version restored to full horizontal layout
- `src/pages/LocalStorageViewer.tsx` - Fixed key labels to show LAST-VISIT, STREAK-DAYS, SAVED-CODE
- `src/App.tsx` - Added Dev Library route
- `CHANGELOG.md` - This file
- `README.md` - Updated with Dev Library section

### Created:
- `src/pages/archive/DevLibrary.tsx` - New page with curated YouTube channels and documentation links

### Changes:
**Mobile Navbar Improvements:**
- CWL button now toggles navbar visibility (collapsible menu)
- Clicking CWL opens/closes the 2x2 grid navigation
- ChevronDown icon rotates to indicate open/closed state
- Navbar doesn't cover body content when collapsed
- Tablet (md breakpoint) uses full horizontal layout like desktop

**Dev Library Page:**
- Added under ARCHIVE section
- **YouTube Channels & Links**: 10 curated channels (Traversy Media, freeCodeCamp, The Net Ninja, Web Dev Simplified, Fireship, CS Dojo, Corey Schafer, Programming with Mosh, Kevin Powell, Ben Awad)
- **Docs & Cheat Sheets**: 15 documentation resources (MDN, W3Schools, DevDocs, CSS-Tricks, JavaScript.info, React Docs, TypeScript, Python, Git, Tailwind, Node.js, SQL, RegEx101, Can I Use, Roadmap.sh)
- Simple text + link format with descriptions
- External link icons on hover
- Fully responsive and touch-optimized

**LocalStorage Viewer:**
- Fixed display labels for special keys:
  - `lastVisit` → LAST-VISIT
  - `streak` → STREAK-DAYS
  - `savedCode` → SAVED-CODE

### Current Folder Structure Update:
```
src/pages/archive/
├── DevLibrary.tsx (NEW)
├── VideoZone.tsx
└── PDFs.tsx
```

## 2025-11-06 - Mobile/Tablet Optimization & LocalStorage Viewer

### Modified:
- `src/pages/ragebait/T^4` - Added bookmarked tips filter, mobile-optimized layout, touch-friendly interactions
- `src/components/Navbar.tsx` - Mobile/tablet responsive with single-tap navigation, removed hover effects on touch devices
- `src/index.css` - Added scrollbar hiding, touch manipulation classes, removed hover effects on touch devices
- `src/App.tsx` - Added LocalStorageViewer route
- `CHANGELOG.md` - This file

### Created:
- `src/pages/LocalStorageViewer.tsx` - New page to view, export, import, and clear all localStorage data

### Changes:
**Mobile/Tablet Responsiveness:**
- Removed red text colors (kept only for warning text and icons)
- Added responsive padding, font sizes, and spacing for mobile/tablets
- Implemented touch-manipulation class for better tap targets
- Removed hover effects on touch devices using `@media (hover: none)`
- Added `.scrollbar-hide` class for hidden scrollbars with maintained scroll functionality
- Navbar now uses single-tap for dropdowns on mobile instead of hover
- All buttons and interactive elements optimized for touch

**Tips Section Enhancements:**
- Added "Bookmarked" filter button next to category filters
- Tips now show whether they're bookmarked with filled/unfilled bookmark icons
- Mobile-optimized tip cards with smaller text and padding
- Collapsible tips work with single tap
- Scrollable tips container without visible scrollbar

**LocalStorage Viewer:**
- New `/storage` route in navbar
- Display all localStorage data in organized cards
- Shows data size in bytes and total size in KB
- Export data as JSON backup file
- Import data from JSON file
- Clear all data with confirmation dialog
- Fully responsive for desktop, tablet, and mobile
- All localStorage keys with `codeWithLaasya_` prefix are displayed

### Current Folder Structure Update:
```
src/pages/
├── LocalStorageViewer.tsx (NEW)
├── ragebait/
│   ├── T^4 (UPDATED)
│   └── ErrorLogs.tsx
...
```

## 2025-11-04 - Major Dataset Expansion for RYQ

### Modified:
- `src/pages/playground/RYQ.tsx` - Massively expanded all datasets with comprehensive sample data

### Changes:
**RYQ Dataset Major Expansion:**
- **E-commerce DB**: Expanded users to 20 rows, orders to 20 rows, products remain at 10 rows
- **Library DB**: Expanded books to 20 rows, members to 15 rows, loans to 18 rows
- **School DB**: Expanded students to 15 rows, courses remain at 10 rows, enrollments to 18 rows
- All table previews now display complete datasets (previously fixed `.slice(0, 3)` limitation)
- Enhanced data variety for advanced SQL practice including JOINs, GROUP BY, and aggregate functions
- Added more realistic data patterns for comprehensive query testing scenarios

## 2025-11-04 - Major Feature Updates: RYQ Datasets, T⁴ Notation, PDFs Enhancement, Tools Tips Expansion

### Modified:
- `src/pages/playground/RYQ.tsx` - Added 2 new sample databases (library_db, school_db) with multiple tables each
- `src/components/Navbar.tsx` - Changed T^4 to T⁴ (superscript 4)
- `src/pages/archive/PDFs.tsx` - Removed progress bars, added "last opened" timestamps, removed "coming soon" section
- `src/data/tips.json` - Added 10 new tips in Tools category (tip-31 to tip-40)
- `README.md` - Updated all T^4 references to T⁴, updated RYQ and PDFs feature descriptions
- `CHANGELOG.md` - This file

### Changes:
**RYQ Enhancements:**
- Added **library_db** with tables: books, members, loans
- Added **school_db** with tables: students, courses, enrollments
- Database selector UI with tabs to switch between datasets
- Now supports 3 complete database schemas for SQL practice

**UI/UX Improvements:**
- T⁴ notation now uses proper superscript throughout the app
- PDFs section simplified: removed progress tracking UI
- Added "last opened" information beside document icons
- Removed "coming soon" features card for cleaner interface

**T⁴ Tips Expansion:**
- Added 10 new Tips in **Tools** category:
  - Master Git CLI Commands
  - Chrome DevTools Shortcuts
  - Terminal Basics for Developers
  - Package Managers (npm vs yarn vs pnpm)
  - Postman for API Testing
  - Figma to Code Workflow
  - Regex Testing Tools
  - Code Snippets Save Time
  - Linters Catch Bugs Before Runtime
  - Docker Basics for Developers
- Total tips now: 40 (up from 30)

**Documentation:**
- All references to T^4 updated to T⁴ in README
- RYQ feature description expanded to list all databases
- PDFs section description updated to reflect current features

## 2025-11-03 14:55 - Added Poetry Project Screenshot

### Files Created:
- `src/assets/projects/poetry-desktop.png`

### Modified:
- `src/pages/Projects.tsx` - Updated 404-P03M.3X3 project to use imported image
- `CHANGELOG.md`

### Changes:
- Updated **404-P03M.3X3** (ID: 4) to use imported screenshot from assets

## 2025-11-03 14:50 - Added More Project Screenshots

### Files Created:
- `src/assets/projects/retrosnake-desktop.jpg`
- `src/assets/projects/retrosnake-mobile.jpg`
- `src/assets/projects/sealya-desktop.png`
- `src/assets/projects/sophist-desktop.jpg`

### Modified:
- `src/pages/Projects.tsx` - Updated Retro Snake Game and Sealya to use imported images, added new project "Subjective Reality - Sophist"
- `CHANGELOG.md`

### Changes:
- Updated **Retro Snake Game** (ID: 7) to use imported image
- Updated **Sealya** (ID: 8) to use imported image
- Added **Subjective Reality - Sophist** (ID: 12) - Master the art of persuasion through deception, a rhetoric/philosophy game

## 2025-11-03 14:45 - Added New Project Screenshots & Projects

### Files Created:
- `src/assets/projects/arcadex-desktop.png`
- `src/assets/projects/arcadex-mobile.png`
- `src/assets/projects/astroraids-desktop.jpg`
- `src/assets/projects/astroraids-mobile.jpg`
- `src/assets/projects/battleship-desktop.jpg`
- `src/assets/projects/battleship-mobile.jpg`
- `src/assets/projects/gibberish-desktop.jpg`
- `src/assets/projects/gibberish-mobile.jpg`
- `src/assets/projects/cool-favicon.png`
- `src/assets/projects/heart-icon.png`

### Modified:
- `src/pages/Projects.tsx` - Added new projects (AstroRaids, Gibberish Oracle) to Creative Expression category, updated existing project images to use ES6 module imports from src/assets for better bundling
- `CHANGELOG.md`

### Changes:
- Copied all project screenshots to `src/assets/projects/` folder
- Added **AstroRaids** - Nostalgic space arcade experience (ID: 10)
- Added **Gibberish Oracle** - Chaotic wisdom generator game (ID: 11)
- Updated ARCADE-X, BattleshipX to use imported images from assets
- Improved image handling with proper ES6 imports for optimized bundling and type safety

### Current Folder Structure:
```
src/assets/projects/
├── arcadex-desktop.png
├── arcadex-mobile.png
├── astroraids-desktop.jpg
├── astroraids-mobile.jpg
├── battleship-desktop.jpg
├── battleship-mobile.jpg
├── gibberish-desktop.jpg
├── gibberish-mobile.jpg
├── retrosnake-desktop.jpg
├── retrosnake-mobile.jpg
├── sealya-desktop.png
├── sophist-desktop.jpg
├── cool-favicon.png
└── heart-icon.png
```

## 2025-03-20 - Error Logs Update: Added 5 New Errors & Date Format Change

### Modified
- `src/pages/ragebait/ErrorLogs.tsx` - Added 5 new error entries (Memory Leak, State Update Warning, CSS Specificity, Git Merge Conflicts, Build Failures) with dates 29-10-2025, 30-10-2025, 01-11-2025, 02-11-2025, 03-11-2025. Changed all date formats from yyyy-mm-dd to dd-mm-yyyy. Updated all years from 2024 to 2025.

## 2025-03-20 - Navbar Layout Update, Projects Section & User Selection Fix

### Modified
- `src/components/Navbar.tsx` - Centered main navigation items (Archive, Playground, Projects, Ragebait) using absolute positioning and transform for perfect center alignment

## 2025-03-20 - Projects Section Update & User Selection Fix

### Modified
- `src/pages/Projects.tsx` - Completely updated with detailed personal project categories:
  - "Things I Built for Him": PAGE-R (medical text study tool)
  - "Ragebaiting My Best Friend": RoshiniLovesFood
  - "Creative Expression": 404-P03M.3X3 (poetry), ARCADE-X (games), Retro Snake Game, Sealya (diary), BattleshipX
  - "Upcoming Projects": DocDex (medical PokeDex), Merlot Machine (wine recommendation)
- `src/index.css` - Added CSS rule to make all text unselectable (`user-select: none`) except for buttons, inputs, and textareas for improved UX

### Project Details Updated
- All project images now use custom screenshots instead of placeholder images
- Updated descriptions with actual project purposes
- Added 5 additional projects in Creative Expression category
- Added Merlot Machine to Upcoming Projects

---

## 2025-03-20 - Navigation Fix, Content Enhancement & PDF Integration

### Fixed
- **Navbar dropdowns**: Fixed disappearing dropdown menus by replacing state-based hover with CSS-only `group-hover` pattern for reliable submenu visibility
- **Brand expansion**: Updated CWL to expand inline to "Code.With.Laasya" on hover using `group-hover:hidden` and `hidden group-hover:inline` classes instead of side-attachment

### Added
- **PDFViewer Component** (`src/components/PDFViewer.tsx`): Inline canvas-based PDF viewer with:
  - Page-by-page navigation for PDFs and slide-by-slide for PPTs
  - Zoom controls (50% to 200%)
  - Quick page jump input
  - Loading and error states
  - Text layer and annotation layer rendering
  - Fullscreen overlay that closes with X button
- **Dependencies**: 
  - `react-pdf@latest` - React wrapper for PDF.js
  - `pdfjs-dist@latest` - PDF rendering engine
- **public/pdfs/html-css-complete-reference.pdf**: Complete HTML & CSS reference book (1088 pages)
- **public/pdfs/html-css-basics.pdf**: HTML & CSS basics presentation (45 slides)

### Enhanced
- **ErrorLogs.tsx**: Expanded from 3 to 6 detailed error examples with real-world debugging scenarios:
  - TypeError with map() and optional chaining solutions
  - useEffect infinite loop with dependency array fixes
  - Motivation/mental health (404: Motivation Not Found)
  - CORS policy errors with backend configuration
  - Async/await unhandled promise rejections with try-catch
  - React key prop warnings with proper unique key usage
- **ErrorLogs.tsx**: Added code snippets showing before/after comparisons for each error
- **ErrorLogs.tsx**: Expanded "Debug Commandments" from 5 to 10 practical debugging rules
- **tips.json**: Expanded from 20 to 30 comprehensive tips with detailed explanations:
  - New JavaScript tips: Spread operator, destructuring, optional chaining, nullish coalescing
  - New CSS tips: CSS variables, mobile-first design
  - New tools: VSCode extensions, browser DevTools mastery
  - New database: SQL basics for developers
  - New backend: RESTful API design principles
  - Enhanced all existing tips with more context and examples

### Updated
- **Footer.tsx**: 
  - Portfolio link: `https://aboutme-laasya.netlify.app/`
  - Email: `mlaasy16@gmail.com`
  - Instagram: `mlaasya_05`
- **PDFs.tsx**: Updated with real uploaded PDFs:
  - "HTML & CSS Complete Reference (5th Edition)" - 1088 pages (PDF)
  - "HTML and CSS Basics" - 45 slides (PPT)
  - Functional download and preview buttons

### Added
- **public/pdfs/html-css-complete-reference.pdf**: Complete HTML & CSS reference book
- **public/pdfs/html-css-basics.pdf**: HTML & CSS basics presentation

### Technical Changes
- Removed `useState` for `hoveredMenu` in Navbar (state no longer needed)
- Replaced JavaScript hover handlers with Tailwind `group/item` utilities
- Set dropdown opacity/visibility with CSS transitions for smooth UX
- Updated error log entries with realistic code examples and fixes

### Files Modified
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/ragebait/ErrorLogs.tsx`
- `src/data/tips.json`
- `src/pages/archive/PDFs.tsx`
- `CHANGELOG.md`

### Files Added
- `public/pdfs/html-css-complete-reference.pdf`
- `public/pdfs/html-css-basics.pdf`

---

## 2025-10-22 - Major Navigation Restructure & Content Reorganization

### Navigation & Structure Changes
- **Complete navbar redesign** with hover-based dropdown menus
- **New route structure**:
  - `/` → Home (Code.With.Laasya intro page)
  - `/archive/videos` → VideoZone (formerly `/videos`)
  - `/archive/pdfs` → PDFs & PPTs (new page)
  - `/playground/ryc` → Run Your Code (formerly `/practice`)
  - `/playground/ryq` → Run Your Query (new SQL playground)
  - `/projects` → Projects (unchanged)
  - `/ragebait/errors` → Error Logs (formerly `/errors`)
  - `/ragebait/tips` → Tips, Tricks, Tech & Tools (formerly `/tips`)

### New Components
- **Navbar** (`src/components/Navbar.tsx`): 
  - Hover-based dropdowns for Archive, Playground, and RageBait
  - "CWL" brand that expands to "Code.With.Laasya" on hover
  - Mobile-responsive with proper submenu handling
  - Sticky positioning with backdrop blur

- **Footer** (`src/components/Footer.tsx`):
  - Updated text to "Built with Chaos"
  - Added portfolio website link
  - Sticky footer positioning
  - All social icons (Portfolio, GitHub, LeetCode, CodinGame, LinkedIn, Instagram, Email)

### New Pages Created
1. **Home** (`src/pages/Home.tsx`):
   - Introduction to Code.With.Laasya
   - "What is CWL?" and "The Mission" sections
   - Video sneak peeks from VideoZone
   - Quick access shortcuts to RYC, VideoZone, and PDFs
   - Call-to-action for getting started

2. **PDFs & PPTs** (`src/pages/archive/PDFs.tsx`):
   - Resource library with progress tracking placeholders
   - Categories: Frontend, JavaScript, React, Python, Database, Tools
   - Preview and download functionality (coming soon)
   - Future features: Canvas view, highlighting, bookmarking

3. **RYQ - Run Your Query** (`src/pages/playground/RYQ.tsx`):
   - SQL query playground with sample e-commerce database
   - 3 tables: users, orders, products
   - Query history with undo/redo functionality
   - Live query execution simulation
   - Database schema browser with sample data preview

### File Reorganization
- Moved `/pages/VideoZone.tsx` → `/pages/archive/VideoZone.tsx`
- Moved `/pages/Practice.tsx` → `/pages/playground/RYC.tsx`
- Moved `/pages/ErrorLogs.tsx` → `/pages/ragebait/ErrorLogs.tsx`
- Moved `/pages/EnhancedT^4` → `/pages/ragebait/T^4`

### Design Updates
- Maintained existing color palette (crimson red, golden yellow, black background)
- Consistent use of Roboto Mono font
- Sticky navbar and footer
- Mobile-responsive throughout
- Hover effects and smooth transitions on all interactive elements

## 2025-01-XX - Complete Platform Transformation to Gamified Learning System

### Major Features Added
- **Gamified Learning System**: Full XP, levels, streaks, and achievements
- **Flow-Based Learning**: Structured lesson progression with video tutorials
- **Practice Playground**: Live code editor with HTML/CSS/JS preview
- **Interactive Quizzes**: Knowledge testing with bug challenges
- **Progress Tracking**: Comprehensive stats and achievement system
- **localStorage Integration**: All progress saved locally (no backend needed)

### New Pages Created
1. **Dashboard** (`src/pages/Dashboard.tsx`)
   - Replaced Home page with gamified dashboard
   - Stats overview (XP, Level, Streak, Lessons)
   - "Continue Learning" card with next lesson
   - Tip of the Day feature
   - Quick action cards (Practice, Quiz, Progress)
   - Recent videos section

2. **Learning Flow** (`src/pages/LearningFlow.tsx`)
   - 10 structured lessons with video embeds
   - Practice code snippets for each lesson
   - Category filters (Frontend, Backend, Debugging)
   - Mark complete functionality with XP rewards
   - Progress tracking bar
   - Auto-scroll to specific lessons via URL params

3. **Practice Playground** (`src/pages/Practice.tsx`)
   - Live code editor (HTML/CSS/JS)
   - Real-time preview in iframe
   - Save/Load/Reset functionality
   - All code saved to localStorage
   - Tips section for best practices

4. **Quiz System** (`src/pages/Quiz.tsx`)
   - 7 quizzes covering HTML, CSS, JS, React, Python
   - Bug finding challenges with code snippets
   - Real-time scoring and feedback
   - XP rewards for passing (≥50%)
   - Difficulty badges (Easy, Medium, Hard)
   - Retake functionality

5. **Progress Page** (`src/pages/Progress.tsx`)
   - Comprehensive stats dashboard
   - XP, Level, Streak, Lessons, Quizzes tracking
   - Achievement showcase (12 total achievements)
   - Locked achievements preview
   - Export/Import progress (JSON backup)
   - localStorage warning banner

6. **Enhanced Tips** (`src/pages/EnhancedT^4`)
   - 20 coding tips with categories
   - Bookmark system (saved to localStorage)
   - Random tip generator
   - Category filters (Debugging, CSS, JS, React, Python, Git, Tools, General)
   - Collapsible tip cards

### Data Files Created
- `src/data/lessons.json`: 10 curated lessons with video URLs
- `src/data/quizzes.json`: 7 quizzes with questions and bug challenges
- `src/data/tips.json`: 20 coding tips and best practices
- `src/data/projects.json`: 8 project ideas with difficulty levels

### Utility Files Created
- `src/utils/localStorage.ts`: Complete localStorage management system
  - Keys: `codeWithLaasya_xp`, `_streak`, `_completedLessons`, `_completedQuizzes`, `_bookmarks`, `_savedCode`, `_achievements`
  - Functions: getXP, addXP, completeLesson, updateStreak, bookmarks, export/import
  
- `src/utils/gamification.ts`: XP and achievement logic
  - Level calculation (1 level = 100 XP)
  - 12 achievements with unlock conditions
  - Progress tracking and stats generation

### Components Created
- `src/components/XPToast.tsx`: Toast notifications for XP gains, level ups, achievements
- `src/components/ProgressBar.tsx`: Reusable progress bar with percentage display

### Navigation Updates
- **Navbar** (`src/components/Navbar.tsx`): Updated links
  - Old: home, projects, errors, videos, ideas, tips
  - New: dashboard, learn, practice, quiz, progress, tips
  
### App.tsx Route Changes
- `/` → Dashboard (was Home)
- `/learn` → Learning Flow (new)
- `/practice` → Practice Playground (new)
- `/quiz` → Quiz System (new)
- `/progress` → Progress Tracking (new)
- `/tips` → Enhanced Tips (upgraded)

### Design System
- Maintained existing color palette (HSL format)
- Primary: `hsl(4 86% 31%)` - Crimson red
- Foreground: `hsl(51 74% 56%)` - Golden yellow
- Background: `hsl(0 0% 0%)` - Black
- Font: Roboto Mono (monospace)
- Terminal glow effects on headings

### localStorage Keys Used
```
codeWithLaasya_xp
codeWithLaasya_streak
codeWithLaasya_lastVisit
codeWithLaasya_completedLessons
codeWithLaasya_completedQuizzes
codeWithLaasya_bookmarks
codeWithLaasya_savedCode
codeWithLaasya_achievements
```

### Achievements System (12 Total)
1. First Steps - Complete 1 lesson
2. Getting Started - Complete 5 lessons
3. Dedicated Learner - Complete 10 lessons
4. Century Club - Earn 100 XP
5. XP Champion - Earn 500 XP
6. XP Legend - Earn 1000 XP
7. Consistent - 3-day streak
8. Week Warrior - 7-day streak
9. Unstoppable - 30-day streak
10. Quiz Master - Complete 5 quizzes
11. Level 5 - Reach level 5
12. Level 10 - Reach level 10

### Features
- ✅ XP System (10-15 XP per lesson, 5-10 XP per quiz)
- ✅ Level System (100 XP = 1 level)
- ✅ Daily Streak Tracking
- ✅ Lesson Completion Tracking
- ✅ Quiz Scoring with Pass/Fail
- ✅ Achievement Unlocking
- ✅ Bookmark System for Tips
- ✅ Code Playground with Save/Load
- ✅ Progress Export/Import (JSON)
- ✅ Toast Notifications (XP, Level Up, Achievements)
- ✅ Category Filtering (Lessons, Tips)
- ✅ Random Tip Generator
- ✅ localStorage Warning Banner
- ✅ Responsive Design (Mobile-first)

### Initial Setup
- Project initialized with React + TypeScript + Vite
- Tailwind CSS configured with custom color palette
- Favicon/Logo updated to custom CWL.png icon
- YouTube video links added to all-yt-links.txt
- Video Zone populated with learning resources
- index.html title changed to "Code.With.Laasya"

### Technical Stack
- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Lucide React Icons
- React Router DOM
- localStorage API (no backend)

### Notes
- All progress stored client-side
- No authentication required
- Works offline after initial load
- Export/Import for data portability
- Compatible with all modern browsers
- Mobile responsive throughout

---
**Total Files Modified**: 15+
**Total Files Created**: 20+
**Lines of Code Added**: ~3000+
