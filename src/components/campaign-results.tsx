import { useState } from "react"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, RefreshCw, Star, TrendingUp, Calendar, MessageSquare, Hash, Layout, Clock } from "lucide-react"
import { CampaignData } from "./campaign-input"

interface CampaignResultsProps {
  campaignData: CampaignData
  onNewCampaign: () => void
}

export const CampaignResults = ({ campaignData, onNewCampaign }: CampaignResultsProps) => {
  const [activeTab, setActiveTab] = useState("captions")

  const mockCaptions = [
    {
      id: 1,
      platform: "Instagram",
      content: `🚀 Transform your mornings with ${campaignData.productName}! 

Ready to level up your daily routine? Our ${campaignData.targetAudience} customers are obsessed with the results. 

✨ What makes it special:
• Game-changing features that actually work
• Designed for busy professionals
• Results you can see and feel

Drop a 💜 if you're ready for the upgrade!

#MorningRoutine #ProductivityHack #LevelUp`,
      engagement: 92,
      cta: "soft",
      tone: campaignData.tone
    },
    {
      id: 2,
      platform: "LinkedIn",
      content: `The ${campaignData.productName} difference: When productivity meets innovation.

As someone working with ${campaignData.targetAudience}, I've seen how the right tools can transform entire workflows.

Here's what we've learned:
→ Efficiency isn't about doing more, it's about doing better
→ Small changes compound into massive results
→ The best solutions feel intuitive from day one

What's your go-to productivity game-changer?`,
      engagement: 87,
      cta: "medium",
      tone: "professional"
    },
    {
      id: 3,
      platform: "TikTok",
      content: `POV: You found the productivity hack that actually works 😮‍💨

${campaignData.productName} users be like:
❌ Before: Chaotic mornings
✅ After: CEO energy all day

The secret? It's all about [product benefit]

Tell me you need this without telling me you need this 👇

#ProductivityTok #MorningHack #ThatGirl`,
      engagement: 95,
      cta: "hard",
      tone: "playful"
    }
  ]

  const mockStrategy = {
    angles: [
      "Problem-Solution: Daily chaos to organized success",
      "Lifestyle: The elevated professional routine",
      "FOMO: Join thousands who've transformed their mornings",
      "Social Proof: Real results from real professionals"
    ],
    hooks: [
      "The 5-minute morning routine that changed everything",
      "Why successful people swear by this one habit",
      "The productivity secret nobody talks about"
    ],
    competitors: [
      "Focus on speed vs. their complexity",
      "Emphasize simplicity vs. their feature overload",
      "Highlight community vs. their isolation"
    ]
  }

  const mockCalendar = [
    { day: "Monday", content: "Launch post - Problem awareness", type: "educational" },
    { day: "Tuesday", content: "Behind-the-scenes story", type: "story" },
    { day: "Wednesday", content: "User testimonial feature", type: "social-proof" },
    { day: "Thursday", content: "Quick tip carousel", type: "educational" },
    { day: "Friday", content: "Weekend motivation post", type: "inspirational" },
    { day: "Saturday", content: "Community spotlight", type: "engagement" },
    { day: "Sunday", content: "Week reflection & prep", type: "lifestyle" }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
              <Star className="w-4 h-4 text-success mr-2" />
              <span className="text-sm font-medium text-success">Campaign Ready</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Complete Campaign Kit</h2>
            <p className="text-lg text-muted-foreground">
              AI-generated content optimized for {campaignData.platforms.join(", ")}
            </p>
          </div>

          <div className="mb-8 flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1">
                Goal: {campaignData.goal}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Tone: {campaignData.tone}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Audience: {campaignData.targetAudience}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button variant="outline" size="sm" onClick={onNewCampaign}>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="captions" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Captions & Posts
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Creative Strategy
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Content Calendar
              </TabsTrigger>
              <TabsTrigger value="hashtags" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Hashtag Strategy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="captions" className="space-y-6">
              {mockCaptions.map((caption) => (
                <Card key={caption.id} className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          {caption.platform}
                        </Badge>
                        <Badge variant="outline">
                          {caption.cta.charAt(0).toUpperCase() + caption.cta.slice(1)} CTA
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-success">
                          <TrendingUp className="w-4 h-4" />
                          {caption.engagement}% predicted engagement
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(caption.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-line">
                      {caption.content}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="strategy" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign Angles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockStrategy.angles.map((angle, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{angle}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Viral Hooks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockStrategy.hooks.map((hook, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-creative mt-2 flex-shrink-0"></div>
                        <span className="text-sm">"{hook}"</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">Competitive Edge</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockStrategy.competitors.map((edge, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{edge}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    7-Day Content Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCalendar.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="w-16 text-sm font-medium text-center">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.content}</h4>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>9:00 AM</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hashtags" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Primary Hashtags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["#ProductivityHack", "#MorningRoutine", "#LevelUp", "#ThatGirl", "#SuccessHabits"].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Niche Hashtags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["#WorkSmarter", "#DailyHabits", "#ProfessionalLife", "#TimeManagement", "#RoutineOptimization"].map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-creative/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button variant="creative" size="hero" onClick={onNewCampaign}>
              Create Another Campaign
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}