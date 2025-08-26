import { AdminRegisterNewCompany, AdminRegisterNewCompanyResponse } from "@/models"
import { generateWelcomeEmail } from "@/server/emails/WelcomeEmail"
import { AdminRepository } from "@/server/repositories/AdminRepository"
import { SecurityRoleRepository } from "@/server/repositories/SecurityRoleRepository"
import { UserRepository } from "@/server/repositories/UserRepository"
import { LocationService } from "@/server/services/LocationService"
import { EmailUtilities } from "@/server/utilities/EmailUtilities"

export const AdminService = {
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
    // Create admin user
    const randomPassword = registerNewCompany.userPassword || Math.random().toString(36).slice(-8)
    const adminUser = await UserRepository.createUser(
      registerNewCompany.userEmail,
      randomPassword,
      registerNewCompany.userFullName,
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
    return {
      company: createdCompany,
      user: adminUser
    }
  }
}
