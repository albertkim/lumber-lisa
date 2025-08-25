import { execSync } from "child_process"

// You are expected to have ansible already installed on your machine
// You are also expected to have a .vault_pass file in the root of the project
// This script will use ansible-vault to decrypt environment files

const environments = ["production", "local"]

async function main() {
  for (const environment of environments) {
    const encryptedEnvFile = `./.env.${environment}.encrypted`
    const envFile = `./.env.${environment}`

    console.log(`Decrypting ${encryptedEnvFile} to ${envFile}`)
    execSync(`ansible-vault decrypt --vault-password-file .vault_pass --output ${envFile} ${encryptedEnvFile}`)
  }
}

main().catch(console.error)
