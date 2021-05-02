import { useMemo } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { createTheme } from '@theme/createTheme'

/**
 * create custom theme in light mode or dark mode based on brower color scheme
 * setting.
 */
export function useTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode])
  return theme
}
