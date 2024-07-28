import Cookies from 'node_modules/@types/js-cookie'

export function logout() {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
