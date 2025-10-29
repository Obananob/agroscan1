import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Upload, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { toast } from "sonner";

interface PredictionResult {
  class: string;
  confidence: number;
}

interface TreatmentAdvice {
  advice: string;
}

const Scan = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);
  
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
        toast.error(t.selectImageFile);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t.fileSizeError);
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
      toast.error(t.selectImageFirst);
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
        toast.warning(t.uploadClearerImage);
      } else {
        toast.success(t.detectedSuccessfully);
      }
    } catch (error) {
      console.error("Detection error:", error);
      toast.error(t.backendUnavailable);
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
          "Content-Type": "text/plain",
        },
        body: prediction.class,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch treatment advice");
      }

      const rawText = await response.text();
      
      // Clean the response text
      let cleanedText = rawText
        // Remove common filler phrases and greetings
        .replace(/^(Alright,?|Yes,?|Sure,?|Okay,?|Hello there!?|Hi there!?|Hey there!?)\s*/i, "")
        .replace(/let's talk about/i, "Let's discuss")
        .replace(/let me help you with/i, "Here's guidance on")
        // Normalize line breaks and remove excessive whitespace
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      if (!cleanedText) {
        throw new Error("No advice received");
      }

      setTreatmentAdvice({ advice: cleanedText });
      toast.success(t.treatmentGenerated);
    } catch (error) {
      console.error("Advice error:", error);
      const errorMessage = error instanceof Error && error.message === "No advice received"
        ? t.noAdviceReceived
        : t.unableToGenerateAdvice;
      toast.error(errorMessage);
    } finally {
      setIsFetchingAdvice(false);
    }
  };

  const isUncertain = prediction?.class === "Uncertain";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">{t.agroscan}</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">{t.detectPlantDiseases}</h2>
            <p className="text-muted-foreground">{t.uploadPrompt}</p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>{t.uploadLeafImage}</CardTitle>
              <CardDescription>{t.fileRequirements}</CardDescription>
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
                          <span className="font-semibold">{t.clickToUpload}</span> {t.dragAndDrop}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.fileTypes}</p>
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
                      {t.detecting}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {t.detectDisease}
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
                  {t.detectionResults}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isUncertain && (
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-sm text-warning-foreground flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>{t.uncertainWarning}</strong> {t.uncertainMessage}
                      </span>
                    </p>
                  </div>
                )}
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.diseaseDetected}</p>
                    <p className="text-lg font-semibold">{prediction.class}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{t.confidence}</p>
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
                        {t.fetchingAdvice}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        {t.getTreatmentAdvice}
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
                  {t.aiTreatmentAdviceTitle}
                </CardTitle>
                <CardDescription>
                  {t.aiAdviceDisclaimer}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {treatmentAdvice.advice}
                  </p>
                </div>

                <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-warning-foreground flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
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
