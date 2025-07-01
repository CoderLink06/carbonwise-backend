import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import {
  Download,
  Share,
  TrendingDown,
  TrendingUp,
  Leaf,
  Bot,
  AlertTriangle,
  CheckCircle,
  Target,
  Car,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
} from "lucide-react";

interface CarbonData {
  total: number;
  categories: Array<{
    name: string;
    value: number;
    color: string;
    icon: any;
    trend: "up" | "down";
    trendValue: number;
  }>;
  weeklyData: Array<{
    week: string;
    emissions: number;
    target: number;
  }>;
  suggestions: Array<{
    type: "tip" | "alert" | "achievement";
    title: string;
    description: string;
    impact: string;
    savings?: number;
  }>;
}

export default function Dashboard() {
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);
  const [userLevel, setUserLevel] = useState("EcoStarter");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Load analysis data from localStorage (in real app, this would come from API)
    const analysisData = localStorage.getItem("carbonAnalysis");

    if (analysisData) {
      const data = JSON.parse(analysisData);

      // Generate mock carbon data based on uploaded files and activities
      const mockData: CarbonData = {
        total: 156.7,
        categories: [
          {
            name: "Transport",
            value: 68.4,
            color: "#16a249",
            icon: Car,
            trend: "down",
            trendValue: 12,
          },
          {
            name: "Energy",
            value: 45.2,
            color: "#22c55e",
            icon: Zap,
            trend: "up",
            trendValue: 8,
          },
          {
            name: "Food",
            value: 28.7,
            color: "#34d399",
            icon: UtensilsCrossed,
            trend: "down",
            trendValue: 5,
          },
          {
            name: "Shopping",
            value: 14.4,
            color: "#6ee7b7",
            icon: ShoppingBag,
            trend: "up",
            trendValue: 3,
          },
        ],
        weeklyData: [
          { week: "Week 1", emissions: 180, target: 150 },
          { week: "Week 2", emissions: 165, target: 150 },
          { week: "Week 3", emissions: 170, target: 150 },
          { week: "Week 4", emissions: 157, target: 150 },
        ],
        suggestions: [
          {
            type: "alert",
            title: "High Transport Emissions",
            description: "Your transport emissions are 25% above average",
            impact: "Switch to public transport 2 days/week",
            savings: 15.2,
          },
          {
            type: "tip",
            title: "Try LED Bulbs",
            description: "Replace remaining incandescent bulbs with LEDs",
            impact: "Reduce electricity consumption by 12%",
            savings: 5.4,
          },
          {
            type: "achievement",
            title: "Great Progress!",
            description: "You've reduced your footprint by 18% this month",
            impact: "Keep up the excellent work",
          },
        ],
      };

      setCarbonData(mockData);
    }
  }, []);

  const exportReport = async () => {
    setIsExporting(true);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);

    // In real app, this would generate and download a PDF
    alert("PDF report generated! (Demo - no actual file download)");
  };

  if (!carbonData) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No analysis data found.</p>
          <Link to="/upload">
            <Button className="bg-gradient-eco hover:bg-gradient-eco/90 text-white">
              Start New Analysis
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const isUnderTarget = carbonData.total <= 150;
  const targetProgress = (carbonData.total / 150) * 100;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Your Carbon Analysis</h1>
            <p className="text-muted-foreground">
              AI-powered insights from your data
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              className={`${isUnderTarget ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}`}
            >
              {isUnderTarget ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <AlertTriangle className="h-3 w-3 mr-1" />
              )}
              {userLevel} 🌱
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={exportReport}
              disabled={isExporting}
              className="border-eco-green/20 hover:bg-eco-green/5"
            >
              <Download className="h-4 w-4 mr-1" />
              {isExporting ? "Generating..." : "Export PDF"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-eco-green/20 hover:bg-eco-green/5"
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Emissions */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-eco opacity-5" />
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Monthly Emissions
              </CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-3xl font-bold text-eco-green">
                  {carbonData.total}
                </span>
                <span className="text-lg text-muted-foreground">kg CO₂</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target: 150kg</span>
                  <span>{targetProgress.toFixed(0)}%</span>
                </div>
                <Progress
                  value={Math.min(targetProgress, 100)}
                  className="h-2"
                />
                <p className="text-xs text-center text-muted-foreground">
                  {isUnderTarget
                    ? "On track!"
                    : `${(carbonData.total - 150).toFixed(1)}kg over target`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Trend
              </CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <TrendingDown className="h-5 w-5 text-success" />
                <span className="text-3xl font-bold text-success">-18%</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-muted-foreground">
                Great progress! You're reducing your impact.
              </p>
            </CardContent>
          </Card>

          {/* Eco Score */}
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Eco Score
              </CardTitle>
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="h-5 w-5 text-eco-green" />
                <span className="text-3xl font-bold text-eco-green">82</span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-muted-foreground">
                Excellent! You're an eco champion.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-eco-green" />
                <span>Emissions by Category</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carbonData.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {carbonData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `${value} kg CO₂`,
                        "Emissions",
                      ]}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {carbonData.categories.map((category, index) => {
                  const Icon = category.icon;
                  const TrendIcon =
                    category.trend === "up" ? TrendingUp : TrendingDown;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{category.name}</span>
                      <div className="flex items-center space-x-1">
                        <TrendIcon
                          className={`h-3 w-3 ${category.trend === "up" ? "text-warning" : "text-success"}`}
                        />
                        <span
                          className={`text-xs ${category.trend === "up" ? "text-warning" : "text-success"}`}
                        >
                          {category.trendValue}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-eco-green" />
                <span>Weekly Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={carbonData.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [`${value} kg CO₂`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="emissions"
                      stroke="#16a249"
                      strokeWidth={3}
                      dot={{ fill: "#16a249", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#94a3b8"
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-1 bg-eco-green rounded" />
                  <span>Your Emissions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-1 bg-muted-foreground rounded"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #94a3b8 0, #94a3b8 3px, transparent 3px, transparent 8px)",
                    }}
                  />
                  <span>Target</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-eco opacity-10 rounded-full -translate-y-8 translate-x-8" />
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-eco-green" />
              <span>AI Carbon Advisor</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-eco-mint/10 rounded-lg p-4 border border-eco-green/10">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-eco-green/10">
                  <Bot className="h-4 w-4 text-eco-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-eco-forest">
                    "Great work on reducing your carbon footprint! I've analyzed
                    your data and found some key opportunities. Your transport
                    emissions are the largest contributor - try using public
                    transport 2 days per week to save 15kg CO₂ monthly."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carbonData.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border/50 hover:border-eco-green/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        suggestion.type === "alert"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : suggestion.type === "tip"
                            ? "bg-eco-green/10 text-eco-green border-eco-green/20"
                            : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      }`}
                    >
                      {suggestion.type === "alert" && "⚠️"}
                      {suggestion.type === "tip" && "💡"}
                      {suggestion.type === "achievement" && "🏆"}
                      {suggestion.type.charAt(0).toUpperCase() +
                        suggestion.type.slice(1)}
                    </Badge>
                    {suggestion.savings && (
                      <span className="text-xs font-medium text-eco-green">
                        Save {suggestion.savings}kg CO₂
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {suggestion.description}
                  </p>
                  <p className="text-sm text-eco-green font-medium">
                    {suggestion.impact}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/upload">
            <Button
              variant="outline"
              className="border-eco-green/20 hover:bg-eco-green/5"
            >
              Upload More Data
            </Button>
          </Link>
          <Link to="/goals">
            <Button className="bg-gradient-eco hover:bg-gradient-eco/90 text-white">
              <Target className="h-4 w-4 mr-2" />
              Set New Goals
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
