**TOOLS installation:**
To get started install zat using https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-the-zendesk-apps-tools/

Following links will help in case there are issues during the installation -
https://www.py4u.net/discuss/1650713
https://stackoverflow.com/questions/53135863/macos-mojave-ruby-config-h-file-not-found


**CREATE NEW APP:**
make APP={app-dir-name} new

e.g. in order to create a new app claimsCommander in folder claimsCommander -

```
$ make APP=claimsCommander new
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
Enter the remote path (https://agents.gosafeinsurance.com/{path}): claim-commands
cp ./common/Makefile ./claimsCommander
rm ./claimsCommander/assets/iframe.html
rm ./claimsCommander/assets/logo*
```

**Update the manifest.json -** by default it creates location param for ZD Support - update it for ZD Sell - 
  "location": {
     "sell": {
     "deal_card": "assets/iframe.html"
    }
  },


**RUNNING LOCAL:**
```
cd ./claimsCommander
make local
```

This will copy the relevant files from ./common and run locally. This configuration expects remote server to be running at http://localhost:3000. In order to test the app - load any deal with the "zat=true" query param. For e.g. https://app.futuresimple.com/sales/deals/113096047?zat=true


**BUILDING FOR DEV/PROD:**
```
cd ./claimsCommander
make dev (or make prod)
```

This will copy the relevant files from ./common and create dev.zip or prod.zip in the build folder. This can be uploaded to the Sell portal using the Settings

**NOTE:**
Files under ./common are copied over to the individual apps during the build process. Do not make local changes as it will get overwritten. Always make changes to the files in ./common
