import { useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PDFViewer } from "@/components/PDFViewer";

const PDFs = () => {
  const [viewingPDF, setViewingPDF] = useState<{
    url: string;
    title: string;
    isPPT: boolean;
  } | null>(null);

  const resources = [
    {
      title: "HTML & CSS Complete Reference (5th Edition)",
      type: "PDF",
      pages: 1088,
      lastOpened: "2 days ago",
      downloadUrl: "/pdfs/html-css-complete-reference.pdf",
      previewUrl: "/pdfs/html-css-complete-reference.pdf",
      category: "Frontend",
    },
    {
      title: "HTML and CSS Basics",
      type: "PPT",
      pages: 45,
      lastOpened: "1 week ago",
      downloadUrl: "/pdfs/html-css-basics.pdf",
      previewUrl: "/pdfs/html-css-basics.pdf",
      category: "Frontend",
    },
  ];

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
          {resources.map((resource, idx) => (
            <Card key={idx} className="bg-card/50 border-border hover:border-primary transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
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
                <p className="text-xs text-muted-foreground pt-1">
                  Last opened: {resource.lastOpened}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() =>
                      setViewingPDF({
                        url: resource.previewUrl,
                        title: resource.title,
                        isPPT: resource.type === "PPT",
                      })
                    }
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => {
                      const link = document.createElement('a');
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
