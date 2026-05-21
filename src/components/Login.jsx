import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login({ onLogin }) {
  const { login } = useAuth()
  const [password, setPassword]   = useState('')
  const [showPwd, setShowPwd]     = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [shake, setShake]         = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Pequeno delay para dar sensação de verificação
    await new Promise(r => setTimeout(r, 420))

    const ok = login(password)
    setLoading(false)

    if (ok) {
      onLogin()
    } else {
      setError('Senha incorreta. Tente novamente.')
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setPassword('')
    }
  }

  return (
    <div className="login-page">
      {/* Card central */}
      <div className={`login-card ${shake ? 'shake' : ''}`}>

        {/* Logo */}
        <img
          src="/logo-horizontal.svg"
          alt="GB Agritech"
          className="login-logo-img"
        />

        {/* Heading */}
        <div className="login-heading">
          <h1 className="login-title">Acesso ao Sistema</h1>
          <p className="login-sub">GB Signature Generator</p>
        </div>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Senha de acesso
            </label>

            <div className="login-input-wrap">
              <input
                id="login-password"
                className={`form-input ${error ? 'input-error' : ''}`}
                type={showPwd ? 'text' : 'password'}
                placeholder="Digite a senha"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                autoComplete="current-password"
                autoFocus
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPwd ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <p className="login-error" role="alert">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            className="btn-export login-btn"
            type="submit"
            disabled={loading || !password}
          >
            {loading ? (
              <><span className="spinner" /> Verificando...</>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" x2="3" y1="12" y2="12"/>
                </svg>
                Entrar
              </>
            )}
          </button>
        </form>

        <p className="login-footer">
          GB Agritech · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
