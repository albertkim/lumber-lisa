import { CreateActivityLog } from "@/models"
import { ActivityLogRepository } from "@/server/repositories/ActivityLogRepository"

export const ActivityLogService = {
  async createActivityLog(createLog: CreateActivityLog) {
    return ActivityLogRepository.createActivityLog(createLog)
  },

  async getActivityLogsByCompanyId(companyId: number) {
    return ActivityLogRepository.getActivityLogsByCompanyId(companyId)
  }
}
