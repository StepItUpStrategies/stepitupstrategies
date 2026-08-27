import { useEffect, useRef } from 'react'

const BADGE_SRC = 'https://www.notaries.com/downloads/notary-badges/notary.badge.js'

// Notaries.com "bonded" badge.
//
// The vendor script (see BADGE_SRC) looks itself up by the fixed element id
// `notary_badge_script` and then replaces itself via `outerHTML` with an
// <a><img/></a> pointing at notaries.com. Two consequences drive this component:
//
//  1. A script that rewrites its own DOM node cannot be rendered by React —
//     React would keep reconciling against a node the script deleted. So the
//     tag is appended imperatively into a host element that React renders
//     empty and never gives children to.
//  2. The id is fixed, so only ONE badge may be mounted per page. It currently
//     appears once on the homepage strip and once on /notary; those never
//     render at the same time.
//
// The badge's own link goes to notaries.com (bonding verification) and is not
// configurable — the link to our own notary page is the surrounding CTA.
export function NotaryBadge({
  width = 110,
  className,
}: {
  width?: number
  className?: string
}) {
  const hostRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || host.dataset.badgeLoaded === 'true') return
    host.dataset.badgeLoaded = 'true'

    // The vendor emits a bare same-tab anchor. Watch for it and harden it so a
    // visitor clicking the seal does not lose our page, and so the image gets
    // accurate alt text — the vendor's own `indexOf("bonded")` test is inverted
    // (indexOf returns 0, which is falsy), mislabelling the bonded badge as an
    // association-membership badge.
    const observer = new MutationObserver(() => {
      const anchor = host.querySelector('a')
      if (!anchor) return
      anchor.target = '_blank'
      anchor.rel = 'noopener noreferrer nofollow'
      anchor.title = 'Bonded notary public — verify at Notaries.com'
      const img = anchor.querySelector('img')
      if (img) {
        img.alt = 'Bonded notary public, verified by Notaries.com'
        img.loading = 'lazy'
        img.width = width
        img.height = width
      }
      observer.disconnect()
    })
    observer.observe(host, { childList: true, subtree: true })

    const script = document.createElement('script')
    script.id = 'notary_badge_script'
    script.src = BADGE_SRC
    script.async = true
    script.setAttribute('data-url', 'notaries.com')
    script.setAttribute('data-img', 'bonded-notaries.png')
    host.appendChild(script)

    return () => observer.disconnect()
  }, [width])

  return (
    <span
      ref={hostRef}
      className={['notary-badge-host', className].filter(Boolean).join(' ')}
      suppressHydrationWarning
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Reserve the badge's footprint so the injected image cannot shift
        // surrounding content once the third-party script resolves. The vendor
        // asset (bonded-notaries.png) is square, hence the 1:1 reservation.
        width: `${width}px`,
        aspectRatio: '1 / 1',
        flexShrink: 0,
        lineHeight: 0,
      }}
    />
  )
}
