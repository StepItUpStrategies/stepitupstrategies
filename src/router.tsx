import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/NotFound'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Fetch a route's JS chunk and loader data as soon as the visitor shows intent
    // (hover or touch-start on a <Link>), so the click itself has nothing left to
    // wait for. Nothing renders early — this only warms the cache — so behaviour
    // and appearance are unchanged. The delay keeps stray pointer movement across
    // the nav from firing requests for links nobody meant to open.
    defaultPreload: 'intent',
    defaultPreloadDelay: 80,
    // Any URL that matches no route (and any route that calls notFound()) renders
    // the branded 404 instead of the router's bare built-in fallback.
    defaultNotFoundComponent: NotFound,
  })

  return router
}
