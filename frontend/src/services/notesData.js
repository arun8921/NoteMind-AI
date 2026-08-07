// Mock notes data. In a real app this would come from an API service.
export const NOTES = [
  { id: 1, title: "React Authentication with JWT", preview: "Implementing secure auth flows using JSON Web Tokens, refresh token rotation, and httpOnly cookie storage for XSS prevention.", tags: ["React", "Security"], edited: "2h ago", words: 1240, pinned: true, color: "#6366F1" },
  { id: 2, title: "MongoDB Atlas Vector Search", preview: "Setting up vector embeddings with OpenAI and querying semantic similarity using the $vectorSearch aggregation pipeline.", tags: ["MongoDB", "AI"], edited: "5h ago", words: 890, pinned: true, color: "#14B8A6" },
  { id: 3, title: "System Design: Distributed Cache", preview: "Redis vs Memcached tradeoffs, consistent hashing, cache invalidation strategies and write-through vs write-behind patterns.", tags: ["Architecture"], edited: "1d ago", words: 2100, pinned: false, color: "#8B5CF6" },
  { id: 4, title: "MERN Stack AWS Deployment", preview: "Docker containerisation, ECR push, ECS Fargate task definition and ALB routing for production-grade Node.js applications.", tags: ["DevOps", "AWS"], edited: "2d ago", words: 1560, pinned: false, color: "#22C55E" },
  { id: 5, title: "TypeScript Generics Deep Dive", preview: "Conditional types, the infer keyword, mapped types, template literal types and variance annotations in TypeScript 5.x.", tags: ["TypeScript"], edited: "3d ago", words: 975, pinned: false, color: "#F59E0B" },
  { id: 6, title: "LLM Fine-tuning Strategies", preview: "LoRA vs full fine-tuning, RLHF overview, dataset curation, evaluation metrics and cost-efficiency benchmarks for open models.", tags: ["AI/ML"], edited: "4d ago", words: 3200, pinned: false, color: "#EC4899" },
];

// Editor keeps its own copy so edits there never mutate the shared NOTES array.
export const EDITOR_NOTES = NOTES.map(n => ({ ...n }));
