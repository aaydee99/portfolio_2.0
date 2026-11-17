import { BARS, DEPS } from "@/lib/data";
import { FileIcon } from "./Icons";

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="kick reveal"><span className="f">~ / package.json</span><span className="n">// 02</span></div>
        <h2 className="reveal">Dependencies</h2>
        <div className="install reveal"><b>✓</b> added 36 packages, audited 0 vulnerabilities</div>
        <div className="deps">
          {DEPS.map(([f, rows]) => (
            <div key={f} className="code reveal">
              <div className="code-h"><FileIcon kind="json" />{f}<span className="r">{rows.length} deps</span></div>
              <pre>
                <span className="ln">{"{"}</span>
                {rows.map(([k, v], i) => (
                  <span key={k} className="ln">  <span className="pr">&quot;{k}&quot;</span>: <span className="s">&quot;{v}&quot;</span>{i < rows.length - 1 ? "," : ""}</span>
                ))}
                <span className="ln">{"}"}</span>
              </pre>
            </div>
          ))}
        </div>

        <div className="bal">
          <div className="kick reveal"><span className="f">~ / balance.json</span><span className="n">// 02b</span></div>
          <h2 className="reveal">Balanced across the stack.</h2>
          <p className="sub reveal">Where my work has gone, from product UI to the edge and the pipelines that ship it.</p>
          <div className="bars">
            {BARS.map(([n, d, w]) => (
              <div key={n} className="bar reveal">
                <div><div className="n">{n}</div><div className="d">{d}</div></div>
                <div className="tr"><i data-w={w} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
