#!/bin/sh

export NODE_ENV=production
rm -rf ./build > /dev/null 2>&1
mkdir ./build
cp -r ./app ./build/
cp ./index.html ./build/
./node_modules/.bin/webpack
cp ./dist/bundle.js ./build/app
