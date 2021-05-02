import { useContext } from 'react'
import { MinDateContext } from '@context/MinDateProvider'

/**
 * `useSearchMinDate` injects `MinDateContext` into your component. Make sure
 * your component is inside `MinDateProvider`.
 */
export function useSearchMinDate() {
  const minDate = useContext(MinDateContext)
  return minDate
}
