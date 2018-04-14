#!/usr/bin/env bash

if [[ $1 == "" || $1 == "--help" ]]; then
  printf "Run from project root,  you can pass in an individual test to run.\n\nexample usage:  scripts/runTest.sh test/datumDisplay.cjsx\n\n"
  exit 1
fi

node_modules/bumble-test/bin/testRunner.coffee $1
