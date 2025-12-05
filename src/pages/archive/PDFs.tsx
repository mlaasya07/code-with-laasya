import { useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@/components/PDFViewer";

interface Resource {
  title: string;
  type: "PDF" | "PPT";
  pages: number;
  downloadUrl: string;
  previewUrl: string;
  category: "Frontend" | "Programming" | "Core Theory" | "DevOps" | "Backend";
}

const resources: Resource[] = [
  {
    title: "HTML & CSS Complete Reference (5th Edition)",
    type: "PDF",
    pages: 857,
    downloadUrl: "/pdfs/html-css-complete-reference.pdf",
    previewUrl: "/pdfs/html-css-complete-reference.pdf",
    category: "Frontend",
  },
  {
    title: "HTML and CSS Basics",
    type: "PPT",
    pages: 65,
    downloadUrl: "/pdfs/html-css-basics.pdf",
    previewUrl: "/pdfs/html-css-basics.pdf",
    category: "Frontend",
  },
  {
    title: "Automata Theory and Computation Introduction by JOHN E. HOPCROFT",
    type: "PDF",
    pages: 551,
    downloadUrl: "",
    previewUrl: "/pdfs/",
    category: "Core Theory",
  },
  {
    title: "Fundamentals of Web Programming",
    type: "PDF",
    pages: 512,
    downloadUrl: "/pdfs/funda-of-web-prog-lpu.pdf",
    previewUrl: "/pdfs/funda-of-web-prog-lpu.pdf",
    category: "Frontend",
  },
  {
    title: "XML Essentials",
    type: "PDF",
    pages: 142,
    downloadUrl: "/pdfs/xml.pdf",
    previewUrl: "/pdfs/xml.pdf",
    category: "Frontend",
  },
  {
    title: "C and MatLab",
    type: "PDF",
    pages: 349,
    downloadUrl: "/pdfs/c_and_matlab.pdf",
    previewUrl: "/pdfs/c_and_matlab.pdf",
    category: "Programming",
  },
  {
    title: "Think C by Allen B. Downey",
    type: "PDF",
    pages: 191,
    downloadUrl: "/pdfs/think_c_by_allen_b_downey.pdf",
    previewUrl: "/pdfs/think_c_by_allen_b_downey.pdf",
    category: "Programming",
  },
  {
    title: "Lecture Notes on Data Structures and Algorithms in C",
    type: "PDF",
    pages: 197,
    downloadUrl: "/pdfs/lecture-notes-on-c-_-ds.pdf",
    previewUrl: "/pdfs/lecture-notes-on-c-_-ds.pdf",
    category: "Programming",
  },
  {
    title: "Programming in C - LPU",
    type: "PDF",
    pages: 285,
    downloadUrl: "/pdfs/Prog-in-c-lpu.pdf",
    previewUrl: "/pdfs/Prog-in-c-lpu.pdf",
    category: "Programming",
  },
  {
    title: "Introduction to Ada",
    type: "PDF",
    pages: 156,
    downloadUrl: "/pdfs/intro-to-ada.pdf",
    previewUrl: "/pdfs/intro-to-ada.pdf",
    category: "Programming",
  },
];

const PDFs = () => {
  const [viewingPDF, setViewingPDF] = useState<{
    url: string;
    title: string;
    isPPT: boolean;
  } | null>(null);

  return (
    <>
      {viewingPDF && (
        <PDFViewer
          fileUrl={viewingPDF.url}
          title={viewingPDF.title}
          onClose={() => setViewingPDF(null)}
          isPPT={viewingPDF.isPPT}
        />
      )}

      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">PDFs & PPTs</h1>
            <p className="text-lg text-muted-foreground">
              Educational resources with preview and download options
            </p>
          </div>

          {/* Resources Grid */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card
                key={resource.title}
                className="bg-card/50 border-border hover:border-primary transition-all flex flex-col h-full"
              >
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <FileText 
                      className={`w-8 h-8 ${
                        resource.type === "PPT" 
                          ? "text-yellow-500" 
                          : "text-red-500"
                      }`} 
                    />
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        resource.type === "PPT"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-red-500 text-red-500"
                      }`}
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                    <span>
                      {resource.pages} {resource.type === "PDF" ? "pages" : "slides"}
                    </span>
                    <span>•</span>
                    <span>{resource.category}</span>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2 w-full sm:w-auto"
                      onClick={() => {
                        setViewingPDF({
                          url: resource.previewUrl,
                          title: resource.title,
                          isPPT: resource.type === "PPT",
                        });
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-2 w-full sm:w-auto"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = resource.downloadUrl;
                        link.download = resource.title;
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFs;
