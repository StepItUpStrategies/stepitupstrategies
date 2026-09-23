import { createMiddleware, createStart } from '@tanstack/react-start'

/**
 * Edge caching for the server-rendered HTML.
 *
 * Every page on this site is rendered on demand by a Netlify function, and Netlify
 * does not cache function responses unless the response asks to be cached — a
 * dynamic response could change at any time, so the safe default is to re-run the
 * function for every visitor. That default was costing us the whole render on every
 * single request: the responses came back `Cache-Control: no-cache` and
 * `Cache-Status: "Netlify Durable"; fwd=bypass`, meaning nothing was ever served
 * from cache, for a set of pages whose content only changes when we deploy.
 *
 * Opting in turns the second and subsequent requests for a URL into an edge cache
 * hit, which removes the render, the function cold start and (on the insights
 * routes) a third-party API round trip from the critical path. Time to first byte
 * is what Google's crawler and Core Web Vitals both see first, so this is the
 * cheapest large win available.
 *
 * Nothing about what gets rendered changes — this only annotates the response.
 */

/**
 * Two headers, two different audiences, and the split is deliberate.
 *
 * `Netlify-CDN-Cache-Control` is read only by Netlify's CDN and never reaches the
 * browser, so it can be aggressive. `Cache-Control` is what the browser gets, and
 * `max-age=0, must-revalidate` keeps it behaving exactly as it does today: the
 * browser revalidates on every navigation, it just revalidates against a warm edge
 * cache instead of against a cold function. Nobody is left holding a stale page in
 * their own cache, which is the failure mode that makes HTML caching scary.
 *
 * `durable` puts the rendered page in Netlify's shared cache rather than only in the
 * edge node that happened to generate it, so a visitor in a region that has not seen
 * the page yet still skips the render. It is a no-op anywhere but on serverless
 * functions, which is exactly where this runs.
 *
 * A new deploy invalidates the whole cache automatically, so a long `s-maxage` never
 * means "stale until it expires" — it means "cached until the next deploy". That is
 * why 24 hours is safe for content that lives in the repo.
 */
const PAGE_CACHE = 'public, durable, s-maxage=86400, stale-while-revalidate=604800'

/**
 * The insights routes are the one exception: their articles come from the external
 * Soro feed at request time, so they can change without a deploy and a deploy-scoped
 * invalidation is not enough on its own. Five minutes is short enough that a new
 * article shows up promptly, and `stale-while-revalidate` means the refresh happens
 * in the background — a visitor never waits on the Soro round trip, and if that feed
 * is slow or down we keep serving the last good render for a day instead of showing
 * an empty archive.
 */
const FEED_CACHE = 'public, durable, s-maxage=300, stale-while-revalidate=86400'

const BROWSER_CACHE = 'public, max-age=0, must-revalidate'

/**
 * Keep campaign traffic from shredding the cache.
 *
 * Netlify folds the entire query string into the cache key for function responses
 * by default, and the live responses confirmed it (`Netlify-Vary: query`). For this
 * site that default is all cost and no benefit: not one route reads a search
 * parameter — there is no `validateSearch`, no `useSearch`, nothing — so the HTML for
 * `/notary` is byte-identical no matter what is hung off the URL. Left alone, every
 * distinct `?utm_source=…&utm_campaign=…&fbclid=…` combination arriving from an ad,
 * an email blast or a Facebook share is a brand new cache key, which means a brand
 * new render. The visitors most likely to arrive on a tracking URL are the paid ones,
 * so they would have been the ones systematically missing the cache.
 *
 * Netlify has no "ignore every parameter" directive. What it has is the rule that any
 * request whose parameters do not match a listed key is stored under one shared cache
 * object, which gets us there: we name a single parameter, nothing real ever uses it,
 * and every genuine URL — bare or tracking-laden — collapses onto the same entry.
 *
 * `_cachebust` is that parameter, chosen so the slot does something useful rather than
 * sitting there as a dummy: requesting any page with `?_cachebust=<anything-new>` is a
 * key nothing has cached yet, which forces a fresh render on demand without a deploy.
 *
 * ⚠️ This is the one line that has to change if a route ever starts reading a query
 * parameter — pagination, a filter, a search box. Add that parameter to this list in
 * the same commit, or the first value cached for the URL will be served to everyone
 * regardless of what they asked for.
 */
const CACHE_KEY_QUERY = 'query=_cachebust'

function isFeedRoute(pathname: string): boolean {
  return pathname === '/insights' || pathname.startsWith('/insights/')
}

const edgeCache = createMiddleware({ type: 'request' }).server(
  async ({ next, request, pathname, serverFnMeta }) => {
    const result = await next()

    // Server function calls share this middleware chain. They are RPC, not pages,
    // and `serverFnMeta` is only set for them, so it is the reliable way to bail
    // out rather than pattern-matching the server function base path.
    if (serverFnMeta) return result

    // A cached response can only be replayed for a request that carries no body and
    // no side effects. Form posts must always reach the origin.
    if (request.method !== 'GET' && request.method !== 'HEAD') return result

    const { response } = result

    // Only full, successful HTML documents. Redirects and error pages are left
    // uncached on purpose: a 404 or a 500 pinned at the edge for a day outlives
    // whatever caused it, and these are cheap to re-render.
    if (response.status !== 200) return result
    if (!(response.headers.get('content-type') ?? '').includes('text/html')) {
      return result
    }

    // If something upstream has already made a caching decision for this response,
    // it knows more than we do here. Leave it alone.
    if (response.headers.has('netlify-cdn-cache-control')) return result

    const headers = new Headers(response.headers)
    headers.set(
      'Netlify-CDN-Cache-Control',
      isFeedRoute(pathname) ? FEED_CACHE : PAGE_CACHE,
    )
    headers.set('Cache-Control', BROWSER_CACHE)
    headers.set('Netlify-Vary', CACHE_KEY_QUERY)

    // `response.body` is a stream and is handed straight through rather than read,
    // so the HTML still streams to the browser exactly as it did before.
    return {
      ...result,
      response: new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      }),
    }
  },
)

export const startInstance = createStart(() => ({
  requestMiddleware: [edgeCache],
}))
