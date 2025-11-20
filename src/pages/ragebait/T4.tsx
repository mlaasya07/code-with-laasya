import { useState, useEffect } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { storage } from "@/utils/localStorage";
import { toast } from "@/hooks/use-toast";
import tipsData from "@/data/t4.json";

export default function EnhancedTips() {
  const [openTip, setOpenTip] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [displayedTip, setDisplayedTip] = useState<any>(null);

  useEffect(() => {
    setBookmarks(storage.getBookmarks());
  }, []);

  const handleBookmark = (tipId: string) => {
    if (bookmarks.includes(tipId)) {
      storage.removeBookmark(tipId);
      setBookmarks(bookmarks.filter(id => id !== tipId));
      toast({ title: "Bookmark removed", duration: 2000 });
    } else {
      storage.addBookmark(tipId);
      setBookmarks([...bookmarks, tipId]);
      toast({ title: "Tip bookmarked!", duration: 2000 });
    }
  };

  const getRandomTip = () => {
    const randomTip = tipsData[Math.floor(Math.random() * tipsData.length)];
    setDisplayedTip(randomTip);
    setOpenTip(null);
  };

  const categories = ['All', ...Array.from(new Set(tipsData.map(tip => tip.category)))];
  const [showBookmarked, setShowBookmarked] = useState(false);
  
  const filteredTips = showBookmarked 
    ? tipsData.filter(tip => bookmarks.includes(tip.id))
    : selectedCategory === 'All' 
      ? tipsData 
      : tipsData.filter(tip => tip.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Lightbulb className="inline-block w-10 h-10 mr-2" />
            Code Survival Guide
          </h1>
          <p className="text-muted-foreground text-lg">Tips, tricks, and wisdom from the debugging trenches</p>
        </div>

        <div className="mb-8 text-center">
          <Button onClick={getRandomTip} size="lg" variant="outline">
            <Shuffle className="w-4 h-4 mr-2" />Random Tip
          </Button>
        </div>

        {displayedTip && (
          <div className="mb-8 p-6 border-2 border-primary rounded-lg bg-card">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary">{displayedTip.category}</Badge>
              <button onClick={() => handleBookmark(displayedTip.id)} className="text-primary hover:scale-110 transition-transform">
                {bookmarks.includes(displayedTip.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-2">{displayedTip.title}</h3>
            <p className="text-muted-foreground">{displayedTip.content}</p>
          </div>
        )}

        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={selectedCategory === cat && !showBookmarked ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => { setSelectedCategory(cat); setShowBookmarked(false); }}
              className="touch-manipulation"
            >
              {cat}
            </Button>
          ))}
          <Button 
            variant={showBookmarked ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setShowBookmarked(!showBookmarked)}
            className="touch-manipulation"
          >
            <Bookmark className="w-4 h-4 mr-1" />
            Bookmarked
          </Button>
        </div>

        <div className="space-y-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-400px)]">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="bg-card border border-border rounded-lg overflow-hidden md:hover:border-primary transition-colors">
              <button onClick={() => setOpenTip(openTip === tip.id ? null : tip.id)} className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left touch-manipulation">
                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-sm md:text-lg">{tip.title}</h3>
                    <button onClick={(e) => { e.stopPropagation(); handleBookmark(tip.id); }} className="ml-auto touch-manipulation">
                      {bookmarks.includes(tip.id) ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm pl-6 md:pl-8">{tip.preview}</p>
                  <Badge variant="outline" className="text-xs mt-2 ml-6 md:ml-8">{tip.category}</Badge>
                </div>
                {openTip === tip.id ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />}
              </button>
              {openTip === tip.id && (
                <div className="px-4 md:px-6 pb-3 md:pb-4 pt-2 border-t border-border bg-muted/30">
                  <p className="text-foreground text-sm md:text-base">{tip.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
