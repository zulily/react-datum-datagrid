#!/bin/bash
set -e
set -x

git checkout gh-pages
git reset --hard origin/master
grunt clean build
git add docs/
git commit -am 'rebuild docs for gh-pages'
git push --force origin gh-pages
git checkout master
grunt build
