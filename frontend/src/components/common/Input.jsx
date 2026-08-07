import { useState } from "react";
import { C } from "../../services/theme";

export function Input({ placeholder, type = "text", icon: Icon, value, onChange, className = "" }) {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200 ${className}`}
      style={{ background: "rgba(15,23,42,.7)", border: focus ? `1px solid rgba(99,102,241,.5)` : `1px solid ${C.border}`, boxShadow: focus ? "0 0 0 3px rgba(99,102,241,.12)" : "none" }}>
      {Icon && <Icon size={15} style={{ color: focus ? C.primaryLight : C.muted, flexShrink: 0 }} />}
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#475569]"
        style={{ color: C.text }} />
    </div>
  );
}
