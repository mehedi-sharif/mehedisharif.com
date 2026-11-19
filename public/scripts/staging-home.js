/* smooth scroll: Lenis eases the page; it is stepped from the founder loop
   below so the page and the figure move on the very same frame */
window.lenis = null;
try {
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const el = id === "#top" ? 0 : document.querySelector(id);
        if (el !== null) {
          e.preventDefault();
          lenis.scrollTo(el, { duration: 1.4 });
        }
      }),
    );
  }
} catch (e) {
  lenis = null;
}
/* nav scroll-spy */
(function () {
  const links = [...document.querySelectorAll('.navpill a[href^="#"]')];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href")));
  let last = -1;
  function spy() {
    const y = innerHeight * 0.4;
    let k = 0;
    secs.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top <= y) k = i;
    });
    if (k !== last) {
      last = k;
      links.forEach((a, i) => a.classList.toggle("active", i === k));
    }
  }
  addEventListener("scroll", spy, { passive: true });
  addEventListener("resize", spy);
  spy();
})();
/* For fun: hover a highlighted word, a card glides after the cursor */
(function () {
  const st = document.getElementById("story"),
    pk = document.getElementById("peek");
  if (!st) return;
  const items = [...pk.children];
  let tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    vx = 0,
    on = false,
    raf = 0,
    hide = 0;
  function tick() {
    const nx = x + (tx - x) * 0.12;
    vx = vx * 0.8 + (nx - x) * 0.2;
    x = nx;
    y += (ty - y) * 0.12;
    const rot = Math.max(-7, Math.min(7, vx * 0.9));
    pk.style.transform = `translate3d(${x + 28}px,${y - 230}px,0) rotate(${rot}deg)`;
    raf =
      on || Math.abs(tx - x) > 0.3 || Math.abs(vx) > 0.05
        ? requestAnimationFrame(tick)
        : 0;
  }
  st.querySelectorAll(".hw").forEach((w) => {
    w.addEventListener("mouseenter", (e) => {
      clearTimeout(hide);
      if (!pk.classList.contains("show")) {
        x = tx = e.clientX;
        y = ty = e.clientY;
        vx = 0;
      }
      on = true;
      st.querySelectorAll(".hw.on").forEach((o) => o.classList.remove("on"));
      w.classList.add("on");
      st.classList.add("dim");
      pk.classList.add("show");
      items.forEach((it) =>
        it.classList.toggle("on", it.dataset.k === w.dataset.peek),
      );
      if (!raf) raf = requestAnimationFrame(tick);
    });
    w.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    /* a short grace period, so sliding from word to word never flashes */
    w.addEventListener("mouseleave", () => {
      hide = setTimeout(() => {
        on = false;
        w.classList.remove("on");
        st.classList.remove("dim");
        pk.classList.remove("show");
      }, 160);
    });
  });
})();
/* Values */
const values = [
  ["ENFP personality", "Search “ENFP.” You’ll get a good picture of me."],
  [
    "Monk life",
    "Inside, I picture myself as a monk in white, with a bald head, quietly observing nature.",
  ],
  [
    "Growth mindset",
    "Life feels empty when I stop learning. Sometimes I wish I had a second brain to hold it all.",
  ],
  [
    "Workaholic",
    "Time disappears when I’m building something meaningful. Work is my flow state, especially when it makes an impact.",
  ],
  [
    "Minimalism",
    "Simple living, staying down to earth, and being present matter to me. So do quiet moments.",
  ],
  [
    "Active listener",
    "Listening to and sharing stories energize my soul. I mentor others weekly and learn from my own mentors and coaches.",
  ],
  [
    "Believe in Collaboration",
    "My net worth is in the people in my phonebook.",
  ],
  [
    "Guardian of my galaxy",
    "I have a son, a daughter, and an amazing family. They are my galaxy.",
  ],
  [
    "Seeking Jannah (Heaven)",
    "Faith in the Creator and the afterlife guides me. Remembering death keeps my priorities clear. “Every soul shall taste death.”",
  ],
];
document.getElementById("valueList").innerHTML = values
  .map(
    (v, i) =>
      `<div class="card val reveal"><div class="v-top"><div class="n">0${i + 1}</div>${i < values.length - 1 ? '<b class="v-next" aria-hidden="true">→</b>' : ""}</div><div><h4>${v[0]}</h4><p>${v[1]}</p></div></div>`,
  )
  .join("");
/* Values: one pixel scrolled down moves the row one pixel left */
(function () {
  const sec = document.getElementById("values"),
    tr = document.getElementById("valueList");
  let D = 0;
  /* the stage is only as tall as its content, so the gap after it matches every other section */
  const stage = sec.querySelector(".v-stage");
  function size() {
    D = Math.max(0, tr.offsetWidth - innerWidth);
    sec.style.height = stage.offsetHeight + D + "px";
  }
  function upd() {
    const run = sec.offsetHeight - stage.offsetHeight,
      p =
        run > 0
          ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / run))
          : 0;
    tr.style.transform = `translate3d(${(-p * D).toFixed(1)}px,0,0)`;
  }
  size();
  upd();
  addEventListener("scroll", upd, { passive: true });
  addEventListener("resize", () => {
    size();
    upd();
  });
  addEventListener("load", () => {
    size();
    upd();
  });
})();

/* Accent picker */
(function () {
  const box = document.getElementById("acc"),
    btn = document.getElementById("accBtn"),
    root = document.documentElement;
  const sw = [...box.querySelectorAll(".acc-menu button")];
  const cur = () =>
    getComputedStyle(root).getPropertyValue("--accent").trim().toLowerCase();
  const mark = () => {
    const c = cur();
    sw.forEach((b) => b.classList.toggle("on", b.dataset.c === c));
  };
  sw.forEach((b) => {
    b.style.setProperty("--c", b.dataset.c);
    b.addEventListener("click", () => {
      const c = b.dataset.c,
        r = parseInt(c.substr(1, 2), 16),
        g = parseInt(c.substr(3, 2), 16),
        bl = parseInt(c.substr(5, 2), 16);
      root.style.setProperty("--accent", c);
      root.style.setProperty(
        "--on-accent",
        (r * 299 + g * 587 + bl * 114) / 1000 < 150 ? "#fff" : "#000",
      );
      try {
        localStorage.setItem("accent", c);
      } catch (e) {}
      mark();
      close();
    });
  });
  const close = () => {
    box.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const o = box.classList.toggle("open");
    btn.setAttribute("aria-expanded", o);
    mark();
  });
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  mark();
})();

/* Hero halftone: columns of 1px dots fall from the top edge and thin out;
   a soft band of light rolls down through them. Rides up with the hero once its pin ends. */
(function () {
  const cv = document.getElementById("halftone"),
    ctx = cv.getContext("2d"),
    hero = document.getElementById("top");
  const GAP = 8.1,
    TOP = 0.9,
    SEED = 7,
    H0 = 260,
    PERIOD = 4200;
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function layout(width, H) {
    const rand = rng(SEED),
      rows = (H / H0) * (9 / GAP),
      dots = [],
      cols = Math.floor(width / GAP) + 1,
      depths = [3, 4, 5, 6, 7, 8, 9, 11];
    for (let c = 0; c < cols; c++) {
      const x = c * GAP + 4.5;
      let depth = depths[Math.floor(rand() * depths.length)];
      if (rand() < 0.06) depth = 14 + Math.floor(rand() * 7);
      if (x > width - 60) depth = 18 + Math.floor(rand() * 10);
      depth = Math.round(depth * rows);
      for (let r = 0; r < depth + 2; r++) {
        const y = r * GAP + 4.5;
        if (y > H - 3) break;
        const fall = r / Math.max(depth, 1);
        if (rand() > 1 - Math.pow(fall, 1.8) + 0.1) continue;
        const a = (1 - 0.6 * fall) * (0.75 + 0.25 * rand());
        if (a * 0.26 < 0.05) continue;
        dots.push({ x, y, a });
      }
    }
    return dots;
  }
  let dots = [],
    W = 0,
    H = 0,
    dpr = 1,
    color = "#000";
  function size() {
    dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth;
    H = cv.offsetHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    dots = layout(W, H);
  }
  const readColor = () => {
    color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim() || "#000";
  };
  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color;
    const front = ((t % PERIOD) / PERIOD) * (H + 160) - 80;
    for (const d of dots) {
      const crest = front + 18 * Math.sin(d.x / 170 + t / 2600);
      const k = Math.min(1, d.y / (H * 0.9)),
        g = Math.exp(-Math.pow((d.y - crest) / 58, 2));
      const a =
        TOP *
        (0.6 + 0.4 * d.a) *
        (0.42 * Math.pow(1 - k, 1.4) + 0.95 * g * Math.pow(1 - k, 0.8));
      if (a < 0.008) continue;
      ctx.globalAlpha = Math.min(1, a);
      ctx.fillRect(Math.floor(d.x), Math.floor(d.y), 1, 1);
    }
    ctx.globalAlpha = 1;
    cutFounder();
  }
  /* the founder frames carry the page colour around him, so the dots sit on top of
     the frame and are cut away only where he actually is */
  const fig = document.getElementById("figure"),
    off = document.createElement("canvas"),
    octx = off.getContext("2d", { willReadFrequently: true });
  const mk = document.createElement("canvas"),
    mctx = mk.getContext("2d");
  /* when the browser won't let us read the frame (a file opened straight from disk),
     the dots go under the founder and his frame blends its flat background away instead */
  let blend = false;
  function useBlend() {
    if (blend) return;
    blend = true;
    cv.style.zIndex = "-1";
    const set = () => {
      fig.style.mixBlendMode =
        document.documentElement.dataset.theme === "dark"
          ? "lighten"
          : "darken";
    };
    set();
    new MutationObserver(set).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  if (location.protocol === "file:") useBlend();
  function cutFounder() {
    if (blend) return;
    const src = fig.querySelector("canvas");
    if (!src) return;
    const r = src.getBoundingClientRect(),
      top = r.top + shift;
    if (r.width < 2 || top > H || r.left > W) return;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    if (!fig.classList.contains("ready")) {
      ctx.fillRect(r.left, top, r.width, r.height);
      ctx.restore();
      return;
    }
    const ow = Math.max(1, Math.round(r.width / 4)),
      oh = Math.max(1, Math.round(r.height / 4));
    if (off.width !== ow || off.height !== oh) {
      off.width = mk.width = ow;
      off.height = mk.height = oh;
    }
    try {
      octx.clearRect(0, 0, ow, oh);
      octx.drawImage(src, 0, 0, ow, oh);
      const px = octx.getImageData(0, 0, ow, oh),
        d = px.data,
        bg =
          document.documentElement.dataset.theme === "dark"
            ? [11, 15, 13]
            : [249, 250, 250];
      for (let p = 0; p < d.length; p += 4) {
        const diff =
          Math.abs(d[p] - bg[0]) +
          Math.abs(d[p + 1] - bg[1]) +
          Math.abs(d[p + 2] - bg[2]);
        d[p + 3] =
          d[p + 3] < 128 || diff < 10
            ? 0
            : diff > 40
              ? 255
              : Math.round(((diff - 10) / 30) * 255);
        d[p] = d[p + 1] = d[p + 2] = 0;
      }
      mctx.putImageData(px, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(mk, r.left, top, r.width, r.height);
    } catch (e) {
      useBlend();
    }
    ctx.restore();
  }
  /* follow the hero: still while it is pinned, then slide up with the page */
  let shift = 0;
  function place() {
    const pinEnd = hero.offsetTop + hero.offsetHeight - innerHeight;
    shift = Math.max(0, scrollY - pinEnd);
    cv.style.transform = `translate3d(0,${-shift}px,0)`;
    cv.style.visibility = shift > H ? "hidden" : "visible";
  }
  readColor();
  size();
  place();
  new MutationObserver(() => {
    readColor();
    if (still) draw(PERIOD * 0.35);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "style"],
  });
  addEventListener("resize", () => {
    size();
    place();
    if (still) draw(PERIOD * 0.35);
  });
  addEventListener("scroll", place, { passive: true });
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (still) {
    draw(PERIOD * 0.35);
    return;
  }
  const loop = (t) => {
    if (shift <= H) draw(t);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();

/* Mobile menu */
const menu = document.getElementById("menu");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu
  .querySelectorAll("a")
  .forEach((a) => (a.onclick = () => menu.classList.remove("open")));

/* Headline: letters arrive from the left, unblurring as they land */
const title = document.getElementById("title");
let k = 0;
(function split(node) {
  [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) {
          frag.append(document.createTextNode(" "));
          return;
        }
        const word = document.createElement("span");
        word.style.whiteSpace = "nowrap";
        [...w].forEach((c) => {
          const s = document.createElement("span");
          s.className = "ch";
          s.textContent = c;
          s.style.transitionDelay = 0.15 + k++ * 0.022 + "s";
          word.append(s);
        });
        frag.append(word);
      });
      n.replaceWith(frag);
    } else split(n);
  });
})(title);
requestAnimationFrame(() =>
  setTimeout(() => {
    title.classList.add("in");
    title.querySelector(".hl").classList.add("in");
  }, 120),
);

/* Reveal on scroll */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        e.target.querySelectorAll(".hl").forEach((h) => h.classList.add("in"));
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* Founder — scroll-scrubbed frames from the Magnific clip (a slow orbit
   from three-quarter to facing camera, background removed onto the page
   colour). The hero is pinned while the scroll plays the turn. */
(function () {
  const COUNT = 51,
    theme = () =>
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    path = (i, t) =>
      `images/founder-frames${t === "dark" ? "-dark" : ""}/f${String(i).padStart(3, "0")}.jpg`;
  const sec = document.getElementById("top"),
    fig = document.getElementById("figure");
  const cv = document.getElementById("bust"),
    ctx = cv.getContext("2d");
  const sets = {};
  let imgs = [],
    cur = "",
    want = 0;
  const poster = document.getElementById("bustPoster");
  function load(t) {
    if (!sets[t]) {
      const a = [];
      for (let i = 0; i < COUNT; i++) {
        const im = new Image();
        im.onload = () => {
          if (imgs === a) {
            cur = "";
            draw(true);
          }
        };
        im.src = path(i, t);
        a[i] = im;
      }
      sets[t] = a;
    }
    imgs = sets[t];
    poster.src = poster.dataset[t];
    cur = "";
    draw(true);
  }
  document.getElementById("themeBtn").addEventListener("click", () => {
    const t = theme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
    load(t);
  });
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    cv.width = fig.offsetWidth * d;
    cv.height = fig.offsetHeight * d;
    cur = "";
    draw(true);
  }
  addEventListener("resize", size);
  const ok = (i) => imgs[i] && imgs[i].complete && imgs[i].naturalWidth;
  function nearest(i) {
    for (let o = 0; o < COUNT; o++) {
      if (i - o >= 0 && ok(i - o)) return i - o;
      if (i + o < COUNT && ok(i + o)) return i + o;
    }
    return -1;
  }
  /* the clip pushes in ~5%; undo it so the founder only turns, never grows */
  const keep = (i) => 389 / (389 + 0.42 * i);
  /* the clip also squeezed the photo sideways as it turned to face front
     (3:4 video from a 776x900 photo); widen it back, none at the start, ~9% at the end */
  const wide = (i) => 1 + (0.09 * i) / (COUNT - 1);
  function paint(im, alpha, z, x) {
    const W = cv.width,
      H = cv.height,
      sc = (H / im.naturalHeight) * z,
      w = im.naturalWidth * sc * x,
      h = im.naturalHeight * sc;
    ctx.globalAlpha = alpha;
    ctx.drawImage(im, (W - w) / 2, H - h, w, h);
  }
  /* blend the two frames either side of the scroll position */
  function draw(force) {
    const a = Math.floor(want),
      t = want - a,
      b = Math.min(COUNT - 1, a + 1);
    const key = a + ":" + Math.round(t * 32);
    if (!force && key === cur) return;
    const ia = ok(a) ? a : nearest(a);
    if (ia < 0) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      fig.classList.remove("ready");
      cur = "";
      return;
    }
    cur = key;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, cv.width, cv.height);
    paint(imgs[ia], 1, keep(ia), wide(ia));
    if (t > 0.02 && ok(b) && b !== ia) paint(imgs[b], t, keep(b), wide(b));
    ctx.globalAlpha = 1;
    fig.classList.add("ready");
  }
  /* glide: once the turn is done, ease from the hero spot into the About slot */
  const spot = document.getElementById("figureSpot"),
    slot = document.getElementById("aboutSlot"),
    txt = document.getElementById("aboutText");
  /* gentle sine ease: peaks at ~1.6x the average speed (the old cubic peaked at 3x) */
  const ease = (t) => (1 - Math.cos(Math.PI * t)) / 2;
  let fw = 0,
    fh = 0;
  function travel() {
    const w = spot.offsetWidth,
      h = spot.offsetHeight;
    if (w !== fw || h !== fh) {
      fw = w;
      fh = h;
      fig.style.width = w + "px";
      fig.style.height = h + "px";
      size();
    }
    const pinEnd = sec.offsetTop + sec.offsetHeight - innerHeight,
      past = Math.max(0, scrollY - pinEnd);
    const a = spot.getBoundingClientRect(),
      ax = a.left,
      ay = a.top + past;
    const b = slot.getBoundingClientRect();
    /* finished when the slot sits in the middle of the screen */
    const D = Math.max(
      1,
      b.top + scrollY + b.height / 2 - pinEnd - innerHeight / 2,
    );
    const q = Math.min(1, past / D),
      e = ease(q);
    const x = ax + (b.left - ax) * e,
      y = ay + (b.top - ay) * e,
      sc = 1 + (b.width / w - 1) * e;
    fig.style.transform = `translate3d(${x}px,${y}px,0) scale(${sc})`;
    /* soft bottom fade, eased so it melts away without a visible band */
    const F = e * 12;
    if (F < 0.5) {
      fig.style.webkitMaskImage = fig.style.maskImage = "none";
    } else {
      const st = [];
      for (let k = 0; k <= 12; k++) {
        const u = k / 12,
          a = 1 - u * u * u * (u * (u * 6 - 15) + 10);
        st.push(`rgba(0,0,0,${a.toFixed(3)}) ${(100 - F + F * u).toFixed(2)}%`);
      }
      fig.style.webkitMaskImage =
        fig.style.maskImage = `linear-gradient(to bottom,#000 ${(100 - F).toFixed(2)}%,${st.join(",")})`;
    }
    txt.style.opacity = Math.max(0, Math.min(1, (q - 0.55) / 0.35));
  }
  load(theme());
  let smooth = 0,
    lastP = 0,
    up = false;
  function progress() {
    const r = sec.getBoundingClientRect(),
      run = sec.offsetHeight - innerHeight;
    return Math.max(0, Math.min(1, -r.top / run));
  }
  (function loop(t) {
    requestAnimationFrame(loop);
    if (window.lenis && t) lenis.raf(t);
    const p = progress();
    if (Math.abs(p - lastP) > 0.0005) up = p < lastP;
    lastP = p;
    /* scrolling back up: same turn, but it unwinds faster */
    const target = up ? p * p : p;
    smooth += (target - smooth) * (up ? 0.4 : 0.32);
    want = smooth * (COUNT - 1);
    draw(false);
    travel();
  })();
})();

/* liquid buttons: two blobs behind the label and arrow */
document.querySelectorAll(".cta").forEach((b) => {
  const g = document.createElement("span");
  g.className = "goo";
  g.setAttribute("aria-hidden", "true");
  g.innerHTML = '<i class="gp"></i><i class="gc"></i>';
  b.prepend(g);
  /* liquid only while it moves, so the two shapes sit apart cleanly at rest */
  let off;
  b.addEventListener("mouseenter", () => {
    clearTimeout(off);
    b.classList.add("goo-on");
  });
  b.addEventListener("mouseleave", () => {
    clearTimeout(off);
    off = setTimeout(() => b.classList.remove("goo-on"), 780);
  });
  const fit = () => {
    const L = b.querySelector(".label"),
      A = b.querySelector(".arrow");
    g.querySelector(".gp").style.width = L.offsetWidth + "px";
    g.querySelector(".gc").style.left = 12 + A.offsetLeft + "px";
  };
  fit();
  document.fonts && document.fonts.ready.then(fit);
  addEventListener("resize", fit);
});

/* Typed word: Builder → Founder → Dreamer, typed in and erased letter by letter */
(function () {
  const t = document.getElementById("typed"),
    words = ["Builder", "Founder", "Dreamer"];
  let w = 0,
    i = words[0].length,
    del = false;
  (function tick() {
    const word = words[w];
    if (!del && i === word.length) {
      del = true;
      return setTimeout(tick, 1800);
    }
    if (del && i === 0) {
      del = false;
      w = (w + 1) % words.length;
      return setTimeout(tick, 300);
    }
    i += del ? -1 : 1;
    t.textContent = word.slice(0, i) || "\u200b";
    setTimeout(tick, del ? 55 : 95);
  })();
})();
