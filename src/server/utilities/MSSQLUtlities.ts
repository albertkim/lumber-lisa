import { Connection, Request } from "tedious"

const DEFAULT_CONNECT_TIMEOUT_MS = 15000
const DEFAULT_REQUEST_TIMEOUT_MS = 60000

export interface MSSQLConnectionConfig {
  username: string
  password: string
  database: string
  host: string
  port?: number
  connectTimeoutMs?: number
  requestTimeoutMs?: number
}

export async function executeMSSQLQuery(
  connectionConfig: MSSQLConnectionConfig,
  query: string
): Promise<Record<string, any>[]> {
  const connection = new Connection({
    authentication: {
      options: {
        userName: connectionConfig.username,
        password: connectionConfig.password
      },
      type: "default"
    },
    options: {
      database: connectionConfig.database,
      port: connectionConfig.port || 1433,
      connectTimeout: connectionConfig.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS,
      requestTimeout: connectionConfig.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
      trustServerCertificate: true,
      encrypt: true
    },
    server: connectionConfig.host
  })

  try {
    await new Promise<void>((resolve, reject) => {
      connection.on("connect", (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
      connection.connect()
    })

    const result = await new Promise<Record<string, any>[]>((resolve, reject) => {
      const request = new Request(query, (err) => {
        if (err) {
          reject(err)
          return
        }
      })

      const data: Record<string, any>[] = []

      request.on("row", (columns: any[]) => {
        const row: Record<string, any> = {}
        columns.forEach((column: any) => {
          row[column.metadata.colName] = column.value
        })
        data.push(row)
      })

      request.on("requestCompleted", () => {
        resolve(data)
      })

      connection.execSql(request)
    })

    return result
  } finally {
    connection.close()
  }
}
