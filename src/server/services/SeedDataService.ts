import { Company, User } from "@/models"
import { LocationService } from "@/server/services/LocationService"

const seedLocations = [
  {
    locationName: "Main Warehouse",
    locationDescription: "Main warehouse for the company"
  },
  {
    locationName: "Distribution Center",
    locationDescription: "Distribution center for the company"
  }
]

export const SeedDataService = {
  seedData: async (user: User, company: Company) => {
    // Should be called right after a new company is created

    // Seed locations
    for (const location of seedLocations) {
      await LocationService.createLocation({
        locationName: location.locationName,
        locationCompanyId: company.companyId
      })
    }
  }
}
