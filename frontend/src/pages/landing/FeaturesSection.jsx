import { C } from "../../services/theme";
import { FEATURES } from "../../services/landingData";
import { GlassCard } from "../../components/common/GlassCard";

export function FeaturesSection() {
  return (
    <section className="px-8 py-20">
      <div className="text-center mb-14">
        <p className="text-[12px] font-semibold uppercase tracking-[.15em] mb-3" style={{ color: C.primaryLight }}>Features</p>
        <h2 className="text-[40px] font-black tracking-tight mb-4">Everything your notes need</h2>
        <p className="text-[16px]" style={{ color: C.muted }}>Six powerful AI features that transform how you capture and use knowledge.</p>
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <GlassCard key={title} className="p-6 group cursor-default transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(99,102,241,.15)" }}>
              <Icon size={20} style={{ color: C.primaryLight }} />
            </div>
            <h3 className="text-[15px] font-bold mb-2">{title}</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
