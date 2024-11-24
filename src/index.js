import core from '@actions/core'
import Utils from './utils.js'

async function run() {
  const utils = new Utils()

  const scope = core.getInput('scope')
  const appId = core.getInput('app-id')
  const keyId = core.getInput('key-id')
  const issuerId = core.getInput('issuer-id')
  const privateKeyRaw = core.getInput('private-key-raw')
  const privateKeyFilePath = core.getInput('private-key-p8-path')
  const privateKeyFileBase64 = core.getInput('private-key-p8-base64')
  const tokenString = utils.getToken(
    appId,
    issuerId,
    keyId,
    undefined,
    privateKeyRaw,
    privateKeyFilePath,
    privateKeyFileBase64,
    scope)

  core.setOutput(`token`, tokenString)
}

run()
