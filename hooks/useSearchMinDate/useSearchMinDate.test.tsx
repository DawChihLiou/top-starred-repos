import { renderHook } from '@testing-library/react-hooks'
import MinDateProvider from '@context/MinDateProvider'
import { useSearchMinDate } from './useSearchMinDate'
import { DateTime } from 'luxon'

describe('useSearchMinDate', () => {
  it('should return loal min date', () => {
    const wrapper = ({ children }) => (
      <MinDateProvider>{children}</MinDateProvider>
    )
    const expected = DateTime.local().minus({ days: 7 }).toISODate()
    const { result } = renderHook(() => useSearchMinDate(), { wrapper })
    expect(result.current).toBe(expected)
  })
})
