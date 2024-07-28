import Cookies from 'js-cookie'

export function setTokens(accessToken: string, refreshToken: string): void {
  Cookies.set('accessToken', accessToken, {
    expires: 1 / 24,
    secure: true,
    sameSite: 'strict'
  }) // 1 hour
  Cookies.set('refreshToken', refreshToken, {
    expires: 30,
    secure: true,
    sameSite: 'strict'
  }) // 30 days
}
