export type Option<K = string, T extends object = {}> = {
  label: string
  value: K
  data: T
}
