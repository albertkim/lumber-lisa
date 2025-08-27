import {
  AdminCompaniesWithDetailsResponse,
  AdminRegisterNewCompany,
  AdminRegisterNewCompanyResponse,
  User
} from "@/models"
import { generateWelcomeEmail } from "@/server/emails/WelcomeEmail"
import { AdminRepository } from "@/server/repositories/AdminRepository"
import { SecurityRoleRepository } from "@/server/repositories/SecurityRoleRepository"
import { UserRepository } from "@/server/repositories/UserRepository"
import { LocationService } from "@/server/services/LocationService"
import { EmailUtilities } from "@/server/utilities/EmailUtilities"

export const AdminService = {
  async getCompanies(): Promise<AdminCompaniesWithDetailsResponse> {
    const companies = await AdminRepository.getCompanies()
    return companies
  },

  registerNewCompany: async (registerNewCompany: AdminRegisterNewCompany): Promise<AdminRegisterNewCompanyResponse> => {
    // Create company
    const createdCompany = await AdminRepository.createCompany(registerNewCompany)
    // Create a default location
    await LocationService.createLocation({
      locationName: "Main Warehouse",
      locationCompanyId: createdCompany.companyId
    })

    // Create default security role
    const allPermissions = await SecurityRoleRepository.getAllPermissions()
    const adminSecurityRole = await SecurityRoleRepository.createSecurityRole({
      companyId: createdCompany.companyId,
      securityRoleName: "Admin",
      permissions: allPermissions.map((permission) => ({
        permissionId: permission.permission_id,
        permissionEnabled: true
      }))
    })

    // Create user if initialUser is provided
    let adminUser: User | null = null

    if (registerNewCompany.initialUser) {
      // Create admin user
      const randomPassword = registerNewCompany.initialUser.userPassword || Math.random().toString(36).slice(-8)
      adminUser = await UserRepository.createUser(
        registerNewCompany.initialUser.userEmail,
        randomPassword,
        registerNewCompany.initialUser.userFullName,
        createdCompany.companyId,
        adminSecurityRole.securityRoleId
      )
      // Send welcome + reset password email
      const resetPasswordToken = await UserRepository.createResetPasswordToken(adminUser.userId)
      await EmailUtilities.sendEmail(
        adminUser.userEmail,
        "Welcome to Lumber",
        await generateWelcomeEmail(adminUser, resetPasswordToken)
      )
    }

    return {
      company: createdCompany,
      user: adminUser
    }
  }
}
