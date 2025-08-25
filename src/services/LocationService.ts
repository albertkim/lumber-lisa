import { CreateLocation, Location, UpdateLocation } from "../models"
import { LocationRepository } from "../repositories/LocationRepository"

export const LocationService = {
  async getLocationById(companyId: number, locationId: number): Promise<Location> {
    return LocationRepository.getLocationById(companyId, locationId)
  },

  async getLocations(companyId: number): Promise<Location[]> {
    return LocationRepository.getLocations(companyId)
  },

  async createLocation(location: CreateLocation): Promise<Location> {
    return LocationRepository.createLocation(location)
  },

  async updateLocation(location: UpdateLocation): Promise<Location> {
    return LocationRepository.updateLocation(location)
  }
}
