import { ThemeProviderContext } from '@/app/shared/components/theme-provider' // Adjust the path as per your project structure
import { useContext } from 'react'

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
