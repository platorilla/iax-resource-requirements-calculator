#!/bin/bash
set -euo pipefail

trap cleanup EXIT
cleanup() {
    rm -rf build
}

[[ -d build/ptk-src ]] || {
    [[ -d build/platform-ops ]] || gh repo clone ITRS-Group/platform-ops build/platform-ops
    mv build/platform-ops/replicated/tools/ptk build/ptk-src
}
echo '✅ Got latest ptk sources'

[[ -f build/ptk ]] || {
    pushd build/ptk-src
    make build
    popd
    mv build/ptk-src/bin/ptk build/ptk
}
echo '✅ ptk binary ready'

[[ -f build/config.yaml ]] || {
    pushd build
    ./ptk release-manifest --app itrs-analytics --channel stable >/dev/null
    version=$(echo itrs-analytics-* | sed 's/itrs-analytics-//')
    echo "$version" >version.txt
    popd
    mv build/itrs-analytics-*/config.yaml build/config.yaml
}
echo "✅ Got latest ITRS Analytics config file $(cat build/version.txt)"

cp build/config.yaml "build/ptk-src/wasm/pkg/itrs-analytics/stable-$(cat build/version.txt)-config.yaml"
sed -i ' ' "s/2.10.1+1/$(cat build/version.txt)/g" build/ptk-src/wasm/pkg/itrs-analytics/embed.go
pushd build/ptk-src
make build-wasm
popd
mv build/ptk-src/bin/ptk.wasm build/ptk-src/wasm/*.{ts,js} .
echo '✅ ptk Web Assembly module ready'
