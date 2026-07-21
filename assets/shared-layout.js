(() => {
  'use strict';

  const path = window.location.pathname.toLowerCase();
  const isFuelPage = path === '/' || path.endsWith('/index.html') || path.endsWith('/fuel-cost-calculator.html');
  const fuelPageHref = isFuelPage ? window.location.pathname : '/';
  const sectionHref = (hash) => isFuelPage ? hash : `/${hash}`;
  const isCurrentPage = (href) => {
    const target = new URL(href, window.location.origin);
    return target.pathname.toLowerCase() === path && (!target.hash || target.hash === window.location.hash);
  };
  const currentAttribute = (href) => isCurrentPage(href) ? ' aria-current="page"' : '';

  // Add future pages here once; the shared header and footer will update everywhere.
  const calculators = [
    { href: fuelPageHref, label: 'Fuel Cost Calculator', detail: 'Gas, diesel, and EV trip costs' },
    { href: '/gas-vs-electric-calculator.html', label: 'Gas vs. Electric', detail: 'Compare two vehicles side by side' },
    { href: '/trip-expense-splitter.html', label: 'Trip Expense Splitter', detail: 'Share every expense from a trip' },
    { href: '/expense-splitter.html', label: 'Expense Splitter', detail: 'Settle unequal group expenses' }
  ];

  const guides = [
    { href: sectionHref('#how-it-works'), label: 'How it works' },
    { href: sectionHref('#fuel-economy-units'), label: 'Fuel economy units' },
    { href: sectionHref('#faq'), label: 'Frequently asked questions' }
  ];

  const other = [
    { href: sectionHref('#related-tools'), label: 'Related tools' },
    { href: sectionHref('#examples'), label: 'Examples' }
  ];

  const mark = `
    <img src="/assets/images/fuel-cost-calculator-fuel-logo.png" alt="" width="606" height="496" decoding="async">`;

  const headerRoot = document.querySelector('[data-shared-header]');
  if (headerRoot) {
    const calculatorLinks = calculators.map((item) => `
      <a href="${item.href}"${currentAttribute(item.href)}>
        ${item.label}
        <small>${item.detail}</small>
      </a>`).join('');

    headerRoot.innerHTML = `
      <header class="fuel-site-header">
        <div class="fuel-site-header-inner">
          <a class="fuel-site-brand" href="/" aria-label="Fuel Cost Calculator home">
            <span class="fuel-site-mark" aria-hidden="true">${mark}</span>
            <span class="fuel-site-title">Fuel Cost Calculator</span>
          </a>

          <nav class="fuel-site-nav" aria-label="Primary navigation">
            <details class="shared-nav-menu">
              <summary class="shared-nav-summary">
                Calculators
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>
              </summary>
              <div class="shared-nav-dropdown" aria-label="Calculators menu">
                ${calculatorLinks}
              </div>
            </details>
            <a href="${sectionHref('#how-it-works')}">Guides</a>
            <a href="${sectionHref('#related-tools')}">Other</a>
          </nav>
        </div>
      </header>`;

    const menu = headerRoot.querySelector('.shared-nav-menu');
    headerRoot.addEventListener('click', (event) => {
      if (event.target.closest('.shared-nav-dropdown a')) menu.open = false;
    });
    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
  }

  const linkList = (items) => items.map((item) => `<a href="${item.href}"${currentAttribute(item.href)}>${item.label}</a>`).join('');
  const footerRoot = document.querySelector('[data-shared-footer]');
  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="shared-footer">
        <div class="shared-footer-inner">
          <div class="shared-footer-brand">
            <a class="shared-footer-brand-link" href="/">
              <span class="shared-footer-mark" aria-hidden="true">${mark}</span>
              Fuel Cost Calculator
            </a>
            <p>Free, straightforward estimates for fuel, electricity, trip expenses, and fair passenger shares.</p>
          </div>

          <section class="shared-footer-column" aria-labelledby="shared-footer-calculators">
            <h2 id="shared-footer-calculators">Calculators</h2>
            <nav aria-label="Footer calculators">${linkList(calculators)}</nav>
          </section>

          <section class="shared-footer-column" aria-labelledby="shared-footer-guides">
            <h2 id="shared-footer-guides">Guides</h2>
            <nav aria-label="Footer guides">${linkList(guides)}</nav>
          </section>

          <section class="shared-footer-column" aria-labelledby="shared-footer-other">
            <h2 id="shared-footer-other">Other</h2>
            <nav aria-label="Footer other links">${linkList(other)}</nav>
          </section>
        </div>

        <div class="shared-footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Fuel Cost Calculator</span>
          <span>Free estimates for planning purposes.</span>
        </div>
      </footer>`;
  }
})();
