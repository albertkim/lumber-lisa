export interface DuckDB {
  inventory: Inventory
}

export interface Inventory {
  "Product ID": string
  "Product Description": string
  "Product Species": string
  "Product Grade": string
  "Product Thickness": string
  "Product Width": string
  "Location ID": string
  "Inventory Group Name": string
  "Inventory Group ID": string
  "Total Pieces": number
  "Total FBM": number
  "Total M3": number
  "Number of Tags": number
}