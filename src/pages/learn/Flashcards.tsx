import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';
import flashcardsData from '@/data/flashcards.json';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(flashcardsData);
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(flashcardsData.map(c => c.category))];
  const filteredCards = category === 'All' ? cards : cards.filter(c => c.category === category);
  const currentCard = filteredCards[currentIndex];

  const shuffle = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-2 text-center">Flashcards</h1>
        <p className="text-muted-foreground text-center mb-6">Click to flip, swipe to navigate</p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map(cat => (
            <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" onClick={() => { setCategory(cat); setCurrentIndex(0); }}>
              {cat}
            </Button>
          ))}
        </div>

        {currentCard && (
          <div className="perspective-1000 mb-6" onClick={() => setIsFlipped(!isFlipped)}>
            <Card className={`min-h-[300px] cursor-pointer transition-transform duration-500 ${isFlipped ? 'bg-primary/20' : ''}`}>
              <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Badge className="mb-4">{currentCard.category}</Badge>
                <p className="text-xl font-medium">{isFlipped ? currentCard.back : currentCard.front}</p>
                <p className="text-sm text-muted-foreground mt-4">{isFlipped ? '(Answer)' : 'Click to reveal'}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={prev}><ChevronLeft className="w-5 h-5" /></Button>
          <Button variant="outline" onClick={shuffle}><Shuffle className="w-5 h-5" /></Button>
          <Button variant="outline" onClick={() => setIsFlipped(false)}><RotateCcw className="w-5 h-5" /></Button>
          <Button variant="outline" onClick={next}><ChevronRight className="w-5 h-5" /></Button>
        </div>

        <p className="text-center text-muted-foreground mt-4">{currentIndex + 1} / {filteredCards.length}</p>
      </div>
    </div>
  );
}
