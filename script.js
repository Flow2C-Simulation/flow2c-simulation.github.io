// Decorative hero animation: particles drifting through a smooth, made-up
// swirling field. Purely visual; it is not F2C output.
(function () {
  const canvas = document.getElementById("flow");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, particles;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(900, (w * h) / 1600));
    particles = Array.from({ length: count }, spawn);
    ctx.fillStyle = "#07111f";
    ctx.fillRect(0, 0, w, h);
  }

  function spawn() {
    return { x: Math.random() * w, y: Math.random() * h, age: Math.random() * 200 };
  }

  function velocity(x, y, t) {
    const s = 0.0035;
    const u = 1.4 + Math.sin(y * s * 1.3 + t) * 0.9 + Math.cos((x + y) * s * 0.7 - t * 0.6) * 0.6;
    const v = Math.cos(x * s * 1.1 - t * 0.8) * 0.9 + Math.sin((x - y) * s * 0.9 + t * 0.5) * 0.5;
    return [u, v];
  }

  let t = 0;
  function frame() {
    ctx.fillStyle = "rgba(7, 17, 31, 0.08)";
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1.4;
    for (const p of particles) {
      const [u, v] = velocity(p.x, p.y, t);
      const nx = p.x + u, ny = p.y + v;
      const speed = Math.hypot(u, v);
      const hue = 190 - Math.min(speed, 2.6) * 30; // cyan to warm
      ctx.strokeStyle = `hsla(${hue}, 85%, 62%, 0.75)`;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      p.x = nx; p.y = ny; p.age++;
      if (p.x > w || p.y < 0 || p.y > h || p.age > 260) {
        Object.assign(p, spawn(), { x: Math.random() < 0.6 ? 0 : Math.random() * w, age: 0 });
      }
    }
    t += 0.004;
    if (!reduce) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  if (reduce) { for (let i = 0; i < 120; i++) frame(); } else requestAnimationFrame(frame);
})();

// Fade sections in as they scroll into view.
(function () {
  const items = document.querySelectorAll(".section h2, .card, .timeline li, .split > *");
  if (!("IntersectionObserver" in window)) return;
  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();

// Citation format tabs and copy button.
(function () {
  const tabs = document.querySelectorAll(".cite-tabs [data-fmt]");
  const blocks = document.querySelectorAll(".cite-text");
  const copy = document.querySelector(".cite-copy");
  if (!copy) return;
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
    blocks.forEach((b) => { b.hidden = b.dataset.fmt !== tab.dataset.fmt; });
  }));
  copy.addEventListener("click", async () => {
    const text = document.querySelector(".cite-text:not([hidden])").textContent;
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = "Copied";
    } catch {
      copy.textContent = "Select and copy";
    }
    setTimeout(() => { copy.textContent = "Copy"; }, 1600);
  });
})();

document.getElementById("year").textContent = new Date().getFullYear();
