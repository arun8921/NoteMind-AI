import { C } from "../../services/theme";

export function Btn({
  children, onClick, variant = "primary", className = "", disabled = false, size = "md",
}) {
  const pad = size === "sm" ? "px-3 py-1.5 text-[12px]" : size === "lg" ? "px-6 py-3.5 text-[15px]" : "px-4 py-2.5 text-[13px]";
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer select-none ${pad} ${className}`;
  const styles = {
    primary: { background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", boxShadow: "0 4px 18px rgba(99,102,241,.35)" },
    ghost: { background: "transparent", color: C.muted },
    outline: { background: "transparent", color: C.primaryLight, border: `1px solid rgba(99,102,241,.35)` },
    danger: { background: "rgba(239,68,68,.15)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,.25)" },
    accent: { background: "linear-gradient(135deg,#14B8A6,#0EA5E9)", color: "#fff", boxShadow: "0 4px 18px rgba(20,184,166,.3)" },
  };
  return (
    <button onClick={onClick} disabled={disabled} className={base} style={styles[variant]}
      onMouseEnter={e => {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,.5)";
        } else if (variant === "ghost") {
          e.currentTarget.style.color = C.text;
          e.currentTarget.style.background = C.hairline;
        }
      }}
      onMouseLeave={e => {
        if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 18px rgba(99,102,241,.35)";
        } else if (variant === "ghost") {
          e.currentTarget.style.color = C.muted;
          e.currentTarget.style.background = "transparent";
        }
      }}>
      {children}
    </button>
  );
}
