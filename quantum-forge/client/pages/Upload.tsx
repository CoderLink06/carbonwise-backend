import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload as UploadIcon,
  FileText,
  Plus,
  Bot,
  CheckCircle,
  AlertCircle,
  Loader,
  Download,
} from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  extractedData?: any;
}

interface ManualActivity {
  type: string;
  description: string;
  value: string;
  unit: string;
}

export default function Upload() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualActivities, setManualActivities] = useState<ManualActivity[]>([
    { type: "", description: "", value: "", unit: "" },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "uploading" as const,
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate file processing
    for (const fileObj of newFiles) {
      await processFile(fileObj);
    }
  };

  const processFile = async (fileObj: UploadedFile) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === fileObj.id ? { ...f, progress: i } : f)),
      );
    }

    // Change to processing
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileObj.id ? { ...f, status: "processing", progress: 100 } : f,
      ),
    );

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Complete processing with mock data
    const mockExtractedData = {
      type: fileObj.file.name.includes("electricity") ? "energy" : "transport",
      amount: Math.floor(Math.random() * 500) + 100,
      period: "monthly",
      carbonEmissions: Math.floor(Math.random() * 50) + 10,
    };

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileObj.id
          ? {
              ...f,
              status: "completed",
              extractedData: mockExtractedData,
            }
          : f,
      ),
    );
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const addManualActivity = () => {
    setManualActivities([
      ...manualActivities,
      { type: "", description: "", value: "", unit: "" },
    ]);
  };

  const updateManualActivity = (
    index: number,
    field: keyof ManualActivity,
    value: string,
  ) => {
    setManualActivities(
      manualActivities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity,
      ),
    );
  };

  const removeManualActivity = (index: number) => {
    setManualActivities(manualActivities.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    setIsProcessing(true);

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Store results in localStorage (in real app, this would be sent to backend)
    const analysisData = {
      files: uploadedFiles.filter((f) => f.status === "completed"),
      activities: manualActivities.filter((a) => a.type && a.value),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("carbonAnalysis", JSON.stringify(analysisData));

    setIsProcessing(false);
    navigate("/dashboard");
  };

  const canAnalyze =
    uploadedFiles.some((f) => f.status === "completed") ||
    manualActivities.some((a) => a.type && a.value);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Carbon Footprint Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Upload your data or manually input activities to get AI-powered
            insights
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-eco-green/10 text-eco-green border-eco-green/20">
              <Bot className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              IBM Data Prep Kit
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="gap-2">
              <UploadIcon className="h-4 w-4" />
              Upload Files
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <Plus className="h-4 w-4" />
              Manual Input
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UploadIcon className="h-5 w-5 text-eco-green" />
                  <span>Upload Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-eco-green bg-eco-green/5"
                      : "border-border hover:border-eco-green/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drag and drop your files here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Or click to browse files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".csv,.pdf,.jpg,.jpeg,.png,.txt"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button
                      variant="outline"
                      className="border-eco-green/20 hover:bg-eco-green/5"
                      asChild
                    >
                      <span>Choose Files</span>
                    </Button>
                  </label>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Supported: CSV, PDF, JPG, PNG, TXT (Max 10MB each)
                  </div>
                </div>

                {/* Supported File Types */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { type: "Utility Bills", desc: "Electricity, gas, water" },
                    { type: "Receipts", desc: "Fuel, shopping, food" },
                    { type: "CSV Data", desc: "Activity logs, expenses" },
                    { type: "Travel Docs", desc: "Flight tickets, bookings" },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="p-3 rounded-lg border border-border/50 text-center"
                    >
                      <FileText className="h-6 w-6 text-eco-green mx-auto mb-2" />
                      <p className="font-medium text-sm">{item.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedFiles.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-border/50"
                    >
                      <FileText className="h-8 w-8 text-eco-green" />
                      <div className="flex-1">
                        <p className="font-medium">{fileObj.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {fileObj.status === "uploading" && (
                          <Progress
                            value={fileObj.progress}
                            className="mt-2 h-2"
                          />
                        )}
                        {fileObj.status === "processing" && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Loader className="h-4 w-4 animate-spin text-eco-green" />
                            <span className="text-sm text-eco-green">
                              AI Processing...
                            </span>
                          </div>
                        )}
                        {fileObj.extractedData && (
                          <div className="mt-2 p-2 bg-eco-mint/10 rounded border border-eco-green/20">
                            <p className="text-xs text-eco-forest">
                              <strong>Extracted:</strong>{" "}
                              {fileObj.extractedData.type} •{" "}
                              {fileObj.extractedData.amount}{" "}
                              {fileObj.extractedData.period} •{" "}
                              {fileObj.extractedData.carbonEmissions}kg CO₂
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        {fileObj.status === "completed" && (
                          <CheckCircle className="h-6 w-6 text-success" />
                        )}
                        {fileObj.status === "error" && (
                          <AlertCircle className="h-6 w-6 text-destructive" />
                        )}
                        {(fileObj.status === "uploading" ||
                          fileObj.status === "processing") && (
                          <Loader className="h-6 w-6 animate-spin text-eco-green" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            {/* Manual Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-eco-green" />
                    <span>Manual Activity Input</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addManualActivity}
                    className="border-eco-green/20 hover:bg-eco-green/5"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Activity
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {manualActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg border border-border/50"
                  >
                    <div className="space-y-2">
                      <Label>Activity Type</Label>
                      <Select
                        value={activity.type}
                        onValueChange={(value) =>
                          updateManualActivity(index, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="e.g., Daily commute by car"
                        value={activity.description}
                        onChange={(e) =>
                          updateManualActivity(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        value={activity.value}
                        onChange={(e) =>
                          updateManualActivity(index, "value", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Select
                        value={activity.unit}
                        onValueChange={(value) =>
                          updateManualActivity(index, "unit", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="km">Kilometers</SelectItem>
                          <SelectItem value="kwh">kWh</SelectItem>
                          <SelectItem value="liters">Liters</SelectItem>
                          <SelectItem value="meals">Meals</SelectItem>
                          <SelectItem value="items">Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {manualActivities.length > 1 && (
                      <div className="md:col-span-4 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeManualActivity(index)}
                          className="text-destructive border-destructive/20 hover:bg-destructive/5"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analyze Button */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">Ready for Analysis?</h3>
            <p className="text-muted-foreground mb-6">
              Our AI will process your data using IBM Data Prep Kit and
              calculate your carbon footprint with actionable insights.
            </p>
            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!canAnalyze || isProcessing}
              className="bg-gradient-eco hover:bg-gradient-eco/90 text-white px-8 py-3"
            >
              {isProcessing ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-5 w-5" />
                  Analyze Carbon Footprint
                </>
              )}
            </Button>
            {!canAnalyze && (
              <p className="text-sm text-muted-foreground mt-2">
                Please upload files or add manual activities to continue
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
