import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Step It Up Strategies — Business Management & Consulting' },
      {
        name: 'description',
        content:
          'Step It Up Strategies delivers expert business management and consulting for restaurant, retail, and entertainment industries. Menu creation, beverage programs, food cost analysis, layout design, permitting, and financial services.',
      },
      { name: 'keywords', content: 'restaurant consulting, retail management, entertainment business consulting, menu development, beverage programs, food cost analysis, business layout design, permitting services, financial consulting' },
      { property: 'og:title', content: 'Step It Up Strategies — Business Management & Consulting' },
      { property: 'og:description', content: 'Expert business management and consulting for restaurant, retail, and entertainment industries. Comprehensive services from menu creation to financial planning.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.stepitupstrategies.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Step It Up Strategies — Business Management & Consulting' },
      { name: 'twitter:description', content: 'Expert business management and consulting for restaurant, retail, and entertainment industries.' },
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
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Step It Up Strategies",
          "url": "https://www.stepitupstrategies.com",
          "logo": "https://www.stepitupstrategies.com/logo.png",
          "description": "Expert business management and consulting for restaurant, retail, and entertainment industries. Specializing in menu creation, beverage programs, food cost analysis, layout design, permitting, and financial services.",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "",
            "contactType": "customer service",
            "email": "brian@stepitupstrategies.com",
            "availableLanguage": "English"
          },
          "sameAs": [],
          "serviceType": [
            "Restaurant Consulting",
            "Retail Management Consulting",
            "Entertainment Business Consulting",
            "Menu Development",
            "Beverage Program Design",
            "Food Cost Analysis",
            "Business Layout Design",
            "Permitting Services",
            "Financial Consulting",
            "Accounting Services"
          ],
          "areaServed": [
            {
              "@type": "Country",
              "name": "United States"
            }
          ],
          "knowsAbout": [
            "Restaurant Industry",
            "Retail Industry",
            "Entertainment Industry",
            "Business Management",
            "Financial Planning",
            "Menu Engineering",
            "Cost Control",
            "Operations Optimization"
          ]
        })
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Step It Up Strategies",
          "url": "https://www.stepitupstrategies.com",
          "description": "Business management and consulting services for restaurant, retail, and entertainment industries",
          "publisher": {
            "@type": "Organization",
            "name": "Step It Up Strategies"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.stepitupstrategies.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }
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
