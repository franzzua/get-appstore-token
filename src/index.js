import * as core from "@actions/core";
import Utils from './utils.js'

async function run() {
  const utils = new Utils()

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
    'GET /v1/builds?filter[app]={appId}')


  const result = await fetch(`https://api.appstoreconnect.apple.com/v1/builds?filter[app]=${appId}`, {
    headers: {
      Authorization: `Bearer ${tokenString}`
    }
  }).then(x => x.json());
  const version = Math.max(...result.data.map(x => x.attributes.version));
  core.setOutput(`version`, version)
}

run()
