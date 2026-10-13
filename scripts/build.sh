#!/bin/sh
set -eu

moon fmt
moon check
moon test
moon build --target js
cp _build/js/debug/build/cmd/main/main.js static/main.js
