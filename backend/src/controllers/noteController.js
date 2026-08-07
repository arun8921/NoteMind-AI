import Note from "../models/Note.js";

export async function listNotes(req, res) {
  const notes = await Note.find({ owner: req.userId }).sort({ pinned: -1, updatedAt: -1 });
  res.json({ notes });
}

export async function getNote(req, res) {
  const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ note });
}

export async function createNote(req, res) {
  const { title, content, tags, color } = req.body;
  const note = await Note.create({
    owner: req.userId,
    title: title || "Untitled note",
    content: content || "",
    tags: tags || [],
    color: color || "#6366F1",
  });
  res.status(201).json({ note });
}

export async function updateNote(req, res) {
  const { title, content, tags, color, pinned } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { ...(title !== undefined && { title }), ...(content !== undefined && { content }), ...(tags !== undefined && { tags }), ...(color !== undefined && { color }), ...(pinned !== undefined && { pinned }) },
    { new: true }
  );
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ note });
}

export async function deleteNote(req, res) {
  const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ success: true });
}
