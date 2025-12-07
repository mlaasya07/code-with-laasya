import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import toolsData from '@/data/tools.json';
import flashcardsData from '@/data/flashcards.json';

const searchableItems = [
  { title: 'VideoZone', path: '/archive/videos', category: 'Archive' },
  { title: 'PDFs & PPTs', path: '/archive/pdfs', category: 'Archive' },
  { title: 'Dev Library', path: '/archive/dev-library', category: 'Archive' },
  { title: 'ByteRush Quizzes', path: '/playground/byterush', category: 'Playground' },
  { title: 'BugsKill', path: '/playground/bugskill', category: 'Playground' },
  { title: 'Practice Playground (RYC)', path: '/playground/ryc', category: 'Playground' },
  { title: 'SQL Playground (RYQ)', path: '/playground/ryq', category: 'Playground' },
  { title: 'ToolTime', path: '/playground/tooltime', category: 'Playground' },
  { title: 'Flashcards', path: '/learn/flashcards', category: 'Learn' },
  { title: 'Cheat Sheets', path: '/learn/cheatsheets', category: 'Learn' },
  { title: 'Interview Prep', path: '/learn/interview', category: 'Learn' },
  { title: 'Learning Paths', path: '/learn/paths', category: 'Learn' },
  { title: 'Error Logs', path: '/ragebait/errors', category: 'Ragebait' },
  { title: 'Tips & Tricks', path: '/ragebait/tips', category: 'Ragebait' },
  { title: 'My Projects', path: '/projects/myprojects', category: 'Projects' },
  { title: 'Mini Projects', path: '/projects/miniprojects', category: 'Projects' },
  { title: 'Profile', path: '/profile', category: 'Profile' },
  ...toolsData.map(t => ({ title: t.title, path: '/playground/tooltime', category: 'Tool' })),
  ...flashcardsData.map(f => ({ title: f.front.slice(0, 50), path: '/learn/flashcards', category: f.category })),
];

interface Props { open: boolean; onOpenChange: (open: boolean) => void; }

export default function GlobalSearch({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = query.length > 1 
    ? searchableItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 10)
    : [];

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Search</DialogTitle></DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search pages, tools, flashcards..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" autoFocus />
        </div>
        {results.length > 0 && (
          <div className="mt-2 max-h-64 overflow-y-auto space-y-1">
            {results.map((item, idx) => (
              <button key={idx} onClick={() => handleSelect(item.path)} className="w-full text-left px-3 py-2 rounded hover:bg-muted flex justify-between">
                <span>{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </button>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center">Press Ctrl+K to open search</p>
      </DialogContent>
    </Dialog>
  );
}
