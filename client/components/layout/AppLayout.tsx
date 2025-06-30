import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Target,
  FileText,
  Plus,
  Leaf,
  Menu,
  X,
  Bot,
} from "lucide-react";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Track Activity", href: "/track", icon: Plus },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Reports", href: "/reports", icon: FileText },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-mint/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-eco">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-eco bg-clip-text text-transparent">
                Carbonwise
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive &&
                        "bg-gradient-eco text-white hover:bg-gradient-eco/90",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* AI Assistant Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 border-eco-green/20 hover:bg-eco-green/5"
            >
              <Bot className="h-4 w-4 text-eco-green" />
              AI Assistant
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <nav className="container py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "w-full justify-start gap-2",
                        isActive &&
                          "bg-gradient-eco text-white hover:bg-gradient-eco/90",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 border-eco-green/20 hover:bg-eco-green/5"
              >
                <Bot className="h-4 w-4 text-eco-green" />
                AI Assistant
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>
    </div>
  );
}
