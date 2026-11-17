"use client";
import { useEffect, useState } from "react";
import { PROFILE, ROLES } from "@/lib/data";
import { BranchIcon, DocIcon, MailIcon } from "./Icons";
import Orb from "./Orb";

function Typewriter() {
  const [text, setText] = useState("");
  useEffect(() => {
    let r = 0, i = 0, del = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = ROLES[r];
      setText(w.slice(0, i));
      if (!del && i < w.length) { i++; t = setTimeout(tick, 70); }
      else if (!del) { del = true; t = setTimeout(tick, 1800); }
      else if (i > 0) { i--; t = setTimeout(tick, 35); }
      else { del = false; r = (r + 1) % ROLES.length; t = setTimeout(tick, 300); }
    };
    tick();
    return () => clearTimeout(t);
  }, []);
  return <span>{text}</span>;
}

function Letters({ word, start, dot }: { word: string; start: number; dot?: boolean }) {
  const chars = [...word];
  return (
    <>
      {chars.map((c, i) => <span key={i} className="ch" style={{ animationDelay: `${(start + i) * 45 + 150}ms` }}>{c}</span>)}
      {dot && <span className="ch dot" style={{ animationDelay: `${(start + chars.length) * 45 + 200}ms` }}>.</span>}
    </>
  );
}

const S = (s: string) => <span className="s">&quot;{s}&quot;</span>;

export default function Hero() {
  return (
    <section id="home">
      <Orb />
      <div className="wrap hero">
        <div>
          <span className="pill"><i />{PROFILE.availability}</span>
          <div className="hello">// hello, world — my name is</div>
          <h1 aria-label={`${PROFILE.first} ${PROFILE.last}.`}>
            <span><Letters word={PROFILE.first} start={0} /></span>
            <span className="l2"><Letters word={PROFILE.last} start={PROFILE.first.length} dot /></span>
          </h1>
          <div className="role"><span className="p">❯</span><Typewriter /><span className="caret" /></div>
          <p className="tag">{PROFILE.tagline}</p>
          <div className="ctas">
            <a href="#work" className="btn pri"><span className="d">$</span> npm run projects <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
            <a href="#contact" className="btn sec"><MailIcon />POST /contact</a>
          </div>
          <div className="meta">
            <span><svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>Islamabad · Remote</span>
            <span><BranchIcon />main · 4,000+ zones as code</span>
            <span><svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" /></svg>45+ enterprise clients</span>
          </div>
        </div>
        <div className="code reveal">
          <div className="code-h"><DocIcon color="#60a5fa" />developer.ts<span className="r">TypeScript</span></div>
          <pre>
            <span className="ln"><span className="k">const</span> <span className="pr">abdullah</span> <span className="p">=</span> {"{"}</span>
            <span className="ln">  role: {S("Solutions Architect")},</span>
            <span className="ln">  focus: [{S("Frontend")}, {S("Edge")}, {S("DevOps")}],</span>
            <span className="ln">  stack: {"{"}</span>
            <span className="ln">    frontend: {S("React · Next.js · Tailwind")},</span>
            <span className="ln">    edge: {S("Workers · WAF · API Shield")},</span>
            <span className="ln">    infra: {S("Terraform · GitHub Actions")},</span>
            <span className="ln">  {"}"},</span>
            <span className="ln">  building: {S("zone-analyser · tf-hcp")},</span>
            <span className="ln">  clients: <span className="nu">45</span>,</span>
            <span className="ln">  shippingSince: <span className="nu">2018</span>,</span>
            <span className="ln">  hireable: <span className="k">true</span>,</span>
            <span className="ln">{"}"} <span className="k">satisfies</span> <span className="t">Engineer</span>;</span>
            <span className="ln"> </span>
            <span className="ln"><span className="k">export default</span> <span className="pr">abdullah</span>;</span>
          </pre>
          <div className="code-f"><span><span className="ok">●</span> 0 problems</span><span>Ln 14, Col 20</span></div>
        </div>
      </div>
    </section>
  );
}
