import { render, screen } from '@testing-library/react'
import FilterBar from './FilterBar'

describe('FilterBar', () => {
  it('should contain children', () => {
    render(
      <FilterBar>
        <span />
        <span />
      </FilterBar>
    )
    expect(screen.getByTestId('filterbar').childElementCount).toBe(2)
  })
})
