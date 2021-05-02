import { useEffect } from 'react'

/**
 * Remove the server-side injected CSS.
 */
export function useClientJss() {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
}
