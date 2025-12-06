import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import cheatsheetsData from '@/data/cheatsheets.json';

export default function CheatSheets() {
  const [activeSheet, setActiveSheet] = useState(cheatsheetsData[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentSheet = cheatsheetsData.find(s => s.id === activeSheet)!;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast({ title: 'Copied!', duration: 1500 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-2 text-center">Cheat Sheets</h1>
        <p className="text-muted-foreground text-center mb-6">Quick reference snippets</p>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {cheatsheetsData.map(sheet => (
            <Button key={sheet.id} variant={activeSheet === sheet.id ? 'default' : 'outline'} size="sm" onClick={() => setActiveSheet(sheet.id)}>
              {sheet.title}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {currentSheet.snippets.map((snippet, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{snippet.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyCode(snippet.code, `${activeSheet}-${idx}`)}>
                    {copiedId === `${activeSheet}-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded text-sm overflow-x-auto"><code>{snippet.code}</code></pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
