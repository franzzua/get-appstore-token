import core from '@actions/core'
import Utils from './utils.js'

async function run() {
  const utils = new Utils()

  const tokenString = utils.getToken(
    appId,
    issuerId,
    keyId,
    jsonWebToken,
    privateKeyRaw,
    privateKeyFilePath,
    privateKeyFileBase64)

  core.setOutput(`token`, tokenString)
}

run()
