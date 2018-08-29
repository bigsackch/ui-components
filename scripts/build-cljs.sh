#!/bin/sh
set -e

yarn

ge=./node_modules/.bin/generate-extern
webpack=node_modules/.bin/webpack

echo "Cleaning build"
./scripts/clean.sh

mkdir -p src-cljs/eventum-ui-components

echo "Compiling dev build"
$webpack --config webpack.dev.config.js --progress
echo "Compiling prod build"
NODE_ENV=production $webpack -p --config webpack.prod.config.js --progress

echo "Generating externs for Google Closure compiler"
$ge -f node_modules/react/umd/react.development.js,node_modules/react-dom/umd/react-dom.development.js,target/eventum-ui.js \
-n EventumUI \
-o src-cljs/eventum-ui-components/eventum-ui.ext.js

cp target/* src-cljs/eventum-ui-components

echo "Done!"