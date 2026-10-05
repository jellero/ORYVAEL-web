const header = document.querySelector('[data-header]');

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const nav = document.querySelector('.nav');
const onTryPage = window.location.pathname.endsWith('/try.html') || window.location.pathname.endsWith('try.html');
const onWorkloadsPage = window.location.pathname.endsWith('/workloads.html') || window.location.pathname.endsWith('workloads.html');

if (nav && !onWorkloadsPage && !nav.querySelector('a[href="workloads.html"]')) {
  const workloadsLink = document.createElement('a');
  workloadsLink.href = 'workloads.html';
  workloadsLink.textContent = 'Workloads';
  nav.appendChild(workloadsLink);
}

if (nav && !onTryPage && !nav.querySelector('a[href="try.html"]')) {
  const tryLink = document.createElement('a');
  tryLink.href = 'try.html';
  tryLink.textContent = 'Try it';
  nav.appendChild(tryLink);
}

if (header && nav) {
  if (!nav.id) nav.id = 'primary-navigation';

  const desktopAction = [...header.children].find(
    (element) => element instanceof HTMLAnchorElement && element.classList.contains('button')
  );

  if (desktopAction && !nav.querySelector('.mobile-nav-action')) {
    const mobileAction = desktopAction.cloneNode(true);
    mobileAction.className = 'mobile-nav-action';
    nav.appendChild(mobileAction);
  }

  const menuToggle = document.createElement('button');
  menuToggle.type = 'button';
  menuToggle.className = 'mobile-menu-toggle';
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.setAttribute('aria-controls', nav.id);
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';
  header.insertBefore(menuToggle, desktopAction || null);

  const mobileMenuStyle = document.createElement('style');
  mobileMenuStyle.textContent = `
    .mobile-menu-toggle,
    .mobile-nav-action {
      display: none;
    }

    @media (max-width: 980px) {
      .site-header {
        isolation: isolate;
      }

      .site-header .mobile-menu-toggle {
        width: 42px;
        height: 42px;
        margin-left: auto;
        padding: 0;
        border: 1px solid var(--line);
        border-radius: 12px;
        display: inline-flex;
        flex: 0 0 auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: rgba(255,255,255,.025);
        color: var(--text);
        cursor: pointer;
      }

      .site-header .mobile-menu-toggle span {
        width: 17px;
        height: 1.5px;
        display: block;
        border-radius: 999px;
        background: currentColor;
        transform-origin: center;
        transition: transform .2s ease, opacity .2s ease;
      }

      .site-header.menu-open .mobile-menu-toggle span:nth-child(1) {
        transform: translateY(6.5px) rotate(45deg);
      }

      .site-header.menu-open .mobile-menu-toggle span:nth-child(2) {
        opacity: 0;
      }

      .site-header.menu-open .mobile-menu-toggle span:nth-child(3) {
        transform: translateY(-6.5px) rotate(-45deg);
      }

      .site-header .nav {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        right: 0;
        max-height: calc(100vh - 96px);
        margin: 0;
        padding: 10px;
        border: 1px solid var(--line);
        border-radius: 16px;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 2px;
        overflow-y: auto;
        background: rgba(7,9,13,.96);
        box-shadow: 0 26px 70px rgba(0,0,0,.42);
        backdrop-filter: blur(22px);
      }

      .site-header.menu-open .nav {
        display: flex;
      }

      .site-header .nav a {
        width: 100%;
        padding: 13px 14px;
        border-radius: 10px;
        display: block;
        color: #c6ced8;
        font-size: 14px;
      }

      .site-header .nav a:hover,
      .site-header .nav a:focus-visible {
        color: var(--text);
        background: rgba(255,255,255,.055);
        outline: none;
      }

      .site-header .nav .mobile-nav-action {
        margin-top: 8px;
        border: 1px solid var(--line);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--accent);
        background: rgba(124,246,212,.035);
      }

      html.mobile-menu-open,
      html.mobile-menu-open body {
        overflow: hidden;
      }
    }
  `;
  document.head.appendChild(mobileMenuStyle);

  const setMenuOpen = (open) => {
    header.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('mobile-menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(!header.classList.contains('menu-open'));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('menu-open')) return;
    if (!header.contains(event.target)) setMenuOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenuOpen(false);
  });
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

const fallbackCopy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
};

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.closest('.command-card')?.querySelector('code');
    if (!code) return;

    const text = code.innerText;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      } else {
        copied = fallbackCopy(text);
      }
    } catch (_error) {
      copied = fallbackCopy(text);
    }

    if (!copied) return;
    const previous = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('copied');
    window.setTimeout(() => {
      button.textContent = previous;
      button.classList.remove('copied');
    }, 1400);
  });
});
