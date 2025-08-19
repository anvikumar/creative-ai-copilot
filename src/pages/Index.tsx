import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { CampaignInput, CampaignData } from "@/components/campaign-input"
import { AIProcessing } from "@/components/ai-processing"
import { VisualPostGenerator } from "@/components/visual-post-generator"

type AppState = "hero" | "input" | "processing" | "results"

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("hero")
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null)

  const handleGetStarted = () => {
    setCurrentState("input")
  }

  const handleGenerateCampaign = (data: CampaignData) => {
    setCampaignData(data)
    setCurrentState("processing")
  }

  const handleProcessingComplete = () => {
    setCurrentState("results")
  }

  const handleNewCampaign = () => {
    setCampaignData(null)
    setCurrentState("input")
  }

  return (
    <div className="min-h-screen">
      {currentState === "hero" && <HeroSection onGetStarted={handleGetStarted} />}
      {currentState === "input" && <CampaignInput onGenerate={handleGenerateCampaign} />}
      {currentState === "processing" && <AIProcessing onComplete={handleProcessingComplete} />}
      {currentState === "results" && campaignData && (
        <VisualPostGenerator campaignData={campaignData} onNewCampaign={handleNewCampaign} />
      )}
    </div>
  )
};

export default Index;
