export function Glow({ x = "-left-48", y = "-top-48", size = "w-[480px] h-[480px]", color = "#6366F1", opacity = ".16" }) {
  return (
    <div className={`absolute ${x} ${y} ${size} rounded-full pointer-events-none blur-[120px]`}
      style={{ background: color, opacity }} />
  );
}
