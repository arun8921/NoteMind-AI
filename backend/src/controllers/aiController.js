import Note from "../models/Note.js";
import { summarizeText, rewriteText, fixGrammar, explainText, generateQuiz, chatWithNotes } from "../services/geminiService.js";

async function withErrorHandling(res, fn) {
  try {
    const text = await fn();
    res.json({ result: text });
  } catch (err) {
    res.status(500).json({ error: "AI request failed", detail: err.message });
  }
}

export async function summarize(req, res) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content is required" });
  await withErrorHandling(res, () => summarizeText(content));
}

export async function rewrite(req, res) {
  const { content, instruction } = req.body;
  if (!content) return res.status(400).json({ error: "content is required" });
  await withErrorHandling(res, () => rewriteText(content, instruction));
}

export async function grammar(req, res) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content is required" });
  await withErrorHandling(res, () => fixGrammar(content));
}

export async function explain(req, res) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content is required" });
  await withErrorHandling(res, () => explainText(content));
}

export async function quiz(req, res) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content is required" });
  await withErrorHandling(res, () => generateQuiz(content));
}

export async function chat(req, res) {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: "message is required" });

  const notes = await Note.find({ owner: req.userId }).limit(20).select("title tags content");
  const notesContext = notes.map(n => `- ${n.title} [${n.tags.join(", ")}]: ${n.content.slice(0, 300)}`).join("\n");

  await withErrorHandling(res, () => chatWithNotes({ message, notesContext, history }));
}
