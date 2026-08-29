import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import {
  BRAND,
  DEFAULT_OG_IMAGE,
  GEO_COORDINATES,
  MAP_URL,
  NAP,
  POSTAL_ADDRESS,
  ROBOTS_INDEX,
  SITE,
} from '../utils/seo'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Sitewide fallbacks. Every route below sets its own title/description/OG
      // block, and TanStack Router resolves head meta deepest-match-first, so
      // these only ever surface on a route that forgot to.
      { title: `${BRAND} — Business Management & Consulting` },
      {
        name: 'description',
        content:
          'Step It Up Strategies delivers expert business management and consulting for restaurant, retail, and entertainment industries. Menu creation, beverage programs, food cost analysis, layout design, permitting, and financial services.',
      },
      { name: 'robots', content: ROBOTS_INDEX },
      { name: 'author', content: BRAND },
      { name: 'theme-color', content: '#1F2A8C' },
      { name: 'format-detection', content: 'telephone=yes' },
      { property: 'og:title', content: `${BRAND} — Business Management & Consulting` },
      { property: 'og:description', content: 'Expert business management and consulting for restaurant, retail, and entertainment industries. Comprehensive services from menu creation to financial planning.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE },
      { property: 'og:site_name', content: BRAND },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${BRAND} — business management and consulting` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${BRAND} — Business Management & Consulting` },
      { name: 'twitter:description', content: 'Expert business management and consulting for restaurant, retail, and entertainment industries.' },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
      // Geographic meta. Not used by Google, but Bing and a number of local
      // directory crawlers still read them, and they cost two lines.
      { name: 'geo.region', content: `US-${NAP.region}` },
      { name: 'geo.placename', content: `${NAP.city}, ${NAP.regionName}` },
      { name: 'geo.position', content: `${NAP.latitude};${NAP.longitude}` },
      { name: 'ICBM', content: `${NAP.latitude}, ${NAP.longitude}` },
    ],
    links: [
      // Fonts are self-hosted and declared with @font-face in styles.css, so there
      // is no third-party stylesheet on the critical path any more. These two files
      // cover essentially all visible text on first paint (DM Sans for body copy,
      // Bai Jamjuree 700 for headings), so they are preloaded to start downloading
      // alongside the CSS rather than after it has parsed. The remaining weights and
      // the latin-ext subset are left to load on demand via unicode-range.
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/dm-sans-latin.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/bai-jamjuree-700-latin.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'image',
        href: '/.netlify/images?url=/logo.png&w=880&h=222&fit=cover&q=80',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        // One sitewide entity graph, emitted on every route so that whichever page
        // Google lands on first can resolve the business. Both nodes carry a stable
        // `@id` so page-level nodes (the homepage WebPage, the notary listing, each
        // service) can reference this one instead of restating the company.
        //
        // The organization is typed as a ProfessionalService as well as an
        // Organization: ProfessionalService is a LocalBusiness subtype, which is what
        // makes the address, geo coordinates and service area eligible for local and
        // map results rather than being treated as decoration.
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['Organization', 'ProfessionalService'],
              '@id': `${SITE}/#organization`,
              name: BRAND,
              legalName: BRAND,
              url: `${SITE}/`,
              description:
                'Expert business management and consulting for restaurant, retail, and entertainment industries. Specializing in menu creation, beverage programs, food cost analysis, layout design, permitting, notary services, and financial services.',
              slogan: 'Business Advisors & Accounting Specialists',
              foundingDate: '2024',
              logo: {
                '@type': 'ImageObject',
                '@id': `${SITE}/#logo`,
                url: `${SITE}/logo.png`,
                contentUrl: `${SITE}/logo.png`,
                caption: BRAND,
              },
              image: { '@id': `${SITE}/#logo` },
              telephone: NAP.phone,
              email: NAP.email,
              priceRange: '$$',
              address: POSTAL_ADDRESS,
              geo: GEO_COORDINATES,
              hasMap: MAP_URL,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: NAP.phone,
                  email: NAP.email,
                  contactType: 'customer service',
                  areaServed: 'US',
                  availableLanguage: ['English'],
                },
              ],
              serviceType: [
                'Restaurant Consulting',
                'Retail Management Consulting',
                'Entertainment Business Consulting',
                'Menu Development',
                'Beverage Program Design',
                'Food Cost Analysis',
                'Business Layout Design',
                'Permitting Services',
                'Website Design',
                'Financial Consulting',
                'Accounting Services',
                'Notary Public',
              ],
              areaServed: [
                { '@type': 'City', name: `${NAP.city}, ${NAP.regionName}` },
                { '@type': 'City', name: 'Orlando, Florida' },
                { '@type': 'AdministrativeArea', name: 'Central Florida' },
                { '@type': 'State', name: NAP.regionName },
                { '@type': 'Country', name: 'United States' },
              ],
              knowsAbout: [
                'Restaurant Industry',
                'Retail Industry',
                'Entertainment Industry',
                'Business Management',
                'Financial Planning',
                'Menu Engineering',
                'Cost Control',
                'Operations Optimization',
                'Notary Public Services',
              ],
              knowsLanguage: ['en-US'],
            },
            {
              '@type': 'WebSite',
              '@id': `${SITE}/#website`,
              name: BRAND,
              url: `${SITE}/`,
              description:
                'Business management and consulting services for restaurant, retail, and entertainment industries',
              inLanguage: 'en-US',
              publisher: { '@id': `${SITE}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
})

// Better Business Bureau Accredited Business seal (Central Florida BBB).
// Rendered as a plain inline script in the document shell so it executes once
// on initial page load for every route. `var bbb` must remain a global — the
// badge script reads `window.bbb` for its config — so this cannot be moved
// into a module or bundled import.
//
// The config array is still populated synchronously (the badge script reads it the
// moment it runs), but fetching badge.min.js is held back until after the window
// load event, then to the first idle moment. It is a third-party request to another
// origin for a fixed-position badge that nothing else depends on, so letting it
// contend with our own CSS, fonts and hydration bundle only delayed first paint.
//
// Deferring it that far does need one workaround. badge.min.js does not draw the
// seal when it executes: it installs a `window.onload` handler and draws from
// there. Injecting it after the load event has already fired therefore installs a
// handler that can never run, and the seal silently never appears. So once the
// script has executed we invoke the handler it just installed ourselves, and put
// window.onload back the way we found it. If BBB ever switches the badge to an
// addEventListener('load') hook this shim stops covering for it, so the seal is
// worth a look after any badge change.
const BBB_SEAL_SCRIPT = `
	var bbb = bbb || [];
	bbb.push(["bbbid", "central-florida"]);
	bbb.push(["bid", "235981507"]);
	bbb.push(["chk", "C28801739B"]);
	bbb.push(["pos", "bottom-right"]);
	(function () {
	    var previousOnload = window.onload;
	    var injected = false;
	    function inject() {
	        if (injected) return;
	        injected = true;
	        var scheme = (("https:" == document.location.protocol) ? "https://" : "http://");
	        var el = document.createElement("script");
	        el.type = "text/javascript";
	        el.async = true;
	        el.src = scheme + "seal-centralflorida.bbb.org/badge/badge.min.js";
	        el.onload = function () {
	            var draw = window.onload;
	            if (typeof draw === "function" && draw !== previousOnload) {
	                window.onload = previousOnload;
	                try {
	                    draw();
	                } catch (e) {}
	            }
	        };
	        var s = document.getElementsByTagName("script")[0];
	        s.parentNode.insertBefore(el, s);
	    }
	    function schedule() {
	        if (typeof window.requestIdleCallback === "function") {
	            window.requestIdleCallback(inject, { timeout: 3000 });
	        } else {
	            window.setTimeout(inject, 1200);
	        }
	    }
	    if (document.readyState === "complete") {
	        schedule();
	    } else {
	        window.addEventListener("load", schedule, { once: true });
	    }
	})();
`

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <script
          type="text/javascript"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: BBB_SEAL_SCRIPT }}
        />
        <Scripts />
      </body>
    </html>
  )
}
