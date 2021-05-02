import { renderHook, act } from '@testing-library/react-hooks'
import { useFilterState, initialFilterState } from './useFilterState'

describe('useFilterState', () => {
  it('should have initial filter state', () => {
    const { result } = renderHook(() => useFilterState())
    expect(result.current.filterState).toEqual(initialFilterState)
  })
  it('should have initial filter state', () => {
    const { result } = renderHook(() => useFilterState())
    act(() => {
      result.current.updateFilterState('language', 'testlang')
    })
    expect(result.current.filterState).toEqual({
      ...initialFilterState,
      language: 'testlang',
    })
    act(() => {
      result.current.updateFilterState('show', 'testdisplay')
    })
    expect(result.current.filterState).toEqual({
      show: 'testdisplay',
      language: 'testlang',
    })
  })
})
