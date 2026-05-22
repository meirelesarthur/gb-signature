import { forwardRef } from 'react'
import { Mail, Globe, Link2, AtSign } from 'lucide-react'

/**
 * Dados unificados: ambas as empresas usam os contatos da GB Agritech.
 * Somente o logo muda de acordo com a seleção.
 */
const COMPANY_CONFIG = {
  agritech: {
    logo:      '/logo-agritech.svg',
    logoAlt:   'Logo GB Agritech',
  },
  consult: {
    logo:      '/logo-consult.svg',
    logoAlt:   'Logo GB Consult',
  },
}

/* Dados de contato fixos — sempre GB Agritech */
const CONTACT = {
  website:   'www.gbagritech.com',
  linkedin:  '/gbagritech',
  instagram: '@gbagritech',
  emailHint: 'email@gbagritech.com',
}

/* Ícones Lucide configurados para a escala da assinatura */
const ICON_PROPS = {
  size:        10,
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

      {/* ── Lado esquerdo: Logo (muda por empresa) ── */}
      <div className="signature-left">
        <img src={cfg.logo} alt={cfg.logoAlt} crossOrigin="anonymous" />
      </div>

      {/* ── Lado direito: Dados (sempre Agritech) ── */}
      <div className="signature-right">

        <p className="signature-name">
          <strong>{firstName || 'Primeiro'}</strong>{' '}
          {lastName || 'Sobrenome'}
        </p>
        <p className="signature-role">{role || 'Cargo'}</p>

        <div className="signature-info">
          <div className="signature-row">
            <Mail {...ICON_PROPS} />
            <span>{email || CONTACT.emailHint}</span>
          </div>
          <div className="signature-row">
            <Globe {...ICON_PROPS} />
            <span>{CONTACT.website}</span>
          </div>
          <div className="signature-row">
            <Link2 {...ICON_PROPS} />
            <span>{CONTACT.linkedin}</span>
          </div>
          <div className="signature-row">
            <AtSign {...ICON_PROPS} />
            <span>{CONTACT.instagram}</span>
          </div>
        </div>

      </div>
    </div>
  )
})

export default SignaturePreview
