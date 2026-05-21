import { useEffect, useState } from 'react'

/**
 * Toast — Notificação temporária (sucesso ou erro).
 * Props: message, type ('success' | 'error'), onClose
 */
export default function Toast({ message, type = 'success', onClose }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true)
      setTimeout(onClose, 250)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icon = type === 'success' ? '✓' : '✕'

  return (
    <div className={`toast ${type} ${leaving ? 'leaving' : ''}`} role="alert">
      <span className="toast-icon">{icon}</span>
      <span>{message}</span>
    </div>
  )
}
