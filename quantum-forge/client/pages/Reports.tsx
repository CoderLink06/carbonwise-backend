import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Share } from "lucide-react";

export default function Reports() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Carbon Reports</h1>
          <p className="text-muted-foreground">
            Generate detailed reports of your carbon footprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Monthly Reports</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed monthly carbon footprint analysis
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">PDF Export</CardTitle>
            <p className="text-sm text-muted-foreground">
              Download professional carbon reports
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Share className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Share Progress</CardTitle>
            <p className="text-sm text-muted-foreground">
              Share your eco achievements with others
            </p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Comprehensive reporting features are under development. You'll be
              able to generate detailed PDF reports, compare with averages, and
              share your progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
