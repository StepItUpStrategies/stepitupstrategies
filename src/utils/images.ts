/**
 * Wraps an image URL in a Netlify Image CDN transform sized for the slot it is
 * rendered into.
 *
 * Article artwork is the reason this exists. It arrives at full resolution —
 * locally as 1536x1024 WebP, and from the external Soro feed at similar sizes —
 * but is only ever displayed in cards a few hundred pixels wide. Asking the Image
 * CDN for an appropriate width means the browser downloads a fraction of the bytes,
 * and remote artwork is additionally cached on our own CDN instead of being fetched
 * from a third-party origin on every cold view.
 *
 * Only a width is requested — never a height or a crop. The surrounding CSS still
 * does the cropping with `object-fit: cover`, so the visible framing is exactly what
 * it was before; the browser just downloads a smaller source to do it with.
 */

/**
 * Hosts the Image CDN is allowed to fetch from. Must stay in sync with
 * `[images] remote_images` in netlify.toml — the CDN rejects any remote URL that is
 * not allowlisted there, so transforming a URL this does not match would break the
 * image rather than shrink it. Anything unrecognised is passed through untouched.
 */
const ALLOWED_REMOTE = /^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\//i

export function sizedImage(src: string, width: number, quality = 80): string {
  if (!src) return src
  // Already a transform — do not nest one inside another.
  if (src.startsWith('/.netlify/')) return src

  const transformable = src.startsWith('/') || ALLOWED_REMOTE.test(src)
  if (!transformable) return src

  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
