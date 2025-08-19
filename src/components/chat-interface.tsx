import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User } from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface StreamingTextProps {
  text: string
  onComplete?: () => void
}

const StreamingText = ({ text, onComplete }: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20) // Adjust speed here
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-typing">|</span>
      )}
    </span>
  )
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hi! I'm your Creative AI Copilot. I help transform your product ideas into viral marketing campaigns with AI-powered captions, creative strategies, and content calendars. What product would you like to create a campaign for?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    // Simple keyword-based responses for demo
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('fitness') || lowerMessage.includes('workout') || lowerMessage.includes('gym')) {
      return `🏋️ Perfect! A fitness product has amazing campaign potential. Here's your complete campaign strategy:

**📱 PLATFORM-OPTIMIZED CAPTIONS:**

**Instagram Post:**
"💪 Transform your fitness journey in just 21 days! Our ${userMessage} users are seeing incredible results...

✨ Why it works:
→ Science-backed approach
→ Fits any schedule
→ Real results, real fast

Drop a 🔥 if you're ready to level up!

#FitnessTransformation #21DayChallenge #FitnessGoals #HealthyLifestyle #WorkoutMotivation"

**LinkedIn Version:**
"The fitness industry is evolving. Here's how ${userMessage} is helping professionals maintain peak performance while managing demanding careers.

Key insights from our community:
• 73% report increased energy levels
• 89% say it fits their busy schedule
• 94% would recommend to colleagues

What's your approach to maintaining fitness with a busy lifestyle?"

**📊 CAMPAIGN STRATEGY:**
- Hook: "The 21-day transformation that's changing everything"
- Angle: Busy professional's secret to staying fit
- Social Proof: Real user transformations
- CTA Progression: Soft → Medium → Hard sell over 7 days

**📅 7-DAY CONTENT CALENDAR:**
Day 1: Problem awareness post
Day 2: Behind-the-scenes story
Day 3: User transformation feature
Day 4: Educational carousel
Day 5: FOMO-driven limited offer
Day 6: Community testimonials
Day 7: Strong CTA + urgency

**🎯 HASHTAG STRATEGY:**
Primary: #FitnessGoals #WorkoutMotivation #HealthyLifestyle
Niche: #BusyProfessionals #21DayChallenge #FitnessJourney

Ready to launch? I can generate specific variations for any platform!`
    }
    
    if (lowerMessage.includes('app') || lowerMessage.includes('software') || lowerMessage.includes('saas')) {
      return `💻 Excellent choice! SaaS/App marketing is my specialty. Here's your comprehensive campaign kit:

**📱 MULTI-PLATFORM CONTENT:**

**TikTok Hook:**
"POV: You found the app that actually saves you 3 hours a day 😮‍💨

${userMessage} users be like:
❌ Before: Chaos and stress
✅ After: Organized and productive

The secret? Smart automation that just works.

Tell me you need this 👇

#ProductivityHack #AppThatWorks #TechTok #ProductivityTips"

**Instagram Story Sequence:**
Slide 1: "The app everyone's talking about..."
Slide 2: Problem showcase (messy workflow)
Slide 3: Solution reveal (clean interface)
Slide 4: Results (happy user testimonial)
Slide 5: CTA with swipe-up

**🎯 CAMPAIGN ANGLES:**
1. Problem-Solution: "From chaos to clarity in minutes"
2. Social Proof: "Join 50K+ productive professionals"
3. FOMO: "The productivity secret everyone's using"
4. Lifestyle: "How top performers stay organized"

**📈 A/B TESTING VARIANTS:**
Version A: Feature-focused (what it does)
Version B: Benefit-focused (how it helps)
Version C: Emotion-focused (how it feels)

**🗓️ LAUNCH SEQUENCE:**
Week 1: Awareness (problem posts)
Week 2: Consideration (demo videos)
Week 3: Decision (testimonials + offers)
Week 4: Retention (user success stories)

Want me to dive deeper into any specific platform or strategy?`
    }

    if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('recipe')) {
      return `🍽️ Food marketing is incredibly visual and engaging! Here's your mouth-watering campaign strategy:

**📸 VISUAL CONTENT STRATEGY:**

**Instagram Reel Script:**
"Making the perfect [${userMessage}] in 60 seconds ✨

*Quick cuts of ingredients*
*Satisfying cooking process*
*Money shot of final dish*

"When it tastes this good, you know you've found something special 😋

Save this recipe and tag someone who needs to try this!

#FoodieLife #RecipeOfTheDay #Delicious #FoodLover #HomeCooking"

**TikTok Version:**
"Food hack: This ${userMessage} recipe will change your life 🤯

*Trending audio overlay*
*Step-by-step quick cuts*
*Reaction shots*

"No way it's that easy" → *Shows result* → "Okay I'm convinced"

#FoodTok #RecipeHack #EasyRecipes #FoodHacks"

**🎭 CREATIVE ANGLES:**
- Behind-the-scenes kitchen magic
- Before/after transformations
- Customer reaction videos
- Chef's secret techniques
- Ingredient sourcing stories

**📊 ENGAGEMENT TACTICS:**
- "Rate this dish 1-10" polls
- Recipe sharing chains
- Cooking challenges
- User-generated content contests
- Interactive story quizzes

**📅 CONTENT MIX:**
30% Recipe content
25% Behind-the-scenes
20% User features
15% Educational/tips
10% Promotional

This approach typically sees 3x higher engagement than standard food posts! Ready to cook up some viral content?`
    }

    // Default response for other inputs
    return `Thank you for sharing "${userMessage}"! Let me create a comprehensive campaign strategy for you:

**🎯 CAMPAIGN OVERVIEW:**
Based on your product, I've identified key opportunities for viral content across multiple platforms.

**📱 PLATFORM-SPECIFIC CONTENT:**

**Instagram Strategy:**
"✨ Discover why thousands are obsessed with ${userMessage}

Here's what makes it different:
→ Solves a real problem
→ Easy to use daily
→ Results you can see

Which benefit resonates most with you? 👇

#Innovation #LifeHack #MustHave #ProductivityBoost"

**LinkedIn Approach:**
"The ${userMessage} trend: Why smart professionals are making the switch.

Key insights from early adopters:
• Increased efficiency by 40%
• Reduced daily friction
• Improved work-life balance

What tools are transforming your professional routine?"

**🚀 VIRAL HOOKS:**
- "The ${userMessage} that's changing everything"
- "Why everyone's switching to this instead"
- "The secret that [target audience] doesn't want you to know"

**📈 GROWTH STRATEGY:**
Week 1: Problem awareness content
Week 2: Solution introduction
Week 3: Social proof & testimonials
Week 4: Strong call-to-action campaign

**🎨 CREATIVE CONCEPTS:**
- Before/after comparisons
- Day-in-the-life content
- User success stories
- Behind-the-scenes looks
- Educational value-adds

Would you like me to dive deeper into any specific platform or create variations for different audience segments?`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        isStreaming: true
      }

      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-agent-icon flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Creative AI Copilot</h1>
            <p className="text-sm text-muted-foreground">Your marketing campaign assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-up ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'agent' && (
                <div className="w-8 h-8 rounded-full bg-agent-icon flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-user-bg text-user-text ml-auto'
                    : 'bg-agent-bg text-agent-text'
                }`}
              >
                {message.isStreaming ? (
                  <StreamingText text={message.content} />
                ) : (
                  <div className="whitespace-pre-wrap">{message.content}</div>
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-user-bg flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-user-text" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 animate-slide-up">
              <div className="w-8 h-8 rounded-full bg-agent-icon flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-agent-bg text-agent-text rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-agent-icon rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-agent-icon rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-agent-icon rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your product or ask about campaign strategies..."
            className="flex-1 rounded-full border-border focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}