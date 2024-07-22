import api from '@/lib/axios'

interface RegisterData {
  email: string
  alternativeEmail?: string
  password: string
  name: string
  surname: string
  country?: string
}

interface RegisterResponse {
  token: string
}

export const register = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/register', data)
    return response.data
  } catch (error) {
    throw new Error('Registration failed')
  }
}
