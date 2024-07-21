import api from '@/lib/axios'

interface RegisterData {
  email: string
  password: string
  name: string
  surname: string
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
