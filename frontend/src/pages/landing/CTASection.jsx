import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { C } from "../../services/theme";
import { Glow } from "../../components/common/Glow";
import { Btn } from "../../components/common/Button";
import { useNavigation } from "../../hooks/useNavigation";

export function CTASection() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <section className="px-8 py-24 text-center relative overflow-hidden">
      <Glow x="left-1/4" y="-top-32" size="w-[400px] h-[400px]" color="#6366F1" opacity=".18" />
      <div className="relative">
        <h2 className="text-[48px] font-black tracking-tight mb-4">Ready to think smarter?</h2>
        <p className="text-[16px] mb-8" style={{ color: C.muted }}>Join 50,000+ people using NoteMind AI to capture and grow their knowledge.</p>
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
            className="flex-1 bg-transparent px-4 py-3 rounded-xl text-[14px] outline-none"
            style={{ background: "rgba(30,41,59,.8)", border: `1px solid ${C.border}`, color: C.text }} />
          <Btn onClick={() => navigate("register")} size="md"><ArrowRight size={14} /></Btn>
        </div>
      </div>
    </section>
  );
}
