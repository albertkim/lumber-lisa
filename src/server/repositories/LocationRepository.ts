import { CreateLocation, Location, LocationSchema, UpdateLocation } from "@/models"
import { db } from "@/server/database"

export const LocationRepository = {
  async getLocationById(companyId: number, locationId: number): Promise<Location> {
    const locationResult = await db
      .selectFrom("locations")
      .selectAll()
      .where("location_id", "=", locationId)
      .where("location_company_id", "=", companyId)
      .executeTakeFirst()

    if (!locationResult) {
      throw Error("Location not found")
    }

    const location: Location = {
      locationId: locationResult.location_id,
      locationName: locationResult.location_name,
      locationCompanyId: locationResult.location_company_id,
      locationCreateDate: locationResult.location_create_date.toISOString(),
      locationUpdateDate: locationResult.location_update_date.toISOString()
    }

    return LocationSchema.parse(location)
  },

  async getLocations(companyId: number): Promise<Location[]> {
    const locationResults = await db
      .selectFrom("locations")
      .selectAll()
      .where("location_company_id", "=", companyId)
      .orderBy("location_create_date", "asc")
      .execute()

    return locationResults.map((location) => {
      return LocationSchema.parse({
        locationId: location.location_id,
        locationName: location.location_name,
        locationCompanyId: location.location_company_id,
        locationCreateDate: location.location_create_date.toISOString(),
        locationUpdateDate: location.location_update_date.toISOString()
      })
    })
  },

  async createLocation(location: CreateLocation): Promise<Location> {
    const createLocationResult = await db
      .insertInto("locations")
      .values({
        location_name: location.locationName,
        location_company_id: location.locationCompanyId
      })
      .returningAll()
      .executeTakeFirst()

    if (!createLocationResult) {
      throw Error("Failed to create location")
    }

    return this.getLocationById(location.locationCompanyId, createLocationResult.location_id)
  },

  async updateLocation(location: UpdateLocation): Promise<Location> {
    if (!location.locationId || !location.locationCompanyId) {
      throw Error("Location ID and Company ID are required")
    }

    const updateLocationResult = await db
      .updateTable("locations")
      .set({
        location_name: location.locationName
      })
      .where("location_id", "=", location.locationId)
      .where("location_company_id", "=", location.locationCompanyId)
      .returningAll()
      .executeTakeFirst()

    if (!updateLocationResult) {
      throw Error("Location not found")
    }

    return LocationRepository.getLocationById(location.locationCompanyId, location.locationId)
  }
}
