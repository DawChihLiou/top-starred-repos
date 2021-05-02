import { useState, useCallback } from 'react'
import { FilterState, FilterKey, FilterValue } from '@typings/filter'

export const initialFilterState: FilterState = {
  language: 'All',
  show: 'All',
}
/**
 * `useFilterState` exposes filter state and filter state update handler. Filter
 * state update hanlder will merge your key/value parameters to the filter
 * state and produce the next state.
 */
export function useFilterState() {
  const [filterState, setFilterState] = useState<FilterState>(
    initialFilterState
  )
  const updateFilterState = useCallback(
    (key: FilterKey, value: FilterValue) => {
      setFilterState({
        ...filterState,
        [key]: value,
      })
    },
    [filterState]
  )
  return { filterState, updateFilterState }
}
