#! /bin/bash
echo "* Building jsxlate"
mkdir -p ./lib
babel=$(npm bin)/babel
for f in $(ls src/*.js*); do $babel $f > build/${f#src/}; done
echo "* Built."
