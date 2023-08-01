#!/bin/bash

npm run build

# Check if version bump should be done, and if it's a patch, minor or major bump
# Put this logic behind the --version or -v flag
if [ "$1" == "--version" ] || [ "$1" == "-v" ]; then
  if [ "$2" == "patch" ] || [ "$2" == "minor" ] || [ "$2" == "major" ]; then
    npm version $2
  else
    echo "Please specify a version bump type: patch, minor or major"
    exit 1
  fi
fi

# Ask if the changes, based on git status, look good to be commited.
# If not, exit the script.
git status
read -p "Do the changes look good to be commited? (y/n) " -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi

# If so, create a commit with the changes.
git add .
git commit -m "Deploy version $(node -p "require('./package.json').version")"

# Ask if changes should be pushed to the remote repository.
read -p "Do you want to push the changes to the remote repository? (y/n) \n" -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push
fi

echo "Deploying version $(node -p "require('./package.json').version")"

npm run deploy

