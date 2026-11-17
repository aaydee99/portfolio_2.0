import { PROFILE, PUBLIC_REPOS, REPOS } from "@/lib/data";

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="kick reveal"><span className="f">.git / showcase.log</span><span className="n">// 03</span></div>
        <h2 className="reveal">Selected work.</h2>
        <p className="sub reveal">
          Some repositories are private; public code is on{" "}
          <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener" style={{ color: "var(--acc)" }}>github.com/{PROFILE.github}</a>.
        </p>
        <div className="cmd reveal"><b>$</b> git log --author=&quot;abdullah&quot; --showcase --oneline</div>
        <div className="log reveal">
          {REPOS.map((r) => {
            const pub = PUBLIC_REPOS.has(r.repo);
            const body = (
              <>
                <span className="h">{r.repo}</span>
                <div>
                  <div className="m"><span className="ty">{r.type}:</span> {r.msg}</div>
                  <div className="rp"><span>{PROFILE.github}/{r.repo}</span><span className="tech">{r.tech}</span></div>
                </div>
                <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span className="badge">{r.badge}</span>
                  {pub ? <span className="go">↗</span> : <span className="lock" title="Private repository">🔒 private</span>}
                </span>
              </>
            );
            return pub ? (
              <a key={r.repo} className="commit" href={`https://github.com/${PROFILE.github}/${r.repo}`} target="_blank" rel="noopener">{body}</a>
            ) : (
              <div key={r.repo} className="commit priv">{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
