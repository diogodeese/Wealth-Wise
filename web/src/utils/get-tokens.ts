import Cookies from 'js-cookie'

export function getAccessToken(): string | undefined {
  return Cookies.get('accessToken') || undefined
}

export function getRefreshToken(): string | undefined {
  return Cookies.get('refreshToken') || undefined
}
