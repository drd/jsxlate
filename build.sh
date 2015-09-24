#! /bin/bash
echo "* Building jsxlate"
mkdir -p ./lib
babel=$(npm bin)/babel
$babel ./jsxlate.js > lib/jsxlate.js
$babel ./components.jsx > lib/components.jsx
$babel ./cache.js > lib/cache.js
$babel ./src/transform.js > build/transform.js
$babel ./src/extract.js > build/extract.js
echo "* Built."
