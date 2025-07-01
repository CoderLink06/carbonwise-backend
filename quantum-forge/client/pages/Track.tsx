import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, BarChart3 } from "lucide-react";

export default function Track() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Track Your Activities</h1>
          <p className="text-muted-foreground">
            Log your daily activities and see their carbon impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Manual Entry</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              Quickly log your transport, energy, and lifestyle activities
            </p>
            <Button className="w-full bg-gradient-eco hover:bg-gradient-eco/90 text-white">
              Start Logging
            </Button>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Upload Files</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              Upload bills, receipts, and documents for AI analysis
            </p>
            <Button
              variant="outline"
              className="w-full border-eco-green/20 hover:bg-eco-green/5"
            >
              Upload Documents
            </Button>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Connect Apps</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              Sync with your favorite apps for automatic tracking
            </p>
            <Button
              variant="outline"
              className="w-full border-eco-green/20 hover:bg-eco-green/5"
            >
              Connect Services
            </Button>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is under development. You'll be able to track all
              your activities with detailed carbon footprint calculations and
              AI-powered insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
