import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, Lightbulb, Calendar, BarChart3, Sparkles } from "lucide-react"

interface AIProcessingProps {
  onComplete: () => void
}

const processingSteps = [
  {
    icon: Brain,
    title: "Analyzing Product & Audience",
    description: "Understanding your target persona and product positioning",
    duration: 2000
  },
  {
    icon: Target,
    title: "Generating Campaign Angles",
    description: "Creating emotional hooks and value propositions",
    duration: 1500
  },
  {
    icon: Lightbulb,
    title: "Crafting Creative Strategy",
    description: "Developing platform-specific content variations",
    duration: 2500
  },
  {
    icon: Calendar,
    title: "Building Content Calendar",
    description: "Optimizing posting schedule and campaign flow",
    duration: 1500
  },
  {
    icon: BarChart3,
    title: "Predictive Scoring",
    description: "Estimating engagement potential for each variant",
    duration: 1000
  }
]

export const AIProcessing = ({ onComplete }: AIProcessingProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < processingSteps.length - 1) {
        setCurrentStep(currentStep + 1)
        setProgress(((currentStep + 1) / processingSteps.length) * 100)
      } else {
        setProgress(100)
        setTimeout(onComplete, 500)
      }
    }, processingSteps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
              <span className="text-sm font-medium text-primary">AI at Work</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Creating Your Campaign</h2>
            <p className="text-lg text-muted-foreground">
              Our AI is analyzing your inputs and generating a comprehensive campaign strategy
            </p>
          </div>

          <Card className="shadow-creative">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">Processing...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="space-y-6">
                  {processingSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === currentStep
                    const isCompleted = index < currentStep
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-primary/10 border border-primary/20 shadow-soft"
                            : isCompleted
                            ? "bg-success/10 border border-success/20"
                            : "bg-muted/50 border border-border/50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-primary text-primary-foreground animate-pulse"
                              : isCompleted
                              ? "bg-success text-success-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold transition-colors duration-500 ${
                              isActive
                                ? "text-primary"
                                : isCompleted
                                ? "text-success"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                        </div>
                        {isCompleted && (
                          <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                            <span className="text-success-foreground text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}