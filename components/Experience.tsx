import { RELEASES } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="kick reveal"><span className="f">~ / CHANGELOG.md</span><span className="n">// 04</span></div>
        <h2 className="reveal">Release history</h2>
        <div className="tl">
          {RELEASES.map((r) => (
            <div key={r.ver} className="rel reveal">
              <div className="top2"><span>{r.date}</span><span className="ver">{r.ver}</span><span className={`kind ${r.kind}`}>{r.kind}</span></div>
              <h3>{r.title}</h3>
              <div className="org">{r.org}</div>
              {r.bullets.length ? <ul>{r.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : <div style={{ height: 10 }} />}
              <div className="chips">{r.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
