import { Zap, ArrowRight, Play } from "lucide-react";
import { C } from "../../services/theme";
import { NOTES } from "../../services/notesData";
import { Glow } from "../../components/common/Glow";
import { GlassCard } from "../../components/common/GlassCard";
import { Btn } from "../../components/common/Button";
import { useNavigation } from "../../hooks/useNavigation";

export function HeroSection() {
  const { navigate } = useNavigation();
  return (
    <section className="relative overflow-hidden px-8 pt-28 pb-24 text-center">
      <Glow x="-left-48" y="-top-48" size="w-[600px] h-[600px]" color="#6366F1" opacity=".18" />
      <Glow x="-right-48" y="top-0" size="w-[500px] h-[500px]" color="#14B8A6" opacity=".1" />

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-semibold"
        style={{ background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.25)", color: C.primaryLight }}>
        <Zap size={12} /> Powered by Advanced AI
      </div>

      <h1 className="text-[64px] font-black leading-[1.08] tracking-[-2px] mb-6 max-w-4xl mx-auto">
        Think Smarter.<br />
        <span style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Write Faster.
        </span><br />
        Powered by AI.
      </h1>

      <p className="text-[18px] max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: C.muted }}>
        The note-taking app that thinks alongside you. Organise, summarise and discover insights across everything you write.
      </p>

      <div className="flex items-center justify-center gap-3 mb-6">
        <Btn onClick={() => navigate("register")} size="lg"><ArrowRight size={16} /> Start for Free</Btn>
        <Btn variant="outline" size="lg"><Play size={15} /> Watch Demo</Btn>
      </div>
      <p className="text-[12px]" style={{ color: "#475569" }}>No credit card required · Free forever plan</p>

      <div className="relative mt-20 max-w-5xl mx-auto">
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30" style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)" }} />
        <GlassCard className="relative p-1 overflow-hidden" style={{ border: "1px solid rgba(99,102,241,.3)" }}>
          <div className="rounded-xl overflow-hidden" style={{ background: C.surface }}>
            <div className="flex" style={{ height: 340 }}>
              <div className="w-44 flex-shrink-0 p-4" style={{ background: "rgba(15,23,42,.8)", borderRight: `1px solid ${C.hairline}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }} />
                  <span className="text-[11px] font-bold">NoteMind AI</span>
                </div>
                {["Dashboard", "Notes", "AI Chat", "Folders"].map((l, i) => (
                  <div key={l} className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5" style={{ background: i === 0 ? "rgba(99,102,241,.15)" : "transparent" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? C.primaryLight : "#475569" }} />
                    <span className="text-[10px]" style={{ color: i === 0 ? C.primaryLight : "#64748B" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4">
                <p className="text-[13px] font-bold mb-3">Welcome back, Arun 👋</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[["128", "Notes", "#6366F1"], ["47", "AI Summaries", "#8B5CF6"], ["3.2GB", "Used", "#14B8A6"]].map(([v, l, c]) => (
                    <div key={l} className="p-3 rounded-xl" style={{ background: `${c}12`, border: `1px solid ${c}22` }}>
                      <p className="text-[16px] font-bold">{v}</p>
                      <p className="text-[10px]" style={{ color: C.muted }}>{l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {NOTES.slice(0, 3).map(n => (
                    <div key={n.id} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: `${n.color}10`, border: `1px solid ${n.color}1e` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: n.color }} />
                      <span className="text-[11px] font-medium flex-1 truncate">{n.title}</span>
                      <span className="text-[10px]" style={{ color: "#64748B" }}>{n.edited}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-48 flex-shrink-0 p-4" style={{ background: "rgba(15,23,42,.5)", borderLeft: `1px solid ${C.hairline}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-lg" style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
                    <Zap size={11} color="#fff" className="m-auto mt-1" />
                  </div>
                  <span className="text-[11px] font-bold">AI Assistant</span>
                </div>
                <div className="space-y-1.5">
                  {["Summarize", "Rewrite", "Fix Grammar", "Explain", "Translate"].map(a => (
                    <div key={a} className="px-2 py-1.5 rounded-lg text-[10px]" style={{ background: "rgba(99,102,241,.1)", color: C.primaryLight }}>{a}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
