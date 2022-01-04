import type { StringStorage } from "./domain"

export class TypedStorage<T extends Record<string, any>> {
  constructor(private readonly storage: StringStorage) {}

  get<K extends keyof T>(key: K): T[K] | undefined {
    const result = this.storage.getItem(key as string)
    if (result !== null) {
      try {
        return JSON.parse(result) as T[K]
      } catch (_) {
        return result as T[K]
      }
    }
    return undefined
  }

  remove<K extends keyof T>(key: K): void {
    this.storage.removeItem(key as string)
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.storage.setItem(key as string, JSON.stringify(value))
  }

  modify<K extends keyof T>(key: K, updater: (value: T[K] | undefined) => T[K]): T[K] {
    const nextValue = updater(this.get(key))
    this.set(key, nextValue)
    return nextValue
  }

  clear(): void {
    this.storage.clear()
  }
}
