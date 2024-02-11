export function setToken(token: string): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem('token', token)

    resolve()
  })
}
