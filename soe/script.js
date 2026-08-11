const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 3) * 55}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const navLinks = [...document.querySelectorAll('.site-nav a')];
const navTargets = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && navTargets.length) {
  const navObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.05, 0.25] });

  navTargets.forEach(section => navObserver.observe(section));

  const hero = document.querySelector('.hero');
  if (hero) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove('is-active'));
    }, { threshold: 0.2 });
    heroObserver.observe(hero);
  }
}

const demoScenarios = {
  account: {
    ticketId: 'SYN-1042',
    priority: 'Normal priority',
    customer: 'Maya Chen',
    subject: 'Locked out after changing my email',
    message: 'I changed the email on my account and can no longer sign in. Can you restore access?',
    intake: 'Classify account access; detect the identity-change dependency.',
    retrieve: 'Load account-change policy and identity-verification steps.',
    authority: 'Recommend. Identity change requires a verified human action.',
    action: 'Collect the minimum verification set, prepare the account context, and route to an authorized specialist.',
    evaluate: 'Check policy compliance, unnecessary data collection, clarity, and correct handoff state.',
    learn: 'Track repeated email-change failures as a product and self-service signal.'
  },
  warranty: {
    ticketId: 'SYN-1187',
    priority: 'High-touch workflow',
    customer: 'Jordan Blake',
    subject: 'New device will not power on',
    message: 'My new Field One will not power on after charging overnight. I have the receipt and serial number ready.',
    intake: 'Classify hardware failure; identify likely warranty path and purchase channel.',
    retrieve: 'Load verified troubleshooting, regional warranty policy, and required evidence.',
    authority: 'Human approval. AI may troubleshoot and assemble context, but cannot authorize replacement.',
    action: 'Run bounded diagnostics, validate evidence completeness, and prepare the regional service handoff.',
    evaluate: 'Check unsupported warranty promises, correct region, evidence completeness, and handoff readiness.',
    learn: 'Aggregate repeat power failures by model and route the pattern to product quality.'
  },
  frustration: {
    ticketId: 'SYN-1213',
    priority: 'Escalation required',
    customer: 'Alex Rivera',
    subject: 'Stop sending me AI responses',
    message: 'I have tried these steps twice. I do not want another automated answer. I need a person to review this.',
    intake: 'Detect explicit AI rejection, repeat-contact history, and elevated frustration.',
    retrieve: 'Load the complete chronology for the human; do not generate another troubleshooting loop.',
    authority: 'Mandatory handoff. Customer preference and repeat failure override automation.',
    action: 'Acknowledge the request, assign a human owner, and present a concise chronology with prior attempts.',
    evaluate: 'Check immediate handoff, no repeated steps, accurate chronology, and a clear ownership statement.',
    learn: 'Feed the failed path into evaluation and test whether earlier escalation should have triggered.'
  }
};

const demo = document.querySelector('[data-demo]');

if (demo) {
  const fields = {
    ticketId: document.querySelector('#demo-ticket-id'),
    priority: document.querySelector('#demo-priority'),
    customer: document.querySelector('#demo-customer'),
    subject: document.querySelector('#demo-subject'),
    message: document.querySelector('#demo-message'),
    intake: document.querySelector('#demo-intake'),
    retrieve: document.querySelector('#demo-retrieve'),
    authority: document.querySelector('#demo-authority'),
    action: document.querySelector('#demo-action'),
    evaluate: document.querySelector('#demo-evaluate'),
    learn: document.querySelector('#demo-learn')
  };

  const buttons = [...demo.querySelectorAll('[data-scenario]')];
  const panel = demo.querySelector('[role="tabpanel"]');

  const renderScenario = scenarioName => {
    const scenario = demoScenarios[scenarioName];
    if (!scenario) return;

    for (const [key, element] of Object.entries(fields)) {
      if (element) element.textContent = scenario[key];
    }

    buttons.forEach(button => {
      const selected = button.dataset.scenario === scenarioName;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && panel) panel.setAttribute('aria-labelledby', button.id);
    });
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => renderScenario(button.dataset.scenario));
    button.addEventListener('keydown', event => {
      const current = buttons.indexOf(button);
      let next = null;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === null) return;

      event.preventDefault();
      renderScenario(buttons[next].dataset.scenario);
      buttons[next].focus();
    });
  });
}
