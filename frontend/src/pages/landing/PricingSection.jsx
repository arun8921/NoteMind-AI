import { Zap, Check } from "lucide-react";
import { C } from "../../services/theme";
import { PRICING } from "../../services/landingData";
import { Btn } from "../../components/common/Button";
import { useNavigation } from "../../hooks/useNavigation";

export function PricingSection() {
  const { navigate } = useNavigation();
  return (
    <section className="px-8 py-20">
      <div className="text-center mb-14">
        <h2 className="text-[40px] font-black tracking-tight mb-4">Simple, honest pricing</h2>
        <p className="text-[16px]" style={{ color: C.muted }}>Start free. Upgrade when you need more power.</p>
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
        {PRICING.map(({ name, price, period, features, cta, highlight }) => (
          <div key={name} className="rounded-2xl p-6 transition-all duration-300"
            style={{
              background: highlight ? "linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.12))" : "rgba(30,41,59,.6)",
              border: highlight ? "1px solid rgba(99,102,241,.4)" : `1px solid ${C.hairline}`,
              boxShadow: highlight ? "0 0 40px rgba(99,102,241,.2)" : "none",
            }}>
            {highlight && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold mb-4" style={{ background: "rgba(99,102,241,.25)", color: C.primaryLight }}>
                <Zap size={10} /> Most Popular
              </div>
            )}
            <p className="text-[14px] font-bold mb-2">{name}</p>
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-[36px] font-black">{price}</span>
              <span className="text-[13px]" style={{ color: C.muted }}>{period}</span>
            </div>
            <div className="space-y-2.5 mb-6">
              {features.map(f => (
                <div key={f} className="flex items-center gap-2 text-[13px]" style={{ color: C.muted }}>
                  <Check size={13} style={{ color: highlight ? C.primaryLight : C.accent, flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <Btn onClick={() => navigate("register")} variant={highlight ? "primary" : "outline"} className="w-full">{cta}</Btn>
          </div>
        ))}
      </div>
    </section>
  );
}
