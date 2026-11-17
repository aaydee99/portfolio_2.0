"use client";
import { useEffect, useRef } from "react";

type V3 = [number, number, number];

// Rotating wireframe geodesic sphere, inner icosahedron, particle shell and orbit ring.
export default function Orb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!, cx = cv.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    const rs = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    rs();
    window.addEventListener("resize", rs);

    const t = (1 + Math.sqrt(5)) / 2;
    const nrm = (v: number[]): V3 => { const l = Math.hypot(...v); return v.map((x) => x / l) as V3; };
    const base: V3[] = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    const V: V3[] = base.map(nrm);
    let F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    const cache: Record<string, number> = {};
    const mid = (a: number, b: number) => {
      const k = a < b ? `${a}_${b}` : `${b}_${a}`;
      if (cache[k] != null) return cache[k];
      V.push(nrm(V[a].map((x, i) => (x + V[b][i]) / 2)));
      return (cache[k] = V.length - 1);
    };
    F = F.flatMap(([a, b, c]) => { const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a); return [[a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]]; });
    const E = new Set<string>();
    F.forEach(([a, b, c]) => [[a, b], [b, c], [c, a]].forEach(([x, y]) => E.add(x < y ? `${x}-${y}` : `${y}-${x}`)));
    const ED = [...E].map((s) => s.split("-").map(Number));
    const IV = base.map(nrm);
    const IE: number[][] = [];
    for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) if (Math.hypot(...IV[i].map((x, k) => x - IV[j][k])) < 1.1) IE.push([i, j]);
    const P: V3[] = [];
    for (let i = 0; i < 900; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = 1.25 + Math.random() * 0.35, s = Math.sqrt(1 - u * u);
      P.push([s * Math.cos(a) * r, u * r, s * Math.sin(a) * r]);
    }
    let mx = 0, my = 0;
    const pm = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("pointermove", pm);
    const rot = (p: V3, ay: number, ax: number): V3 => {
      let [x, y, z] = p;
      let c = Math.cos(ay), s = Math.sin(ay);
      [x, z] = [x * c + z * s, -x * s + z * c];
      c = Math.cos(ax); s = Math.sin(ax);
      [y, z] = [y * c - z * s, y * s + z * c];
      return [x, y, z];
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let T = 0;

    const frame = () => {
      T += reduce ? 0 : 0.0025;
      cx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.3, ox = W / 2, oy = H / 2, ay = T + mx * 0.5, ax = 0.35 + my * 0.3;
      const pr = (p: V3): V3 => { const q = rot(p, ay, ax); const k = 3 / (3 + q[2]); return [ox + q[0] * R * k, oy + q[1] * R * k, q[2]]; };

      cx.save(); cx.translate(ox, oy); cx.rotate(-0.18); cx.scale(1, 0.22); cx.beginPath(); cx.arc(0, 0, R * 2.1, 0, Math.PI * 2); cx.restore();
      cx.strokeStyle = "rgba(52,211,153,.14)"; cx.lineWidth = 1; cx.stroke();

      const PV = V.map(pr);
      cx.lineWidth = 0.8;
      ED.forEach(([a, b]) => {
        const z = (PV[a][2] + PV[b][2]) / 2;
        cx.strokeStyle = `rgba(212,212,216,${0.05 + 0.13 * (1 - (z + 1) / 2)})`;
        cx.beginPath(); cx.moveTo(PV[a][0], PV[a][1]); cx.lineTo(PV[b][0], PV[b][1]); cx.stroke();
      });

      const IP = IV.map((v) => { const q = rot(v.map((x) => x * 0.42) as V3, -ay * 1.6, ax); const k = 3 / (3 + q[2]); return [ox + q[0] * R * k, oy + q[1] * R * k]; });
      cx.strokeStyle = "rgba(94,234,212,.38)"; cx.lineWidth = 1;
      IE.forEach(([a, b]) => { cx.beginPath(); cx.moveTo(IP[a][0], IP[a][1]); cx.lineTo(IP[b][0], IP[b][1]); cx.stroke(); });

      P.forEach((p) => { const q = pr(p); cx.fillStyle = `rgba(228,228,231,${0.12 + 0.45 * (1 - (q[2] + 1.6) / 3.2)})`; cx.fillRect(q[0], q[1], 1.2, 1.2); });
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", rs); window.removeEventListener("pointermove", pm); };
  }, []);

  return <canvas id="orb" ref={ref} aria-hidden="true" />;
}
