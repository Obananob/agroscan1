import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Upload, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  class: string;
  confidence: number;
}

interface TreatmentAdvice {
  disease: string;
  treatment: string;
  prevention: string;
}

const Scan = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [treatmentAdvice, setTreatmentAdvice] = useState<TreatmentAdvice | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPrediction(null);
      setTreatmentAdvice(null);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsDetecting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://agroscan-1.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to detect disease");
      }

      const data = await response.json();
      setPrediction(data);
      
      if (data.class === "Uncertain") {
        toast.warning("⚠️ Please upload a clearer image.");
      } else {
        toast.success("Disease detected successfully!");
      }
    } catch (error) {
      console.error("Detection error:", error);
      toast.error("Backend unavailable, please try again later.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!prediction) return;

    setIsFetchingAdvice(true);
    try {
      const response = await fetch("https://hook.eu2.make.com/q2a51qipwk5fqi2yr7cu3pq91jyboe46", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease: prediction.class,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch treatment advice");
      }

      const data = await response.json();
      setTreatmentAdvice(data);
      toast.success("Treatment advice generated!");
    } catch (error) {
      console.error("Advice error:", error);
      toast.error("Unable to generate advice. Please try again.");
    } finally {
      setIsFetchingAdvice(false);
    }
  };

  const isUncertain = prediction?.class === "Uncertain";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">AgroScan</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Detect Plant Diseases</h2>
            <p className="text-muted-foreground">Upload a clear photo of a plant leaf to get started</p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Upload Leaf Image</CardTitle>
              <CardDescription>Select an image file (JPG, PNG, WEBP) - Max 10MB</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-60 max-w-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                      </div>
                    )}
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleDetect}
                  disabled={!selectedFile || isDetecting}
                  className="w-full sm:w-auto"
                >
                  {isDetecting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Detect Disease
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {prediction && (
            <Card className="shadow-medium border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Detection Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isUncertain && (
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-sm text-warning-foreground flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>⚠️ Uncertain Detection:</strong> Please upload a clearer image of the plant leaf.
                      </span>
                    </p>
                  </div>
                )}
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Disease Detected</p>
                    <p className="text-lg font-semibold">{prediction.class}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-lg font-semibold">{(prediction.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {!isUncertain && (
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleGetAdvice}
                    disabled={isFetchingAdvice}
                    className="w-full"
                  >
                    {isFetchingAdvice ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Fetching Advice...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Get Treatment Advice
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {treatmentAdvice && (
            <Card className="shadow-medium border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  AI Treatment Advice
                </CardTitle>
                <CardDescription>
                  AI-generated advice — Please confirm with an agronomist before applying treatments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Disease</h3>
                    <p className="text-muted-foreground">{treatmentAdvice.disease}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Treatment Advice</h3>
                    <p className="text-muted-foreground">{treatmentAdvice.treatment}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">Preventive Measures</h3>
                    <p className="text-muted-foreground">{treatmentAdvice.prevention}</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning-foreground flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Disclaimer:</strong> This is AI-generated advice based on the detected disease.
                      Always consult with a certified agronomist or agricultural expert before applying any
                      treatments to your crops.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scan;
