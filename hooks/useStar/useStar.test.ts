import { renderHook, act } from '@testing-library/react-hooks'
import { useStar } from './useStar'
import { LocalStorageDriver } from '@services/StorageDriver'

describe('useStar', () => {
  it('should have default starred repo', () => {
    const { result } = renderHook(() => useStar())
    expect(result.current.starredRepoNames).toEqual({})
  })
  it('should add to and remove from starred repo state', () => {
    const { result } = renderHook(() => useStar())
    act(() => {
      result.current.starRepo('tester-repo')()
    })
    expect(result.current.starredRepoNames).toEqual({ 'tester-repo': 1 })
    act(() => {
      result.current.starRepo('tester-repo')()
    })
    expect(result.current.starredRepoNames).toEqual({})
  })
  it('should add to and remove from local storage', () => {
    const storage = new LocalStorageDriver('gh-repo-stars')
    const { result } = renderHook(() => useStar())
    act(() => {
      result.current.starRepo('tester-repo')()
    })
    expect(storage.read()).toEqual({ 'tester-repo': 1 })
    act(() => {
      result.current.starRepo('tester-repo')()
    })
    expect(storage.read()).toEqual({})
  })
})
