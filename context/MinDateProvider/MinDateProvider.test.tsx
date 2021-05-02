import MinDateProvider, { MinDateContext } from './MinDateProvider'
import { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { DateTime } from 'luxon'

function ContextTestHelper() {
  const minDate = useContext(MinDateContext)
  return <span data-testid="min-date">{minDate}</span>
}

describe('MinDateProvider', () => {
  it('should inject local min date to children', () => {
    const Tester = () => (
      <MinDateProvider>
        <ContextTestHelper />
      </MinDateProvider>
    )
    // business logic: min date is 7 days prior to today based on local timezone
    const expected = DateTime.local().minus({ days: 7 }).toISODate()
    render(<Tester />)
    expect(screen.getByTestId('min-date')).toHaveTextContent(expected)
  })
})
