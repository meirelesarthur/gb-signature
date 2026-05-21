import ThemeToggle from './ThemeToggle'

/**
 * Topbar — barra de navegação principal.
 * Logo troca conforme o tema: logo-horizontal (light) / logo-horizontal-white (GB mode).
 */

const DEFAULT_NAV = [
  {
    id: 'signatures',
    label: 'Assinaturas',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    ),
  },
]

export default function Topbar({
  theme,
  onToggleTheme,
  onLogout,
  activeNav   = 'signatures',
  onNavChange,
  navItems    = DEFAULT_NAV,
}) {
  const logoSrc = theme === 'gb'
    ? '/logo-horizontal-white.svg'
    : '/logo-horizontal.svg'

  return (
    <header className="topbar">

      {/* Esquerda — logo horizontal por tema */}
      <div className="topbar-brand">
        <img
          src={logoSrc}
          alt="GB"
          className="topbar-logo-horizontal"
        />
      </div>

      {/* Centro — navegação */}
      <nav className="topbar-nav" aria-label="Navegação principal">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`topbar-nav-btn ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => onNavChange?.(item.id)}
            aria-current={activeNav === item.id ? 'page' : undefined}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Direita — theme toggle + logout */}
      <div className="topbar-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <div className="topbar-divider" />

        <button className="topbar-logout" onClick={onLogout} title="Sair">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
          </svg>
          Sair
        </button>
      </div>

    </header>
  )
}
