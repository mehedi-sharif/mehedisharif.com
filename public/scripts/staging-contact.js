/* smooth scroll */
try {
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    })(performance.now());
  }
} catch (e) {}
/* theme switch */
document.getElementById("themeBtn").addEventListener("click", () => {
  const t =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch (e) {}
});

/* Reveal on load / scroll */
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
