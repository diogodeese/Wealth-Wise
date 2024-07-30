import api from '@/lib/axios'

export async function logout() {
  try {
    await api.post('/logout')
    window.location.href = '/auth/sign-in'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
