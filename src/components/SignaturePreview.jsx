import { forwardRef } from 'react'
import { Mail, Globe, Link2, AtSign } from 'lucide-react'

/**
 * Config por empresa.
 * Logos em /public → sem CORS taint no export.
 * Ícones via Lucide React → inline SVG, nítidos no PNG exportado.
 */
const COMPANY_CONFIG = {
  agritech: {
    logo:      '/logo-agritech.svg',
    logoAlt:   'Logo GB Agritech',
    website:   'www.gbagritech.com',
    linkedin:  '/gbagritech',
    instagram: '@gbagritech',
    emailHint: 'email@gbagritech.com',
  },
  consult: {
    logo:      '/logo-consult.svg',
    logoAlt:   'Logo GB Consult',
    website:   'www.gbconsult.com.br',
    linkedin:  '/gbconsult',
    instagram: '@gbconsult',
    emailHint: 'email@gbconsult.com.br',
  },
}

/* Ícones Lucide configurados para a escala da assinatura */
const ICON_PROPS = {
  size:        11,
  strokeWidth: 1.6,
  color:       '#666',
}

const SignaturePreview = forwardRef(function SignaturePreview(
  { name, email, role, company = 'agritech' },
  ref
) {
  const cfg       = COMPANY_CONFIG[company] ?? COMPANY_CONFIG.agritech
  const firstName = name.trim().split(' ')[0] || ''
  const lastName  = name.trim().split(' ').slice(1).join(' ') || ''

  return (
    <div className="signature-card" ref={ref}>

      {/* ── Lado esquerdo: Logo ── */}
      <div className="signature-left">
        <img src={cfg.logo} alt={cfg.logoAlt} crossOrigin="anonymous" />
      </div>

      {/* ── Lado direito: Dados ── */}
      <div className="signature-right">

        <p className="signature-name">
          <strong>{firstName || 'Primeiro'}</strong>{' '}
          {lastName || 'Sobrenome'}
        </p>
        <p className="signature-role">{role || 'Cargo'}</p>

        <div className="signature-info">
          <div className="signature-row">
            <Mail {...ICON_PROPS} />
            <span>{email || cfg.emailHint}</span>
          </div>
          <div className="signature-row">
            <Globe {...ICON_PROPS} />
            <span>{cfg.website}</span>
          </div>
          <div className="signature-row">
            <Link2 {...ICON_PROPS} />
            <span>{cfg.linkedin}</span>
          </div>
          <div className="signature-row">
            <AtSign {...ICON_PROPS} />
            <span>{cfg.instagram}</span>
          </div>
        </div>

      </div>
    </div>
  )
})

export default SignaturePreview
