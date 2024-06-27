#!/bin/bash

if [ "$#" -ne 4 ]
  then
    echo "You must supply a source branch, new branch name, grid version, charts version projects and modules to update"
    echo "For example: ./scripts/release/createAndBuildNewBranchFromExistingBranch.sh latest b19.1.2 19.1.2 2.0.0"
    echo "For example: ./scripts/release/createAndBuildNewBranchFromExistingBranch.sh latest b19.1.2 19.1.2 2.0.0"
    echo "For example: ./scripts/release/createAndBuildNewBranchFromExistingBranch.sh latest b19.1.2 19.1.2 2.0.0"
    exit 1
fi

SOURCE_BRANCH=$1
NEW_BRANCH=$2

NEW_GRID_VERSION=$3
PEER_GRID_VERSION="~$3"

NEW_CHARTS_VERSION=$4
PEER_CHARTS_VERSION="~$4"

GEN_KEY_DEFAULT_LOCATION=~/Documents/aggrid/aggrid/genkey/genKey.js

echo "########################################################################"
echo "########### Creating and switching to new branch $NEW_BRANCH ###########"
./scripts/release/createAndSwitchToBranch.sh $SOURCE_BRANCH $NEW_BRANCH

echo "########################################################################"
echo "#################### Updating LicenseManager ###########################"
if [ -f $GEN_KEY_DEFAULT_LOCATION ]; then
    node scripts/release/updateLicenseManager.js `node $GEN_KEY_DEFAULT_LOCATION release`
else
    echo "$GEN_KEY_DEFAULT_LOCATION does not exist. Please update the License Key manually"
fi

echo "########################################################################"
echo "####### Updating  package.json version.ts files                #########"
node scripts/release/versionModules.js $NEW_GRID_VERSION $PEER_GRID_VERSION $PEER_CHARTS_VERSION

echo "########################################################################"
echo "################# Installing Dependencies & Building #########################"
npm i
npm run bootstrap

echo "########################################################################"
echo "###################### Build               #############################"
nx run-many -t build --projects=tag:package -c production

echo "########################################################################"
echo "##################### Updating .gitignore #############################"
node scripts/release/updateGitIgnore.js

echo "########################################################################"
echo "##################### Updating licenses #############################"
./scripts/release/updateLicenses.sh
