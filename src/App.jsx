import { useRef, useState, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import SignatureForm    from './components/SignatureForm'
import SignaturePreview from './components/SignaturePreview'
import Toast            from './components/Toast'
import Topbar           from './components/Topbar'
import Login            from './components/Login'
import { useFavicon }   from './hooks/useFavicon'
import { useAuth }      from './hooks/useAuth'

const INITIAL = { name: '', email: '', role: '', company: 'agritech' }

const COMPANY_LABEL = {
  agritech: 'GB Agritech',
  consult:  'GB Consult',
}

/* ── Asset pre-loading (anti-tainted-canvas) ──────────────────────── */
const ASSET_PATHS = [
  '/logo-agritech.svg',
  '/logo-consult.svg',
  '/pattern.svg',
  // Ícones removidos — agora são Lucide SVGs inline, sem CORS
]

async function urlToDataURL(path) {
  const res  = await fetch(window.location.origin + path)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader   = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

let _cache = null
async function loadAssets() {
  if (_cache) return _cache
  const pairs = await Promise.all(ASSET_PATHS.map(async p => [p, await urlToDataURL(p)]))
  _cache = Object.fromEntries(pairs)
  return _cache
}

async function exportSignature(element, filename) {
  const cache = await loadAssets()
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position:fixed;top:-9999px;left:-9999px;z-index:-1;'
  document.body.appendChild(wrapper)
  try {
    const clone = element.cloneNode(true)
    clone.style.margin = '0'
    wrapper.appendChild(clone)
    clone.querySelectorAll('img').forEach(img => {
      try {
        const pathname = new URL(img.src, window.location.origin).pathname
        if (cache[pathname]) img.src = cache[pathname]
      } catch { /* ignora */ }
    })
    const rightPanel = clone.querySelector('.signature-right')
    if (rightPanel && cache['/pattern.svg']) {
      rightPanel.style.backgroundImage = `url("${cache['/pattern.svg']}")`
    }
    const dataUrl = await toPng(clone, {
      pixelRatio: 3,           // 3× → 1011 × 351 px — nítido em qualquer tela
      backgroundColor: '#ffffff',
      width: 337, height: 117,
      skipAutoScale: true, skipFonts: true,
    })
    const link    = document.createElement('a')
    link.href     = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    document.body.removeChild(wrapper)
  }
}

/* ── Theme preference ─────────────────────────────────────────────── */
function getInitialTheme() {
  try { return localStorage.getItem('gb-sig-theme') || 'light' }
  catch { return 'light' }
}

/* ═══════════════════════════════════════════════════════════════════
   App
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const { isAuthenticated, logout } = useAuth()

  const [authed, setAuthed]         = useState(() => isAuthenticated())
  const [values, setValues]         = useState(INITIAL)
  const [isExporting, setExporting] = useState(false)
  const [toasts, setToasts]         = useState([])
  const [theme, setTheme]           = useState(getInitialTheme)
  const [activeNav, setActiveNav]   = useState('signatures')

  const previewRef      = useRef(null)
  const containerRef    = useRef(null)
  const [previewScale, setPreviewScale] = useState(1)

  /* Aplica data-theme no <html> */
  useEffect(() => {
    const root = document.documentElement
    theme === 'gb'
      ? root.setAttribute('data-theme', 'gb')
      : root.removeAttribute('data-theme')
    try { localStorage.setItem('gb-sig-theme', theme) } catch { /* noop */ }
  }, [theme])

  /* Favicons via preferência do SO */
  useFavicon()

  /* Pré-aquece o cache de assets */
  useEffect(() => { loadAssets().catch(console.warn) }, [])

  /* Calcula a escala do preview: preenche o container e aplica +10.5% (1.3 × 0.85) */
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      if (w > 0) setPreviewScale((w / 337) * 1.105)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const handleToggleTheme = useCallback(() => setTheme(t => t === 'gb' ? 'light' : 'gb'), [])

  const handleLogout = useCallback(() => {
    logout()
    setAuthed(false)
  }, [logout])

  const handleChange = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return
    if (!values.name.trim() && !values.email.trim() && !values.role.trim()) {
      addToast('Preencha ao menos um campo antes de exportar.', 'error')
      return
    }
    setExporting(true)
    try {
      const slug = values.name.trim().replace(/\s+/g, '-').toLowerCase() || 'gb'
      await exportSignature(previewRef.current, `assinatura-${slug}.png`)
      addToast('Assinatura exportada com sucesso! 🎉')
    } catch (err) {
      console.error('[Export]', err)
      addToast('Erro ao gerar a imagem. Tente novamente.', 'error')
    } finally {
      setExporting(false)
    }
  }, [values, addToast])

  /* ── Tela de Login ── */
  if (!authed) {
    return (
      <>
        <Login onLogin={() => setAuthed(true)} />
        {/* Toasts também disponíveis no login */}
        <div className="toast-container" aria-live="polite">
          {toasts.map(({ id, message, type }) => (
            <Toast key={id} message={message} type={type} onClose={() => removeToast(id)} />
          ))}
        </div>
      </>
    )
  }

  const companyLabel = COMPANY_LABEL[values.company] ?? 'GB'

  /* ── App principal ── */
  return (
    <>
      {/* Topbar fixa */}
      <Topbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      {/* Conteúdo com offset do topbar */}
      <div className="app-with-topbar">
        <div className="app-wrapper">

          <header className="app-header">
            <div className="app-header-badge">
              <span />
              {companyLabel}
            </div>
            <h1 className="app-title">
              Gerador de <span>Assinatura</span>
            </h1>
            <p className="app-subtitle">
              Crie sua assinatura profissional e exporte pronta para o Outlook.
            </p>
          </header>

          <main className="app-content">
            <SignatureForm
              values={values}
              onChange={handleChange}
              onExport={handleExport}
              isExporting={isExporting}
            />

            <div className="preview-panel">
              <div className="glass-card">
                <h2 className="card-title">Preview em tempo real</h2>
                {/* containerRef mede a largura disponível para calcular o scale */}
                <div className="preview-scroll" ref={containerRef}>
                  <div
                    className="sig-scale-outer"
                    style={{ height: `${Math.round(117 * previewScale)}px` }}
                  >
                    <div
                      className="sig-scale-inner"
                      style={{ transform: `scale(${previewScale})` }}
                    >
                      <SignaturePreview
                        ref={previewRef}
                        name={values.name}
                        email={values.email}
                        role={values.role}
                        company={values.company}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="preview-hint">
                PNG exportado em <strong>1011 × 351 px</strong> (3× para nitidez máxima no Outlook).
              Insira no Outlook e redimensione para ~400 px de largura se necessário.
              </p>
            </div>
          </main>
        </div>

        <footer className="app-footer">
          {companyLabel} © {new Date().getFullYear()} · GB Tools
        </footer>
      </div>

      <div className="toast-container" aria-live="polite">
        {toasts.map(({ id, message, type }) => (
          <Toast key={id} message={message} type={type} onClose={() => removeToast(id)} />
        ))}
      </div>
    </>
  )
}
