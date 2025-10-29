import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sparkles, Shield, Zap } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import heroImage from "@/assets/hero-plants.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-0" />
        
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur shadow-soft">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{t.aiPoweredDetection}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              {t.heroTitle}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/scan")}
                className="text-lg px-8 py-6 h-auto"
              >
                <Sparkles className="h-5 w-5" />
                {t.getStarted}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">{t.aboutTitle}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {t.aboutSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutDescription}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t.instantDetection}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.instantDetectionDesc}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">{t.aiTreatmentAdvice}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.aiTreatmentAdviceDesc}
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-success/10">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg">{t.earlyDetection}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.earlyDetectionDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">{t.howItWorks}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <CardTitle className="text-xl">{t.step1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.step1Desc}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <CardTitle className="text-xl">{t.step2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.step2Desc}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <CardTitle className="text-xl">{t.step3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.step3Desc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.poweredBy} <span className="font-semibold text-foreground">FastAPI</span> •{" "}
              <span className="font-semibold text-foreground">TensorFlow</span> •{" "}
              <span className="font-semibold text-foreground">n8n</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 AgroScan. {t.builtWithLove}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
