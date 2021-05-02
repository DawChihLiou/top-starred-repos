export interface Driver {
  read: <T extends object>(key: string) => T | null
  write: <T extends object>(key: string, value: T) => 'OK' | 'ERROR'
  delete: (key: string) => 'OK' | 'ERROR'
}
