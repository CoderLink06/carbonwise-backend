import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Upload,
  Car,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

const activityTypes = [
  { value: "transport", label: "Transport", icon: Car },
  { value: "energy", label: "Energy", icon: Zap },
  { value: "food", label: "Food", icon: UtensilsCrossed },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
];

const transportModes = [
  { value: "car", label: "Car/Taxi", factor: 0.2 },
  { value: "bus", label: "Bus", factor: 0.05 },
  { value: "metro", label: "Metro/Train", factor: 0.04 },
  { value: "bike", label: "Bike", factor: 0 },
  { value: "walk", label: "Walking", factor: 0 },
];

export default function ActivityInput() {
  const [selectedType, setSelectedType] = useState("");
  const [distance, setDistance] = useState("");
  const [mode, setMode] = useState("");

  const calculateCO2 = () => {
    if (!distance || !mode) return 0;
    const selectedMode = transportModes.find((m) => m.value === mode);
    return (parseFloat(distance) * (selectedMode?.factor || 0)).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Quick Activity Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-eco-green" />
            <span>Log New Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedType === "transport" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="transport-mode">Transport Mode</Label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.map((transportMode) => (
                        <SelectItem
                          key={transportMode.value}
                          value={transportMode.value}
                        >
                          {transportMode.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated CO₂</Label>
                  <div className="p-2 bg-eco-mint/10 rounded-md border border-eco-green/20">
                    <span className="text-sm font-medium text-eco-forest">
                      {calculateCO2()} kg CO₂
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button className="w-full bg-gradient-eco hover:bg-gradient-eco/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-eco-green" />
            <span>Upload Bills & Receipts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-eco-green/50 transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports PDF, CSV, JPG, PNG (Max 10MB)
            </p>
            <Button
              variant="outline"
              className="border-eco-green/20 hover:bg-eco-green/5"
            >
              Choose Files
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              AI will automatically extract carbon data from:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Electricity bills",
                "Fuel receipts",
                "Flight tickets",
                "Uber receipts",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 bg-eco-mint/10 text-eco-forest text-xs rounded-md border border-eco-green/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
