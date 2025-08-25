import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export function encodeToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "72h" })
}

export function decodeToken(token: string): { userId: number } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
}

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10)
}

export function decryptPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function comparePasswords(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function generateResetPasswordToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "72h" })
}

export function decodeResetPasswordToken(token: string): { userId: number } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
}
