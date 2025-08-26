export function Number({ value }: { value: number | null }) {
  if (value === null) {
    return <span>-</span>
  }

  // Format with localized thousands separators
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })

  // If it's a whole number, don't show decimals
  const formattedValue = formatter.format(value)

  return <span>{formattedValue}</span>
}
