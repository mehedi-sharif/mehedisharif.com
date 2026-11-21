/* Accent picker */
(function () {
  const box = document.getElementById("acc"),
    btn = document.getElementById("accBtn"),
    root = document.documentElement;
  const sw = [...box.querySelectorAll(".acc-menu button")];
  const on = (c) => {
    const r = parseInt(c.substr(1, 2), 16),
      g = parseInt(c.substr(3, 2), 16),
      bl = parseInt(c.substr(5, 2), 16);
    return (r * 299 + g * 587 + bl * 114) / 1000 < 150 ? "#fff" : "#000";
  };
  const get = (v) =>
    getComputedStyle(root).getPropertyValue(v).trim().toLowerCase();
  const mark = () => {
    const c = get("--accent") || "#00ff99",
      c2 = get("--accent-2") || c;
    sw.forEach((b) =>
      b.classList.toggle(
        "on",
        b.dataset.c === c && (b.dataset.c2 || b.dataset.c) === c2,
      ),
    );
  };
  sw.forEach((b) => {
    b.style.setProperty("--c", b.dataset.c);
    if (b.dataset.c2) b.style.setProperty("--c2", b.dataset.c2);
    b.addEventListener("click", () => {
      const c = b.dataset.c,
        c2 = b.dataset.c2 || c;
      root.style.setProperty("--accent", c);
      root.style.setProperty("--on-accent", on(c));
      /* on a pair, the arrow is drawn in the pill colour (teal arrow on mint, like the brand stickers) */
      root.style.setProperty("--accent-2", c2);
      root.style.setProperty("--on-accent-2", c2 === c ? on(c) : c);
      try {
        localStorage.setItem("accent", c);
        localStorage.setItem("accent2", c2);
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

/* Mobile menu */
const mobileMenu = document.getElementById("menu");
const menuToggle = document.getElementById("burger");
function setMenu(open) {
  mobileMenu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () =>
  setMenu(!mobileMenu.classList.contains("open")),
);
mobileMenu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));

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
  const size = new ResizeObserver(fit);
  size.observe(b.querySelector(".label"));
  size.observe(b.querySelector(".arrow"));
  fit();
});
