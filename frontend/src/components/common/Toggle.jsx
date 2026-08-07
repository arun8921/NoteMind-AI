export function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: on ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "rgba(148,163,184,.2)" }}>
      <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
        style={{ left: on ? "calc(100% - 22px)" : "2px" }} />
    </button>
  );
}
