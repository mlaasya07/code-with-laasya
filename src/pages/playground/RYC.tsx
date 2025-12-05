import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { storage } from '@/utils/localStorage';
import { Code2, Play, RotateCcw, Save, FileCode, FileType, Braces, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Practice</title>
</head>
<body>
  <h1>Hello, Coder!</h1>
  <p>Start coding here...</p>
  <button id="btn">Click Me</button>
  <p id="output"></p>
</body>
</html>`;

const DEFAULT_CSS = `body {
  font-family: 'Roboto Mono', monospace;
  background: #000;
  color: #E4CC37;
  padding: 20px;
}

h1 {
  color: #FFD700;
}

button {
  background: #FFD700;
  color: #000;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-family: inherit;
  margin-top: 10px;
}

button:hover {
  background: #E4CC37;
}`;

const DEFAULT_JS = `// Your JavaScript code here
console.log('Practice playground ready! 🚀');

document.getElementById('btn').addEventListener('click', function() {
  document.getElementById('output').textContent = 'Button clicked!';
});`;

interface CodeFiles {
  html: string;
  css: string;
  js: string;
}

const STORAGE_KEY = 'ryc-code-files';

export default function Practice() {
  const [files, setFiles] = useState<CodeFiles>({
    html: DEFAULT_HTML,
    css: DEFAULT_CSS,
    js: DEFAULT_JS,
  });
  const [activeTab, setActiveTab] = useState('html');
  const previewWindowRef = useRef<Window | null>(null);
  const buildOutput = useCallback((codeFiles: CodeFiles) => {
    let html = codeFiles.html;
    const cssTag = `<style>${codeFiles.css}</style>`;
    const jsTag = `<script>${codeFiles.js}<\/script>`;
    
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${cssTag}</head>`);
    } else if (html.includes('<body')) {
      html = html.replace('<body', `${cssTag}<body`);
    } else {
      html = cssTag + html;
    }
    
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${jsTag}</body>`);
    } else {
      html = html + jsTag;
    }
    
    return html;
  }, []);

  // Load saved files on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    if (savedFiles) {
      try {
        const parsed = JSON.parse(savedFiles);
        setFiles(parsed);
      } catch {
        // Use default files
      }
    }
  }, []);

  // Live preview - update new tab on code changes with debounce (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (previewWindowRef.current && !previewWindowRef.current.closed) {
        const combined = buildOutput(files);
        previewWindowRef.current.document.open();
        previewWindowRef.current.document.write(combined);
        previewWindowRef.current.document.close();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [files, buildOutput]);

  const openPreview = () => {
    const combined = buildOutput(files);
    
    // Open or focus existing window
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      previewWindowRef.current.document.open();
      previewWindowRef.current.document.write(combined);
      previewWindowRef.current.document.close();
      previewWindowRef.current.focus();
    } else {
      previewWindowRef.current = window.open('', 'code-with-laasya-html-preview');
      if (previewWindowRef.current) {
        previewWindowRef.current.document.open();
        previewWindowRef.current.document.write(combined);
        previewWindowRef.current.document.close();
      }
    }
    
    toast({
      title: "Preview opened!",
      description: "Check the new browser tab",
      duration: 2000,
    });
  };

  const handleRun = () => {
    openPreview();
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    toast({
      title: "Progress saved!",
      description: "Your code files are safely stored",
      duration: 2000,
    });
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all files to default?')) {
      const defaultFiles = {
        html: DEFAULT_HTML,
        css: DEFAULT_CSS,
        js: DEFAULT_JS,
      };
      setFiles(defaultFiles);
      localStorage.removeItem(STORAGE_KEY);
      toast({
        title: "Reset complete",
        description: "All files restored to default",
        duration: 2000,
      });
    }
  };

  const handleLoadLast = () => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    if (savedFiles) {
      try {
        const parsed = JSON.parse(savedFiles);
        setFiles(parsed);
        toast({
          title: "Session loaded!",
          description: "Your last saved code is restored",
          duration: 2000,
        });
      } catch {
        toast({
          title: "Error loading session",
          description: "Could not parse saved data",
          duration: 2000,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No saved session",
        description: "No previous code found",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  const updateFile = (type: keyof CodeFiles, value: string) => {
    setFiles(prev => ({ ...prev, [type]: value }));
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'html': return <FileCode className="w-4 h-4" />;
      case 'css': return <FileType className="w-4 h-4" />;
      case 'js': return <Braces className="w-4 h-4" />;
      default: return null;
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
            Write HTML, CSS & JavaScript in separate files. All progress saved locally!
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

        {/* Editor - Full Width */}
        <Card className="p-4 border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="html" className="gap-2">
                {getTabIcon('html')}
                index.html
              </TabsTrigger>
              <TabsTrigger value="css" className="gap-2">
                {getTabIcon('css')}
                style.css
              </TabsTrigger>
              <TabsTrigger value="js" className="gap-2">
                {getTabIcon('js')}
                script.js
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="mt-0">
              <Textarea
                value={files.html}
                onChange={(e) => updateFile('html', e.target.value)}
                className="min-h-[550px] font-mono text-sm bg-muted resize-none"
                placeholder="Write your HTML here..."
                spellCheck={false}
              />
            </TabsContent>
            
            <TabsContent value="css" className="mt-0">
              <Textarea
                value={files.css}
                onChange={(e) => updateFile('css', e.target.value)}
                className="min-h-[550px] font-mono text-sm bg-muted resize-none"
                placeholder="Write your CSS here..."
                spellCheck={false}
              />
            </TabsContent>
            
            <TabsContent value="js" className="mt-0">
              <Textarea
                value={files.js}
                onChange={(e) => updateFile('js', e.target.value)}
                className="min-h-[550px] font-mono text-sm bg-muted resize-none"
                placeholder="Write your JavaScript here..."
                spellCheck={false}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Tips */}
        <Card className="mt-6 p-6 bg-card/50 border-primary/30">
          <h3 className="font-bold mb-2">💡 Playground Tips:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Write HTML, CSS, and JavaScript in separate tabs like a real project</li>
            <li>Click "Run Code" to open preview in a new browser tab</li>
            <li>Preview auto-updates as you type when the tab is open</li>
            <li>CSS is automatically injected into the &lt;head&gt; tag</li>
            <li>JavaScript runs at the end of the &lt;body&gt; tag</li>
            <li>Use console.log() for debugging (check browser console with F12)</li>
            <li>Your code is saved in localStorage - safe even after closing browser</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
