import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sparkles, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-plants.jpg";

const Index = () => {
  const navigate = useNavigate();

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
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur shadow-soft">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Plant Disease Detection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              AgroScan
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium">
              Upload a leaf photo. Detect diseases instantly. Get AI-guided treatment advice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/scan")}
                className="text-lg px-8 py-6 h-auto"
              >
                <Sparkles className="h-5 w-5" />
                Get Started
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
              <CardTitle className="text-3xl">About AgroScan</CardTitle>
              <CardDescription className="text-lg mt-2">
                Empowering smallholder farmers with cutting-edge technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                AgroScan helps smallholder farmers identify crop diseases early using machine learning.
                Our platform combines the power of FastAPI for rapid image processing, TensorFlow for
                accurate disease detection, and n8n automation for intelligent treatment recommendations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Instant Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Get disease identification in seconds using advanced AI models
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Treatment Advice</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized treatment and prevention recommendations
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-full bg-success/10">
                    <Shield className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-semibold text-lg">Early Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Catch diseases before they spread and protect your crops
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
          <h2 className="text-3xl font-bold">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <CardTitle className="text-xl">Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Take a clear photo of the affected plant leaf and upload it to AgroScan
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <CardTitle className="text-xl">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI model analyzes the image and identifies potential diseases with confidence scores
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <CardTitle className="text-xl">Get Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive detailed treatment recommendations and preventive measures for your crops
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
              Powered by <span className="font-semibold text-foreground">FastAPI</span> •{" "}
              <span className="font-semibold text-foreground">TensorFlow</span> •{" "}
              <span className="font-semibold text-foreground">n8n</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 AgroScan. Built with ❤️ for farmers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
