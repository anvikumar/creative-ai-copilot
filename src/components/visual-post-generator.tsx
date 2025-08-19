import { useState } from "react"
import { CampaignData } from "./campaign-input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface VisualPostGeneratorProps {
  campaignData: CampaignData
  onNewCampaign: () => void
}

interface PostTemplate {
  id: string
  name: string
  type: "post" | "story"
  layout: "minimal" | "bold" | "lifestyle" | "product-focus" | "testimonial"
  bgColor: string
  textColor: string
  accentColor: string
}

interface GeneratedPost {
  template: PostTemplate
  headline: string
  subtext: string
  cta: string
  caption: string
  hashtags: string[]
}

const POST_TEMPLATES: PostTemplate[] = [
  {
    id: "minimal-post",
    name: "Minimal Clean",
    type: "post",
    layout: "minimal",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    accentColor: "text-primary"
  },
  {
    id: "bold-impact",
    name: "Bold Impact",
    type: "post", 
    layout: "bold",
    bgColor: "bg-gradient-primary",
    textColor: "text-white",
    accentColor: "text-yellow-300"
  },
  {
    id: "lifestyle-vibe",
    name: "Lifestyle",
    type: "post",
    layout: "lifestyle",
    bgColor: "bg-gradient-subtle",
    textColor: "text-gray-800",
    accentColor: "text-creative"
  },
  {
    id: "product-hero",
    name: "Product Hero",
    type: "post",
    layout: "product-focus",
    bgColor: "bg-card",
    textColor: "text-foreground",
    accentColor: "text-primary"
  },
  {
    id: "story-minimal",
    name: "Story Minimal",
    type: "story",
    layout: "minimal",
    bgColor: "bg-gradient-creative",
    textColor: "text-white",
    accentColor: "text-yellow-200"
  },
  {
    id: "story-bold",
    name: "Story Impact",
    type: "story",
    layout: "bold",
    bgColor: "bg-black",
    textColor: "text-white",
    accentColor: "text-primary"
  }
]

export const VisualPostGenerator = ({ campaignData, onNewCampaign }: VisualPostGeneratorProps) => {
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSmartContent = (template: PostTemplate): GeneratedPost => {
    const { productName, productDescription, goal, tone, targetAudience } = campaignData
    
    // Smart headline generation based on goal and tone
    const headlines = {
      awareness: {
        professional: `Introducing ${productName}`,
        casual: `Meet ${productName} 👋`,
        playful: `Say hello to ${productName}! 🎉`,
        bold: `${productName.toUpperCase()} IS HERE`
      },
      sales: {
        professional: `${productName} - Limited Time Offer`,
        casual: `Get ${productName} today!`,
        playful: `Don't miss out on ${productName}! 🔥`,
        bold: `BUY ${productName.toUpperCase()} NOW`
      },
      engagement: {
        professional: `What do you think of ${productName}?`,
        casual: `Tell us about your ${productName} experience`,
        playful: `Who else loves ${productName}? 💕`,
        bold: `${productName.toUpperCase()} - YES OR NO?`
      }
    }

    // Smart CTA generation
    const ctas = {
      awareness: ["Learn More", "Discover", "Explore", "See Details"],
      sales: ["Shop Now", "Buy Today", "Get Yours", "Order Now", "Claim Offer"],
      engagement: ["Comment Below", "Share Your Thoughts", "Tag a Friend", "What's Your Take?"]
    }

    // Smart subtext based on product description
    const getSmartSubtext = () => {
      const description = productDescription.toLowerCase()
      if (description.includes('health') || description.includes('fitness')) {
        return tone === 'playful' ? "Your wellness journey starts here! 💪" : "Transform your health today"
      }
      if (description.includes('food') || description.includes('recipe')) {
        return tone === 'playful' ? "Taste the difference! 😋" : "Premium quality you can taste"
      }
      if (description.includes('tech') || description.includes('app')) {
        return tone === 'playful' ? "Innovation made simple! 📱" : "Technology that works for you"
      }
      return tone === 'playful' ? "You're going to love this! ✨" : "Quality that speaks for itself"
    }

    // Generate compelling caption
    const generateCaption = () => {
      const hooks = [
        `Here's why ${targetAudience} are obsessed with ${productName}...`,
        `The ${productName} everyone's talking about 👇`,
        `Why ${productName} is different from everything else:`,
        `3 reasons ${productName} is perfect for ${targetAudience}:`
      ]
      
      const hook = hooks[Math.floor(Math.random() * hooks.length)]
      const benefits = productDescription.split('.').slice(0, 3).map(benefit => `✓ ${benefit.trim()}`).join('\n')
      
      return `${hook}\n\n${benefits}\n\nReady to experience the difference?`
    }

    // Smart hashtag generation
    const generateHashtags = () => {
      const baseHashtags = [`#${productName.replace(/\s+/g, '').toLowerCase()}`]
      const industryHashtags = {
        health: ['#wellness', '#healthylifestyle', '#fitness'],
        food: ['#foodie', '#delicious', '#tasty'],
        tech: ['#innovation', '#technology', '#digital'],
        fashion: ['#style', '#fashion', '#trendy'],
        business: ['#productivity', '#success', '#professional']
      }
      
      const description = productDescription.toLowerCase()
      let relevantTags: string[] = []
      
      Object.entries(industryHashtags).forEach(([industry, tags]) => {
        if (description.includes(industry)) {
          relevantTags = [...relevantTags, ...tags]
        }
      })
      
      const goalTags = {
        awareness: ['#new', '#introducing', '#discover'],
        sales: ['#sale', '#offer', '#limited', '#deal'],
        engagement: ['#community', '#share', '#thoughts']
      }
      
      return [...baseHashtags, ...relevantTags.slice(0, 3), ...goalTags[goal as keyof typeof goalTags] || [], '#instagood', '#amazing'].slice(0, 8)
    }

    return {
      template,
      headline: headlines[goal as keyof typeof headlines]?.[tone as keyof typeof headlines.awareness] || `Amazing ${productName}`,
      subtext: getSmartSubtext(),
      cta: ctas[goal as keyof typeof ctas][Math.floor(Math.random() * ctas[goal as keyof typeof ctas].length)],
      caption: generateCaption(),
      hashtags: generateHashtags()
    }
  }

  const generatePosts = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Smart template selection based on campaign data
    const selectedTemplates = POST_TEMPLATES.filter(template => {
      if (campaignData.goal === 'sales' && template.layout === 'bold') return true
      if (campaignData.goal === 'awareness' && template.layout === 'minimal') return true
      if (campaignData.goal === 'engagement' && template.layout === 'lifestyle') return true
      if (template.layout === 'product-focus') return true
      return false
    }).slice(0, 4)
    
    const posts = selectedTemplates.map(template => generateSmartContent(template))
    setGeneratedPosts(posts)
    setIsGenerating(false)
    toast.success("🎨 Visual posts generated!")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const downloadPost = (post: GeneratedPost) => {
    // This would integrate with a canvas library or API to generate actual images
    toast.success("Download feature coming soon!")
  }

  if (generatedPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Generate Visual Campaign
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI will create Instagram-ready posts and stories with smart template selection, 
              compelling CTAs, and perfectly placed content based on your campaign data.
            </p>
            
            <div className="bg-card p-6 rounded-lg shadow-soft space-y-4">
              <h3 className="text-lg font-semibold">Campaign Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Product:</strong> {campaignData.productName}</div>
                <div><strong>Goal:</strong> {campaignData.goal}</div>
                <div><strong>Tone:</strong> {campaignData.tone}</div>
                <div><strong>Audience:</strong> {campaignData.targetAudience}</div>
              </div>
            </div>

            <Button 
              onClick={generatePosts}
              disabled={isGenerating}
              size="lg"
              className="bg-gradient-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Visual Content...
                </>
              ) : (
                "🎨 Generate Visual Posts"
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Your Visual Campaign
          </h1>
          <Button onClick={onNewCampaign} variant="outline">
            Create New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generatedPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden shadow-creative">
              <div className="relative">
                {/* Visual Post Preview */}
                <div className={`aspect-square ${post.template.bgColor} p-8 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                  {post.template.layout === 'bold' && (
                    <div className="absolute inset-0 bg-black/10"></div>
                  )}
                  
                  <div className="relative z-10 space-y-4">
                    <h2 className={`text-2xl md:text-3xl font-bold ${post.template.textColor} leading-tight`}>
                      {post.headline}
                    </h2>
                    
                    <p className={`text-lg ${post.template.textColor} opacity-90`}>
                      {post.subtext}
                    </p>
                    
                    <div className={`inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30`}>
                      <span className={`font-semibold ${post.template.accentColor}`}>
                        {post.cta}
                      </span>
                    </div>
                  </div>
                  
                  {/* Template type indicator */}
                  <Badge className="absolute top-4 right-4" variant="secondary">
                    {post.template.type.toUpperCase()}
                  </Badge>
                </div>

                {/* Post Actions */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => downloadPost(post)}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Caption</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.caption}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(post.caption)}
                    className="mt-2 p-0 h-auto"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Caption
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Hashtags</h3>
                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(post.hashtags.join(' '))}
                    className="mt-2 p-0 h-auto"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Hashtags
                  </Button>
                </div>

                <div className="pt-2 border-t">
                  <Badge variant="outline">{post.template.name}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={generatePosts} variant="outline" className="mr-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Variations
          </Button>
          <Button onClick={onNewCampaign} variant="outline">
            Create New Campaign
          </Button>
        </div>
      </div>
    </div>
  )
}