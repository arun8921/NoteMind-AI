import { useState, useRef, useEffect } from "react";
import { Brain, Copy, Mic, Send, Sparkles, Edit3, CheckCircle, HelpCircle, BookOpen, ChevronRight } from "lucide-react";
import { C } from "../services/theme";
import { notesApi, aiApi } from "../services/api";
import { toDisplayNote } from "../services/noteUtils";
import { Glow } from "../components/common/Glow";
import { Sidebar } from "../layouts/Sidebar";
import { TopNav } from "../layouts/TopNav";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../hooks/useAuth";

const SUGGESTIONS = ["Summarise my recent notes", "What have I written about lately?", "Quiz me on my notes", "Find notes about a topic"];

const AI_ACTIONS = [
  { icon: Sparkles, label: "Summarize Note", c: C.primaryLight },
  { icon: Edit3, label: "Rewrite", c: "#A78BFA" },
  { icon: CheckCircle, label: "Fix Grammar", c: C.accent },
  { icon: HelpCircle, label: "Explain", c: "#FCD34D" },
  { icon: BookOpen, label: "Generate Quiz", c: "#EC4899" },
];

export default function AIChatPage() {
  const { navigate } = useNavigation();
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Hi! I'm NoteMind AI, powered by Gemini. I have access to your notes and can help you summarize, search, explain, or generate content. What would you like to explore?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  useEffect(() => {
    notesApi.list(token).then(({ notes: list }) => setNotes(list.map(toDisplayNote))).catch(() => {});
  }, [token]);

  const send = async () => {
    if (!input.trim() || typing) return;
    const q = input.trim();
    setInput("");
    setMsgs(p => [...p, { role: "user", text: q }]);
    setTyping(true);
    try {
      const history = msgs.slice(-6);
      const { result } = await aiApi.chat(token, q, history);
      setMsgs(p => [...p, { role: "ai", text: result }]);
    } catch (err) {
      setMsgs(p => [...p, { role: "ai", text: `Sorry, that request failed: ${err.message}` }]);
    } finally {
      setTyping(false);
    }
  };

  const runQuickAction = async (label, action) => {
    if (!notes[0]) {
      setMsgs(p => [...p, { role: "ai", text: "You don't have any notes yet — create one first from the dashboard." }]);
      return;
    }
    setMsgs(p => [...p, { role: "user", text: `${label} (on "${notes[0].title}")` }]);
    setTyping(true);
    try {
      const { result } = await aiApi[action](token, notes[0].content);
      setMsgs(p => [...p, { role: "ai", text: result }]);
    } catch (err) {
      setMsgs(p => [...p, { role: "ai", text: `Sorry, that request failed: ${err.message}` }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="size-full flex overflow-hidden" style={{ background: C.bg, fontFamily: "'Inter', sans-serif", color: C.text }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Glow x="-left-48" y="-top-48" color="#6366F1" opacity=".12" />
        <Glow x="-right-40" y="-bottom-40" color="#14B8A6" opacity=".08" />
      </div>
      <Sidebar current="ai-chat" />

      <div className="flex-1 flex flex-col min-w-0 z-10">
        <TopNav title="AI Assistant" />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5" style={{ scrollbarWidth: "none" }}>
              {msgs.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", boxShadow: "0 0 14px rgba(99,102,241,.4)" }}>
                      <Brain size={14} color="#fff" />
                    </div>
                  )}
                  <div className="max-w-2xl">
                    {msg.role === "ai" && <p className="text-[11px] font-semibold mb-1.5" style={{ color: C.primaryLight }}>NoteMind AI</p>}
                    <div className="rounded-2xl px-5 py-4 text-[14px] leading-[1.8]"
                      style={{
                        background: msg.role === "user" ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(30,41,59,.8)",
                        color: msg.role === "user" ? "#fff" : C.text,
                        border: msg.role === "ai" ? `1px solid ${C.hairline}` : "none",
                        borderBottomRightRadius: msg.role === "user" ? 4 : 16,
                        borderBottomLeftRadius: msg.role === "ai" ? 4 : 16,
                      }}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {msg.role === "ai" && (
                        <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: `1px solid ${C.hairline}` }}>
                          <button onClick={() => navigator.clipboard?.writeText(msg.text)}
                            className="flex items-center gap-1.5 text-[11px] transition-colors duration-200" style={{ color: "#475569" }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.muted)}
                            onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                            <Copy size={11} /> Copy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-[13px] font-bold"
                      style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", color: "#fff" }}>A</div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
                    <Brain size={14} color="#fff" />
                  </div>
                  <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(30,41,59,.8)", border: `1px solid ${C.hairline}` }}>
                    <div className="flex gap-1.5 items-center h-5">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: C.primaryLight, animationDelay: `${i * 0.18}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex-shrink-0 px-6 py-5" style={{ borderTop: `1px solid ${C.hairline}` }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => setInput(s)}
                    className="text-[12px] px-3 py-1.5 rounded-lg font-medium transition-all duration-200"
                    style={{ background: "rgba(99,102,241,.1)", color: C.primaryLight, border: "1px solid rgba(99,102,241,.2)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,.2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(99,102,241,.1)"; }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(30,41,59,.8)", border: `1px solid ${C.border}` }}>
                <textarea rows={2} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask NoteMind AI anything about your notes…" className="flex-1 bg-transparent text-[14px] resize-none outline-none" style={{ color: C.text }} />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(148,163,184,.08)", color: C.muted }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,.15)"; e.currentTarget.style.color = C.primaryLight; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(148,163,184,.08)"; e.currentTarget.style.color = C.muted; }}>
                    <Mic size={15} />
                  </button>
                  <button onClick={send} disabled={typing} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: input.trim() ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(99,102,241,.15)", boxShadow: input.trim() ? "0 4px 14px rgba(99,102,241,.4)" : "none" }}>
                    <Send size={15} style={{ color: input.trim() ? "#fff" : "#64748B" }} />
                  </button>
                </div>
              </div>
              <p className="text-center text-[11px] mt-2" style={{ color: "#475569" }}>NoteMind AI has access to your notes · Powered by Gemini</p>
            </div>
          </div>

          <div className="flex-shrink-0 overflow-y-auto p-5 space-y-5" style={{ width: 260, background: "rgba(15,23,42,.7)", borderLeft: `1px solid ${C.hairline}`, scrollbarWidth: "none" }}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.12em] mb-3" style={{ color: "#475569" }}>AI Actions (latest note)</p>
              <div className="space-y-1.5">
                {AI_ACTIONS.map(({ icon: Icon, label, c }) => {
                  const actionMap = { "Summarize Note": "summarize", "Rewrite": "rewrite", "Fix Grammar": "grammar", "Explain": "explain", "Generate Quiz": "quiz" };
                  return (
                    <button key={label} onClick={() => runQuickAction(label, actionMap[label])}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                      style={{ background: "rgba(15,23,42,.5)", border: `1px solid ${C.hairline}` }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${c}10`; e.currentTarget.style.border = `1px solid ${c}25`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,23,42,.5)"; e.currentTarget.style.border = `1px solid ${C.hairline}`; }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${c}18` }}>
                        <Icon size={13} style={{ color: c }} />
                      </div>
                      <span className="text-[12px] font-medium">{label}</span>
                      <ChevronRight size={12} className="ml-auto" style={{ color: "#475569" }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.12em] mb-3" style={{ color: "#475569" }}>Your Notes</p>
              <div className="space-y-2">
                {notes.length === 0 && <p className="text-[11px]" style={{ color: "#475569" }}>No notes yet.</p>}
                {notes.slice(0, 5).map(n => (
                  <button key={n.id} onClick={() => navigate("editor", { noteId: n.id })}
                    className="w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200"
                    style={{ background: `${n.color}10`, border: `1px solid ${n.color}22` }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: n.color }} />
                      <span className="text-[11px] font-medium truncate">{n.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
