import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  BarChart3,
  Upload,
  Bot,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-mint/20 to-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-eco">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-eco bg-clip-text text-transparent">
              Carbonwise
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/upload">
              <Button
                size="sm"
                className="bg-gradient-eco hover:bg-gradient-eco/90 text-white"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <Badge className="bg-eco-green/10 text-eco-green border-eco-green/20 mb-4">
            🏆 IBM Hackathon Winner 2024
          </Badge>

          <h1 className="text-5xl font-bold leading-tight">
            <span className="block">Know Your</span>
            <span className="bg-gradient-eco bg-clip-text text-transparent">
              Carbon Impact
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered carbon footprint analysis that transforms your daily
            activities, bills, and data into actionable environmental insights.
            Make every choice count towards a sustainable future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/upload">
              <Button
                size="lg"
                className="bg-gradient-eco hover:bg-gradient-eco/90 text-white px-8 py-4 text-lg h-auto"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Start My Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg h-auto border-eco-green/20 hover:bg-eco-green/5"
            >
              <Bot className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </div>

          <div className="flex justify-center space-x-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-eco-green" />
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-eco-green" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-eco-green" />
              <span>IBM Technology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to understand and reduce your carbon footprint
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-eco opacity-10 rounded-full -translate-y-10 translate-x-10" />
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                1. Upload Your Data
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload utility bills, receipts, CSV files, or manually input
                your daily activities. Our AI handles any format.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-eco opacity-10 rounded-full -translate-y-10 translate-x-10" />
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-6">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                IBM Data Prep Kit cleans your data while our agentic AI
                calculates precise CO₂ emissions using advanced formulas.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-eco opacity-10 rounded-full -translate-y-10 translate-x-10" />
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-eco rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive personalized recommendations, track progress, and export
                professional reports to reduce your impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-eco text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Eco Warriors</h2>
            <p className="text-lg opacity-90">
              Join thousands making a difference with data-driven decisions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-80">Analyses Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.1M</div>
              <div className="text-sm opacity-80">kg CO₂ Reduced</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-80">User Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">🏆</div>
              <div className="text-sm opacity-80">IBM Award Winner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">Ready to Make an Impact?</h2>
          <p className="text-muted-foreground text-lg">
            Start your carbon footprint analysis today and discover how small
            changes can make a big difference for our planet.
          </p>
          <Link to="/upload">
            <Button
              size="lg"
              className="bg-gradient-eco hover:bg-gradient-eco/90 text-white px-8 py-4 text-lg h-auto"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Leaf className="h-4 w-4 text-eco-green" />
            <span className="font-medium">Carbonwise</span>
          </div>
          <p>Powered by IBM Technology & AI • Built for a Sustainable Future</p>
        </div>
      </footer>
    </div>
  );
}
