<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-07 15:42:12
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-08 10:44:22
 * @Description: Emscripten
-->
# Emscripten

[Github emsdk](https://github.com/emscripten-core/emsdk)
[MDN Emscripten](https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm)

## Mac安装

mkdir matias_emscripten
 ~  cd matias_emscripten
 ~/matias_emscripten  git clone https://github.com/juj/emsdk.git
Cloning into 'emsdk'...
remote: Enumerating objects: 52, done.
remote: Counting objects: 100% (52/52), done.
remote: Compressing objects: 100% (35/35), done.
remote: Total 2529 (delta 23), reused 29 (delta 15), pack-reused 2477
Receiving objects: 100% (2529/2529), 1.32 MiB | 333.00 KiB/s, done.
Resolving deltas: 100% (1592/1592), done.
 ~/matias_emscripten  ll -a
total 0
drwxr-xr-x   3 matias  staff    96B  2  7 15:45 .
drwxr-xr-x+ 59 matias  staff   1.8K  2  7 15:45 ..
drwxr-xr-x  29 matias  staff   928B  2  7 15:45 emsdk
 ~/matias_emscripten  cd emsdk
 ~/matias_emscripten/emsdk   master  ./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
--global is deprecated. Use `--system` to set the environment variables for all users
Registering active Emscripten environment permanently

Error: No tool or SDK found by name 'sdk-incoming-64bit'.
 ✘  ~/matias_emscripten/emsdk   master  ./emsdk install latest
 Installing SDK 'sdk-releases-upstream-ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-64bit'..
Installing tool 'node-12.18.1-64bit'..
Downloading: /Users/matias/matias_emscripten/emsdk/zips/node-v12.18.1-darwin-x64.tar.gz from https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/node-v12.18.1-darwin-x64.tar.gz, 20873670 Bytes
Unpacking '/Users/matias/matias_emscripten/emsdk/zips/node-v12.18.1-darwin-x64.tar.gz' to '/Users/matias/matias_emscripten/emsdk/node/12.18.1_64bit'
Done installing tool 'node-12.18.1-64bit'.
Installing tool 'python-3.7.4-2-64bit'..
Downloading: /Users/matias/matias_emscripten/emsdk/zips/python-3.7.4-2-macos.tar.gz from https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/python-3.7.4-2-macos.tar.gz, 25365593 Bytes
Unpacking '/Users/matias/matias_emscripten/emsdk/zips/python-3.7.4-2-macos.tar.gz' to '/Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit'
Done installing tool 'python-3.7.4-2-64bit'.
Installing tool 'releases-upstream-ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-64bit'..
Downloading: /Users/matias/matias_emscripten/emsdk/zips/ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-wasm-binaries.tbz2 from https://storage.googleapis.com/webassembly/emscripten-releases-builds/mac/ce0e4a4d1cab395ee5082a60ebb4f3891a94b256/wasm-binaries.tbz2, 244029966 Bytes
Unpacking '/Users/matias/matias_emscripten/emsdk/zips/ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-wasm-binaries.tbz2' to '/Users/matias/matias_emscripten/emsdk/upstream'
Done installing tool 'releases-upstream-ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-64bit'.
Running post-install step: npm ci ...
Running post-install step: npm install google-closure-compiler-osx
Done running: npm ci
Done installing SDK 'sdk-releases-upstream-ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-64bit'.
./emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
--global is deprecated. Use `--system` to set the environment variables for all users
Registering active Emscripten environment permanently

Error: No tool or SDK found by name 'sdk-incoming-64bit'.
 ✘  ~/matias_emscripten/emsdk   master  ./emsdk activate latest
Setting the following tools as active:
   node-12.18.1-64bit
   python-3.7.4-2-64bit
   releases-upstream-ce0e4a4d1cab395ee5082a60ebb4f3891a94b256-64bit

Next steps:
- To conveniently access emsdk tools from the command line,
  consider adding the following directories to your PATH:
    /Users/matias/matias_emscripten/emsdk
    /Users/matias/matias_emscripten/emsdk/node/12.18.1_64bit/bin
    /Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit/bin
    /Users/matias/matias_emscripten/emsdk/upstream/emscripten
- This can be done for the current shell by running:
    source "/Users/matias/matias_emscripten/emsdk/emsdk_env.sh"
- Configure emsdk in your bash profile by running:
    echo 'source "/Users/matias/matias_emscripten/emsdk/emsdk_env.sh"' >> $HOME/.bash_profile
~/matias_emscripten/emsdk   master  source ./emsdk_env.sh
Adding directories to PATH:
PATH += /Users/matias/matias_emscripten/emsdk
PATH += /Users/matias/matias_emscripten/emsdk/upstream/emscripten
PATH += /Users/matias/matias_emscripten/emsdk/node/12.18.1_64bit/bin
PATH += /Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit/bin

Setting environment variables:
PATH = /Users/matias/matias_emscripten/emsdk:/Users/matias/matias_emscripten/emsdk/upstream/emscripten:/Users/matias/matias_emscripten/emsdk/node/12.18.1_64bit/bin:/Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit/bin:/Users/matias/bin:/Users/matias/.matias_shell:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Library/Apple/usr/bin
EMSDK = /Users/matias/matias_emscripten/emsdk
EM_CONFIG = /Users/matias/matias_emscripten/emsdk/.emscripten
EM_CACHE = /Users/matias/matias_emscripten/emsdk/upstream/emscripten/cache
EMSDK_NODE = /Users/matias/matias_emscripten/emsdk/node/12.18.1_64bit/bin/node
EMSDK_PYTHON = /Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit/bin/python3
SSL_CERT_FILE = /Users/matias/matias_emscripten/emsdk/python/3.7.4-2_64bit/lib/python3.7/site-packages/certifi/cacert.pem
 ~/matias_emscripten/emsdk   master  cat ~/.bash_profile
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
export LC_ALL=zh_CN.UTF-8
export LANG=zh_CN.UTF-8

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
 ~/matias_emscripten/emsdk   master  echo 'source "/Users/matias/matias_emscripten/emsdk/emsdk_env.sh"' >> $HOME/.bash_profile
 ~/matias_emscripten/emsdk   master  cat ~/.bash_profile
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
export LC_ALL=zh_CN.UTF-8
export LANG=zh_CN.UTF-8

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source "/Users/matias/matias_emscripten/emsdk/emsdk_env.sh"

~/matias_emscripten/emsdk   master  echo 'source "/Users/matias/matias_emscripten/emsdk/emsdk_env.sh"' >> $HOME/.zshrc
## 测试

emcc hello.c -s WASM=1 -o hello.html

**提示** ：Firefox 52+ 和 Chrome 57+ 和最新版本的 Opera 已经默认启用，你也可以在 Firefox 47+ 中通过在 about:config 页面启用 javascript.options.wasm 字段获得支持，Chrome 51+ 和 Opera 38+ 可以在 chrome://flags 页面启用 Experimental WebAssembly 选项以支持 WebAssembly。

犹豫`CORS`限制，需要起一个服务才能正常加载`.wasm`文件。

使用`shell_minimal.html`生成`emcc index.c -s WASM=1 -o index.html --shell-file ../html_template/shell_minimal.html`