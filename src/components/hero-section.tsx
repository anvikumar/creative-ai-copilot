import { Button } from "@/components/ui/enhanced-button"
import { Sparkles, Zap, Target } from "lucide-react"
import heroImage from "@/assets/hero-ai-brain.jpg"

interface HeroSectionProps {
  onGetStarted: () => void
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-creative/5 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-creative rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">AI-Powered Creative Copilot</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Ideas Into 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Viral Campaigns</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Generate complete campaign strategies with AI-powered captions, creative angles, 
              and platform-optimized content in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" className="group" onClick={onGetStarted}>
                Start Creating
                <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
              </Button>
              <Button variant="outline" size="hero">
                Watch Demo
              </Button>
            </div>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium">Persona-Aware Content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-creative/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-creative" />
                </div>
                <span className="text-sm font-medium">Multi-Platform Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-warning" />
                </div>
                <span className="text-sm font-medium">A/B Testing Ready</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-creative">
              <img
                src={heroImage}
                alt="AI Creative Copilot Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-soft animate-pulse">
              <div className="text-xs font-medium text-creative">Generating...</div>
              <div className="text-sm text-muted-foreground">Campaign Strategy</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-soft animate-pulse delay-1000">
              <div className="text-xs font-medium text-success">Ready!</div>
              <div className="text-sm text-muted-foreground">Content Calendar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}