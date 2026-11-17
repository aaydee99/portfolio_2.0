import { TECH } from "@/lib/data";

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="lbl">scroll</div>
      <div className="track">
        {[...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
