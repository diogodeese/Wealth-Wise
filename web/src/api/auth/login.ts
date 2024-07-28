import api from '@/lib/axios'

export async function login(formData: { email: string; password: string }) {
  const response = await api.post('/login', formData)
  return response.data
}
