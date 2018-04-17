#!/bin/bash
set -e
set -x

git checkout gh-pages
git pull origin master
grunt build
git commit -am 'rebuild docs for gh-pages'
git push origin gh-pages
git checkout master