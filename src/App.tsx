import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects/myProjects";
import VideoZone from "./pages/archive/VideoZone";
import PDFs from "./pages/archive/PDFs";
import RYC from "./pages/playground/RYC";
import RYQ from "./pages/playground/RYQ";
import ErrorLogs from "./pages/ragebait/ErrorLogs";
import DevLibrary from "./pages/archive/DevLibrary";
import Tips from "./pages/ragebait/T4";
import dailyBytesData from "./data/dailyBytes.json";
import NotFound from "./pages/NotFound";
import BuildWithMe from "./pages/playground/BuildWithMe";
import ToolTime from "./pages/playground/ToolTime";
import ByteRush from "./pages/playground/ByteRush";
import BugsKill from "./pages/playground/BugsKill";
import MiniProjects from "./pages/Projects/MiniProjects";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();


const AppContent = () => {
  useEffect(() => {
    // Show Daily Byte on app load
    const randomByte = dailyBytesData[Math.floor(Math.random() * dailyBytesData.length)];
    toast(
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-sm mb-1">Daily Byte 💡</div>
          <div className="text-sm text-muted-foreground">{randomByte}</div>
        </div>
      </div>,
      {
        duration: 6000,
        position: "top-center",
      }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive/VideoZone" element={<VideoZone />} />
          <Route path="/archive/pdfs" element={<PDFs />} />
          <Route path="/archive/dev-library" element={<DevLibrary />} />
          <Route path="/playground/ryc" element={<RYC />} />
          <Route path="/playground/ryq" element={<RYQ />} />
          <Route path="/playground/buildwithme" element={<BuildWithMe />} />
          <Route path="/playground/tooltime" element={<ToolTime />} />
          <Route path="/playground/byterush" element={<ByteRush />} />
          <Route path="/playground/bugskill" element={<BugsKill />} />
          <Route path="/projects/myprojects" element={<Projects />} />
          <Route path="/projects/miniprojects" element={<MiniProjects />} />
          <Route path="/ragebait/errors" element={<ErrorLogs />} />
          <Route path="/ragebait/t4" element={<Tips />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
