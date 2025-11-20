# Code.With.Laasya (CWL)

**An interactive, gamified learning platform for aspiring developers**

Code.With.Laasya is a student-friendly web application designed to make coding education engaging, interactive, and fun. Built with a dev-style aesthetic, it provides structured learning paths, hands-on practice playgrounds, and gamification elements to keep learners motivated.

---

## 🎯 Project Mission

To create an accessible, interactive learning environment where students can:
- Learn coding fundamentals through structured video lessons
- Practice code in real-time with instant feedback
- Test knowledge through interactive quizzes
- Track progress with XP, levels, and achievements
- Access curated resources, tips, and debugging guides

---

## ✨ Core Features

## 📝 Features

- **Home**: Landing page with introduction and daily coding bytes
- **Archive**: Collection of resources including videos, PDFs, and development library
- **Playground**: Interactive coding exercises and challenges
  - Run Your Code (RYC)
  - Run Your Quiz (RYQ)
  - Build With Me
  - Tool Time - Development tools collection with mobile-optimized view
  - Byte Rush - Quick coding challenges
  - Bugs Kill - Debug practice exercises
- **Projects**: 
  - Projects - Personal projects showcase
  - Mini Projects - Collection of smaller projects
- **Ragebait**: 
  - Error Logs - Real debugging experiences with solutions (mobile accordion view)
  - T^4 Tips - Time, Task, Team, and Technology tips
- **Profile**: Comprehensive user profile with XP tracking, level progression, achievements, and statistics

## 🎯 Components

### UI Components (Shadcn)
The project uses a comprehensive set of Shadcn UI components including:
- Accordion, Alert Dialog, Avatar, Badge
- Button, Card, Calendar, Carousel
- Checkbox, Collapsible, Command, Context Menu
- Dialog, Drawer, Dropdown Menu
- Form, Hover Card, Input, Label
- Menubar, Navigation Menu
- Pagination, Popover, Progress
- Radio Group, Scroll Area, Select
- Separator, Sheet, Sidebar, Skeleton
- Slider, Switch, Table, Tabs
- Textarea, Toast, Toggle, Tooltip

### Custom Components
- **Navbar**: Fully responsive navigation with device-specific sizing and mobile menu
- **Footer**: Dynamic footer with rotating quotes
- **NavLink**: Custom navigation link component
- **PDFViewer**: Interactive PDF viewer with page navigation
- **ProgressBar**: Gamified progress tracking component
- **XPToast**: Experience points notification component

### 🛠️ Practice Playgrounds
- **RYC (Run Your Code)**: Live HTML/CSS/JS editor with instant preview
- **RYQ (Run Your Query)**: SQL playground with multiple sample databases
  - E-commerce database (10 users, 12 orders, 10 products)
  - Library management system (10 books, 10 members, 11 loans)
  - School management system (10 students, 10 courses, 12 enrollments)
  - Rich datasets with 10+ rows per table for comprehensive SQL practice
- Save/Load/Reset functionality
- Syntax highlighting and error detection
- Undo/Redo query history

### 📝 Interactive Quizzes
- Multiple-choice questions on HTML, CSS, JS, React, Python
- Bug-finding challenges with code snippets
- Instant scoring and feedback
- XP rewards for passing (≥50%)
- Difficulty badges (Easy, Medium, Hard)

### 📊 Progress Dashboard
- View XP, Level, Streak, and Completed Lessons
- Achievement showcase with locked/unlocked states
- Export/Import progress data (JSON format)
- Visual progress bars and stats

### 💡 Tips & Tricks (T⁴)
- 40 curated coding tips across multiple categories
- Debugging, CSS, JavaScript, React, Python, Git, Tools, Database, Backend, General
- Bookmark system for favorite tips with dedicated bookmarked filter
- Random tip generator
- Category filters
- 12 Tools-specific tips covering Git, DevTools, Terminal, Docker, and more
- Mobile/tablet optimized with touch-friendly interactions

### 🚀 Mini Projects Section
- **20 curated beginner → advanced projects** with YouTube tutorial links
- Organized by difficulty: Beginner, Intermediate, Advanced
- Each project includes:
  - Video tutorial link
  - Key concepts covered (DOM, APIs, Canvas, etc.)
  - Estimated time to complete
  - Difficulty badge
- Projects range from Tip Calculator to Snake Game and Chat Applications

### 📚 Archive Section
- **VideoZone**: Curated YouTube playlists organized by topic
  - Conceptual learning
  - Tech & Tools tutorials
  - Resources & APIs
  - Debugging guides
  - Database fundamentals
- **PDFs & PPTs**: Educational resources with enhanced PDF viewer
  - 9 programming resources (HTML/CSS, C, Ada, MatLab, Data Structures)
  - Native PDF rendering with react-pdf
  - Page navigation and zoom controls (0.5x - 2.0x)
  - Last opened tracking
  - Download and preview options
  - Categorized by Frontend and Programming
- **Dev Library**: Curated collection of learning resources
  - 10 YouTube channels (Traversy Media, freeCodeCamp, The Net Ninja, etc.)
  - 15 documentation sites and cheat sheets (MDN, W3Schools, DevDocs, etc.)
  - Simple text + link format with descriptions

### 🐛 RageBait Section
- **Error Logs**: 12 real debugging stories with code examples
  - TypeError, Infinite Loops, CORS errors, and more
  - Before/after code comparisons
  - Lessons learned and debugging commandments
- **T⁴ (Tips, Tricks, Tech & Tools)**: 40 curated developer tips
  - Debugging, CSS, JavaScript, React, Python, Git, Tools, Database, Backend
  - Bookmark system with category filters
- **ToolTime**: 40 developer productivity tips
  - Git workflows and shortcuts
  - VSCode productivity hacks
  - Terminal and Bash shortcuts
  - Chrome DevTools techniques
  - Docker, NPM, and JSON utilities

---

## 🎨 Design Philosophy

- **Font**: Roboto Mono (monospace for dev aesthetic)
- **Color Palette**: Crimson red primary, golden yellow accents, black background
- **Visual Style**: Techy + fun, "learn with energy"
- **UI Elements**: Rounded buttons, gradient highlights, soft glassmorphism
- **Responsive**: Mobile, tablet, and desktop optimized
- **Touch-Friendly**: Single-tap navigation, no hover effects on touch devices
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Text Selection**: Disabled for cleaner UI (except inputs/textareas)

---

## 🏗️ Tech Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Storage**: localStorage (client-side, no backend)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (button, card, etc.)
│   ├── Navbar.tsx             # Responsive navigation with screen size detection
│   ├── Footer.tsx             # Footer with social links and random quote
│   ├── PDFViewer.tsx          # Enhanced PDF viewer with zoom and navigation
│   ├── ProgressBar.tsx        # Reusable progress indicator
│   └── XPToast.tsx            # Toast notifications for XP/achievements
├── pages/
│   ├── Home.tsx         # Landing page introduction
│   ├── Dashboard.tsx    # User stats and quick actions
│   ├── LearningFlow.tsx # Lesson viewer with videos
│   ├── Progress.tsx     # Progress tracking page
│   ├── Quiz.tsx         # Interactive quiz system
│   ├── Projects.tsx     # Project showcase + Mini Projects
│   ├── archive/
│   │   ├── VideoZone.tsx   # Curated video resources
│   │   ├── PDFs.tsx        # Educational PDFs & PPTs
│   │   └── DevLibrary.tsx  # YouTube channels & docs links
│   ├── playground/
│   │   ├── RYC.tsx         # Code editor playground
│   │   └── RYQ.tsx         # SQL query playground
│   └── ragebait/
│       ├── ErrorLogs.tsx   # Debugging stories
│       └── Tips.tsx        # Tips & tricks
├── data/
│   ├── dailyBytes.json        # Daily Byte tips (15 tips)
│   ├── footerQuotes.json      # Footer quotes (8 quotes)
│   ├── miniProjects.json      # Mini projects (20 projects)
│   ├── lessons.json           # Lesson content and metadata
│   ├── quizzes.json           # Quiz questions and answers
│   ├── tips.json              # Coding tips database (40 tips)
│   ├── tools.json             # Developer tool tips (40 tips)
│   ├── BugsKill.json          # Bug fixing challenges
│   ├── ByteRush.json          # Quick coding challenges
│   └── projects.json          # Project templates
├── utils/
│   ├── localStorage.ts  # localStorage management
│   └── gamification.ts  # XP, levels, achievements logic
└── hooks/
    └── use-toast.ts     # Toast notification hook
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd code-with-laasya

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 💾 Data Storage

All user progress is stored in **localStorage** with the following keys:

```javascript
codeWithLaasya_xp              // Total experience points
codeWithLaasya_streak          // Daily login streak
codeWithLaasya_lastVisit       // Last visit timestamp
codeWithLaasya_completedLessons // Completed lesson IDs
codeWithLaasya_completedQuizzes // Completed quiz IDs
codeWithLaasya_bookmarks       // Bookmarked tips
codeWithLaasya_savedCode       // Saved code from playground
codeWithLaasya_achievements    // Unlocked achievements
```

**⚠️ Note**: localStorage data can be cleared if browser data is deleted. Use the Export/Import feature in the Progress page to backup your data.

---

## 🏆 Achievement System

12 unlockable achievements:

1. **First Steps** - Complete 1 lesson
2. **Getting Started** - Complete 5 lessons
3. **Dedicated Learner** - Complete 10 lessons
4. **Century Club** - Earn 100 XP
5. **XP Champion** - Earn 500 XP
6. **XP Legend** - Earn 1000 XP
7. **Consistent** - 3-day streak
8. **Week Warrior** - 7-day streak
9. **Unstoppable** - 30-day streak
10. **Quiz Master** - Complete 5 quizzes
11. **Level 5** - Reach level 5
12. **Level 10** - Reach level 10

---

## 🌐 Navigation Structure

```
Code.With.Laasya (Home)
├── Archive
│   ├── VideoZone
│   ├── PDFs & PPTs
│   └── Dev Library
├── Playground
│   ├── RYC - Run Your Code
│   └── RYQ - Run Your Query
├── Projects (with Mini Projects section)
└── RageBait
    ├── Error Logs
    └── T⁴: Tips, Tricks, Tech & Tools
```

---

## 🔗 Connect

- **Portfolio**: [aboutme-laasya.netlify.app](https://aboutme-laasya.netlify.app/)
- **GitHub**: [@mlaasya07](https://github.com/mlaasya07)
- **LeetCode**: [ydHg4pM34m](https://leetcode.com/u/ydHg4pM34m/)
- **CodinGame**: [Profile](https://www.codingame.com/profile/1926e3967e6d68739783fc04eba77d9a5852966)
- **LinkedIn**: [mlaasya07](https://www.linkedin.com/in/mlaasya07/)
- **Email**: mlaasy16@gmail.com
- **Substack**: [@mlaasya07](https://substack.com/@mlaasya0)

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🙏 Acknowledgments

Built with chaos and passion for learning. Special thanks to all the YouTube educators whose content is featured in the VideoZone section.

---

**"Learn. Code. Repeat."** 🚀
