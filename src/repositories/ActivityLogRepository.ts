import { db } from "../database"
import { ActivityLog, ActivityLogAction, ActivityLogType, CreateActivityLog } from "../models"

export const ActivityLogRepository = {
  async createActivityLog(createLog: CreateActivityLog): Promise<ActivityLog> {
    const activityLog = await db
      .insertInto("activity_logs")
      .values({
        activity_log_company_id: createLog.companyId,
        activity_log_user_id: createLog.userId,
        activity_log_user_full_name: createLog.userFullName,
        activity_log_user_email: createLog.userEmail,
        activity_log_action: createLog.action,
        activity_log_type: createLog.type,
        activity_log_title: createLog.title,
        activity_log_description: createLog.description,
        activity_log_data: JSON.stringify(createLog.data)
      })
      .returningAll()
      .executeTakeFirst()

    if (!activityLog) {
      throw new Error("Failed to create activity log")
    }

    return {
      activityLogId: activityLog.activity_log_id,
      companyId: activityLog.activity_log_company_id,
      userId: activityLog.activity_log_user_id,
      userFullName: activityLog.activity_log_user_full_name,
      userEmail: activityLog.activity_log_user_email,
      action: activityLog.activity_log_action as ActivityLogAction,
      type: activityLog.activity_log_type as ActivityLogType,
      title: activityLog.activity_log_title,
      description: activityLog.activity_log_description,
      data: activityLog.activity_log_data,
      createDate: activityLog.activity_log_create_date.toISOString()
    }
  },

  async getActivityLogsByCompanyId(companyId: number): Promise<ActivityLog[]> {
    const activityLogs = await db
      .selectFrom("activity_logs")
      .selectAll()
      .where("activity_log_company_id", "=", companyId)
      .orderBy("activity_log_create_date", "desc")
      .execute()

    return activityLogs.map((activityLog) => ({
      activityLogId: activityLog.activity_log_id,
      companyId: activityLog.activity_log_company_id,
      userId: activityLog.activity_log_user_id,
      userFullName: activityLog.activity_log_user_full_name,
      userEmail: activityLog.activity_log_user_email,
      action: activityLog.activity_log_action as ActivityLogAction,
      type: activityLog.activity_log_type as ActivityLogType,
      title: activityLog.activity_log_title,
      description: activityLog.activity_log_description,
      data: activityLog.activity_log_data,
      createDate: activityLog.activity_log_create_date.toISOString()
    }))
  }
}
