import { AlertTriangle, Code2, Lightbulb } from "lucide-react";

const ErrorLogs = () => {
  const errors = [
    {
      id: 1,
      name: "TypeError: Cannot read properties of undefined (reading 'map')",
      context: "Late night coding session after coffee #4, trying to render a list",
      mood: "😭",
      date: "15-03-2025",
      fix: "Added optional chaining (data?.map()) and null checks. Also added a loading state to handle async data properly.",
      learned: "Always validate your inputs before mapping. The infamous 'undefined is not a function' usually means you forgot to check if your data loaded. Use optional chaining and defensive programming.",
      code: "// Before\nusers.map(user => <div>{user.name}</div>)\n\n// After\nusers?.map(user => <div>{user.name}</div>) || <Loading />",
    },
    {
      id: 2,
      name: "Infinite Loop: setState Inside useEffect Without Dependencies",
      context: "Trying to sync state with props, ended up freezing the browser",
      mood: "😐",
      date: "10-03-2025",
      fix: "Added proper dependency array to useEffect and moved setState outside the render cycle. Used useCallback for the update function.",
      learned: "useEffect with missing or wrong dependencies is like a while(true) loop. Always specify your dependencies, or use ESLint to catch these. If you need to update state based on previous state, use the functional update form.",
      code: "// Before\nuseEffect(() => {\n  setCount(count + 1);\n});\n\n// After\nuseEffect(() => {\n  setCount(prev => prev + 1);\n}, []);\n// or with dependencies\nuseEffect(() => {\n  setCount(props.value);\n}, [props.value]);",
    },
    {
      id: 3,
      name: "404: Motivation Not Found",
      context: "Monday morning, third bug in a row, imposter syndrome kicking in",
      mood: "🙃",
      date: "08-03-2025",
      fix: "Took a break, watched cat videos, came back with fresh eyes. The bug was a simple typo in the API endpoint URL.",
      learned: "Your mental health is not a nice-to-have, it's a critical dependency. Taking breaks actually makes you more productive. Also, always double-check your API URLs - one typo can waste hours.",
      code: "// The typo\nfetch('/api/usres') // notice the typo?\n\n// The fix\nfetch('/api/users')\n\n// Pro tip: use constants\nconst API_ENDPOINTS = {\n  USERS: '/api/users'\n};",
    },
    {
      id: 4,
      name: "CORS Policy Error: Access Blocked",
      context: "Building a full-stack app, frontend can't talk to backend",
      mood: "🤬",
      date: "28-02-2025",
      fix: "Added CORS middleware to the backend with proper origin configuration. For local dev, allowed localhost:5173. For production, whitelisted the frontend domain.",
      learned: "CORS is not the enemy - it's a security feature. Understand same-origin policy. Never use '*' in production. Always configure CORS properly on your backend, not your frontend.",
      code: "// Express.js backend\nconst cors = require('cors');\napp.use(cors({\n  origin: process.env.NODE_ENV === 'production' \n    ? 'https://myapp.com' \n    : 'http://localhost:5173',\n  credentials: true\n}));",
    },
    {
      id: 5,
      name: "Async/Await Unhandled Promise Rejection",
      context: "API call failing silently, no error messages, just confusion",
      mood: "😵",
      date: "20-02-2025",
      fix: "Wrapped async calls in try-catch blocks and added proper error handling. Also added .catch() to promises that weren't awaited.",
      learned: "Unhandled promise rejections are silent killers. Always use try-catch with async/await. Add global error handlers. Log errors properly. Use error boundaries in React.",
      code: "// Before\nconst data = await fetchData();\n\n// After\ntry {\n  const data = await fetchData();\n  setData(data);\n} catch (error) {\n  console.error('Failed to fetch:', error);\n  toast.error('Failed to load data');\n  setError(error.message);\n}",
    },
    {
      id: 6,
      name: "Key Prop Warning: Each Child in List Should Have Unique Key",
      context: "React screaming at me in the console, but everything looks fine",
      mood: "😤",
      date: "15-02-2025",
      fix: "Stopped using array index as key. Used unique IDs from the data instead. For items without IDs, generated stable keys using a combination of unique properties.",
      learned: "Index as key is only okay for static lists that never reorder. Use unique IDs from your data. If you don't have IDs, create them. React uses keys for reconciliation - wrong keys = bugs and performance issues.",
      code: "// Bad\n{items.map((item, index) => <div key={index}>{item}</div>)}\n\n// Good\n{items.map(item => <div key={item.id}>{item.name}</div>)}\n\n// If no ID exists\n{items.map(item => <div key={`${item.name}-${item.date}`}>{item}</div>)}",
    },
    {
      id: 7,
      name: "Memory Leak: Event Listeners Never Cleaned Up",
      context: "App getting slower over time, tab eventually crashes",
      mood: "🫠",
      date: "29-10-2025",
      fix: "Added cleanup functions to useEffect hooks to remove event listeners. Used AbortController for fetch requests. Properly unsubscribed from observables.",
      learned: "Every subscription needs an unsubscription. Event listeners pile up if not removed. Always return cleanup functions from useEffect. Memory leaks are invisible until they crash your app.",
      code: "// Before\nuseEffect(() => {\n  window.addEventListener('resize', handleResize);\n});\n\n// After\nuseEffect(() => {\n  window.addEventListener('resize', handleResize);\n  return () => {\n    window.removeEventListener('resize', handleResize);\n  };\n}, []);",
    },
    {
      id: 8,
      name: "State Update on Unmounted Component Warning",
      context: "Switching pages quickly, console filled with React warnings",
      mood: "😩",
      date: "30-10-2025",
      fix: "Used cleanup flags and AbortController to cancel pending requests when component unmounts. Added isMounted checks before setState in async operations.",
      learned: "Async operations don't stop when components unmount. Use cleanup functions and cancellation tokens. This warning is React's way of preventing memory leaks and unexpected behavior.",
      code: "// Solution with cleanup flag\nuseEffect(() => {\n  let isMounted = true;\n  fetchData().then(data => {\n    if (isMounted) setData(data);\n  });\n  return () => { isMounted = false; };\n}, []);\n\n// Solution with AbortController\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData);\n  return () => controller.abort();\n}, []);",
    },
    {
      id: 9,
      name: "CSS Specificity War: Styles Not Applying",
      context: "Changed CSS 10 times, nothing works, about to use !important",
      mood: "😠",
      date: "01-11-2025",
      fix: "Debugged with browser DevTools to see which styles were overriding. Reorganized CSS with proper specificity. Used CSS modules to scope styles.",
      learned: "!important is a last resort, not a first solution. Specificity order matters: inline > ID > class > tag. Use DevTools to see what's overriding your styles. CSS modules prevent specificity wars.",
      code: "// Bad - specificity war\n.button { color: red; }\n#main .button { color: blue !important; }\n\n// Good - use classes properly\n.button-primary { color: blue; }\n.button-secondary { color: red; }\n\n// Better - CSS modules\n// button.module.css\n.primary { color: blue; }\n// component.tsx\nimport styles from './button.module.css';\n<button className={styles.primary}>",
    },
    {
      id: 10,
      name: "Git Merge Conflict Hell",
      context: "Pulled main branch, got 47 conflicts, considering starting over",
      mood: "💀",
      date: "02-11-2025",
      fix: "Used VS Code merge conflict resolver. Carefully reviewed each conflict section. Committed frequently to avoid future massive merges. Set up feature branches properly.",
      learned: "Pull frequently, commit often, push regularly. Small conflicts are easier than big ones. Understand what HEAD and incoming changes mean. When in doubt, talk to your teammate.",
      code: "// Merge conflict markers\n<<<<<<< HEAD\nconst greeting = 'Hello World';\n=======\nconst greeting = 'Hi There';\n>>>>>>> feature-branch\n\n// After resolution\nconst greeting = 'Hello World';\n\n// Prevention strategy\ngit pull origin main  // do this daily\ngit checkout -b feature/my-feature\n// make small, frequent commits\ngit push origin feature/my-feature",
    },
    {
      id: 11,
      name: "Build Failed: Module Not Found After npm Install",
      context: "Fresh clone of the repo, npm install completed, but build fails",
      mood: "🤯",
      date: "03-11-2025",
      fix: "Deleted node_modules and package-lock.json, ran npm install again. Cleared npm cache. Checked Node version compatibility. Updated dependencies.",
      learned: "Sometimes you need to nuke node_modules from orbit. Cache issues are real. Version mismatches cause mysterious errors. When stuck, try: delete node_modules, clear cache, reinstall.",
      code: "// The nuclear option (works surprisingly often)\nrm -rf node_modules package-lock.json\nnpm cache clean --force\nnpm install\n\n// Check your Node version\nnode --version\n// Compare with project's required version in package.json\n\"engines\": {\n  \"node\": \">=18.0.0\"\n}\n\n// Switch Node versions with nvm\nnvm use 18",
    },
  ];

  const commandments = [
    "Thou shalt not ignore console warnings. They're free debugging advice.",
    "Thou shalt save before running. Ctrl+S is muscle memory for a reason.",
    "Thou shalt read error messages completely. The answer is usually in the last line.",
    "Thou shalt use console.log() liberally. Print debugging is not a crime.",
    "Thou shalt not commit commented-out code. That's what git is for.",
    "Thou shalt take breaks between debug sessions. Fresh eyes spot bugs faster.",
    "Thou shalt ask for help after 30 minutes of being stuck. Suffering alone helps no one.",
    "Thou shalt write tests. Future you will thank present you.",
    "Thou shalt not trust 'it works on my machine.' Environment matters.",
    "Thou shalt backup thy database before running migrations. Learn from others' pain.",
  ];

  return (
    <div className="min-h-screen">
    <section className="container mx-auto px-3 pt-24 pb-12 sm:px-4 sm:pt-32 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-primary">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">Error Detected</h1>
          <p className="text-xl text-muted-foreground">
            Debug or Crashout? Tales of coding failures turned lessons.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {errors.map((error) => (
            <div
              key={error.id}
              className="bg-card border border-border rounded p-6 md:p-8 space-y-6 hover:border-primary transition-colors"
            >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-primary">
                    {error.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{error.context}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-3xl">{error.mood}</span>
                  <span className="text-xs text-muted-foreground">{error.date}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">The Fix:</p>
                    <p className="text-sm text-muted-foreground mb-2">{error.fix}</p>
                    {error.code && (
                      <pre className="bg-muted p-2 sm:p-3 rounded text-xs overflow-x-auto mt-2 text-[11px] sm:text-xs">
                        <code>{error.code}</code>
                      </pre>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold mb-1">What I Learned:</p>
                    <p className="text-sm text-muted-foreground">{error.learned}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-secondary/50 border border-border rounded p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Laasya's Debug Commandments
            </h3>
            <ul className="space-y-3">
              {commandments.map((commandment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-muted-foreground">{commandment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorLogs;
