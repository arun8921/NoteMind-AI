import { GoogleGenerativeAI } from "@google/generative-ai";

let client = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in .env");
  }
  if (!client) client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

const MODEL = "gemini-2.0-flash";

async function generate(prompt) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: MODEL });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function summarizeText(content) {
  return generate(`Summarize the following note in 3-5 concise bullet points. Keep it factual and short.\n\nNote:\n${content}`);
}

export async function rewriteText(content, instruction = "Improve clarity and flow") {
  return generate(`Rewrite the following note. Instruction: ${instruction}. Keep the meaning intact, return only the rewritten text.\n\nNote:\n${content}`);
}

export async function fixGrammar(content) {
  return generate(`Fix all grammar and spelling errors in the following text. Return only the corrected text, nothing else.\n\nText:\n${content}`);
}

export async function explainText(content) {
  return generate(`Explain the following note in simple terms, as if teaching a beginner.\n\nNote:\n${content}`);
}

export async function generateQuiz(content) {
  return generate(`Create a 5-question multiple choice quiz based on the following note. Format each question clearly with A/B/C/D options and mark the correct answer.\n\nNote:\n${content}`);
}

export async function chatWithNotes({ message, notesContext, history = [] }) {
  const historyText = history.map(h => `${h.role === "user" ? "User" : "Assistant"}: ${h.text}`).join("\n");
  const prompt = `You are NoteMind AI, an assistant with access to the user's notes below. Answer the user's question using this context when relevant. Be concise and helpful.

User's notes context:
${notesContext || "(no notes available)"}

Conversation so far:
${historyText}

User: ${message}
Assistant:`;
  return generate(prompt);
}
