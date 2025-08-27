export const Globals = {
  adminUser: {
    userId: 1, // Will be overridden by setup.ts
    userEmail: "admin@lumber.com",
    userFullName: "Admin User",
    userPassword: "password",
    userAuthToken: "" // Will be overridden by setup.ts
  },
  company: {
    companyId: 1, // Will be overridden by setup.ts
    companyName: "Lumber Co",
    companySubscriptionStatus: "active"
  },
  location: {
    locationId: 1, // Will be overridden by setup.ts
    locationCompanyId: 1,
    locationName: "Main Warehouse"
  }
}
