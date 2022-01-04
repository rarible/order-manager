import type { StringStorage } from "./domain"

export class NamespacedStringStorage implements StringStorage {
  constructor(private readonly namespace: string, private readonly storage: StringStorage) {}

  clear(): void {
    this.storage.clear()
  }

  getItem(key: string): string | null {
    return this.storage.getItem(`${this.namespace}:${key}`)
  }

  removeItem(key: string): void {
    this.storage.removeItem(`${this.namespace}:${key}`)
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(`${this.namespace}:${key}`, value)
  }
}
