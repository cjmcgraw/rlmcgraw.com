#!/usr/bin/env bash
set -eu

npm --version
node --version

build_continuously() {
    echo "starting backgrounded 'npm run watch' command"
    counter=0;
    while true; do
        counter=$(($counter + 1));
        echo "running attempts=${counter}";
        npm run watch;
        echo "unexpectedly failed!";
        sleep 5;
    done
}
build_continuously &
trap 'kill $(jobs -p);' EXIT

echo "starting nginx..."
/docker-entrypoint.sh "nginx" "-g" "daemon off;"
