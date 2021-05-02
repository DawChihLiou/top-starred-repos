import { useClientJss } from './useClientJss'
import { render, screen } from '@testing-library/react'

describe('useClientJss', () => {
  it('should have no effect on DOM', () => {
    const Tester = () => {
      useClientJss()
      return (
        <div data-testid="tester">
          <div></div>
        </div>
      )
    }
    render(<Tester />)
    expect(screen.getByTestId('tester').childElementCount).toBe(1)
  })
  it('should remove server-generated styles', () => {
    const Tester = () => {
      useClientJss()
      return (
        <div data-testid="tester">
          <div id="jss-server-side"></div>
        </div>
      )
    }
    render(<Tester />)
    expect(screen.getByTestId('tester').childElementCount).toBe(0)
  })
})
