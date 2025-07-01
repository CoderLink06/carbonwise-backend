import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Trophy, Calendar } from "lucide-react";

export default function Goals() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Your Eco Goals</h1>
          <p className="text-muted-foreground">
            Set and track your carbon reduction goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Personal Goals</CardTitle>
            <p className="text-sm text-muted-foreground">
              Set custom carbon reduction targets
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Achievements</CardTitle>
            <p className="text-sm text-muted-foreground">
              Earn badges for sustainable choices
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mx-auto w-12 h-12 bg-gradient-eco rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mb-2">Challenges</CardTitle>
            <p className="text-sm text-muted-foreground">
              Join weekly eco-friendly challenges
            </p>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Goal setting and tracking features are under development. You'll
              be able to set custom goals, track progress, and earn achievements
              for your eco-friendly actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
