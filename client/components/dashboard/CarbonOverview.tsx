import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingDown,
  TrendingUp,
  Car,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface CarbonCategory {
  name: string;
  value: number;
  percentage: number;
  icon: any;
  trend: "up" | "down";
  trendValue: number;
}

const categories: CarbonCategory[] = [
  {
    name: "Transport",
    value: 24.5,
    percentage: 45,
    icon: Car,
    trend: "down",
    trendValue: 12,
  },
  {
    name: "Energy",
    value: 18.2,
    percentage: 33,
    icon: Zap,
    trend: "up",
    trendValue: 8,
  },
  {
    name: "Food",
    value: 8.1,
    percentage: 15,
    icon: UtensilsCrossed,
    trend: "down",
    trendValue: 3,
  },
  {
    name: "Shopping",
    value: 3.7,
    percentage: 7,
    icon: ShoppingBag,
    trend: "up",
    trendValue: 5,
  },
];

export default function CarbonOverview() {
  const totalEmissions = categories.reduce((sum, cat) => sum + cat.value, 0);
  const weeklyTarget = 50;
  const isOnTrack = totalEmissions <= weeklyTarget;

  return (
    <div className="space-y-6">
      {/* Main Carbon Score */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-eco opacity-5" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            This Week's Carbon Footprint
          </CardTitle>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl font-bold">
              {totalEmissions.toFixed(1)}
            </span>
            <span className="text-lg text-muted-foreground">kg CO₂</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-2">
            {isOnTrack ? (
              <Badge
                variant="secondary"
                className="bg-success/10 text-success border-success/20"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                On Track
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-warning/10 text-warning border-warning/20"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Above Target
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weekly Target: {weeklyTarget}kg</span>
              <span>{((totalEmissions / weeklyTarget) * 100).toFixed(0)}%</span>
            </div>
            <Progress
              value={(totalEmissions / weeklyTarget) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const TrendIcon = category.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card
              key={category.name}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-eco-mint/20">
                      <Icon className="h-5 w-5 text-eco-green" />
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.value}kg CO₂
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <TrendIcon
                        className={`h-4 w-4 ${
                          category.trend === "up"
                            ? "text-warning"
                            : "text-success"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          category.trend === "up"
                            ? "text-warning"
                            : "text-success"
                        }`}
                      >
                        {category.trendValue}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      vs last week
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={category.percentage} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
