import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { storage } from '@/utils/localStorage';
import { Code2, Play, RotateCcw, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
  <title>Practice</title>
  <style>
    body {
      font-family: 'Roboto Mono', monospace;
      background: #000;
      color: #E4CC37;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Hello, Coder!</h1>
  <p>Start coding here...</p>
  
  <script>
    console.log('Practice playground ready! 🚀');
  </script>
</body>
</html>`;

export default function Practice() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCode = storage.getSavedCode();
    if (savedCode) {
      setCode(savedCode);
      runCode(savedCode);
    } else {
      runCode(DEFAULT_CODE);
    }
  }, []);

  const runCode = (codeToRun: string) => {
    setError('');
    
    // Basic HTML syntax validation
    const errors: string[] = [];
    
    // Check for unclosed tags
    const openTags = codeToRun.match(/<(\w+)(?![^>]*\/>)[^>]*>/g) || [];
    const closeTags = codeToRun.match(/<\/(\w+)>/g) || [];
    
    if (openTags.length !== closeTags.length) {
      errors.push("Warning: Possible unclosed HTML tags detected");
    }
    
    // Check for basic script errors (very basic)
    if (codeToRun.includes('<script>') || codeToRun.includes('<script ')) {
      const scriptContent = codeToRun.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
      if (scriptContent) {
        scriptContent.forEach((script) => {
          // Check for common JS errors
          if (script.includes('consol.log') && !script.includes('console.log')) {
            errors.push("Syntax Error: Did you mean 'console.log'?");
          }
        });
      }
    }
    
    if (errors.length > 0) {
      setError(errors.join(' | '));
    }
    
    setOutput(codeToRun);
  };

  const handleRun = () => {
    runCode(code);
    toast({
      title: "Code executed!",
      description: "Check the preview below",
      duration: 2000,
    });
  };

  const handleSave = () => {
    storage.setSavedCode(code);
    toast({
      title: "Progress saved!",
      description: "Your code is safely stored",
      duration: 2000,
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default code?')) {
      setCode(DEFAULT_CODE);
      runCode(DEFAULT_CODE);
      toast({
        title: "Reset complete",
        description: "Code restored to default",
        duration: 2000,
      });
    }
  };

  const handleLoadLast = () => {
    const savedCode = storage.getSavedCode();
    if (savedCode) {
      setCode(savedCode);
      runCode(savedCode);
      toast({
        title: "Session loaded!",
        description: "Your last saved code is restored",
        duration: 2000,
      });
    } else {
      toast({
        title: "No saved session",
        description: "No previous code found",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <Code2 className="inline-block w-10 h-10 mr-2" />
            Practice Playground
          </h1>
          <p className="text-muted-foreground text-lg">
            Write code, see results instantly. All progress saved locally!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button onClick={handleRun} size="lg">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
          <Button onClick={handleSave} variant="secondary" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Progress
          </Button>
          <Button onClick={handleLoadLast} variant="outline" size="lg">
            Load Last Session
          </Button>
          <Button onClick={handleReset} variant="destructive" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 bg-destructive/10 border-destructive">
            <div className="p-4 flex items-start gap-3">
              <div className="text-destructive font-bold text-lg">⚠️</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-destructive mb-1">Syntax Warning</p>
                <p className="text-sm text-destructive font-mono">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Editor and Preview */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="p-4 border-border">
            <div className="mb-2 font-semibold text-sm">Code Editor</div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[600px] font-mono text-sm bg-muted"
              placeholder="Write your HTML, CSS, and JavaScript here..."
            />
          </Card>

          {/* Live Preview */}
          <Card className="p-4 border-border">
            <div className="mb-2 font-semibold text-sm">Live Preview</div>
            <div className="border border-border rounded bg-white">
              <iframe
                srcDoc={output}
                title="Preview"
                className="w-full h-[600px]"
                sandbox="allow-scripts"
              />
            </div>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-6 p-6 bg-card/50 border-primary/30">
          <h3 className="font-bold mb-2">💡 Playground Tips:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Write HTML, CSS, and JavaScript all in one editor</li>
            <li>Changes preview automatically when you click "Run Code"</li>
            <li>Your code is saved in localStorage - safe even after closing browser</li>
            <li>Use console.log() for debugging (check browser console F12)</li>
            <li>Experiment freely - you can always reset!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
