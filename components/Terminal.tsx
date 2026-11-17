"use client";
import { useEffect, useRef, useState } from "react";
import { FILES, PROFILE, RELEASES, REPOS, SKILL_GROUPS } from "@/lib/data";
import { isPlaying, toggleMusic } from "@/lib/music";
import { useNav } from "./Shell";

type Line = { kind: "out" | "in"; text: string };

const SECTIONS = ["about", "stack", "work", "experience", "contact"];

export default function Terminal() {
  const { go } = useNav();
  const [lines, setLines] = useState<Line[]>([]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(0);
  const out = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLines([
      { kind: "out", text: `Last login: ${new Date().toDateString()} on ttys001` },
      { kind: "out", text: "Welcome to abdullah.dev shell v6.0.0 — type help to get started." },
    ]);
  }, []);
  useEffect(() => { if (out.current) out.current.scrollTop = out.current.scrollHeight; }, [lines]);

  const run = (raw: string): string | null => {
    const [c, ...a] = raw.trim().split(/\s+/);
    switch (c) {
      case "help":
        return "available commands:\n  about       who I am\n  experience  work history\n  projects    selected repos\n  skills      what I use\n  education   degrees\n  contact     how to reach me\n  resume      download my resume\n  music       play / pause the lo-fi loop\n  open <id>   jump to a section (about, stack, work, experience, contact)\n  github      open GitHub\n  ls · whoami · date · clear";
      case "about":
        return `${PROFILE.first} ${PROFILE.last}, ${PROFILE.role} at ${PROFILE.company} (Remote, Islamabad).\nCloudflare Workers, WAF, bot management, API Shield and Terraform for 45+ enterprise clients.\nReact / Next.js / React Native since 2018.`;
      case "experience":
        return RELEASES.filter((r) => !r.edu).map((r) => `${r.ver.padEnd(8)}${r.date.padEnd(22)}${r.title} @ ${r.org.split(" · ")[0]}`).join("\n");
      case "projects":
        return REPOS.map((r) => `${r.repo.padEnd(22)}${r.tech}`).join("\n");
      case "skills":
        return (Object.keys(SKILL_GROUPS) as (keyof typeof SKILL_GROUPS)[]).map((k) => `${SKILL_GROUPS[k].label.padEnd(10)}${SKILL_GROUPS[k].items.join(", ")}`).join("\n");
      case "education":
        return "BS Computer Science   FAST-NUCES, Islamabad   2024\nA Levels              Beaconhouse, Islamabad  2018";
      case "contact":
        return `email     ${PROFILE.email}\nphone     ${PROFILE.phone}\nlinkedin  linkedin.com/in/${PROFILE.linkedin}\ngithub    github.com/${PROFILE.github}`;
      case "resume": {
        const l = document.createElement("a"); l.href = "/resume.pdf"; l.download = "Abdullah_Akhtar_Resume.pdf"; l.click();
        return "downloading Abdullah_Akhtar_Resume.pdf…";
      }
      case "music":
        toggleMusic();
        return isPlaying() ? "♪ now playing: lo-fi loop (generated live)" : "⏸ music paused";
      case "github":
        window.open(`https://github.com/${PROFILE.github}`, "_blank", "noopener");
        return `opening github.com/${PROFILE.github}…`;
      case "open": {
        const id = a[0] === "projects" ? "work" : a[0];
        if (id && SECTIONS.includes(id)) { go(id); return `opening ${id}…`; }
        return `open: no such section: ${a[0] ?? ""}`;
      }
      case "ls": return FILES.map((f) => f.f).join("  ");
      case "whoami": return "abdullah";
      case "date": return new Date().toString();
      case "sudo": return "nice try. permission denied.";
      case "clear": setLines([]); return null;
      default: return `zsh: command not found: ${c}. Try help.`;
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = val;
      setVal("");
      if (!v.trim()) { setLines((l) => [...l, { kind: "in", text: "" }]); return; }
      setHist((h) => { const n = [...h, v]; setHi(n.length); return n; });
      setLines((l) => [...l, { kind: "in", text: v }]);
      const r = run(v);
      if (r !== null) setLines((l) => [...l, { kind: "out", text: r }]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hi > 0) { setHi(hi - 1); setVal(hist[hi - 1]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi < hist.length - 1) { setHi(hi + 1); setVal(hist[hi + 1]); } else { setHi(hist.length); setVal(""); }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault(); setLines([]);
    }
  };

  const Prompt = () => <><span className="pr1">abdullah@dev</span> <span className="pr2">: ~/portfolio</span> $ </>;

  return (
    <section id="terminal">
      <div className="wrap">
        <div className="kick reveal"><span className="f">~ / run.sh</span><span className="n">// 05</span></div>
        <h2 className="reveal">Interactive shell</h2>
        <p className="sub reveal">Type <span className="mono" style={{ color: "var(--acc)" }}>help</span> to explore. ↑/↓ for history.</p>
        <div className="term reveal">
          <div className="ptabs"><button className="on">TERMINAL</button><button>PROBLEMS</button><button>OUTPUT</button><span className="r">zsh — 120×32</span></div>
          <div id="tout" ref={out} onClick={() => inp.current?.focus({ preventScroll: true })}>
            {lines.map((l, i) => (
              <div key={i} className="ln">{l.kind === "in" ? <><Prompt /><span style={{ color: "#fafafa" }}>{l.text}</span></> : l.text}</div>
            ))}
            <div className="ln"><div className="inl"><Prompt /><input id="tin" ref={inp} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey} spellCheck={false} autoComplete="off" aria-label="terminal input" /></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
