// import * as core from "@actions/core";
import Utils from './utils.js'

const core = {
  getInput(name){
    return ({
      'app-id': '6737245898',
      'key-id': 'KN5DQZNJCK',
      'issuer-id': '70404d9c-c471-42e1-849d-f266781d74c3',
      'private-key-p8-path': '/home/fransua/Downloads/AuthKey_KN5DQZNJCK.p8'
    })[name];
  },
  setOutput: console.log
}

async function run() {
  const utils = new Utils()

  const appId = core.getInput('app-id')
  const keyId = core.getInput('key-id')
  const issuerId = core.getInput('issuer-id')
  const privateKeyRaw = core.getInput('private-key-raw')
  const privateKeyFilePath = core.getInput('private-key-p8-path')
  const privateKeyFileBase64 = core.getInput('private-key-p8-base64')

  const params = new URLSearchParams({
    'fields[builds]': ['version'],
    'fields[appStoreVersions]': ['versionString', 'appVersionState'],
    'include': ['builds', 'appStoreVersions'],
  })
  // const url = `/v1/builds?${params.toString()}`
  const url = `/v1/apps/${appId}?${params.toString()}`
  const tokenString = utils.getToken(
    appId,
    issuerId,
    keyId,
    undefined,
    privateKeyRaw,
    privateKeyFilePath,
    privateKeyFileBase64,
    `GET ${url}`)

  const result = await fetch(`https://api.appstoreconnect.apple.com${url}`, {
    headers: {
      Authorization: `Bearer ${tokenString}`
    }
  }).then(x => x.json());
  const builds = result.included.filter(x => x.type == 'builds').map(x => x.attributes);
  const appStoreVersions = result.included.filter(x => x.type == 'appStoreVersions').map(x => x.attributes)
      .sort((a,b) => a.versionString > b.versionString ? -1 : 1);
  const version = Math.max(...builds.map(x => x.version));
  const appStoreVersion = appStoreVersions[0];
  if (appStoreVersion.appVersionState == 'READY_FOR_DISTRIBUTION') {
    const semVer = appStoreVersion.versionString.split('.');
    semVer[2] = +(semVer[2] ?? 0) + 1;
    core.setOutput(`appStoreVersion`, semVer.join('.'));
  } else {
    core.setOutput(`appStoreVersion`, appStoreVersion.versionString);
  }
  core.setOutput(`version`, +(version ?? 0) + 1)
}

run()
