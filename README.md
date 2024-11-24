# App Store Application Versions Action

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/action-tools/get-appstore-version/main.yml?branch=main)](https://github.com/franzzua/get-appstore-token/actions/workflows/main.yml)
[![GitHub Release](https://img.shields.io/github/v/release/action-tools/get-appstore-version?include_prereleases)](https://github.com/franzzua/get-appstore-token/releases/latest)

This action can be used to get the **latest** and the **previous** application version from the App Store. It calls [appStoreVersions](https://developer.apple.com/documentation/appstoreconnectapi/list_all_app_store_versions_for_an_app) request from the [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi).

## Info

To send an API request to the App Store Connect you must generate a **[Json Web Token](https://jwt.io/introduction)** with ES256 encryption. You can generate this token by yourself and then pass it to the action or you can generate it automatically.

#### Get App Id

To get the app id you can either navigate to your app in the App Store with your browser and check your url (`https://apps.apple.com/by/app/{app-name}/id{app-id}`) or navigate to your app in the **[App Store Connect](https://appstoreconnect.apple.com)**, then open **App Information** at the left column and find **Apple ID** there (under the **General Information**). This parameter is required to identify your application.

#### API Key Creation

1. First of all navigate to the **[App Store Connect](https://appstoreconnect.apple.com)**.
2. Open **[Users and Access](https://appstoreconnect.apple.com/access/users)**.
3. Select **Keys** tab.
4. Tap the "**+**" button.
5. Enter the name of your key (e.g. `your-app-name-api-key`) and select the desired role (e.g. `Developer`).
6. A new key will appear in your Keys list.
7. Tap "**Download API Key**" to download the `AuthKey_{key-id}.p8` file.  
**Note**: You won't be able to download it afterwards.
8. Copy **Issuer ID** and **Key ID** on the same page.  
**Note**: You will be able to copy them afterwards.

**Note**: It's suggested to store the sensitive information (like json web token, private key, key id and issuer id) as **[Github Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)** (please check also **[how to store files as secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#storing-base64-binary-blobs-as-secrets)**).

#### Json Web Token Generation

In order to generate JWT automatically, you can just provide `app-id`, `issuer-id` and your private key. The private key can be provided as a raw string (`private-key-raw`), as a Base64 encoded \*.p8 file (`private-key-p8-base64`) or as a path to \*.p8 file (`private-key-p8-path`).

The priority of the parameters (which one will be used first) is the following: `json-web-token` > `private-key-raw` > `private-key-p8-path` > `private-key-p8-base64`.

## Output

It has an output `token` with string

### Sample

```yaml
- name: 'Get JWT AppStoreConnect token'
  uses: franzzua/get-appstore-token@v1.3
  id: appstore_token
  with:
    app-id: ${{ secrets.APP_ID }}
    key-id: ${{ secrets.KEY_ID }}
    issuer-id: ${{ secrets.ISSUER_ID }}
    private-key-raw: ${{ secrets.PRIVATE_KEY_RAW }}
    private-key-p8-base64: ${{ secrets.PRIVATE_KEY_FILE_BASE64 }}
    private-key-p8-path: ./AuthKey.p8

- name: 'Get iTunes Lookup results'
  run: |
    echo "Parsed version from JSON: ${{ fromJson(steps.itunes_json.outputs.jsonOutput).results[0].version }}"
```

## Action Inputs

| Input                              | Required | Default | Description                                                                           |
| :---                               | :---     | :---    | :---                                                                                  |
| `app-id`                           | false    |         | App Store application identifier.                                                     |
| `key-id`                           | false    |         | Private key ID from App Store Connect.                                                |
| `issuer-id`                        | false    |         | Issuer ID from the API Keys page in App Store Connect.                                |
| `private-key-p8-path`              | false    |         | Private key file downloaded from the API Keys page in App Store Connect (\*.p8 file). |
| `private-key-p8-base64`            | false    |         | Private key downloaded from the App Store Connect (\*.p8 file) in Base64 format.      |
| `private-key-raw`                  | false    |         | Raw private key downloaded from the API Keys page in App Store Connect.               |

## Contributing

Contributors are welcome! See **[CONTRIBUTING.md](https://github.com/franzzua/get-appstore-token/blob/main/CONTRIBUTING.md)** for additional instructions.
