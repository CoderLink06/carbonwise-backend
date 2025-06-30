import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Lightbulb, ArrowRight } from "lucide-react";

interface Suggestion {
  id: string;
  type: "tip" | "insight" | "alert";
  title: string;
  description: string;
  impact: string;
  action?: string;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    type: "alert",
    title: "High Transport Emissions",
    description: "You took 5 cab rides this week, generating 14kg CO₂.",
    impact: "Taking metro could save 80% emissions",
    action: "Plan metro routes",
  },
  {
    id: "2",
    type: "tip",
    title: "Try a Steel Water Bottle",
    description: "Reduce single-use plastic consumption this week.",
    impact: "Save 2kg CO₂ monthly",
    action: "Set reminder",
  },
  {
    id: "3",
    type: "insight",
    title: "Energy Usage Analysis",
    description: "Your electricity usage is 8% higher than similar households.",
    impact: "Optimize for 15% reduction",
    action: "Get tips",
  },
];

export default function AIAssistant() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-eco opacity-10 rounded-full -translate-y-8 translate-x-8" />
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-eco">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span>Your Carbon Assistant</span>
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
                "Good morning! I've analyzed your weekly activities. Your
                transport emissions are higher than usual. Shall we explore some
                eco-friendly alternatives for your commute?"
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            AI Recommendations
          </h4>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-eco-green/20 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
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
                    {suggestion.type === "insight" && "📊"}
                    {suggestion.type.charAt(0).toUpperCase() +
                      suggestion.type.slice(1)}
                  </Badge>
                </div>
                <h5 className="text-sm font-medium">{suggestion.title}</h5>
                <p className="text-xs text-muted-foreground mb-1">
                  {suggestion.description}
                </p>
                <p className="text-xs text-eco-green font-medium">
                  {suggestion.impact}
                </p>
              </div>
              {suggestion.action && (
                <Button size="sm" variant="ghost" className="ml-2 h-8 px-2">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button className="w-full bg-gradient-eco hover:bg-gradient-eco/90 text-white">
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat with AI Assistant
        </Button>
      </CardContent>
    </Card>
  );
}
