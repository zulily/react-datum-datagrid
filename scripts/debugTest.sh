#!/usr/bin/env bash


if [[ $1 == "" || $1 == "--help" ]]; then
  printf "Run from project root,  you can pass in an individual test to run.\n\nexample usage:  scripts/runTest.sh test/datumDisplay.cjsx\n\n"
  exit 1
fi
testFile=$1

if [[ $(ps -ef |  grep node-inspector | grep -v grep) == "" ]]; then
  printf "\n\nERROR: Node Inspector not running.\n\n"
  printf "If you need to install it, run 'npm install -g node-inspector'\n\n"
  printf "Once installed,  open a terminal tab and run 'node-inspector'.  It will output"
  printf "a URL.   Rerun this command and then you can browse to the url from node-inspector"
  printf "with Chrome and debug the test"
  exit 1
fi

printf "\n\nStarting in debug.  Go to to the URL given by node-inspector in chrome and press the resume\n"
printf "button on the sources tab once.  When it next breaks (it takes a few seconds),the source window\n"
printf "will be paused in testHelpers at a debugger statement. At that point you should be able to open\n"
printf "your test file source and set breakpoints etc.\n\n"

coffee --nodejs --debug-brk node_modules/bumble-test/bin/testRunner.coffee $1