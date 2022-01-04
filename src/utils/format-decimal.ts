const formatter = new Intl.NumberFormat("en", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
  useGrouping: true,
})

export function formatDecimal(value: number) {
  return formatter.format(value)
}
