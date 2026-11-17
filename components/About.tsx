"use client";
import { useState } from "react";
import { SKILL_GROUPS, STATS } from "@/lib/data";
import { DocIcon } from "./Icons";

type K = keyof typeof SKILL_GROUPS;

export default function About() {
  const [seg, setSeg] = useState<K>("fe");
  return (
    <section id="about">
      <div className="wrap">
        <div className="kick reveal"><span className="f">src / about.md</span><span className="n">// 01</span></div>
        <h2 className="reveal">From React screens to edge rules, I own what sits in front of the origin.</h2>
        <div className="about-g">
          <div className="code reveal">
            <div className="code-h"><DocIcon />about.md<span className="r">Markdown</span></div>
            <div className="md-body">
              <div className="nums">{Array.from({ length: 11 }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
              <div className="md">
                <div className="h">## whoami</div>
                <p>I&apos;m a Solutions Architect at Adapture, where I manage Cloudflare for 45+ enterprise clients: Workers, WAF, bot management, rate limiting, API Shield and Terraform across 4,000+ zones. Before that I spent six years building React, Next.js and React Native products.</p>
                <div className="h" style={{ marginTop: 16 }}>## principles</div>
                <ul>
                  <li>Performance and accessibility are part of the feature, not a later fix.</li>
                  <li>Edge security should be tuned, tested and kept as code.</li>
                  <li>Roll out in stages: log, challenge, then block.</li>
                </ul>
                <blockquote>Currently building zone-analyser, a Cloudflare audit console.</blockquote>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div className="cur">
              <div className="lbl"><i />CURRENTLY</div>
              <div className="r"><span>Building</span><span>Cloudflare Audit Console</span></div>
              <div className="r"><span>Working at</span><span>Adapture · Remote</span></div>
              <div className="r"><span>Shipping</span><span>WAF, bot &amp; rate-limit rollouts</span></div>
              <div className="r"><span>Speaking</span><span>English · Urdu · Punjabi</span></div>
            </div>
            <div className="cur made">
              <div className="lbl">// what I&apos;m made of</div>
              <div className="mono" style={{ fontSize: 13, color: "var(--mut)" }}>traits: [<span className="s">&quot;curious&quot;</span>, <span className="s">&quot;pragmatic&quot;</span>, <span className="s">&quot;typed&quot;</span>]</div>
              <div className="seg">
                {(Object.keys(SKILL_GROUPS) as K[]).map((k) => (
                  <button key={k} className={seg === k ? "on" : ""} onClick={() => setSeg(k)}>{SKILL_GROUPS[k].label}</button>
                ))}
              </div>
              <div className="chips">
                {SKILL_GROUPS[seg].items.map((t, i) => <span key={t} className={`chip ${i < 4 ? "a" : ""}`}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div key={s.k} className="stat reveal"><div className="k2">{s.k}</div><div className="v"><span className="cnt" data-to={s.to}>0</span>{s.suffix}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
