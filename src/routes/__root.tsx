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
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap',
      },
      {
        rel: 'preload',
        as: 'image',
        href: '/.netlify/images?url=/logo.png&w=440&q=80',
      },
      { rel: 'canonical', href: 'https://www.stepitupstrategies.com/' },
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

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
