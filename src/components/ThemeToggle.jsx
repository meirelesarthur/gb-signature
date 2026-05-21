/**
 * ThemeToggle — alterna entre Light e GB Mode (CERNE).
 * Persiste a preferência no localStorage e aplica data-theme no <html>.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isGb = theme === 'gb'

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isGb ? 'Mudar para tema claro' : 'Mudar para GB Mode'}
      title={isGb ? 'Mudar para tema claro' : 'Mudar para GB Mode'}
    >
      {/* Ícone */}
      {isGb ? (
        /* Sol */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        /* Lua */
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}

      {/* Texto */}
      {isGb ? 'Light' : 'GB Mode'}

      {/* Track/thumb switch */}
      <span className={`theme-toggle-track ${isGb ? 'on' : ''}`} aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  )
}
