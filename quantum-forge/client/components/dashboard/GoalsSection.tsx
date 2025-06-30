import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Target,
  Trophy,
  Calendar,
  TrendingDown,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: "active" | "completed" | "pending";
  badge?: string;
}

const goals: Goal[] = [
  {
    id: "1",
    title: "Reduce Weekly Transport",
    description: "Use public transport 3 days this week",
    target: 3,
    current: 2,
    unit: "days",
    deadline: "This week",
    status: "active",
  },
  {
    id: "2",
    title: "Zero Plastic Week",
    description: "Avoid single-use plastic items",
    target: 7,
    current: 4,
    unit: "days",
    deadline: "This week",
    status: "active",
  },
  {
    id: "3",
    title: "Energy Saver",
    description: "Reduce electricity usage by 15%",
    target: 15,
    current: 15,
    unit: "%",
    deadline: "This month",
    status: "completed",
    badge: "Eco Warrior",
  },
];

const achievements = [
  {
    name: "First Steps",
    icon: "🌱",
    description: "Logged your first activity",
  },
  { name: "Week Warrior", icon: "⚡", description: "Completed weekly goals" },
  {
    name: "Carbon Crusher",
    icon: "🏆",
    description: "Reduced footprint by 50%",
  },
  {
    name: "Eco Expert",
    icon: "🌍",
    description: "30 days of consistent tracking",
  },
];

export default function GoalsSection() {
  return (
    <div className="space-y-6">
      {/* Active Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-eco-green" />
            <span>Active Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 rounded-lg border border-border/50 hover:border-eco-green/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  {goal.status === "completed" && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                  {goal.badge && (
                    <Badge className="bg-eco-green/10 text-eco-green border-eco-green/20">
                      <Star className="h-3 w-3 mr-1" />
                      {goal.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{goal.deadline}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {goal.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress
                  value={(goal.current / goal.target) * 100}
                  className={`h-2 ${
                    goal.status === "completed" ? "bg-success/20" : ""
                  }`}
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full border-eco-green/20 hover:bg-eco-green/5"
          >
            <Target className="h-4 w-4 mr-2" />
            Set New Goal
          </Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-eco-green" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.name}
                className={`text-center p-3 rounded-lg border transition-colors ${
                  index < 2
                    ? "border-eco-green/20 bg-eco-green/5"
                    : "border-border/30 bg-muted/20"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className="text-sm font-medium mb-1">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-eco opacity-5" />
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-eco-green" />
            <span>This Week's Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-eco-green/10">
                <TrendingDown className="h-5 w-5 text-eco-green" />
              </div>
              <div>
                <h4 className="font-medium">Reduce by 20%</h4>
                <p className="text-sm text-muted-foreground">
                  Cut your carbon footprint by 20% this week
                </p>
              </div>
            </div>
            <div className="bg-eco-mint/10 rounded-lg p-3 border border-eco-green/10">
              <p className="text-sm text-eco-forest">
                <strong>AI Tip:</strong> Try carpooling for 2 trips and using a
                reusable coffee cup. This could save approximately 8kg CO₂!
              </p>
            </div>
            <Button className="w-full bg-gradient-eco hover:bg-gradient-eco/90 text-white">
              Accept Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
