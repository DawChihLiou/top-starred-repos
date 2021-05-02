import { Driver } from './types'

export class LocalStorageDriver implements Driver {
  private namespace = '__gws'
  private key: string

  constructor(key: string) {
    this.key = `${this.namespace}/${key}`
  }

  public read<T>(): T | null {
    if (typeof window === 'undefined') {
      return null
    }
    const item = localStorage.getItem(this.key)
    if (item === null) {
      return null
    }
    return JSON.parse(item)
  }

  public write<T>(value: T) {
    if (typeof window === 'undefined') {
      return 'ERROR'
    }
    localStorage.setItem(this.key, JSON.stringify(value))
    if (this.read() === null) {
      return 'ERROR'
    }
    return 'OK'
  }

  public delete() {
    if (typeof window === 'undefined') {
      return 'ERROR'
    }
    localStorage.removeItem(this.key)
    if (this.read() !== null) {
      return 'ERROR'
    }
    return 'OK'
  }
}
