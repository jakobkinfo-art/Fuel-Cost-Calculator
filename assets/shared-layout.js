(() => {
  'use strict';

  const path = window.location.pathname.toLowerCase();
  const isCurrentPage = (href) => {
    const target = new URL(href, window.location.origin);
    return target.pathname.toLowerCase() === path && (!target.hash || target.hash === window.location.hash);
  };
  const currentAttribute = (href) => isCurrentPage(href) ? ' aria-current="page"' : '';

  // Add future pages here once; the shared footer will update everywhere.
  const companyLinks = [
    { href: '/about.html', label: 'About' },
    { href: '/faq.html', label: 'FAQ' },
    { href: '/contact.html', label: 'Contact' }
  ];

  const legalLinks = [
    { href: '/privacy-policy.html', label: 'Privacy Policy' },
    { href: '/terms-of-service.html', label: 'Terms of Service' }
  ];

  const mark = `
    <img src="/assets/images/fuel-cost-calculator-fuel-logo.png" alt="" width="606" height="496" decoding="async">`;

  const headerRoot = document.querySelector('[data-shared-header]');
  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="fuel-site-header">
        <div class="fuel-site-header-inner">
          <a class="fuel-site-brand" href="/" aria-label="Fuel Cost Calculator home">
            <span class="fuel-site-mark" aria-hidden="true">${mark}</span>
            <span class="fuel-site-title">Fuel Cost Calculator</span>
          </a>

          <nav class="fuel-site-nav" aria-label="Primary navigation">
            <a href="/"${currentAttribute('/')}>Calculators</a>
          </nav>
        </div>
      </header>`;
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

          <section class="shared-footer-column" aria-labelledby="shared-footer-company">
            <h2 id="shared-footer-company">Company</h2>
            <nav aria-label="Company pages">${linkList(companyLinks)}</nav>
          </section>

          <section class="shared-footer-column" aria-labelledby="shared-footer-legal">
            <h2 id="shared-footer-legal">Legal</h2>
            <nav aria-label="Legal pages">${linkList(legalLinks)}</nav>
          </section>
        </div>

        <div class="shared-footer-bottom">
          <span>&copy; ${new Date().getFullYear()} Fuel Cost Calculator</span>
          <span>Free estimates for planning purposes.</span>
        </div>
      </footer>`;
  }
})();
