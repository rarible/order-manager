import type { Observable } from "rxjs"
import type { Wrapped } from "@rixio/wrapped"

export type Option<K = string, T extends object = {}> = {
  label: string
  value: K
  data: T
}

export type OW<T> = Observable<Wrapped<T>>
