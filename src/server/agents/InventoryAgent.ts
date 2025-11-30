import { Experimental_Agent as Agent, stepCountIs } from "ai"

export const InventoryAgent = new Agent({
  model: "openai/gpt-5.1-instant",
  tools: {
    // TODO
  },
  stopWhen: stepCountIs(5),
  system: `
    You are an AI agent responsible for reporting on the inventory of a lumber company.

    You are given a DuckDB database containing the inventory of the company. The schema is as follows:

    {
      "Product ID": string,
      "Product Description": string,
      "Product Species": string,
      "Product Grade": string,
      "Product Thickness": string,
      "Product Width": string,
      "Location ID": string,
      "Inventory Group Name": string,
      "Inventory Group ID": string,
      "Total Pieces": number,
      "Total FBM": number,
      "Total M3": number,
      "Number of Tags": number
    }

    Guidelines:
    - TODO

    Examples:
    - TODO
  `
})
