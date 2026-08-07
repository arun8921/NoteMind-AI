import { useState } from "react";
import { Heart, MoreHorizontal, Clock, Tag } from "lucide-react";
import { C } from "../services/theme";
import { TagBadge } from "./common/TagBadge";

export function NoteCard({ note, onClick }) {
  const [hov, setHov] = useState(false);
  const [fav, setFav] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="rounded-2xl p-5 cursor-pointer transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${note.color}18 0%, rgba(30,41,59,.7) 100%)`,
        border: `1px solid ${note.color}28`,
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? `0 14px 36px ${note.color}28` : "none",
      }}>
      <div className="flex items-start gap-2 mb-3">
        <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: note.color }} />
        <h3 className="text-[13px] font-semibold leading-snug flex-1" style={{ color: C.text }}>{note.title}</h3>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); setFav(!fav); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ background: fav ? "rgba(245,158,11,.16)" : "rgba(148,163,184,.08)" }}>
            <Heart size={12} style={{ color: fav ? "#FCD34D" : "#64748B", fill: fav ? "#FCD34D" : "transparent" }} />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(148,163,184,.08)" }}>
            <MoreHorizontal size={12} style={{ color: "#64748B" }} />
          </button>
        </div>
      </div>
      <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: C.muted }}>{note.preview}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {note.tags.map(t => <TagBadge key={t} tag={t} color={note.color} />)}
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#64748B" }}><Clock size={10} />{note.edited}</span>
        <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#64748B" }}><Tag size={10} />{note.words.toLocaleString()} words</span>
      </div>
    </div>
  );
}
