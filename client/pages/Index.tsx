import AppLayout from "@/components/layout/AppLayout";
import CarbonOverview from "@/components/dashboard/CarbonOverview";
import AIAssistant from "@/components/dashboard/AIAssistant";
import ActivityInput from "@/components/dashboard/ActivityInput";
import GoalsSection from "@/components/dashboard/GoalsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  Share,
  Leaf,
  Globe,
} from "lucide-react";

export default function Index() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-eco p-8 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, Sarah! 🌱
                </h1>
                <p className="text-lg opacity-90 mb-4">
                  You're making a positive impact on our planet
                </p>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/25">
                    <Globe className="h-3 w-3 mr-1" />
                    Carbon Tracker
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/25">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    15% Improvement
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/25"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export Report
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/25"
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Share Progress
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Carbon Overview */}
          <div className="lg:col-span-2 space-y-6">
            <CarbonOverview />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-eco-green mb-1">
                    7
                  </div>
                  <p className="text-sm text-muted-foreground">Days Tracked</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-eco-green mb-1">
                    23%
                  </div>
                  <p className="text-sm text-muted-foreground">Reduction</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-eco-green mb-1">
                    156
                  </div>
                  <p className="text-sm text-muted-foreground">kg CO₂ Saved</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - AI Assistant */}
          <div className="space-y-6">
            <AIAssistant />
          </div>
        </div>

        {/* Bottom Grid - Activity Input and Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityInput />
          <GoalsSection />
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-eco-green" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  activity: "Took metro to work",
                  time: "2 hours ago",
                  impact: "-2.1 kg CO₂",
                  type: "positive",
                },
                {
                  activity: "Used reusable coffee cup",
                  time: "4 hours ago",
                  impact: "-0.1 kg CO₂",
                  type: "positive",
                },
                {
                  activity: "Ordered food delivery",
                  time: "Yesterday",
                  impact: "+1.8 kg CO₂",
                  type: "negative",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                >
                  <div>
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      item.type === "positive"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {item.impact}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-eco-green/20 hover:bg-eco-green/5"
            >
              <Calendar className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
