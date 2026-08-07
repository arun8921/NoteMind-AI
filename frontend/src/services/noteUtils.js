export function formatRelativeTime(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Maps a backend Note document to the shape NoteCard/EditorPage expect.
export function toDisplayNote(note) {
  const plainText = (note.content || "").replace(/[#*`>_-]/g, "").trim();
  return {
    id: note._id,
    title: note.title,
    content: note.content,
    preview: plainText.slice(0, 140) || "No content yet…",
    tags: note.tags || [],
    color: note.color || "#6366F1",
    pinned: !!note.pinned,
    edited: formatRelativeTime(note.updatedAt),
    words: plainText.split(/\s+/).filter(Boolean).length,
  };
}
