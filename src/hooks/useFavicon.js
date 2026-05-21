import { useEffect } from 'react'

/**
 * useFavicon — sincroniza os favicons com a preferência de tema do SO/navegador.
 * Usa window.matchMedia('(prefers-color-scheme: dark)') — independente do
 * tema visual da página.
 *
 * Light OS → /favicons/light/
 * Dark  OS → /favicons/dark/
 */

const FAVICONS = [
  { id: 'favicon-16',    size: '16px'  },
  { id: 'favicon-32',    size: '32px'  },
  { id: 'favicon-48',    size: '48px'  },
  { id: 'favicon-apple', size: '180px' },
  { id: 'favicon-192',   size: '192px' },
]

function applyFavicons(isDark) {
  const folder = isDark ? 'dark' : 'light'
  FAVICONS.forEach(({ id, size }) => {
    const el = document.getElementById(id)
    if (el) el.href = `/favicons/${folder}/${size}.png`
  })
}

export function useFavicon() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    // Aplica imediatamente com a preferência atual
    applyFavicons(mq.matches)

    // Escuta mudanças (ex: usuário troca o tema do SO em tempo real)
    const handler = (e) => applyFavicons(e.matches)
    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)
  }, []) // roda uma única vez — o listener cuida das mudanças subsequentes
}
