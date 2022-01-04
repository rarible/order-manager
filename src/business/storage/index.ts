import type { RaribleStorage } from "./domain"
import { NamespacedStringStorage } from "./string-storage"
import { TypedStorage } from "./typed-storage"
import { fromTypedStorage } from "./utils"

export class RaribleStorageManager {
  private readonly storage: TypedStorage<RaribleStorage> = new TypedStorage<RaribleStorage>(
    new NamespacedStringStorage(this.prefix, window.localStorage),
  )
  readonly getValue = <K extends keyof RaribleStorage>(key: K, defaultValue: RaribleStorage[K]) => {
    return fromTypedStorage<RaribleStorage, K>(this.storage, key, defaultValue)
  }

  constructor(private readonly prefix: string) {}
}

export const raribleStorageManager = new RaribleStorageManager("order-checker")
