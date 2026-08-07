import { C } from "../../services/theme";
import { TESTIMONIALS } from "../../services/landingData";
import { GlassCard } from "../../components/common/GlassCard";

export function TestimonialsSection() {
  return (
    <section className="px-8 py-20" style={{ background: "rgba(30,41,59,.4)" }}>
      <div className="text-center mb-14">
        <h2 className="text-[40px] font-black tracking-tight mb-4">Loved by knowledge workers</h2>
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto">
        {TESTIMONIALS.map(({ name, role, text }) => (
          <GlassCard key={name} className="p-6">
            <div className="flex mb-3 gap-0.5">{Array(5).fill(0).map((_, i) => <span key={i} style={{ color: "#F59E0B" }}>★</span>)}</div>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: C.muted }}>"{text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold" style={{ background: "linear-gradient(135deg,#6366F1,#14B8A6)", color: "#fff" }}>
                {name[0]}
              </div>
              <div>
                <p className="text-[13px] font-semibold">{name}</p>
                <p className="text-[11px]" style={{ color: "#64748B" }}>{role}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
