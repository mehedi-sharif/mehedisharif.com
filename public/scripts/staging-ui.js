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
