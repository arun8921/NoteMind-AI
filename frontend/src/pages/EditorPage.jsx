import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, Eye, Check, RefreshCw, Zap, Sparkles, Edit3, CheckCircle, HelpCircle, BookOpen, Send } from "lucide-react";
import { C } from "../services/theme";
import { TOOLBAR_GROUPS } from "../services/editorData";
import { notesApi, aiApi } from "../services/api";
import { toDisplayNote } from "../services/noteUtils";
import { Glow } from "../components/common/Glow";
import { TagBadge } from "../components/common/TagBadge";
import { Sidebar } from "../layouts/Sidebar";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../hooks/useAuth";

const AI_QUICK_ACTIONS = [
  { label: "Summarize", icon: Sparkles, c: C.primaryLight, action: "summarize" },
  { label: "Rewrite", icon: Edit3, c: "#A78BFA", action: "rewrite" },
  { label: "Fix Grammar", icon: CheckCircle, c: C.accent, action: "grammar" },
  { label: "Explain", icon: HelpCircle, c: "#FCD34D", action: "explain" },
  { label: "Quiz", icon: BookOpen, c: "#EC4899", action: "quiz" },
];

export default function EditorPage() {
  const { navigate, params } = useNavigation();
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(params?.noteId || null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(true);
  const [aiMsg, setAiMsg] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [chat, setChat] = useState([
    { role: "ai", text: "I'm your AI writing assistant, powered by Gemini. I can summarize this note, rewrite sections, fix grammar, generate a quiz, or answer questions about the content." },
  ]);

  const saveTimer = useRef(null);
  const chatEnd = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  const loadList = useCallback(async () => {
    const { notes: list } = await notesApi.list(token);
    setNotes(list.map(toDisplayNote));
    return list;
  }, [token]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await loadList();
      const targetId = params?.noteId || list[0]?._id;
      if (targetId) {
        setSelectedId(targetId);
        const found = list.find(n => n._id === targetId);
        if (found) { setTitle(found.title); setContent(found.content); }
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectNote = (n) => {
    setSelectedId(n.id);
    setTitle(n.title);
    setContent(n.content);
  };

  const scheduleSave = (nextTitle, nextContent) => {
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await notesApi.update(token, selectedId, { title: nextTitle, content: nextContent });
      setSaved(true);
      setNotes(prev => prev.map(n => n.id === selectedId ? { ...n, title: nextTitle, content: nextContent, preview: nextContent.slice(0, 140) } : n));
    }, 900);
  };

  const createNote = async () => {
    const { note } = await notesApi.create(token, { title: "Untitled note", content: "" });
    const list = await loadList();
    setSelectedId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const active = notes.find(n => n.id === selectedId);

  const runAiAction = async (action, label) => {
    if (!content.trim()) return;
    setAiBusy(true);
    setChat(p => [...p, { role: "user", text: label }]);
    try {
      const { result } = await aiApi[action](token, content);
      setChat(p => [...p, { role: "ai", text: result }]);
    } catch (err) {
      setChat(p => [...p, { role: "ai", text: `Sorry, that request failed: ${err.message}` }]);
    } finally {
      setAiBusy(false);
    }
  };

  const sendAi = async () => {
    if (!aiMsg.trim() || aiBusy) return;
    const message = aiMsg.trim();
    setAiMsg("");
    setChat(p => [...p, { role: "user", text: message }]);
    setAiBusy(true);
    try {
      const history = chat.slice(-6);
      const { result } = await aiApi.chat(token, message, history);
      setChat(p => [...p, { role: "ai", text: result }]);
    } catch (err) {
      setChat(p => [...p, { role: "ai", text: `Sorry, that request failed: ${err.message}` }]);
    } finally {
      setAiBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="size-full flex items-center justify-center" style={{ background: C.bg, color: C.muted }}>
        Loading editor…
      </div>
    );
  }

  return (
    <div className="size-full flex overflow-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Glow x="-left-48" y="-top-48" color="#6366F1" opacity=".1" />
      </div>
      <Sidebar current="editor" />

      {/* Note list panel */}
      <div className="flex-shrink-0 flex flex-col overflow-hidden z-10"
        style={{ width: 240, background: "rgba(15,23,42,.88)", backdropFilter: "blur(20px)", borderRight: `1px solid ${C.hairline}` }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.hairline}` }}>
          <h2 className="text-[13px] font-bold">All Notes</h2>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(99,102,241,.15)" }}
            onClick={createNote}>
            <Plus size={14} style={{ color: C.primaryLight }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1" style={{ scrollbarWidth: "none" }}>
          {notes.length === 0 && <p className="text-[12px] p-3" style={{ color: C.muted }}>No notes yet — create one.</p>}
          {notes.map(n => (
            <button key={n.id} onClick={() => selectNote(n)}
              className="w-full text-left p-3 rounded-xl transition-all duration-200"
              style={{ background: selectedId === n.id ? "rgba(99,102,241,.15)" : "transparent", border: selectedId === n.id ? "1px solid rgba(99,102,241,.22)" : "1px solid transparent" }}
              onMouseEnter={e => { if (selectedId !== n.id) e.currentTarget.style.background = C.hairline; }}
              onMouseLeave={e => { if (selectedId !== n.id) e.currentTarget.style.background = "transparent"; }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.color }} />
                <span className="text-[12px] font-semibold leading-snug line-clamp-1">{n.title}</span>
              </div>
              <p className="text-[11px] line-clamp-2 pl-4 leading-relaxed" style={{ color: C.muted }}>{n.preview}</p>
              <div className="flex items-center justify-between mt-2 pl-4">
                <span className="text-[10px]" style={{ color: "#475569" }}>{n.edited}</span>
                {n.tags[0] && <span className="text-[10px]" style={{ color: n.color }}>{n.tags[0]}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden z-10">
        <div className="flex-shrink-0 flex items-center gap-2 px-5 py-3"
          style={{ background: "rgba(15,23,42,.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.hairline}` }}>
          {TOOLBAR_GROUPS.map((group, gi) => (
            <div key={gi} className="flex items-center gap-0.5">
              {group.map(({ icon: Icon, tip }) => (
                <button key={tip} title={tip}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: C.muted }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,.15)"; e.currentTarget.style.color = C.primaryLight; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}>
                  <Icon size={14} />
                </button>
              ))}
              {gi < TOOLBAR_GROUPS.length - 1 && <div className="w-px h-5 mx-1" style={{ background: C.hairline }} />}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px]" style={{ color: "#475569" }}>{words} words</span>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: saved ? C.success : C.muted }}>
              {saved ? <Check size={12} /> : <RefreshCw size={12} className="animate-spin" />}
              {saved ? "Saved" : "Saving…"}
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: C.muted }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,.15)"; e.currentTarget.style.color = C.primaryLight; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}>
              <Eye size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-16 py-10" style={{ scrollbarWidth: "none" }}>
          <div className="max-w-2xl mx-auto">
            <input value={title} onChange={e => { setTitle(e.target.value); scheduleSave(e.target.value, content); }}
              placeholder="Note title"
              className="w-full bg-transparent outline-none text-[24px] font-bold mb-4" style={{ color: C.text }} />
            {active?.tags?.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full" style={{ background: active.color, boxShadow: `0 0 10px ${active.color}88` }} />
                <div className="flex gap-1.5">
                  {active.tags.map(t => <TagBadge key={t} tag={t} color={active.color} />)}
                </div>
              </div>
            )}
            <textarea value={content} onChange={e => { setContent(e.target.value); scheduleSave(title, e.target.value); }}
              className="w-full bg-transparent outline-none resize-none text-[15px] leading-[1.85]"
              style={{ color: C.text, minHeight: "calc(100vh - 260px)", fontFamily: "'Inter', sans-serif" }}
              placeholder="Start writing your note…" />
          </div>
        </div>
      </div>

      {/* AI side panel */}
      <div className="flex-shrink-0 flex flex-col overflow-hidden z-10"
        style={{ width: 280, background: "rgba(15,23,42,.88)", backdropFilter: "blur(20px)", borderLeft: `1px solid ${C.hairline}` }}>
        <div className="p-4 flex items-center gap-2.5" style={{ borderBottom: `1px solid ${C.hairline}` }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", boxShadow: "0 0 16px rgba(99,102,241,.4)" }}>
            <Zap size={14} color="#fff" />
          </div>
          <div>
            <p className="text-[13px] font-bold">AI Assistant</p>
            <p className="text-[10px]" style={{ color: aiBusy ? "#F59E0B" : C.success }}>{aiBusy ? "● Thinking…" : "● Ready"}</p>
          </div>
        </div>

        <div className="p-3 flex flex-wrap gap-1.5" style={{ borderBottom: `1px solid ${C.hairline}` }}>
          {AI_QUICK_ACTIONS.map(({ label, icon: Icon, c, action }) => (
            <button key={label} disabled={aiBusy} onClick={() => runAiAction(action, label)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 disabled:opacity-50"
              style={{ background: `${c}12`, color: c, border: `1px solid ${c}22` }}
              onMouseEnter={e => { e.currentTarget.style.background = `${c}22`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${c}12`; }}>
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: "none" }}>
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[88%] rounded-2xl px-4 py-3 text-[12px] leading-relaxed"
                style={{
                  background: msg.role === "user" ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(30,41,59,.9)",
                  color: msg.role === "user" ? "#fff" : C.text,
                  border: msg.role === "ai" ? `1px solid ${C.hairline}` : "none",
                  borderBottomRightRadius: msg.role === "user" ? 4 : 16,
                  borderBottomLeftRadius: msg.role === "ai" ? 4 : 16,
                }}>
                {msg.role === "ai" && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap size={10} style={{ color: C.primaryLight }} />
                    <span className="text-[10px] font-semibold" style={{ color: C.primaryLight }}>NoteMind AI</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {aiBusy && (
            <div className="flex gap-1.5 items-center h-5 px-1">
              {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: C.primaryLight, animationDelay: `${i * 0.18}s` }} />)}
            </div>
          )}
          <div ref={chatEnd} />
        </div>

        <div className="p-4" style={{ borderTop: `1px solid ${C.hairline}` }}>
          <div className="flex items-end gap-2 px-3 py-2.5 rounded-xl" style={{ background: "rgba(15,23,42,.7)", border: `1px solid ${C.border}` }}>
            <textarea rows={2} value={aiMsg} onChange={e => setAiMsg(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAi(); } }}
              placeholder="Ask about this note…" className="flex-1 bg-transparent text-[12px] resize-none outline-none" style={{ color: C.text }} />
            <button onClick={sendAi} disabled={aiBusy} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{ background: aiMsg.trim() ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(99,102,241,.15)" }}>
              <Send size={13} style={{ color: aiMsg.trim() ? "#fff" : "#64748B" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
