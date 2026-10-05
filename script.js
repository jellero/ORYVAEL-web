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
