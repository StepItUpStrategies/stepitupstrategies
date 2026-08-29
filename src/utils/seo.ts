/**
 * Shared SEO constants and helpers.
 *
 * Six routes need the same canonical origin, the same name/address/phone (NAP)
 * triple, and the same Open Graph image pipeline, and search engines penalise
 * inconsistency in exactly those three things — a phone number that differs
 * between the homepage and the notary page reads as two different businesses.
 * So they live here once rather than being retyped per route.
 */

export const SITE = 'https://www.stepitupstrategies.com'

export const BRAND = 'Step It Up Strategies'

/**
 * Name / address / phone, verbatim as it should appear in every schema.org node
 * and every visible listing. Keep this identical to the Google Business Profile
 * and the BBB listing — local ranking leans on the three matching exactly.
 */
export const NAP = {
  name: BRAND,
  phone: '+1-321-513-0479',
  phoneDisplay: '(321) 513-0479',
  email: 'brian@stepitupstrategies.com',
  street: '504 W Plant St',
  city: 'Winter Garden',
  region: 'FL',
  regionName: 'Florida',
  postalCode: '34787',
  country: 'US',
  /**
   * Downtown Winter Garden, the 500 block of West Plant Street. Google resolves
   * proximity from the postal address first, but an explicit GeoCoordinates node
   * is what lets "notary near me" style queries and map surfaces place the
   * business without geocoding the string themselves.
   */
  latitude: 28.5651,
  longitude: -81.5876,
} as const

export const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: NAP.street,
  addressLocality: NAP.city,
  addressRegion: NAP.region,
  postalCode: NAP.postalCode,
  addressCountry: NAP.country,
} as const

export const GEO_COORDINATES = {
  '@type': 'GeoCoordinates',
  latitude: NAP.latitude,
  longitude: NAP.longitude,
} as const

/** Google Maps deep link, used for schema `hasMap` and any visible "directions" link. */
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${NAP.name}, ${NAP.street}, ${NAP.city}, ${NAP.region} ${NAP.postalCode}`,
)}`

/**
 * Absolute, correctly-proportioned Open Graph image for a `public/` asset.
 *
 * Social scrapers and Google's rich results both want an absolute URL and a
 * predictable aspect ratio, so unlike `sizedImage()` (which only ever asks for a
 * width and lets CSS crop) this one pins 1200x630 and lets the Image CDN crop.
 */
export function ogImage(path: string): string {
  return `${SITE}/.netlify/images?url=${encodeURIComponent(path)}&w=1200&h=630&fit=cover&q=82`
}

/** Sitewide default share card. */
export const DEFAULT_OG_IMAGE = ogImage('/services/restaurant-consulting.jpg')

/**
 * The crawl directive every indexable page carries. `max-image-preview:large`
 * is what allows a full-size thumbnail in Google results and Discover; without
 * it Google defaults to a small one for many queries.
 */
export const ROBOTS_INDEX =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

/**
 * The meta tags every indexable page should have, given a title, description,
 * canonical URL and share image. Route `head()` functions spread this and then
 * append anything page-specific.
 */
export function pageMeta({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  imageAlt,
}: {
  title: string
  description: string
  url: string
  image?: string
  type?: string
  imageAlt?: string
}) {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: ROBOTS_INDEX },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: BRAND },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: imageAlt ?? title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: imageAlt ?? title },
  ]
}
