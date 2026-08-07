import {
  Bold, Italic, Underline, Strikethrough,
  Hash, Quote, Code,
  List, ListOrdered,
  Link, Image,
} from "lucide-react";

export const TOOLBAR_GROUPS = [
  [{ icon: Bold, tip: "Bold" }, { icon: Italic, tip: "Italic" }, { icon: Underline, tip: "Underline" }, { icon: Strikethrough, tip: "Strikethrough" }],
  [{ icon: Hash, tip: "Heading" }, { icon: Quote, tip: "Blockquote" }, { icon: Code, tip: "Code" }],
  [{ icon: List, tip: "Bullet list" }, { icon: ListOrdered, tip: "Numbered list" }],
  [{ icon: Link, tip: "Link" }, { icon: Image, tip: "Image" }],
];

export const INIT_CHAT = [
  { role: "ai", text: "Hi Arun! 👋 I'm NoteMind AI. I have access to all your 128 notes and can help you summarise, search, explain, or generate content. What would you like to explore today?" },
  { role: "user", text: "Explain JWT authentication to me" },
  { role: "ai", text: "JWT (JSON Web Token) is a compact, URL-safe way to represent claims between parties.\n\n**How it works:**\n1. User logs in → server validates credentials\n2. Server creates a signed JWT containing user info\n3. Client stores the token (memory or httpOnly cookie)\n4. Client sends token with every API request\n5. Server verifies signature and extracts claims\n\n**Structure:** `header.payload.signature`\n\nFrom your note *\"React Authentication with JWT\"*, you've documented the refresh token rotation strategy — storing the refresh token in an httpOnly cookie to prevent XSS attacks is exactly the right approach. 🔒\n\n**Key security tips from your notes:**\n• Short-lived access tokens (15 min)\n• Long-lived refresh tokens (7 days) in httpOnly cookies\n• Always validate on every request\n• Use 256-bit+ secret keys" },
];
