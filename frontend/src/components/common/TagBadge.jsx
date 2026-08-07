import { C } from "../../services/theme";

export function TagBadge({ tag, color }) {
  const c = color || C.primary;
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
      style={{ background: `${c}1a`, color: c, border: `1px solid ${c}28` }}>{tag}</span>
  );
}
