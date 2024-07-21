import api from '@/lib/axios'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', data)

    return response.data
  } catch (error) {
    throw new Error('Login failed')
  }
}
