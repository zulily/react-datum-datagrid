#!/bin/bash
set -x

git checkout gh-pages
git reset --hard origin/master
grunt clean build
# docs/ is normally ignored, use the --force to add it anyway in this branch
git add --force docs/
git commit -am 'rebuild docs for gh-pages'
git push --force origin gh-pages
git reset --hard origin/master
git checkout master
grunt build
