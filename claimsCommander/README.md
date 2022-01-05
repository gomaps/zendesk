**RUNNING LOCAL:**
make local

This will copy the relevant files from ../common and run locally. This configuration expects remote server to be running at http://localhost:3000. In order to test the app - load any deal with the "zat=true" query param. For e.g. https://app.futuresimple.com/sales/deals/113096047?zat=true


**BUILDING FOR DEV/PROD:**
make dev (or make prod)

This will copy the relevant files from ../common and create dev.zip or prod.zip in the build folder. This can be uploaded to the Sell portal using the Settings


**NOTE:**
Files under ../common are copied over to the individual apps during the build process. Do not make local changes as it will get overwritten. Always make changes to the files in ../common


