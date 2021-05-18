# TypeScript

## VSCode配置ts

当前文件夹，命令行操作。

1. `npm init`生成`package.json`文件。
2. `npm i typescript`当前目录下安装(`npm i -g typescript`全局安装)`ts`，安装之后会有一个`node_modules`文件夹。
3. `./node_modules/.bin/tsc -v`查看版本。
4. `./node_modules/.bin/tsc --init`生成`tsconfig.json`配置文件
5. `tsconfig.json`配置文件中修改输入路径`"rootDir": "./src/TS",`
6. `tsconfig.json`配置文件中修改输出路径`"outDir": "./src/JS/TS_JS/"`
7. vscode配置任务，运行任务
* 1.点击终端
* 2.点击运行任务
* 3.选择tsc监视