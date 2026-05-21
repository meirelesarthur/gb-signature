/**
 * SignatureForm — Formulário controlado.
 * Campos: empresa (toggle), nome, email, cargo.
 */

const FIELDS = [
  {
    id: 'name',
    label: 'Nome completo',
    placeholder: 'Ex: João Silva',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Ex: joao@gbagritech.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    id: 'role',
    label: 'Cargo',
    placeholder: 'Ex: Analista de Marketing',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
]

const COMPANIES = [
  { value: 'agritech', label: 'GB Agritech' },
  { value: 'consult',  label: 'GB Consult'  },
]

export default function SignatureForm({ values, onChange, onExport, isExporting }) {
  return (
    <div className="glass-card">
      <h2 className="card-title">Dados da Assinatura</h2>

      {/* Seletor de empresa */}
      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label className="form-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Empresa
        </label>
        <div className="company-toggle">
          {COMPANIES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              className={`company-btn ${values.company === value ? 'active' : ''}`}
              onClick={() => onChange('company', value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-fields">
        {FIELDS.map(({ id, label, placeholder, icon }) => (
          <div className="form-group" key={id}>
            <label className="form-label" htmlFor={id}>
              {icon}
              {label}
            </label>
            <input
              id={id}
              className="form-input"
              type="text"
              placeholder={placeholder}
              value={values[id]}
              onChange={(e) => onChange(id, e.target.value)}
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      <button
        className="btn-export"
        onClick={onExport}
        disabled={isExporting}
        id="btn-export-png"
      >
        {isExporting ? (
          <>
            <span className="spinner" />
            Gerando imagem...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Baixar Assinatura (.png)
          </>
        )}
      </button>
    </div>
  )
}
