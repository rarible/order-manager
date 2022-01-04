export type RaribleStorage = {
  CONNECTOR_STATE: string | undefined
}

export interface StringStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}
