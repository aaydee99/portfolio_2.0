"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FILES, PROFILE } from "@/lib/data";
import { FileIcon, GitHubIcon, BranchIcon } from "./Icons";
import Palette from "./Palette";
import { MusicCard, MusicPill } from "./Music";

const NavCtx = createContext<{ go: (id: string) => void }>({ go: () => {} });
export const useNav = () => useContext(NavCtx);

export default function Shell({ children }: { children: React.ReactNode }) {
  const sc = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const [prog, setProg] = useState(0);
  const [pal, setPal] = useState(false);
  const [clock, setClock] = useState("--:--");

  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el && sc.current) sc.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    setPal(false);
  }, []);

  // active file + progress
  useEffect(() => {
    const s = sc.current!;
    const onScroll = () => {
      const y = s.scrollTop + s.clientHeight * 0.35;
      let cur = "home";
      FILES.forEach((f) => { const el = document.getElementById(f.id); if (el && el.offsetTop <= y) cur = f.id; });
      setActive(cur);
      setProg((s.scrollTop / Math.max(1, s.scrollHeight - s.clientHeight)) * 100);
    };
    s.addEventListener("scroll", onScroll, { passive: true });
    return () => s.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const x = FILES.find((f) => f.id === active)!;
    document.title = `${x.label} — ${PROFILE.first} ${PROFILE.last}`;
    document.querySelector(`.tabs [data-id="${active}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  // reveal-on-scroll, count-ups and bars
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add("in");
      el.querySelectorAll<HTMLElement>("[data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"));
      el.querySelectorAll<HTMLElement>(".cnt").forEach((c) => {
        const to = Number(c.dataset.to), t0 = performance.now();
        const f = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          c.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString();
          if (p < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      });
      io.unobserve(el);
    }), { root: sc.current, threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ⌘K + clock
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal((p) => !p); }
      else if (e.key === "Escape") setPal(false);
    };
    document.addEventListener("keydown", k);
    const tick = () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }) + " PKT");
    tick();
    const id = setInterval(tick, 30000);
    return () => { document.removeEventListener("keydown", k); clearInterval(id); };
  }, []);

  // in-page anchor links
  const onClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!.slice(1);
    if (document.getElementById(id)) { e.preventDefault(); go(id); }
  };

  const cur = FILES.find((f) => f.id === active)!;

  return (
    <NavCtx.Provider value={{ go }}>
      <div className="app" onClick={onClick}>
        <header className="top">
          <div className="lights"><i /><i /><i /></div>
          <a href="#home" className="brand">{PROFILE.domain}<b>.</b>dev</a>
          <div className="crumb">{PROFILE.slug}/src/<span>{cur.f}</span></div>
          <div className="sp" />
          <button className="kbtn" onClick={() => setPal(true)} aria-label="Go to file">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <span className="ktxt">Go to file</span><span className="kbd">⌘K</span>
          </button>
          <a className="ibtn" href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
        </header>

        <div className="mid">
          <aside>
            <div className="exh">Explorer</div>
            <div className="tree">
              <div className="dir"><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>{PROFILE.slug}</div>
              <div className="dir" style={{ paddingLeft: 20 }}><svg className="fi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>src</div>
              {FILES.map((x) => (
                <a key={x.id} href={`#${x.id}`} data-id={x.id} className={active === x.id ? "on" : ""}><FileIcon kind={x.ic} />{x.f}</a>
              ))}
            </div>
            <MusicCard />
            <div className="side-card">
              <div className="lbl">// whoami.json</div>
              <div className="row"><span>role</span><span>{PROFILE.role}</span></div>
              <div className="row"><span>at</span><span>{PROFILE.company}</span></div>
              <div className="row"><span>base</span><span>Islamabad, PK</span></div>
              <div className="row"><span>local</span><span>{clock}</span></div>
            </div>
          </aside>

          <div className="main">
            <nav className="tabs">
              {FILES.filter((x) => x.tab).map((x) => (
                <a key={x.id} className={`tab ${active === x.id ? "on" : ""}`} href={`#${x.id}`} data-id={x.id}><FileIcon kind={x.ic} />{x.f}</a>
              ))}
            </nav>
            <div id="scroller" ref={sc}>{children}</div>
          </div>
        </div>

        <div className="status">
          <span className="g"><BranchIcon size={13} />main</span>
          <span className="hide">⟳ synced</span><span className="hide">⊗ 0 ⚠ 0</span>
          <span className="sp" />
          <span>{cur.f}</span>
          <span className="hide">UTF-8</span><span className="hide">{cur.lang}</span>
          <span className="prog"><i style={{ width: `${prog}%` }} /></span>
        </div>
      </div>
      <MusicPill />
      <Palette open={pal} onClose={() => setPal(false)} onGo={go} />
    </NavCtx.Provider>
  );
}
