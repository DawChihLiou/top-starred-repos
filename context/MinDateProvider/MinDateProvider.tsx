import { createContext } from 'react'
import { DateTime } from 'luxon'

/**
 * Minimum date is 7 days prior to today based on local timezone.
 */
const minDate = DateTime.local().minus({ day: 7 }).toISODate()
/**
 * Min date context is a date ISO string based on local timezone.
 * For example: "2021-01-30"
 */
export const MinDateContext = createContext<string>(minDate)

type minDateProviderProps = React.PropsWithChildren<{}>
/**
 * `MinDateProvider` provides the minimum date ISO string based on local
 * timezone for fetching GitHub repositories.
 *
 * You can use `useSearchMinDate` react hook from `@hooks/useSearchMinDate` in
 * your components to access the ISO date string.
 */
export default function MinDateProvider({ children }: minDateProviderProps) {
  return (
    <MinDateContext.Provider value={minDate}>
      {children}
    </MinDateContext.Provider>
  )
}
