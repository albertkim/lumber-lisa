import { SecurityRoleRepository } from "../repositories/SecurityRoleRepository"

export class SecurityRoleService {
  static async getSecurityRole(companyId: number, securityRoleId: number) {
    return SecurityRoleRepository.getSecurityRoleById(companyId, securityRoleId)
  }

  static async getSecurityRoleByRoleName(companyId: number, roleName: string) {
    return SecurityRoleRepository.getSecurityRoleByRoleName(companyId, roleName)
  }

  static async getSecurityRoles(companyId: number) {
    return SecurityRoleRepository.getSecurityRoles(companyId)
  }
}
