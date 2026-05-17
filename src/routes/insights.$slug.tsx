import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback, useRef } from 'react'
import { getArticleBySlug } from '../server/articles'

export const Route = createFileRoute('/insights/$slug')({
  component: InsightPost,
  loader: async ({ params }) => {
    return getArticleBySlug({ data: params.slug })
  },
})

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

type TtsState = 'idle' | 'playing' | 'paused'

function getFemaleVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  const femalePatterns = [
    /samantha/i, /victoria/i, /karen/i, /zira/i, /susan/i,
    /female/i, /woman/i, /fiona/i, /moira/i, /tessa/i, /ellen/i,
  ]
  const englishVoices = voices.filter((v) => v.lang.startsWith('en'))
  for (const pattern of femalePatterns) {
    const match = englishVoices.find((v) => pattern.test(v.name))
    if (match) return match
  }
  return undefined
}

function useTextToSpeech(text: string) {
  const [state, setState] = useState<TtsState>('idle')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | undefined>()

  useEffect(() => {
    const pickVoice = () => setFemaleVoice(getFemaleVoice())
    pickVoice()
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice)
      window.speechSynthesis.cancel()
    }
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    utteranceRef.current = null
    setState('idle')
  }, [])

  const play = useCallback(() => {
    if (state === 'paused') {
      window.speechSynthesis.resume()
      setState('playing')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.99
    utterance.pitch = 1
    if (femaleVoice) {
      utterance.voice = femaleVoice
    }
    utterance.onend = () => {
      utteranceRef.current = null
      setState('idle')
    }
    utterance.onerror = () => {
      utteranceRef.current = null
      setState('idle')
    }
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setState('playing')
  }, [text, state, femaleVoice])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
    setState('paused')
  }, [])

  return { state, play, pause, stop }
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6h12v12H6z" />
    </svg>
  )
}

function ListenButton({ content }: { content: string }) {
  const plainText = stripHtml(content)
  const { state, play, pause, stop } = useTextToSpeech(plainText)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false)
    }
  }, [])

  if (!supported) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 0',
      }}
    >
      {state === 'playing' ? (
        <>
          <button
            onClick={pause}
            aria-label="Pause reading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'var(--color-blue)',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-blue-soft)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-blue)')}
          >
            <PauseIcon />
            Pause
          </button>
          <button
            onClick={stop}
            aria-label="Stop reading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: 'transparent',
              color: 'var(--color-blue)',
              border: '2px solid var(--color-blue)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-blue)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-blue)'
            }}
          >
            <StopIcon />
            Stop
          </button>
          <span
            style={{
              marginLeft: '4px',
              fontSize: '13px',
              color: 'var(--color-muted)',
              fontStyle: 'italic',
            }}
          >
            Reading article aloud…
          </span>
        </>
      ) : state === 'paused' ? (
        <>
          <button
            onClick={play}
            aria-label="Resume reading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'var(--color-orange)',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-orange-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-orange)')}
          >
            <PlayIcon />
            Resume
          </button>
          <button
            onClick={stop}
            aria-label="Stop reading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: 'transparent',
              color: 'var(--color-blue)',
              border: '2px solid var(--color-blue)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-blue)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-blue)'
            }}
          >
            <StopIcon />
            Stop
          </button>
          <span
            style={{
              marginLeft: '4px',
              fontSize: '13px',
              color: 'var(--color-muted)',
              fontStyle: 'italic',
            }}
          >
            Paused
          </span>
        </>
      ) : (
        <button
          onClick={play}
          aria-label="Listen to this article"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'var(--color-orange)',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-orange-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-orange)')}
        >
          <PlayIcon />
          Listen to Article
        </button>
      )}
    </div>
  )
}

export default function InsightPost() {
  const post = Route.useLoaderData()

  return (
    <div className="min-h-screen text-blue-950 px-6 py-16" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm text-blue-950 font-semibold hover:text-orange-500"
        >
          ← Back to Insights
        </Link>

        <div className="rounded-[2rem] bg-white shadow-xl border border-blue-100 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              height: '360px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div className="p-10">
            <h1 className="text-4xl font-serif text-blue-950 mb-4">{post.title}</h1>
            <p className="text-lg text-blue-800 mb-6 italic">{post.summary}</p>
            <ListenButton content={post.content} />
            <div style={{ marginTop: '24px' }}>
              <div
                className="article-content space-y-6 text-blue-800 leading-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
