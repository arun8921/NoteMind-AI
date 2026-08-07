import {
  Sparkles, Edit3, Search, Layers, BookOpen, Lightbulb,
} from "lucide-react";

export const FEATURES = [
  { icon: Sparkles, title: "AI Summarization", desc: "Condense lengthy notes into crisp summaries in one click. Powered by GPT-4." },
  { icon: Edit3, title: "AI Rewrite", desc: "Improve clarity, tone and style. Transform rough drafts into polished prose." },
  { icon: Search, title: "Semantic Search", desc: "Find anything across all your notes using natural language, not just keywords." },
  { icon: Layers, title: "Smart Organization", desc: "AI automatically tags, categorizes and links related notes for you." },
  { icon: BookOpen, title: "Quiz Generator", desc: "Turn any note into an interactive quiz to accelerate your learning." },
  { icon: Lightbulb, title: "Idea Expansion", desc: "Stuck? Let AI brainstorm, outline and expand on your half-formed ideas." },
];

export const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Software Engineer @ Stripe", text: "NoteMind AI is the only note-taking app that actually helps me think. The AI summarization alone saves me 2 hours a week." },
  { name: "Marcus Webb", role: "Product Manager @ Linear", text: "I switched from Notion 6 months ago and haven't looked back. The AI chat feels like a second brain." },
  { name: "Priya Nair", role: "ML Researcher @ DeepMind", text: "The quiz generator is insane. I can turn my research notes into a flashcard deck in 10 seconds." },
];

export const PRICING = [
  { name: "Free", price: "$0", period: "/mo", features: ["50 notes", "5 AI actions/day", "1 GB storage", "Basic export"], cta: "Get Started", highlight: false },
  { name: "Pro", price: "$12", period: "/mo", features: ["Unlimited notes", "Unlimited AI", "20 GB storage", "All AI features", "Priority support"], cta: "Start Free Trial", highlight: true },
  { name: "Team", price: "$29", period: "/mo", features: ["Everything in Pro", "5 team seats", "Shared workspace", "Admin controls", "SSO & SAML"], cta: "Contact Sales", highlight: false },
];
