import { Atom } from "@rixio/atom"

export function fromGetterSetter<K>(
  getter: () => K | undefined,
  setter: (value: K | undefined) => void,
): Atom<K | undefined> {
  const atom = Atom.create(getter())
  atom.subscribe(setter)
  return atom
}
