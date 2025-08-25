import { execSync } from "child_process"

// You are expected to have ansible already installed on your machine
// You are also expected to have a .vault_pass file in the root of the project
// This script will use ansible-vault to encrypt environment files

const environments = ["production", "local"]

async function main() {
  for (const environment of environments) {
    const envFile = `./.env.${environment}`
    const encryptedEnvFile = `./.env.${environment}.encrypted`

    console.log(`Encrypting ${envFile} to ${encryptedEnvFile}`)
    execSync(`ansible-vault encrypt --vault-password-file .vault_pass --output ${encryptedEnvFile} ${envFile}`)
  }
}

main().catch(console.error)
