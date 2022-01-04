import type { Atom } from "@rixio/atom"
import { fromGetterSetter } from "../rxjs/from-getter-setter"
import type { TypedStorage } from "./typed-storage"

export function fromTypedStorage<T extends Record<string, any>, K extends keyof T>(
  storage: TypedStorage<T>,
  key: K,
  defaultValue?: T[K],
): Atom<T[K]> {
  return fromGetterSetter(
    () => {
      const stored = storage.get(key)
      if (stored === undefined && defaultValue) {
        return defaultValue
      }
      return stored
    },
    value => {
      if (value === undefined) {
        storage.remove(key)
      } else {
        storage.set(key, value)
      }
    },
  ) as Atom<T[K]>
}
