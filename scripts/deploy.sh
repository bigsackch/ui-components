#!/bin/sh
scripts/build-cljs.sh
scripts/set-version.sh
lein do vcs commit, vcs push, deploy