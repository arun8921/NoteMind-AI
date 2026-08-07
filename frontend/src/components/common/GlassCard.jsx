import { C } from "../../services/theme";

export function GlassCard({ children, className = "", style = {} }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "rgba(30,41,59,.72)", backdropFilter: "blur(20px)", border: `1px solid ${C.hairline}`, ...style }}>
      {children}
    </div>
  );
}
