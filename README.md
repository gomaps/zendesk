# Zendesk Sell Apps

This is a collection of Zendesk Apps. Currently `claimCommander` and `claimsInfo` are two apps that can be integrated with Zendesk Sell as widgets for Go Claims.

For the development of Zendesk Apps, Zendesk App Tools(ZAT) are required.

## ZAT Installation

> This guide covers macOS installation. For other platforms, refer to the [official documentation](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/).

ZAT requires Ruby version `2.6.9`. Use `rbenv` to manage Ruby versions on macOS.

### Installing rbenv and Ruby:
```console
brew install rbenv
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
rbenv install 2.6.9
```

Setting Ruby version:
```console
rbenv global 2.6.9
ruby -v  # Verify the correct version.
```

Installing ZAT:
```console
gem install rake
sudo gem install nokogiri -v 1.13.10
sudo gem install zendesk_apps_tools
zat -v  # Verify ZAT installation.
```

## Running Development Environments

For the `claimsCommander` or `claimsInfo` app:
```console
cd ./claimsCommander
make dev
```

This command copies relevant files from **./common** and starts the ZAT server. Preview the app in Zendesk Sell by appending **?zat=true** to a deals page URL. For example: `https://d3v-gotestclaims.zendesk.com/sales/deals/160874453?zat=true`

Here https://d3v-gotestclaims.zendesk.com is Go's Sell sandbox or dev account.

> Note: Access Go's Sell sandbox or dev account credentials via Lastpass.

These apps are essentially **shells**; their contents are loaded into an **iframe** from other web apps. Here the contents of the apps are loaded from `https://agents-dev.gocarinsurance.com`

For detailed codebase, see the **`sell_app`** directory in the [go-agents-js repo](https://github.com/gomaps/go-agents-js/tree/master/src/sell_app).

### Running locally

1. Start the Agent Site app:
```console
yarn start
```

This will start the agent site app locally running at `http://localhost:3000`. Refer to the documentation [here](https://github.com/gomaps/go-agents-js/tree/master#initial-setup) for more details.

2. Navigate to the specific app directory and start it:
```console
cd ./claimsCommander
make local
```

Preview the app in Zendesk Sell by appending **?zat=true** to a deals page URL, similar to the dev environment mentioned above.

## Building App For Development or Production

```console
cd ./claimsCommander
make dev (or make prod)
```

This will prepare files and create either `dev.zip` or `prod.zip` in the build folder, which can be uploaded to the Sell portal for installation.

> NOTE: Files under `./common` are copied to the individual apps during the build process. Do not make local changes as it will get overwritten. Always make changes to the files in `./common`

## Creating A New App
```console
make APP={app-dir-name} new
```

e.g. in order to create a new app `claimsCommander` in the folder `claimsCommander`:

```console
make APP=claimsCommander new
zat new
Enter this app author's name:
 Dinesh Nair
Enter this app author's email:
 dinesh@gosafeinsurance.com
Enter this app author's url:
 
Enter a name for this new app:
 Claims Commander
Enter your iFrame URI or leave it blank to use a default local template page:
 (assets/iframe.html) 
Enter a directory name to save the new app (will create the dir if it does not exist):
 (./) claimsCommander
      create  claimsCommander
      create  claimsCommander/README.md
      create  claimsCommander/assets/iframe.html
      create  claimsCommander/assets/logo-small.png
      create  claimsCommander/assets/logo.png
      create  claimsCommander/assets/logo.svg
      create  claimsCommander/manifest.json
      create  claimsCommander/translations/en.json
Enter the remote path (https://agents.gocarinsurance.com/{path}): claim-commands
cp ./common/Makefile ./claimsCommander
rm ./claimsCommander/assets/iframe.html
rm ./claimsCommander/assets/logo*
```

**Update the manifest.json -** by default it creates a location param for ZD Support - update it for ZD Sell:
```json
    "location": {
     "sell": {
     "deal_card": "assets/iframe.html"
    }
  },
```

For more details, refer to the [official ZAT documentation](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/#using-zat).
