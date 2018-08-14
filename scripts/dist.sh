#!/bin/sh

./scripts/clean.sh

./node_modules/.bin/babel src/datagrid --out-dir dist/datagrid
./node_modules/.bin/babel src/datums --out-dir dist/datums
./node_modules/.bin/babel src/paginator --out-dir dist/paginator

rsync -zarv  --prune-empty-dirs --include "*/"  --include="*.css" --exclude="*" ./src/ ./dist/