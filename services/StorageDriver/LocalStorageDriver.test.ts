import { LocalStorageDriver } from './LocalStorageDriver'

describe('LocalStorageDriver', () => {
  it('should return null when there is no data in storage', () => {
    const tester = new LocalStorageDriver('tester')
    expect(tester.read()).toBeNull()
  })
  it('should return data when data is found in storage', () => {
    window.localStorage.setItem(
      '__gws/tester',
      JSON.stringify({ data: 'tester' })
    )
    const tester = new LocalStorageDriver('tester')
    expect(tester.read()).toEqual({ data: 'tester' })
  })
  it('should return write data to storage', () => {
    const tester = new LocalStorageDriver('tester')
    const actual = tester.write({ data: 'tester' })
    expect(actual).toBe('OK')
    expect(tester.read()).toEqual({ data: 'tester' })
  })
  it('should return write data to storage', () => {
    const tester = new LocalStorageDriver('tester')
    tester.write({ data: 'tester' })
    const actual = tester.delete()
    expect(actual).toBe('OK')
    expect(tester.read()).toBeNull()
  })
})
