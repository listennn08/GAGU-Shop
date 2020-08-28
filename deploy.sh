#!/usr/bin/env bash
cd dist

git init && git add .
git commit -m 'deploy'
git push -f https://github.com/listennn08/GAGU-Shop master:gh-pages