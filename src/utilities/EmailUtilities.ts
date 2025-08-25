import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const EmailUtilities = {
  async sendEmail(email: string, subject: string, body: string) {
    if (!resend) {
      console.warn("Resend API key is not set - skipping email")
      return
    }

    // Don't send emails if NODE_ENV is not explicitly production or development (ex. test)
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "development") {
      console.warn("Skipping email - NODE_ENV is not production or development")
      return
    }

    try {
      console.log(`Sending email to ${email} with subject ${subject}`)
      await resend.emails.send({ from: "Lumber <no-reply@lumber.albertkim.ca>", to: email, subject, html: body })
    } catch (error) {
      console.error(error)
    }
  }
}
