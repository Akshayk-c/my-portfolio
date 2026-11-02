// Extra animation layer
(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fine = matchMedia('(hover:hover)').matches;
  // split hero name into rising letters
  const n = $('.hero-name');
  if (n) {
    const w = [n.firstChild.textContent.trim(), $('span', n).textContent];
    n.innerHTML = w.map((t, k) => `<span class="ln">${[...t].map((c, i) => `<i style="--i:${k * 6 + i}">${c}</i>`).join('')}</span>`).join('');
  }
  // seamless marquee
  const t = $('.marquee-track'); if (t) t.innerHTML += t.innerHTML;
  // scroll progress
  const bar = $('.progress');
  addEventListener('scroll', () => { bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight)})`; }, { passive: true });
  // count-up stats
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const m = e.target.textContent.match(/^(\d+)(.*)$/); if (!m) return;
    const end = +m[1], t0 = performance.now();
    (function f(now) { const p = Math.min((now - t0) / 1400, 1); e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + m[2]; if (p < 1) requestAnimationFrame(f); })(t0);
  }), { threshold: .6 });
  $$('.stat-num').forEach(el => io.observe(el));
  if (!fine) return;
  // 3D tilt on skill chips + hero hexagon follows mouse
  $$('.skill-card').forEach(c => {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(500px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg) translateY(-4px)`; });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
  const av = $('.hero-avatar');
  addEventListener('mousemove', e => { if (scrollY > innerHeight) return; av.style.transform = `translate(${(e.clientX / innerWidth - .5) * 28}px,${(e.clientY / innerHeight - .5) * 28}px) rotate(${(e.clientX / innerWidth - .5) * 6}deg)`; });
  // magnetic buttons
  $$('.btn-primary,.btn-ghost,.social-icon').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.translate = `${(e.clientX - r.left - r.width / 2) * .25}px ${(e.clientY - r.top - r.height / 2) * .25}px`; });
    b.addEventListener('mouseleave', () => b.style.translate = '');
  });
})();
