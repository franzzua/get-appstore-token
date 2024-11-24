import Token from './token.js'
import { messages } from './messages.js'

export default class Utils {

  constructor() {
    this.defaultLimit = 2
  }

  getToken(appId, issuerId, keyId, jwt, pkRaw, pkFilePath, pkFileBase64, scope) {
    if (!!jwt) {
      console.log(messages.predefined_jwt_set)
      return jwt
    }

    console.log(messages.predefined_jwt_not_set)
    console.log(messages.setting_private_key)
    const token = new Token(pkRaw, pkFilePath, pkFileBase64, scope)
    console.log(messages.automatic_token_generation)
    return token.generate(appId, issuerId, keyId)
  }
}
