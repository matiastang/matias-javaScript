<!--
 * @Author: tangdaoyong
 * @Date: 2021-05-11 15:34:04
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-11 15:54:22
 * @Description: js执行shell脚本
-->
# js执行shell脚本

[js执行shell脚本](https://blog.csdn.net/cindy647/article/details/108830841)

前言
一般在纯前端静态页面的项目中，是不需要JS调命令行操作的，通常在Node项目，或者在Electron客户端项目中，可能会有这样的需求。（electron这个客户端框架本身就内置了node的很多方法）。因此下文针对的是有node层的项目如何执行shell。

先来了解一下shell是什么？
Linux/Unix中的shell，翻译是’壳’的意思；shell提供了用户与内核进行交互操作的一种接口。它接收用户输入的命令并把它送入操作系统的内核去执行。

1、命令行
用户直接在shell界面上执行shell命令，一行行书写，很少写出成套的程序来执行，所以称为命令行。

2、shell脚本
用户事先编写一个sh脚本文件，而后使用shell程序执行该脚本，这种方式，我们称shell编程。

调起shell的几种方式介绍（不限于这几种）
child_process：node的一个子进程api，可创建一个子进程用于执行命令行
shelljs： 基于node的api封装的一个shell执行插件
simple-git ：基于node的ap封装的一个git命令执行插件
依次来了解一下吧
1、child_process
介绍
child_process是node提供的一个子进程AP，具体可见官网、中文网关于此类api的介绍，对衍生shell及参数有非常详细的说明，下面列出两个常用的api

1. child_process.exec(command[, options][, callback])
command：要运行的shell命令
创建一个新的shell进程，然后执行command

2. child_process.execFile(file[, args][, options][, callback])
file：要运行的文件名称或路径,参数作为数组传入
直接将可执行的file创建为新进程；需要单独写.sh文件，可编写复杂逻辑，但在windows上使用时会有兼容问题（此外，还有child_process.spawn()等可供选择）

示例
const util = require('util');
const child_process = require(‘child_process');
// 调用util.promisify方法，返回一个promise,如const { stdout, stderr } = await exec('rm -rf build')
const exec = util.promisify(child_process.exec);
const appPath = join(__dirname, 'app');

const runClean = async function () {
 // cwd指定子进程的当前工作目录 这里的rm -rf build为删除指定目录下的一个文件夹
  await exec(`rm -rf build`, { cwd: appPath });
  await exec(`rm -rf test`, { cwd: appPath });
runClean();
1
2
3
4
5
6
7
8
9
10
11
2、shelljs
介绍
shelljs是j基于nodeAPI的一个扩展，要引入插件：（npm地址）；它比原生的child_process的兼容性更好，使用更灵活，这个插件的使用率很高。

Tips:
这个插件不仅可以调用.exec执行shell命令，也封装了一些快捷操作指令，具体使用文档请参考github地址。

cat 返回文件内容
Const mdres = shell.cat(‘*.md’)

pwd 获取当前目录
const res = shell.pwd();

find 查找文件
find(‘src’, ‘lib’);
find([‘src’, ‘lib’]); // same as above
find(’.’).filter(function(file) { return file.match(/.js$/); });

mkdir创建目录
mkdir(’-p’, ‘/tmp/a/b/c/d’, ‘/tmp/e/f/g’);
mkdir(’-p’, [’/tmp/a/b/c/d’, ‘/tmp/e/f/g’]); // same as above

示例
const shell = require(‘shelljs’);
……
router.get('/update-git', function (req, res, next) {
  // 如果目录存在，执行Git pull操作，否则新建目录，执行git clone 操作
  if (fs.existsSync(`${root}/${groupName}/${name}`)) {
    shell.exec('git pull', {
      cwd: `${root}/${groupName}/${name}`,
    });
  } else {
    shell.exec(`git clone ${remote} ${name}`, {
      cwd: `${root}/${groupName}`,
    });
  }
……
});

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
3、simple-git
鉴于上个例子，执行shell脚本操作git，其实对于复杂的git命令语句，写起来还是很不方便，最后介绍一个专为git设计的插件：simple-git(npm地址)

介绍
在项目中引入插件后，调用simple-git/promise可执行异步git操作，方便结合async/await使用
它封装并支持了很多git的方法，比如clone、commit、status、pull等等，将cmd命令和参数，传入即可
甚至可以用git.raw(),解析前端输入的git命令
示例
以下为客户端项目通过ipc通信，处理git的请求

const simpleGit = require('simple-git/promise');

......

// 执行客户端模拟的 simple-git 函数
ipcMain.handle('simple-git', async function (e, { projectPath, cmd, args }) {
  const git = simpleGit(projectPath);
  try {
    const res = await git[cmd](...args);
    return res;
  } catch (e) {
    console.error('执行 simple-git 命令时发生错误', { projectPath, cmd, args }, e);
    throw e;
  }
});
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
总结
上面介绍了shell的概念及三种js执行shell命令的方式（这里只列出了简单的命令，实际也可以根据需要编写.sh文件，传参相对路径，执行更复杂的shell脚本）；总的来说，有以下几点：

shell是一种用户与内核进行交互操作的接口，我们通过执行shell命令行或者脚本可对本机文件、进程等进行操作。
js要执行shell命令，有很多方式，这里总结了几种基于node的方式：
child_process 原生nodeAPI，需根据需要选型
shelljs Node的一个扩展插件、兼容性好
simple-git
专为git命令打造的插件，轻量好用