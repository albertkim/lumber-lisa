import { Company, CompanyUsersResponse, UpdateCompany } from "../models"
import { CompanyRepository } from "../repositories/CompanyRepository"
import { UserRepository } from "../repositories/UserRepository"

export const CompanyService = {
  async getCompanyById(companyId: number): Promise<Company> {
    return CompanyRepository.getCompanyById(companyId)
  },
  async updateCompany(companyId: number, company: UpdateCompany): Promise<Company> {
    return CompanyRepository.updateCompany(companyId, company)
  },
  async getUsersByCompanyId(companyId: number): Promise<CompanyUsersResponse> {
    const users = await UserRepository.getUsers({ companyId: companyId })
    return {
      data: users,
      total: users.length
    }
  }
}
