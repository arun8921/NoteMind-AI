import { Brain } from "lucide-react";
import { C } from "../services/theme";
import { Glow } from "../components/common/Glow";
import { GlassCard } from "../components/common/GlassCard";

export function AuthLayout({ children, title, sub }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: C.bg }}>
      <Glow x="-left-48" y="-top-48" color="#6366F1" opacity=".2" />
      <Glow x="-right-40" y="-bottom-40" color="#14B8A6" opacity=".12" />
      <div className="relative w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", boxShadow: "0 0 28px rgba(99,102,241,.5)" }}>
            <Brain size={22} color="#fff" />
          </div>
          <h1 className="text-[26px] font-black mb-2">{title}</h1>
          <p className="text-[14px]" style={{ color: C.muted }}>{sub}</p>
        </div>
        <GlassCard className="p-8" style={{ border: `1px solid ${C.border}` }}>
          {children}
        </GlassCard>
      </div>
    </div>
  );
}
