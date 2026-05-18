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

function splitIntoChunks(text: string, maxLen = 150): string[] {
  const raw = text.match(/[^.!?]+[.!?]+[\s]*/g)
  const sentences = raw ? [...raw] : []
  const matched = sentences.join('')
  if (matched.length < text.length) {
    const remainder = text.slice(matched.length).trim()
    if (remainder) sentences.push(remainder)
  }
  const chunks: string[] = []
  let current = ''
  for (const s of sentences) {
    if (current.length + s.length > maxLen && current) {
      chunks.push(current.trim())
      current = s
    } else {
      current += s
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks.length > 0 ? chunks : [text]
}

function useTextToSpeech(text: string) {
  const [state, setState] = useState<TtsState>('idle')
  const chunksRef = useRef<string[]>([])
  const chunkIndexRef = useRef(0)
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cancelledRef = useRef(false)
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | undefined>()

  useEffect(() => {
    const pickVoice = () => setFemaleVoice(getFemaleVoice())
    pickVoice()
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice)
      window.speechSynthesis.cancel()
      if (keepAliveRef.current) clearInterval(keepAliveRef.current)
    }
  }, [])

  const clearKeepAlive = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current)
      keepAliveRef.current = null
    }
  }, [])

  const startKeepAlive = useCallback(() => {
    clearKeepAlive()
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause()
        window.speechSynthesis.resume()
      }
    }, 10000)
  }, [clearKeepAlive])

  const speakFrom = useCallback(
    (index: number) => {
      if (index >= chunksRef.current.length) {
        clearKeepAlive()
        setState('idle')
        return
      }
      const utterance = new SpeechSynthesisUtterance(chunksRef.current[index])
      utterance.rate = 0.96
      utterance.pitch = 1
      if (femaleVoice) utterance.voice = femaleVoice
      utterance.onend = () => {
        if (cancelledRef.current) return
        chunkIndexRef.current = index + 1
        speakFrom(index + 1)
      }
      utterance.onerror = () => {
        if (cancelledRef.current) return
        clearKeepAlive()
        setState('idle')
      }
      window.speechSynthesis.speak(utterance)
    },
    [femaleVoice, clearKeepAlive],
  )

  const stop = useCallback(() => {
    cancelledRef.current = true
    window.speechSynthesis.cancel()
    chunksRef.current = []
    chunkIndexRef.current = 0
    clearKeepAlive()
    setState('idle')
    setTimeout(() => {
      cancelledRef.current = false
    }, 0)
  }, [clearKeepAlive])

  const play = useCallback(() => {
    cancelledRef.current = false
    if (state === 'paused') {
      startKeepAlive()
      speakFrom(chunkIndexRef.current)
      setState('playing')
      return
    }
    window.speechSynthesis.cancel()
    chunksRef.current = splitIntoChunks(text)
    chunkIndexRef.current = 0
    startKeepAlive()
    speakFrom(0)
    setState('playing')
  }, [text, state, speakFrom, startKeepAlive])

  const pause = useCallback(() => {
    cancelledRef.current = true
    window.speechSynthesis.cancel()
    clearKeepAlive()
    setState('paused')
    setTimeout(() => {
      cancelledRef.current = false
    }, 0)
  }, [clearKeepAlive])

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
