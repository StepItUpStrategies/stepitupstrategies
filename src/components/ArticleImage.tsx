import { useEffect, useRef, useState } from 'react'
import { sizedImage } from '../utils/images'

/**
 * Article artwork, served through the Netlify Image CDN with a fallback to the
 * original file.
 *
 * Why the fallback exists: article images live on a third-party origin (the Soro
 * feed's Supabase storage), so every Image CDN transform that is not already
 * cached has to fetch the full-resolution original before it can resize it. The
 * insights archive renders dozens of cards, and when a batch of those cold
 * transforms is requested at once some of them lose the race — the CDN answers
 * 504 after its own 30s timeout, or 5xx, and the browser is left with a broken
 * image. Which cards it hits is luck of the draw, so the same page can come up
 * with a blank picture in a different place on each device.
 *
 * A failed transform is not a missing picture: the original is still there and
 * serves fine on its own. So on error we point the same <img> at the untransformed
 * URL. That costs more bytes for that one image, which is the right trade against
 * showing an empty card — and the transform is still used for every image that
 * loads normally, so the page keeps the bandwidth win in the common case.
 */
type ArticleImageProps = {
  /** Original article image URL, untransformed. */
  src: string
  alt: string
  /** Width to request from the Image CDN, sized for the slot this renders into. */
  width: number
  quality?: number
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
  className?: string
  style?: React.CSSProperties
}

export function ArticleImage({
  src,
  alt,
  width,
  quality,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  className,
  style,
}: ArticleImageProps) {
  const transformed = sizedImage(src, width, quality)
  // Nothing to fall back to when the URL was passed through untransformed (a
  // host the Image CDN is not allowed to fetch from) — then both URLs are equal.
  const canFallBack = transformed !== src
  const [useOriginal, setUseOriginal] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // React attaches onError during hydration, so a transform that already failed
  // while the page was still loading fires its error event into the void and the
  // card stays blank. An <img> that has finished with no intrinsic width is a
  // failed one, so check for that state once on mount and fall back from here.
  useEffect(() => {
    if (!canFallBack || useOriginal) return
    const el = imgRef.current
    if (el && el.complete && el.naturalWidth === 0) setUseOriginal(true)
  }, [canFallBack, useOriginal])

  return (
    <img
      ref={imgRef}
      src={useOriginal ? src : transformed}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={className}
      style={style}
      onError={() => {
        if (canFallBack && !useOriginal) setUseOriginal(true)
      }}
    />
  )
}
