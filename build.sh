#! /bin/bash
echo "* Building jsxlate"
mkdir -p ./lib
babel=$(npm bin)/babel
for f in $(ls src/*.js*); do $babel src/$f > build/$f; done
echo "* Built."
