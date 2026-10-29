/* Hill wireframe animation (canvas 2D). No mouse interaction.
   Mounts on <canvas id="hill">; colours come from the canvas CSS vars --hill-ink / --hill-op. */
(function () {
class DCLogic {}
class Component extends DCLogic {
  renderVals() {
    if (!this._setCanvas) this._setCanvas = (el) => { this.cv = el; };
    return { setCanvas: this._setCanvas };
  }
  componentDidMount() {
    if (!this.cv) return;
    const rows = (s) => s.trim().split('|').map((r) => r.trim().split(' ').map(Number));
    this.HM = rows('1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 1 1 1 2 1 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1|1 1 1 1 1 1 1 2 1 2 2 2 5 5 4 4 7 5 5 5 4 2 2 2 2 2 1 1 1 1 1 1 1|1 1 1 1 1 1 1 2 2 3 7 9 13 12 12 12 13 12 13 14 13 6 4 3 3 2 2 1 1 1 1 1 1|1 1 1 1 1 1 2 5 6 5 12 19 23 22 19 19 20 16 20 22 15 11 9 9 7 6 3 2 1 1 1 1 1|1 1 1 2 2 2 7 10 12 15 17 26 34 33 33 29 25 24 23 24 21 17 15 12 13 7 3 3 2 1 1 1 1|1 1 1 2 3 4 10 15 19 22 29 35 42 40 39 39 37 35 31 30 25 25 24 20 13 12 9 5 2 2 1 1 1|1 1 1 2 8 10 9 16 22 30 42 49 49 44 41 43 42 45 47 43 42 35 36 26 24 20 13 5 4 2 1 1 1|1 1 2 3 11 18 15 19 20 36 49 57 52 43 41 42 43 43 45 52 57 52 38 33 33 26 15 8 7 3 1 1 1|1 1 1 3 12 21 24 25 28 38 50 54 47 39 36 39 44 44 49 63 71 64 53 42 43 32 20 14 9 4 1 1 1|1 1 1 3 11 21 28 31 34 40 45 47 43 36 35 38 49 50 54 71 79 76 69 61 50 32 19 13 6 3 1 1 1|1 1 1 3 7 18 26 36 42 42 43 45 44 35 35 38 56 61 64 75 86 91 89 78 55 36 19 11 6 2 2 2 1|1 1 2 2 4 10 21 32 41 39 39 43 43 36 38 43 58 60 71 85 96 97 89 73 52 29 12 7 4 3 2 2 1|1 1 2 8 13 16 25 31 35 34 34 37 42 38 37 45 52 59 76 87 91 81 72 54 43 28 14 10 6 6 3 1 1|1 2 6 13 20 27 36 43 40 36 35 33 35 35 37 49 47 55 66 70 72 68 65 66 59 43 22 14 13 10 5 1 1|1 2 8 15 20 31 43 47 53 50 42 36 37 40 40 43 42 51 52 63 69 71 68 69 67 50 33 23 17 12 7 1 1|1 2 5 12 15 24 33 41 47 43 40 34 33 36 40 40 37 41 49 52 51 51 50 51 55 45 30 18 15 10 3 2 1|1 1 2 7 10 16 20 31 41 42 38 38 37 42 42 37 37 40 52 56 56 50 44 44 44 37 25 12 9 5 2 2 1|1 1 1 3 5 7 13 25 40 47 45 45 45 43 39 37 37 42 51 54 60 57 50 48 45 31 19 8 3 2 2 1 1|1 1 1 3 7 13 20 26 37 47 49 49 47 49 43 37 40 46 51 56 57 54 52 50 49 34 21 12 7 2 1 1 1|1 1 1 4 12 14 17 20 28 34 40 44 47 45 40 36 36 40 42 48 49 47 38 40 44 36 21 14 7 2 1 1 1|1 1 2 4 11 16 15 17 20 28 32 35 44 43 36 35 35 33 36 41 48 44 36 33 34 30 17 14 8 3 1 1 1|1 1 2 4 11 10 13 16 24 24 27 28 36 38 36 37 32 32 33 34 44 40 30 31 26 24 16 10 8 4 2 1 1|1 1 1 3 5 5 11 17 21 23 25 24 26 31 35 37 33 33 31 32 35 32 25 28 24 19 16 10 7 3 1 1 1|1 1 1 2 2 4 10 13 18 20 18 18 22 22 29 30 30 27 22 21 26 22 17 16 17 12 10 5 3 1 1 1 1|1 1 1 1 1 2 4 9 13 12 15 13 16 14 18 20 26 18 11 14 19 14 14 10 11 10 5 3 1 1 1 1 1|1 1 1 1 1 1 2 3 7 7 11 10 13 11 13 19 21 15 9 11 14 12 9 6 5 5 3 2 1 1 1 1 1|1 1 1 1 1 1 1 2 2 4 5 10 11 8 12 14 14 10 9 8 10 9 5 3 2 2 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 2 2 5 5 5 7 9 9 7 7 2 6 3 3 2 2 2 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 2 1 2 2 1 2 2 3 2 2 2 2 1 1 1 2 1 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1|1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1');
    this.AM = rows('0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 3 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 2 4 5 1 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 1 2 3 5 3 3 3 2 0 1 1 1 2 3 9 12 17 7 2 1 0 0 0 0 0 0 0|0 0 0 0 1 2 6 11 17 16 7 9 9 11 12 10 8 6 8 12 25 26 28 17 7 3 1 0 0 0 0 0 0|0 0 0 0 4 10 19 26 33 32 24 20 22 29 41 37 35 23 23 32 38 40 39 27 18 11 4 1 0 0 0 0 0|0 0 0 1 10 19 28 38 44 49 45 34 40 46 49 57 59 58 49 49 49 50 49 38 31 20 7 2 0 0 0 0 0|0 0 0 2 17 31 33 41 50 54 53 49 55 58 61 68 73 69 63 61 60 59 58 51 42 33 12 3 0 0 0 0 0|0 0 1 3 9 24 32 43 51 56 54 53 60 68 71 76 80 75 72 70 70 69 66 58 53 47 27 14 2 0 0 0 0|0 0 1 3 9 16 27 41 51 56 55 55 61 71 75 81 84 81 78 77 78 74 69 64 63 57 43 26 6 3 2 0 0|0 1 2 4 16 29 29 36 49 58 60 59 63 73 78 82 84 83 81 80 81 76 71 67 64 60 49 34 13 9 3 1 0|0 1 5 11 26 36 37 42 48 60 60 64 70 78 81 81 83 83 78 76 74 73 68 63 57 51 44 36 21 11 3 1 0|0 1 6 16 28 39 45 51 56 57 63 68 75 83 82 81 82 82 78 76 74 72 66 61 59 54 46 36 31 14 3 1 0|0 1 5 19 31 40 49 58 65 64 69 77 83 84 85 86 87 88 85 83 77 71 65 62 58 55 49 41 32 16 5 0 0|0 1 4 22 38 45 50 57 64 70 77 86 90 89 89 92 95 96 94 88 81 73 64 64 59 59 54 40 30 19 5 0 0|0 1 5 19 39 50 52 58 63 71 80 87 91 93 92 96 97 96 95 89 82 73 63 59 56 56 50 37 25 19 4 0 0|0 1 7 21 36 48 54 58 64 72 78 83 87 90 94 94 95 92 90 84 77 71 69 63 56 52 43 30 17 9 2 0 0|0 2 10 25 37 46 52 59 65 70 75 80 83 85 85 87 87 82 79 73 69 67 69 65 56 50 38 24 11 4 1 0 0|0 2 10 24 36 43 49 59 66 69 73 76 80 81 80 79 75 73 72 68 67 68 66 57 43 36 31 13 5 2 0 0 0|0 2 9 23 32 41 47 55 63 67 69 70 77 76 77 78 75 71 70 69 69 62 57 42 19 13 17 13 2 0 0 0 0|0 2 7 16 29 37 46 55 61 65 63 65 72 72 71 72 74 70 70 74 71 62 50 30 9 3 1 0 0 0 0 0 0|0 1 4 7 18 32 47 56 59 60 57 59 67 72 67 68 71 71 75 75 72 63 54 26 5 1 0 0 0 0 0 0 0|0 0 1 3 11 25 34 46 54 57 56 55 61 67 63 61 69 69 72 71 67 55 45 25 3 0 0 0 0 0 0 0 0|0 0 0 0 2 7 16 30 42 43 41 42 53 58 58 53 59 60 64 63 56 43 31 27 2 0 0 0 0 0 0 0 0|0 0 0 0 0 2 5 19 30 26 21 26 40 48 50 50 45 47 54 52 42 24 16 23 1 0 0 0 0 0 0 0 0|0 0 0 0 0 0 2 13 8 8 9 9 17 29 40 43 34 39 45 45 28 11 5 3 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 2 2 2 3 3 5 13 29 34 24 26 33 30 14 4 2 6 1 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 1 3 13 28 34 25 15 16 6 2 0 1 6 1 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 8 13 23 22 19 7 3 1 3 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 3 7 7 8 2 2 1 0 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0|0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0');
    this.reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.t = 0; this.last = performance.now(); this.g = 0; this.camB = 0; this.camX = 0;
    this.build();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.resize();
    const tick = (now) => {
      const dt = Math.min((now - this.last) / 1000, 0.05); this.last = now;
      if (!document.hidden) { this.t += dt; this.draw(dt); }
      this.raf = requestAnimationFrame(tick);
    };
    if (this.reduce) this.draw(0); else this.raf = requestAnimationFrame(tick);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  }
  tex(m, u, v) {
    const N = 32, x = u * N, y = (1 - v) * N;
    const x0 = Math.floor(x), y0 = Math.floor(y), x1 = Math.min(x0 + 1, N), y1 = Math.min(y0 + 1, N);
    const fx = x - x0, fy = y - y0;
    const a = m[y0][x0] * (1 - fx) + m[y0][x1] * fx, b = m[y1][x0] * (1 - fx) + m[y1][x1] * fx;
    return (a * (1 - fy) + b * fy) / 99;
  }
  build() {
    const SX = 96, SY = 128; this.SX = SX; this.SY = SY;
    const n = (SX + 1) * (SY + 1);
    this.U = new Float32Array(n); this.V = new Float32Array(n); this.HB = new Float32Array(n); this.AL = new Float32Array(n);
    this.PX = new Float32Array(n); this.PY = new Float32Array(n); this.OK = new Uint8Array(n);
    for (let iy = 0; iy <= SY; iy++) for (let ix = 0; ix <= SX; ix++) {
      const k = iy * (SX + 1) + ix, u = ix / SX, v = 1 - iy / SY;
      this.U[k] = u; this.V[k] = v; this.HB[k] = this.tex(this.HM, u, v); this.AL[k] = this.tex(this.AM, u, v);
    }
  }
  resize() {
    const cv = this.cv; if (!cv) return;
    const w = cv.clientWidth || 1200, h = cv.clientHeight || 440, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    this.ctx = cv.getContext('2d'); this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = w; this.H = h; this.camZ = w < 768 ? 140 : 84;
    const cs = getComputedStyle(cv);
    this.ink = (cs.getPropertyValue('--hill-ink') || '#56616b').trim();
    this.op = parseFloat(cs.getPropertyValue('--hill-op')) || 0.26;
    this.draw(0);
  }
  draw(dt) {
    const ctx = this.ctx; if (!ctx) return;
    const W = this.W, H = this.H, SX = this.SX, SY = this.SY;
    const time = this.t * 5, i = this.t * 0.28;
    const amp = 58 + Math.sin(i * 1.2) * 6;
    const rz = this.g + Math.sin(i) * 0.14, rx = 11 + Math.sin(i * 0.7) * 0.025;
    const ease = 1 - Math.pow(0.95, dt * 60);
    this.camB += (Math.sin(i * 0.8) * 2 - this.camB) * ease;
    this.camX += (Math.sin(i * 0.6) * 1.2 - this.camX) * ease;
    const cx = -3 + this.camB, cy = 25 + this.camX, cz = this.camZ;
    const tanH = Math.tan((75 * Math.PI / 180) / 2), aspect = W / H;
    const cz1 = Math.cos(rz), sz1 = Math.sin(rz), cx1 = Math.cos(rx), sx1 = Math.sin(rx);
    const F = 50.265482;
    const n = (SX + 1) * (SY + 1);
    for (let k = 0; k < n; k++) {
      const u = this.U[k], v = this.V[k];
      const x = (-100 + 200 * u) * 2.3, y = -100 + 200 * v;
      const z = this.HB[k] * amp + (Math.sin(u * F + time) + Math.cos(v * F + time)) * 0.2;
      const x1 = x * cz1 - y * sz1, y1 = x * sz1 + y * cz1;
      const y2 = y1 * cx1 - z * sx1, z2 = y1 * sx1 + z * cx1;
      const px = x1 - cx, py = y2 - cy, pz = z2 - cz;
      if (pz > -0.5) { this.OK[k] = 0; continue; }
      this.OK[k] = 1;
      this.PX[k] = ((px / -pz) / (tanH * aspect) + 1) * 0.5 * W;
      this.PY[k] = (1 - (py / -pz) / tanH) * 0.5 * H - H * 0.03;
    }
    ctx.clearRect(0, 0, W, H);
    const B = 12, paths = [];
    for (let b = 0; b < B; b++) paths.push(new Path2D());
    const seg = (a, c) => {
      if (!this.OK[a] || !this.OK[c]) return;
      const dx = this.PX[c] - this.PX[a], dy = this.PY[c] - this.PY[a];
      const len = Math.sqrt(dx * dx + dy * dy);
      const al = (this.AL[a] + this.AL[c]) * 0.5 * Math.min(1, Math.max(0.15, (len - 2) / 10));
      if (al < 0.02) return;
      const p = paths[Math.min(B - 1, Math.floor(al * B))];
      p.moveTo(this.PX[a], this.PY[a]); p.lineTo(this.PX[c], this.PY[c]);
    };
    const R = SX + 1;
    for (let iy = 0; iy <= SY; iy++) for (let ix = 0; ix <= SX; ix++) {
      const k = iy * R + ix;
      if (ix < SX) seg(k, k + 1);
      if (iy < SY) seg(k, k + R);
      if (ix < SX && iy < SY) seg(k + R, k + 1);
    }
    ctx.lineWidth = 1; ctx.strokeStyle = this.ink;
    for (let b = 0; b < B; b++) { ctx.globalAlpha = Math.min(1, ((b + 0.5) / B) * this.op); ctx.stroke(paths[b]); }
    ctx.globalAlpha = 1;
  }
}
function start() {
  const el = document.getElementById('hill');
  if (!el) return;
  const c = new Component();
  c.cv = el;
  c.componentDidMount();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
