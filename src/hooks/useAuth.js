/**
 * useAuth — autenticação simples baseada em sessionStorage.
 * A sessão expira ao fechar o browser (sessionStorage).
 */

const SESSION_KEY = 'gb-sig-auth'
const CORRECT_PWD = 'gbagritech2026'

export function useAuth() {
  // Verifica se já está autenticado na sessão atual
  function isAuthenticated() {
    try { return sessionStorage.getItem(SESSION_KEY) === '1' }
    catch { return false }
  }

  function login(password) {
    if (password === CORRECT_PWD) {
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* noop */ }
      return true
    }
    return false
  }

  function logout() {
    try { sessionStorage.removeItem(SESSION_KEY) } catch { /* noop */ }
  }

  return { isAuthenticated, login, logout }
}
