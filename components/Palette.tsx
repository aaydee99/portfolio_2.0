"use client";
import { useEffect, useRef, useState } from "react";
import { FILES } from "@/lib/data";
import { FileIcon } from "./Icons";

export default function Palette({ open, onClose, onGo }: { open: boolean; onClose: () => void; onGo: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inp = useRef<HTMLInputElement>(null);
  const items = FILES.filter((f) => (f.f + f.label).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inp.current?.focus(), 10); } }, [open]);

  if (!open) return null;
  return (
    <div id="pal" className="on" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pbox">
        <input
          ref={inp} value={q} placeholder="Go to file…" autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { setSel((s) => Math.min(s + 1, items.length - 1)); e.preventDefault(); }
            else if (e.key === "ArrowUp") { setSel((s) => Math.max(s - 1, 0)); e.preventDefault(); }
            else if (e.key === "Enter" && items[sel]) onGo(items[sel].id);
          }}
        />
        <div id="plist">
          {items.length ? items.map((f, i) => (
            <a key={f.id} href={`#${f.id}`} className={i === sel ? "sel" : ""} onClick={(e) => { e.preventDefault(); onGo(f.id); }}>
              <FileIcon kind={f.ic} />{f.f}<span className="x">{f.label}</span>
            </a>
          )) : <div style={{ padding: 14, color: "#52525b", fontFamily: "var(--mono)", fontSize: 13 }}>No matching files</div>}
        </div>
      </div>
    </div>
  );
}
