const header = document.querySelector('[data-header]');

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const roadmap = document.querySelector('#roadmap');
const security = document.querySelector('#security');
const nav = document.querySelector('.nav');

if (roadmap && security) {
  const phaseTwo = document.createElement('section');
  phaseTwo.className = 'section section-dark';
  phaseTwo.id = 'phase-2';
  phaseTwo.innerHTML = `
    <div class="section-shell">
      <div class="section-heading reveal">
        <p class="kicker">Native Phase 2</p>
        <h2>Identity, isolation<br />& native intelligence.</h2>
        <p>Before native AI receives meaningful system access, ORYVAEL builds the authority substrate that will constrain it: real process isolation, kernel objects, capabilities, principals, sandboxing, generated keys, authenticated sessions and attributed audit.</p>
      </div>

      <div class="runtime-grid">
        <article class="runtime-card reveal"><span>01</span><h3>Process + object substrate</h3><p>Multi-process scheduling, per-process address spaces, recoverable faults and non-forgeable kernel-managed handles.</p></article>
        <article class="runtime-card reveal"><span>02</span><h3>Principals + capabilities</h3><p>Humans, services, apps and AI become explicit principals governed by narrow object-specific rights rather than ambient root authority.</p></article>
        <article class="runtime-card reveal"><span>03</span><h3>Secrets + sessions</h3><p>Entropy, CSPRNG, generated identities, secret-signing capabilities and authenticated sessions replace source-embedded private keys.</p></article>
        <article class="runtime-card reveal"><span>04</span><h3>Governed native AI</h3><p>Ring-3 AI workers inspect, develop and analyze through capability-enforced APIs, requesting temporary authority when action is required.</p></article>
        <article class="runtime-card reveal"><span>05</span><h3>Sandbox-native workloads</h3><p>Isolation is a property of process, object visibility, capability tables and resource budgets — not an optional container wrapped around the workload.</p></article>
        <article class="runtime-card reveal"><span>06</span><h3>Evidence as exit criteria</h3><p>The phase completes only when an AI can detect a condition, request authority, receive a scoped grant, act and leave auditable evidence without self-grant.</p></article>
      </div>

      <div class="hero-actions reveal">
        <a class="button button-primary" href="phase-2.html">Explore Native Phase 2 <span aria-hidden="true">→</span></a>
        <a class="button button-secondary" href="https://github.com/jellero/ORYVAEL/blob/main/docs/architecture/native-phase-2.md" target="_blank" rel="noreferrer">Technical specification <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  `;
  roadmap.before(phaseTwo);

  if (nav) {
    const roadmapLink = [...nav.querySelectorAll('a')].find((link) => link.getAttribute('href') === '#roadmap');
    const phaseLink = document.createElement('a');
    phaseLink.href = 'phase-2.html';
    phaseLink.textContent = 'Phase 2';
    if (roadmapLink) nav.insertBefore(phaseLink, roadmapLink);
    else nav.appendChild(phaseLink);
  }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = [...document.querySelectorAll('.reveal')];

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
}
